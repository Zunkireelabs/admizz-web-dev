"use client";

import { useEffect, useRef, useState } from "react";
import LandmarkSilhouette, { type LandmarkName } from "@/components/india/LandmarkSilhouette";

/**
 * Pinned scroll narrative — the page's signature moment.
 *
 * Sticks for ~4 viewport heights and reveals four bold claims in sequence,
 * each with an art-directed visual. ScrollTrigger drives a "current beat"
 * index; each beat swaps in via crossfade.
 *
 * Placeholder visuals: gradient panels + landmark silhouettes + subtle
 * patterns. Replace with real photography in a later pass.
 */

interface Beat {
  eyebrow: string;
  claim: string;
  support: string;
  visual: {
    gradient: string;
    landmark?: LandmarkName;
    accent?: string;
    icon?: "rupee" | "border" | "students" | "heart";
  };
}

const BEATS: Beat[] = [
  {
    eyebrow: "The numbers don't lie",
    claim: "₹50,000 a year.",
    support: "That's what a year at one of India's top government engineering schools costs — about a tenth of the equivalent in the West.",
    visual: {
      gradient: "linear-gradient(135deg, #1C5D3F 0%, #0B3D2E 100%)",
      landmark: "lotus-temple",
      accent: "#FDED22",
      icon: "rupee",
    },
  },
  {
    eyebrow: "Since 1950",
    claim: "Zero visa hassle.",
    support: "The India–Nepal open border treaty means no student visa, no embassy queues, no waiting weeks for a decision. Just enroll and go.",
    visual: {
      gradient: "linear-gradient(135deg, #FF6B1A 0%, #C9472A 100%)",
      landmark: "india-gate",
      accent: "#FFF8F1",
      icon: "border",
    },
  },
  {
    eyebrow: "Right now. Across India.",
    claim: "1,500+ Nepali students.",
    support: "From IIT Bombay to AIIMS Delhi to Manipal — there's already a community waiting at the campus you choose.",
    visual: {
      gradient: "linear-gradient(135deg, #6B2B1F 0%, #1C5D3F 100%)",
      landmark: "taj-mahal",
      accent: "#FDED22",
      icon: "students",
    },
  },
  {
    eyebrow: "You're already home",
    claim: "A culture you know by heart.",
    support: "Shared festivals, shared food, shared languages, shared history. Studying in India isn't moving abroad — it's stepping next door.",
    visual: {
      gradient: "linear-gradient(135deg, #C9A961 0%, #FF6B1A 100%)",
      landmark: "mysore-palace",
      accent: "#0B3D2E",
      icon: "heart",
    },
  },
];

