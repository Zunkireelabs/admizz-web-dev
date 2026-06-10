export interface TzPreset {
  id: string;
  label: string;
  tz: string;
}

export const TZ_PRESETS: TzPreset[] = [
  { id: "kathmandu", label: "Kathmandu",    tz: "Asia/Kathmandu" },
  { id: "delhi",     label: "New Delhi",    tz: "Asia/Kolkata" },
  { id: "dhaka",     label: "Dhaka",        tz: "Asia/Dhaka" },
  { id: "dubai",     label: "Dubai",        tz: "Asia/Dubai" },
  { id: "london",    label: "London",       tz: "Europe/London" },
  { id: "paris",     label: "Paris",        tz: "Europe/Paris" },
  { id: "lagos",     label: "Lagos",        tz: "Africa/Lagos" },
  { id: "jhb",       label: "Johannesburg", tz: "Africa/Johannesburg" },
  { id: "ny",        label: "New York",     tz: "America/New_York" },
  { id: "la",        label: "Los Angeles",  tz: "America/Los_Angeles" },
  { id: "mex",       label: "Mexico City",  tz: "America/Mexico_City" },
  { id: "toronto",   label: "Toronto",      tz: "America/Toronto" },
  { id: "sp",        label: "São Paulo",    tz: "America/Sao_Paulo" },
  { id: "sydney",    label: "Sydney",       tz: "Australia/Sydney" },
  { id: "tokyo",     label: "Tokyo",        tz: "Asia/Tokyo" },
];

export const DEFAULT_TZ = "Asia/Kathmandu";
