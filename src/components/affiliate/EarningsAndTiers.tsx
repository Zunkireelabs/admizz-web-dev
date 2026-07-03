"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    multiplier: "1×",
    range: "0 – 4 referrals",
    description: "Your starting tier when you join.",
    accent: "#94a3b8",
    accentSoft: "rgba(148,163,184,0.12)",
    accentBorder: "rgba(148,163,184,0.3)",
    featured: false,
  },
  {
    id: "rising",
    name: "Rising Star",
    multiplier: "1.5×",
    range: "5 – 14 referrals",
    description: "Commissions scale up by 1.5× on every reward.",
    accent: "#6b80d4",
    accentSoft: "rgba(49,66,156,0.14)",
    accentBorder: "rgba(49,66,156,0.4)",
    featured: false,
  },
  {
    id: "elite",
    name: "Elite Partner",
    multiplier: "2×",
    range: "15 – 29 referrals",
    description: "Doubled commissions and priority support.",
    accent: "#FCB730",
    accentSoft: "rgba(252,183,48,0.12)",
    accentBorder: "rgba(252,183,48,0.45)",
    featured: true,
  },
  {
    id: "legend",
    name: "Admizz Legend",
    multiplier: "3×",
    range: "30+ referrals",
    description: "Top tier. Tripled commissions and a feature on Admizz channels.",
    accent: "#FDED22",
    accentSoft: "rgba(253,237,34,0.1)",
    accentBorder: "rgba(253,237,34,0.45)",
    featured: false,
  },
];

export default function EarningsAndTiers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: "#060c1f" }}
    >
      {/* Top hairline — designed seam with light neighbor */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.55), transparent)" }}
      />
      {/* Ambient depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(49,66,156,0.22) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14 md:mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase mb-6"
            style={{
              background: "rgba(253,237,34,0.08)",
              border: "1px solid rgba(253,237,34,0.22)",
              color: "#FDED22",
              letterSpacing: "0.18em",
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: "#FDED22" }} />
            Earnings &amp; Tiers
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold text-white leading-[1.1] tracking-[-0.015em]">
            One clear earnings path.
          </h2>
          <p className="mt-5 text-base md:text-[17px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.6)" }}>
            Each referral earns a base commission. As your referral count grows, your tier
            multiplier scales every payout you receive — automatically.
          </p>
        </motion.div>

        {/* Tier grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.id}
              className="relative rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: t.featured ? t.accentSoft : "rgba(255,255,255,0.025)",
                border: `1px solid ${t.featured ? t.accentBorder : "rgba(255,255,255,0.08)"}`,
                boxShadow: t.featured
                  ? `0 0 40px ${t.accent}18, 0 8px 32px rgba(0,0,0,0.3)`
                  : "0 4px 24px rgba(0,0,0,0.25)",
                backdropFilter: "blur(12px)",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + 0.07 * i, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="h-[2px] w-full" style={{ background: t.accent }} />

              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p
                      className="text-[11px] font-bold uppercase mb-1.5"
                      style={{
                        color: t.featured ? t.accent : "rgba(255,255,255,0.5)",
                        letterSpacing: "0.14em",
                      }}
                    >
                      Tier {i + 1}
                    </p>
                    <h3 className="text-[20px] md:text-[22px] font-extrabold tracking-tight text-white">
                      {t.name}
                    </h3>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-md text-[12px] font-extrabold whitespace-nowrap"
                    style={{
                      background: t.accentSoft,
                      border: `1px solid ${t.accentBorder}`,
                      color: t.accent,
                    }}
                  >
                    {t.multiplier}
                  </span>
                </div>

                <p
                  className="text-[12.5px] font-semibold uppercase mb-3"
                  style={{
                    color: t.featured ? t.accent : "rgba(255,255,255,0.55)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {t.range}
                </p>

                <p className="text-[13.5px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {t.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
