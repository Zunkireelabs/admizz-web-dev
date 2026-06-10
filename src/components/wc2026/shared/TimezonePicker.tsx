"use client";

import { useEffect, useRef, useState } from "react";
import { useTimezone } from "@/lib/wc2026/TimezoneProvider";
import { TZ_PRESETS } from "@/lib/wc2026/timezones";

export default function TimezonePicker() {
  const { tz, abbrev, isAuto, setTimezone } = useTimezone();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const matchedPreset = TZ_PRESETS.find((p) => p.tz === tz);

  return (
    <div ref={rootRef} className={`wc-tz ${open ? "wc-tz--open" : ""}`}>
      <button
        type="button"
        className="wc-tz-button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={`Times shown in ${tz}`}
      >
        <span className="wc-tz-globe" aria-hidden="true">🌐</span>
        <span className="wc-tz-label">
          {matchedPreset ? matchedPreset.label : tz.split("/").pop()?.replace(/_/g, " ")}
        </span>
        <span className="wc-tz-abbrev">{abbrev}</span>
        <svg className="wc-tz-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="wc-tz-pop" role="listbox">
          <button
            type="button"
            className={`wc-tz-item ${isAuto ? "wc-tz-item--active" : ""}`}
            onClick={() => { setTimezone(null); setOpen(false); }}
          >
            <span className="wc-tz-item-label">Auto-detect</span>
            <span className="wc-tz-item-meta">Browser default</span>
          </button>
          <div className="wc-tz-divider" />
          {TZ_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`wc-tz-item ${!isAuto && tz === p.tz ? "wc-tz-item--active" : ""}`}
              onClick={() => { setTimezone(p.tz); setOpen(false); }}
            >
              <span className="wc-tz-item-label">{p.label}</span>
              <span className="wc-tz-item-meta">{p.tz}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
