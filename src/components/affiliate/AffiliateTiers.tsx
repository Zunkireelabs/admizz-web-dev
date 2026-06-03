"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    milestone: "0 – 4 referrals",
    multiplier: "1×",
    multiplierLabel: "base rate",
    description: "Your first referrals. Get your link, kit, and certificate.",
    topColor: "#94a3b8",
    cardBg: "#FFFFFF",
    cardBorder: "1px solid #EAECF0",
    cardShadow: "0 1px 3px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.06)",
    nameColor: "#64748b",
    milestoneColor: "#94a3b8",
    multiplierColor: "#475569",
    multiplierBg: "rgba(148,163,184,0.1)",
    multiplierBorder: "rgba(148,163,184,0.28)",
    checkColor: "#94a3b8",
    perkTextColor: "#5C7189",
    dividerColor: "rgba(0,19,83,0.06)",
    special: false,
    perks: [
      "Affiliate kit & tracking link",
      "Real-time dashboard",
      "Official affiliate certificate",
      "Community access",
    ],
  },
  {
    id: "rising",
    name: "Rising Star",
    milestone: "5 – 14 referrals",
    multiplier: "1.5×",
    multiplierLabel: "base rate",
    description: "Momentum is building. Unlock better commission rates.",
    topColor: "#31429C",
    cardBg: "#FFFFFF",
    cardBorder: "1px solid rgba(49,66,156,0.3)",
    cardShadow: "0 4px 24px rgba(49,66,156,0.1)",
    nameColor: "#001353",
    milestoneColor: "#31429C",
    multiplierColor: "#31429C",
    multiplierBg: "rgba(49,66,156,0.08)",
    multiplierBorder: "rgba(49,66,156,0.22)",
    checkColor: "#31429C",
    perkTextColor: "#5C7189",
    dividerColor: "rgba(49,66,156,0.08)",
    special: false,
    perks: [
      "Everything in Starter",
      "1.5× commission rate",
      "Priority support channel",
      "Monthly newsletter feature",
    ],
  },
  {
    id: "elite",
    name: "Elite Partner",
    milestone: "15 – 29 referrals",
    multiplier: "2×",
    multiplierLabel: "base rate",
    description: "Premium access. Real influence. Golden perks.",
    topColor: "#FCB730",
    cardBg: "#FFFFFF",
    cardBorder: "1px solid rgba(252,183,48,0.45)",
    cardShadow: "0 8px 32px rgba(252,183,48,0.14)",
    nameColor: "#001353",
    milestoneColor: "#b07400",
    multiplierColor: "#b07400",
    multiplierBg: "rgba(252,183,48,0.1)",
    multiplierBorder: "rgba(252,183,48,0.3)",
    checkColor: "#FCB730",
    perkTextColor: "#5C7189",
    dividerColor: "rgba(252,183,48,0.14)",
    special: false,
    perks: [
      "Everything in Rising Star",
      "2× commission rate",
      "Exclusive Admizz swag",
      "University fair invitations",
      "Co-branded social feature",
    ],
  },
  {
    id: "legend",
    name: "Admizz Legend",
    milestone: "30+ referrals",
    multiplier: "3×",
    multiplierLabel: "base rate",
    description: "The pinnacle. Shape the program itself.",
    topColor: "#FDED22",
    cardBg: "linear-gradient(160deg, #001353 0%, #0D1282 60%, #1a2380 100%)",
    cardBorder: "1px solid rgba(253,237,34,0.5)",
    cardShadow: "0 16px 60px rgba(253,237,34,0.15), 0 0 0 1px rgba(253,237,34,0.18)",
    nameColor: "#FDED22",
    milestoneColor: "rgba(255,255,255,0.55)",
    multiplierColor: "#FDED22",
    multiplierBg: "rgba(253,237,34,0.12)",
    multiplierBorder: "rgba(253,237,34,0.3)",
    checkColor: "#FDED22",
    perkTextColor: "rgba(255,255,255,0.72)",
    dividerColor: "rgba(255,255,255,0.1)",
    special: true,
    perks: [
      "Everything in Elite Partner",
      "3× commission rate",
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
    <section className="py-24 md:py-28 relative overflow-hidden" style={{ background: "#FAFAFB" }}>
      {/* Subtle ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(252,183,48,0.05) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium header */}
        <motion.div className="text-center max-w-2xl mx-auto mb-12 md:mb-14" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase mb-6"
            style={{
              background: "rgba(0,19,83,0.06)",
              border: "1px solid rgba(0,19,83,0.12)",
              color: "#001353",
              letterSpacing: "0.18em",
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: "#FCB730" }} />
            Tier Progression
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] tracking-[-0.015em]" style={{ color: "#001353" }}>
            Grow Your Rank. Multiply Your Earnings.
          </h2>
          <p className="mt-5 text-base md:text-[17px] leading-[1.6]" style={{ color: "#5C7189" }}>
            Every referral moves you up a tier. Every tier unlocks a higher commission multiplier.
          </p>
          {/* Base rate context */}
          <motion.div
            className="inline-flex items-center gap-2.5 mt-6 px-5 py-2.5 rounded-full text-[13px] font-semibold"
            style={{
              background: "rgba(252,183,48,0.08)",
              border: "1px solid rgba(252,183,48,0.28)",
              color: "#b07400",
              boxShadow: "0 4px 16px rgba(252,183,48,0.08)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Base commission: NPR 500–1,000 per enrolled referral · multipliers stack on top
          </motion.div>
        </motion.div>

        {/* Desktop progress connector */}
        <motion.div
          className="hidden lg:flex items-center mb-6 px-2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {TIERS.map((tier, i) => (
            <div key={tier.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center" style={{ minWidth: 0 }}>
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    background: tier.topColor,
                    boxShadow: tier.special
                      ? `0 0 0 4px rgba(253,237,34,0.15), 0 0 12px ${tier.topColor}`
                      : `0 0 0 4px ${tier.topColor}15`,
                  }}
                />
              </div>
              {i < TIERS.length - 1 && (
                <motion.div
                  className="flex-1 h-[2px] mx-1"
                  style={{ background: `linear-gradient(90deg, ${tier.topColor}, ${TIERS[i + 1].topColor})`, transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.55 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Mobile progress */}
        <div className="flex lg:hidden items-center gap-2 mb-8 overflow-x-auto pb-1">
          {TIERS.map((tier, i) => (
            <div key={tier.id} className="flex items-center gap-2 flex-shrink-0">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap"
                style={{
                  background: tier.special ? "rgba(253,237,34,0.12)" : `${tier.topColor}18`,
                  border: `1px solid ${tier.topColor}50`,
                  color: tier.special ? "#b07400" : tier.topColor,
                }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: tier.topColor }} />
                {tier.name}
              </div>
              {i < TIERS.length - 1 && (
                <svg className="w-3 h-3 flex-shrink-0 opacity-30" fill="none" stroke="#001353" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Premium tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              className="relative rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: tier.cardBg,
                border: tier.cardBorder,
                boxShadow: tier.cardShadow,
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={reduce ? {} : { y: -6, transition: { duration: 0.22 } }}
            >
              {/* Top bar */}
              {tier.special ? (
                <div className="h-[3px] w-full relative overflow-hidden">
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
                <div className="h-[3px] w-full" style={{ background: tier.topColor }} />
              )}

              {/* Legend inner glow */}
              {tier.special && (
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(253,237,34,0.1) 0%, transparent 60%)" }} />
              )}

              <div className="p-6 md:p-7 flex flex-col flex-1 relative">
                {/* Multiplier badge */}
                <div
                  className="inline-flex items-baseline gap-1.5 self-start px-4 py-2.5 rounded-xl mb-6 font-extrabold"
                  style={{
                    background: tier.multiplierBg,
                    border: `1px solid ${tier.multiplierBorder}`,
                    color: tier.multiplierColor,
                  }}
                >
                  <span className="text-[26px] leading-none tracking-tight">{tier.multiplier}</span>
                  <span className="text-[10.5px] font-semibold opacity-75 uppercase" style={{ letterSpacing: "0.08em" }}>{tier.multiplierLabel}</span>
                </div>

                <h3 className="text-[20px] font-extrabold mb-1 tracking-tight" style={{ color: tier.nameColor }}>
                  {tier.name}
                </h3>
                <p className="text-[12px] font-bold mb-4 uppercase" style={{ color: tier.milestoneColor, letterSpacing: "0.08em" }}>
                  {tier.milestone}
                </p>
                <p className="text-[13.5px] mb-5 leading-[1.6]" style={{ color: tier.special ? "rgba(255,255,255,0.6)" : "#5C7189" }}>
                  {tier.description}
                </p>

                <div className="w-full h-px mb-4" style={{ background: tier.dividerColor }} />

                <ul className="space-y-2.5 flex-1">
                  {tier.perks.map(perk => (
                    <li key={perk} className="flex items-start gap-2.5 text-[13px]"
                      style={{ color: tier.perkTextColor }}>
                      <span
                        className="flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center mt-0.5"
                        style={{
                          background: tier.special ? "rgba(253,237,34,0.15)" : `${tier.checkColor}18`,
                          color: tier.checkColor,
                        }}
                      >
                        <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth={3.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              {tier.special && (
                <div className="px-6 md:px-7 pb-5 relative">
                  <span
                    className="inline-block px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase"
                    style={{
                      background: "rgba(253,237,34,0.15)",
                      border: "1px solid rgba(253,237,34,0.3)",
                      color: "#FDED22",
                      letterSpacing: "0.15em",
                    }}
                  >
                    ◈ PINNACLE TIER
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-[13px] mt-12"
          style={{ color: "#5C7189" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}>
          Tier is calculated on total enrolled referrals. Every referral counts forever.
        </motion.p>
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
