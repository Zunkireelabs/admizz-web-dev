import type { UniversityProfile } from "../types";
import { UK_STANDARD_DOCUMENTS, UK_STANDARD_STAGES } from "../defaults/uk";

// DRAFT PROFILES — only what was readable on the partner-portal reference
// (Oct 2026): campus city, scholarship headline and intakes. Courses and fees
// were truncated there, so they are left empty until the team supplies them.
// TODO: complete courses, fees, overview and scholarship conditions.

export const universityOfWorcester: UniversityProfile = {
  slug: "university-of-worcester",
  name: "University of Worcester",
  country: "uk",
  logo: "/images/universities/uk/University-of-Worcester.webp",
  cities: ["Worcester"],
  overview: "The University of Worcester is based in the cathedral city of Worcester in the West Midlands of England.",
  courses: [],
  // TODO: reference showed "55% - £2000"; confirm exact scholarship terms.
  scholarships: [{ name: "International scholarship", value: "Up to £2,000" }],
  english: {},
  requiredDocuments: UK_STANDARD_DOCUMENTS,
  applicationStages: UK_STANDARD_STAGES,
  intakes: [
    { month: "January", year: 2027 },
    { month: "February", year: 2027 },
  ],
  lastVerified: "2026-10-06",
};

export const universityOfEastLondon: UniversityProfile = {
  slug: "university-of-east-london",
  name: "University of East London",
  country: "uk",
  logo: "/images/universities/uk/University-of-East-London.webp",
  established: 1898,
  cities: ["London"],
  overview: "The University of East London has been educating students since 1898 and is based in London.",
  courses: [],
  scholarships: [{ name: "International scholarship", value: "£2,000 per year" }],
  english: {},
  requiredDocuments: UK_STANDARD_DOCUMENTS,
  applicationStages: UK_STANDARD_STAGES,
  intakes: [{ month: "January", year: 2027 }],
  lastVerified: "2026-10-06",
};

export const universityOfWestLondon: UniversityProfile = {
  slug: "university-of-west-london",
  name: "University of West London",
  country: "uk",
  logo: "/images/universities/uk/University-of-West-London.webp",
  cities: ["London"],
  overview: "The University of West London, known as \"The Career University\", is based in London.",
  courses: [],
  scholarships: [{ name: "International scholarship", value: "Up to £2,000" }],
  english: {},
  requiredDocuments: UK_STANDARD_DOCUMENTS,
  applicationStages: UK_STANDARD_STAGES,
  intakes: [
    { month: "September", year: 2026 },
    { month: "January", year: 2027 },
  ],
  lastVerified: "2026-10-06",
};
