"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  placeholder: string;
  /** Adds a search box to the list (use for long lists such as countries) */
  searchable?: boolean;
  searchPlaceholder?: string;
  invalid?: boolean;
  autoFocus?: boolean;
}

interface Position {
  left: number;
  width: number;
  top?: number;
  bottom?: number;
  maxHeight: number;
}

const GAP = 6;
const EDGE = 12;
const MAX_LIST = 300;

/**
 * Styled replacement for the native <select>. The list renders in a portal so the
 * modal's scroll area never clips it, and it flips upward when there is no room below.
 */
export default function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  searchable = false,
  searchPlaceholder = "Search",
  invalid = false,
  autoFocus = false,
}: SelectProps) {
  const listId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState<Position | null>(null);

  const selected = options.find((o) => o.value === value);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  const close = (refocus = true) => {
    setOpen(false);
    setQuery("");
    if (refocus) buttonRef.current?.focus();
  };

  const openList = () => {
    const idx = options.findIndex((o) => o.value === value);
    setActive(Math.max(idx, 0));
    setOpen(true);
  };

  const choose = (opt: SelectOption) => {
    onChange(opt.value);
    close();
  };

  // Keep the list anchored to the button, flipping upward when space below is tight
  useEffect(() => {
    if (!open) return;
    const place = () => {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const below = window.innerHeight - rect.bottom - EDGE - GAP;
      const above = rect.top - EDGE - GAP;
      const openUp = below < 220 && above > below;
      setPos({
        left: rect.left,
        width: rect.width,
        maxHeight: Math.min(MAX_LIST, openUp ? above : below),
        ...(openUp
          ? { bottom: window.innerHeight - rect.top + GAP }
          : { top: rect.bottom + GAP }),
      });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target) || popoverRef.current?.contains(target)) return;
      close(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && searchable) searchRef.current?.focus();
  }, [open, searchable]);

  // Keep the highlighted option in view
  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, visible.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        break;
      case "Home":
        if (!searchable) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (!searchable) {
          e.preventDefault();
          setActive(visible.length - 1);
        }
        break;
      case "Enter":
        e.preventDefault();
        if (visible[active]) choose(visible[active]);
        break;
      case " ":
        if (!searchable) {
          e.preventDefault();
          if (visible[active]) choose(visible[active]);
        }
        break;
      case "Escape":
        // Close only the list, not the popup behind it
        e.preventDefault();
        e.stopPropagation();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        // Type-ahead for lists without a search box
        if (!searchable && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          const ch = e.key.toLowerCase();
          const from = (active + 1) % visible.length;
          const order = [...visible.slice(from), ...visible.slice(0, from)];
          const hit = order.find((o) => o.label.toLowerCase().startsWith(ch));
          if (hit) setActive(visible.indexOf(hit));
        }
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        autoFocus={autoFocus}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKeyDown}
        className="flex w-full h-12 items-center justify-between gap-3 rounded-xl border bg-white px-4 text-left text-[15px] outline-none transition-colors focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/15"
        style={{ borderColor: invalid ? "#c41e3a" : open ? "#31429C" : "#D7DAE8" }}
      >
        <span className={`truncate ${selected ? "text-navy" : "text-gray-medium"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 text-gray-dark transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open &&
        pos &&
        createPortal(
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: pos.bottom !== undefined ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[80] flex flex-col overflow-hidden rounded-xl border bg-white"
            style={{
              left: pos.left,
              width: pos.width,
              top: pos.top,
              bottom: pos.bottom,
              maxHeight: pos.maxHeight,
              borderColor: "#E0E6F2",
              boxShadow: "0 16px 40px rgba(15,23,42,0.18)",
            }}
          >
            {searchable && (
              <div className="flex-shrink-0 border-b p-2" style={{ borderColor: "#F0F0F0" }}>
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  aria-controls={listId}
                  autoComplete="off"
                  className="w-full h-10 rounded-lg bg-[#F4F6FF] px-3 text-[15px] text-navy placeholder:text-gray-medium outline-none focus:ring-2 focus:ring-blue-royal/20"
                />
              </div>
            )}
            <ul id={listId} role="listbox" className="flex-1 overflow-y-auto overscroll-contain py-1.5">
              {visible.length === 0 && (
                <li className="px-4 py-3 text-[14px] text-gray-dark">No matches found</li>
              )}
              {visible.map((opt, i) => {
                const isSelected = opt.value === value;
                return (
                  <li
                    key={opt.value}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(opt)}
                    className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-[15px] ${
                      i === active ? "bg-[#F4F6FF]" : ""
                    } ${isSelected ? "font-semibold text-blue-royal" : "text-navy"}`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>,
          document.body
        )}
    </>
  );
}
