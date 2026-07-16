"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CompensationChart from "../components/CompensationChart";
import DataTable from "../components/DataTable";
import ComparisonView from "../components/ComparisonView";
import CompanyCompare from "../components/CompanyCompare";

export default function Home() {
  return (
    <main className="bg-charcoal min-h-screen text-ivory selection:bg-sand selection:text-charcoal">
      

      {/* --- ANIMATION WRAPPER START --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        
        <section className="relative overflow-hidden">
          {/* oversized ghost numeral â€” quiet editorial texture, single instance */}
          <span
            aria-hidden
            className="pointer-events-none select-none absolute -left-6 md:left-0 bottom-0 font-display text-[28vw] md:text-[22vw] leading-none text-ivory/3 translate-y-[8%]"
          >
            01
          </span>

          <div className="relative min-h-screen pt-24 grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-8 flexflex-col justify-center px-6 md:px-12 py-16 lg:py-0">
              <span className="font-sans text-[11px] uppercase tracking-widest2 text-sand mb-6">
                2026 Edition â€” Market Benchmarking
              </span>

              <div className="w-10 h-px bg-ivory/30 mb-8" />

              <h1 className="font-display text-[13vw] sm:text-6xl md:text-7xl xl:text-[6.5rem] leading-[0.95] text-ivory">
                Compensation,
                <br />
                <span className="italic text-sand">Decoded.</span>
              </h1>

              <p className="mt-10 max-w-md font-sans text-sm text-ivory/60 leading-relaxed lg:hidden">
                Editorial-grade benchmarking data for boards, founders, and
                compensation committees who need clarity, not dashboards.
              </p>
            </div>

            {/* Right â€” overlapping surface block */}
            <div className="lg:col-span-4 relative">
              <div
                className="
                  relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2
                  w-full lg:w-[26vw] lg:min-w-85
                  bg-surface border border-line
                  px-8 md:px-10 py-12
                  flex flex-col justify-between
                  lg:min-h-105
                "
              >
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest2 text-sandblock mb-6">
                    The Report
                  </span>
                  <p className="font-display text-xl md:text-2xl text-ivory leading-snug">
                    A single source of truth for equity, base pay, and total
                    comp across every stage ofgrowth.
                  </p>
                  <p className="mt-6 font-sanstext-sm text-ivory/50 leading-relaxed">
                    Drawn from verified filings, live offer data, and board-level
                    disclosures â€” refreshed at every market close.
                  </p>
                </div>

                <Link
                  href="/access"
                  className="
                    group mt-10 inline-flex items-center justify-between
                    border border-sand
                    px-6 py-4
                    font-sans text-[11px] uppercase tracking-widest2 text-sand
                    hover:bg-sand hover:text-charcoal
                    transition-colors duration-300
                  "
                >
                  <span>Explore the Index</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="ml-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M1 8H15M15 8L9 2M15 8L9 14"
                      stroke="currentColor"
                      strokeWidth="1.25"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* footer strip of the hero â€” thin data rail, editorial convention */}
          <div className="relative hidden md:flex border-t border-line px-12 py-5 items-center justify-between">
            <span className="font-sans text-[10px] uppercase tracking-widest2 text-ivory/40">
              Base â€” Equity â€” Bonus â€” Benchmarked Quarterly
            </span>
            <span className="font-sans text-[10px] uppercase tracking-widest2 text-ivory/40">
              Scroll
            </span>
          </div>
        </section>

        {/* --- MARKET INTELLIGENCE TABLE --- */}
        <section className="px-6 md:px-12 py-16 md:py-24 border-t border-line">
          <div className="mb-12">
            <span className="font-sans text-[11px] uppercase tracking-widest2 text-sand mb-4 block">
              02 â€” Database
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ivory mb-2">Market Intelligence</h2>
            <p className="font-sans text-sm text-ivory/60 max-w-xl">
              Real-time compensation benchmarks filtered by role, level, and location.
            </p>
          </div>
          <DataTable />
          <CompensationChart />
        </section>

        {/* --- DOSSIER COMPARISON VIEW --- */}
        <section className="px-6 md:px-12 py-16 md:py-24 border-t border-line bg-surface/30">
          <div className="mb-12">
            <span className="font-sans text-[11px] uppercase tracking-widest2 text-sand mb-4 block">
              03 â€” Analysis
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ivory mb-2">Level Comparison Dossier</h2>
            <p className="font-sans text-sm text-ivory/60 max-w-xl">
              Side-by-side structured breakdown of total compensation packages.
            </p>
          </div>
          <ComparisonView />
        </section>

        {/* --- COMPANY AVERAGE COMPARISON --- */}
        <section className="px-6 md:px-12 py-16 md:py-24 border-t border-line">
          <div className="mb-12">
            <span className="font-sans text-[11px] uppercase tracking-widest2 text-sand mb-4 block">
              04 â€” Benchmarking
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ivory mb-2">Company Averages</h2>
            <p className="font-sans text-sm text-ivory/60 max-w-xl">
              Compare average compensation trends across two companies.
            </p>
          </div>
          <CompanyCompare />
        </section>

      </motion.div>
      {/* --- ANIMATION WRAPPER END --- */}

    </main>
  );
}