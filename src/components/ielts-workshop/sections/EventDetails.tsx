"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Calendar, Clock, Timer, Video, Users, type LucideIcon } from "lucide-react";
import { event } from "../content";
import Reveal from "../Reveal";
import { useRegistrationModal } from "../RegistrationModal";

const rows: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Date", value: event.dateLabel, icon: Calendar },
  { label: "Time", value: event.timeLabel, icon: Clock },
  { label: "Duration", value: event.durationLabel, icon: Timer },
  { label: "Venue", value: event.venue, icon: Video },
  { label: "Capacity", value: `Limited to ${event.capacity} students`, icon: Users },
];

export default function EventDetails() {
  const { open } = useRegistrationModal();
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltY = useMotionValue(0);
  const tiltYSpring = useSpring(tiltY, { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width;
    tiltY.set((relX - 0.5) * 12);
  }

  function handleMouseLeave() {
    tiltY.set(0);
  }

  return (
    <section className="relative bg-white border-t border-border-light py-20 md:py-24 overflow-hidden">
      {/* Ambient glow behind the laptop */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(253,237,34,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-2xl mx-auto px-4">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-royal text-center mb-3">
            Workshop Details
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold text-navy mb-12 text-center"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            {event.urgencyLine}
          </h2>
        </Reveal>

        {/* Laptop mockup — the workshop lives on your screen, so does its ticket */}
        <motion.div
          initial={{ rotateX: -85, opacity: 0 }}
          whileInView={{ rotateX: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "bottom center", perspective: 1200 }}
        >
          <motion.div
            ref={wrapRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateY: tiltYSpring, transformStyle: "preserve-3d" }}
          >
            {/* Screen */}
            <div
              className="relative rounded-[18px] border-[10px] border-slate-800 bg-slate-900 overflow-hidden"
              style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.25)" }}
            >
              {/* Camera notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-800 rounded-b-full z-20" />

              {/* Live badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-red-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-red-500" />
                </span>
                <span className="text-[11px] font-semibold text-white">LIVE · Google Meet</span>
              </div>

              {/* Screen glare */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)",
                }}
              />

              {/* Screen content — the ticket */}
              <div className="bg-off-white pt-14 pb-8 px-6 sm:px-10">
                {/* Ticket card */}
                <div className="relative rounded-[16px] border border-border-light bg-white shadow-sm">
                  {/* Ticket notches */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-off-white border border-border-light" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-off-white border border-border-light" />

                  {/* Scarcity stamp */}
                  <div className="absolute -top-3 -right-3 rotate-12 bg-error text-white text-[10px] font-bold px-3 py-1.5 rounded-md border-2 border-white shadow-md whitespace-nowrap">
                    ONLY {event.capacity} SEATS
                  </div>

                  <div className="divide-y divide-dashed divide-border-light px-2">
                    {rows.map((row) => (
                      <div key={row.label} className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-royal/10 flex items-center justify-center flex-shrink-0">
                          <row.icon className="w-4 h-4 text-blue-royal" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:flex-1 gap-0.5 sm:gap-4 min-w-0">
                          <span className="text-xs sm:text-sm text-gray-medium sm:flex-1">{row.label}</span>
                          <span className="text-sm font-semibold text-navy sm:text-right">{row.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grounding shadow */}
          <div
            className="mt-3 mx-auto w-3/4 h-4 rounded-full opacity-30 blur-md"
            style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
        </motion.div>

        <Reveal delay={0.2}>
          <p className="text-[13px] text-gray-medium mt-6 text-center">{event.accessNote}</p>

          <div className="text-center mt-8">
            <button
              type="button"
              onClick={open}
              className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px]"
            >
              {event.ctaText.toUpperCase()}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
