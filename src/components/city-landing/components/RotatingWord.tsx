"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RotatingWordProps {
  words: string[];
  intervalMs?: number;
  className?: string;
  gradient?: boolean;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function RotatingWord({
  words,
  intervalMs = 2500,
  className = "",
  gradient = true,
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only feature detect
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, words.length, intervalMs]);

  const gradientStyle = gradient
    ? {
        background: "linear-gradient(90deg, #FDED22 0%, #FCB730 100%)",
        WebkitBackgroundClip: "text" as const,
        WebkitTextFillColor: "transparent" as const,
        backgroundClip: "text" as const,
      }
    : undefined;

  if (reduced || words.length === 0) {
    return (
      <span className={className} style={gradientStyle}>
        {words[words.length - 1] ?? ""}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      style={{ minWidth: "5ch" }}
    >
      {/* Invisible widest word reserves layout width */}
      <span className="invisible whitespace-nowrap" aria-hidden>
        {words.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 whitespace-nowrap"
          style={gradientStyle}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
