"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const TIERS = [
  {
    id: "starter",
    badge: "✦",
    name: "Starter",
    milestone: "0–4 referrals",
    description: "Your first step into the affiliate ecosystem.",
    topColor: "rgba(148,163,184,0.8)",
    cardBg: "rgba(255,255,255,0.04)",
    cardBorder: "rgba(255,255,255,0.08)",
    badgeColor: "rgba(148,163,184,0.9)",
    nameBg: "rgba(148,163,184,0.12)",
    special: false,
    perks: [
      "Base commission rate",
      "Affiliate kit & tracking link",
      "Official affiliate certificate",
      "Community access",
    ],
  },
  {
    id: "rising",
    badge: "★",
    name: "Rising Star",
    milestone: "5–14 referrals",
    description: "You're gaining momentum. Unlock better rates.",
    topColor: "#31429C",
    cardBg: "rgba(49,66,156,0.12)",
    cardBorder: "rgba(49,66,156,0.3)",
    badgeColor: "#6b80d4",
    nameBg: "rgba(49,66,156,0.18)",
    special: false,
    perks: [
      "Everything in Starter",
      "Higher commission rate",
      "Priority support channel",
      "Featured in monthly newsletter",
    ],
  },
  {
    id: "elite",
    badge: "♛",
    name: "Elite Partner",
    milestone: "15–29 referrals",
    description: "Premium access. Real influence. Golden perks.",
    topColor: "#FCB730",
    cardBg: "rgba(252,183,48,0.08)",
    cardBorder: "rgba(252,183,48,0.3)",
    badgeColor: "#FCB730",
    nameBg: "rgba(252,183,48,0.15)",
    special: false,
    perks: [
      "Everything in Rising Star",
      "Premium commission rate",
      "Exclusive Admizz swag package",
      "University fair invitations",
      "Co-branded social feature",
    ],
  },
  {
    id: "legend",
    badge: "◈",
    name: "Admizz Legend",
    milestone: "30+ referrals",
    description: "The pinnacle. You shape the program itself.",
    topColor: "#FDED22",
    cardBg: "linear-gradient(160deg, rgba(13,18,130,0.4), rgba(49,66,156,0.25))",
    cardBorder: "rgba(253,237,34,0.4)",
    badgeColor: "#FDED22",
    nameBg: "rgba(253,237,34,0.15)",
    special: true,
    perks: [
      "Everything in Elite Partner",
      "Top-tier commission rate",
      "Monthly co-marketing",
      "Featured on Admizz platforms",
      "Direct leadership access",
      "Annual Legend award",
    ],
  },
];

export default function AffiliateTiers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      style={{ background: "#001353" }}
      className="py-20 relative overflow-hidden"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(253,237,34,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      {/* Side glows */}
      <div className="absolute top-1/2 left-0 w-64 h-64 -translate-y-1/2 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(49,66,156,0.3) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 right-0 w-64 h-64 -translate-y-1/2 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(253,237,34,0.08) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div className="text-center mb-12" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(253,237,34,0.1)", border: "1px solid rgba(253,237,34,0.25)", color: "#FDED22" }}
          >
            Progression
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Unlock Higher Rewards as You Grow
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Every referral moves you up. Every tier unlocks more.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              className="relative rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: tier.cardBg,
                border: `1px solid ${tier.cardBorder}`,
                boxShadow: tier.special ? "0 0 60px rgba(253,237,34,0.12)" : "none",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.11, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={reduce ? {} : {
                y: -5,
                boxShadow: tier.special
                  ? "0 24px 64px rgba(253,237,34,0.22)"
                  : `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${tier.topColor}30`,
                transition: { duration: 0.22 },
              }}
            >
              {/* Animated shimmer top bar for Legend */}
              {tier.special ? (
                <div className="h-1 w-full relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, #001353, #31429C 20%, #FCB730 40%, #FDED22 50%, #FCB730 60%, #31429C 80%, #001353)",
                      backgroundSize: "200% 100%",
                      animation: "tier-shimmer 3s linear infinite",
                    }}
                  />
                </div>
              ) : (
                <div className="h-1 w-full" style={{ background: tier.topColor }} />
              )}

              <div className="p-6 flex flex-col flex-1">
                {/* Badge circle */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 relative"
                  style={{
                    background: tier.nameBg,
                    border: `1px solid ${tier.topColor}35`,
                  }}
                >
                  <span
                    style={{
                      color: tier.badgeColor,
                      filter: tier.special ? "drop-shadow(0 0 10px rgba(253,237,34,0.9))" : "none",
                      fontSize: "22px",
                    }}
                  >
                    {tier.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold mb-0.5"
                  style={{ color: tier.special ? "#FDED22" : "white" }}>
                  {tier.name}
                </h3>
                <p className="text-xs font-bold mb-1" style={{ color: tier.badgeColor }}>
                  {tier.milestone}
                </p>
                <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {tier.description}
                </p>

                <div className="w-full h-px mb-4" style={{ background: `${tier.topColor}25` }} />

                <ul className="space-y-2.5 flex-1">
                  {tier.perks.map(perk => (
                    <li key={perk} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      <span className="flex-shrink-0 mt-0.5 text-xs font-extrabold" style={{ color: tier.badgeColor }}>✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progression row */}
        <motion.div
          className="mt-12 flex items-center justify-center flex-wrap gap-3 text-sm"
          style={{ color: "rgba(255,255,255,0.3)" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          {TIERS.map((t, i) => (
            <div key={t.id} className="flex items-center gap-3">
              <span className="font-bold" style={{ color: t.badgeColor }}>{t.name}</span>
              {i < TIERS.length - 1 && (
                <svg className="w-3.5 h-3.5 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </div>
          ))}
          <span className="w-full text-center text-xs mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>
            Every referral counts toward your next tier
          </span>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes tier-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
