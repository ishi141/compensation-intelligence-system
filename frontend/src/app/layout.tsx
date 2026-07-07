import type { Metadata } from "next";
import { Playfair_Display, Parisienne, Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const script = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Meridian — Compensation Intelligence",
  description:
    "Editorial-grade compensation benchmarking for boards, founders, and compensation committees.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${sans.variable}`}>
      <body className="bg-charcoal text-ivory font-sans antialiased selection:bg-sand selection:text-charcoal">
        {/* subtle paper-grain texture, fixed, non-interactive */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <Navbar />

        <main className="relative">{children}</main>

        <footer className="border-t border-line px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-sans text-[11px] uppercase tracking-widest2 text-ivory/50">
            © {new Date().getFullYear()} Meridian Compensation Intelligence
          </p>
          <p className="font-sans text-[11px] uppercase tracking-widest2 text-ivory/50">
            Data current as of market close
          </p>
        </footer>
      </body>
    </html>
  );
}