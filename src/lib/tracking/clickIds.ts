// Ad click IDs (CRET-13).
//
// When someone clicks an ad, Google adds gclid/gbraid/wbraid and Meta adds fbclid to the
// landing URL. We keep the latest one for 90 days (the usual ad attribution window) and
// send it to the CRM with every lead, together with Meta's own _fbp/_fbc cookies.
// That lets Admizz later report qualified/enrolled leads back to Google (offline
// conversion import) and Meta (Conversions API), so the ads optimise for real students.
//
// Unlike UTMs (session-only on purpose, see utmStorage.ts), click IDs must outlive the
// session: a student often clicks an ad, leaves, and comes back days later to enquire.

const COOKIE_NAME = "admizz_click";
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60;
const CLICK_PARAMS = ["gclid", "gbraid", "wbraid", "fbclid"] as const;

type ClickParam = (typeof CLICK_PARAMS)[number];

interface StoredClick {
  param: ClickParam;
  value: string;
  ts: number; // ms since epoch, when the ad click landed
}

export interface AdAttribution {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  /** Meta click cookie (fb.1.<ts>.<fbclid>), set by the pixel. Needed by the Conversions API. */
  fbc: string | null;
  /** Meta browser cookie, set by the pixel. Needed by the Conversions API. */
  fbp: string | null;
  /** ISO time of the stored ad click, so the CRM knows if it is inside the attribution window. */
  ad_click_at: string | null;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function readStored(): StoredClick | null {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredClick;
    return CLICK_PARAMS.includes(parsed.param) && parsed.value ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Call once per page load (root layout). Last ad click wins: a newer click from any
 * platform replaces the stored one. No-op when the URL has no click ID.
 */
export function captureClickIds(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const param = CLICK_PARAMS.find((p) => params.get(p));
  if (!param) return;
  const value = params.get(param)!.slice(0, 500);
  const stored: StoredClick = { param, value, ts: Date.now() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(stored))}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

/** Call at lead time. Never throws; every field defaults to null. */
export function getAdAttribution(): AdAttribution {
  const stored = readStored();
  const pick = (p: ClickParam) => (stored?.param === p ? stored.value : null);
  return {
    gclid: pick("gclid"),
    gbraid: pick("gbraid"),
    wbraid: pick("wbraid"),
    fbclid: pick("fbclid"),
    fbc: readCookie("_fbc"),
    fbp: readCookie("_fbp"),
    ad_click_at: stored ? new Date(stored.ts).toISOString() : null,
  };
}
