// One-click shortcuts shown above the URL input in ReferralLinkBox.
// The full-URL input is the primary path — these just save typing for the
// most common destinations. Keep the list short (≤ 5) so it stays scannable.

export interface QuickPickDestination {
  path:  string;  // pathname only — origin is added at render time
  label: string;  // shown on the chip
}

export const QUICK_PICK_DESTINATIONS: QuickPickDestination[] = [
  { path: "/register",                          label: "Register" },
  { path: "/test-prep",                         label: "Test Prep" },
  { path: "/study-in-uk-from-nepal",            label: "Study in UK" },
  { path: "/study-in-canada",                   label: "Study in Canada" },
  { path: "/events/uk-education-expo-2026",     label: "UK Expo 2026" },
];
