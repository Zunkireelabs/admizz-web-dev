// UTM campaign attribution helpers — mirrors the affiliate ref-code pattern in
// src/lib/affiliate/refCookie.ts. sessionStorage only (no cookie): a visitor who
// returns organically in a new browser session should not carry stale campaign
// attribution from a link they clicked weeks ago.
//
// Attribution priority at form submit time:
//   1. Live URL utm_* params — the user may be on the tracking-link landing page
//      right now, which is the freshest possible signal.
//   2. sessionStorage — the user clicked a tracking link earlier this browser
//      session and has since navigated to another page.

const STORAGE_KEY = "admizz_utm";

export interface UtmAttribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

const EMPTY: UtmAttribution = { utm_source: null, utm_medium: null, utm_campaign: null };

function readFromUrl(): UtmAttribution | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source");
  const utm_medium = params.get("utm_medium");
  const utm_campaign = params.get("utm_campaign");
  if (!utm_source && !utm_medium && !utm_campaign) return null;
  return { utm_source, utm_medium, utm_campaign };
}

/**
 * Call once per page load (from a root-layout capture component). No-op when
 * the URL carries no UTM params — keeps whatever was already captured earlier
 * in this browser session so attribution survives navigation to a later page.
 */
export function captureUtmAttribution(): void {
  const fromUrl = readFromUrl();
  if (!fromUrl) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
  } catch {
    /* ignore — private browsing may block sessionStorage */
  }
}

/**
 * Call at form-submit time. Prefers the live URL, falls back to sessionStorage,
 * defaults every field to null. Never throws.
 */
export function getUtmAttribution(): UtmAttribution {
  const fromUrl = readFromUrl();
  if (fromUrl) return fromUrl;
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as UtmAttribution;
  } catch {
    /* ignore — malformed storage or private browsing */
  }
  return EMPTY;
}
