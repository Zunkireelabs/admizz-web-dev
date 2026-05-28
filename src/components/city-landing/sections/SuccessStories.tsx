"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSwipe } from "@/lib/useSwipe";
import type { SuccessStory } from "@/data/cities/types";

interface SuccessStoriesProps {
  city: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  stories: SuccessStory[];
}

export default function SuccessStories({ eyebrow, heading, subheading, stories }: SuccessStoriesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => setActiveIndex((i) => Math.min(i + 1, stories.length - 1)),
    onSwipeRight: () => setActiveIndex((i) => Math.max(i - 1, 0)),
  });

  return (
    <section className="relative py-14 tablet:py-20 overflow-hidden" style={{ background: "#FBF8F3" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10"
        >
          <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: "#0D1282" }}>
            {eyebrow}
          </p>
          <h2
            className="mt-3 font-bold text-navy"
            style={{ fontFamily: "var(--font-rubik), sans-serif", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1 }}
          >
            {heading}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#6B7280" }}>
            {subheading}
          </p>
        </motion.div>

        {/* Desktop: horizontal 3-column grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="hidden tablet:grid tablet:grid-cols-3 gap-5 items-stretch"
        >
          {stories.map((story) => (
            <motion.div
              key={story.name}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55 }}
              className="flex flex-col rounded-[20px] overflow-hidden bg-white"
              style={{
                boxShadow: "0 8px 32px rgba(0,19,83,0.08)",
                borderLeft: "3px solid #FCB730",
              }}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Student identity row */}
                <div className="flex items-center gap-3">
                  <div
                    className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
                    style={{ border: "2px solid rgba(252,183,48,0.4)" }}
                  >
                    <Image src={story.photo} alt={story.name} fill sizes="44px" className="object-cover object-top" />
                  </div>
                  <div>
                    <p
                      className="text-[14px] font-bold leading-tight"
                      style={{
                        fontFamily: "var(--font-rubik), sans-serif",
                        background: "linear-gradient(90deg, #FCB730 0%, #0D1282 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {story.name}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#9CA3AF" }}>
                      {story.schoolInCity}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="ml-auto font-bold select-none"
                    style={{
                      fontSize: "40px",
                      lineHeight: 1,
                      fontFamily: "Georgia, serif",
                      color: "rgba(252,183,48,0.2)",
                    }}
                  >
                    &ldquo;
                  </span>
                </div>

                {/* Quote */}
                <p className="mt-4 text-[13.5px] leading-[1.7] flex-1" style={{ color: "#4B5563" }}>
                  {story.quote}
                </p>

                {/* Footer */}
                <div className="mt-5 pt-4 flex items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(0,19,83,0.07)" }}>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "#9CA3AF" }}>Now at</p>
                    <p className="mt-0.5 text-[13px] font-bold text-navy flex items-center gap-1.5">
                      <span>{story.countryFlag}</span>
                      {story.university}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>{story.intake}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    {story.ieltsScore && (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                        style={{ background: "rgba(252,183,48,0.15)", color: "#7C5710" }}
                      >
                        {story.ieltsScore}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile carousel */}
        <div className="tablet:hidden">
          <div className="overflow-hidden" {...swipeHandlers}>
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {stories.map((story) => (
                <div key={story.name} className="w-full flex-shrink-0 px-1">
                  <MobileCard story={story} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Story ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? "20px" : "6px",
                  height: "6px",
                  background: i === activeIndex ? "#FCB730" : "rgba(0,19,83,0.2)",
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function MobileCard({ story }: { story: SuccessStory }) {
  return (
    <div
      className="rounded-[20px] overflow-hidden bg-white"
      style={{ boxShadow: "0 8px 32px rgba(0,19,83,0.08)", borderLeft: "3px solid #FCB730" }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0" style={{ border: "2px solid rgba(252,183,48,0.4)" }}>
            <Image src={story.photo} alt={story.name} fill sizes="44px" className="object-cover object-top" />
          </div>
          <div>
            <p
              className="text-[14px] font-bold"
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                background: "linear-gradient(90deg, #FCB730 0%, #0D1282 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {story.name}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "#9CA3AF" }}>{story.schoolInCity}</p>
          </div>
        </div>
        <p className="text-[13.5px] leading-[1.7]" style={{ color: "#4B5563" }}>
          &ldquo;{story.quote}&rdquo;
        </p>
        <div className="mt-5 pt-4 flex items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(0,19,83,0.07)" }}>
          <div>
            <p className="text-[13px] font-bold text-navy flex items-center gap-1.5">
              <span>{story.countryFlag}</span>{story.university}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>{story.intake}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {story.ieltsScore && (
              <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: "rgba(252,183,48,0.15)", color: "#7C5710" }}>
                {story.ieltsScore}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
