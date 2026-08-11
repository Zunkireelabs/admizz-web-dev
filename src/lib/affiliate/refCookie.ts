// Affiliate referral attribution helpers.
// The cookie is set by <AffiliateRefCapture /> (in app/layout.tsx) whenever
// a visitor lands on any page with ?ref=CODE.
//
// Attribution priority at form submit time:
//   1. ?ref= URL param    — user is literally on the page with the ref right now
//   2. sessionStorage     — user clicked an affiliate link this browser session
//
// sessionStorage is wiped when the browser closes. Returning visitors who come
// back organically in a new session are NOT attributed — the cookie is written
// for the short-link redirect flow but intentionally never read at form submit.

const COOKIE_NAME   = "admizz_ref";
const SESSION_KEY   = "admizz_ref";
const COOKIE_DAYS   = 30;

export function writeAffiliateRef(code: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, code);
  } catch { /* ignore — private browsing may block sessionStorage */ }
  const maxAge = COOKIE_DAYS * 86400;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(code)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

export function readAffiliateRefCookie(): string | null {
  if (typeof window === "undefined") return null;

  // Session-only — no cookie fallback. If the browser was closed since the
  // affiliate click, the user is returning organically and should not be attributed.
  try {
    return sessionStorage.getItem(SESSION_KEY) || null;
  } catch { /* ignore */ }

  return null;
}
