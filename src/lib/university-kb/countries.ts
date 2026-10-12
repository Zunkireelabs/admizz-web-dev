import type { CountryInfo, CountrySlug, CurrencyCode } from "./types";

export const countries: Record<CountrySlug, CountryInfo> = {
  uk: {
    slug: "uk",
    name: "United Kingdom",
    currency: "GBP",
    studyInPage: "/study-in-the-uk",
    summary: "One-year master's degrees, January and September intakes, and the Graduate Route work visa after study.",
    // TODO: confirm current Graduate Route length (UK policy changes announced for 2027).
    postStudyWork: "Graduate Route visa",
  },
  usa: { slug: "usa", name: "United States", currency: "USD", studyInPage: "/study-in-the-usa", summary: "" },
  canada: { slug: "canada", name: "Canada", currency: "CAD", studyInPage: "/study-in-canada", summary: "" },
  australia: { slug: "australia", name: "Australia", currency: "AUD", studyInPage: "/study-in-australia", summary: "" },
  "new-zealand": { slug: "new-zealand", name: "New Zealand", currency: "NZD", studyInPage: "/study-in-newzealand", summary: "" },
  germany: { slug: "germany", name: "Germany", currency: "EUR", studyInPage: "/study-in-germany", summary: "" },
  france: { slug: "france", name: "France", currency: "EUR", studyInPage: "/study-in-france", summary: "" },
  finland: { slug: "finland", name: "Finland", currency: "EUR", studyInPage: "/study-in-finland", summary: "" },
  india: { slug: "india", name: "India", currency: "INR", studyInPage: "/study-in-india", summary: "" },
};

const symbols: Record<CurrencyCode, string> = {
  GBP: "£",
  USD: "$",
  CAD: "C$",
  AUD: "A$",
  NZD: "NZ$",
  EUR: "€",
  INR: "₹",
};

export function formatMoney(amount: number, currency: CurrencyCode): string {
  return `${symbols[currency]}${amount.toLocaleString("en-GB")}`;
}

// APPROXIMATE rates for the compare page's "≈ NPR" hint only — never shown as
// an exact price. TODO: confirm and refresh periodically (last set 2026-10-06).
export const NPR_RATES: Record<CurrencyCode, number> = {
  GBP: 185,
  USD: 137,
  CAD: 100,
  AUD: 89,
  NZD: 82,
  EUR: 158,
  INR: 1.6,
};

export const NPR_RATES_DATE = "October 2026";

export function approxNpr(amount: number, currency: CurrencyCode): string {
  const npr = amount * NPR_RATES[currency];
  // Nepali-style grouping reads naturally to students, e.g. "NPR 21.8 lakh".
  if (npr >= 100000) return `≈ NPR ${(npr / 100000).toFixed(1)} lakh`;
  return `≈ NPR ${Math.round(npr).toLocaleString("en-IN")}`;
}
