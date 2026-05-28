"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const TESTIMONIALS = [
  {
    initials: "PS",
    name: "Priya Sharma",
    detail: "Kathmandu University",
    tier: "Rising Star",
    tierColor: "#6b80d4",
    tierBg: "rgba(49,66,156,0.25)",
    avatarFrom: "#31429C",
    avatarTo: "#0D1282",
    quote: "I referred 8 students in my first semester and the experience was incredible. The marketing materials made it so easy — I just shared the link and Admizz did the rest.",
    stat: "8 students referred",
    statIcon: "📊",
    accentColor: "#31429C",
  },
  {
    initials: "RK",
    name: "Rohan Khadka",
    detail: "YouTuber · 12K subscribers",
    tier: "Elite Partner",
    tierColor: "#FCB730",
    tierBg: "rgba(252,183,48,0.2)",
    avatarFrom: "#FCB730",
    avatarTo: "#0D1282",
    quote: "As a study abroad content creator, the Admizz affiliate program is the most transparent I've joined. I can track every click in real time. Payouts are always on time.",
    stat: "Elite Partner · Creator",
    statIcon: "⭐",
    accentColor: "#FCB730",
  },
  {
    initials: "SG",
    name: "Sunita Gurung",
    detail: "Education Counselor · Bhaktapur",
    tier: "Starter",
    tierColor: "#FDED22",
    tierBg: "rgba(253,237,34,0.18)",
    avatarFrom: "#FDED22",
    avatarTo: "#FCB730",
    quote: "I referred 4 of my coaching students and all of them got university placements. It's genuinely the most rewarding partnership I've had in my career.",
    stat: "4 students placed",
    statIcon: "🎓",
    accentColor: "#FDED22",
  },
];

const STATS_ROW = [
  { value: "150+", label: "Active Affiliates" },
  { value: "500+", label: "Students Referred" },
  { value: "3",    label: "Countries Active" },
];

export default function AffiliateTestimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      style={{ background: "#050d2d" }}
      className="py-20 relative overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(49,66,156,0.15) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div className="text-center mb-12" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(253,237,34,0.1)", border: "1px solid rgba(253,237,34,0.25)", color: "#FDED22" }}
          >
            Social Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Real Affiliates. Real Results.
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            People just like you are already winning.
          </p>
          {/* TODO: Replace with real affiliate quotes — remove this notice before launch */}
          <p className="mt-3 text-xs italic" style={{ color: "rgba(255,255,255,0.2)" }}>
            Sample testimonials shown — replace with verified affiliate quotes before launch
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="rounded-2xl overflow-hidden flex flex-col relative"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={reduce ? {} : {
                y: -5,
                background: "rgba(255,255,255,0.07)",
                borderColor: `${t.accentColor}30`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${t.accentColor}20`,
                transition: { duration: 0.22 },
              }}
            >
              {/* Top accent line */}
              <div className="h-1 w-full" style={{ background: t.accentColor }} />

              <div className="p-7 flex flex-col flex-1">
                {/* Large quote mark */}
                <div
                  className="text-6xl font-serif leading-none mb-4 select-none"
                  style={{ color: `${t.accentColor}30`, fontFamily: "Georgia, serif" }}
                >
                  &ldquo;
                </div>

                <p className="text-sm leading-relaxed flex-1 mb-7 text-white" style={{ opacity: 0.82 }}>
                  {t.quote}
                </p>

                {/* Profile row */}
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0 relative"
                    style={{
                      background: `linear-gradient(135deg, ${t.avatarFrom}, ${t.avatarTo})`,
                      color: t.name === "Sunita Gurung" ? "#001353" : "#fff",
                      boxShadow: `0 0 0 2px ${t.accentColor}40, 0 4px 12px rgba(0,0,0,0.4)`,
                    }}
                  >
                    {t.initials}
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: t.accentColor, fontSize: "8px" }}
                    >
                      ✓
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{t.detail}</p>
                  </div>
                  <span
                    className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{ background: t.tierBg, border: `1px solid ${t.tierColor}50`, color: t.tierColor }}
                  >
                    {t.tier}
                  </span>
                </div>

                {/* Stat footer */}
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-xs font-semibold" style={{ color: t.accentColor }}>
                    {t.statIcon} {t.stat}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          className="grid grid-cols-3 gap-4 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(0,8,30,0.7)",
            border: "1px solid rgba(252,183,48,0.18)",
            backdropFilter: "blur(20px)",
          }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {STATS_ROW.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center py-7 ${i < STATS_ROW.length - 1 ? "border-r" : ""}`}
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <span className="text-2xl md:text-3xl font-extrabold" style={{ color: "#FDED22" }}>{s.value}</span>
              <span className="text-xs md:text-sm mt-1.5 text-center font-medium"
                style={{ color: "rgba(255,255,255,0.5)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
