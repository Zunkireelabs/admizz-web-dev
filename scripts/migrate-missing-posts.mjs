/**
 * Migrate 7 Missing WordPress Posts → Sanity CMS
 *
 * These posts exist on admizzeducation.com but are missing from the dev Sanity dataset.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/migrate-missing-posts.mjs
 *
 * Prerequisites:
 *   - docs/wordpress-export/missing-posts.json (already scraped)
 *   - A Sanity API token with Editor or higher permissions
 *     Get one at: https://www.sanity.io/manage/project/vd27cmpc/api#tokens
 */

import { createClient } from "@sanity/client";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ─── Configuration ───────────────────────────────────────────────────────────

const SANITY_PROJECT_ID = "vd27cmpc";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2026-02-10";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("ERROR: Set SANITY_WRITE_TOKEN environment variable.");
  console.error(
    "Create a token at: https://www.sanity.io/manage/project/vd27cmpc/api#tokens"
  );
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token,
  useCdn: false,
});

// ─── Helpers (same as main migration script) ─────────────────────────────────

function generateKey() {
  return crypto.randomBytes(6).toString("hex");
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8211;/g, "–").replace(/&#8212;/g, "—").replace(/&nbsp;/g, " ").replace(/&#8230;/g, "…").replace(/&quot;/g, '"').trim();
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–").replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ").replace(/&#8230;/g, "…").replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&").replace(/&#8243;/g, "″").replace(/&#8242;/g, "′")
    .replace(/&#(?:x([0-9a-fA-F]+)|(\d+));/g, (_, hex, dec) =>
      String.fromCharCode(hex ? parseInt(hex, 16) : parseInt(dec, 10))
    );
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, { headers: { "User-Agent": "SanityMigration/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Image Upload ────────────────────────────────────────────────────────────

const imageCache = new Map();

async function uploadImageFromUrl(url) {
  if (!url) return null;
  if (imageCache.has(url)) return imageCache.get(url);
  try {
    const buffer = await downloadFile(url);
    const filename = path.basename(new URL(url).pathname);
    const contentType = filename.endsWith(".webp") ? "image/webp"
      : filename.endsWith(".png") ? "image/png"
      : filename.endsWith(".svg") ? "image/svg+xml"
      : filename.endsWith(".gif") ? "image/gif"
      : "image/jpeg";
    const asset = await client.assets.upload("image", buffer, { filename, contentType });
    const ref = { _type: "image", asset: { _ref: asset._id, _type: "reference" } };
    imageCache.set(url, ref);
    return ref;
  } catch (err) {
    console.warn(`  ⚠ Failed to upload image: ${url} — ${err.message}`);
    return null;
  }
}

// ─── HTML → Portable Text ────────────────────────────────────────────────────

function htmlToPortableText(html) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const blocks = [];
  $("body").contents().each((_, el) => processElement($, el, blocks, null, null));
  return blocks.filter((b) => {
    if (b._type === "image" || b._type === "rawHtml") return true;
    if (b._type === "block") {
      const text = (b.children || []).map((c) => c.text || "").join("");
      return text.trim().length > 0;
    }
    return true;
  });
}

function processElement($, el, blocks, listType, listLevel) {
  if (el.type === "text") {
    const text = decodeEntities($(el).text());
    if (text.trim()) blocks.push(makeBlock("normal", [makeSpan(text)], listType, listLevel));
    return;
  }
  if (el.type !== "tag") return;
  const tag = el.tagName.toLowerCase();
  if (tag === "style" || tag === "script") return;
  if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
    const style = ["h5", "h6"].includes(tag) ? "h4" : tag === "h1" ? "h2" : tag;
    const { children, markDefs } = extractInlineContent($, el);
    blocks.push(makeBlock(style, children, null, null, markDefs));
    return;
  }
  if (tag === "p") {
    const { children, markDefs } = extractInlineContent($, el);
    blocks.push(makeBlock("normal", children, listType, listLevel, markDefs));
    return;
  }
  if (tag === "blockquote") {
    $(el).children().each((_, child) => {
      if (child.tagName && child.tagName.toLowerCase() === "p") {
        const { children, markDefs } = extractInlineContent($, child);
        blocks.push(makeBlock("blockquote", children, null, null, markDefs));
      }
    });
    return;
  }
  if (tag === "ul" || tag === "ol") {
    const lt = tag === "ul" ? "bullet" : "number";
    const level = (listLevel || 0) + 1;
    $(el).children("li").each((_, li) => {
      const { children, markDefs } = extractInlineContent($, li, true);
      if (children.length > 0) blocks.push(makeBlock("normal", children, lt, level, markDefs));
      $(li).children("ul, ol").each((_, nestedList) => processElement($, nestedList, blocks, null, level));
    });
    return;
  }
  if (tag === "hr") return;
  if (tag === "figure") {
    const table = $(el).find("table");
    if (table.length > 0) { blocks.push({ _type: "rawHtml", _key: generateKey(), html: $.html(table) }); return; }
    const img = $(el).find("img");
    if (img.length > 0) {
      blocks.push({ _type: "image", _key: generateKey(), _sanity_image_url: img.attr("src") || "", alt: img.attr("alt") || "", caption: $(el).find("figcaption").text() || "" });
      return;
    }
    return;
  }
  if (tag === "table") { blocks.push({ _type: "rawHtml", _key: generateKey(), html: $.html(el) }); return; }
  if (tag === "img") { blocks.push({ _type: "image", _key: generateKey(), _sanity_image_url: $(el).attr("src") || "", alt: $(el).attr("alt") || "", caption: "" }); return; }
  if (tag === "div" || tag === "span" || tag === "section") {
    $(el).contents().each((_, child) => processElement($, child, blocks, listType, listLevel));
    return;
  }
  if (tag === "br") return;
  const text = $(el).text().trim();
  if (text) blocks.push(makeBlock("normal", [makeSpan(decodeEntities(text))]));
}

function makeBlock(style, children, listType, listLevel, markDefs) {
  const block = { _type: "block", _key: generateKey(), style: style || "normal", children: children.length > 0 ? children : [makeSpan("")], markDefs: markDefs || [] };
  if (listType) { block.listItem = listType; block.level = listLevel || 1; }
  return block;
}

function makeSpan(text, marks) {
  return { _type: "span", _key: generateKey(), text, marks: marks || [] };
}

function extractInlineContent($, el, skipNestedLists) {
  const children = [];
  const markDefs = [];
  function walkInline(node, activeMarks) {
    if (node.type === "text") { const text = decodeEntities($(node).text()); if (text) children.push(makeSpan(text, [...activeMarks])); return; }
    if (node.type !== "tag") return;
    const tag = node.tagName.toLowerCase();
    if (skipNestedLists && (tag === "ul" || tag === "ol")) return;
    if (tag === "style" || tag === "script") return;
    if (tag === "strong" || tag === "b") { $(node).contents().each((_, c) => walkInline(c, [...activeMarks, "strong"])); return; }
    if (tag === "em" || tag === "i") { $(node).contents().each((_, c) => walkInline(c, [...activeMarks, "em"])); return; }
    if (tag === "u") { $(node).contents().each((_, c) => walkInline(c, [...activeMarks, "underline"])); return; }
    if (tag === "a") {
      const markKey = generateKey();
      markDefs.push({ _type: "link", _key: markKey, href: $(node).attr("href") || "", blank: $(node).attr("target") === "_blank" });
      $(node).contents().each((_, c) => walkInline(c, [...activeMarks, markKey]));
      return;
    }
    if (tag === "br") { children.push(makeSpan("\n", [...activeMarks])); return; }
    $(node).contents().each((_, c) => walkInline(c, [...activeMarks]));
  }
  $(el).contents().each((_, child) => walkInline(child, []));
  return { children, markDefs };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  Migrate 7 Missing Posts → Sanity        ║");
  console.log("╚══════════════════════════════════════════╝\n");

  const postsPath = path.join(ROOT, "docs/wordpress-export/missing-posts.json");
  if (!fs.existsSync(postsPath)) {
    console.error("ERROR: missing-posts.json not found.");
    process.exit(1);
  }

  const wpPosts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
  console.log(`Loaded ${wpPosts.length} missing posts.\n`);

  // First, ensure categories exist — fetch existing ones from Sanity
  console.log("━━━ Checking categories ━━━");
  const existingCats = await client.fetch(`*[_type == "category"]{ _id, slug }`);
  const existingSlugs = new Map(existingCats.map((c) => [c.slug.current, c._id]));
  console.log(`  Found ${existingCats.length} existing categories in Sanity.\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < wpPosts.length; i++) {
    const wp = wpPosts[i];
    const title = decodeEntities(wp.title.rendered);
    const slug = wp.slug;
    const num = `[${i + 1}/${wpPosts.length}]`;

    console.log(`${num} ${title} (${slug})`);

    try {
      // Upload featured image
      let featuredImage = null;
      const embedded = wp._embedded || {};
      const featMedia = (embedded["wp:featuredmedia"] || [])[0];
      if (featMedia && featMedia.source_url) {
        console.log(`  ↓ Uploading featured image...`);
        const imgRef = await uploadImageFromUrl(featMedia.source_url);
        if (imgRef) featuredImage = { ...imgRef, alt: featMedia.alt_text || title };
      }

      // Convert HTML → Portable Text
      let ptBlocks = htmlToPortableText(wp.content.rendered);

      // Upload inline images
      for (let j = 0; j < ptBlocks.length; j++) {
        const block = ptBlocks[j];
        if (block._type === "image" && block._sanity_image_url) {
          console.log(`  ↓ Uploading inline image...`);
          const imgRef = await uploadImageFromUrl(block._sanity_image_url);
          if (imgRef) {
            ptBlocks[j] = { _type: "image", _key: block._key, asset: imgRef.asset, alt: block.alt || "", caption: block.caption || "" };
          } else {
            ptBlocks[j] = null;
          }
        }
      }
      ptBlocks = ptBlocks.filter(Boolean);

      // Excerpt
      const excerpt = stripHtml(wp.excerpt.rendered).substring(0, 200);

      // Category references — match by slug from embedded terms
      const wpTerms = (embedded["wp:term"] || []).flat();
      const categoryRefs = wpTerms
        .filter((t) => t.taxonomy === "category" && existingSlugs.has(t.slug))
        .map((t) => ({
          _type: "reference",
          _ref: existingSlugs.get(t.slug),
          _key: generateKey(),
        }));

      // If categories don't exist yet, create them
      for (const t of wpTerms.filter((t) => t.taxonomy === "category" && !existingSlugs.has(t.slug))) {
        const catId = `wp-category-${t.id}`;
        const catDoc = { _id: catId, _type: "category", title: decodeEntities(t.name), slug: { _type: "slug", current: t.slug } };
        await client.createOrReplace(catDoc);
        existingSlugs.set(t.slug, catId);
        categoryRefs.push({ _type: "reference", _ref: catId, _key: generateKey() });
        console.log(`  + Created category: ${t.name} (${t.slug})`);
      }

      // SEO
      const yoast = wp.yoast_head_json || {};
      const ogImages = yoast.og_image || [];
      let seoOgImage = null;
      if (ogImages.length > 0 && ogImages[0].url) {
        seoOgImage = await uploadImageFromUrl(ogImages[0].url);
      }

      const seo = {
        _type: "seo",
        metaTitle: yoast.title ? decodeEntities(yoast.title) : undefined,
        metaDescription: yoast.description ? decodeEntities(yoast.description) : undefined,
        canonicalUrl: yoast.canonical || undefined,
        noIndex: yoast.robots && typeof yoast.robots === "object" && yoast.robots.index === "noindex" ? true : false,
        ogImage: seoOgImage || undefined,
      };

      // Save to Sanity
      const docId = `wp-post-${wp.id}`;
      const doc = {
        _id: docId,
        _type: "post",
        title,
        slug: { _type: "slug", current: slug },
        publishedAt: wp.date,
        excerpt,
        content: ptBlocks,
        featuredImage: featuredImage || undefined,
        categories: categoryRefs.length > 0 ? categoryRefs : undefined,
        seo,
      };

      await client.createOrReplace(doc);
      successCount++;
      console.log(`  ✓ Saved to Sanity`);
    } catch (err) {
      errorCount++;
      console.error(`  ✗ ERROR: ${err.message}`);
    }

    await sleep(300);
  }

  // Also fix the Dubai → UAE slug mismatch
  console.log("\n━━━ Fixing slug mismatch: dubai → uae ━━━");
  try {
    const dubaiPost = await client.fetch(`*[_type == "post" && slug.current == "5-benefits-of-studying-in-dubai"][0]{ _id }`);
    if (dubaiPost) {
      await client.patch(dubaiPost._id).set({ "slug.current": "5-benefits-of-studying-in-uae" }).commit();
      console.log(`  ✓ Updated slug: 5-benefits-of-studying-in-dubai → 5-benefits-of-studying-in-uae`);
    } else {
      console.log(`  ⚠ Post with slug "5-benefits-of-studying-in-dubai" not found in Sanity`);
    }
  } catch (err) {
    console.error(`  ✗ Slug fix error: ${err.message}`);
  }

  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║  Migration Complete                      ║");
  console.log("╚══════════════════════════════════════════╝");
  console.log(`  Posts OK:    ${successCount}`);
  console.log(`  Posts FAIL:  ${errorCount}`);
  console.log(`  Images:      ${imageCache.size} unique uploaded`);
  console.log(`\n  After migration, rebuild the dev site: ./deploy.sh dev`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
