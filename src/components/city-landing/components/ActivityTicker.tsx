"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ActivityFeedEntry } from "@/data/cities/types";

interface ActivityTickerProps {
  entries: ActivityFeedEntry[];
  intervalMs?: number;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ActivityTicker({
  entries,
  intervalMs = 8000,
}: ActivityTickerProps) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only feature detect
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced || entries.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % entries.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, entries.length, intervalMs]);

  if (entries.length === 0) return null;
  const entry = entries[index];

  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-2 text-[12px] text-white/80"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span
        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-dark"
        style={{
          background:
            "linear-gradient(135deg, #FDED22 0%, #FCB730 100%)",
        }}
      >
        {entry.name.charAt(0)}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={`${entry.name}-${entry.ago}-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="leading-tight"
        >
          <span className="font-semibold text-white">{entry.name}</span>
          <span className="text-white/60"> from {entry.area} </span>
          <span className="text-white/85">{entry.action}</span>
          <span className="text-white/40"> · {entry.ago}</span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
