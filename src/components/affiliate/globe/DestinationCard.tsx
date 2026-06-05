"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Destination } from "./data";

interface Props {
  destination: Destination | null;
  position:    { x: number; y: number } | null;
  containerWidth:  number;
  containerHeight: number;
}

/**
 * Glassmorphic destination card positioned beside its beacon.
 * Auto-flips left/right and clamps inside the container.
 */
export default function DestinationCard({ destination, position, containerWidth, containerHeight }: Props) {
  if (!destination || !position) {
    return (
      <AnimatePresence>
        {null}
      </AnimatePresence>
    );
  }

  const CARD_W = 240;
  const OFFSET = 24;

  // Place to the right of beacon by default, flip left if it would overflow
  const placeRight = position.x + OFFSET + CARD_W <= containerWidth;
  const left = placeRight ? position.x + OFFSET : position.x - OFFSET - CARD_W;
  // Vertically center on the beacon, clamp inside the container
  const rawTop = position.y - 60;
  const top = Math.max(8, Math.min(rawTop, containerHeight - 160));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={destination.id}
        initial={{ opacity: 0, y: 6, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.97 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute pointer-events-none"
        style={{
          left,
          top,
          width: CARD_W,
          background: "rgba(10,18,48,0.72)",
          border: "1px solid rgba(252,183,48,0.32)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderRadius: 14,
          boxShadow: "0 20px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
          zIndex: 30,
        }}
      >
        <div
          style={{
            height: 2,
            width: "100%",
            background: "linear-gradient(90deg, transparent, #FCB730 30%, #FDED22 50%, #FCB730 70%, transparent)",
            borderRadius: "14px 14px 0 0",
          }}
        />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded"
              style={{
                background: "rgba(253,237,34,0.14)",
                color: "#FDED22",
                letterSpacing: "0.14em",
              }}
            >
              {destination.iso}
            </span>
            <span className="text-[11px] uppercase font-bold" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>
              Study destination
            </span>
          </div>
          <p className="text-[16px] font-extrabold text-white leading-tight mb-2 tracking-tight">
            {destination.country}
          </p>
          <p className="text-[12px] font-semibold mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
            {destination.cities.slice(0, 4).join(" · ")}
          </p>
          <p className="text-[12.5px] leading-[1.55]" style={{ color: "rgba(255,255,255,0.6)" }}>
            {destination.benefit}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
