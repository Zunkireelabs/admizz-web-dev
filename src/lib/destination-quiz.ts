// Destination quiz data — ported 1:1 from public/client-preview.html lines 568–702.
// Edit the matrix or country data here; the quiz UI consumes this file directly.

export type DestinationKey =
  | "uk"
  | "usa"
  | "canada"
  | "australia"
  | "germany"
  | "nz";

export interface DestinationCard {
  icon: string;
  label: string;
  value: string;
  cls: "" | "accent" | "gold";
}

export interface Destination {
  emoji: string;
  country: string;
  flag: string;
  tagline: string;
  whyFits: string; // 1-sentence match rationale
  match: number;
  image: string;
  countryPageHref: string;
  cards: DestinationCard[];
}

export const destinations: Record<DestinationKey, Destination> = {
  uk: {
    emoji: "🇬🇧",
    country: "United Kingdom",
    flag: "🇬🇧 UK — Excellence & Prestige",
    tagline:
      "Where centuries of academic tradition meet your global career ambitions.",
    whyFits:
      "Academic prestige plus multicultural cities, a 1-year master's, and a 95% Admizz visa approval rate — the most-picked destination for Admizz students.",
    match: 94,
    image: "/images/destinations/uk1.webp",
    countryPageHref: "/study-in-the-uk",
    cards: [
      { icon: "🏛️", label: "Top Universities", value: "Oxford, UCL, Manchester, Roehampton", cls: "accent" },
      { icon: "🎓", label: "Avg. Tuition", value: "£10,000–£20,000/year", cls: "" },
      { icon: "🏆", label: "Scholarships", value: "Chevening & University Merit Awards", cls: "gold" },
      { icon: "✈️", label: "Student Visa", value: "Tier 4 — 95% Approval Rate", cls: "" },
    ],
  },
  usa: {
    emoji: "🇺🇸",
    country: "United States",
    flag: "🇺🇸 USA — Innovation & Opportunity",
    tagline:
      "The land of elite campuses and a degree that opens every door worldwide.",
    whyFits:
      "Best-in-class for research, tech, and ambitious careers — pairs deep scholarship pockets with the world's strongest alumni networks.",
    match: 91,
    image: "/images/destinations/usa1.webp",
    countryPageHref: "/study-in-the-usa",
    cards: [
      { icon: "🏛️", label: "Top Universities", value: "MIT, Harvard, Stanford, NYU", cls: "accent" },
      { icon: "🎓", label: "Avg. Tuition", value: "$20,000–$50,000/year", cls: "" },
      { icon: "🏆", label: "Scholarships", value: "Fulbright & University Grants", cls: "gold" },
      { icon: "✈️", label: "Student Visa", value: "F-1 Visa — Expert Support", cls: "" },
    ],
  },
  canada: {
    emoji: "🇨🇦",
    country: "Canada",
    flag: "🇨🇦 Canada — Safe & PR-Friendly",
    tagline:
      "World-class education with a clear pathway to permanent residency.",
    whyFits:
      "Quality universities, a safe and welcoming culture, and one of the world's clearest post-study work + PR pathways — popular for long-term planners.",
    match: 92,
    image: "/images/destinations/canada1.webp",
    countryPageHref: "/study-in-canada",
    cards: [
      { icon: "🏛️", label: "Top Universities", value: "UofT, UBC, McGill, Waterloo", cls: "accent" },
      { icon: "🎓", label: "Avg. Tuition", value: "CAD 15,000–35,000/year", cls: "" },
      { icon: "🏆", label: "Scholarships", value: "Vanier CGS & Banting Awards", cls: "gold" },
      { icon: "✈️", label: "Student Visa", value: "Study Permit — High Approval", cls: "" },
    ],
  },
  australia: {
    emoji: "🇦🇺",
    country: "Australia",
    flag: "🇦🇺 Australia — Sun, Study & Success",
    tagline:
      "Top-ranked universities, laid-back lifestyle, and a booming job market.",
    whyFits:
      "Top-100 universities, generous post-study work rights, and a high quality of life — ideal if you want academic strength without a high-pressure city culture.",
    match: 89,
    image: "/images/destinations/aus1.webp",
    countryPageHref: "/study-in-australia",
    cards: [
      { icon: "🏛️", label: "Top Universities", value: "ANU, Melbourne, Sydney, QUT", cls: "accent" },
      { icon: "🎓", label: "Avg. Tuition", value: "AUD 20,000–40,000/year", cls: "" },
      { icon: "🏆", label: "Scholarships", value: "Australia Awards & RTP", cls: "gold" },
      { icon: "✈️", label: "Student Visa", value: "Subclass 500 — Streamlined", cls: "" },
    ],
  },
  germany: {
    emoji: "🇩🇪",
    country: "Germany",
    flag: "🇩🇪 Germany — Free Tuition, World-Class",
    tagline:
      "Nearly tuition-free public universities in the heart of Europe.",
    whyFits:
      "Nearly tuition-free public universities, strong tech and engineering programmes, and a central European base — best value for budget-conscious ambitious students.",
    match: 90,
    image: "/images/destinations/germany1.webp",
    countryPageHref: "/study-in-germany",
    cards: [
      { icon: "🏛️", label: "Top Universities", value: "TU Munich, Heidelberg, KIT", cls: "accent" },
      { icon: "🎓", label: "Avg. Tuition", value: "€0–€3,000/year (Public!)", cls: "" },
      { icon: "🏆", label: "Scholarships", value: "DAAD Scholarship Programme", cls: "gold" },
      { icon: "✈️", label: "Student Visa", value: "National Visa Type D", cls: "" },
    ],
  },
  nz: {
    emoji: "🇳🇿",
    country: "New Zealand",
    flag: "🇳🇿 NZ — Beautiful & Welcoming",
    tagline:
      "Stunning landscapes, friendly locals, and quality education in one of the world's safest nations.",
    whyFits:
      "Small class sizes, a friendly visa process, and one of the safest, most outdoorsy lifestyles — perfect if calm and balance matter to you.",
    match: 88,
    image: "/images/destinations/newzealand1.webp",
    countryPageHref: "/study-in-newzealand",
    cards: [
      { icon: "🏛️", label: "Top Universities", value: "Auckland, Otago, Victoria", cls: "accent" },
      { icon: "🎓", label: "Avg. Tuition", value: "NZD 18,000–32,000/year", cls: "" },
      { icon: "🏆", label: "Scholarships", value: "NZ Excellence Awards", cls: "gold" },
      { icon: "✈️", label: "Student Visa", value: "Student Visa — Simple & Fast", cls: "" },
    ],
  },
};

