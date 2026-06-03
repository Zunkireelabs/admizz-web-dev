// Curated catalog of pages an affiliate can share via the dashboard link builder.
// Keep the list short and high-signal — every entry should be a page that either
// converts directly (form) or is a strong consideration step that feeds /register.

export interface LinkDestination {
  path: string;        // pathname only — origin is added at render time
  label: string;       // shown in the dropdown
  hint: string;        // one-line guidance below the dropdown
  badge?: string;      // optional pill: "Best", "Event", etc.
  convertsDirectly: boolean;
}

export const LINK_DESTINATIONS: LinkDestination[] = [
  {
    path: "/register",
    label: "Register — Free consultation",
    hint:  "Best for warm leads — direct conversion path.",
    badge: "Best",
    convertsDirectly: true,
  },
  {
    path: "/test-prep",
    label: "Test Prep — IELTS / SAT / GRE",
    hint:  "Click tracks; conversion credits via cookie when student later visits Register.",
    convertsDirectly: false,
  },
  {
    path: "/study-in-uk",
    label: "Study in the UK — Country guide",
    hint:  "UK-curious students. Click tracks; converts via cookie at Register.",
    convertsDirectly: false,
  },
  {
    path: "/study-in-canada",
    label: "Study in Canada — Country guide",
    hint:  "Canada-curious students. Click tracks; converts via cookie at Register.",
    convertsDirectly: false,
  },
  {
    path: "/study-in-the-usa",
    label: "Study in the USA — Country guide",
    hint:  "USA-curious students. Click tracks; converts via cookie at Register.",
    convertsDirectly: false,
  },
  {
    path: "/study-in-australia",
    label: "Study in Australia — Country guide",
    hint:  "AU-curious students. Click tracks; converts via cookie at Register.",
    convertsDirectly: false,
  },
  {
    path: "/events/uk-education-expo-2026",
    label: "Event — UK Education Expo 2026",
    hint:  "Promote event sign-ups. In-person attendance counts as engagement.",
    badge: "Event",
    convertsDirectly: false,
  },
  {
    path: "/events/admizzion-week",
    label: "Event — Admizzion Week",
    hint:  "Multi-day event push. Great for batch campaigns.",
    badge: "Event",
    convertsDirectly: false,
  },
  {
    path: "/affiliate-program",
    label: "Affiliate Program — Recruit other affiliates",
    hint:  "Refer creators / counsellors to join the program themselves.",
    convertsDirectly: true,
  },
];

export const DEFAULT_DESTINATION = LINK_DESTINATIONS[0];
