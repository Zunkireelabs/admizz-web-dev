"use client";

import { useEffect, useRef, useState } from "react";

/**
 * UK Why-Narrative — 4 beats, pinned scroll, custom visuals.
 * Mirrors the India narrative structure with UK-specific arguments.
 */

interface Beat {
  eyebrow: string;
  claim: string;
  support: string;
  gradient: string;
  accent: string;
}

const BEATS: Beat[] = [
  {
    eyebrow: "Half the time, half the cost",
    claim: "1-year Master's.",
    support:
      "UK Master's programmes run for just 12 months — that's half the duration of US or Australian equivalents, and a year of saved tuition + living costs.",
    gradient: "linear-gradient(135deg, #002147 0%, #001633 100%)",
    accent: "#E5A969",
  },
  {
    eyebrow: "Stay. Work. Settle.",
    claim: "2-year Graduate Route.",
    support:
      "After graduating, the UK gives you a 2-year work visa with no sponsor needed — full freedom to find a job, build experience, and convert to a Skilled Worker Visa.",
    gradient: "linear-gradient(135deg, #1F4332 0%, #0E2A1E 100%)",
    accent: "#E5A969",
  },
  {
    eyebrow: "The world's top tier",
    claim: "4 universities in the QS Top 10.",
    support:
      "Oxford, Cambridge, Imperial, UCL — all consistently ranked in the global top 10. Nowhere else in the world packs this much academic prestige into one country.",
    gradient: "linear-gradient(135deg, #800020 0%, #4A0013 100%)",
    accent: "#E5A969",
  },
  {
    eyebrow: "You'll fit in fast",
    claim: "100% English-medium.",
    support:
      "No language barrier, 600,000+ international students, a Nepali society on nearly every major campus. The UK feels familiar from day one.",
    gradient: "linear-gradient(135deg, #002147 0%, #1F4332 100%)",
    accent: "#E5A969",
  },
];

