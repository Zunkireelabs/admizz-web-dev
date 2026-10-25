// Groups the flat course list by course name, so Find Course can show "course -> universities".
// One matcher (matchTier) is shared by search results, trending cards, chips and suggestions,
// so every number on the page comes from the same rule.
import type { CourseCard, CourseCatalog } from "./index";

export interface CourseOffer {
  /** index into catalog.universities */
  u: number;
  course: CourseCard;
}

export interface CourseGroup {
  key: string;
  /** URL part for /course-finder/<slug>; unique across all groups */
  slug: string;
  /** True when a course page exists (2+ universities offer it) */
  hasPage: boolean;
  name: string;
  level: CourseCard["level"];
  /** One offer per university (the cheapest), cheapest first. */
  offers: CourseOffer[];
}

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90).replace(/-+$/, "");
const stripBrackets = (s: string) => norm(s.replace(/\([^)]*\)/g, " "));

export function groupCourses(catalog: CourseCatalog): CourseGroup[] {
  const map = new Map<string, CourseGroup>();
  for (const c of catalog.courses) {
    const key = norm(c.name);
    let g = map.get(key);
    if (!g) {
      g = { key, slug: "", hasPage: false, name: c.name, level: c.level, offers: [] };
      map.set(key, g);
    }
    const existing = g.offers.findIndex((o) => o.u === c.u);
    if (existing === -1) g.offers.push({ u: c.u, course: c });
    else if ((c.fee ?? Infinity) < (g.offers[existing].course.fee ?? Infinity)) g.offers[existing] = { u: c.u, course: c };
  }
  const groups = Array.from(map.values());
  const used = new Set<string>();
  for (const g of groups) {
    g.offers.sort((a, b) => (a.course.fee ?? Infinity) - (b.course.fee ?? Infinity));
    g.hasPage = g.offers.length >= 2;
    const base = slugify(g.name) || "course";
    let slug = base;
    for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
    used.add(slug);
    g.slug = slug;
  }
  return groups;
}

/** 0 = same course, 1 = starts with the phrase, 2 = contains the phrase, 3 = has all the words, -1 = no match. Course NAME only. */
export function matchTier(name: string, phrase: string): number {
  const p = norm(phrase);
  if (!p) return -1;
  const n = norm(name);
  if (stripBrackets(name) === p || n === p) return 0;
  if (n.startsWith(p)) return 1;
  if (n.includes(p)) return 2;
  const words = p.split(" ");
  return words.every((w) => n.includes(w)) ? 3 : -1;
}

/** Matching groups with their tier. Phrase matches win; word-only matches are used only when there are none. */
export function searchGroups(groups: CourseGroup[], phrase: string): { group: CourseGroup; tier: number }[] {
  const scored = groups.map((group) => ({ group, tier: matchTier(group.name, phrase) })).filter((x) => x.tier >= 0);
  const strong = scored.filter((x) => x.tier <= 2);
  return strong.length ? strong : scored;
}

export function minFee(g: { offers: CourseOffer[] }): number | undefined {
  const fees = g.offers.map((o) => o.course.fee).filter((f): f is number => f !== undefined);
  return fees.length ? Math.min(...fees) : undefined;
}

/** The subject most of a course's offers belong to ("General" is ignored). */
export function groupSubject(g: CourseGroup): string | undefined {
  const counts = new Map<string, number>();
  for (const o of g.offers) if (o.course.subject !== "General") counts.set(o.course.subject, (counts.get(o.course.subject) ?? 0) + 1);
  return Array.from(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
}