export default function IndiaWhyNarrative() {
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

  // Mobile: render all beats sequentially, no pinning
  if (isMobile) {
    return (
      <section className="py-16" style={{ background: "#FFF8F1" }}>
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

  // Desktop: pinned scroll narrative
  return (
    <section ref={wrapRef} style={{ height: `${BEATS.length * 100}vh`, background: "#FFF8F1" }}>
      <div ref={pinRef} className="h-screen w-full flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4 flex-shrink-0">
          <NarrativeHeading />
        </div>
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 gap-10 items-center w-full pb-12">
          {/* Left: content (animated by index) */}
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
          {/* Right: visual */}
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

        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
          {BEATS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === beat ? 8 : 5,
                height: i === beat ? 28 : 5,
                background: i === beat ? "#FF6B1A" : "rgba(11,61,46,0.3)",
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
        <span className="h-px w-8" style={{ background: "#C9A961" }} />
        <span
          className="text-[11px] uppercase tracking-[0.28em] font-semibold"
          style={{ color: "#0B3D2E" }}
        >
          Why India, Really?
        </span>
        <span className="h-px w-8" style={{ background: "#C9A961" }} />
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
        style={{ color: "#FF6B1A" }}
      >
        Reason {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")} · {beat.eyebrow}
      </p>
      <h3
        className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6"
        style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#0B3D2E" }}
      >
        {beat.claim}
      </h3>
      <div className="flex items-center gap-2 mb-5">
        <span className="h-[2px] w-12 rounded-full" style={{ background: "#C9A961" }} />
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#C9A961">
          <path d="M12 2 L14 9 L21 10 L15.5 14.5 L17 21 L12 17.5 L7 21 L8.5 14.5 L3 10 L10 9 Z" />
        </svg>
      </div>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg">
        {beat.support}
      </p>
    </div>
  );
}

function BeatVisual({ beat, active, index }: { beat: Beat; active: boolean; index?: number }) {
  const accent = beat.visual.accent || "#FDED22";
  return (
    <div
      className="w-full h-full rounded-3xl overflow-hidden relative"
      style={{
        background: beat.visual.gradient,
        boxShadow: active ? "0 30px 80px rgba(11,61,46,0.25)" : "0 10px 30px rgba(11,61,46,0.12)",
        transition: "box-shadow 0.6s ease",
        minHeight: 320,
      }}
    >
      {/* Paisley pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80' fill='none' stroke='%23FDED22' stroke-width='0.5' stroke-opacity='0.10'><path d='M40 10 C 55 10 60 25 50 35 C 45 40 45 50 50 55 C 55 60 55 65 40 70 C 25 65 25 60 30 55 C 35 50 35 40 30 35 C 20 25 25 10 40 10 Z'/></svg>`
          )}")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Filigree corners */}
      <FiligreeCorner position="tl" color={accent} />
      <FiligreeCorner position="tr" color={accent} />
      <FiligreeCorner position="bl" color={accent} />
      <FiligreeCorner position="br" color={accent} />

      {/* Beat-specific content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 py-10">
        {index === 0 && <CostBars active={active} accent={accent} />}
        {index === 1 && <NoVisaList active={active} accent={accent} />}
        {index === 2 && <CommunityMap active={active} accent={accent} />}
        {index === 3 && <CultureParallels active={active} accent={accent} />}
      </div>

      {/* Landmark silhouette at bottom — subtle chrome */}
      {beat.visual.landmark && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none opacity-30">
          <LandmarkSilhouette name={beat.visual.landmark} color="#000" opacity={0.25} width="80%" height={90} />
        </div>
      )}
    </div>
  );
}

/* ============================================================ */
/* Beat 01 — Cost comparison bar chart                          */
/* ============================================================ */
function CostBars({ active, accent }: { active: boolean; accent: string }) {
  const rows = [
    { country: "India", value: "₹50,000", width: 8, highlight: true },
    { country: "Australia", value: "~₹20L", width: 65, highlight: false },
    { country: "UK", value: "~₹15L", width: 50, highlight: false },
    { country: "USA", value: "~₹25L", width: 85, highlight: false },
  ];
  return (
    <div className="w-full max-w-md">
      <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1" style={{ color: accent }}>
        Annual tuition
      </p>
      <p className="text-2xl font-bold mb-5" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
        India vs. the West
      </p>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.country}>
            <div className="flex items-baseline justify-between text-[12px] mb-1">
              <span className={r.highlight ? "font-bold" : "opacity-80"} style={r.highlight ? { color: accent } : undefined}>
                {r.country}
              </span>
              <span className={r.highlight ? "font-bold" : "opacity-70"} style={r.highlight ? { color: accent } : undefined}>
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
        Government-subsidised tuition for SAARC students keeps top Indian institutions a fraction of Western costs.
      </p>
    </div>
  );
}

/* ============================================================ */
/* Beat 02 — Anti-checklist (what you DON'T need)               */
/* ============================================================ */
function NoVisaList({ active, accent }: { active: boolean; accent: string }) {
  const skips = [
    "Student visa (6–8 weeks)",
    "Embassy interview",
    "I-20 / CAS letter",
    "Biometric appointment",
    "$160+ visa fee",
  ];
  return (
    <div className="w-full max-w-md">
      <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1" style={{ color: accent }}>
        Open border · since 1950
      </p>
      <p className="text-2xl font-bold mb-5" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
        What you don&apos;t need
      </p>
      <ul className="space-y-2.5 mb-5">
        {skips.map((item, i) => (
          <li
            key={item}
            className="flex items-center gap-3 text-[13px]"
            style={{
              opacity: active ? 0.85 : 0,
              transform: active ? "translateX(0)" : "translateX(-8px)",
              transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s`,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="flex-shrink-0 opacity-70">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
            <span className="line-through decoration-2 decoration-white/40">{item}</span>
          </li>
        ))}
      </ul>
      <div
        className="rounded-xl px-4 py-3 flex items-center gap-3"
        style={{
          background: `${accent}22`,
          border: `1px solid ${accent}66`,
          boxShadow: active ? `0 0 24px ${accent}33` : "none",
          transition: "box-shadow 0.6s ease 0.6s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="text-[13px] font-semibold" style={{ color: accent }}>
          Just: passport → cross border → enroll
        </span>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Beat 03 — Community map with pins                            */
/* ============================================================ */
function CommunityMap({ active, accent }: { active: boolean; accent: string }) {
  // Real geographic positions on the india-outline.svg (viewBox 1024x1024)
  const pins = [
    { name: "AIIMS Delhi", x: 332, y: 308 },
    { name: "BITS Pilani", x: 288, y: 315 },
    { name: "IIT Bombay", x: 215, y: 623 },
    { name: "KIIT Bhubaneswar", x: 566, y: 583 },
    { name: "Manipal", x: 267, y: 814 },
    { name: "IISc Bangalore", x: 343, y: 824 },
  ];
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1" style={{ color: accent }}>
        Right now · across India
      </p>
      <p
        className="text-5xl font-bold mb-1"
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          color: accent,
          textShadow: active ? `0 0 30px ${accent}55` : "none",
          transition: "text-shadow 0.7s ease",
        }}
      >
        1,500+
      </p>
      <p className="text-[12px] opacity-80 mb-4">Nepali students enrolled</p>

      <div className="relative w-full" style={{ aspectRatio: "1 / 1", maxWidth: 240 }}>
        <svg viewBox="0 0 1024 1024" className="w-full h-full" aria-hidden="true">
          {/* Real India outline — filtered to read as accent silhouette on dark panel */}
          <image
            href="/images/maps/india-outline.svg"
            x="0"
            y="0"
            width="1024"
            height="1024"
            preserveAspectRatio="xMidYMid meet"
            style={{
              filter: "brightness(0) invert(1)",
              opacity: 0.18,
            }}
          />
          {pins.map((p, i) => (
            <g key={p.name}>
              <circle
                cx={p.x}
                cy={p.y}
                r={active ? 40 : 0}
                fill="none"
                stroke={accent}
                strokeWidth="5"
                opacity={active ? 0 : 0.6}
                style={{
                  transformOrigin: `${p.x}px ${p.y}px`,
                  animation: active ? `pulse-pin 2.2s ${i * 0.25}s ease-out infinite` : "none",
                }}
              />
              <circle cx={p.x} cy={p.y} r="12" fill={accent} />
              <circle cx={p.x} cy={p.y} r="6" fill="#0B3D2E" />
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] opacity-85 mt-3">
        {pins.map((p) => (
          <span key={p.name} className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            {p.name}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse-pin {
          0% { r: 12; opacity: 0.7; }
          80% { r: 55; opacity: 0; }
          100% { r: 55; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ============================================================ */
/* Beat 04 — Culture parallels                                   */
/* ============================================================ */
function CultureParallels({ active, accent }: { active: boolean; accent: string }) {
  const pairs = [
    { nepal: "Dashain", india: "Dussehra", op: "≈" },
    { nepal: "Tihar", india: "Diwali", op: "≈" },
    { nepal: "Dal-bhat", india: "Dal-bhat", op: "=" },
    { nepal: "Devanagari", india: "Devanagari", op: "=" },
    { nepal: "Nepali", india: "Hindi", op: "≈" },
  ];
  return (
    <div className="w-full max-w-md">
      <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1" style={{ color: accent }}>
        Shared by heart
      </p>
      <p className="text-2xl font-bold mb-5" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
        Nepal &amp; India, side by side
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-2">
        <div className="text-[10px] uppercase tracking-[0.2em] opacity-65 font-bold">Nepal</div>
        <div />
        <div className="text-[10px] uppercase tracking-[0.2em] opacity-65 font-bold text-right">India</div>

        {pairs.map((p, i) => (
          <Pair key={p.nepal + p.india} pair={p} index={i} active={active} accent={accent} />
        ))}
      </div>

      <p className="text-[11px] mt-5 opacity-75 leading-relaxed">
        Same festivals, same scripts, same plates — studying in India isn&apos;t moving abroad.
      </p>
    </div>
  );
}

function Pair({
  pair,
  index,
  active,
  accent,
}: {
  pair: { nepal: string; india: string; op: string };
  index: number;
  active: boolean;
  accent: string;
}) {
  const delay = 0.15 + index * 0.08;
  const style: React.CSSProperties = {
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(6px)",
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  };
  return (
    <>
      <div className="text-[14px] font-semibold" style={style}>
        {pair.nepal}
      </div>
      <div
        className="text-[12px] font-bold w-5 text-center"
        style={{ ...style, color: accent }}
      >
        {pair.op}
      </div>
      <div className="text-[14px] font-semibold text-right" style={style}>
        {pair.india}
      </div>
    </>
  );
}

function FiligreeCorner({
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
      width="36"
      height="36"
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
      <path d="M 4 4 Q 18 8 18 18 Q 18 28 28 28" strokeOpacity="0.5" />
      <circle cx="4" cy="4" r="2.5" fill={color} fillOpacity="0.6" stroke="none" />
    </svg>
  );
}

