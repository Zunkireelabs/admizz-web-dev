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
    emoji: "🎩",
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
    emoji: "🗽",
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
    emoji: "🍁",
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
    emoji: "🦘",
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
    emoji: "🏰",
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
    emoji: "🌿",
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
    field:     { "Business & Management": 33, "Technology & Engineering": 18, "Health & Medicine": 25, "Arts & Social Science": 33 },
    lifestyle: { "Big City Energy": 33, "Safe & Peaceful": 14, "Multicultural Hub": 28, "Nature & Adventure": 8 },
    budget:    { "Budget Friendly": 22, "Mid Range": 30, "Premium": 28, "Scholarship Needed": 28 },
  },
  usa: {
    field:     { "Business & Management": 28, "Technology & Engineering": 33, "Health & Medicine": 22, "Arts & Social Science": 22 },
    lifestyle: { "Big City Energy": 33, "Safe & Peaceful": 12, "Multicultural Hub": 28, "Nature & Adventure": 10 },
    budget:    { "Budget Friendly": 8,  "Mid Range": 18, "Premium": 33, "Scholarship Needed": 10 },
  },
  canada: {
    field:     { "Business & Management": 26, "Technology & Engineering": 26, "Health & Medicine": 30, "Arts & Social Science": 24 },
    lifestyle: { "Big City Energy": 18, "Safe & Peaceful": 30, "Multicultural Hub": 26, "Nature & Adventure": 24 },
    budget:    { "Budget Friendly": 24, "Mid Range": 33, "Premium": 26, "Scholarship Needed": 24 },
  },
  australia: {
    field:     { "Business & Management": 24, "Technology & Engineering": 22, "Health & Medicine": 33, "Arts & Social Science": 22 },
    lifestyle: { "Big City Energy": 22, "Safe & Peaceful": 26, "Multicultural Hub": 33, "Nature & Adventure": 28 },
    budget:    { "Budget Friendly": 20, "Mid Range": 30, "Premium": 24, "Scholarship Needed": 20 },
  },
  germany: {
    field:     { "Business & Management": 14, "Technology & Engineering": 33, "Health & Medicine": 16, "Arts & Social Science": 25 },
    lifestyle: { "Big City Energy": 20, "Safe & Peaceful": 33, "Multicultural Hub": 18, "Nature & Adventure": 20 },
    budget:    { "Budget Friendly": 33, "Mid Range": 22, "Premium": 8,  "Scholarship Needed": 33 },
  },
  nz: {
    field:     { "Business & Management": 20, "Technology & Engineering": 18, "Health & Medicine": 26, "Arts & Social Science": 30 },
    lifestyle: { "Big City Energy": 8,  "Safe & Peaceful": 30, "Multicultural Hub": 16, "Nature & Adventure": 33 },
    budget:    { "Budget Friendly": 26, "Mid Range": 28, "Premium": 20, "Scholarship Needed": 26 },
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
    icon: "🎓",
    title: "What lights you up academically?",
    sub: "Pick the field that excites you most",
    options: [
      { emoji: "💼", label: "Business & Management",    desc: "MBA · Finance · Marketing · HR" },
      { emoji: "💻", label: "Technology & Engineering", desc: "CS · AI · Data · Robotics" },
      { emoji: "🏥", label: "Health & Medicine",        desc: "Nursing · Pharmacy · Medical Sciences" },
      { emoji: "🎨", label: "Arts & Social Science",    desc: "Design · Law · Psychology · Media" },
    ],
  },
  {
    id: "q2" as const,
    icon: "🌆",
    title: "Where do you actually want to wake up every morning?",
    sub: "Pick the vibe that feels right",
    options: [
      { emoji: "🏙️", label: "Big City Energy",     desc: "Urban, vibrant, fast-paced" },
      { emoji: "🏔️", label: "Safe & Peaceful",     desc: "Calm, clean, welcoming" },
      { emoji: "🌏", label: "Multicultural Hub",   desc: "Diverse, global community" },
      { emoji: "🌿", label: "Nature & Adventure",  desc: "Outdoors, scenic, relaxed" },
    ],
  },
  {
    id: "q3" as const,
    icon: "💰",
    title: "What's a comfortable annual investment for you?",
    sub: "Tuition + living, per year",
    options: [
      { emoji: "🪙", label: "Budget Friendly",    desc: "Under $15,000/year" },
      { emoji: "💵", label: "Mid Range",          desc: "$15,000 – $30,000/year" },
      { emoji: "💎", label: "Premium",            desc: "$30,000+ / year" },
      { emoji: "🎖️", label: "Scholarship Needed", desc: "Financial aid required" },
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
