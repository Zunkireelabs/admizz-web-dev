"use client";

import { useState } from "react";

interface Milestone {
  year: string;
  title: string;
  description: string;
  accent: string;
}

interface Props {
  milestones: Milestone[];
}

export default function AboutTimeline({ milestones }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* Desktop: centered alternating timeline */}
      <div className="hidden md:block relative">
        {/* Center vertical line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, #1E6DEB, #3FB5A0, #E86F3C, #BB5FEC, #1E6DEB)",
          }}
        />

        <div className="space-y-12">
          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            const isHovered = hoveredIndex === index;

            return (
              <div key={index} className="relative flex items-center">
                {/* Dot on center line */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 border-[3px] border-white transition-transform duration-300"
                  style={{
                    background: milestone.accent,
                    boxShadow: `0 0 0 3px ${milestone.accent}30`,
                    transform: `translateX(-50%) scale(${isHovered ? 1.3 : 1})`,
                  }}
                />

                {isLeft ? (
                  <>
                    {/* Card on left */}
                    <div className="w-1/2 pr-10">
                      <div
                        className="ml-auto max-w-[420px] rounded-2xl p-6 bg-white transition-all duration-300 cursor-default"
                        style={{
                          boxShadow: isHovered
                            ? `12px 18px 28px 14px rgba(0,0,0,0.08)`
                            : `8px 13px 18px 11px rgba(0,0,0,0.05)`,
                          transform: isHovered
                            ? "translateY(-4px)"
                            : "translateY(0)",
                          borderLeft: `4px solid ${milestone.accent}`,
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <span
                          className="inline-block text-[12px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                          style={{
                            background: `${milestone.accent}14`,
                            color: milestone.accent,
                          }}
                        >
                          {milestone.year}
                        </span>
                        <h3
                          className="text-[17px] font-bold mb-2"
                          style={{ color: "#0D1282" }}
                        >
                          {milestone.title}
                        </h3>
                        <p
                          className="text-[14px] leading-[1.7]"
                          style={{ color: "#5a6275" }}
                        >
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    {/* Empty right */}
                    <div className="w-1/2" />
                  </>
                ) : (
                  <>
                    {/* Empty left */}
                    <div className="w-1/2" />
                    {/* Card on right */}
                    <div className="w-1/2 pl-10">
                      <div
                        className="max-w-[420px] rounded-2xl p-6 bg-white transition-all duration-300 cursor-default"
                        style={{
                          boxShadow: isHovered
                            ? `12px 18px 28px 14px rgba(0,0,0,0.08)`
                            : `8px 13px 18px 11px rgba(0,0,0,0.05)`,
                          transform: isHovered
                            ? "translateY(-4px)"
                            : "translateY(0)",
                          borderLeft: `4px solid ${milestone.accent}`,
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <span
                          className="inline-block text-[12px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                          style={{
                            background: `${milestone.accent}14`,
                            color: milestone.accent,
                          }}
                        >
                          {milestone.year}
                        </span>
                        <h3
                          className="text-[17px] font-bold mb-2"
                          style={{ color: "#0D1282" }}
                        >
                          {milestone.title}
                        </h3>
                        <p
                          className="text-[14px] leading-[1.7]"
                          style={{ color: "#5a6275" }}
                        >
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: gradient accent bar cards */}
      <div className="md:hidden space-y-4">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 relative overflow-hidden"
            style={{
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            }}
          >
            {/* Accent gradient left bar */}
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{
                width: "4px",
                background: `linear-gradient(to bottom, #0D1282, ${milestone.accent})`,
              }}
            />
            <span
              className="inline-flex items-center justify-center text-[12px] font-bold text-white px-3 py-1 rounded-full mb-3"
              style={{ background: milestone.accent }}
            >
              {milestone.year}
            </span>
            <h3
              className="text-[15px] font-bold mb-1.5"
              style={{ color: "#0D1282" }}
            >
              {milestone.title}
            </h3>
            <p
              className="text-[13px] leading-[1.7]"
              style={{ color: "#5a6275" }}
            >
              {milestone.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
