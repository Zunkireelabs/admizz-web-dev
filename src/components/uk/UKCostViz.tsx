"use client";

import { useEffect, useRef, useState } from "react";

interface ScholarshipRow {
  name: string;
  provider?: string;
  details: string;
}

interface Props {
  scholarshipsTitle?: string;
  scholarshipsIntro?: string;
  scholarships?: ScholarshipRow[];
}

interface ProgramCost {
  level: string;
  tuitionLow: number;
  tuitionHigh: number;
  living: number; // London / national average mid
  totalLabel: string;
  duration: string;
}

const PROGRAMS: ProgramCost[] = [
  {
    level: "Undergraduate",
    tuitionLow: 17,
    tuitionHigh: 30,
    living: 12,
    totalLabel: "£29K – £42K / year",
    duration: "3 years (4 in Scotland)",
  },
  {
    level: "Master's (taught)",
    tuitionLow: 18,
    tuitionHigh: 35,
    living: 12,
    totalLabel: "£30K – £47K total",
    duration: "12 months",
  },
  {
    level: "MBA",
    tuitionLow: 25,
    tuitionHigh: 60,
    living: 14,
    totalLabel: "£39K – £74K total",
    duration: "12–18 months",
  },
  {
    level: "PhD",
    tuitionLow: 5,
    tuitionHigh: 22,
    living: 12,
    totalLabel: "£17K – £34K / year",
    duration: "3–4 years",
  },
];

