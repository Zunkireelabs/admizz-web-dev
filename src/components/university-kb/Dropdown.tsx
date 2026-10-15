"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

export interface DropdownOption<T extends string | number> {
  value: T | "";
  label: string;
}

interface Props<T extends string | number> {
  value: T | "";
  onChange: (value: T | "") => void;
  options: DropdownOption<T>[];
  /** Screen-reader name, e.g. "Study level". */
  label: string;
  disabled?: boolean;
  /** "field" fills its container (filters); "compact" sizes to its content (sort). */
  variant?: "field" | "compact";
}

const PANEL_MAX = 288;

// Site-styled replacement for <select>, so the menu is not the browser/OS one.
// The panel is portalled to <body> so scrolling or transformed parents (the filter
// drawer) can never clip it.
export default function Dropdown<T extends string | number>({ value, onChange, options, label, disabled, variant = "field" }: Props<T>) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState<{ top?: number; bottom?: number; left: number; width: number; maxHeight: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const id = useId();

  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const selected = options.find((o) => o.value === value) ?? options[0];
  const isSet = value !== "" && variant !== "compact";

  const place = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const below = window.innerHeight - r.bottom - 12;
    const above = r.top - 12;
    const flip = below < 180 && above > below;
    const minWidth = variant === "compact" ? 200 : r.width;
    const width = Math.max(r.width, minWidth);
    const left = Math.min(Math.max(8, variant === "compact" ? r.right - width : r.left), window.innerWidth - width - 8);
    setPos(
      flip
        ? { bottom: window.innerHeight - r.top + 6, left, width, maxHeight: Math.min(PANEL_MAX, above) }
        : { top: r.bottom + 6, left, width, maxHeight: Math.min(PANEL_MAX, below) },
    );
  }, [variant]);

  const openMenu = () => {
    if (disabled) return;
    place();
    setActive(selectedIndex);
    setOpen(true);
  };
  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  }, []);
  const choose = (i: number) => {
    onChange(options[i].value);
    close();
  };

  // Outside click, resize and scroll behaviour while open.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!buttonRef.current?.contains(t) && !panelRef.current?.contains(t)) close(false);
    };
    const onMove = (e: Event) => {
      if (panelRef.current?.contains(e.target as Node)) return;
      close(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove, true);
    };
  }, [open, close]);

  // Keep the highlighted option in view and focus the list for keyboard use.
  useLayoutEffect(() => {
    if (!open) return;
    panelRef.current?.focus({ preventScroll: true });
    panelRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, pos]);

  const onButtonKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openMenu();
    }
  };
  const onListKey = (e: React.KeyboardEvent) => {
    const last = options.length - 1;
    const stop = () => e.preventDefault();
    switch (e.key) {
      case "ArrowDown": stop(); setActive((a) => Math.min(last, a + 1)); break;
      case "ArrowUp": stop(); setActive((a) => Math.max(0, a - 1)); break;
      case "Home": stop(); setActive(0); break;
      case "End": stop(); setActive(last); break;
      case "Enter":
      case " ": stop(); choose(active); break;
      case "Escape": stop(); close(); break;
      case "Tab": close(false); break;
    }
  };

  const base =
    "inline-flex items-center justify-between gap-2 rounded-[10px] border bg-white text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-royal/25 disabled:cursor-not-allowed disabled:bg-off-white disabled:text-gray-medium";
  const size = variant === "compact" ? "px-3 py-2 text-[14px] font-semibold" : "w-full px-3.5 py-3 text-[15px]";
  const tone = open
    ? "border-blue-royal ring-2 ring-blue-royal/15"
    : isSet
      ? "border-blue-royal/50 text-navy hover:border-blue-royal"
      : "border-border-light text-navy hover:border-blue-royal/60";

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        aria-label={`${label}: ${selected?.label ?? ""}`}
        onClick={() => (open ? close(false) : openMenu())}
        onKeyDown={onButtonKey}
        className={`${base} ${size} ${tone} cursor-pointer`}
      >
        <span className={`truncate ${isSet || variant === "compact" ? "" : "text-navy"} ${isSet ? "font-semibold" : ""}`}>{selected?.label}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-gray-dark transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open &&
        pos &&
        createPortal(
          <ul
            ref={panelRef}
            id={id}
            role="listbox"
            tabIndex={-1}
            aria-label={label}
            aria-activedescendant={`${id}-${active}`}
            onKeyDown={onListKey}
            style={{ position: "fixed", top: pos.top, bottom: pos.bottom, left: pos.left, width: pos.width, maxHeight: pos.maxHeight }}
            className="z-[90] overflow-y-auto rounded-xl border border-border-light bg-white p-1.5 shadow-[0_16px_40px_rgba(0,19,83,0.18)] focus:outline-none"
          >
            {options.map((o, i) => {
              const isSelected = o.value === value;
              return (
                <li
                  key={String(o.value) || "__all"}
                  id={`${id}-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(i)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[14px] ${
                    i === active ? "bg-blue-royal/[0.08] text-blue-royal" : "text-navy"
                  } ${isSelected ? "font-semibold" : ""}`}
                >
                  <span className="truncate">{o.label}</span>
                  {isSelected && <Check className="h-4 w-4 shrink-0 text-blue-royal" aria-hidden />}
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </>
  );
}