export interface QuizAnswers {
  q1?: string; // study field
  q2?: string; // lifestyle
  q3?: string; // budget
}

// Per-destination fit scores for each answer option (max 33 per question → max 99 total).
// The destination with the highest total score wins and its score becomes the match %.
export const DEST_SCORES: Record<
  DestinationKey,
  { field: Record<string, number>; lifestyle: Record<string, number>; budget: Record<string, number> }
> = {
  uk: {
    field:     { "Engineering & Technology": 24, "Allied Health Sciences": 26, "Humanities & Social Sciences": 33, "Business & Management": 33, "Law & Legal Studies": 33, "Architecture & Design": 30, "Applied Sciences": 22, "Medical & Pharmacy": 25 },
    lifestyle: { "Big City": 33, "Safe & Quiet": 14, "Diverse & Global": 28, "Nature & Outdoors": 8 },
    budget:    { "Under $15,000": 22, "$15,000 – $30,000": 30, "Above $30,000": 28, "I Need a Scholarship": 28 },
  },
  usa: {
    field:     { "Engineering & Technology": 33, "Allied Health Sciences": 24, "Humanities & Social Sciences": 24, "Business & Management": 30, "Law & Legal Studies": 28, "Architecture & Design": 26, "Applied Sciences": 33, "Medical & Pharmacy": 28 },
    lifestyle: { "Big City": 33, "Safe & Quiet": 12, "Diverse & Global": 28, "Nature & Outdoors": 10 },
    budget:    { "Under $15,000": 8,  "$15,000 – $30,000": 18, "Above $30,000": 33, "I Need a Scholarship": 10 },
  },
  canada: {
    field:     { "Engineering & Technology": 28, "Allied Health Sciences": 30, "Humanities & Social Sciences": 24, "Business & Management": 28, "Law & Legal Studies": 22, "Architecture & Design": 24, "Applied Sciences": 28, "Medical & Pharmacy": 28 },
    lifestyle: { "Big City": 18, "Safe & Quiet": 30, "Diverse & Global": 26, "Nature & Outdoors": 24 },
    budget:    { "Under $15,000": 24, "$15,000 – $30,000": 33, "Above $30,000": 26, "I Need a Scholarship": 24 },
  },
  australia: {
    field:     { "Engineering & Technology": 26, "Allied Health Sciences": 33, "Humanities & Social Sciences": 22, "Business & Management": 26, "Law & Legal Studies": 22, "Architecture & Design": 28, "Applied Sciences": 24, "Medical & Pharmacy": 30 },
    lifestyle: { "Big City": 22, "Safe & Quiet": 26, "Diverse & Global": 33, "Nature & Outdoors": 28 },
    budget:    { "Under $15,000": 20, "$15,000 – $30,000": 30, "Above $30,000": 24, "I Need a Scholarship": 20 },
  },
  germany: {
    field:     { "Engineering & Technology": 33, "Allied Health Sciences": 18, "Humanities & Social Sciences": 22, "Business & Management": 18, "Law & Legal Studies": 18, "Architecture & Design": 26, "Applied Sciences": 33, "Medical & Pharmacy": 20 },
    lifestyle: { "Big City": 20, "Safe & Quiet": 33, "Diverse & Global": 18, "Nature & Outdoors": 20 },
    budget:    { "Under $15,000": 33, "$15,000 – $30,000": 22, "Above $30,000": 8,  "I Need a Scholarship": 33 },
  },
  nz: {
    field:     { "Engineering & Technology": 20, "Allied Health Sciences": 28, "Humanities & Social Sciences": 26, "Business & Management": 22, "Law & Legal Studies": 20, "Architecture & Design": 26, "Applied Sciences": 22, "Medical & Pharmacy": 24 },
    lifestyle: { "Big City": 8,  "Safe & Quiet": 30, "Diverse & Global": 16, "Nature & Outdoors": 33 },
    budget:    { "Under $15,000": 26, "$15,000 – $30,000": 28, "Above $30,000": 20, "I Need a Scholarship": 26 },
  },
};

