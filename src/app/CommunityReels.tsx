"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

const reels = [
  { id: "FONcFmhTZ-s", label: "Too Many Options? Here's the ONE That Matters", accent: "#1E6DEB" },
  { id: "lNEEaUYFMCc", label: "Apply Late = Regret Later", accent: "#3FB5A0" },
  { id: "tGnXcqJYbIY", label: "This Is Where Dreams Take Off", accent: "#E86F3C" },
  { id: "fTKp2ywc2a0", label: "Your US Dream Starts Here — CSU", accent: "#BB5FEC" },
  { id: "O5QW7LpmROY", label: "Last Call! UK September Intake Closing", accent: "#1E6DEB" },
  { id: "KtVjMQ9vtcI", label: "100 Reasons to Study Abroad", accent: "#3FB5A0" },
  { id: "z29CMtFQbZY", label: "Crack IELTS/PTE — Classes Open Now!", accent: "#E86F3C" },
];

const CARD_WIDTH = 220;
const GAP = 20;
const SCROLL_AMOUNT = (CARD_WIDTH + GAP) * 3;

function ReelCard({
  id,
  label,
  accent,
  isPlaying,
  onPlay,
}: {
  id: string;
  label: string;
  accent: string;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)] w-[200px] min-w-[200px] max-w-[200px] sm:w-[220px] sm:min-w-[220px] sm:max-w-[220px]"
      style={{
        boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)",
      }}
    >
      <div className="h-[4px]" style={{ background: accent }} />
      <div className="relative" style={{ aspectRatio: "3/4" }}>
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&rel=0&modestbranding=1`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            onClick={onPlay}
            className="absolute inset-0 w-full h-full cursor-pointer group border-0 bg-transparent p-0"
            aria-label={`Play reel: ${label}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={label}
              fill
              className="object-cover"
              sizes="240px"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
              }}
            />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 ml-0.5"
                  style={{ color: "#0D1282" }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
              <p className="text-[13px] font-semibold text-white leading-snug">
                {label}
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default function CommunityReels() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  return (
    <section
      className="py-14 md:py-16"
      style={{ background: "#F8F9FF" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3"
          style={{ color: "#1E6DEB" }}
        >
          Our Community
        </p>
        <h2
          className="text-[28px] md:text-[36px] font-bold text-center mb-4"
          style={{ color: "#0D1282" }}
        >
          Peek Into the Admizz World
        </h2>
        <p
          className="text-center text-[15px] leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: "#5a6275" }}
        >
          Quick bites of wisdom, fun, and real talk — straight from our team.
          Hit play and see what makes Admizz different.
        </p>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white items-center justify-center cursor-pointer border-0 transition-all duration-200 hover:scale-110"
            style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 scrollbar-hide"
            style={{ scrollPaddingLeft: "16px" }}
          >
            {reels.map((reel) => (
              <div key={reel.id} className="snap-start shrink-0">
                <ReelCard
                  {...reel}
                  isPlaying={activeId === reel.id}
                  onPlay={() => setActiveId(reel.id)}
                />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white items-center justify-center cursor-pointer border-0 transition-all duration-200 hover:scale-110"
            style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile swipe hint */}
          <p className="md:hidden text-center text-[13px] mt-3 flex items-center justify-center gap-1" style={{ color: "#9ca3af" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
            Swipe to explore
          </p>
        </div>
      </div>
    </section>
  );
}
