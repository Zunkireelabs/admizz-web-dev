"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const REWARDS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Consultation Booked",
    body: "Your referred student books a free consultation. You earn the moment it's confirmed — before they even enroll.",
    tag: "Earn per booking",
    earning: "NPR 200 – 500",
    earningLabel: "per consultation",
    highlight: false,
    iconColor: "#31429C",
    iconBg: "rgba(49,66,156,0.1)",
    iconBorder: "rgba(49,66,156,0.22)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Service Enrollment",
    body: "Your student enrolls in IELTS prep, a university application, or visa processing. Bigger service, bigger commission.",
    tag: "Earn on every enrollment",
    earning: "NPR 1,000 – 3,000",
    earningLabel: "per enrollment",
    highlight: false,
    iconColor: "#31429C",
    iconBg: "rgba(49,66,156,0.1)",
    iconBorder: "rgba(49,66,156,0.22)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "University Confirmation",
    body: "The highest-earning tier. When your student confirms a university offer, you unlock the biggest reward in the program.",
    tag: "Highest tier reward",
    earning: "NPR 3,000 – 8,000+",
    earningLabel: "per confirmed offer",
    highlight: true,
    iconColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.18)",
    iconBorder: "rgba(252,183,48,0.4)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Visa Approval Bonus",
    body: "When your student's visa gets approved, you receive an additional bonus stacked on top of your standard commission.",
    tag: "Bonus on top",
    earning: "+ NPR 500 – 1,500",
    earningLabel: "additional bonus",
    highlight: false,
    iconColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.1)",
    iconBorder: "rgba(252,183,48,0.25)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Monthly Top Performer",
    body: "Most successful referrals in a month wins a prize and gets spotlighted across all Admizz platforms.",
    tag: "Special prize + spotlight",
    earning: "Exclusive Prize",
    earningLabel: "monthly winner",
    highlight: false,
    iconColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.1)",
    iconBorder: "rgba(252,183,48,0.25)",
  },
];

const PAYOUTS = [
  {
    label: "eSewa",
    color: "#60BB46",
    bg: "rgba(96,187,70,0.1)",
    border: "rgba(96,187,70,0.3)",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">e</text>
      </svg>
    ),
  },
  {
    label: "Khalti",
    color: "#5C2D91",
    bg: "rgba(92,45,145,0.1)",
    border: "rgba(92,45,145,0.3)",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">K</text>
      </svg>
    ),
  },
  {
    label: "Bank Transfer",
    color: "#001353",
    bg: "rgba(0,19,83,0.08)",
    border: "rgba(0,19,83,0.18)",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
];

type Reward = (typeof REWARDS)[0];

