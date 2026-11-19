"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { isPortalPath } from "@/lib/portal-routes";

// Website chat bubble (Chatwoot). Renders nothing unless both env vars are set, so it stays
// off until chat is configured for an environment. Both are inlined at build time.
const BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL;
const WEBSITE_TOKEN = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN;

// Fixed bottom bars on the site (register CTA, city and template CTAs, the university compare
// tray) carry this attribute. The bubble measures whichever one is on screen and sits above it.
const BOTTOM_BAR_SELECTOR = "[data-bottom-bar]";
const GAP_ABOVE_BAR_PX = 12;
// Chatwoot puts the open chat window 84px above the bubble (bubble 20px up, window 104px up).
const CHAT_WINDOW_ABOVE_BUBBLE_PX = 84;

declare global {
  interface Window {
    chatwootSDK?: { run: (config: { websiteToken: string; baseUrl: string }) => void };
    $chatwoot?: { toggleBubbleVisibility: (visibility: "hide" | "show") => void };
  }
}

/** Height of the tallest bottom bar that is on screen right now, or 0 when there is none. */
function visibleBottomBarHeight(): number {
  let tallest = 0;
  document.querySelectorAll<HTMLElement>(BOTTOM_BAR_SELECTOR).forEach((bar) => {
    const rect = bar.getBoundingClientRect();
    if (rect.height === 0) return; // not displayed at this screen width
    if (rect.top >= window.innerHeight) return; // slid down out of view
    if (getComputedStyle(bar).opacity === "0") return; // faded out
    tallest = Math.max(tallest, window.innerHeight - rect.top);
  });
  return tallest;
}

/** Publishes the offsets that globals.css reads; with no bar on screen, Chatwoot's defaults apply. */
function applyBubbleOffset() {
  const root = document.documentElement;
  const barHeight = visibleBottomBarHeight();
  if (barHeight === 0) {
    root.removeAttribute("data-chat-bar");
    root.style.removeProperty("--chat-bubble-bottom");
    root.style.removeProperty("--chat-window-bottom");
    return;
  }
  const bubbleBottom = barHeight + GAP_ABOVE_BAR_PX;
  root.setAttribute("data-chat-bar", "");
  root.style.setProperty("--chat-bubble-bottom", `${bubbleBottom}px`);
  root.style.setProperty("--chat-window-bottom", `${bubbleBottom + CHAT_WINDOW_ABOVE_BUBBLE_PX}px`);
}

export default function ChatwootWidget() {
  const pathname = usePathname();
  const startedRef = useRef(false);
  const hiddenRef = useRef(false);

  // Keep the bubble clear of whichever bottom bar is visible, as bars slide in and out.
  useEffect(() => {
    if (!BASE_URL || !WEBSITE_TOKEN) return;

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(applyBubbleOffset);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("transitionend", schedule);
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("transitionend", schedule);
      observer.disconnect();
    };
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
