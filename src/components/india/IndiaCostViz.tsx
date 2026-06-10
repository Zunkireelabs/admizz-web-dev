"use client";

import { useEffect, useRef, useState } from "react";

interface ScholarshipRow {
  name: string;
  provider?: string;
  details: string;
}

interface CostVizProps {
  scholarshipsTitle?: string;
  scholarshipsIntro?: string;
  scholarships?: ScholarshipRow[];
}

/**
 * Animated cost comparison for India vs other study destinations.
 *
 * Values are *indicative ranges in NPR* for one year of tuition.
 * Numbers are deliberately rounded headline figures meant to communicate
 * scale rather than precise quotes.
 */

interface ProgramRow {
  program: string;
  india: number; // in NPR (lakhs scaled)
  uk: number;
  usa: number;
  australia: number;
  indiaLabel: string;
  ukLabel: string;
  usaLabel: string;
  australiaLabel: string;
}

const PROGRAMS: ProgramRow[] = [
  {
    program: "Engineering (B.Tech)",
    india: 1.2,
    uk: 35,
    usa: 50,
    australia: 38,
    indiaLabel: "₹1.2L",
    ukLabel: "£20K",
    usaLabel: "$38K",
    australiaLabel: "AUD 42K",
  },
  {
    program: "Medical (MBBS)",
    india: 5,
    uk: 45,
    usa: 70,
    australia: 50,
    indiaLabel: "₹5L",
    ukLabel: "£28K",
    usaLabel: "$55K",
    australiaLabel: "AUD 55K",
  },
  {
    program: "MBA",
    india: 3,
    uk: 40,
    usa: 60,
    australia: 42,
    indiaLabel: "₹3L",
    ukLabel: "£25K",
    usaLabel: "$48K",
    australiaLabel: "AUD 47K",
  },
  {
    program: "Undergraduate (BA/BSc)",
    india: 1,
    uk: 28,
    usa: 40,
    australia: 30,
    indiaLabel: "₹1L",
    ukLabel: "£17K",
    usaLabel: "$30K",
    australiaLabel: "AUD 33K",
  },
];

const COUNTRIES = [
  { key: "india" as const, name: "India", color: "#1C5D3F", accent: "#FF6B1A", flag: "🇮🇳" },
  { key: "uk" as const, name: "UK", color: "#1F2A56", accent: "#C8102E", flag: "🇬🇧" },
  { key: "usa" as const, name: "USA", color: "#1A1A1A", accent: "#3C3B6E", flag: "🇺🇸" },
  { key: "australia" as const, name: "Australia", color: "#003049", accent: "#FFCB05", flag: "🇦🇺" },
];

