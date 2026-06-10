"use client";

import { useEffect, useRef } from "react";

/**
 * Ornate gold filigree divider — central medallion with scroll flourishes either side.
 * SVG paths draw themselves in as the divider enters the viewport.
 */
export default function IndiaFiligreeDivider({
  color = "#C9A961",
  accent = "#FF6B1A",
}: {
  color?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !el) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          const paths = el.querySelectorAll<SVGPathElement | SVGLineElement>("[data-draw]");
          paths.forEach((p) => {
            const len = (p as SVGGeometryElement).getTotalLength?.() ?? 200;
            p.style.strokeDasharray = `${len}`;
            p.style.strokeDashoffset = `${len}`;
          });
          gsap.to(el.querySelectorAll("[data-draw]"), {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.out",
            stagger: 0.04,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
          gsap.from(el.querySelectorAll("[data-fade]"), {
            opacity: 0,
            duration: 0.8,
            delay: 0.6,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        }, el);
        (el as unknown as { __ctx?: gsap.Context }).__ctx = ctx;
      }
    );
    return () => {
      cancelled = true;
      const ctx = (el as unknown as { __ctx?: { revert: () => void } }).__ctx;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center py-10 px-4" aria-hidden="true">
      <svg
        viewBox="0 0 600 60"
        width="100%"
        height="60"
        style={{ maxWidth: 720, overflow: "visible" }}
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        {/* Left flourish */}
        <path data-draw d="M 30 30 L 200 30" />
        <path data-draw d="M 200 30 Q 215 30 215 22 Q 215 14 207 14 Q 200 14 200 22" />
        <path data-draw d="M 200 30 Q 215 30 215 38 Q 215 46 207 46 Q 200 46 200 38" />
        <path data-draw d="M 220 30 Q 235 22 250 30 Q 235 38 220 30" />

        {/* Central medallion */}
        <circle data-draw cx="300" cy="30" r="18" />
        <circle data-draw cx="300" cy="30" r="11" />
        <circle data-fade cx="300" cy="30" r="4" fill={accent} stroke="none" />
        {/* 8-point star around medallion */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          const x1 = 300 + Math.cos(angle) * 18;
          const y1 = 30 + Math.sin(angle) * 18;
          const x2 = 300 + Math.cos(angle) * 24;
          const y2 = 30 + Math.sin(angle) * 24;
          return <line key={i} data-draw x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}

        {/* Right flourish (mirror) */}
        <path data-draw d="M 380 30 Q 365 22 350 30 Q 365 38 380 30" />
        <path data-draw d="M 400 30 Q 385 30 385 22 Q 385 14 393 14 Q 400 14 400 22" />
        <path data-draw d="M 400 30 Q 385 30 385 38 Q 385 46 393 46 Q 400 46 400 38" />
        <path data-draw d="M 400 30 L 570 30" />

        {/* Small dots on outer edges */}
        <circle data-fade cx="200" cy="30" r="2" fill={color} stroke="none" />
        <circle data-fade cx="400" cy="30" r="2" fill={color} stroke="none" />
      </svg>
    </div>
  );
}
