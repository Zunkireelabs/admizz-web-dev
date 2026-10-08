// Style normalizer for text that comes out of Sanity (docs/seo-content-rules.md):
// "Nepali" not "Nepalese", American spelling, month-first dates. It runs on every
// Sanity fetch (see src/lib/sanity.ts), so old posts follow the same rules as the
// code-authored pages without editing each post in Sanity. Slugs, URLs and ids are
// never touched. Official names ("Orange Knowledge Programme", "Honours") are kept.

const MONTHS = "January|February|March|April|May|June|July|August|September|October|November|December";
const NOT_IN_WORD = "(?<![\\w/@#.$\\-])";

const nepalese = new RegExp(`${NOT_IN_WORD}Nepalese(?![\\w\\-])`, "g");
const programme = new RegExp(`${NOT_IN_WORD}(?<!Knowledge )([Pp])rogramme(s?)(?![\\w\\-])`, "g");
const organisation = new RegExp(`${NOT_IN_WORD}([Oo])rganisation(s?)(?![\\w\\-])`, "g");
const adviser = new RegExp(`${NOT_IN_WORD}([Aa])dviser(s?)(?![\\w\\-])`, "g");
const travelling = new RegExp(`${NOT_IN_WORD}([Tt])ravelling(?![\\w\\-])`, "g");
const degrees = new RegExp(`${NOT_IN_WORD}(Bachelors|Masters)(?=\\s+(?:in|of|degree)\\b)`, "g");
const dateWithYear = new RegExp(`${NOT_IN_WORD}(\\d{1,2}) (${MONTHS}),? (\\d{4})(?!\\d)`, "g");
const dateNoYear = new RegExp(`${NOT_IN_WORD}(\\d{1,2}) (${MONTHS})(?![\\w]|,? \\d{4})`, "g");

export function americanize(text: string): string {
  if (!text) return text;
  return text
    .replace(nepalese, "Nepali")
    .replace(programme, (_m, p: string, s: string) => `${p}rogram${s}`)
    .replace(organisation, (_m, o: string, s: string) => `${o}rganization${s}`)
    .replace(adviser, (_m, a: string, s: string) => `${a}dvisor${s}`)
    .replace(travelling, (_m, t: string) => `${t}raveling`)
    .replace(degrees, (_m, w: string) => (w === "Bachelors" ? "Bachelor's" : "Master's"))
    .replace(dateWithYear, (m: string, d: string, mo: string, y: string, offset: number, whole: string) => {
      const next = whole.slice(offset + m.length, offset + m.length + 12);
      const comma = /^\s+[A-Za-z£$]/.test(next) && !/^\s+[A-Z]{2,}\b/.test(next) ? "," : "";
      return `${mo} ${Number(d)}, ${y}${comma}`;
    })
    .replace(dateNoYear, (_m: string, d: string, mo: string) => `${mo} ${Number(d)}`);
}

const SKIP_KEYS = new Set(["slug", "current", "href", "url", "canonicalUrl", "_id", "_key", "_ref", "_type", "_rev"]);

/** Deep-maps every string in a Sanity result, leaving identifiers and links alone. */
export function normalizeSanityResult<T>(value: T): T {
  if (typeof value === "string") return americanize(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => normalizeSanityResult(v)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = SKIP_KEYS.has(k) ? v : normalizeSanityResult(v);
    }
    return out as T;
  }
  return value;
}
