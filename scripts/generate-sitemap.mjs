/**
 * Pre-build script: Generates public/sitemap.xml
 *
 * Fetches blog post slugs and category slugs from Sanity,
 * combines with static page paths, and writes sitemap.xml.
 *
 * Run before `next build` so the file gets copied to out/.
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BASE_URL = "https://admizzeducation.com";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "vd27cmpc",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-10",
  useCdn: true,
});

// Static pages with priorities (no trailing slashes, no thank-you/utility pages)
const staticPages = [
  { path: "/", priority: 1.0, freq: "daily" },
  { path: "/match-your-destination", priority: 0.9, freq: "monthly" },
  { path: "/about", priority: 0.8, freq: "monthly" },
  { path: "/contact", priority: 0.8, freq: "monthly" },
  { path: "/blogs", priority: 0.9, freq: "daily" },
  { path: "/register", priority: 0.8, freq: "monthly" },
  { path: "/test-prep", priority: 0.7, freq: "monthly" },
  { path: "/study-destinations", priority: 0.8, freq: "monthly" },
  { path: "/privacy-policy", priority: 0.3, freq: "yearly" },
  { path: "/universities", priority: 0.7, freq: "monthly" },
  { path: "/recruitment-partners", priority: 0.7, freq: "monthly" },
  { path: "/affiliate-program", priority: 0.8, freq: "monthly" },
  { path: "/affiliate-dashboard", priority: 0.5, freq: "monthly" },
  { path: "/careers", priority: 0.6, freq: "monthly" },
  // Country pages (main)
  { path: "/study-in-the-usa", priority: 0.8, freq: "monthly" },
  { path: "/study-in-the-uk", priority: 0.8, freq: "monthly" },
  { path: "/study-in-australia", priority: 0.8, freq: "monthly" },
  { path: "/study-in-canada", priority: 0.8, freq: "monthly" },
  { path: "/study-in-newzealand", priority: 0.8, freq: "monthly" },
  { path: "/study-in-south-korea", priority: 0.8, freq: "monthly" },
  { path: "/study-in-india", priority: 0.8, freq: "monthly" },
  { path: "/study-in-france", priority: 0.8, freq: "monthly" },
  { path: "/study-in-germany", priority: 0.8, freq: "monthly" },
  // Nepal variant pages
  { path: "/study-in-canada-from-nepal", priority: 0.7, freq: "monthly" },
  { path: "/study-in-south-korea-from-nepal", priority: 0.7, freq: "monthly" },
  { path: "/study-in-india-from-nepal", priority: 0.7, freq: "monthly" },
  { path: "/study-in-france-from-nepal", priority: 0.7, freq: "monthly" },
  { path: "/study-in-newzealand-from-nepal", priority: 0.7, freq: "monthly" },
  { path: "/study-in-uk-from-nepal", priority: 0.7, freq: "monthly" },
  { path: "/study-in-usa-from-nepal", priority: 0.7, freq: "monthly" },
  // SEO landing pages
  { path: "/best-education-consultancy-for-study-abroad", priority: 0.7, freq: "monthly" },
  { path: "/best-education-consultancy-in-nepal", priority: 0.7, freq: "monthly" },
  { path: "/education-consultancy-in-kathmandu", priority: 0.7, freq: "monthly" },
  { path: "/study-abroad-consultancy-in-nepal", priority: 0.7, freq: "monthly" },
  { path: "/overseas-education-consultants-in-nepal", priority: 0.7, freq: "monthly" },
  { path: "/top-education-consultancy-in-nepal", priority: 0.7, freq: "monthly" },
  { path: "/study-abroad-consultants-in-kathmandu", priority: 0.7, freq: "monthly" },
  // City landing pages
  { path: "/birgunj", priority: 0.7, freq: "monthly" },
  { path: "/janakpur", priority: 0.7, freq: "monthly" },
  // Campaign pages
  { path: "/campaign", priority: 0.5, freq: "monthly" },
  { path: "/campaign-uk", priority: 0.5, freq: "monthly" },
  // Event legal pages
  { path: "/events/spin-and-win-terms-and-conditions", priority: 0.3, freq: "yearly" },
  // World Cup 2026 campaign
  { path: "/events/worldcup-2026", priority: 0.7, freq: "weekly" },
];

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toISODate(dateStr) {
  try {
    return new Date(dateStr).toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

async function main() {
  console.log("Generating sitemap.xml...");

  // Fetch from Sanity
  const [posts, categories] = await Promise.all([
    client.fetch(`*[_type == "post"] | order(publishedAt desc) { "slug": slug.current, publishedAt }`),
    client.fetch(`*[_type == "category"] { "slug": slug.current }`),
  ]);

  console.log(`  Found ${posts.length} posts, ${categories.length} categories`);

  const today = new Date().toISOString().split("T")[0];

  let urls = [];

  // Static pages
  for (const page of staticPages) {
    urls.push({
      loc: `${BASE_URL}${page.path}`,
      lastmod: today,
      changefreq: page.freq,
      priority: page.priority,
    });
  }

  // Blog posts
  for (const post of posts) {
    urls.push({
      loc: `${BASE_URL}/${post.slug}`,
      lastmod: post.publishedAt ? toISODate(post.publishedAt) : today,
      changefreq: "monthly",
      priority: 0.6,
    });
  }

  // Categories
  for (const cat of categories) {
    urls.push({
      loc: `${BASE_URL}/category/${cat.slug}`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.5,
    });
  }

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  const outPath = path.join(ROOT, "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf-8");

  console.log(`  Written ${urls.length} URLs to public/sitemap.xml`);
  console.log(`    Static pages: ${staticPages.length}`);
  console.log(`    Blog posts:   ${posts.length}`);
  console.log(`    Categories:   ${categories.length}`);
  console.log("  Done!");
}

main().catch((err) => {
  console.error("Error generating sitemap:", err);
  process.exit(1);
});
