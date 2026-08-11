// Cached user identity used to skip the form on subsequent predictions.
// First successful prediction saves this; later predictions silently
// submit a new lead using these details.

const KEY = "wc26-user-profile";

export interface SavedProfile {
  name: string;
  email: string;
  phone: string;            // full international (e.g. "+977 9812345678")
  dialCode: string;         // e.g. "+977"
  dialKey: string;          // e.g. "NP"
  city: string;
  studyAbroad: "yes" | "no";
  agreedToTerms: boolean;
  savedAt: string;          // ISO timestamp of first save
}

export function loadProfile(): SavedProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedProfile;
    if (!parsed.name || !parsed.phone) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveProfile(p: SavedProfile): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // ignore
  }
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
