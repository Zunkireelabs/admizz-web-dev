"use client";

import { useState } from "react";
import { Headphones, BookOpen, PenLine, Mic, type LucideIcon } from "lucide-react";
import { skills, type SkillContent } from "../content";
import Reveal from "../Reveal";

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

function SkillCard({ skill }: { skill: SkillContent }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICONS[skill.key];
  const visual = SKILL_VISUALS[skill.key];
  const shownTechniques = expanded ? skill.techniques : skill.techniques.slice(0, 3);
  const remaining = skill.techniques.length - 3;

  return (
    <div className="relative rounded-[14px] overflow-hidden text-white p-4 sm:p-5 h-full">
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
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="w-9 h-9 rounded-full bg-yellow/15 flex items-center justify-center mb-3">
          <Icon className="w-4 h-4 text-yellow" />
        </div>
        <h3 className="text-base font-bold mb-1">{skill.name}</h3>
        <p className="text-white/70 text-xs leading-snug mb-3">{skill.statement}</p>
        <div className="flex flex-wrap gap-1.5">
          {shownTechniques.map((technique) => (
            <span key={technique} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
              {technique}
            </span>
          ))}
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-[10px] px-2 py-0.5 rounded-full text-yellow font-semibold hover:underline cursor-pointer"
            >
              {expanded ? "Show less" : `+${remaining} more`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section className="bg-white border-t border-border-light py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
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

        {/* Static grid — all 4 skills in one row, no scrolling required */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {skills.map((skill, i) => (
            <Reveal key={skill.key} delay={i * 0.08}>
              <SkillCard skill={skill} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
