"use client";

import { useRef, useState } from "react";
import { Headphones, BookOpen, PenLine, Mic, type LucideIcon } from "lucide-react";
import { skills, type SkillContent } from "../content";

const ICONS: Record<SkillContent["key"], LucideIcon> = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenLine,
  speaking: Mic,
};

// Vibrant, clearly distinct color per card so each skill reads apart at a glance.
const SKILL_VISUALS: Record<SkillContent["key"], { color: string; image: string }> = {
  listening: { color: "#8B5CF6", image: "/images/events/skills/listening.jpg" }, // violet
  reading: { color: "#14B8A6", image: "/images/events/skills/reading.jpg" }, // teal
  writing: { color: "#F97316", image: "/images/events/skills/writing.jpg" }, // orange
  speaking: { color: "#F43F5E", image: "/images/events/skills/speaking.jpg" }, // rose
};

function SkillCard({ skill, className = "" }: { skill: SkillContent; className?: string }) {
  const Icon = ICONS[skill.key];
  const visual = SKILL_VISUALS[skill.key];
  return (
    <div className={`relative flex-shrink-0 rounded-[16px] overflow-hidden text-white p-7 sm:p-8 ${className}`}>
      {/* Reference photo for this skill */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${visual.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      />
      {/* Vivid color wash — lighter opacity so the photo stays visible underneath */}
      <div className="absolute inset-0" style={{ background: `${visual.color}99` }} aria-hidden="true" />
      {/* Bottom scrim so text stays legible regardless of what's under it */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.05) 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-yellow/15 flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-yellow" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{skill.name}</h3>
        <p className="text-white/70 mb-6">{skill.statement}</p>
        <div className="flex flex-wrap gap-2">
          {skill.techniques.map((technique) => (
            <span key={technique} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80">
              {technique}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const cardStep = el.scrollWidth / skills.length;
    setActiveIndex(Math.min(skills.length - 1, Math.round(el.scrollLeft / cardStep)));
  }

  function scrollToIndex(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const cardStep = el.scrollWidth / skills.length;
    el.scrollTo({ left: cardStep * i, behavior: "smooth" });
  }

  return (
    <section className="bg-white border-t border-border-light py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4 text-center mb-10">
        <p className="text-sm font-semibold tracking-[0.15em] uppercase text-blue-royal mb-3">
          The Workshop
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-navy"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          Master All 4 Skills
        </h2>
      </div>

      {/* Progress dots — click to jump to a skill */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {skills.map((skill, i) => (
          <button
            key={skill.key}
            type="button"
            aria-label={`Show ${skill.name}`}
            onClick={() => scrollToIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-8 bg-blue-royal" : "w-1.5 bg-border-light"
            }`}
          />
        ))}
      </div>

      {/* Swipeable horizontal card row — works reliably on every device */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-[6vw]"
      >
        {skills.map((skill) => (
          <SkillCard key={skill.key} skill={skill} className="w-[85vw] sm:w-[420px] snap-center" />
        ))}
      </div>
    </section>
  );
}
