"use client";

import { AnimatePresence, motion } from "framer-motion";
import { journeySteps } from "./journey.data";

type Props = { activeIndex: number };

export default function JourneyPanel({ activeIndex }: Props) {
  const step = journeySteps[activeIndex];

  return (
    <div
      className="relative rounded-3xl bg-white overflow-hidden h-full min-h-[420px]"
      style={{
        border: "1px solid #F0F0F0",
        boxShadow: "0 8px 30px rgba(13,18,130,0.06)",
      }}
    >
      <div className="h-[4px]" style={{ background: step.color, transition: "background 400ms ease" }} />
      <div className="p-7 md:p-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="inline-flex items-center justify-center rounded-xl text-[14px] font-extrabold w-12 h-12"
                style={{ background: step.bgTint, color: step.color }}
              >
                {String(step.id).padStart(2, "0")}
              </span>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{ background: `${step.color}14`, color: step.color }}
              >
                {step.label}
              </span>
            </div>

            <h3
              className="text-[22px] md:text-[26px] font-bold leading-tight mb-3"
              style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}
            >
              {step.title}
            </h3>
            <p className="text-[14px] md:text-[15px] leading-relaxed mb-7" style={{ color: "#5C7189" }}>
              {step.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl p-4" style={{ background: step.bgTint }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: step.color }}>
                  Duration
                </p>
                <p className="text-[14px] font-bold" style={{ color: "#0D1282" }}>
                  {step.duration}
                </p>
              </div>
              <div className="rounded-2xl p-4" style={{ background: step.bgTint }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: step.color }}>
                  Outcome
                </p>
                <p className="text-[14px] font-bold leading-snug" style={{ color: "#0D1282" }}>
                  {step.outcome}
                </p>
              </div>
            </div>

            <div className="mt-7">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.14em] mb-3"
                style={{ color: step.colorDeep }}
              >
                What's included
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                {step.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] leading-snug"
                    style={{ color: "#0D1282" }}
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={step.color}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 pt-6 border-t flex items-center justify-between gap-4" style={{ borderColor: "#F0F0F0" }}>
              <div className="flex items-center gap-1.5">
                {journeySteps.map((s, i) => (
                  <span
                    key={s.id}
                    className="h-[3px] rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? 32 : 14,
                      background: i === activeIndex ? step.color : "#E0E6F2",
                    }}
                  />
                ))}
              </div>
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: "#FDED22", color: "#0D1282", minHeight: 44 }}
              >
                Book free consultation
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
