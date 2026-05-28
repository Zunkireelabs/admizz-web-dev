"use client";

import { useEffect, useRef, useState } from "react";
import type { MockAffiliate } from "@/data/affiliate/mockData";

const MONTHS = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];

interface Props {
  affiliate: MockAffiliate;
}

function buildPath(values: number[], maxVal: number, W: number, H: number, PAD: number): string {
  const pts = values.map((v, i) => {
    const x = PAD + (i / (values.length - 1)) * (W - PAD * 2);
    const y = PAD + (1 - v / maxVal) * (H - PAD * 2);
    return [x, y] as [number, number];
  });
  return pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
}

function buildArea(values: number[], maxVal: number, W: number, H: number, PAD: number): string {
  const pts = values.map((v, i) => {
    const x = PAD + (i / (values.length - 1)) * (W - PAD * 2);
    const y = PAD + (1 - v / maxVal) * (H - PAD * 2);
    return [x, y] as [number, number];
  });
  const bottom = H - PAD + 8;
  const line = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  return `${line} L${pts[pts.length - 1][0]},${bottom} L${pts[0][0]},${bottom} Z`;
}

export default function PerformanceChart({ affiliate }: Props) {
  const clicks = affiliate.monthlyClicks;
  const conversions = affiliate.monthlyConversions;
  const maxVal = Math.max(...clicks, 1);
  const W = 500;
  const H = 170;
  const PAD = 28;

  const clicksPath = buildPath(clicks, maxVal, W, H, PAD);
  const conversionsPath = buildPath(conversions, maxVal, W, H, PAD);
  const clicksArea = buildArea(clicks, maxVal, W, H, PAD);
  const conversionsArea = buildArea(conversions, maxVal, W, H, PAD);

  const clicksRef = useRef<SVGPathElement>(null);
  const convsRef = useRef<SVGPathElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      [clicksRef, convsRef].forEach(ref => {
        if (!ref.current) return;
        const len = ref.current.getTotalLength();
        ref.current.style.strokeDasharray = String(len);
        ref.current.style.strokeDashoffset = String(len);
        ref.current.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (ref.current) ref.current.style.strokeDashoffset = "0";
          });
        });
      });
      setAnimated(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const dotPoints = clicks.map((v, i) => {
    const x = PAD + (i / (clicks.length - 1)) * (W - PAD * 2);
    const y = PAD + (1 - v / maxVal) * (H - PAD * 2);
    const cy = PAD + (1 - conversions[i] / maxVal) * (H - PAD * 2);
    return { x, y, cy, click: v, conv: conversions[i] };
  });

  const yLabels = [maxVal, Math.round(maxVal * 0.5), 0];

  return (
    <div
      className="rounded-[12px] px-5 pt-5 pb-4"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
          Performance — Last 6 Months
        </span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: "#31429C" }} />
            Clicks
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: "#FCB730" }} />
            Conversions
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 150, overflow: "visible" }}>
        <defs>
          <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#31429C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#31429C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="convsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCB730" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FCB730" stopOpacity="0" />
          </linearGradient>
          <clipPath id="chartClip">
            <rect x={PAD} y={PAD - 10} width={W - PAD * 2} height={H - PAD + 10} />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map(p => (
          <line
            key={p}
            x1={PAD} y1={PAD + (1 - p) * (H - PAD * 2)}
            x2={W - PAD} y2={PAD + (1 - p) * (H - PAD * 2)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1"
          />
        ))}

        {/* Y-axis labels */}
        {yLabels.map((v, i) => (
          <text
            key={i}
            x={PAD - 6}
            y={PAD + (1 - v / maxVal) * (H - PAD * 2) + 4}
            textAnchor="end"
            fontSize="9"
            fill="rgba(255,255,255,0.22)"
          >
            {v}
          </text>
        ))}

        {/* Area fills */}
        <g clipPath="url(#chartClip)" style={{ opacity: animated ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }}>
          <path d={clicksArea} fill="url(#clicksGrad)" />
          <path d={conversionsArea} fill="url(#convsGrad)" />
        </g>

        {/* Clicks line */}
        <path ref={clicksRef} d={clicksPath} fill="none" stroke="#31429C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Conversions line */}
        <path ref={convsRef} d={conversionsPath} fill="none" stroke="#FCB730" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {animated && dotPoints.map((p, i) => (
          <g key={i} style={{ opacity: 1, transition: `opacity 0.3s ease ${0.8 + i * 0.08}s` }}>
            <circle cx={p.x} cy={p.y} r={5} fill="#020818" stroke="#31429C" strokeWidth="2">
              <title>{MONTHS[i]}: {p.click} clicks</title>
            </circle>
            <circle cx={p.x} cy={p.cy} r={5} fill="#020818" stroke="#FCB730" strokeWidth="2">
              <title>{MONTHS[i]}: {p.conv} conversions</title>
            </circle>
          </g>
        ))}

        {/* X-axis labels */}
        {MONTHS.map((m, i) => (
          <text
            key={m}
            x={PAD + (i / (MONTHS.length - 1)) * (W - PAD * 2)}
            y={H + 2}
            textAnchor="middle"
            fontSize="10"
            fill="rgba(255,255,255,0.3)"
          >
            {m}
          </text>
        ))}
      </svg>
    </div>
  );
}
