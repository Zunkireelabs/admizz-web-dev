"use client";

import { useEffect, useState, type ReactNode } from "react";
import { GraduationCap, ListChecks, FileText, CalendarDays, MapPin, Info, ClipboardCheck } from "lucide-react";

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
  };

  return (
    <div>
      <div className="sticky top-[70px] z-20 bg-white/95 backdrop-blur border-b border-border-light">
        <div
          role="tablist"
          aria-label="University information"
          className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                className={`relative shrink-0 flex items-center gap-1.5 px-3.5 py-4 text-[15px] font-medium whitespace-nowrap transition-colors ${
                  isActive ? "text-blue-royal" : "text-gray-dark hover:text-navy hover:bg-off-white"
                }`}
              >
                <Icon className="w-[18px] h-[18px]" aria-hidden />
                {label}
                {counts[id] !== undefined && (
                  <span
                    className={`text-[13px] font-semibold ${isActive ? "text-blue-royal" : "text-gray-medium"}`}
                  >
                    ({counts[id]})
                  </span>
                )}
                <span
                  className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t-full transition-colors ${
                    isActive ? "bg-blue-royal" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
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
