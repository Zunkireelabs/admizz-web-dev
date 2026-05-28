const STORAGE_KEY = "admizz_ref";
const EXPIRY_DAYS = 30;

interface StoredRef {
  code: string;
  expiresAt: number;
}

export function captureReferralCode(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("ref");
  if (!code) return;
  const expiresAt = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const stored: StoredRef = { code: code.toUpperCase(), expiresAt };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // localStorage unavailable
  }
}

export function getReferralCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored: StoredRef = JSON.parse(raw);
    if (Date.now() > stored.expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return stored.code;
  } catch {
    return null;
  }
}

export function clearReferralCode(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
