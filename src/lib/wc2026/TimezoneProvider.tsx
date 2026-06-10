"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { tzAbbrev } from "./format";
import { DEFAULT_TZ } from "./timezones";

const STORAGE_KEY = "wc26-tz";

interface TimezoneCtx {
  tz: string;
  abbrev: string;
  isAuto: boolean;
  setTimezone: (tz: string | null) => void;
}

const TimezoneContext = createContext<TimezoneCtx>({
  tz: DEFAULT_TZ,
  abbrev: "NPT",
  isAuto: false,
  setTimezone: () => {},
});

export function useTimezone(): TimezoneCtx {
  return useContext(TimezoneContext);
}

function detectBrowserTz(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TZ;
  } catch {
    return DEFAULT_TZ;
  }
}

export function TimezoneProvider({ children }: { children: ReactNode }) {
  // SSR + first paint use the stable default. After mount we snap to
  // saved choice → detected → default. This rides the same flicker as
  // LiveProvider's stable-reference-time → Date.now() switch.
  const [tz, setTz] = useState<string>(DEFAULT_TZ);
  const [isAuto, setIsAuto] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTz(saved);
        setIsAuto(false);
        return;
      }
    } catch {
      /* noop */
    }
    const detected = detectBrowserTz();
    setTz(detected);
    setIsAuto(true);
  }, []);

  const setTimezone = useCallback((next: string | null) => {
    try {
      if (next) {
        window.localStorage.setItem(STORAGE_KEY, next);
        setTz(next);
        setIsAuto(false);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
        const detected = detectBrowserTz();
        setTz(detected);
        setIsAuto(true);
      }
    } catch {
      /* noop */
    }
  }, []);

  const value = useMemo<TimezoneCtx>(() => ({
    tz,
    abbrev: tzAbbrev(tz),
    isAuto,
    setTimezone,
  }), [tz, isAuto, setTimezone]);

  return <TimezoneContext.Provider value={value}>{children}</TimezoneContext.Provider>;
}
