"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  /** ISO 8601 target time, e.g. "2026-05-15T14:00:00+05:45" */
  target: string;
  /** When countdown reaches zero, render this string. Hides if undefined. */
  expiredLabel?: string;
  /** Compact ("3d 4h 22m") or expanded ("3 days 4 hours 22 mins"). */
  format?: "compact" | "expanded";
  className?: string;
  /** Show seconds when remaining time is < 1h. */
  showSeconds?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

function calc(target: string): TimeLeft {
  const t = new Date(target).getTime();
  const now = Date.now();
  const totalMs = Math.max(0, t - now);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const seconds = Math.floor((totalMs / 1000) % 60);
  return { days, hours, minutes, seconds, totalMs };
}

export default function CountdownTimer({
  target,
  expiredLabel,
  format = "compact",
  className = "",
  showSeconds = false,
}: CountdownTimerProps) {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only init
    setTime(calc(target));
    const tick = () => setTime(calc(target));
    const intervalMs = showSeconds ? 1000 : 60_000;
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [target, showSeconds]);

  if (!time) return null;
  if (time.totalMs <= 0) {
    return expiredLabel ? <span className={className}>{expiredLabel}</span> : null;
  }

  const inLastHour = time.totalMs < 60 * 60 * 1000;
  const useSeconds = showSeconds && inLastHour;

  if (format === "expanded") {
    const parts = [
      time.days > 0 ? `${time.days} day${time.days === 1 ? "" : "s"}` : null,
      time.hours > 0 || time.days > 0 ? `${time.hours}h` : null,
      `${time.minutes}m`,
      useSeconds ? `${time.seconds}s` : null,
    ].filter(Boolean);
    return <span className={className}>{parts.join(" ")}</span>;
  }

  const parts = [
    time.days > 0 ? `${time.days}d` : null,
    time.hours > 0 || time.days > 0 ? `${time.hours}h` : null,
    `${time.minutes}m`,
    useSeconds ? `${time.seconds}s` : null,
  ].filter(Boolean);
  return <span className={className}>{parts.join(" ")}</span>;
}
