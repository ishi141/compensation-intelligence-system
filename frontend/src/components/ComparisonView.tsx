// components/ComparisonDossier.tsx
"use client";

import { useMemo, useState } from "react";

type Profile = {
  id: string;
  company: string;
  level: string;
  role: string;
  location: string;
  base: number;
  stock: number;
  bonus: number;
};

const PROFILES: Profile[] = [
  {
    id: "apple-ict4",
    company: "Apple",
    level: "ICT4",
    role: "Software Engineer",
    location: "Cupertino, CA",
    base: 172000,
    stock: 85000,
    bonus: 15000,
  },
  {
    id: "msft-63",
    company: "Microsoft",
    level: "63",
    role: "Software Engineer II",
    location: "Redmond, WA",
    base: 155000,
    stock: 75000,
    bonus: 12000,
  },
  {
    id: "google-l4",
    company: "Google",
    level: "L4",
    role: "Software Engineer III",
    location: "Mountain View, CA",
    base: 178000,
    stock: 95000,
    bonus: 27000,
  },
  {
    id: "meta-e4",
    company: "Meta",
    level: "E4",
    role: "Software Engineer",
    location: "Menlo Park, CA",
    base: 185000,
    stock: 120000,
    bonus: 20000,
  },
];

function totalComp(p: Profile) {
  return p.base + p.stock + p.bonus;
}

function formatUSD(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export default function ComparisonDossier() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "apple-ict4",
    "msft-63",
  ]);

  const selected = useMemo(
    () =>
      selectedIds
        .map((id) => PROFILES.find((p) => p.id === id))
        .filter(Boolean) as Profile[],
    [selectedIds]
  );

  const maxTotal = Math.max(...selected.map(totalComp), 1);

  function updateSlot(index: number, id: string) {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[index] = id;
      return next;
    });
  }

  function addSlot() {
    if (selectedIds.length >= 3) return;
    const unused = PROFILES.find((p) => !selectedIds.includes(p.id));
    if (unused) setSelectedIds((prev) => [...prev, unused.id]);
  }

  function removeSlot(index: number) {
    if (selectedIds.length <= 2) return;
    setSelectedIds((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <section className="bg-charcoal px-6 md:px-12 py-20">
      {/* Dossier masthead */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4 pb-6 border-b border-line">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-widest2 text-sand block mb-4">
            Confidential — Comparative Briefing
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-ivory">
            Compensation Dossier
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-sans text-[10px] uppercase tracking-widest2 text-ivory/40">
            File No. 0{selected.length} / Rev. 2026
          </span>
          {selected.length < 3 && (
            <button
              onClick={addSlot}
              className="border border-sand px-4 py-2 font-sans text-[10px] uppercase tracking-widest2 text-sand hover:bg-sand hover:text-charcoal transition-colors duration-300"
            >
              + Add Entry
            </button>
          )}
        </div>
      </div>

      {/* Comparison grid */}
      <div
        className={[
          "grid grid-cols-1 border-l border-line",
          selected.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
        ].join(" ")}
      >
        {selected.map((profile, index) => (
          <DossierColumn
            key={profile.id + index}
            profile={profile}
            maxTotal={maxTotal}
            onChange={(id) => updateSlot(index, id)}
            onRemove={
              selected.length > 2 ? () => removeSlot(index) : undefined
            }
          />
        ))}
      </div>

      <p className="mt-8 font-sans text-[10px] uppercase tracking-widest2 text-ivory/30">
        Figures represent estimated annualized total compensation. Stock
        valued at grant.
      </p>
    </section>
  );
}

function DossierColumn({
  profile,
  maxTotal,
  onChange,
  onRemove,
}: {
  profile: Profile;
  maxTotal: number;
  onChange: (id: string) => void;
  onRemove?: () => void;
}) {
  const total = totalComp(profile);
  const segments = [
    { label: "Base", value: profile.base, tone: "bg-sand" },
    { label: "Stock", value: profile.stock, tone: "bg-sand/60" },
    { label: "Bonus", value: profile.bonus, tone: "bg-sand/30" },
  ];

  return (
    <div className="relative border-r border-line bg-surface/30 px-8 py-10 flex flex-col">
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label="Remove entry"
          className="absolute top-6 right-6 font-sans text-ivory/30 hover:text-sand text-xs uppercase tracking-widest2"
        >
          Remove
        </button>
      )}

      {/* Identity block */}
      <div className="mb-10">
        <select
          value={profile.id}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-b border-line focus:border-sand outline-none pb-2 mb-4 font-display text-2xl text-ivory appearance-none cursor-pointer w-full"
        >
          {PROFILES.map((p) => (
            <option key={p.id} value={p.id} className="bg-charcoal text-base">
              {p.company} — {p.level}
            </option>
          ))}
        </select>
        <p className="font-sans text-xs text-ivory/50">{profile.role}</p>
        <p className="font-sans text-[10px] uppercase tracking-widest2 text-ivory/30 mt-1">
          {profile.location}
        </p>
      </div>

      {/* Breakdown */}
      <div className="space-y-6 mb-10">
        {segments.map((seg) => (
          <div key={seg.label}>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-sans text-[10px] uppercase tracking-widest2 text-ivory/50">
                {seg.label}
              </span>
              <span className="font-sans text-sm text-ivory/80 tabular-nums">
                {formatUSD(seg.value)}
              </span>
            </div>
            <div className="h-px w-full bg-line relative overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 h-px ${seg.tone}`}
                style={{
                  width: `${total > 0 ? (seg.value / total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stacked composite bar */}
      <div className="mb-10">
        <span className="font-sans text-[10px] uppercase tracking-widest2 text-ivory/40 block mb-3">
          Composite
        </span>
        <div className="h-2 w-full bg-line flex overflow-hidden">
          {segments.map((seg) => (
            <div
              key={seg.label}
              className={seg.tone}
              style={{
                width: `${total > 0 ? (seg.value / total) * 100 : 0}%`,
              }}
            />
          ))}
        </div>
        <div className="h-1 w-full bg-line mt-2 relative">
          <div
            className="absolute inset-y-0 left-0 bg-sand"
            style={{ width: `${(total / maxTotal) * 100}%` }}
          />
        </div>
      </div>

      {/* Total */}
      <div className="mt-auto pt-6 border-t border-line">
        <span className="font-sans text-[10px] uppercase tracking-widest2 text-ivory/40 block mb-2">
          Total Compensation
        </span>
        <span className="font-display text-3xl font-bold text-sand">
          {formatUSD(total)}
        </span>
      </div>
    </div>
  );
}