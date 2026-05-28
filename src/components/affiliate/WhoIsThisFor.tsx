"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const PATHWAYS = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    title: "Campus Ambassador",
    who: "College & university students",
    description: "You know students planning to study abroad. Represent Admizz at your campus, share your referral link, and earn every time a classmate enrolls.",
    perks: ["Perfect for: TU, KU, PU, ISMT students", "Earn per referral", "Official campus rep certificate"],
    cta: "Apply as Campus Ambassador",
    borderColor: "#31429C",
    iconBg: "rgba(49,66,156,0.1)",
    iconColor: "#31429C",
    tagBg: "rgba(49,66,156,0.08)",
    tagColor: "#31429C",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 10l4.553-2.07A1 1 0 0121 8.882V15.12a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    ),
    title: "Content Creator",
    who: "Bloggers, YouTubers, TikTok & Instagram creators",
    description: "You create content about education or student life. Add your affiliate link and earn every time a viewer becomes an Admizz student.",
    perks: ["Works with: Instagram, YouTube, TikTok, Blogs", "No minimum follower count", "Co-branded content support"],
    cta: "Apply as Content Creator",
    borderColor: "#FCB730",
    iconBg: "rgba(252,183,48,0.1)",
    iconColor: "#FCB730",
    tagBg: "rgba(252,183,48,0.08)",
    tagColor: "#b07400",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Education Professional",
    who: "Counselors, coaches, teachers, advisors",
    description: "You work with students daily. Refer them to Admizz and earn when they enroll. No complicated setup — just share your unique link.",
    perks: ["Works for: Independent counselors, tutors", "Earn on every referral", "Dedicated partner support line"],
    cta: "Apply as Professional",
    borderColor: "#31429C",
    iconBg: "rgba(49,66,156,0.12)",
    iconColor: "#31429C",
    tagBg: "rgba(49,66,156,0.08)",
    tagColor: "#31429C",
  },
];

export default function WhoIsThisFor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section style={{ background: "#ffffff" }} className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div className="text-center mb-10" ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{
              background: "rgba(0,19,83,0.07)",
              border: "1px solid rgba(0,19,83,0.12)",
              color: "#001353",
            }}
          >
            Who It&apos;s For
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#001353" }}>
            Is This For You?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: "#5C7189" }}>
            There&apos;s a path for every kind of person in the Admizz Affiliate Program.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {PATHWAYS.map((p, i) => (
            <motion.div
              key={p.title}
              className="relative flex flex-col bg-white rounded-2xl overflow-hidden group"
              style={{
                border: "1px solid #E8EAF0",
                boxShadow: "0 2px 16px rgba(0,19,83,0.06)",
                borderLeft: `4px solid ${p.borderColor}`,
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={reduce ? {} : {
                y: -4,
                boxShadow: "0 12px 40px rgba(0,19,83,0.12)",
                transition: { duration: 0.25 },
              }}
            >
              <div className="p-5 flex flex-col flex-1">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: p.iconBg, color: p.iconColor }}
                >
                  {p.icon}
                </div>

                <h3 className="text-xl font-bold mb-1" style={{ color: "#001353" }}>
                  {p.title}
                </h3>
                <p className="text-sm font-semibold mb-4" style={{ color: p.borderColor }}>
                  {p.who}
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#5C7189" }}>
                  {p.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {p.perks.map(perk => (
                    <li key={perk} className="flex items-start gap-2 text-sm" style={{ color: "#5C7189" }}>
                      <span style={{ color: "#FCB730" }} className="mt-0.5 flex-shrink-0 font-bold">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <button
                  className="mt-auto inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 group/btn"
                  style={{ color: p.borderColor }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#001353"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = p.borderColor; }}
                  onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {p.cta}
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Bottom hover accent */}
              <div
                className="h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: p.borderColor }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom trust note */}
        <motion.p
          className="text-center text-sm mt-12"
          style={{ color: "#5C7189" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}>
          Not sure which category fits you?{" "}
          <a href="/contact" className="font-bold transition-colors duration-200"
            style={{ color: "#FCB730" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#001353"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#FCB730"; }}>
            Talk to our team →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
