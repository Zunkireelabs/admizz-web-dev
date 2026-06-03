// First-touch affiliate referral cookie shared by RegisterForm and ApplicationForm.
// The cookie is set by <AffiliateRefCapture /> (mounted in app/layout.tsx) whenever
// a visitor lands on any page with ?ref=CODE. Cookie name and lifetime live there.

const COOKIE_NAME = "admizz_ref";

export function readAffiliateRefCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find(c => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    return decodeURIComponent(match.split("=")[1] ?? "") || null;
  } catch {
    return null;
  }
}
