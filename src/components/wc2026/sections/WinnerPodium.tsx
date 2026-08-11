"use client";

import { useEffect, useState } from "react";

const W = 1200, H = 380;
const GROUND = 315;

const STEP_W  = 112;
const START_X = (W - STEP_W * 3) / 2;
const BASE_H  = 18;

const BLOCKS = [
  { rank: 2, x: START_X,            w: STEP_W, h: 78,  cx: START_X + STEP_W * 0.5 },
  { rank: 1, x: START_X + STEP_W,   w: STEP_W, h: 112, cx: START_X + STEP_W * 1.5 },
  { rank: 3, x: START_X + STEP_W*2, w: STEP_W, h: 62,  cx: START_X + STEP_W * 2.5 },
];

const WINNERS = [
  { rank: 1, name: "Sohan S",  initials: "SS", emoji: "🏆", fill: "#B8860B" },
  { rank: 2, name: "Rejina D", initials: "RD", emoji: "🥈", fill: "#5a6a88" },
  { rank: 3, name: "Sanita D", initials: "SD", emoji: "🥉", fill: "#9A5820" },
];

const DELAYS = ["0s", "0.7s", "1.4s"];

export default function WinnerPodium() {
  const [viewBox, setViewBox] = useState(`0 26 ${W} ${H - 26}`);

  useEffect(() => {
    const update = () => {
      setViewBox(window.innerWidth < 720
        ? `300 26 600 ${H - 26}`
        : `0 26 ${W} ${H - 26}`
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="wc-podium-wrapper">
      <svg
        viewBox={viewBox}
        className="wc-podium-svg"
        overflow="visible"
        aria-label="World Cup 2026 Winner Podium"
      >
        <defs>
          {/* Beam fade — strong at source (top), dissolves before reaching podium */}
          <linearGradient id="bGO" x1="0" y1="-200" x2="0" y2={GROUND} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#b8ccff" stopOpacity="0.28"/>
            <stop offset="50%"  stopColor="#b8ccff" stopOpacity="0.07"/>
            <stop offset="85%"  stopColor="#b8ccff" stopOpacity="0.01"/>
            <stop offset="100%" stopColor="#b8ccff" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="bGI" x1="0" y1="-200" x2="0" y2={GROUND} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#d8e8ff" stopOpacity="0.36"/>
            <stop offset="35%"  stopColor="#d8e8ff" stopOpacity="0.10"/>
            <stop offset="65%"  stopColor="#d8e8ff" stopOpacity="0.02"/>
            <stop offset="100%" stopColor="#d8e8ff" stopOpacity="0"/>
          </linearGradient>
          {/* Outer glow filter — heavy horizontal feathering, soft vertical */}
          <filter id="fBO">
            <feGaussianBlur stdDeviation="22 7"/>
          </filter>
          {/* Core filter — moderate feathering for bright centre stripe */}
          <filter id="fBI">
            <feGaussianBlur stdDeviation="10 3"/>
          </filter>
          <linearGradient id="pGrass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#1e6818"/>
            <stop offset="100%" stopColor="#0e3209"/>
          </linearGradient>
          <linearGradient id="pFace" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#FBF3DC"/>
            <stop offset="100%" stopColor="#D4C070"/>
          </linearGradient>
        </defs>

        {/* Left spotlight — outer glow (wide, heavily feathered) */}
        <polygon points={`0,-200 260,-200 ${W/2+12},${GROUND}`}         fill="url(#bGO)" filter="url(#fBO)"/>
        {/* Left spotlight — bright core (narrow, less blurred) */}
        <polygon points={`0,-200 90,-200 ${W/2},${GROUND}`}             fill="url(#bGI)" filter="url(#fBI)"/>
        {/* Right spotlight — outer glow */}
        <polygon points={`${W},-200 ${W-260},-200 ${W/2-12},${GROUND}`} fill="url(#bGO)" filter="url(#fBO)"/>
        {/* Right spotlight — bright core */}
        <polygon points={`${W},-200 ${W-90},-200 ${W/2},${GROUND}`}     fill="url(#bGI)" filter="url(#fBI)"/>

        {/* Grass */}
        <rect x="0" y={GROUND}     width={W} height={H-GROUND} fill="url(#pGrass)"/>
        <rect x="0" y={GROUND}     width={W} height={12} fill="rgba(40,160,30,0.12)"/>
        <rect x="0" y={GROUND+24}  width={W} height={12} fill="rgba(40,160,30,0.10)"/>
        <rect x="0" y={GROUND+48}  width={W} height={12} fill="rgba(40,160,30,0.10)"/>
        <line x1="0" y1={GROUND} x2={W} y2={GROUND} stroke="rgba(120,230,100,0.5)" strokeWidth="1.5"/>

        {/* Shared podium base */}
        <rect x={START_X-8} y={GROUND-BASE_H} width={STEP_W*3+16} height={BASE_H} fill="url(#pFace)"/>
        <rect x={START_X-8} y={GROUND-BASE_H} width={STEP_W*3+16} height={4}      fill="rgba(255,255,255,0.65)"/>

        {/* Podium steps */}
        {BLOCKS.map(b => {
          const top     = GROUND - BASE_H - b.h;
          const numSize = b.rank === 1 ? 68 : b.rank === 2 ? 56 : 48;
          return (
            <g key={b.rank}>
              <rect x={b.x} y={top} width={b.w} height={b.h} fill="url(#pFace)"/>
              <rect x={b.x} y={top} width={b.w} height={5}   fill="rgba(255,255,255,0.70)"/>
              <rect x={b.x}         y={top} width={1.5} height={b.h} fill="rgba(0,0,0,0.13)"/>
              <rect x={b.x+b.w-1.5} y={top} width={1.5} height={b.h} fill="rgba(0,0,0,0.10)"/>
              <text
                x={b.cx} y={top + b.h * 0.58}
                textAnchor="middle" dominantBaseline="middle"
                fill="#2e1e00" fontFamily="Montserrat,sans-serif"
                fontWeight="900" fontSize={numSize} opacity="0.88">
                {b.rank}
              </text>
            </g>
          );
        })}

        {/* Floating trophies + name badges */}
        {WINNERS.map((w, i) => {
          const block  = BLOCKS.find(b => b.rank === w.rank)!;
          const topY   = GROUND - BASE_H - block.h;
          const emojiY = topY - 24;
          const badgeY = emojiY - 36;
          const R      = 15;
          const nameW  = w.name.length * 7;
          const pillW  = R * 2 + 6 + nameW;
          const pillX  = block.cx - pillW / 2;

          return (
            <g key={w.rank}>
              <animateTransform
                attributeName="transform" type="translate"
                values="0,0; 0,-7; 0,0" dur="2.8s" begin={DELAYS[i]}
                repeatCount="indefinite" calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"/>

              <text
                x={block.cx} y={emojiY}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="32">{w.emoji}</text>

              <rect
                x={pillX - 4} y={badgeY - R - 2}
                width={pillW + 8} height={R * 2 + 4}
                fill="rgba(0,0,0,0.52)" rx={R + 2}/>

              <circle cx={pillX + R} cy={badgeY} r={R} fill={w.fill}/>
              <circle cx={pillX + R} cy={badgeY} r={R} fill="none"
                stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
              <text
                x={pillX + R} y={badgeY}
                textAnchor="middle" dominantBaseline="middle"
                fill="white" fontFamily="Montserrat,sans-serif"
                fontWeight="800" fontSize="9">
                {w.initials}
              </text>

              <text
                x={pillX + R * 2 + 7} y={badgeY}
                textAnchor="start" dominantBaseline="middle"
                fill="rgba(255,255,255,0.95)" fontFamily="Montserrat,sans-serif"
                fontWeight="600" fontSize="11">
                {w.name}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="wc-podium-email">
        Email us at{" "}
        <a href="mailto:hello@admizz.com">hello@admizz.com</a>
        {" "}to claim your gift hamper
      </p>
    </div>
  );
}