export default function IndiaCostViz({ scholarshipsTitle, scholarshipsIntro, scholarships }: CostVizProps) {
  const [activeProgram, setActiveProgram] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const row = PROGRAMS[activeProgram];
  const max = Math.max(row.india, row.uk, row.usa, row.australia);

  return (
    <section
      ref={sectionRef}
      id="cost"
      className="py-20 scroll-mt-32 relative overflow-hidden"
      style={{ background: "#FFF8F1" }}
    >
      {/* paisley wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' fill='none' stroke='%231C5D3F' stroke-width='0.6' stroke-opacity='0.05'><path d='M50 12 C 68 12 75 32 62 44 C 55 50 55 60 62 66 C 68 72 68 78 50 84 C 32 78 32 72 38 66 C 45 60 45 50 38 44 C 25 32 32 12 50 12 Z'/></svg>`
          )}")`,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-8" style={{ background: "#C9A961" }} />
          <span
            className="text-[11px] uppercase tracking-[0.28em] font-semibold"
            style={{ color: "#0B3D2E" }}
          >
            Same Degree · Different Reality
          </span>
        </div>

        <h2
          className="text-3xl md:text-5xl font-bold leading-tight mb-3"
          style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#0B3D2E" }}
        >
          What you&apos;d pay where.
        </h2>
        <p className="text-[15px] md:text-base text-gray-700 mb-10 max-w-2xl leading-relaxed">
          Indicative annual tuition for popular programs, in equivalent NPR lakhs.
          Choose a program to compare destinations side-by-side.
        </p>

        {/* Program tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {PROGRAMS.map((p, i) => (
            <button
              key={p.program}
              onClick={() => setActiveProgram(i)}
              className="px-4 py-2 rounded-full text-[13px] font-medium transition-all"
              style={{
                background: activeProgram === i ? "#1C5D3F" : "rgba(28,93,63,0.06)",
                color: activeProgram === i ? "#fff" : "#0B3D2E",
                border: `1px solid ${activeProgram === i ? "#1C5D3F" : "rgba(28,93,63,0.18)"}`,
              }}
            >
              {p.program}
            </button>
          ))}
        </div>

        {/* Bars */}
        <div className="space-y-5">
          {COUNTRIES.map((c, idx) => {
            const value = row[c.key];
            const widthPct = inView ? (value / max) * 100 : 0;
            const label = row[(c.key + "Label") as keyof ProgramRow] as string;
            const isCheapest = value === Math.min(row.india, row.uk, row.usa, row.australia);
            return (
              <div key={c.key} className="grid grid-cols-[110px_1fr_auto] sm:grid-cols-[140px_1fr_auto] items-center gap-3 sm:gap-5">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 22 }}>{c.flag}</span>
                  <span className="font-semibold text-[14px] sm:text-[15px]" style={{ color: c.color }}>
                    {c.name}
                  </span>
                </div>
                <div className="relative h-9 sm:h-11 bg-white rounded-md overflow-hidden border" style={{ borderColor: "#0001" }}>
                  <div
                    className="absolute inset-y-0 left-0 rounded-md flex items-center pl-3"
                    style={{
                      width: `${widthPct}%`,
                      background: `linear-gradient(90deg, ${c.color}, ${c.accent})`,
                      transition: `width ${1 + idx * 0.15}s cubic-bezier(0.16, 1, 0.3, 1)`,
                      transitionDelay: `${idx * 0.08}s`,
                      boxShadow: `inset 0 -1px 0 ${c.color}66`,
                    }}
                  >
                    {isCheapest && (
                      <span
                        className="text-[10px] uppercase tracking-wider font-bold text-white px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(0,0,0,0.25)" }}
                      >
                        Best Value
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right min-w-[80px]">
                  <p className="text-[15px] sm:text-[17px] font-bold" style={{ color: c.color }}>
                    {label}
                  </p>
                  <p className="text-[10px] text-gray-500 -mt-0.5">per year</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Takeaway */}
        <div
          className="mt-12 p-6 md:p-8 rounded-2xl flex items-start gap-4"
          style={{
            background: "linear-gradient(135deg, rgba(28,93,63,0.04), rgba(255,107,26,0.05))",
            border: "1px solid rgba(201,169,97,0.4)",
          }}
        >
          <div
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "#FDED22", color: "#0B3D2E" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2 L14 9 L21 10 L15.5 14.5 L17 21 L12 17.5 L7 21 L8.5 14.5 L3 10 L10 9 Z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-[16px] md:text-lg mb-1" style={{ color: "#0B3D2E" }}>
              The math is hard to argue with.
            </h3>
            <p className="text-[14px] md:text-[15px] text-gray-700 leading-relaxed">
              A degree from a top Indian institution costs a fraction of the equivalent program abroad —
              with no visa hassle, no border, and a culture you already feel at home in.
              Add ICCR or COMPEX scholarships and the math gets even better.
            </p>
          </div>
        </div>

        {/* Scholarships block */}
        {scholarships && scholarships.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8" style={{ background: "#C9A961" }} />
              <span
                className="text-[11px] uppercase tracking-[0.28em] font-semibold"
                style={{ color: "#0B3D2E" }}
              >
                Scholarships
              </span>
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#0B3D2E" }}
            >
              {scholarshipsTitle || "Scholarships Available to Nepali Students"}
            </h3>
            {scholarshipsIntro && (
              <p className="text-[15px] text-gray-700 mb-6 max-w-2xl">{scholarshipsIntro}</p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {scholarships.map((s) => (
                <div
                  key={s.name}
                  className="bg-white rounded-xl p-5 border"
                  style={{ borderColor: "rgba(201,169,97,0.4)", boxShadow: "0 2px 14px rgba(11,61,46,0.04)" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,107,26,0.12)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6B1A" aria-hidden="true">
                        <path d="M12 2 L14 9 L21 10 L15.5 14.5 L17 21 L12 17.5 L7 21 L8.5 14.5 L3 10 L10 9 Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[15px] mb-1" style={{ color: "#0B3D2E" }}>
                        {s.name}
                      </h4>
                      <p className="text-[13px] text-gray-700 leading-relaxed">{s.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
