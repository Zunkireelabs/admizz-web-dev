"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "9779802728444";

// Pages with a fixed bottom bar on mobile (or the compare tray) — the button sits above it.
const BOTTOM_BAR_PREFIXES = [
  "/register",
  "/janakpur",
  "/birgunj",
  "/study-in-uk-from-nepal",
  "/study-in-india-from-nepal",
  "/explore-universities",
];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.44 9.88-9.89 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.04 0C5.5 0 .16 5.33.16 11.88c0 2.09.55 4.13 1.59 5.93L0 24l6.34-1.66a11.87 11.87 0 0 0 5.7 1.45h.01c6.54 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.41-8.46z" />
    </svg>
  );
}

function track(name: string) {
  window.gtag?.("event", name, { event_category: "whatsapp_widget" });
}

export default function WhatsAppWidget() {
  const pathname = usePathname();
  // The card is open only for the page it was opened on, so navigating closes it.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPath(null);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpenPath(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // The compare tray shows at every width; the other bars are mobile/tablet only.
  const bottomClass = pathname.startsWith("/explore-universities")
    ? "bottom-24"
    : BOTTOM_BAR_PREFIXES.some((p) => pathname.startsWith(p))
      ? "bottom-24 tablet:bottom-5"
      : "bottom-5";

  const toggle = () => {
    if (!open) track("whatsapp_widget_open");
    setOpenPath(open ? null : pathname);
  };

  const startChat = () => {
    track("whatsapp_widget_start_chat");
    window.fbq?.("track", "Contact");
    // Read the page at click time so the message always names the page the visitor is on.
    const pageUrl = window.location.origin + window.location.pathname;
    const text = `Hi Admizz, I'm on your website (${pageUrl}) and would like some help with studying abroad.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setOpenPath(null);
  };

  return (
    <div
      ref={rootRef}
      className={`fixed right-4 z-40 flex flex-col items-end gap-3 ${bottomClass}`}
    >
      {open && (
        <div
          id="whatsapp-widget-card"
          role="dialog"
          aria-label="Chat with Admizz on WhatsApp"
          className="w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-[10px] bg-white shadow-[0_12px_40px_rgba(0,19,83,0.25)] border border-border-light"
        >
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
            <Image src="/icon-192.webp" alt="" width={36} height={36} className="rounded-full bg-white" />
            <div className="leading-tight">
              <p className="text-[15px] font-semibold">Admizz Education</p>
              <p className="text-xs text-white/80">Chat with us on WhatsApp</p>
            </div>
          </div>
          <div className="px-4 py-4">
            <p className="rounded-[10px] rounded-tl-none bg-off-white px-3 py-2 text-[15px] text-navy">
              Hi there! 👋 Planning to study abroad? Message our counsellors on WhatsApp and we&apos;ll help you out.
            </p>
            <button
              type="button"
              onClick={startChat}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#25D366] px-4 py-3 text-[15px] font-semibold text-white hover:bg-[#1ebe5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Start chat
            </button>
          </div>
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        aria-expanded={open}
        aria-controls="whatsapp-widget-card"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </button>
    </div>
  );
}
