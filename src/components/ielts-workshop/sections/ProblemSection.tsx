"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { problem } from "../content";
import Reveal from "../Reveal";

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative border-t border-border-light py-14 md:py-20 text-center overflow-hidden"
      style={{ background: "#FAF3E3" }}
    >
      {/* Cursor-following glow — desktop only */}
      <motion.div
        className="hidden md:block absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.14) 0%, transparent 70%)",
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-royal/70 mb-5">
            Sound Familiar?
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="text-3xl sm:text-5xl font-extrabold leading-[1.12] text-navy"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            {problem.pivotLineTop}
            <br />
            <span style={{ color: "#F97316" }}>{problem.pivotLineBottom}</span>
          </h2>

          {/* Playful annotation — hover to react */}
          <div className="mt-4 flex justify-center sm:justify-end sm:pr-4">
            <motion.div
              style={{ rotate: -4 }}
              whileHover={{ scale: 1.08, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-yellow text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg whitespace-nowrap cursor-default"
            >
              That&apos;s the whole workshop
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            {problem.painPoints.map((point) => (
              <span
                key={point}
                className="text-xs sm:text-sm text-navy/80 bg-white border border-border-light rounded-full px-4 py-2 transition-all duration-200 hover:border-orange-400 hover:shadow-md hover:-translate-y-0.5 cursor-default"
              >
                {point}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
