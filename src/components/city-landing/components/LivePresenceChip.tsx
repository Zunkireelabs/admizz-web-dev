"use client";

import { useEffect, useState } from "react";
import type { LivePresenceConfig } from "@/data/cities/types";

interface LivePresenceChipProps {
  config: LivePresenceConfig;
  city: string;
}

function isOnlineNow(config: LivePresenceConfig): boolean {
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: config.timezone,
      hour: "numeric",
      minute: "numeric",
      weekday: "short",
      hour12: false,
    });
    const parts = fmt.formatToParts(new Date());
    const hourPart = parts.find((p) => p.type === "hour")?.value ?? "0";
    const weekdayPart = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
    const hour = parseInt(hourPart, 10);
    const dayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    const day = dayMap[weekdayPart] ?? 0;
    if (!config.workingHours.days.includes(day)) return false;
    return (
      hour >= config.workingHours.startHour &&
      hour < config.workingHours.endHour
    );
  } catch {
    return true;
  }
}

export default function LivePresenceChip({ config, city }: LivePresenceChipProps) {
  // Default to online to avoid hydration flash; corrected client-side after mount.
  const [online, setOnline] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- timezone-aware presence calc must run on client
    setOnline(isOnlineNow(config));
    const id = window.setInterval(() => setOnline(isOnlineNow(config)), 60_000);
    return () => window.clearInterval(id);
  }, [config]);

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-white"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span className="relative flex w-2 h-2">
        <span
          className={`absolute inset-0 rounded-full ${
            online ? "bg-green-400 animate-ping" : "bg-yellow"
          }`}
          style={{ opacity: 0.6 }}
        />
        <span
          className={`relative inline-flex rounded-full w-2 h-2 ${
            online ? "bg-green-400" : "bg-yellow"
          }`}
        />
      </span>
      <span className="text-white/90">
        {online ? config.onlineLabel : config.offlineLabel}
      </span>
      <span className="text-white/40">·</span>
      <span className="text-white/70">{city}</span>
    </span>
  );
}
