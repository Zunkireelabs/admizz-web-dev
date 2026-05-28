"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const REWARDS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Consultation Booked",
    body: "When your referred student books a free consultation with our team, you earn — even before they enroll.",
    tag: "Earn per booking",
    highlight: false,
    iconColor: "#31429C",
    iconBg: "rgba(49,66,156,0.1)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Service Enrollment",
    body: "When your student enrolls in an Admizz service — IELTS prep, university application, or visa processing — you earn.",
    tag: "Earn on every enrollment",
    highlight: false,
    iconColor: "#31429C",
    iconBg: "rgba(49,66,156,0.1)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "University Confirmation",
    body: "The highest-earning commission tier. When your referred student confirms a university offer, you unlock our top reward.",
    tag: "Highest tier reward",
    highlight: true,
    iconColor: "#fff",
    iconBg: "rgba(255,255,255,0.2)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Visa Approval Bonus",
    body: "When your student's visa gets approved, you receive an additional bonus on top of your standard commission.",
    tag: "Bonus on top",
    highlight: false,
    iconColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.1)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Monthly Top Performer",
    body: "The affiliate with the most successful referrals each month wins an exclusive prize and gets featured on all Admizz platforms.",
    tag: "Special prize + spotlight",
    highlight: false,
    iconColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.1)",
  },
];

const PAYOUTS = [
  {
    label: "eSewa",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Khalti",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    label: "Bank Transfer",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
];

type Reward = (typeof REWARDS)[0];

function RewardCard({ r, i, inView, reduce }: { r: Reward; i: number; inView: boolean; reduce: boolean }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden flex flex-col group"
      style={r.highlight ? {
        background: "#001353",
        border: "1px solid #001353",
        boxShadow: "0 8px 40px rgba(0,19,83,0.18)",
      } : {
        background: "#FFFFFF",
        border: "1px solid #E8EAF0",
        boxShadow: "0 2px 16px rgba(0,19,83,0.06)",
      }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={reduce ? {} : {
        y: -4,
        boxShadow: r.highlight
          ? "0 16px 60px rgba(0,19,83,0.3)"
          : "0 12px 40px rgba(0,19,83,0.12)",
        borderColor: r.highlight ? "#001353" : "#FCB730",
        transition: { duration: 0.22 },
      }}
    >
      <div className="h-1 w-full" style={{ background: r.highlight ? "#FCB730" : "rgba(0,19,83,0.1)" }} />
      {r.highlight && (
        <div className="absolute top-4 right-4">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase"
            style={{ background: "#FCB730", color: "#001353" }}
          >
            HIGHEST EARNING ⭐
          </span>
        </div>
      )}
      <div className="p-7 flex flex-col flex-1">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{ background: r.iconBg, color: r.iconColor }}
        >
          {r.icon}
        </div>
        <h3 className="text-lg font-bold mb-3" style={{ color: r.highlight ? "#fff" : "#001353" }}>
          {r.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5 flex-1"
          style={{ color: r.highlight ? "rgba(255,255,255,0.7)" : "#5C7189" }}>
          {r.body}
        </p>
        <span
          className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold self-start"
          style={r.highlight ? {
            background: "rgba(252,183,48,0.18)",
            border: "1px solid rgba(252,183,48,0.4)",
            color: "#FCB730",
          } : {
            background: "rgba(0,19,83,0.06)",
            border: "1px solid rgba(0,19,83,0.12)",
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
    <section style={{ background: "#ffffff" }} className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div className="text-center mb-12" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(0,19,83,0.07)", border: "1px solid rgba(0,19,83,0.12)", color: "#001353" }}
          >
            Earnings
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#001353" }}>
            What You Earn
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "#5C7189" }}>
            Competitive commissions. Real payouts. No limits.
          </p>
        </motion.div>

        {/* Cards grid — row 1: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {REWARDS.slice(0, 3).map((r, i) => (
            <RewardCard key={r.title} r={r} i={i} inView={inView} reduce={!!reduce} />
          ))}
        </div>
        {/* Cards grid — row 2: 2 cards, centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 max-w-2xl mx-auto w-full">
          {REWARDS.slice(3).map((r, i) => (
            <RewardCard key={r.title} r={r} i={i + 3} inView={inView} reduce={!!reduce} />
          ))}
        </div>

        {/* CTA box */}
        <motion.div
          className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, #001353 0%, #0D1282 100%)",
            boxShadow: "0 8px 40px rgba(0,19,83,0.2)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Curious how much you can earn?</h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              Commission details are shared with approved affiliates. Apply free — takes 5 minutes.
            </p>
          </div>
          <motion.button
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] font-bold text-black text-sm whitespace-nowrap"
            style={{ background: "#FDED22", boxShadow: "0 4px 24px rgba(253,237,34,0.4)" }}
            whileHover={reduce ? {} : { scale: 1.04, boxShadow: "0 6px 32px rgba(253,237,34,0.6)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Apply Now →
          </motion.button>
        </motion.div>

        {/* Payout methods strip */}
        <motion.div
          className="mt-8 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          style={{ background: "#F8F8F8", border: "1px solid #E8EAF0" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <span className="text-sm font-semibold" style={{ color: "#5C7189" }}>Payouts via:</span>
          <div className="flex items-center gap-6">
            {PAYOUTS.map(p => (
              <div key={p.label} className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#001353" }}>
                <span style={{ color: "#FCB730" }}>{p.icon}</span>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
          <span className="text-sm" style={{ color: "#5C7189" }}>· Monthly · Zero fees</span>
        </motion.div>
      </div>
    </section>
  );
}
