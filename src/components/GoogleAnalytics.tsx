"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Sends a GA4 page view on client-side navigation. The first page view is sent by the
// <head> Google tag script (src/lib/tracking/config.ts), so the first run is skipped;
// otherwise every landing page would be counted twice.
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId || !window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    window.gtag("config", gaId, { page_path: url });
  }, [pathname, searchParams]);

  return null;
}
