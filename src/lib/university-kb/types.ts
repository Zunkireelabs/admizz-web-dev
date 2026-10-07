// University Knowledge Base — data template.
// Every university file in ./universities must satisfy `UniversityProfile`.
// Fees are stored as numbers in the country's currency so they can be
// filtered, sorted and (later) compared / converted to NPR.

export type CountrySlug =
  | "uk"
  | "usa"
  | "canada"
  | "australia"
  | "new-zealand"
  | "germany"
  | "france"
  | "finland"
  | "india";

export type CurrencyCode = "GBP" | "USD" | "CAD" | "AUD" | "NZD" | "EUR" | "INR";

export type CourseLevel = "foundation" | "undergraduate" | "postgraduate" | "research";

export type IntakeMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export interface CountryInfo {
  slug: CountrySlug;
  name: string;
  currency: CurrencyCode;
  /** Existing country marketing page, e.g. /study-in-the-uk */
  studyInPage?: string;
  summary: string;
  /** Post-study work route, shown on the compare page */
  postStudyWork?: string;
}

export interface Intake {
  month: IntakeMonth;
  year: number;
  /** ISO date (YYYY-MM-DD). Omit if the university hasn't published one. */
  applicationDeadline?: string;
  note?: string;
}

export interface EnglishRequirement {
  ielts?: number;
  pte?: number;
  toefl?: number;
  duolingo?: number;
  /** e.g. "MOI accepted for some programmes" */
  note?: string;
}

export interface FeeItem {
  label: string;
  /** Annual or total tuition in the country's currency */
  amount: number;
  per: "year" | "total";
  /** True when the price varies (e.g. by campus) and this is the lowest */
  from?: boolean;
  /** Short qualifier shown under the price, e.g. "Birmingham & Manchester campuses" */
  note?: string;
}

export interface Course {
  slug: string;
  name: string;
  level: CourseLevel;
  /** Subject area used for course search/filter, e.g. "Business", "Computing" */
  subject: string;
  durationMonths: number;
  fees: FeeItem[];
  intakes: IntakeMonth[];
  english?: EnglishRequirement;
  academicRequirement?: string;
  withPlacement?: boolean;
  /** True when the placement/extra year is an option, not part of the standard course */
  placementOptional?: boolean;
}

export interface Scholarship {
  name: string;
  /** Human-readable value, e.g. "5% off tuition" or "Up to £2,000" */
  value: string;
  eligibility?: string;
}

export interface RequiredDocument {
  name: string;
  optional?: boolean;
  note?: string;
}

export interface ApplicationStage {
  title: string;
  /** Document the student receives / provides at this stage */
  document?: string;
  description?: string;
}

export interface DepositInfo {
  label: string;
  amount: number;
  note?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/** Entry requirements grouped by study level (e.g. per-university Nepal criteria). */
export interface EntryRequirementGroup {
  level: string;
  gapAccepted?: boolean;
  gapYearsAllowed?: string;
  criteria: string[];
}

/** English test scores grouped by study level. */
export interface LanguageTestGroup {
  level: string;
  tests: { test: string; score: string }[];
  /** e.g. MOI waiver conditions */
  waiver?: string[];
}

export interface UniversityProfile {
  slug: string;
  name: string;
  country: CountrySlug;
  logo: string;
  established?: number;
  cities: string[];
  website?: string;
  overview: string;
  highlights?: string[];
  ranking?: { source: string; rank: string }[];
  courses: Course[];
  scholarships: Scholarship[];
  english: EnglishRequirement;
  /** Detailed, per-level entry requirements (optional; richer than `english`). */
  entryRequirements?: EntryRequirementGroup[];
  languageTests?: LanguageTestGroup[];
  requiredDocuments: RequiredDocument[];
  applicationStages: ApplicationStage[];
  intakes: Intake[];
  deposits?: DepositInfo[];
  livingCostPerYear?: { amount: number; note?: string };
  accommodation?: string;
  faqs?: FAQItem[];
  /** ISO date the data was last checked by the Admizz team */
  lastVerified: string;
}
