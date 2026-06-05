export type DialCode = {
  key: string;      // ISO country code (NP, IN, ...)
  dial: string;     // E.164 dial prefix (+977)
  label: string;    // Display label (🇳🇵 +977)
  digits: number;   // Expected digit count for the local number
  country: string;  // Country name
};

export const DIAL_CODES: DialCode[] = [
  { key: "NP", dial: "+977", label: "🇳🇵 +977", digits: 10, country: "Nepal" },
  { key: "IN", dial: "+91",  label: "🇮🇳 +91",  digits: 10, country: "India" },
  { key: "BD", dial: "+880", label: "🇧🇩 +880", digits: 10, country: "Bangladesh" },
  { key: "ZM", dial: "+260", label: "🇿🇲 +260", digits: 9,  country: "Zambia" },
  { key: "GB", dial: "+44",  label: "🇬🇧 +44",  digits: 10, country: "UK" },
  { key: "US", dial: "+1",   label: "🇺🇸 +1",   digits: 10, country: "USA" },
  { key: "AU", dial: "+61",  label: "🇦🇺 +61",  digits: 9,  country: "Australia" },
  { key: "CA", dial: "+1",   label: "🇨🇦 +1",   digits: 10, country: "Canada" },
  { key: "NZ", dial: "+64",  label: "🇳🇿 +64",  digits: 9,  country: "New Zealand" },
  { key: "DE", dial: "+49",  label: "🇩🇪 +49",  digits: 11, country: "Germany" },
  { key: "AE", dial: "+971", label: "🇦🇪 +971", digits: 9,  country: "UAE" },
];

export const dialSpec = (key: string): DialCode =>
  DIAL_CODES.find((d) => d.key === key) ?? DIAL_CODES[0];

export const phoneDigits = (s: string): string => s.replace(/\D/g, "");
