"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const TESTIMONIALS = [
  {
    initials: "AB",
    name: "Campus Ambassador",
    detail: "Engineering undergrad · Kathmandu",
    tier: "Starter",
    tierColor: "#FDED22",
    tierBg: "rgba(253,237,34,0.18)",
    avatarFrom: "#FDED22",
    avatarTo: "#FCB730",
    quote:
      "Friends were already asking me about applying abroad. Now when I introduce them to Admizz, I actually get a commission when they enroll. The dashboard is clear, and I always know where each referral stands.",
    stat: "Active ambassador",
    statIcon: "🎓",
    accentColor: "#FDED22",
  },
  {
    initials: "CC",
    name: "Content Creator",
    detail: "Education content · Nepal",
    tier: "Rising Star",
    tierColor: "#6b80d4",
    tierBg: "rgba(49,66,156,0.25)",
    avatarFrom: "#31429C",
    avatarTo: "#0D1282",
    quote:
      "I'd been mentioning study-abroad consultancies on my channel for a while without earning from any of them. Joining as an Admizz affiliate finally made that work make sense — the link is easy to drop and the commissions are paid out monthly.",
    stat: "Monthly payouts",
    statIcon: "📊",
    accentColor: "#31429C",
  },
  {
    initials: "EP",
    name: "Education Professional",
    detail: "IELTS coach · Bhaktapur",
    tier: "Elite Partner",
    tierColor: "#FCB730",
    tierBg: "rgba(252,183,48,0.2)",
    avatarFrom: "#FCB730",
    avatarTo: "#0D1282",
    quote:
      "My students were already going through Admizz for their applications. The affiliate program just added a clean way to be credited for the referrals I was already making. Support has been responsive when I've had questions.",
    stat: "Elite Partner",
    statIcon: "⭐",
    accentColor: "#FCB730",
  },
];

export default function AffiliateTestimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      style={{ background: "#F6F2E8" }}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Top hairline — designed seam */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.55), transparent)" }} />
      {/* Bottom hairline — designed seam */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.55), transparent)" }} />
      {/* Top-side lit-from-above glow */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "260px", background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(252,183,48,0.20) 0%, rgba(252,183,48,0.05) 40%, transparent 75%)" }} />
      {/* Cool aurora — blue bottom-right */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 50% at 85% 80%, rgba(49,66,156,0.12) 0%, transparent 60%)" }} />
      {/* Faint dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,19,83,0.06) 1px, transparent 1px)",
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
              background: "rgba(252,183,48,0.18)",
              border: "1px solid rgba(252,183,48,0.45)",
              color: "#8a5a00",
              letterSpacing: "0.18em",
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: "#FCB730" }} />
            Who joins this program
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] tracking-[-0.015em]" style={{ color: "#001353" }}>
            Three types of affiliates already using Admizz.
          </h2>
          <p className="mt-5 text-base md:text-[17px] leading-[1.6]" style={{ color: "#5C7189" }}>
            Names withheld for privacy. What each is doing inside the program is real.
          </p>
        </motion.div>

        {/* Premium testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="rounded-2xl overflow-hidden flex flex-col relative group"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,19,83,0.08)",
                boxShadow: "0 6px 20px rgba(0,19,83,0.06)",
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={reduce ? {} : {
                y: -6,
                boxShadow: `0 22px 50px rgba(0,19,83,0.14), 0 0 0 1px ${t.accentColor}55`,
                transition: { duration: 0.25 },
              }}
            >
              {/* Top accent */}
              <div className="h-[2px] w-full" style={{ background: t.accentColor }} />

              {/* Hover glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${t.accentColor}1a 0%, transparent 70%)` }}
              />

              <div className="p-5 sm:p-7 md:p-8 flex flex-col flex-1 relative">
                {/* Quote mark */}
                <svg
                  className="w-10 h-10 mb-5"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  style={{ color: "rgba(0,19,83,0.18)" }}
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36 1 24.832 4.32 28 8.16 28c3.296 0 5.84-2.688 5.84-5.872 0-2.96-2.08-5.392-4.928-5.392-.448 0-.992.064-1.184.128.32-2.464 2.704-5.328 5.072-7.024L9.352 4zm16.32 0c-4.832 3.456-8.288 9.12-8.288 15.36 0 5.472 3.328 8.64 7.168 8.64 3.232 0 5.84-2.688 5.84-5.872 0-2.96-2.144-5.392-4.992-5.392-.448 0-.928.064-1.184.128.32-2.464 2.768-5.328 5.136-7.024L25.672 4z" />
                </svg>

                <p className="text-[15px] leading-[1.7] flex-1 mb-8" style={{ color: "#27314a" }}>
                  {t.quote}
                </p>

                {/* Profile row */}
                <div
                  className="flex items-center gap-3 pt-5"
                  style={{ borderTop: "1px solid rgba(0,19,83,0.08)" }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-extrabold flex-shrink-0 relative"
                    style={{
                      background: `linear-gradient(135deg, ${t.avatarFrom}, ${t.avatarTo})`,
                      color: t.accentColor === "#FDED22" ? "#001353" : "#fff",
                      boxShadow: `0 0 0 2px #FFFFFF, 0 0 0 3px ${t.accentColor}55, 0 4px 12px rgba(0,19,83,0.18)`,
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
                    <p className="text-[13.5px] font-bold truncate" style={{ color: "#001353" }}>{t.name}</p>
                    <p className="text-[11.5px] truncate" style={{ color: "#5C7189" }}>{t.detail}</p>
                  </div>
                  <span
                    className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap"
                    style={{
                      background: t.tierBg,
                      border: `1px solid ${t.accentColor}55`,
                      color: t.accentColor === "#FDED22" || t.accentColor === "#FCB730" ? "#7a4c00" : "#1f2a6b",
                    }}
                  >
                    {t.tier}
                  </span>
                </div>

                {/* Stat row */}
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: t.accentColor === "#FDED22" || t.accentColor === "#FCB730" ? "#7a4c00" : "#1f2a6b" }}
                  >
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
