"use client";

import { AnimatePresence, motion } from "framer-motion";
import { journeySteps } from "./journey.data";

type Props = {
  activeIndex: number;
  onSelect: (i: number) => void;
};

export default function JourneyMobileTimeline({ activeIndex, onSelect }: Props) {
  const active = journeySteps[activeIndex];

  return (
    <div>
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#E0E6F2] rounded-full" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full transition-all duration-500"
          style={{
            width: `${(activeIndex / (journeySteps.length - 1)) * 100}%`,
            background: `linear-gradient(90deg, ${journeySteps[0].color}, ${active.color})`,
          }}
        />
        <div className="relative flex justify-between items-center">
          {journeySteps.map((step, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={step.id}
                onClick={() => onSelect(i)}
                className="relative z-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  width: isActive ? 52 : 36,
                  height: isActive ? 52 : 36,
                  background: isActive ? step.color : "#FFFFFF",
                  border: `2px solid ${isActive ? step.color : "#D7DAE8"}`,
                  color: isActive ? "#FFFFFF" : step.color,
                  fontWeight: 800,
                  fontSize: isActive ? 14 : 12,
                  boxShadow: isActive ? `0 6px 16px ${step.color}55` : "none",
                }}
                aria-label={`Step ${step.id}: ${step.label}`}
              >
                {String(step.id).padStart(2, "0")}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-8 rounded-2xl bg-white p-6"
          style={{ border: "1px solid #F0F0F0", boxShadow: "0 4px 18px rgba(13,18,130,0.06)" }}
        >
          <div className="h-[3px] -mx-6 -mt-6 mb-5 rounded-t-2xl" style={{ background: active.color }} />
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] mb-3"
            style={{ background: `${active.color}14`, color: active.color }}
          >
            {active.label}
          </span>
          <h3
            className="text-[18px] font-bold leading-tight mb-2"
            style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}
          >
            {active.title}
          </h3>
          <p className="text-[13px] leading-relaxed mb-5" style={{ color: "#5C7189" }}>
            {active.description}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3" style={{ background: active.bgTint }}>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] mb-0.5" style={{ color: active.color }}>
                Duration
              </p>
              <p className="text-[13px] font-bold" style={{ color: "#0D1282" }}>
                {active.duration}
              </p>
            </div>
            <div className="rounded-xl p-3" style={{ background: active.bgTint }}>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] mb-0.5" style={{ color: active.color }}>
                Outcome
              </p>
              <p className="text-[12px] font-bold leading-snug" style={{ color: "#0D1282" }}>
                {active.outcome}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