export default function UKWhyNarrative() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const wrap = wrapRef.current;
    const pin = pinRef.current;
    if (!wrap || !pin) return;

    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: wrap,
            start: "top top",
            end: () => `+=${(BEATS.length - 1) * window.innerHeight}`,
            pin: pin,
            scrub: 0.6,
            onUpdate: (self) => {
              const idx = Math.min(
                BEATS.length - 1,
                Math.round(self.progress * (BEATS.length - 1))
              );
              setBeat(idx);
            },
          });
        }, wrap);
        (wrap as unknown as { __ctx?: gsap.Context }).__ctx = ctx;
      }
    );
    return () => {
      cancelled = true;
      const ctx = (wrap as unknown as { __ctx?: { revert: () => void } }).__ctx;
      if (ctx) ctx.revert();
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="py-16" style={{ background: "#F5F3EE" }}>
        <div className="max-w-6xl mx-auto px-4">
          <NarrativeHeading />
          <div className="space-y-12">
            {BEATS.map((b, i) => (
              <div key={i}>
                <BeatVisual beat={b} index={i} active />
                <BeatContent beat={b} index={i} total={BEATS.length} mobile />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapRef} style={{ height: `${BEATS.length * 100}vh`, background: "#F5F3EE" }}>
      <div ref={pinRef} className="h-screen w-full flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4 flex-shrink-0">
          <NarrativeHeading />
        </div>
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 gap-10 items-center w-full pb-12">
          <div className="relative">
            {BEATS.map((b, i) => (
              <div
                key={i}
                style={{
                  position: i === beat ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: i === beat ? 1 : 0,
                  transform: i === beat ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  pointerEvents: i === beat ? "auto" : "none",
                }}
              >
                <BeatContent beat={b} index={i} total={BEATS.length} />
              </div>
            ))}
          </div>
          <div className="relative h-[500px]">
            {BEATS.map((b, i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  opacity: i === beat ? 1 : 0,
                  transform: i === beat ? "scale(1)" : "scale(1.04)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <BeatVisual beat={b} index={i} active={i === beat} />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
          {BEATS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === beat ? 8 : 5,
                height: i === beat ? 28 : 5,
                background: i === beat ? "#B08D57" : "rgba(0,33,71,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function NarrativeHeading() {
  return (
    <div className="text-center mb-2 md:mb-0">
      <div className="inline-flex items-center gap-3 mb-2">
        <span className="h-px w-8" style={{ background: "#B08D57" }} />
        <span
          className="text-[11px] uppercase tracking-[0.28em] font-semibold"
          style={{ color: "#002147" }}
        >
          Why the UK, Really?
        </span>
        <span className="h-px w-8" style={{ background: "#B08D57" }} />
      </div>
    </div>
  );
}

function BeatContent({
  beat,
  index,
  total,
  mobile,
}: {
  beat: Beat;
  index: number;
  total: number;
  mobile?: boolean;
}) {
  return (
    <div className={mobile ? "pt-6" : ""}>
      <p
        className="text-[10px] uppercase tracking-[0.28em] font-bold mb-3"
        style={{ color: "#B08D57" }}
      >
        Reason {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")} · {beat.eyebrow}
      </p>
      <h3
        className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6"
        style={{ fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif', color: "#002147" }}
      >
        {beat.claim}
      </h3>
      <div className="flex items-center gap-2 mb-5">
        <span className="h-[2px] w-12 rounded-full" style={{ background: "#B08D57" }} />
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#B08D57">
          <path d="M12 2 L22 12 L12 22 L2 12 Z" />
        </svg>
      </div>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg">
        {beat.support}
      </p>
    </div>
  );
}

function BeatVisual({ beat, active, index }: { beat: Beat; active: boolean; index?: number }) {
  return (
    <div
      className="w-full h-full rounded-3xl overflow-hidden relative"
      style={{
        background: beat.gradient,
        boxShadow: active ? "0 30px 80px rgba(0,33,71,0.25)" : "0 10px 30px rgba(0,33,71,0.12)",
        transition: "box-shadow 0.6s ease",
        minHeight: 320,
      }}
    >
      {/* Subtle linen-paper pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><path d='M0 20 L40 20 M20 0 L20 40' stroke='%23E5A969' stroke-width='0.4' stroke-opacity='0.06'/></svg>`
          )}")`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Heraldic corners */}
      <HeraldicCorner position="tl" color={beat.accent} />
      <HeraldicCorner position="tr" color={beat.accent} />
      <HeraldicCorner position="bl" color={beat.accent} />
      <HeraldicCorner position="br" color={beat.accent} />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 py-10">
        {index === 0 && <TimeBars active={active} accent={beat.accent} />}
        {index === 1 && <GraduateTimeline active={active} accent={beat.accent} />}
        {index === 2 && <RankingPodium active={active} accent={beat.accent} />}
        {index === 3 && <CommunityStats active={active} accent={beat.accent} />}
      </div>
    </div>
  );
}

function HeraldicCorner({
  position,
  color,
}: {
  position: "tl" | "tr" | "bl" | "br";
  color: string;
}) {
  const styles: Record<typeof position, React.CSSProperties> = {
    tl: { top: 16, left: 16 },
    tr: { top: 16, right: 16, transform: "scaleX(-1)" },
    bl: { bottom: 16, left: 16, transform: "scaleY(-1)" },
    br: { bottom: 16, right: 16, transform: "scale(-1,-1)" },
  };
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      strokeOpacity="0.7"
      className="absolute"
      style={styles[position]}
      aria-hidden="true"
    >
      <path d="M 4 4 L 36 4" />
      <path d="M 4 4 L 4 36" />
      <path d="M 4 4 L 14 14" strokeOpacity="0.5" />
      <circle cx="4" cy="4" r="2.5" fill={color} fillOpacity="0.6" stroke="none" />
    </svg>
  );
}

/* ============================================================ */
/* Beat 01 — Time / cost comparison bars                        */
/* ============================================================ */
function TimeBars({ active, accent }: { active: boolean; accent: string }) {
  const rows = [
    { label: "UK Master's", value: "12 months", width: 25, highlight: true },
    { label: "Australia", value: "18–24 months", width: 45, highlight: false },
    { label: "USA", value: "24 months", width: 55, highlight: false },
    { label: "Canada", value: "16–24 months", width: 50, highlight: false },
  ];
  return (
    <div className="w-full max-w-md">
      <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1" style={{ color: accent }}>
        Master's duration
      </p>
      <p className="text-2xl font-bold mb-5" style={{ fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif' }}>
        UK vs. everywhere else
      </p>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between text-[12px] mb-1">
              <span
                className={r.highlight ? "font-bold" : "opacity-80"}
                style={r.highlight ? { color: accent } : undefined}
              >
                {r.label}
              </span>
              <span
                className={r.highlight ? "font-bold" : "opacity-70"}
                style={r.highlight ? { color: accent } : undefined}
              >
                {r.value}
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: active ? `${r.width}%` : "0%",
                  background: r.highlight ? accent : "rgba(255,255,255,0.55)",
                  transition: "width 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
                  boxShadow: r.highlight ? `0 0 18px ${accent}55` : "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] mt-5 opacity-75 leading-relaxed">
        A UK Master's saves a full year of tuition and living costs — roughly £15,000–£25,000 versus US programmes.
      </p>
    </div>
  );
}

/* ============================================================ */
/* Beat 02 — Graduate Route timeline                            */
/* ============================================================ */
function GraduateTimeline({ active, accent }: { active: boolean; accent: string }) {
  const steps = [
    { label: "Course", duration: "12 mo", colour: accent },
    { label: "Graduate Route", duration: "24 mo", colour: "#A3C4D6" },
    { label: "Skilled Worker → Settlement", duration: "5 yr", colour: "#FFFFFF" },
  ];
  return (
    <div className="w-full max-w-md">
      <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1" style={{ color: accent }}>
        After your degree
      </p>
      <p className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif' }}>
        Stay, work, settle
      </p>

      <div className="relative">
        {/* Track */}
        <div
          className="absolute left-3 top-3 bottom-3 w-px"
          style={{ background: "rgba(255,255,255,0.25)" }}
        />
        <div className="space-y-5">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className="flex items-center gap-4"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateX(0)" : "translateX(-10px)",
                transition: `opacity 0.55s ease ${0.15 + i * 0.15}s, transform 0.55s ease ${0.15 + i * 0.15}s`,
              }}
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: s.colour,
                  background: `${s.colour}22`,
                  boxShadow: `0 0 12px ${s.colour}55`,
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: s.colour }} />
              </span>
              <div className="flex-1 flex items-baseline justify-between">
                <span className="font-semibold text-[14px]">{s.label}</span>
                <span className="text-[12px] opacity-75">{s.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-5 rounded-xl px-4 py-3 flex items-center gap-3"
        style={{
          background: `${accent}22`,
          border: `1px solid ${accent}55`,
          boxShadow: active ? `0 0 24px ${accent}33` : "none",
          transition: "box-shadow 0.6s ease 0.6s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="text-[13px] font-semibold" style={{ color: accent }}>
          No sponsor needed for the Graduate Route
        </span>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Beat 03 — Ranking podium                                     */
/* ============================================================ */
function RankingPodium({ active, accent }: { active: boolean; accent: string }) {
  const unis = [
    { rank: 2, name: "Imperial College London", year: "Founded 1907" },
    { rank: 3, name: "University of Oxford", year: "Founded 1096" },
    { rank: 5, name: "University of Cambridge", year: "Founded 1209" },
    { rank: 9, name: "UCL", year: "Founded 1826" },
  ];
  return (
    <div className="w-full max-w-md">
      <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1" style={{ color: accent }}>
        QS World Rankings 2025
      </p>
      <p className="text-2xl font-bold mb-5" style={{ fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif' }}>
        Four in the top ten
      </p>

      <div className="space-y-2.5">
        {unis.map((u, i) => (
          <div
            key={u.name}
            className="flex items-center gap-4 rounded-xl px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.10)",
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.5s ease ${0.15 + i * 0.1}s, transform 0.5s ease ${0.15 + i * 0.1}s`,
            }}
          >
            <span
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold"
              style={{
                background: accent,
                color: "#002147",
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              }}
            >
              #{u.rank}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[14px] truncate">{u.name}</p>
              <p className="text-[11px] opacity-65">{u.year}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] mt-5 opacity-75 leading-relaxed">
        No other country has this many top-10 universities. Studying here means studying with the best.
      </p>
    </div>
  );
}

/* ============================================================ */
/* Beat 04 — Community stats                                    */
/* ============================================================ */
function CommunityStats({ active, accent }: { active: boolean; accent: string }) {
  const stats = [
    { value: "100%", label: "English-medium teaching" },
    { value: "600k+", label: "International students" },
    { value: "130+", label: "Universities to choose from" },
    { value: "10k+", label: "Nepali students in the UK" },
  ];
  return (
    <div className="w-full max-w-md">
      <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1" style={{ color: accent }}>
        You're not alone
      </p>
      <p className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif' }}>
        A community already there
      </p>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="rounded-xl px-4 py-4"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.10)",
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(0.96)",
              transition: `opacity 0.5s ease ${0.15 + i * 0.1}s, transform 0.5s ease ${0.15 + i * 0.1}s`,
            }}
          >
            <p
              className="text-3xl font-bold mb-1"
              style={{ color: accent, fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif' }}
            >
              {s.value}
            </p>
            <p className="text-[11px] opacity-80 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      <p className="text-[11px] mt-5 opacity-75 leading-relaxed">
        Every major UK campus has an active Nepali Society. From Day One, you'll meet people who get it.
      </p>
    </div>
  );
}
