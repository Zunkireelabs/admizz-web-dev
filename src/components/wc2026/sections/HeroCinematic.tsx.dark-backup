"use client";

import { useEffect, useState } from "react";
import { useLive } from "@/lib/wc2026/LiveProvider";
import { formatKickoff } from "@/lib/wc2026/format";
import { useTimezone } from "@/lib/wc2026/TimezoneProvider";
import { ArrowRightIcon } from "../shared/Icons";
import FloatingNav from "../shared/FloatingNav";

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1522778034537-20a2486be803?auto=format&fit=crop&w=2400&q=80";

const PARTICLES = Array.from({ length: 18 }).map((_, i) => ({
  left: (i * 53) % 100,
  top: 20 + ((i * 31) % 60),
  delay: (i * 0.7) % 12,
  duration: 8 + (i % 6),
}));

export default function HeroCinematic() {
  const { nextMatch, liveMatches, recentMatches } = useLive();
  const { tz } = useTimezone();
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      // Clamp parallax to the hero height so the photo stops moving past the section
      const maxScroll = window.innerHeight;
      setScrollY(Math.min(window.scrollY, maxScroll));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tickerItems: string[] = [];
  if (liveMatches.length > 0) {
    liveMatches.forEach((m) => {
      if (m.score) {
        tickerItems.push(`LIVE · ${m.teamAData.shortName} ${m.score.a}–${m.score.b} ${m.teamBData.shortName} · ${m.score.minute ?? 0}'`);
      }
    });
  }
  if (nextMatch && nextMatch.score?.status !== "LIVE" && nextMatch.score?.status !== "HT") {
    const { time, day } = formatKickoff(nextMatch.kickoffISO, tz);
    tickerItems.push(`NEXT · ${nextMatch.teamAData.shortName} v ${nextMatch.teamBData.shortName} · ${day} ${time}`);
  }
  recentMatches.slice(0, 3).forEach((m) => {
    if (m.score) {
      tickerItems.push(`FT · ${m.teamAData.shortName} ${m.score.a}–${m.score.b} ${m.teamBData.shortName}`);
    }
  });
  if (tickerItems.length === 0) tickerItems.push("World Cup 2026 · 11 Jun – 19 Jul · 16 host cities · 48 nations");

  const tickerDoubled = [...tickerItems, ...tickerItems];

  return (
    <section className="wc-hero">
      <div
        className="wc-hero-photo"
        style={{
          backgroundImage: `url(${HERO_PHOTO})`,
          transform: mounted ? `translate3d(0, ${scrollY * 0.12}px, 0) scale(1.04)` : "scale(1.04)",
        }}
        aria-hidden="true"
      />
      <div className="wc-hero-grid" aria-hidden="true" />
      <div className="wc-hero-scrim" aria-hidden="true" />

      <div className="wc-hero-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="wc-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="wc-hero-content">
        <div className="wc-hero-eyebrow">
          <span className="wc-hero-eyebrow-dot" />
          Admizz × FIFA World Cup 2026
        </div>

        <h1 className="wc-hero-title wc-display">
          PREDICT THE<br />
          <span className="wc-hero-title-accent">WORLD CUP.</span><br />
          WIN YOUR FUTURE.
        </h1>

        <p className="wc-hero-lede">
          The world&apos;s biggest tournament. One match at a time. Predict the winner, follow the bracket, watch the standings, win prizes — and unlock a free study-abroad counselling session with Admizz Education.
        </p>

        <div className="wc-hero-ctas">
          <a href="#match" className="wc-btn-primary">
            Predict Now
            <ArrowRightIcon size={16} strokeWidth={2.2} />
          </a>
          <a href="#bracket" className="wc-btn-ghost">
            View Bracket
          </a>
        </div>

        <div className="wc-host-strip">
          <span className="wc-host-strip-label">Hosted by</span>
          <span className="wc-host-badge"><span style={{ fontSize: 16 }}>🇨🇦</span> Canada</span>
          <span className="wc-host-badge"><span style={{ fontSize: 16 }}>🇺🇸</span> USA</span>
          <span className="wc-host-badge"><span style={{ fontSize: 16 }}>🇲🇽</span> Mexico</span>
          <span className="wc-host-strip-label" style={{ marginLeft: "auto" }}>16 cities · 48 nations · 104 matches</span>
        </div>

        <FloatingNav />

        <div className="wc-ticker" role="status" aria-live="polite">
          <span className="wc-ticker-label">
            <span className="wc-pulse-dot" /> Live · ESPN
          </span>
          <div className="wc-ticker-mask">
            <div className="wc-ticker-track">
              {tickerDoubled.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
