#!/usr/bin/env node
/**
 * One-off clean-up of the Sanity posts so the stored text matches the site style
 * rules ("Nepali", American spelling, month-first dates). Same rules as
 * src/lib/sanity-text.ts, which already applies them at build time; this script
 * makes the change permanent in Sanity itself.
 *
 *   node scripts/sanity-style-fix.mjs            dry run, read-only, needs no token
 *   SANITY_WRITE_TOKEN=... node scripts/sanity-style-fix.mjs --apply
 *
 * Safe by design: dry run by default, writes only text fields that changed, uses
 * the document revision so it never overwrites a concurrent edit, and skips any post
 * that has an unpublished draft (finish or discard the draft in Studio first).
 * Take a backup before --apply:  npx sanity dataset export production backup.tar.gz
 */
import { createClient } from "@sanity/client";

const APPLY = process.argv.includes("--apply");
const TOKEN = process.env.SANITY_WRITE_TOKEN;
if (APPLY && !TOKEN) {
  console.error("--apply needs SANITY_WRITE_TOKEN (an Editor token from sanity.io/manage > API > Tokens).");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "vd27cmpc",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-10",
  useCdn: false,
  token: TOKEN,
});

const MONTHS = "January|February|March|April|May|June|July|August|September|October|November|December";
const B = "(?<![\\w/@#.$\\-])";
const R = {
  nepalese: new RegExp(`${B}Nepalese(?![\\w\\-])`, "g"),
  programme: new RegExp(`${B}(?<!Knowledge )([Pp])rogramme(s?)(?![\\w\\-])`, "g"),
  organisation: new RegExp(`${B}([Oo])rganisation(s?)(?![\\w\\-])`, "g"),
  adviser: new RegExp(`${B}([Aa])dviser(s?)(?![\\w\\-])`, "g"),
  travelling: new RegExp(`${B}([Tt])ravelling(?![\\w\\-])`, "g"),
  degrees: new RegExp(`${B}(Bachelors|Masters)(?=\\s+(?:in|of|degree)\\b)`, "g"),
  dateYear: new RegExp(`${B}(\\d{1,2}) (${MONTHS}),? (\\d{4})(?!\\d)`, "g"),
  dateNoYear: new RegExp(`${B}(\\d{1,2}) (${MONTHS})(?![\\w]|,? \\d{4})`, "g"),
};

function americanize(t) {
  if (typeof t !== "string" || !t) return t;
  return t
    .replace(R.nepalese, "Nepali")
    .replace(R.programme, (_m, p, s) => `${p}rogram${s}`)
    .replace(R.organisation, (_m, o, s) => `${o}rganization${s}`)
    .replace(R.adviser, (_m, a, s) => `${a}dvisor${s}`)
    .replace(R.travelling, (_m, x) => `${x}raveling`)
    .replace(R.degrees, (_m, w) => (w === "Bachelors" ? "Bachelor's" : "Master's"))
    .replace(R.dateYear, (m, d, mo, y, off, whole) => {
      const next = whole.slice(off + m.length, off + m.length + 12);
      const comma = /^\s+[A-Za-z£$]/.test(next) && !/^\s+[A-Z]{2,}\b/.test(next) ? "," : "";
      return `${mo} ${Number(d)}, ${y}${comma}`;
    })
    .replace(R.dateNoYear, (_m, d, mo) => `${mo} ${Number(d)}`);
}

const SKIP = new Set(["slug", "current", "href", "url", "canonicalUrl", "_id", "_key", "_ref", "_type", "_rev"]);
function walk(v) {
  if (typeof v === "string") return americanize(v);
  if (Array.isArray(v)) return v.map(walk);
  if (v && typeof v === "object") {
    const o = {};
    for (const [k, x] of Object.entries(v)) o[k] = SKIP.has(k) ? x : walk(x);
    return o;
  }
  return v;
}

const FIELDS = ["title", "excerpt", "seo", "faqItems", "content"];
const posts = await client.fetch(`*[_type == "post" && !(_id in path("drafts.**"))]{_id, _rev, "slug": slug.current, ${FIELDS.join(", ")}}`);
const draftIds = new Set(await client.fetch(`*[_id in path("drafts.**")]._id`));

let changedPosts = 0;
let skipped = 0;
for (const p of posts) {
  const patch = {};
  for (const f of FIELDS) {
    if (p[f] === undefined || p[f] === null) continue;
    const next = walk(p[f]);
    if (JSON.stringify(next) !== JSON.stringify(p[f])) patch[f] = next;
  }
  const fields = Object.keys(patch);
  if (!fields.length) continue;
  if (draftIds.has(`drafts.${p._id}`)) {
    skipped++;
    console.log(`SKIP (has unpublished draft)  ${p.slug}`);
    continue;
  }
  changedPosts++;
  console.log(`${APPLY ? "UPDATE" : "would update"}  ${p.slug}  [${fields.join(", ")}]`);
  if (APPLY) await client.patch(p._id).ifRevisionId(p._rev).set(patch).commit();
}

console.log(`\n${changedPosts} post(s) ${APPLY ? "updated" : "would change"}; ${skipped} skipped because of drafts.`);
if (!APPLY) console.log("Dry run only. Nothing was written. Re-run with --apply and SANITY_WRITE_TOKEN to save.");
