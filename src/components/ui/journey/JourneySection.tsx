"use client";

import { useEffect, useRef, useState } from "react";
import JourneyDonut from "./JourneyDonut";
import JourneyPanel from "./JourneyPanel";
import JourneyMobileTimeline from "./JourneyMobileTimeline";
import { journeySteps } from "./journey.data";

const AUTO_ADVANCE_MS = 6000;
const INTERACTION_PAUSE_MS = 15000;

interface JourneySectionProps {
  variant?: "hero" | "default";
  ctaHref?: string;
  ctaLabel?: string;
}

export default function JourneySection({
  variant = "default",
  ctaHref,
  ctaLabel = "Let's get you started",
}: JourneySectionProps) {
  const [active, setActive] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => {
      if (Date.now() < pausedUntil) return;
      setActive((i) => (i + 1) % journeySteps.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [pausedUntil]);

  const handleSelect = (i: number) => {
    setActive(i);
    setPausedUntil(Date.now() + INTERACTION_PAUSE_MS);
  };

  const isHero = variant === "hero";

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: isHero
          ? "linear-gradient(135deg, #001353 0%, #0D1282 50%, #1B0F4F 100%)"
          : "#F8F9FF",
      }}
    >
      <div
        className="hidden md:block absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: isHero
            ? "radial-gradient(circle, #FCB730 0%, transparent 70%)"
            : "radial-gradient(circle, #1E6DEB 0%, transparent 70%)",
          opacity: isHero ? 0.35 : 0.14,
          filter: isHero ? "blur(140px)" : "blur(48px)",
        }}
      />
      <div
        className="hidden md:block absolute -bottom-40 -right-32 w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{
          background: isHero
            ? "radial-gradient(circle, #7C3AED 0%, transparent 70%)"
            : "radial-gradient(circle, #BB5FEC 0%, transparent 70%)",
          opacity: isHero ? 0.30 : 0.14,
          filter: isHero ? "blur(160px)" : "blur(48px)",
        }}
      />

      {isHero && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          {isHero ? (
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] text-white/90 mb-4"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              Your study abroad journey
            </span>
          ) : (
            <p
              className="text-[13px] font-semibold uppercase tracking-[0.14em] mb-2"
              style={{ color: "#1E6DEB" }}
            >
              Your journey with Admizz
            </p>
          )}
          <h2
            className="text-[26px] md:text-[38px] font-bold leading-tight mb-3"
            style={{
              color: isHero ? "#FFFFFF" : "#0D1282",
              fontFamily: "var(--font-rubik), sans-serif",
            }}
          >
            5 steps from dream to departure
          </h2>
          <p
            className="text-[14px] md:text-[16px] max-w-2xl mx-auto"
            style={{ color: isHero ? "rgba(255,255,255,0.7)" : "#5C7189" }}
          >
            {isHero
              ? "You start at Step 1 — click any step to explore what's ahead."
              : "Click any step to explore what happens — from your first counselling call to landing in your new country."}
          </p>

          {isHero && (
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-bold"
              style={{
                background: "rgba(252,183,48,0.18)",
                color: "#FCB730",
                border: "1px solid rgba(252,183,48,0.35)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "#FCB730" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#FCB730" }} />
              </span>
              You start here — Step 1: Counselling
            </div>
          )}
        </div>

        {/* Desktop: donut + panel */}
        <div className="hidden md:grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
          <JourneyDonut activeIndex={active} onSelect={handleSelect} />
          <JourneyPanel activeIndex={active} />
        </div>

        {/* Mobile: timeline */}
        <div className="md:hidden">
          <JourneyMobileTimeline activeIndex={active} onSelect={handleSelect} />
        </div>

        {ctaHref && (
          <div className="mt-12 md:mt-16 text-center">
            <a
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-[12px] px-8 py-4 text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #FDED22 0%, #FCB730 100%)",
                boxShadow: "0 12px 30px rgba(252, 183, 48, 0.4)",
              }}
            >
              {ctaLabel}
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>
            <p
              className="mt-3 text-[13px]"
              style={{ color: isHero ? "rgba(255,255,255,0.5)" : "#5C7189" }}
            >
              Free · No commitment · Response within 24 hours
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
