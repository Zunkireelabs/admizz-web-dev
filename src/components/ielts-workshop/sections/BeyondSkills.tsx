"use client";

import { motion } from "framer-motion";
import { Target, BarChart3, ClipboardList, Clock, TriangleAlert, CircleCheckBig } from "lucide-react";
import { beyondSkills } from "../content";
import WordReveal from "../WordReveal";

// Order matches beyondSkills.points in content.ts
const ICONS = [Target, BarChart3, ClipboardList, Clock, TriangleAlert, CircleCheckBig];

export default function BeyondSkills() {
  return (
    <section className="bg-navy text-white border-t border-white/10 py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-14"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          <WordReveal text={beyondSkills.heading} highlightWords={["IELTS"]} />
        </h2>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
          {beyondSkills.points.map((point, i) => {
            const Icon = ICONS[i];
            const isLeftColumn = i % 2 === 0;
            const row = Math.floor(i / 2);
            return (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: isLeftColumn ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: row * 0.15, ease: "easeOut" }}
                whileHover={{ y: -14, scale: 1.03 }}
                className="group relative cursor-default"
              >
                {/* Stacked paper layers behind the card — spread apart further on hover */}
                <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[14px] bg-white/[0.04] border border-white/5 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />
                <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-[14px] bg-white/[0.06] border border-white/8 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />

                {/* Main card */}
                <div className="relative h-full rounded-[14px] bg-white/10 border border-white/15 p-5 shadow-none transition-all duration-300 group-hover:border-golden/40 group-hover:shadow-2xl">
                  <div className="w-12 h-12 rounded-[10px] bg-golden/15 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-golden" />
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-white/85 text-[15px] leading-snug">{point}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
