import type { CountrySlug, CourseLevel, CurrencyCode, Intake, IntakeMonth, UniversityProfile } from "./types";
import { countries } from "./countries";
import { importedProfiles } from "./universities/imported";

// All profiles are imported from Route2Uni via scripts/import-route2uni.mjs.
export const universityProfiles: UniversityProfile[] = [...importedProfiles];

export const EXPLORE_BASE_PATH = "/explore-universities";

export const LEVEL_LABEL: Record<CourseLevel, string> = {
  foundation: "Foundation",
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  research: "Research",
};

const MONTHS: IntakeMonth[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function getUniversitiesByCountry(country: CountrySlug): UniversityProfile[] {
  return universityProfiles.filter((u) => u.country === country);
}

export function getUniversity(country: string, slug: string): UniversityProfile | undefined {
  return universityProfiles.find((u) => u.country === country && u.slug === slug);
}

/** Countries that have at least one profile — only these get a page. */
export function getActiveCountries() {
  const active = new Set(universityProfiles.map((u) => u.country));
  return Object.values(countries).filter((c) => active.has(c.slug));
}

/** Id used by the compare feature: "<country>/<slug>". */
export function compareId(country: string, slug: string) {
  return `${country}/${slug}`;
}

export function universityPath(u: UniversityProfile): string {
  return `${EXPLORE_BASE_PATH}/${u.country}/${u.slug}`;
}

/** Lowest tuition across a university's courses, for cards ("from £X"). */
export function lowestFee(u: UniversityProfile): number | undefined {
  const amounts = u.courses.flatMap((c) => c.fees.map((f) => f.amount));
  if (amounts.length) return Math.min(...amounts);
  const fromSummary = (u.feeSummary ?? []).map((f) => f.min);
  return fromSummary.length ? Math.min(...fromSummary) : undefined;
}

/**
 * Intakes that haven't started yet, soonest first. Evaluated at build time —
 * the site is a static export, so a rebuild refreshes this.
 */
export function upcomingIntakes(u: UniversityProfile, now = new Date()): Intake[] {
  const current = now.getFullYear() * 12 + now.getMonth();
  return u.intakes
    .filter((i) => i.year * 12 + MONTHS.indexOf(i.month) >= current)
    .sort((a, b) => a.year * 12 + MONTHS.indexOf(a.month) - (b.year * 12 + MONTHS.indexOf(b.month)));
}

export function nextIntake(u: UniversityProfile): string | undefined {
  const first = upcomingIntakes(u)[0];
  return first ? `${first.month} ${first.year}` : undefined;
}

/**
 * The scholarship to feature on cards and headers: the one with the largest £ figure
 * (so a Pre-Master's discount doesn't outrank a degree scholarship), else the first listed.
 */
export function topScholarship(u: UniversityProfile) {
  const amount = (value: string) => {
    const nums = Array.from(value.matchAll(/[£$€]\s?([\d,]+)/g)).map((m) => parseInt(m[1].replace(/,/g, ""), 10));
    return nums.length ? Math.max(...nums) : 0;
  };
  return u.scholarships.reduce<UniversityProfile["scholarships"][number] | undefined>(
    (best, s) => (!best || amount(s.value) > amount(best.value) ? s : best),
    undefined,
  );
}

/** Flat, serialisable summary used by the explorer list (client component). */
export interface UniversityCard {
  /** compareId(country, slug) */
  id: string;
  slug: string;
  name: string;
  href: string;
  logo: string;
  country: CountrySlug;
  countryName: string;
  cities: string[];
  currency: CurrencyCode;
  feeFrom?: number;
  scholarship?: string;
  nextIntake?: string;
  intakeMonths: IntakeMonth[];
  levels: CourseLevel[];
  courseNames: string[];
  /** Course subject areas (excluding the catch-all "General"), for popular-search chips. */
  subjects: string[];
}

export function toUniversityCard(u: UniversityProfile): UniversityCard {
  return {
    id: compareId(u.country, u.slug),
    slug: u.slug,
    name: u.name,
    href: universityPath(u),
    logo: u.logo,
    country: u.country,
    countryName: countries[u.country].name,
    cities: u.cities,
    currency: countries[u.country].currency,
    feeFrom: lowestFee(u),
    scholarship: topScholarship(u)?.value,
    nextIntake: nextIntake(u),
    intakeMonths: Array.from(new Set(upcomingIntakes(u).map((i) => i.month))),
    levels: Array.from(new Set(u.courses.map((c) => c.level))),
    courseNames: u.courses.map((c) => `${c.name} ${c.subject}`),
    subjects: Array.from(new Set(u.courses.map((c) => c.subject).filter((sub) => sub !== "General"))),
  };
}

export { countries };
export * from "./types";
