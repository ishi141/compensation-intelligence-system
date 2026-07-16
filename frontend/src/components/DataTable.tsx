// components/SalaryTable.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { searchCompensation } from "../lib/api";

type SalaryRow = {
  company: string;
  role: string;
  level: string;
  base: number;
  stock: number;
  bonus: number;
  currency: string;
};

// Converts the backend's nested record shape into the flat SalaryRow shape
// that this component's existing filter/sort logic expects.
function mapBackendRecordToRow(record: any): SalaryRow {
  return {
    company: record.company?.name ?? "Unknown",
    role: record.role?.title ?? "Unknown",
    level: record.level?.name ?? "Unknown",
    base: record.baseSalary ?? 0,
    stock: record.stock ?? 0,
    bonus: record.bonus ?? 0,
    currency: record.currency ?? "USD",
  };
}

function formatMoney(n: number, currency: string) {
  if (n === 0) return "—";

  if (currency === "INR") {
    const abs = Math.abs(n);
    if (abs >= 10000000) {
      return `₹${(n / 10000000).toFixed(2).replace(/\.?0+$/, "")}Cr`;
    }
    if (abs >= 100000) {
      return `₹${(n / 100000).toFixed(2).replace(/\.?0+$/, "")}L`;
    }
    if (abs >= 1000) {
      return `₹${(n / 1000).toFixed(1).replace(/\.?0+$/, "")}K`;
    }
    return `₹${n}`;
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);
  } catch {
    return `${currency} ${(n / 1000).toFixed(0)}k`;
  }
}

function totalComp(row: SalaryRow) {
  return row.base + row.stock + row.bonus;
}

export default function SalaryTable() {
  const { token } = useAuth();

  const [data, setData] = useState<SalaryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All");
  const [level, setLevel] = useState("All");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const res = await searchCompensation(token);
        if (res.success) {
          const mapped = res.data.records.map(mapBackendRecordToRow);
          setData(mapped);
        } else {
          setError(res.message || "Failed to load compensation data");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load compensation data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  const LEVELS = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.level)))],
    [data]
  );
  const COMPANIES = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.company)))],
    [data]
  );

  const rows = useMemo(() => {
    return data
      .filter((row) => {
        const matchesSearch =
          search.trim() === "" ||
          row.company.toLowerCase().includes(search.toLowerCase()) ||
          row.role.toLowerCase().includes(search.toLowerCase());
        const matchesCompany = company === "All" || row.company === company;
        const matchesLevel = level === "All" || row.level === level;
        return matchesSearch && matchesCompany && matchesLevel;
      })
      .sort((a, b) => totalComp(b) - totalComp(a));
  }, [data, search, company, level]);

  if (!token) {
    return (
      <section className="bg-charcoal px-6 md:px-12 py-20">
        <p className="font-sans text-sm text-ivory/50 uppercase tracking-widest2">
          Please sign in to view salary benchmarks.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-charcoal px-6 md:px-12 py-20">
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-widest2 text-sand block mb-4">
            The Index
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-ivory">
            Salary Benchmarks
          </h2>
        </div>

        {/* Filter bar — underline inputs, no boxes */}
        <div className="flex flex-wrap gap-x-10 gap-y-6 md:gap-x-12">
          <FilterField label="Search">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Company or role"
              className="bg-transparent border-b border-line focus:border-sand outline-none py-2 w-40 md:w-48 font-sans text-sm text-ivory placeholder:text-ivory/30 transition-colors"
            />
          </FilterField>

          <FilterField label="Company">
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-transparent border-b border-line focus:border-sand outline-none py-2 w-36 font-sans text-sm text-ivory transition-colors appearance-none cursor-pointer"
            >
              {COMPANIES.map((c) => (
                <option key={c} value={c} className="bg-charcoal">
                  {c}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label="Level">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-transparent border-b border-line focus:border-sand outline-none py-2 w-28 font-sans text-sm text-ivory transition-colors appearance-none cursor-pointer"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l} className="bg-charcoal">
                  {l}
                </option>
              ))}
            </select>
          </FilterField>
        </div>
      </div>

      {loading && (
        <p className="py-16 text-center font-sans text-sm text-ivory/40 uppercase tracking-widest2">
          Loading compensation data...
        </p>
      )}

      {!loading && error && (
        <p className="py-16 text-center font-sans text-sm text-red-400 uppercase tracking-widest2">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {/* Table */}
          <div className="overflow-x-auto border-t border-line">
            <table className="w-full min-w-220 border-collapse">
              <thead>
                <tr className="bg-surface">
                  {["Company", "Role", "Level", "Base", "Stock", "Bonus", "Total Comp"].map(
                    (heading, i) => (
                      <th
                        key={heading}
                        className={[
                          "font-sans text-[10px] uppercase tracking-widest2 text-ivory/60 font-normal py-4 px-5",
                          i >= 3 ? "text-right" : "text-left",
                        ].join(" ")}
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={`${row.company}-${row.level}-${idx}`}
                    className="border-b border-line hover:bg-surface/40 transition-colors duration-200"
                  >
                    <td className="py-5 px-5 font-display text-base text-ivory">
                      {row.company}
                    </td>
                    <td className="py-5 px-5 font-sans text-sm text-ivory/70">
                      {row.role}
                    </td>
                    <td className="py-5 px-5 font-sans text-sm text-ivory/70">
                      {row.level}
                    </td>
                    <td className="py-5 px-5 font-sans text-sm text-ivory/70 text-right tabular-nums">
                      {formatMoney(row.base, row.currency)}
                    </td>
                    <td className="py-5 px-5 font-sans text-sm text-ivory/70 text-right tabular-nums">
                      {formatMoney(row.stock, row.currency)}
                    </td>
                    <td className="py-5 px-5 font-sans text-sm text-ivory/70 text-right tabular-nums">
                      {formatMoney(row.bonus, row.currency)}
                    </td>
                    <td className="py-5 px-5 text-right tabular-nums">
                      <span className="font-display text-base font-bold text-sand">
                        {formatMoney(totalComp(row), row.currency)}
                      </span>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center font-sans text-sm text-ivory/40 uppercase tracking-widest2"
                    >
                      No matching records
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-6 font-sans text-[10px] uppercase tracking-widest2 text-ivory/30">
            {rows.length} record{rows.length !== 1 ? "s" : ""} — sorted by total compensation
          </p>
        </>
      )}
    </section>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-sans text-[9px] uppercase tracking-widest2 text-ivory/40">
        {label}
      </span>
      {children}
    </div>
  );
}