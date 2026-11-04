/**
 * One-off migration: export every Sanity blog post and category into this repo
 * (CRET-12), so the site renders blogs from committed files and Sanity can be
 * removed.
 *
 *   node scripts/export-sanity-to-repo.mjs            # posts + categories + images
 *   node scripts/export-sanity-to-repo.mjs --no-images
 *   node scripts/export-sanity-to-repo.mjs --slug=<slug>   # one post, for testing
 *
 * WHAT IT WRITES
 *   src/content/blog/posts/<slug>.json   one file per post, the Sanity document
 *                                        fields VERBATIM (body still Portable Text)
 *   src/content/blog/categories.json     all categories (title + slug)
 *   src/content/blog/index.json          light list for listing pages, so a
 *                                        listing never loads 180 full bodies
 *   public/images/blog/<slug>-1200.webp  article image  (= CDN w=1200&auto=format)
 *   public/images/blog/<slug>-600.webp   card image     (= CDN w=600&auto=format)
 *   public/images/blog/og/<slug>.jpg     share preview  (= CDN w=1200&h=630&fm=jpg)
 *
 * WHY THE BODY IS NOT CONVERTED
 *   64 posts carry rawHtml blocks (60 tables, 47 scoped <style> blocks) imported
 *   from WordPress. They are rendered by PortableTextRenderer today. Keeping the
 *   body as Portable Text means the SAME renderer runs on the SAME data, so the
 *   output HTML is unchanged by construction rather than by review.
 *
 * WHY THE TEXT IS NOT NORMALIZED HERE
 *   src/lib/sanity-text.ts (americanize: "Nepali", American spelling, month-first
 *   dates) runs on every read today. It is a pure function with no Sanity
 *   dependency, so it keeps running in the new data layer. Stored files therefore
 *   hold the raw text and the rendered text stays identical. Do not bake it in.
 *
 * IMAGES
 *   The article and card renditions are fetched with "Accept: image/webp", which
 *   is what a browser sends, so the bytes written are the bytes browsers already
 *   receive from the CDN today. The share preview is requested as JPEG (fm=jpg):
 *   Sanity serves PNG there today, up to 1.6 MB, because OG crawlers do not
 *   negotiate webp. JPEG at q=80 is ~83 KB and universally supported.
 */
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "src", "content", "blog");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const IMG_DIR = path.join(ROOT, "public", "images", "blog");
const OG_DIR = path.join(IMG_DIR, "og");

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "vd27cmpc";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-10";

const args = process.argv.slice(2);
const SKIP_IMAGES = args.includes("--no-images");
const ONLY_SLUG = (args.find((a) => a.startsWith("--slug=")) || "").split("=")[1] || null;

// Raw client: NO normalizer. The data layer normalizes at read time, exactly as
// src/lib/sanity.ts does today, so what is stored here stays a faithful archive.
const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: API_VERSION, useCdn: false });

// Every field any consumer reads today (postBySlugQuery is the widest), plus _id
// so category membership can be resolved without a second round trip.
const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id, _type, _createdAt, _updatedAt, _rev,
  title, slug, publishedAt, excerpt, content, featuredImage, infoBox,
  categories[]->{ _id, title, slug },
  seo, faqItems
}`;
const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) { _id, title, slug, _updatedAt }`;

/** image-<hash>-<WxH>-<ext> -> the CDN base URL for that asset. */
function cdnBase(ref) {
  const m = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(ref || "");
  if (!m) return null;
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${m[1]}-${m[2]}.${m[3]}`;
}

async function download(url, dest, accept) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { headers: accept ? { Accept: accept } : {} });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length === 0) throw new Error("empty body");
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, buf);
      return buf.length;
    } catch (err) {
      if (attempt === 4) throw new Error(`${url} failed after 4 tries: ${err.message}`);
      await new Promise((r) => setTimeout(r, 400 * attempt));
    }
  }
}

/**
 * Downloads the three renditions a post needs and returns the local-image object
 * that replaces Sanity's { asset: { _ref } }. The _sanityRef is kept so an asset
 * can always be traced back to the document it came from.
 */
async function localizeImages(post, stats) {
  const slug = post.slug?.current;
  const featured = post.featuredImage;
  if (!slug || !featured?.asset?._ref) return null;

  const base = cdnBase(featured.asset._ref);
  if (!base) {
    stats.imageErrors.push(`${slug}: unparseable asset ref ${featured.asset._ref}`);
    return null;
  }
  // seo.ogImage wins for the share preview when the post sets one (133 do).
  const ogRef = post.seo?.ogImage?.asset?._ref || featured.asset._ref;
  const ogBase = cdnBase(ogRef) || base;

  const out = {
    _type: "localImage",
    article: `/images/blog/${slug}-1200.webp`,
    card: `/images/blog/${slug}-600.webp`,
    og: `/images/blog/og/${slug}.jpg`,
    alt: featured.alt || null,
    caption: featured.caption || null,
    _sanityRef: featured.asset._ref,
    ...(post.seo?.ogImage?.asset?._ref ? { _sanityOgRef: post.seo.ogImage.asset._ref } : {}),
  };
  if (SKIP_IMAGES) return out;

  const WEBP = "image/webp,image/*";
  // Each size is awaited into a local first, then added once. `stats.bytes +=
  // await ...` would read the counter before the await and write it after, so
  // six concurrent workers would lose most of the additions.
  const article = await download(`${base}?w=1200&auto=format`, path.join(IMG_DIR, `${slug}-1200.webp`), WEBP);
  const card = await download(`${base}?w=600&auto=format`, path.join(IMG_DIR, `${slug}-600.webp`), WEBP);
  const og = await download(`${ogBase}?w=1200&h=630&fm=jpg&q=80`, path.join(OG_DIR, `${slug}.jpg`), "image/jpeg,image/*");
  stats.bytes = stats.bytes + article + card + og;
  stats.images = stats.images + 3;
  return out;
}

