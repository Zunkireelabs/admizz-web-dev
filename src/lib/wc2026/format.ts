const FALLBACK_TZ = "Asia/Kathmandu";

export function tzAbbrev(tz: string, refMs: number = Date.now()): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "short",
    }).formatToParts(new Date(refMs));
    return parts.find((p) => p.type === "timeZoneName")?.value ?? tz;
  } catch {
    return tz;
  }
}

export function formatKickoff(
  iso: string,
  tz: string = FALLBACK_TZ,
): { date: string; time: string; weekday: string; day: string; tz: string } {
  const d = new Date(iso);
  const weekday = d.toLocaleDateString("en-US", { timeZone: tz, weekday: "short" }).toUpperCase();
  const day = d.toLocaleDateString("en-US", { timeZone: tz, day: "2-digit", month: "short" }).toUpperCase();
  const date = d.toLocaleDateString("en-GB", {
    timeZone: tz,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time24 = d.toLocaleTimeString("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const abbrev = tzAbbrev(tz, d.getTime());
  return { date, time: `${time24} ${abbrev}`, weekday, day, tz };
}

export function isSameLocalDay(isoA: string, refDate: Date, tz: string = FALLBACK_TZ): boolean {
  const a = new Date(isoA).toLocaleDateString("en-CA", { timeZone: tz });
  const b = refDate.toLocaleDateString("en-CA", { timeZone: tz });
  return a === b;
}

// Backwards-compatible aliases used by sections that haven't been migrated yet.
export const formatNepalTime = (iso: string) => formatKickoff(iso, FALLBACK_TZ);
export const isSameNepalDay = (isoA: string, refDate: Date) => isSameLocalDay(isoA, refDate, FALLBACK_TZ);
