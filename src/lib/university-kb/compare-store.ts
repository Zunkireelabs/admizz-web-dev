"use client";

import { useSyncExternalStore } from "react";

// Compare selection shared by cards, university pages, the tray and the compare
// page. Ids are "<country>/<slug>". Kept in memory and mirrored to
// localStorage (best effort — storage can be blocked) so it survives navigation.

export const COMPARE_MAX = 3;
const KEY = "admizz-compare";
const EVENT = "admizz-compare-change";
const EMPTY: string[] = [];

let current: string[] | null = null;

function load(): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string").slice(0, COMPARE_MAX) : [];
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (current === null) current = load();
  return current;
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      current = load();
      onChange();
    }
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setCompareList(ids: string[]) {
  current = Array.from(new Set(ids)).slice(0, COMPARE_MAX);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    // Storage unavailable — the in-memory list still works for this visit.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useCompareList() {
  const list = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const has = (id: string) => list.includes(id);
  const isFull = list.length >= COMPARE_MAX;
  const toggle = (id: string) => {
    if (has(id)) setCompareList(list.filter((x) => x !== id));
    else if (!isFull) setCompareList([...list, id]);
  };
  const remove = (id: string) => setCompareList(list.filter((x) => x !== id));
  const clear = () => setCompareList([]);
  return { list, has, isFull, toggle, remove, clear };
}
