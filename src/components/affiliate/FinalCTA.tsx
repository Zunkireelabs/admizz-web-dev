"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: 5 + (i * 3.4 + Math.sin(i * 0.7) * 15) % 90,
  y: 10 + (i * 2.8 + Math.cos(i * 0.5) * 20) % 80,
  size: 1.5 + (i % 4) * 0.5,
  dur: 5 + (i % 7) * 1.2,
  delay: (i % 6) * 1.1,
  opacity: 0.12 + (i % 5) * 0.07,
  golden: i % 3 === 0,
}));

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-32"
      style={{ background: "linear-gradient(160deg, #030d2a 0%, #001353 45%, #0D1282 100%)" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Centre radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(49,66,156,0.35) 0%, transparent 70%)" }}
      />

      {/* Golden top beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[3px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.7), rgba(253,237,34,0.9), rgba(252,183,48,0.7), transparent)" }}
      />

      {/* Side halos */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] -translate-y-1/2 pointer-events-none"
        style={{ background: "radial-gradient(circle at left, rgba(49,66,156,0.2) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] -translate-y-1/2 pointer-events-none"
        style={{ background: "radial-gradient(circle at right, rgba(252,183,48,0.08) 0%, transparent 70%)" }} />

      {/* Particles */}
      {!reduce && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: p.golden ? "#FCB730" : "rgba(255,255,255,0.55)",
                opacity: p.opacity,
                animation: `finalcta-particle ${p.dur}s ease-in-out infinite alternate`,
                animationDelay: `${p.delay}s`,
                boxShadow: p.golden ? `0 0 ${p.size * 2}px rgba(252,183,48,0.6)` : "none",
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={ref}>

        <motion.span
          className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8"
          style={{ background: "rgba(253,237,34,0.1)", border: "1px solid rgba(253,237,34,0.3)", color: "#FDED22" }}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          ✦ Join the Movement
        </motion.span>

        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05]"
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Shape the Future of{" "}
          <br className="hidden sm:block" />
          <span
            style={{
              background: "linear-gradient(90deg, #FCB730 0%, #FDED22 55%, #FCB730 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 40px rgba(252,183,48,0.4))",
            }}
          >
            Global Education.
          </span>
        </motion.h2>

        <motion.p
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.62)" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Join Nepal&apos;s most ambitious student affiliate network.{" "}
          <br />
          <span className="font-extrabold text-white">Earn. Represent. Grow.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <motion.button
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-[10px] font-extrabold text-base text-black"
            style={{ background: "#FDED22", boxShadow: "0 4px 44px rgba(253,237,34,0.5)" }}
            whileHover={reduce ? {} : { scale: 1.05, boxShadow: "0 6px 60px rgba(253,237,34,0.7)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Apply Now — It&apos;s Free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>

          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] font-semibold text-base text-white transition-colors duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.04)" }}
            whileHover={reduce ? {} : { background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.4)" }}
          >
            Talk to Our Team →
          </motion.a>
        </motion.div>

        {/* Trust microtext */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm"
          style={{ color: "rgba(255,255,255,0.38)" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {["Free to join", "No experience needed", "Approved in 48 hours"].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <span style={{ color: "#FCB730" }} className="text-xs font-bold">✓</span> {t}
            </span>
          ))}
        </motion.div>

        {/* Existing affiliate login link */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <a
            href="/affiliate-dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(252,183,48,0.1)",
              border: "1px solid rgba(252,183,48,0.3)",
              color: "#FCB730",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(252,183,48,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(252,183,48,0.1)"; }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Already an affiliate? Open your dashboard →
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes finalcta-particle {
          from { transform: translateY(0px) scale(1); }
          to   { transform: translateY(-32px) scale(1.4); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
