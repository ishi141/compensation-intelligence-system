"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "Overview", href: "/overview" },
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "Methodology", href: "/methodology" },
  { label: "Insights", href: "/insights" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-colors duration-500",
        scrolled
          ? "bg-charcoal/95 border-b border-line backdrop-blur-sm"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="px-6 md:px-12 h-24 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="flex items-baseline gap-3 shrink-0">
          <span className="font-script text-3xl md:text-[2.15rem] leading-none text-ivory">
            Meridian
          </span>
          <span className="hidden md:inline font-sans text-[10px] uppercase tracking-widest2 text-ivory/60 border-l border-ivory/30 pl-3">
            Compensation Intelligence
          </span>
        </Link>

        {/* Primary nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-sans text-[11px] uppercase tracking-widest2 text-ivory/90 hover:text-ivory transition-colors"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1.5 h-px w-0 bg-sand transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right: masthead index + CTA */}
        <div className="hidden lg:flex items-center gap-8">
          <span className="font-sans text-[10px] uppercase tracking-widest2 text-ivory/50">
            Vol. 01 — 2026
          </span>
          <Link
            href="/access"
            className="border border-sand px-5 py-2.5 font-sans text-[11px] uppercase tracking-widest2 text-sand hover:bg-sand hover:text-charcoal transition-colors duration-300"
          >
            Request Access
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="lg:hidden flex flex-col gap-1.5 w-8"
        >
          <span
            className={`h-px w-full bg-ivory transition-transform duration-300 ${
              open ? "translate-y-0.75 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-ivory transition-transform duration-300 ${
              open ? "-translate-y-0.75 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          "lg:hidden overflow-hidden transition-[max-height] duration-500 bg-charcoal border-t border-line",
          open ? "max-h-96" : "max-h-0 border-t-transparent",
        ].join(" ")}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-sans text-xs uppercase tracking-widest2 text-ivory/90"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/access"
            onClick={() => setOpen(false)}
            className="mt-2 border border-sand px-5 py-3 text-center font-sans text-[11px] uppercase tracking-widest2 text-sand"
          >
            Request Access
          </Link>
        </nav>
      </div>
    </header>
  );
}