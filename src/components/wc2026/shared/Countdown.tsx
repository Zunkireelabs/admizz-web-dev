"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetISO: string;
  format?: "long" | "short";
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown({ targetISO, format = "short" }: CountdownProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    // Stable placeholder for SSR + first hydration — replaced after mount
    return (
      <span className="wc-mono" suppressHydrationWarning>
        {format === "long" ? "00d 00h 00m 00s" : "00:00:00"}
      </span>
    );
  }

  const diff = Math.max(0, new Date(targetISO).getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (format === "long") {
    return (
      <span className="wc-mono">
        {pad(days)}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
      </span>
    );
  }
  return (
    <span className="wc-mono">
      {days > 0 ? `${days}d ` : ""}{pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </span>
  );
}
