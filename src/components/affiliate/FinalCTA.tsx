"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-28 md:py-32" style={{ background: "#001353" }}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Center radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(49,66,156,0.5) 0%, transparent 70%)" }}
      />
      {/* Gold ambient bottom-right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at bottom right, rgba(252,183,48,0.12) 0%, transparent 65%)" }} />
      {/* Golden top beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.6), rgba(253,237,34,0.9), rgba(252,183,48,0.6), transparent)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={ref}>
        <motion.span
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold uppercase mb-8"
          style={{
            background: "rgba(253,237,34,0.1)",
            border: "1px solid rgba(253,237,34,0.28)",
            color: "#FDED22",
            letterSpacing: "0.2em",
          }}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <span className="w-1 h-1 rounded-full" style={{ background: "#FDED22" }} />
          Your First Referral is Waiting
        </motion.span>

        <motion.h2
          className="text-[44px] md:text-[64px] font-extrabold text-white leading-[1.02] tracking-[-0.02em]"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Ready to Start{" "}
          <span
            className="text-yellow"
            style={{
              background: "linear-gradient(90deg, #FCB730 0%, #FDED22 50%, #FCB730 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 24px rgba(252,183,48,0.4))",
            }}
          >
            Earning?
          </span>
        </motion.h2>

        <motion.p
          className="mt-6 text-base md:text-lg max-w-xl mx-auto leading-[1.6]"
          style={{ color: "rgba(255,255,255,0.62)" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Join 847+ affiliates already earning with Admizz.{" "}
          <span className="font-extrabold text-white block mt-1">Apply free. Get approved in 48 hours. Start earning.</span>
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <motion.button
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-[12px] font-extrabold text-[15px] text-black bg-yellow"
            style={{ boxShadow: "0 4px 40px rgba(253,237,34,0.45)" }}
            whileHover={reduce ? {} : { scale: 1.04, boxShadow: "0 8px 56px rgba(253,237,34,0.7)" }}
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] font-semibold text-[14.5px] text-white"
            style={{ border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
            whileHover={reduce ? {} : { background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.35)" }}
          >
            Talk to Our Team →
          </motion.a>
        </motion.div>

        {/* Premium trust strip */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px]"
          style={{ color: "rgba(255,255,255,0.45)" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {["Free to join", "No experience needed", "Approved in 48 hours", "NPR 500 min. payout"].map(t => (
            <span key={t} className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#FCB730" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
