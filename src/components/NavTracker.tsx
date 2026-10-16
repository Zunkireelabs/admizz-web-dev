"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { markInAppNav } from "@/lib/nav-history";

// Records that the visitor has navigated inside the site, so Back buttons know history is safe to use.
export default function NavTracker() {
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== firstPath.current) markInAppNav();
  }, [pathname]);

  return null;
}
