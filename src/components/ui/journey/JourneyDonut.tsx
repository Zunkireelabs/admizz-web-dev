"use client";

import { useState } from "react";
import { journeySteps } from "./journey.data";

type Props = {
  activeIndex: number;
  onSelect: (i: number) => void;
  /** 0–100 — fills the active step slice with a brighter overlay */
  formProgress?: number;
  /** Indices of steps that are completed (rendered green with ✓) */
  completedSteps?: number[];
  /** Indices of steps that are locked (rendered dimmer + grey) */
  lockedSteps?: number[];
  /** Override center hole content */
  centerEyebrow?: string;
  centerLabel?: string;
  centerSubLabel?: string;
  onCtaClick?: () => void;
  /** Hide the external step labels that extend beyond the SVG bounds */
  hideLabels?: boolean;
};

const SIZE = 560;
const CENTER = SIZE / 2;
const OUTER_R = 220;
const INNER_R = 124;
const POP_OUT = 8;
const ROTATION_OFFSET = -36; // shifts Counselling slice midpoint to 12 o'clock

const COMPLETE_COLOR = "#2F9D85";
const COMPLETE_DEEP = "#1F7A66";

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function slicePath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngle: number,
  endAngle: number,
) {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const p1 = polar(cx, cy, rOuter, startAngle);
  const p2 = polar(cx, cy, rOuter, endAngle);
  const p3 = polar(cx, cy, rInner, endAngle);
  const p4 = polar(cx, cy, rInner, startAngle);
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
}

