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

export default function AffiliateTestimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      style={{ background: "#060c1f" }}
      className="py-24 md:py-28 relative overflow-hidden"
    >
      {/* Refined ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(49,66,156,0.18) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(252,183,48,0.05) 0%, transparent 60%)" }} />
      {/* Subtle pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium header */}
        <motion.div className="text-center max-w-2xl mx-auto mb-16 md:mb-20" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}>
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
            Affiliate Stories
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold text-white leading-[1.1] tracking-[-0.015em]">
            Real Affiliates. Real Results.
          </h2>
          <p className="mt-5 text-base md:text-[17px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.55)" }}>
            People just like you are already winning with Admizz.
          </p>
        </motion.div>

        {/* Premium testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="rounded-2xl overflow-hidden flex flex-col relative group"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                backdropFilter: "blur(20px)",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={reduce ? {} : {
                y: -6,
                background: "rgba(255,255,255,0.045)",
                borderColor: `${t.accentColor}40`,
                boxShadow: `0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px ${t.accentColor}30`,
                transition: { duration: 0.25 },
              }}
            >
              {/* Top accent */}
              <div className="h-[2px] w-full" style={{ background: t.accentColor }} />

              {/* Hover glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${t.accentColor}10 0%, transparent 70%)` }}
              />

              <div className="p-7 md:p-8 flex flex-col flex-1 relative">
                {/* Quote mark */}
                <svg
                  className="w-10 h-10 mb-5"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  style={{ color: `${t.accentColor}40` }}
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36 1 24.832 4.32 28 8.16 28c3.296 0 5.84-2.688 5.84-5.872 0-2.96-2.08-5.392-4.928-5.392-.448 0-.992.064-1.184.128.32-2.464 2.704-5.328 5.072-7.024L9.352 4zm16.32 0c-4.832 3.456-8.288 9.12-8.288 15.36 0 5.472 3.328 8.64 7.168 8.64 3.232 0 5.84-2.688 5.84-5.872 0-2.96-2.144-5.392-4.992-5.392-.448 0-.928.064-1.184.128.32-2.464 2.768-5.328 5.136-7.024L25.672 4z" />
                </svg>

                <p className="text-[15px] leading-[1.7] flex-1 mb-8 text-white" style={{ opacity: 0.88 }}>
                  {t.quote}
                </p>

                {/* Profile row */}
                <div
                  className="flex items-center gap-3 pt-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-extrabold flex-shrink-0 relative"
                    style={{
                      background: `linear-gradient(135deg, ${t.avatarFrom}, ${t.avatarTo})`,
                      color: t.name === "Sunita Gurung" ? "#001353" : "#fff",
                      boxShadow: `0 0 0 2px rgba(255,255,255,0.06), 0 0 0 4px ${t.accentColor}20, 0 4px 12px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {t.initials}
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: t.accentColor, color: "#001353", fontSize: "9px", fontWeight: 900 }}
                    >
                      ✓
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-bold text-white truncate">{t.name}</p>
                    <p className="text-[11.5px] truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{t.detail}</p>
                  </div>
                  <span
                    className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap"
                    style={{ background: t.tierBg, border: `1px solid ${t.tierColor}50`, color: t.tierColor }}
                  >
                    {t.tier}
                  </span>
                </div>

                {/* Stat row */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs font-semibold" style={{ color: t.accentColor }}>
                    {t.statIcon} {t.stat}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
