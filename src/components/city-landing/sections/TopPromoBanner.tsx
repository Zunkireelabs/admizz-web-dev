"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountdownTimer from "../components/CountdownTimer";
import type { PromoBanner } from "@/data/cities/types";

interface TopPromoBannerProps {
  banner: PromoBanner;
}

const VARIANT_STYLES: Record<
  PromoBanner["variant"],
  { background: string; color: string; accent: string; pillBg: string }
> = {
  campaign: {
    background:
      "linear-gradient(135deg, #FCB730 0%, #FDED22 50%, #FCB730 100%)",
    color: "#001353",
    accent: "#001353",
    pillBg: "rgba(0, 19, 83, 0.12)",
  },
  event: {
    background:
      "linear-gradient(135deg, #001353 0%, #0D1282 50%, #1B0F4F 100%)",
    color: "#FFFFFF",
    accent: "#FCB730",
    pillBg: "rgba(255, 255, 255, 0.12)",
  },
  urgent: {
    background:
      "linear-gradient(135deg, #c41e3a 0%, #e04562 50%, #c41e3a 100%)",
    color: "#FFFFFF",
    accent: "#FFFFFF",
    pillBg: "rgba(255, 255, 255, 0.18)",
  },
};

export default function TopPromoBanner({ banner }: TopPromoBannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!banner.dismissible) return;
    try {
      const dismissed = window.localStorage.getItem(
        `admizz-banner-${banner.id}`
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync persisted dismissal on mount
      if (dismissed === "1") setVisible(false);
    } catch {
      /* no-op */
    }
  }, [banner.id, banner.dismissible]);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(`admizz-banner-${banner.id}`, "1");
    } catch {
      /* no-op */
    }
  }

  const styles = VARIANT_STYLES[banner.variant];
  const isLight = banner.variant !== "campaign";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="relative w-full overflow-hidden"
          style={{ background: styles.background, color: styles.color }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 tablet:py-3">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-center tablet:text-left">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em]"
                style={{
                  background: styles.pillBg,
                  color: styles.accent,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: styles.accent }}
                />
                {banner.eyebrow}
              </span>

              <span className="text-[13px] tablet:text-[14px] font-bold leading-tight">
                {banner.title}
              </span>

              {banner.subtitle && (
                <span
                  className="hidden tablet:inline text-[13px] opacity-85"
                  style={{ color: styles.color }}
                >
                  · {banner.subtitle}
                </span>
              )}

              {banner.endsAt && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-mono font-bold tabular-nums"
                  style={{
                    background: isLight ? "rgba(255,255,255,0.14)" : "rgba(0, 19, 83, 0.85)",
                    color: isLight ? styles.color : "#FFFFFF",
                  }}
                  aria-label="Ends in"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                    />
                  </svg>
                  Ends in <CountdownTimer target={banner.endsAt} />
                </span>
              )}

              {banner.cta && (
                <a
                  href={banner.cta.href}
                  className="group inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12.5px] font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    background: isLight ? "#FFFFFF" : "#FDED22",
                    color: "#001353",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                  }}
                >
                  {banner.cta.text}
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-7-7 7 7-7 7"
                    />
                  </svg>
                </a>
              )}

              {banner.dismissible && (
                <button
                  type="button"
                  onClick={dismiss}
                  className="ml-auto tablet:ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:bg-black/10"
                  style={{ color: styles.color }}
                  aria-label="Dismiss banner"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
