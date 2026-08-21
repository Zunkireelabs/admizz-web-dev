"use client";

import { useRef, useState } from "react";
import { BarChart3, TriangleAlert, Sparkles, ClipboardList, MessageCircleQuestion, type LucideIcon } from "lucide-react";
import { valueStack } from "../content";

// Order matches valueStack in content.ts. Vivid, distinct colors — same treatment as the Skills cards.
const VISUALS: { icon: LucideIcon; color: string }[] = [
  { icon: BarChart3, color: "#4F46E5" }, // indigo
  { icon: TriangleAlert, color: "#EF4444" }, // red
  { icon: Sparkles, color: "#10B981" }, // emerald
  { icon: ClipboardList, color: "#F97316" }, // orange
  { icon: MessageCircleQuestion, color: "#8B5CF6" }, // violet
];

export default function BenefitsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const cardStep = el.scrollWidth / valueStack.length;
    setActiveIndex(Math.min(valueStack.length - 1, Math.round(el.scrollLeft / cardStep)));
  }

  function scrollToIndex(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const cardStep = el.scrollWidth / valueStack.length;
    el.scrollTo({ left: cardStep * i, behavior: "smooth" });
  }

  return (
    <section className="bg-off-white border-t border-border-light py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4 text-center mb-10">
        <p className="text-sm font-semibold tracking-[0.15em] uppercase text-blue-royal mb-3">
          Plus, You&apos;ll Get
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-navy"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          More Than Just Strategy
        </h2>
      </div>

      {/* Progress dots — click to jump */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {valueStack.map((item, i) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Show ${item.title}`}
            onClick={() => scrollToIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-8 bg-blue-royal" : "w-1.5 bg-border-light"
            }`}
          />
        ))}
      </div>

      {/* Swipeable horizontal card row */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-[6vw]"
      >
        {valueStack.map((item, i) => {
          const { icon: Icon, color } = VISUALS[i];
          return (
            <div
              key={item.title}
              className="flex-shrink-0 w-[80vw] sm:w-[360px] snap-center rounded-[16px] text-white p-7 sm:p-8"
              style={{ background: color }}
            >
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/85">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
