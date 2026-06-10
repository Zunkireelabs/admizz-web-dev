"use client";

import { useEffect, useRef } from "react";
import CTAForm from "@/components/ui/CTAForm";

interface Props {
  heading: string;
  subheading: string;
  ctaText?: string;
  ctaHref?: string;
  countryName: string;
}

// Big Ben at dusk — iconic, instantly UK
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=2000&q=80";

export default function UKCinematicHero({
  heading,
  subheading,
  ctaText = "Book Free Counselling",
  ctaHref = "#why",
  countryName,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled || !root) return;
      const ctx = gsap.context(() => {
        gsap.from("[data-hero-layer]", {
          opacity: 0,
          y: 18,
          duration: 1.1,
          stagger: 0.14,
          ease: "power3.out",
        });
        gsap.from("[data-hero-headline] > span", {
          opacity: 0,
          y: 28,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.25,
        });
        gsap.from("[data-hero-content]", {
          opacity: 0,
          y: 20,
          duration: 1,
          delay: 0.55,
          ease: "power3.out",
        });
      }, root);
      (root as unknown as { __gsapCtx?: gsap.Context }).__gsapCtx = ctx;
    });
    return () => {
      cancelled = true;
      const ctx = (root as unknown as { __gsapCtx?: { revert: () => void } }).__gsapCtx;
      if (ctx) ctx.revert();
    };
  }, []);

  const words = heading.split(" ");

  // Heritage UK palette — refined, not flag-coded
  const wordColor = (word: string): string => {
    const w = word.toLowerCase().replace(/[^a-z]/g, "");
    if (w === "study") return "#B08D57"; // brass gold
    if (w === "uk") return "#E5A969"; // brighter gold for emphasis
    return "#FFFFFF";
  };

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden text-white"
      style={{ minHeight: "min(720px, 92vh)" }}
    >
      {/* L1: Big Ben photo background */}
      <div
        className="absolute inset-0"
        data-hero-layer
        style={{
          backgroundImage: `url("${HERO_IMAGE}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      {/* L2: Dark Oxford-blue overlay for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, rgba(0,33,71,0.82) 0%, rgba(0,33,71,0.55) 55%, rgba(0,33,71,0.72) 100%)",
        }}
      />

      {/* L3: Top + bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div data-hero-content>
          {/* Eyebrow — brass gold */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ background: "#B08D57", opacity: 0.9 }} />
            <span
              className="text-[11px] uppercase tracking-[0.28em] font-semibold"
              style={{ color: "#B08D57" }}
            >
              From Nepal · To the United Kingdom
            </span>
          </div>

          {/* Headline */}
          <h1
            data-hero-headline
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              textShadow: "0 2px 20px rgba(0,0,0,0.35)",
            }}
          >
            {words.map((w, i) => (
              <span key={i} className="inline-block mr-3" style={{ color: wordColor(w) }}>
                {w}
              </span>
            ))}
          </h1>

          {/* Brass flourish — single accent, no flag colours */}
          <div className="flex items-center gap-2 mb-6">
            <span className="h-[2px] w-12 rounded-full" style={{ background: "#B08D57" }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#E5A969" aria-hidden="true">
              {/* Heraldic-ish diamond */}
              <path d="M12 2 L22 12 L12 22 L2 12 Z" />
            </svg>
            <span className="h-[2px] w-12 rounded-full" style={{ background: "#B08D57" }} />
          </div>

          <p className="text-base md:text-lg text-white/90 max-w-xl mb-8 leading-relaxed">
            {subheading}
          </p>

          {/* Trust pills — heritage palette */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { label: "1-Year Master's", color: "#E5A969", border: "rgba(229,169,105,0.55)" },
              { label: "2-Year Graduate Route", color: "#FFFFFF", border: "rgba(255,255,255,0.55)" },
              { label: "4 Unis in QS Top 10", color: "#A3C4D6", border: "rgba(163,196,214,0.6)" },
            ].map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: `1px solid ${b.border}`,
                  color: "#fff",
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={b.color}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {b.label}
              </span>
            ))}
          </div>

          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] hover:shadow-2xl"
            style={{
              background: "#B08D57",
              color: "#fff",
              boxShadow: "0 10px 30px rgba(176,141,87,0.45)",
            }}
          >
            {ctaText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div data-hero-content className="relative z-10">
          <CTAForm defaultDestination={countryName} />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 pointer-events-none"
        data-hero-layer
        style={{ bottom: 24, color: "rgba(255,255,255,0.7)" }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">Scroll</span>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
          <rect x="0.5" y="0.5" width="13" height="21" rx="6.5" stroke="currentColor" />
          <circle cx="7" cy="6" r="1.5" fill="currentColor">
            <animate attributeName="cy" values="6;14;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </section>
  );
}