export function getDestResult(answers: QuizAnswers): { key: DestinationKey; match: number } {
  const keys = Object.keys(DEST_SCORES) as DestinationKey[];
  let bestKey: DestinationKey = "uk";
  let bestScore = -1;

  for (const key of keys) {
    const s = DEST_SCORES[key];
    const score =
      (s.field[answers.q1 ?? ""]     ?? 15) +
      (s.lifestyle[answers.q2 ?? ""] ?? 15) +
      (s.budget[answers.q3 ?? ""]    ?? 15);
    if (score > bestScore) {
      bestScore = score;
      bestKey   = key;
    }
  }

  return { key: bestKey, match: Math.min(99, Math.round((bestScore / 99) * 100)) };
}

// Kept for any existing callers
export function getDestKey(answers: QuizAnswers): DestinationKey {
  return getDestResult(answers).key;
}

export const QUIZ_QUESTIONS = [
  {
    id: "q1" as const,
    icon: "study",
    title: "What do you want to study?",
    sub: "Choose the subject that interests you most",
    options: [
      { emoji: "⚙️", label: "Engineering & Technology",    desc: "" },
      { emoji: "🩺", label: "Allied Health Sciences",      desc: "" },
      { emoji: "🌍", label: "Humanities & Social Sciences", desc: "" },
      { emoji: "💼", label: "Business & Management",       desc: "" },
      { emoji: "⚖️", label: "Law & Legal Studies",         desc: "" },
      { emoji: "🏛️", label: "Architecture & Design",       desc: "" },
      { emoji: "🔬", label: "Applied Sciences",            desc: "" },
      { emoji: "💊", label: "Medical & Pharmacy",          desc: "" },
    ],
  },
  {
    id: "q2" as const,
    icon: "lifestyle",
    title: "What kind of place do you want to live in?",
    sub: "Think about your day-to-day life abroad",
    options: [
      { emoji: "🏙️", label: "Big City",          desc: "Busy, lively, lots to do" },
      { emoji: "🏡", label: "Safe & Quiet",      desc: "Calm, clean, friendly people" },
      { emoji: "🌏", label: "Diverse & Global",  desc: "People from all over the world" },
      { emoji: "🌿", label: "Nature & Outdoors", desc: "Fresh air, scenery, relaxed pace" },
    ],
  },
  {
    id: "q3" as const,
    icon: "budget",
    title: "What's your ideal budget for studying abroad?",
    sub: "Include tuition and living costs — we'll find the best fit",
    options: [
      { emoji: "💚", label: "Under $15,000",         desc: "Looking for the most affordable option" },
      { emoji: "💰", label: "$15,000 – $30,000",    desc: "A reasonable budget with some flexibility" },
      { emoji: "⭐", label: "Above $30,000",         desc: "Happy to invest in a top-tier experience" },
      { emoji: "🤝", label: "I Need a Scholarship",  desc: "Financial support is essential for me" },
    ],
  },
];

export const COUNTRY_CODES = [
  { code: "+977", flag: "🇳🇵" },
  { code: "+91",  flag: "🇮🇳" },
  { code: "+880", flag: "🇧🇩" },
  { code: "+94",  flag: "🇱🇰" },
  { code: "+92",  flag: "🇵🇰" },
  { code: "+1",   flag: "🇺🇸" },
  { code: "+44",  flag: "🇬🇧" },
  { code: "+61",  flag: "🇦🇺" },
  { code: "+64",  flag: "🇳🇿" },
  { code: "+49",  flag: "🇩🇪" },
];

export const EDUCATION_LEVELS = [
  "+2 / A-Levels / High School",
  "Bachelor's Degree",
  "Master's Degree",
  "Diploma / Certificate",
];

export const WHATSAPP_NUMBER = "9779802728444";
