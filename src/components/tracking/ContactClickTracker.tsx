"use client";

import { useEffect } from "react";
import { trackContact, type ContactChannel } from "@/lib/tracking/track";

// Counts clicks on WhatsApp, phone and email links anywhere on the site as Meta "Contact"
// events (CRET-13). Many students message on WhatsApp instead of filling a form, so
// these are leads too. One delegated listener covers every link, including ones added later.
function channelFor(href: string): ContactChannel | null {
  const h = href.toLowerCase();
  if (h.startsWith("https://wa.me") || h.includes("whatsapp.com/send") || h.startsWith("whatsapp:")) return "whatsapp";
  if (h.startsWith("tel:")) return "phone";
  if (h.startsWith("mailto:")) return "email";
  return null;
}

export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const channel = channelFor(link.getAttribute("href") ?? "");
      if (channel) trackContact(channel);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