/** Runs tasks with a small concurrency limit so the CDN is not hammered. */
async function pool(items, limit, worker) {
  let i = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx], idx);
    }
  });
  await Promise.all(runners);
}

async function main() {
  console.log(`Exporting from Sanity ${PROJECT_ID}/${DATASET} (api ${API_VERSION})`);
  const [allPosts, categories] = await Promise.all([client.fetch(POSTS_QUERY), client.fetch(CATEGORIES_QUERY)]);
  const posts = ONLY_SLUG ? allPosts.filter((p) => p.slug?.current === ONLY_SLUG) : allPosts;
  if (ONLY_SLUG && posts.length === 0) throw new Error(`No post with slug "${ONLY_SLUG}"`);
  console.log(`  ${allPosts.length} posts, ${categories.length} categories`);

  // A post with no slug can never be rendered; a duplicate slug would silently
  // overwrite a file. Both are fatal: stop rather than export a wrong set.
  const noSlug = posts.filter((p) => !p.slug?.current).map((p) => p._id);
  if (noSlug.length) throw new Error(`Posts without a slug: ${noSlug.join(", ")}`);
  const byLower = new Map();
  for (const p of posts) {
    const k = p.slug.current.toLowerCase();
    byLower.set(k, [...(byLower.get(k) || []), p.slug.current]);
  }
  const collisions = [...byLower.values()].filter((v) => v.length > 1);
  // Case-only collisions matter: the build runs on a case-sensitive filesystem,
  // this machine's is not, so they would pass locally and break in Docker.
  if (collisions.length) throw new Error(`Slugs colliding case-insensitively: ${JSON.stringify(collisions)}`);

  fs.mkdirSync(POSTS_DIR, { recursive: true });
  const stats = { images: 0, bytes: 0, imageErrors: [], noImage: [] };

  await pool(posts, 6, async (post) => {
    const slug = post.slug.current;
    const featuredImage = await localizeImages(post, stats);
    if (!featuredImage) stats.noImage.push(slug);

    const doc = {
      _id: post._id,
      _type: "post",
      _createdAt: post._createdAt,
      _updatedAt: post._updatedAt,
      title: post.title,
      slug: post.slug,
      publishedAt: post.publishedAt ?? null,
      excerpt: post.excerpt ?? null,
      // Portable Text, verbatim, rawHtml blocks included. Do not transform.
      content: post.content ?? [],
      featuredImage,
      infoBox: post.infoBox ?? null,
      categories: (post.categories || []).map((c) => ({ _id: c._id, title: c.title, slug: c.slug })),
      // ogImage is replaced by featuredImage.og above; the rest of seo is kept.
      seo: post.seo ? { ...post.seo, ogImage: undefined } : null,
      faqItems: post.faqItems ?? null,
      _exportedAt: new Date().toISOString(),
    };
    fs.writeFileSync(path.join(POSTS_DIR, `${slug}.json`), `${JSON.stringify(doc, null, 2)}\n`);
  });

  fs.writeFileSync(
    path.join(CONTENT_DIR, "categories.json"),
    `${JSON.stringify(categories.map((c) => ({ _id: c._id, title: c.title, slug: c.slug, _updatedAt: c._updatedAt })), null, 2)}\n`,
  );

  // Listing pages (/blogs, /category/<slug>, country pages) need title, excerpt,
  // image, date and categories only. Keeping that in one small file means a
  // listing build never reads 180 bodies.
  if (!ONLY_SLUG) {
    const index = posts.map((p) => ({
      slug: p.slug.current,
      title: p.title,
      excerpt: p.excerpt ?? null,
      publishedAt: p.publishedAt ?? null,
      updatedAt: p._updatedAt ?? null,
      categories: (p.categories || []).map((c) => ({ slug: c.slug.current, title: c.title })),
      noIndex: p.seo?.noIndex === true,
      // generate-llms.mjs builds each line from seo.metaTitle / metaDescription
      // with a fallback to title / excerpt, so both must be in the index.
      seo: { metaTitle: p.seo?.metaTitle ?? null, metaDescription: p.seo?.metaDescription ?? null },
    }));
    fs.writeFileSync(path.join(CONTENT_DIR, "index.json"), `${JSON.stringify(index, null, 2)}\n`);
  }

  console.log(`\nWrote ${posts.length} post files to src/content/blog/posts/`);
  console.log(`  categories.json: ${categories.length}`);
  if (!SKIP_IMAGES) console.log(`  images: ${stats.images} files, ${(stats.bytes / 1048576).toFixed(1)} MB`);
  if (stats.noImage.length) console.log(`  posts with no featured image (${stats.noImage.length}): ${stats.noImage.join(", ")}`);
  if (stats.imageErrors.length) {
    console.log(`\n  IMAGE PROBLEMS (${stats.imageErrors.length}):`);
    for (const e of stats.imageErrors) console.log(`    ${e}`);
  }
}

main().catch((err) => {
  console.error(`\nExport failed: ${err.message}`);
  process.exit(1);
});
