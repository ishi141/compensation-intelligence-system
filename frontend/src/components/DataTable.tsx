// components/SalaryTable.tsx
"use client";

import { useMemo, useState } from "react";

type SalaryRow = {
  company: string;
  role: string;
  level: string;
  base: number;
  stock: number;
  bonus: number;
};

const DATA: SalaryRow[] = [
  { company: "Google", role: "Software Engineer", level: "L4", base: 178000, stock: 95000, bonus: 27000 },
  { company: "Meta", role: "Software Engineer", level: "E4", base: 185000, stock: 120000, bonus: 20000 },
  { company: "Amazon", role: "Software Engineer", level: "L5", base: 165000, stock: 110000, bonus: 8000 },
  { company: "Netflix", role: "Software Engineer", level: "Senior", base: 280000, stock: 0, bonus: 0 },
  { company: "Apple", role: "Software Engineer", level: "ICT4", base: 172000, stock: 85000, bonus: 15000 },
  { company: "Microsoft", role: "Software Engineer", level: "63", base: 155000, stock: 75000, bonus: 12000 },
  { company: "Microsoft", role: "Software Engineer", level: "64", base: 175000, stock: 105000, bonus: 16000 },
  { company: "Stripe", role: "Software Engineer", level: "L3", base: 190000, stock: 90000, bonus: 10000 },
];

const LEVELS = ["All", ...Array.from(new Set(DATA.map((d) => d.level)))];
const COMPANIES = ["All", ...Array.from(new Set(DATA.map((d) => d.company)))];

function formatUSD(n: number) {
  if (n === 0) return "—";
  return `$${(n / 1000).toFixed(0)}k`;
}

function totalComp(row: SalaryRow) {
  return row.base + row.stock + row.bonus;
}

export default function SalaryTable() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All");
  const [level, setLevel] = useState("All");

  const rows = useMemo(() => {
    return DATA.filter((row) => {
      const matchesSearch =
        search.trim() === "" ||
        row.company.toLowerCase().includes(search.toLowerCase()) ||
        row.role.toLowerCase().includes(search.toLowerCase());
      const matchesCompany = company === "All" || row.company === company;
      const matchesLevel = level === "All" || row.level === level;
      return matchesSearch && matchesCompany && matchesLevel;
    }).sort((a, b) => totalComp(b) - totalComp(a));
  }, [search, company, level]);

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
                  {formatUSD(row.base)}
                </td>
                <td className="py-5 px-5 font-sans text-sm text-ivory/70 text-right tabular-nums">
                  {formatUSD(row.stock)}
                </td>
                <td className="py-5 px-5 font-sans text-sm text-ivory/70 text-right tabular-nums">
                  {formatUSD(row.bonus)}
                </td>
                <td className="py-5 px-5 text-right tabular-nums">
                  <span className="font-display text-base font-bold text-sand">
                    {formatUSD(totalComp(row))}
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