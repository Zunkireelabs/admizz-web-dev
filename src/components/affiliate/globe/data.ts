export interface GeoCity {
  id:    string;
  name:  string;
  lat:   number;
  lng:   number;
}

export interface Destination {
  id:        string;
  country:   string;
  iso:       string;
  lat:       number;
  lng:       number;
  cities:    string[];
  benefit:   string;
}

export const ORIGINS: GeoCity[] = [
  { id: "in",   name: "India",       lat:  28.6, lng:  77.2 },
  { id: "np",   name: "Nepal",       lat:  27.7, lng:  85.3 },
  { id: "bd",   name: "Bangladesh",  lat:  23.8, lng:  90.4 },
  { id: "vn",   name: "Vietnam",     lat:  21.0, lng: 105.8 },
  { id: "pk",   name: "Pakistan",    lat:  33.7, lng:  73.1 },
  { id: "lk",   name: "Sri Lanka",   lat:   6.9, lng:  79.9 },
  { id: "de-o", name: "Germany",     lat:  52.5, lng:  13.4 },
  { id: "fr",   name: "France",      lat:  48.9, lng:   2.3 },
  { id: "ke",   name: "Kenya",       lat:  -1.3, lng:  36.8 },
  { id: "ng",   name: "Nigeria",     lat:   9.1, lng:   7.5 },
  { id: "ae",   name: "Dubai",       lat:  25.3, lng:  55.3 },
  { id: "qa",   name: "Qatar",       lat:  25.3, lng:  51.5 },
  { id: "br",   name: "Brazil",      lat: -15.8, lng: -47.9 },
  { id: "ar",   name: "Argentina",   lat: -34.6, lng: -58.4 },
];

export const DESTINATIONS: Destination[] = [
  {
    id:      "au",
    country: "Australia",
    iso:     "AU",
    lat:     -33.9, lng: 151.2,
    cities:  ["Sydney", "Melbourne", "Brisbane", "Perth"],
    benefit: "Post-study work visa up to 4 years and a globally ranked university system.",
  },
  {
    id:      "ca",
    country: "Canada",
    iso:     "CA",
    lat:      43.7, lng: -79.4,
    cities:  ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    benefit: "Post-graduation work permit up to 3 years and a clear path to permanent residency.",
  },
  {
    id:      "uk",
    country: "United Kingdom",
    iso:     "UK",
    lat:      51.5, lng:  -0.1,
    cities:  ["London", "Manchester", "Birmingham", "Edinburgh"],
    benefit: "2-year graduate route visa and 1-year master's programs at world-leading universities.",
  },
  {
    id:      "us",
    country: "United States",
    iso:     "US",
    lat:      40.7, lng: -74.0,
    cities:  ["New York", "Boston", "San Francisco", "Chicago"],
    benefit: "Optional Practical Training and the largest concentration of top-ranked universities.",
  },
  {
    id:      "de",
    country: "Germany",
    iso:     "DE",
    lat:      52.5, lng:  13.4,
    cities:  ["Berlin", "Munich", "Frankfurt", "Hamburg"],
    benefit: "Low or no tuition at public universities and an 18-month post-study job-search visa.",
  },
  {
    id:      "ie",
    country: "Ireland",
    iso:     "IE",
    lat:      53.3, lng:  -6.3,
    cities:  ["Dublin", "Cork", "Galway", "Limerick"],
    benefit: "2-year stay-back visa after a master's and English-language instruction throughout.",
  },
  {
    id:      "nz",
    country: "New Zealand",
    iso:     "NZ",
    lat:     -36.9, lng: 174.8,
    cities:  ["Auckland", "Wellington", "Christchurch", "Hamilton"],
    benefit: "Up to 3 years of post-study work rights and a strong reputation for student safety.",
  },
];

// Allowed origin → destination pairs (mobility corridors)
// These reflect the realistic student-flow corridors the user requested.
export const ROUTE_PAIRS: Array<[string, string]> = [
  // Asia → Australia
  ["in", "au"], ["np", "au"], ["bd", "au"], ["vn", "au"], ["lk", "au"],
  // Asia → Canada
  ["in", "ca"], ["np", "ca"], ["pk", "ca"], ["lk", "ca"], ["bd", "ca"],
  // Asia → UK
  ["np", "uk"], ["in", "uk"], ["bd", "uk"], ["pk", "uk"],
  // Asia → US
  ["in", "us"], ["np", "us"], ["vn", "us"],
  // Asia → Germany
  ["in", "de"], ["pk", "de"], ["vn", "de"],
  // Asia → Ireland
  ["in", "ie"], ["np", "ie"],
  // Asia → New Zealand
  ["in", "nz"], ["np", "nz"], ["lk", "nz"],
  // Europe → Canada
  ["de-o", "ca"], ["fr", "ca"],
  // Europe → UK
  ["fr", "uk"], ["de-o", "uk"],
  // Africa → UK
  ["ke", "uk"], ["ng", "uk"],
  // Africa → Canada
  ["ng", "ca"], ["ke", "ca"],
  // Middle East → Australia
  ["ae", "au"], ["qa", "au"],
  // Middle East → UK
  ["ae", "uk"], ["qa", "uk"],
  // South America → Canada
  ["br", "ca"], ["ar", "ca"],
  // South America → US
  ["br", "us"], ["ar", "us"],
];
