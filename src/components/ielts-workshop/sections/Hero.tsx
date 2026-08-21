"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, Clock, Video, Users } from "lucide-react";
import { event } from "../content";
import { useRegistrationModal } from "../RegistrationModal";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HEADLINE_HIGHLIGHT = "Same IELTS Band?";

const infoRows = [
  { icon: Calendar, label: "Date", value: event.dateLabel },
  { icon: Clock, label: "Time", value: event.timeLabel },
  { icon: Video, label: "Venue", value: event.venue },
  { icon: Users, label: "Seats", value: `Limited to ${event.capacity} students` },
];

export default function Hero() {
  const { open } = useRegistrationModal();

  const highlightIndex = event.headline.indexOf(HEADLINE_HIGHLIGHT);
  const headlineBefore = highlightIndex === -1 ? event.headline : event.headline.slice(0, highlightIndex);
  const headlineAfter =
    highlightIndex === -1 ? "" : event.headline.slice(highlightIndex + HEADLINE_HIGHLIGHT.length);

  return (
    <section className="relative text-white overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20">
      {/* Background photo, softened so it reads as ambient depth rather than literal imagery */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/events/ielts-workshop-hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(1px)",
        }}
        aria-hidden="true"
      />
      {/* Navy brand scrim for text legibility + on-brand tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,19,83,0.65) 0%, rgba(13,18,130,0.55) 55%, rgba(49,66,156,0.5) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient brand glow */}
      <div
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(253,237,34,0.18) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-16 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(252,183,48,0.14) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Left column — story + CTA */}
        <div className="text-center lg:text-left">
          <motion.p variants={item} className="text-sm font-semibold tracking-[0.2em] uppercase text-yellow mb-6">
            {event.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-bold leading-[1.05] text-4xl sm:text-5xl lg:text-6xl mb-5"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            {headlineBefore}
            {highlightIndex !== -1 && <span className="text-yellow">{HEADLINE_HIGHLIGHT}</span>}
            {headlineAfter}
          </motion.h1>

          <motion.p variants={item} className="text-lg sm:text-xl text-white/85 mb-8">
            {event.subhead}
          </motion.p>

          <motion.div
            variants={item}
            className="inline-block rounded-[10px] border border-white/20 bg-white/5 px-6 py-3 mb-8"
          >
            <p className="text-base sm:text-lg font-semibold">{event.sessionTitle}</p>
          </motion.div>

          <motion.p variants={item} className="max-w-xl mx-auto lg:mx-0 text-[15px] sm:text-base text-white/75 mb-10">
            {event.intro}
          </motion.p>

          <motion.div variants={item}>
            <motion.button
              type="button"
              onClick={open}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px]"
            >
              {event.ctaText.toUpperCase()}
            </motion.button>
          </motion.div>

          <motion.p variants={item} className="mt-4 text-[13px] text-white/60">
            No cost to attend · Limited to {event.capacity} seats
          </motion.p>
        </div>

        {/* Right column — glass info card */}
        <motion.div
          variants={item}
          className="rounded-[16px] p-6 sm:p-8"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-5">
            Workshop at a Glance
          </p>
          <div className="space-y-5">
            {infoRows.map((row) => (
              <div key={row.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow/15 flex items-center justify-center flex-shrink-0">
                  <row.icon className="w-5 h-5 text-yellow" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-white/50">{row.label}</p>
                  <p className="text-sm sm:text-base font-semibold">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
