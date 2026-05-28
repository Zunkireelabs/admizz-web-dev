"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionIcon from "../components/SectionIcon";
import type { ProcessStep } from "@/data/cities/types";

interface ProcessTimelineProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  steps: ProcessStep[];
}

export default function ProcessTimeline({
  eyebrow,
  heading,
  subheading,
  steps,
}: ProcessTimelineProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative py-14 tablet:py-20" style={{ background: "#F8F9FF" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p
            className="text-[12px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "#1E6DEB" }}
          >
            {eyebrow}
          </p>
          <h2
            className="mt-3 text-navy font-bold"
            style={{
              fontFamily: "var(--font-rubik), sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
            }}
          >
            {heading}
          </h2>
          <p className="mt-4 text-[15px] text-gray-dark">{subheading}</p>
        </motion.div>

        {/* Two-column sticky scroll layout */}
        <div className="mt-12 tablet:mt-14 grid tablet:grid-cols-[260px_1fr] gap-8 tablet:gap-12">
          {/* Sticky step indicator (left) */}
          <div className="tablet:sticky tablet:top-24 tablet:self-start">
            <StickyIndicator steps={steps} activeIdx={activeIdx} />
          </div>

          {/* Step detail blocks (right, scrolls) */}
          <div className="space-y-12 tablet:space-y-16">
            {steps.map((step, idx) => (
              <StepBlock
                key={step.num}
                step={step}
                total={steps.length}
                onActive={() => setActiveIdx(idx)}
                isActive={activeIdx === idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyIndicator({
  steps,
  activeIdx,
}: {
  steps: ProcessStep[];
  activeIdx: number;
}) {
  const progress =
    steps.length > 1 ? (activeIdx / (steps.length - 1)) * 100 : 0;

  return (
    <div className="relative">
      {/* Vertical track */}
      <div
        aria-hidden
        className="absolute left-5 top-3 bottom-3 w-[2px]"
        style={{ background: "rgba(13,18,130,0.1)" }}
      />
      {/* Animated progress line */}
      <div
        aria-hidden
        className="absolute left-5 top-3 w-[2px]"
        style={{
          height: `${progress}%`,
          background:
            "linear-gradient(180deg, #FCB730 0%, #0D1282 100%)",
          transition: "height 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)",
        }}
      />

      <ul className="space-y-4">
        {steps.map((step, idx) => {
          const isActive = idx === activeIdx;
          const isPast = idx < activeIdx;
          const isReached = isActive || isPast;
          return (
            <li key={step.num} className="relative flex items-start gap-4">
              <div
                className="relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] z-10"
                style={{
                  fontFamily: "var(--font-rubik), sans-serif",
                  background: isReached
                    ? "linear-gradient(135deg, #FCB730 0%, #0D1282 100%)"
                    : "white",
                  color: isReached ? "white" : "#9CA3AF",
                  border: isReached
                    ? "none"
                    : "2px solid rgba(13,18,130,0.15)",
                  boxShadow: isActive
                    ? "0 10px 24px rgba(13,18,130,0.28)"
                    : "0 2px 6px rgba(13,18,130,0.06)",
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                {step.num}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full animate-pulse"
                    style={{
                      boxShadow: "0 0 0 6px rgba(252,183,48,0.18)",
                    }}
                  />
                )}
              </div>
              <div className="pt-1.5">
                <h4
                  className="text-[14px] font-bold leading-tight"
                  style={{
                    color: isActive
                      ? "#0D1282"
                      : isPast
                      ? "#1E6DEB"
                      : "#9CA3AF",
                    transition: "color 0.4s",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-[10.5px] uppercase tracking-[0.12em] mt-1 font-semibold"
                  style={{
                    color: isReached ? "#7C5710" : "#9CA3AF",
                    transition: "color 0.4s",
                  }}
                >
                  {step.duration}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StepBlock({
  step,
  total,
  onActive,
  isActive,
}: {
  step: ProcessStep;
  total: number;
  onActive: () => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative flex flex-col justify-center"
    >
      {/* Big step number watermark in background */}
      <span
        aria-hidden
        className="absolute -top-4 right-0 font-bold leading-none select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-rubik), sans-serif",
          fontSize: "clamp(90px, 12vw, 160px)",
          background:
            "linear-gradient(180deg, rgba(13,18,130,0.06) 0%, rgba(13,18,130,0) 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: isActive ? 1 : 0.5,
          transition: "opacity 0.5s",
        }}
      >
        {String(step.num).padStart(2, "0")}
      </span>

      {/* Step indicator label */}
      <p
        className="relative text-[12px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: "#1E6DEB" }}
      >
        Step {step.num} of {total}
      </p>

      {/* Icon + duration row */}
      <div className="relative mt-4 flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center text-blue-dark"
          style={{
            background:
              "linear-gradient(135deg, rgba(253,237,34,0.2) 0%, rgba(252,183,48,0.2) 100%)",
            border: "1px solid rgba(252,183,48,0.35)",
          }}
        >
          <SectionIcon iconKey={step.iconKey} className="w-5 h-5" />
        </div>
        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em]"
          style={{
            background: "rgba(252,183,48,0.18)",
            color: "#7C5710",
            border: "1px solid rgba(252,183,48,0.3)",
          }}
        >
          {step.duration}
        </span>
      </div>

      {/* Title */}
      <h3
        className="relative mt-4 text-navy font-bold"
        style={{
          fontFamily: "var(--font-rubik), sans-serif",
          fontSize: "clamp(22px, 2.6vw, 30px)",
          lineHeight: 1.1,
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p className="relative mt-3 text-[14px] tablet:text-[15px] leading-relaxed text-gray-dark max-w-xl">
        {step.description}
      </p>

      {/* Subtle accent bar at bottom — grows when active */}
      <div
        aria-hidden
        className="relative mt-5 h-[2px] rounded-full"
        style={{
          width: isActive ? "80px" : "28px",
          background:
            "linear-gradient(90deg, #FCB730 0%, #0D1282 100%)",
          transition: "width 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)",
          opacity: isActive ? 1 : 0.4,
        }}
      />
    </motion.div>
  );
}
