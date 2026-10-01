/**
 * Pre-build script: regenerates the "## Key Pages" list in public/llms.txt
 * and writes public/llms-full.txt, both from live Sanity data.
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

async function main() {
  const llmsPath = path.join(ROOT, "public", "llms.txt");
  const existing = fs.readFileSync(llmsPath, "utf-8");
  const idx = existing.indexOf(KEY_PAGES_HEADING);
  const head = (idx === -1 ? existing : existing.slice(0, idx)).trimEnd();

  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(coalesce(_updatedAt, publishedAt) desc) {
      "slug": slug.current, title, excerpt, publishedAt, _updatedAt, seo
    }`
  );

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
