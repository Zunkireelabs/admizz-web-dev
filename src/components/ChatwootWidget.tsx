"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { isPortalPath } from "@/lib/portal-routes";

// Website chat bubble (Chatwoot). Renders nothing unless both env vars are set, so it stays
// off until chat is configured for an environment. Both are inlined at build time.
const BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL;
const WEBSITE_TOKEN = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN;

// The compare tray on this page is a full-width bar on desktop, so the bubble sits above it.
const DESKTOP_LIFT_PATH = "/explore-universities";

declare global {
  interface Window {
    chatwootSDK?: { run: (config: { websiteToken: string; baseUrl: string }) => void };
    $chatwoot?: { toggleBubbleVisibility: (visibility: "hide" | "show") => void };
  }
}

export default function ChatwootWidget() {
  const pathname = usePathname();
  const startedRef = useRef(false);
  const hiddenRef = useRef(false);

  // globals.css lifts the bubble when this attribute is present (desktop compare tray).
  useEffect(() => {
    document.documentElement.toggleAttribute("data-chat-lift", pathname.startsWith(DESKTOP_LIFT_PATH));
  }, [pathname]);

  useEffect(() => {
    if (!BASE_URL || !WEBSITE_TOKEN) return;

    const hidden = isPortalPath(pathname);
    hiddenRef.current = hidden;

    // Already loaded: just show or hide the bubble as the visitor moves between pages.
    if (startedRef.current) {
      window.$chatwoot?.toggleBubbleVisibility(hidden ? "hide" : "show");
      return;
    }

    // Never load the widget on a portal page; it loads on the first normal page instead.
    if (hidden) return;

    startedRef.current = true;
    const script = document.createElement("script");
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    script.onload = () => window.chatwootSDK?.run({ websiteToken: WEBSITE_TOKEN, baseUrl: BASE_URL });
    document.body.appendChild(script);
  }, [pathname]);

  // The visitor may reach a portal page while the widget is still starting up.
  useEffect(() => {
    const applyCurrentVisibility = () => {
      if (hiddenRef.current) window.$chatwoot?.toggleBubbleVisibility("hide");
    };
    window.addEventListener("chatwoot:ready", applyCurrentVisibility);
    return () => window.removeEventListener("chatwoot:ready", applyCurrentVisibility);
  }, []);

  return null;
}