export default function UKCostViz({
  scholarshipsTitle = "Scholarships for Nepali Students",
  scholarshipsIntro,
  scholarships,
}: Props) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
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

  const p = PROGRAMS[active];
  const maxBar = 60; // for scaling
  const tLowPct = (p.tuitionLow / maxBar) * 100;
  const tHighPct = (p.tuitionHigh / maxBar) * 100;
  const livePct = (p.living / maxBar) * 100;

  return (
    <section
      ref={ref}
      className="py-20 md:py-24 relative overflow-hidden"
      style={{ background: "#F5F3EE" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8" style={{ background: "#B08D57" }} />
            <span
              className="text-[11px] uppercase tracking-[0.28em] font-semibold"
              style={{ color: "#002147" }}
            >
              The Real Numbers
            </span>
            <span className="h-px w-8" style={{ background: "#B08D57" }} />
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight mb-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#002147" }}
          >
            What it costs.{" "}
            <span style={{ color: "#B08D57" }}>What it&apos;s worth.</span>
          </h2>
          <p className="text-[15px] text-gray-700 max-w-2xl mx-auto">
            Real ranges for tuition, living, and a clear picture of the return — because cost without context isn&apos;t useful.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {PROGRAMS.map((prog, i) => (
            <button
              key={prog.level}
              onClick={() => setActive(i)}
              className="px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all"
              style={{
                background: i === active ? "#002147" : "#FFFFFF",
                color: i === active ? "#fff" : "#002147",
                border: `1px solid ${i === active ? "#002147" : "rgba(0,33,71,0.15)"}`,
                boxShadow: i === active ? "0 6px 16px rgba(0,33,71,0.18)" : "none",
              }}
            >
              {prog.level}
            </button>
          ))}
        </div>

        {/* Cost card */}
        <div
          className="rounded-2xl p-7 md:p-9 mb-8 bg-white"
          style={{
            border: "1px solid rgba(176,141,87,0.3)",
            boxShadow: "0 14px 50px rgba(0,33,71,0.06)",
          }}
        >
          <div className="grid md:grid-cols-[1.2fr_auto] gap-6 md:gap-10 items-start mb-7">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.28em] font-bold mb-1"
                style={{ color: "#B08D57" }}
              >
                {p.duration}
              </p>
              <h3
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#002147" }}
              >
                {p.level}
              </h3>
              <p className="text-[13px] text-gray-600">
                Tuition + living cost, indicative ranges for a Nepali international student.
              </p>
            </div>
            <div className="md:text-right">
              <p
                className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1"
                style={{ color: "#002147" }}
              >
                Total cost
              </p>
              <p
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#B08D57" }}
              >
                {p.totalLabel}
              </p>
            </div>
          </div>

          {/* Bars */}
          <div className="space-y-5">
            <Row
              label="Tuition (low end)"
              value={`£${p.tuitionLow}K / year`}
              widthPct={inView ? tLowPct : 0}
              fill="#002147"
            />
            <Row
              label="Tuition (high end)"
              value={`£${p.tuitionHigh}K / year`}
              widthPct={inView ? tHighPct : 0}
              fill="#1F4332"
            />
            <Row
              label="Living costs"
              value={`£${p.living}K / year`}
              widthPct={inView ? livePct : 0}
              fill="#B08D57"
              subtle
            />
          </div>
        </div>

        {/* ROI panel */}
        <div
          className="rounded-2xl p-7 md:p-9 mb-12 grid md:grid-cols-3 gap-6 text-white"
          style={{
            background: "linear-gradient(135deg, #002147 0%, #001633 100%)",
            boxShadow: "0 20px 60px rgba(0,33,71,0.25)",
          }}
        >
          <div className="md:col-span-3 md:mb-2">
            <p
              className="text-[11px] uppercase tracking-[0.28em] font-bold"
              style={{ color: "#B08D57" }}
            >
              The return
            </p>
            <h3
              className="text-2xl md:text-3xl font-bold mt-1"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Two years to earn it back.
            </h3>
            <p className="text-[14px] opacity-80 mt-1 max-w-3xl">
              After graduating, the UK&apos;s 2-year Graduate Route visa lets you work in any role.
              Average graduate starting salaries:
            </p>
          </div>

          <ROIStat headline="£28k – £35k" caption="STEM / engineering graduates" accent="#E5A969" />
          <ROIStat headline="£32k – £45k" caption="Finance / consulting in London" accent="#A3C4D6" />
          <ROIStat headline="£40k+" caption="Skilled Worker Visa threshold" accent="#FFFFFF" />
        </div>

        {/* Scholarships */}
        {scholarships && scholarships.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="h-px w-8" style={{ background: "#B08D57" }} />
                <span
                  className="text-[11px] uppercase tracking-[0.28em] font-semibold"
                  style={{ color: "#002147" }}
                >
                  Funding Your Studies
                </span>
                <span className="h-px w-8" style={{ background: "#B08D57" }} />
              </div>
              <h3
                className="text-2xl md:text-4xl font-bold"
                style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#002147" }}
              >
                {scholarshipsTitle}
              </h3>
              {scholarshipsIntro && (
                <p className="text-[14px] text-gray-700 max-w-2xl mx-auto mt-2">
                  {scholarshipsIntro}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {scholarships.map((s) => (
                <div
                  key={s.name}
                  className="rounded-xl p-5 bg-white"
                  style={{
                    border: "1px solid rgba(176,141,87,0.3)",
                    boxShadow: "0 6px 24px rgba(0,33,71,0.05)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "#002147" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#B08D57" aria-hidden="true">
                        <path d="M12 2 L22 12 L12 22 L2 12 Z" />
                      </svg>
                    </span>
                    <div>
                      <p
                        className="font-bold text-[15.5px] leading-tight mb-1"
                        style={{ color: "#002147", fontFamily: '"Playfair Display", Georgia, serif' }}
                      >
                        {s.name}
                      </p>
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

function Row({
  label,
  value,
  widthPct,
  fill,
  subtle,
}: {
  label: string;
  value: string;
  widthPct: number;
  fill: string;
  subtle?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[13px] mb-1.5">
        <span className="font-semibold" style={{ color: "#002147" }}>
          {label}
        </span>
        <span className="font-bold" style={{ color: subtle ? "#B08D57" : "#002147" }}>
          {value}
        </span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(0,33,71,0.07)" }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${widthPct}%`,
            background: fill,
            transition: "width 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: subtle ? 0.85 : 1,
          }}
        />
      </div>
    </div>
  );
}

function ROIStat({
  headline,
  caption,
  accent,
}: {
  headline: string;
  caption: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-xl px-5 py-4"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <p
        className="text-2xl md:text-3xl font-bold mb-1"
        style={{ color: accent, fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        {headline}
      </p>
      <p className="text-[12px] opacity-80">{caption}</p>
    </div>
  );
}
