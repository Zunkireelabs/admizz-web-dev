"use client";

import { useEffect } from "react";

const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

interface TawkApi {
  customStyle?: {
    visibility: {
      desktop: { position: string; xOffset: number; yOffset: number };
      mobile: { position: string; xOffset: number; yOffset: number };
    };
  };
  showWidget?: () => void;
  hideWidget?: () => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

// Mobile bottom bars (register, city, UK/India pages) are ~70px tall, so the bubble
// sits above them on every page. Tawk reads this once at load; it can't move later.
const MOBILE_Y_OFFSET = 90;
// The compare tray is full width on desktop, so lift the bubble there if the visitor
// lands on it directly.
const COMPARE_TRAY_Y_OFFSET = 90;

function loadTawk(desktopYOffset: number) {
  if (!PROPERTY_ID || !WIDGET_ID) return;
  if (document.getElementById("tawk-embed")) return;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  window.Tawk_API.customStyle = {
    visibility: {
      desktop: { position: "br", xOffset: 20, yOffset: desktopYOffset },
      mobile: { position: "br", xOffset: 10, yOffset: MOBILE_Y_OFFSET },
    },
  };

  const script = document.createElement("script");
  script.id = "tawk-embed";
  script.async = true;
  script.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
  script.charset = "UTF-8";
  script.setAttribute("crossorigin", "*");
  document.body.appendChild(script);
}

export default function TawkChat() {
  // Load once, after the page is idle so the chat never competes with first paint.
  useEffect(() => {
    if (!PROPERTY_ID || !WIDGET_ID) return;
    const desktopYOffset = window.location.pathname.startsWith("/explore-universities") ? COMPARE_TRAY_Y_OFFSET : 20;
    const start = () => loadTawk(desktopYOffset);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(start, 2000);
    return () => window.clearTimeout(t);
  }, []);

  // SiteChrome unmounts this on portal routes; keep the already-loaded bubble hidden there.
  useEffect(() => {
    window.Tawk_API?.showWidget?.();
    return () => window.Tawk_API?.hideWidget?.();
  }, []);

  return null;
}