export default function JourneyDonut({
  activeIndex,
  onSelect,
  formProgress,
  completedSteps = [],
  lockedSteps = [],
  centerEyebrow,
  centerLabel,
  centerSubLabel,
  onCtaClick,
  hideLabels = false,
}: Props) {
  const [pressed, setPressed] = useState(false);
  const count = journeySteps.length;
  const sweep = 360 / count;
  const active = journeySteps[activeIndex];
  const isCompletedActive = completedSteps.includes(activeIndex);
  const centerStrokeColor = isCompletedActive ? COMPLETE_COLOR : active.color;

  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square overflow-hidden sm:overflow-visible">
      {onCtaClick && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
          <button
            type="button"
            onClick={onCtaClick}
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => setPressed(false)}
            onPointerLeave={() => setPressed(false)}
            onPointerCancel={() => setPressed(false)}
            className="pointer-events-auto"
            style={{
              position: "relative",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              width: "41%",
              aspectRatio: "1 / 1",
              display: "block",
              overflow: "visible",
              WebkitTapHighlightColor: "rgba(0,0,0,0)",
              outline: "none",
            }}
          >
            {/* Layer 1: Shadow */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%", zIndex: 1,
              background: "rgba(130,80,0,0.55)",
              filter: "blur(10px)",
              transform: pressed ? "translateY(3px)" : "translateY(8px)",
              transition: pressed
                ? "transform 40ms ease"
                : "transform 500ms cubic-bezier(0.3,0.7,0.4,1)",
              willChange: "transform",
            }} />
            {/* Layer 2: Edge — the visible rim that creates depth */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%", zIndex: 2,
              background: "linear-gradient(to bottom, #C4860E 0%, #5A3200 100%)",
            }} />
            {/* Layer 3: Front face — floats up, slams down on press */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%", zIndex: 3,
              background: "linear-gradient(145deg, #FFF176 0%, #FFE000 45%, #FFB300 100%)",
              transform: pressed ? "translateY(-2px)" : "translateY(-10px)",
              transition: pressed
                ? "transform 40ms ease"
                : "transform 500ms cubic-bezier(0.34,1.56,0.64,1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "inset 0 3px 8px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(160,100,0,0.35)",
              filter: pressed ? "brightness(92%)" : "brightness(100%)",
            }}>
              <span style={{
                position: "relative", zIndex: 4,
                fontSize: "clamp(12px, 2.5vw, 15px)",
                fontWeight: 900,
                color: "#1A237E",
                fontFamily: "var(--font-rubik), sans-serif",
                letterSpacing: "-0.01em",
                pointerEvents: "none",
                whiteSpace: "nowrap",
                userSelect: "none",
                textShadow: "0 1px 0 rgba(255,255,255,0.6)",
                transform: pressed ? "scale(0.95)" : "scale(1)",
                transition: pressed ? "transform 40ms ease" : "transform 500ms cubic-bezier(0.34,1.56,0.64,1)",
              }}>
                Let&rsquo;s begin →
              </span>
            </div>
          </button>
        </div>
      )}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Your 5-step journey with Admizz"
      >
        <defs>
          {journeySteps.map((step) => (
            <radialGradient
              key={`grad-${step.id}`}
              id={`slice-grad-${step.id}`}
              cx="50%"
              cy="50%"
              r="65%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor={step.color} />
              <stop offset="100%" stopColor={step.colorDeep} />
            </radialGradient>
          ))}
          <radialGradient id="slice-grad-complete" cx="50%" cy="50%" r="65%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={COMPLETE_COLOR} />
            <stop offset="100%" stopColor={COMPLETE_DEEP} />
          </radialGradient>
          <filter id="slice-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.35" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Slices */}
        {journeySteps.map((step, i) => {
          const start = i * sweep + ROTATION_OFFSET;
          const end = start + sweep;
          const mid = start + sweep / 2;
          const isActive = i === activeIndex;
          const isCompleted = completedSteps.includes(i);
          const isLocked = lockedSteps.includes(i);
          const pop = polar(0, 0, isActive ? POP_OUT : 0, mid);

          const iconCenter = polar(CENTER, CENTER, (OUTER_R + INNER_R) / 2, mid);
          const numberPos = polar(CENTER, CENTER, OUTER_R - 26, mid);

          const fillUrl = isCompleted
            ? "url(#slice-grad-complete)"
            : `url(#slice-grad-${step.id})`;
          const sliceOpacity = isCompleted
            ? 1
            : isLocked
            ? 0.35
            : isActive
            ? 1
            : 0.78;

          // Active-step progress overlay (light yellow shimmer ring inside the slice).
          // Sweep angle of the overlay = (formProgress / 100) * sweep.
          const showProgressOverlay =
            isActive && !isCompleted && typeof formProgress === "number" && formProgress > 0;
          const progressEnd = showProgressOverlay
            ? start + (sweep * Math.min(100, Math.max(0, formProgress!))) / 100
            : start;

          return (
            <g
              key={step.id}
              transform={`translate(${pop.x} ${pop.y})`}
              style={{
                transition: "transform 400ms cubic-bezier(.22,1,.36,1)",
                cursor: "pointer",
              }}
              onClick={() => onSelect(i)}
              onMouseEnter={() => onSelect(i)}
              filter={isActive || isCompleted ? "url(#slice-shadow)" : undefined}
            >
              <path
                d={slicePath(CENTER, CENTER, OUTER_R, INNER_R, start, end)}
                fill={fillUrl}
                opacity={sliceOpacity}
                stroke="#FFFFFF"
                strokeWidth={5}
                strokeLinejoin="round"
                style={{ transition: "opacity 300ms ease, fill 400ms ease" }}
              />

              {showProgressOverlay && progressEnd > start && (
                <path
                  d={slicePath(CENTER, CENTER, OUTER_R - 6, OUTER_R - 18, start + 1, progressEnd - 1)}
                  fill="#FDED22"
                  opacity={0.9}
                  style={{ transition: "d 400ms ease, opacity 300ms ease", pointerEvents: "none" }}
                />
              )}

              {/* Step number — small, top of slice */}
              <text
                x={numberPos.x}
                y={numberPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="13"
                fontWeight="800"
                fill="#FFFFFF"
                fillOpacity={isLocked ? 0.5 : 0.85}
                style={{ letterSpacing: "0.14em", pointerEvents: "none" }}
              >
                {String(step.id).padStart(2, "0")}
              </text>

              {/* Icon — straight, centered in slice (or checkmark when completed) */}
              <g
                transform={`translate(${iconCenter.x - 16} ${iconCenter.y - 8})`}
                style={{ pointerEvents: "none" }}
              >
                {isCompleted ? (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" fill="#FFFFFF" />
                    <path
                      d="M7 12.5L10.5 16L17 9"
                      stroke={COMPLETE_DEEP}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d={step.iconPath}
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={isLocked ? 0.6 : 1}
                    />
                  </svg>
                )}
              </g>
            </g>
          );
        })}

        {/* External labels */}
        {!hideLabels && journeySteps.map((step, i) => {
          const mid = i * sweep + sweep / 2 + ROTATION_OFFSET;
          const labelPos = polar(CENTER, CENTER, OUTER_R + 28, mid);
          const isActive = i === activeIndex;
          const isCompleted = completedSteps.includes(i);
          const isLocked = lockedSteps.includes(i);
          const isRight = labelPos.x > CENTER + 4;
          const isLeft = labelPos.x < CENTER - 4;
          const anchor = isRight ? "start" : isLeft ? "end" : "middle";

          const fill = isCompleted
            ? COMPLETE_DEEP
            : isActive
            ? step.colorDeep
            : isLocked
            ? "#C4CDD6"
            : "#5C7189";

          return (
            <text
              key={`lbl-${step.id}`}
              x={labelPos.x}
              y={labelPos.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="700"
              fill={fill}
              className="hidden sm:block"
              style={{
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                transition: "fill 300ms ease",
                pointerEvents: "none",
              }}
            >
              {step.label}
            </text>
          );
        })}

        {/* Active-slice pointer — yellow triangle just outside the donut, points inward at the active step */}
        <g
          style={{
            transform: `rotate(${activeIndex * sweep + sweep / 2 + ROTATION_OFFSET}deg)`,
            transformOrigin: `${CENTER}px ${CENTER}px`,
            transition: "transform 500ms cubic-bezier(.22,1,.36,1)",
            pointerEvents: "none",
          }}
        >
          <polygon
            points={`${CENTER},${CENTER - OUTER_R - 2} ${CENTER - 11},${CENTER - OUTER_R - 18} ${CENTER + 11},${CENTER - OUTER_R - 18}`}
            fill="#FDED22"
            stroke="#0D1282"
            strokeWidth={1.2}
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 2px 4px rgba(13,18,130,0.25))" }}
          />
        </g>

        {/* Center hole */}
        <circle cx={CENTER} cy={CENTER} r={INNER_R - 8} fill="#FFFFFF" />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_R - 8}
          fill="none"
          stroke={centerStrokeColor}
          strokeWidth={2}
          strokeOpacity={0.22}
          style={{ transition: "stroke 400ms ease" }}
        />

        {/* Center content — only shown in post-submit state (no CTA button) */}
        {!onCtaClick && (
          <g>
            <text
              x={CENTER}
              y={CENTER - 44}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={isCompletedActive ? COMPLETE_DEEP : active.colorDeep}
              style={{
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                transition: "fill 400ms ease",
              }}
            >
              {centerEyebrow ?? `Step ${active.id}`}
            </text>
            {isCompletedActive && (
              <text
                x={CENTER}
                y={CENTER + 54}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#9CA3B5"
                style={{ letterSpacing: "0.1em" }}
              >
                ✓ Done
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
