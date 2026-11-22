"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { isPortalPath } from "@/lib/portal-routes";

// Website chat. Two ways to show it, chosen at build time; with neither set it renders nothing, so chat stays
// off until it is configured for an environment:
//   1. NEXT_PUBLIC_CHAT_WIDGET_SRC: the Admizz-styled Zunkiree chat widget (a script served by EdgeX).
//      Takes priority when set. PROTOTYPE: it answers with scripted replies and sends nothing to a server yet.
//   2. NEXT_PUBLIC_CHATWOOT_BASE_URL + NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN: Chatwoot's own bubble.
const WIDGET_SRC = process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC;
// The public id of the tenant's branded Chatwoot inbox (EdgeX: Settings > Communications > Website chat). With it the widget sends
// visitors' messages to the team; without it the widget shows its scripted demo replies and nothing leaves the page.
const CHAT_INBOX = process.env.NEXT_PUBLIC_CHAT_INBOX_ID;
const BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL;
const WEBSITE_TOKEN = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN;
const CHAT_ENABLED = Boolean(WIDGET_SRC) || Boolean(BASE_URL && WEBSITE_TOKEN);

// The site is built once and the same output can go to both staging and production, so the chat settings may be
// present in a production build. Only these hosts may ever show the bubble; production is deliberately not here.
// Chatwoot also only allows the staging host to embed it, so a bubble on any other host would load broken.
const CHAT_ALLOWED_HOSTS = ["dev-web.admizzeducation.com", "admizz.localhost", "localhost"];

function chatAllowedHere(): boolean {
  return CHAT_ENABLED && CHAT_ALLOWED_HOSTS.includes(window.location.hostname);
}

// How the Zunkiree widget looks and reads for Admizz. Colours and the logo are the site's own.
const ADMIZZ_CHAT_THEME = {
  brand: {
    name: "Admizz Education",
    primary: "#001353",
    primaryDark: "#0D1282",
    accent: "#FDED22",
    logo: "/images/logos/Admizz-Education-New-Logo-For-Dark-Background-1.png-1-1024x331.webp",
  },
  greeting: "Hi there, how can we help you study abroad?",
  startCard: { title: "Start a conversation", sub: "Ask about courses, visas or fees" },
  team: [
    { initials: "A", color: "#31429C" },
    { initials: "E", color: "#0D9488" },
    { initials: "D", color: "#B45309" },
  ],
  agent: { name: "Admizz counsellors", initials: "AE" },
  online: true,
  onlineTitle: "Our counsellors are online",
  onlineSub: "Typically reply in a few minutes",
  topics: ["Study in the UK", "Study in the USA", "Canada", "Australia", "Scholarships", "Visa help"],
  link: { label: "Book a free consultation", sub: "Pick a time with a counsellor", url: "/register" },
  // Ask how to reach the visitor before the first message, as the chat form did before: name and WhatsApp
  // number required, email optional.
  contact: {
    // Nepali numbers are typed without the country code; Chatwoot only accepts international ones.
    defaultCountryCode: "+977",
    when: "before",
    name: { show: true, required: true },
    phone: { show: true, required: true },
    email: { show: true, required: false },
  },
  poweredBy: "Zunkiree",
};

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
    ZunkireeChat?: { init: (config: unknown) => void; setHidden: (hidden: boolean) => void };
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
    if (!chatAllowedHere()) return;

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
    if (!chatAllowedHere()) return;

    const hidden = isPortalPath(pathname);
    hiddenRef.current = hidden;

    // The Zunkiree widget: load its script once, then show or hide it as the visitor moves between pages.
    if (WIDGET_SRC) {
      if (startedRef.current) {
        window.ZunkireeChat?.setHidden(hidden);
        return;
      }
      if (hidden) return; // loads on the first normal page instead
      startedRef.current = true;
      const widgetScript = document.createElement("script");
      widgetScript.src = WIDGET_SRC;
      widgetScript.async = true;
      widgetScript.onload = () => window.ZunkireeChat?.init(CHAT_INBOX ? { ...ADMIZZ_CHAT_THEME, connection: { inbox: CHAT_INBOX } } : ADMIZZ_CHAT_THEME);
      document.body.appendChild(widgetScript);
      return;
    }

    if (!BASE_URL || !WEBSITE_TOKEN) return;

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