function RewardCard({ r, i, inView, reduce }: { r: Reward; i: number; inView: boolean; reduce: boolean }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
      style={r.highlight ? {
        background: "linear-gradient(160deg, #001353 0%, #0a1672 100%)",
        border: "1px solid rgba(252,183,48,0.35)",
        boxShadow: "0 12px 40px rgba(0,19,83,0.25), 0 0 0 1px rgba(252,183,48,0.15)",
      } : {
        background: "#FFFFFF",
        border: "1px solid #EAECF0",
        boxShadow: "0 1px 3px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.06)",
      }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={reduce ? {} : {
        y: -5,
        boxShadow: r.highlight
          ? "0 24px 60px rgba(0,19,83,0.4), 0 0 0 1px rgba(252,183,48,0.35)"
          : "0 12px 32px rgba(16,24,40,0.1), 0 4px 8px rgba(16,24,40,0.06)",
        borderColor: r.highlight ? "rgba(252,183,48,0.5)" : "#FCB730",
        transition: { duration: 0.22 },
      }}
    >
      <div className="h-[2px] w-full" style={{ background: r.highlight ? "#FCB730" : "rgba(0,19,83,0.08)" }} />

      {r.highlight && (
        <>
          {/* Inner glow for highlight card */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(252,183,48,0.12) 0%, transparent 60%)" }} />
          <div className="absolute top-4 right-4 z-10">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase whitespace-nowrap"
              style={{ background: "#FCB730", color: "#001353", letterSpacing: "0.12em" }}
            >
              ⭐ HIGHEST EARNING
            </span>
          </div>
        </>
      )}

      <div className="p-7 md:p-8 flex flex-col flex-1 relative">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
          style={{
            background: r.iconBg,
            color: r.iconColor,
            border: `1px solid ${r.iconBorder}`,
          }}
        >
          {r.icon}
        </div>
        <h3 className="text-[17px] font-bold mb-2 tracking-tight" style={{ color: r.highlight ? "#fff" : "#001353" }}>
          {r.title}
        </h3>
        <div className="mb-4">
          <span className="text-[26px] font-extrabold tracking-tight" style={{ color: r.highlight ? "#FCB730" : "#001353" }}>
            {r.earning}
          </span>
          <span className="ml-2 text-xs font-semibold" style={{ color: r.highlight ? "rgba(255,255,255,0.45)" : "#5C7189" }}>
            {r.earningLabel}
          </span>
        </div>
        <p className="text-[14px] leading-[1.65] mb-6 flex-1"
          style={{ color: r.highlight ? "rgba(255,255,255,0.7)" : "#5C7189" }}>
          {r.body}
        </p>
        <span
          className="inline-block px-3 py-1.5 rounded-full text-[11.5px] font-bold self-start"
          style={r.highlight ? {
            background: "rgba(252,183,48,0.18)",
            border: "1px solid rgba(252,183,48,0.4)",
            color: "#FCB730",
          } : {
            background: "rgba(0,19,83,0.05)",
            border: "1px solid rgba(0,19,83,0.1)",
            color: "#001353",
          }}
        >
          {r.tag}
        </span>
      </div>
    </motion.div>
  );
}

export default function CommissionTable() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section style={{ background: "#FFFFFF" }} className="py-24 md:py-28 relative overflow-hidden">
      {/* Subtle ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(252,183,48,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium header */}
        <motion.div className="text-center max-w-2xl mx-auto mb-16 md:mb-20" ref={ref}
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
            Earnings
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] tracking-[-0.015em]" style={{ color: "#001353" }}>
            What You Earn
          </h2>
          <p className="mt-5 text-base md:text-[17px] leading-[1.6]" style={{ color: "#5C7189" }}>
            Competitive commissions at every step of the student journey. Stack them up.
          </p>
        </motion.div>

        {/* Cards row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-5 md:mb-6">
          {REWARDS.slice(0, 3).map((r, i) => (
            <RewardCard key={r.title} r={r} i={i} inView={inView} reduce={!!reduce} />
          ))}
        </div>
        {/* Cards row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-12">
          {REWARDS.slice(3).map((r, i) => (
            <RewardCard key={r.title} r={r} i={i + 3} inView={inView} reduce={!!reduce} />
          ))}
        </div>

        {/* Premium payout methods strip */}
        <motion.div
          className="rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 mb-6"
          style={{
            background: "#FAFAFB",
            border: "1px solid #EAECF0",
          }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div>
            <p className="text-[14.5px] font-bold tracking-tight" style={{ color: "#001353" }}>Payouts sent monthly — zero fees</p>
            <p className="text-[12.5px] mt-1" style={{ color: "#5C7189" }}>Choose your preferred method when you apply</p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-end">
            {PAYOUTS.map(p => (
              <div
                key={p.label}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-bold"
                style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.color }}
              >
                {p.icon}
                {p.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Premium CTA box */}
        <motion.div
          className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #001353 0%, #0D1282 60%, #1a2380 100%)",
            boxShadow: "0 12px 40px rgba(0,19,83,0.25)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(253,237,34,0.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }} />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(circle at top right, rgba(253,237,34,0.18) 0%, transparent 60%)" }} />

          <div className="relative">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
              Ready to start earning?
            </h3>
            <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.65)" }}>
              Free to join. Approval within 48 hours. No referral targets.
            </p>
          </div>
          <motion.button
            className="relative flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-[12px] font-extrabold text-black text-[14.5px] whitespace-nowrap"
            style={{ background: "#FDED22", boxShadow: "0 4px 24px rgba(253,237,34,0.45)" }}
            whileHover={reduce ? {} : { scale: 1.04, boxShadow: "0 8px 36px rgba(253,237,34,0.65)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Apply Now — It&apos;s Free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
