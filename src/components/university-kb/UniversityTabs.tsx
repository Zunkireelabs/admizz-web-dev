"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { GraduationCap, ListChecks, FileText, CalendarDays, MapPin, Info, ClipboardCheck, ChevronLeft, ChevronRight } from "lucide-react";

export type TabId = "courses" | "entry" | "apply" | "documents" | "intakes" | "location" | "more-info";

const TABS: { id: TabId; label: string; icon: typeof GraduationCap }[] = [
  { id: "courses", label: "Courses", icon: GraduationCap },
  { id: "entry", label: "Entry Requirements", icon: ClipboardCheck },
  { id: "apply", label: "How to Apply", icon: ListChecks },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "intakes", label: "Intakes", icon: CalendarDays },
  { id: "location", label: "Location", icon: MapPin },
  { id: "more-info", label: "More Info", icon: Info },
];

// All panels are rendered into the static HTML (so search engines see every
// section); inactive ones are just hidden. The active tab is mirrored in the
// URL hash so a link like …/york-st-john-university#documents opens that tab.
export default function UniversityTabs({
  panels,
  counts = {},
}: {
  panels: Record<TabId, ReactNode>;
  counts?: Partial<Record<TabId, number>>;
}) {
  const [active, setActive] = useState<TabId>("courses");
  const [edges, setEdges] = useState({ left: false, right: false });
  const listRef = useRef<HTMLDivElement>(null);

  // Shows the arrows / fades only while there are more tabs to scroll to.
  const updateEdges = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const frame = requestAnimationFrame(updateEdges);
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    el.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      el.removeEventListener("scroll", updateEdges);
    };
  }, [updateEdges]);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1) as TabId;
      if (TABS.some((t) => t.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (id: TabId) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    // Bring a half-hidden tab fully into view (block: "nearest" keeps the page itself still).
    document.getElementById(`tab-${id}`)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const nudge = (dir: -1 | 1) => {
    const el = listRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-light bg-white text-navy shadow-md transition-colors hover:border-blue-royal hover:text-blue-royal sm:flex";

  return (
    <div>
      <div className="sticky top-[70px] z-20 border-b border-border-light bg-white shadow-[0_6px_10px_-8px_rgba(0,19,83,0.18)]">
        <div className="relative">
          <div
            ref={listRef}
            role="tablist"
            aria-label="University information"
            className="flex gap-2 overflow-x-auto px-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${id}`}
                  onClick={() => select(id)}
                  className={`flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-royal focus-visible:ring-offset-2 ${
                    isActive
                      ? "border-blue-royal bg-blue-royal text-white shadow-sm"
                      : "border-border-light bg-white text-navy hover:border-blue-royal/60 hover:bg-blue-royal/[0.06] hover:text-blue-royal"
                  }`}
                >
                  <Icon className="h-[17px] w-[17px]" aria-hidden />
                  {label}
                  {counts[id] !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[12px] font-bold leading-none ${
                        isActive ? "bg-white/20 text-white" : "bg-blue-royal/10 text-blue-royal"
                      }`}
                    >
                      {counts[id]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Edge fades + arrows: only while there are more tabs in that direction. */}
          {edges.left && (
            <>
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent" />
              <button type="button" onClick={() => nudge(-1)} aria-label="Scroll tabs left" className={`${arrow} left-1`}>
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
            </>
          )}
          {edges.right && (
            <>
              <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white via-white/80 to-transparent" />
              <button type="button" onClick={() => nudge(1)} aria-label="Scroll tabs right" className={`${arrow} right-1`}>
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </>
          )}
        </div>
      </div>

      {TABS.map(({ id }) => (
        <div
          key={id}
          role="tabpanel"
          id={`panel-${id}`}
          aria-labelledby={`tab-${id}`}
          hidden={active !== id}
          className="pt-6"
        >
          {panels[id]}
        </div>
      ))}
    </div>
  );
}
