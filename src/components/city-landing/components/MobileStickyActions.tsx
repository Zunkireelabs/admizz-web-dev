"use client";

import { useEffect, useState } from "react";

interface MobileStickyActionsProps {
  phone: string;
  phoneDisplay?: string;
  whatsappNumber: string;
  whatsappMessage: string;
}

export default function MobileStickyActions({
  phone,
  phoneDisplay,
  whatsappNumber,
  whatsappMessage,
}: MobileStickyActionsProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div
      className={`tablet:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-2 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
      }}
      aria-hidden={!visible}
    >
      <div
        className="flex gap-2 rounded-[18px] p-2 backdrop-blur-xl"
        style={{
          background: "rgba(13, 18, 130, 0.92)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
        }}
      >
        <a
          href={`tel:${phone}`}
          className="flex-1 flex items-center justify-center gap-2 rounded-[12px] bg-white text-navy font-semibold text-[14px] py-3 touch-target-min"
          aria-label={`Call ${phoneDisplay ?? phone}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .95.68l1.5 4.5a1 1 0 0 1-.5 1.21l-1.7.85a11 11 0 0 0 5.27 5.27l.85-1.7a1 1 0 0 1 1.21-.5l4.5 1.5a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5z" />
          </svg>
          Call
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-[12px] font-semibold text-[14px] py-3 touch-target-min text-white"
          style={{ background: "#25D366" }}
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.516 5.26l-.999 3.648 3.972-1.607zm5.452-3.317c.232 0 .553.164.836.466.53.566.927.84 1.317.84.39 0 1.02-.219 1.49-.557.484-.348.96-.866 1.063-1.176.103-.31.103-.575 0-.732-.103-.157-.376-.252-.815-.378-.378-.108-.96-.327-1.108-.378-.148-.05-.252-.075-.357.075-.103.151-.41.485-.502.585-.092.1-.184.113-.342.038-.158-.075-.668-.246-1.272-.785a4.78 4.78 0 0 1-.879-1.092c-.092-.157-.01-.242.066-.317.067-.066.149-.171.224-.257.075-.084.099-.144.149-.24.05-.097.025-.18-.013-.255-.037-.075-.336-.808-.46-1.106-.122-.291-.245-.252-.336-.256l-.286-.005a.55.55 0 0 0-.4.187c-.137.149-.524.512-.524 1.249 0 .737.537 1.45.611 1.55.075.1 1.057 1.612 2.564 2.262.358.155.638.247.856.317.36.115.687.099.946.06.288-.043.887-.362 1.012-.713.124-.351.124-.652.087-.713-.038-.062-.137-.1-.288-.175z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
