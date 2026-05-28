"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  // Disable browser's native scroll restoration so it doesn't override us
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
