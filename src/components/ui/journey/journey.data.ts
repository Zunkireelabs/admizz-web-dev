export type JourneyStep = {
  id: number;
  label: string;
  title: string;
  description: string;
  duration: string;
  outcome: string;
  included: string[];
  color: string;
  colorDeep: string;
  bgTint: string;
  iconPath: string;
};

// Heroicons outline-style paths (24x24 viewBox)
const ICONS = {
  chat: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
  book: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
  doc: "M9 12.75 11.25 15 15 9.75M9 12h.008v.008H9V12Zm.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 8.25h9a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3Zm6-4.5V3.75a3 3 0 0 0-3-3h-1.5a3 3 0 0 0-3 3v.75",
  id: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  plane: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5",
};

export const journeySteps: JourneyStep[] = [
  {
    id: 1,
    label: "Counselling",
    title: "Free 1-on-1 counselling",
    description:
      "Meet a certified counsellor who maps your goals, budget, and timeline. No pressure — just a clear picture of what's possible.",
    duration: "30 min",
    outcome: "Personalized study-abroad blueprint",
    included: [
      "Goal, budget & timeline review",
      "Country & intake recommendations",
      "Eligibility & profile assessment",
      "No-obligation, no fees ever",
    ],
    color: "#F08A5F",
    colorDeep: "#D76A3D",
    bgTint: "#FFF4EE",
    iconPath: ICONS.chat,
  },
  {
    id: 2,
    label: "Course Selection",
    title: "Shortlist your perfect course & university",
    description:
      "We compare programs across countries based on your scores, budget, and career goals — and hand you a ranked shortlist.",
    duration: "3–5 days",
    outcome: "Curated list of 5–10 universities",
    included: [
      "Country-by-country program comparison",
      "Scholarship & funding match",
      "Career-fit analysis",
      "Ranked shortlist with deadlines",
    ],
    color: "#F5B544",
    colorDeep: "#D89218",
    bgTint: "#FFF8E5",
    iconPath: ICONS.book,
  },
  {
    id: 3,
    label: "Application",
    title: "Apply with confidence",
    description:
      "From SOPs to recommendation letters and document checks — our team handles every detail of your application end-to-end.",
    duration: "2–4 weeks",
    outcome: "Submitted applications + offer letters",
    included: [
      "SOP & essay drafting + edits",
      "Recommendation letter coordination",
      "Document checks & translations",
      "Application tracking till offer",
    ],
    color: "#4FBFA8",
    colorDeep: "#2F9D85",
    bgTint: "#EDFAF7",
    iconPath: ICONS.doc,
  },
  {
    id: 4,
    label: "Visa & Preparation",
    title: "Visa, finances & pre-departure",
    description:
      "We guide your visa file, financial docs, mock interviews, and accommodation — so nothing is left to chance before you fly.",
    duration: "4–8 weeks",
    outcome: "Approved visa + travel-ready file",
    included: [
      "Visa file preparation & review",
      "Financial documents guidance",
      "Mock visa interviews",
      "Accommodation & travel support",
    ],
    color: "#4F7DEB",
    colorDeep: "#2954C7",
    bgTint: "#EBF3FF",
    iconPath: ICONS.id,
  },
  {
    id: 5,
    label: "Departure & Support",
    title: "Land abroad with us still beside you",
    description:
      "Pickup, SIM, banking, orientation — and a community of Admizz alumni already on campus to help you settle in fast.",
    duration: "Ongoing",
    outcome: "Confident start to your global journey",
    included: [
      "Airport pickup coordination",
      "SIM, banking & orientation setup",
      "On-campus alumni community access",
      "24/7 support throughout your studies",
    ],
    color: "#B373E5",
    colorDeep: "#8B47C2",
    bgTint: "#F8F0FF",
    iconPath: ICONS.plane,
  },
];
