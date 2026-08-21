"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CountdownProps {
  targetISO: string;
}

function getRemaining(targetISO: string) {
  const total = Math.max(0, new Date(targetISO).getTime() - Date.now());
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function DigitBox({ label, value }: { label: string; value: number | undefined }) {
  const display = value !== undefined ? String(value).padStart(2, "0") : "--";
  return (
    <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-[10px] bg-white/10 border border-white/15 overflow-hidden">
      <div className="relative h-6 sm:h-7 w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute text-xl sm:text-2xl font-bold text-yellow tabular-nums"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[11px] uppercase tracking-wide text-white/70 mt-1">{label}</span>
    </div>
  );
}

export default function Countdown({ targetISO }: CountdownProps) {
  // null on first render so server/client markup matches; real value fills in after mount.
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining(targetISO));
    const id = setInterval(() => setRemaining(getRemaining(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  const units = [
    { label: "Days", value: remaining?.days },
    { label: "Hours", value: remaining?.hours },
    { label: "Mins", value: remaining?.minutes },
    { label: "Secs", value: remaining?.seconds },
  ];

  const ended = remaining !== null && remaining.total <= 0;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {ended ? (
        <p className="text-lg font-semibold text-white">Workshop is live now</p>
      ) : (
        units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
            <DigitBox label={unit.label} value={unit.value} />
            {i < units.length - 1 && (
              <span className="text-xl sm:text-2xl font-bold text-white/20 -mt-4">:</span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
