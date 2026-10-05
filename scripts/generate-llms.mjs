/**
 * Pre-build script: regenerates the "## Key Pages" list in public/llms.txt
 * and writes public/llms-full.txt, both from live Sanity data.
 *
 * Posts that live in the website repo instead of Sanity (listed in
 * src/data/generated-posts.json) are merged into the same lists, so AI
 * crawlers see them too.
 *
 * Everything in llms.txt ABOVE the "## Key Pages" heading is hand-maintained
 * (services, offices, partner universities, destinations) and is preserved
 * as-is. Only the blog list is generated, so it can never go stale or miss
 * newly published posts again.
 *
 *   llms.txt       curated head + the most recent KEY_PAGE_LIMIT posts
 *   llms-full.txt  same head + every published post with its summary
 *
 * Run before `next build` (see package.json prebuild).
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE_URL = "https://admizzeducation.com";
const KEY_PAGE_LIMIT = 25;
const KEY_PAGES_HEADING = "## Key Pages";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "vd27cmpc",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-10",
  useCdn: true,
});

// One line, no markdown-breaking characters.
const oneLine = (s) => (s || "").replace(/\s+/g, " ").trim();

function postLine(p) {
  const title = oneLine(p.seo?.metaTitle || p.title);
  const desc = oneLine(p.seo?.metaDescription || p.excerpt);
  const url = `${BASE_URL}/${p.slug}`;
  return desc ? `- [${title}](${url}): ${desc}` : `- [${title}](${url})`;
}

// Pages that live only in this repo and are not blog posts: the short answer
// pages under src/app/answers/ and a few standalone pages. Title and
// description are read from each page's own metadata export.
function readLocalAnswerPages() {
  const dirs = [];
  const answersDir = path.join(ROOT, "src", "app", "answers");
  if (fs.existsSync(answersDir)) {
    for (const e of fs.readdirSync(answersDir, { withFileTypes: true })) {
      if (e.isDirectory()) dirs.push({ slug: `answers/${e.name}`, file: path.join(answersDir, e.name, "page.tsx") });
    }
  }
  for (const slug of ["accreditation-and-results", "study-abroad-rule-updates"]) {
    dirs.push({ slug, file: path.join(ROOT, "src", "app", slug, "page.tsx") });
  }
  const out = [];
  for (const { slug, file } of dirs) {
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, "utf-8");
    const m = src.match(/export const metadata[\s\S]*?title:\s*("(?:[^"\\]|\\.)*"),\s*description:\s*("(?:[^"\\]|\\.)*")/);
    if (!m) continue;
    try {
      out.push({ slug, title: JSON.parse(m[1]), excerpt: JSON.parse(m[2]), publishedAt: "2026-10-05", _updatedAt: "2026-10-05" });
    } catch {
      /* skip a page whose metadata is not plain strings */
    }
  }
  return out;
}

// Posts that exist as files in this repo (no Sanity document). Same shape as
// the Sanity rows so they sort and render with the same code.
function readLocalPosts() {
  const manifestPath = path.join(ROOT, "src", "data", "generated-posts.json");
  if (!fs.existsSync(manifestPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf-8")).map((m) => ({
      slug: m.slug,
      title: m.title,
      excerpt: m.excerpt,
      publishedAt: m.publishedAt,
      _updatedAt: m.publishedAt,
    }));
  } catch {
    return [];
  }
}

async function main() {
  const llmsPath = path.join(ROOT, "public", "llms.txt");
  const existing = fs.readFileSync(llmsPath, "utf-8");
  const idx = existing.indexOf(KEY_PAGES_HEADING);
  const head = (idx === -1 ? existing : existing.slice(0, idx)).trimEnd();

  const sanityPosts = await client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(coalesce(_updatedAt, publishedAt) desc) {
      "slug": slug.current, title, excerpt, publishedAt, _updatedAt, seo
    }`
  );
  // Website-file posts first so they win if a slug is ever in both places.
  const bySlug = new Map();
  for (const p of [...readLocalPosts(), ...readLocalAnswerPages(), ...sanityPosts]) if (!bySlug.has(p.slug)) bySlug.set(p.slug, p);
  const stamp = (p) => new Date(p._updatedAt || p.publishedAt || 0).getTime();
  const posts = [...bySlug.values()].sort((a, b) => stamp(b) - stamp(a));

  const keyPages = posts.slice(0, KEY_PAGE_LIMIT).map(postLine).join("\n");
  const llms = `${head}\n\n${KEY_PAGES_HEADING}\nMost recently updated guides (full list: ${BASE_URL}/llms-full.txt).\n${keyPages}\n`;
  fs.writeFileSync(llmsPath, llms, "utf-8");

  const full =
    `${head}\n\n## All Articles\n` +
    `Every published Admizz Education guide (${posts.length}), most recently updated first.\n` +
    posts.map(postLine).join("\n") +
    "\n";
  fs.writeFileSync(path.join(ROOT, "public", "llms-full.txt"), full, "utf-8");

  console.log(
    `Wrote public/llms.txt (${Math.min(posts.length, KEY_PAGE_LIMIT)} key pages) and public/llms-full.txt (${posts.length} articles)`
  );
}

main().catch((err) => {
  console.error("Error generating llms files:", err);
  process.exit(1);
});
