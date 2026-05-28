/**
 * Add Missing WordPress Posts to Sanity CMS
 *
 * Fetches 3 missing blog posts from wp-old.admizzeducation.com
 * and imports them into Sanity with full content, images, and SEO.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/add-missing-posts.mjs
 *
 * Missing posts:
 *   1. study-in-the-uk-after-2-from-nepal-complete-2025-guide
 *   2. how-to-get-your-noc-from-nepal-for-study-abroad
 *   3. iccr-scholarship-2026-study-in-india
 */

import { createClient } from "@sanity/client";
import * as cheerio from "cheerio";
import https from "https";
import http from "http";
import path from "path";
import crypto from "crypto";

// ─── Configuration ───────────────────────────────────────────────────────────

const SANITY_PROJECT_ID = "vd27cmpc";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2026-02-10";

const WP_API_BASE = "https://wp-old.admizzeducation.com/wp-json/wp/v2";

const MISSING_SLUGS = [
  "study-in-the-uk-after-2-from-nepal-complete-2025-guide",
  "how-to-get-your-noc-from-nepal-for-study-abroad",
  "iccr-scholarship-2026-study-in-india",
];

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

// ─── Helpers (same as original migration) ────────────────────────────────────

function generateKey() {
  return crypto.randomBytes(6).toString("hex");
}

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8230;/g, "…")
    .replace(/&quot;/g, '"')
    .trim();
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8230;/g, "…")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&#8243;/g, "″")
    .replace(/&#8242;/g, "′")
    .replace(/&#(?:x([0-9a-fA-F]+)|(\d+));/g, (_, hex, dec) =>
      String.fromCharCode(hex ? parseInt(hex, 16) : parseInt(dec, 10))
    );
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol
      .get(
        url,
        { headers: { "User-Agent": "SanityMigration/1.0" } },
        (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            return downloadFile(res.headers.location)
              .then(resolve)
              .catch(reject);
          }
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          }
          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => resolve(Buffer.concat(chunks)));
          res.on("error", reject);
        }
      )
      .on("error", reject);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { "User-Agent": "SanityMigration/1.0" } },
        (res) => {
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          }
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve(JSON.parse(data)));
          res.on("error", reject);
        }
      )
      .on("error", reject);
  });
}

// ─── Image Upload Cache ──────────────────────────────────────────────────────

const imageCache = new Map();

async function uploadImageFromUrl(url) {
  if (!url) return null;
  if (imageCache.has(url)) return imageCache.get(url);

  try {
    const buffer = await downloadFile(url);
    const filename = path.basename(new URL(url).pathname);
    const contentType = filename.endsWith(".webp")
      ? "image/webp"
      : filename.endsWith(".png")
        ? "image/png"
        : filename.endsWith(".svg")
          ? "image/svg+xml"
          : filename.endsWith(".gif")
            ? "image/gif"
            : "image/jpeg";

    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType,
    });

    const ref = {
      _type: "image",
      asset: { _ref: asset._id, _type: "reference" },
    };
    imageCache.set(url, ref);
    return ref;
  } catch (err) {
    console.warn(`  ⚠ Failed to upload image: ${url} — ${err.message}`);
    return null;
  }
}

// ─── HTML → Portable Text (same as original migration) ──────────────────────

function htmlToPortableText(html) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const blocks = [];
  const body = $("body");
  body.contents().each((_, el) => {
    processElement($, el, blocks, null, null);
  });
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
    if (text.trim()) {
      blocks.push(makeBlock("normal", [makeSpan(text)], listType, listLevel));
    }
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
    $(el)
      .children()
      .each((_, child) => {
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
    $(el)
      .children("li")
      .each((_, li) => {
        const { children, markDefs } = extractInlineContent($, li, true);
        if (children.length > 0) {
          blocks.push(makeBlock("normal", children, lt, level, markDefs));
        }
        $(li)
          .children("ul, ol")
          .each((_, nestedList) => {
            processElement($, nestedList, blocks, null, level);
          });
      });
    return;
  }
  if (tag === "hr") return;
  if (tag === "figure") {
    const table = $(el).find("table");
    if (table.length > 0) {
      blocks.push({
        _type: "rawHtml",
        _key: generateKey(),
        html: $.html(table),
      });
      return;
    }
    const img = $(el).find("img");
    if (img.length > 0) {
      const src = img.attr("src") || "";
      const alt = img.attr("alt") || "";
      const caption = $(el).find("figcaption").text() || "";
      blocks.push({
        _type: "image",
        _key: generateKey(),
        _sanity_image_url: src,
        alt: alt,
        caption: caption,
      });
      return;
    }
    return;
  }
  if (tag === "table") {
    blocks.push({
      _type: "rawHtml",
      _key: generateKey(),
      html: $.html(el),
    });
    return;
  }
  if (tag === "img") {
    const src = $(el).attr("src") || "";
    const alt = $(el).attr("alt") || "";
    blocks.push({
      _type: "image",
      _key: generateKey(),
      _sanity_image_url: src,
      alt: alt,
      caption: "",
    });
    return;
  }
  if (tag === "div" || tag === "span" || tag === "section") {
    $(el)
      .contents()
      .each((_, child) => {
        processElement($, child, blocks, listType, listLevel);
      });
    return;
  }
  if (tag === "br") return;
  const text = $(el).text().trim();
  if (text) {
    blocks.push(makeBlock("normal", [makeSpan(decodeEntities(text))]));
  }
}

function makeBlock(style, children, listType, listLevel, markDefs) {
  const block = {
    _type: "block",
    _key: generateKey(),
    style: style || "normal",
    children: children.length > 0 ? children : [makeSpan("")],
    markDefs: markDefs || [],
  };
  if (listType) {
    block.listItem = listType;
    block.level = listLevel || 1;
  }
  return block;
}

function makeSpan(text, marks) {
  return {
    _type: "span",
    _key: generateKey(),
    text: text,
    marks: marks || [],
  };
}

function extractInlineContent($, el, skipNestedLists) {
  const children = [];
  const markDefs = [];

  function walkInline(node, activeMarks) {
    if (node.type === "text") {
      const text = decodeEntities($(node).text());
      if (text) {
        children.push(makeSpan(text, [...activeMarks]));
      }
      return;
    }
    if (node.type !== "tag") return;
    const tag = node.tagName.toLowerCase();
    if (skipNestedLists && (tag === "ul" || tag === "ol")) return;
    if (tag === "style" || tag === "script") return;
    if (tag === "strong" || tag === "b") {
      $(node)
        .contents()
        .each((_, child) => walkInline(child, [...activeMarks, "strong"]));
      return;
    }
    if (tag === "em" || tag === "i") {
      $(node)
        .contents()
        .each((_, child) => walkInline(child, [...activeMarks, "em"]));
      return;
    }
    if (tag === "u") {
      $(node)
        .contents()
        .each((_, child) => walkInline(child, [...activeMarks, "underline"]));
      return;
    }
    if (tag === "a") {
      const href = $(node).attr("href") || "";
      const target = $(node).attr("target") || "";
      const markKey = generateKey();
      markDefs.push({
        _type: "link",
        _key: markKey,
        href: href,
        blank: target === "_blank",
      });
      $(node)
        .contents()
        .each((_, child) => walkInline(child, [...activeMarks, markKey]));
      return;
    }
    if (tag === "br") {
      children.push(makeSpan("\n", [...activeMarks]));
      return;
    }
    if (
      [
        "span",
        "sup",
        "sub",
        "small",
        "mark",
        "abbr",
        "cite",
        "code",
      ].includes(tag)
    ) {
      $(node)
        .contents()
        .each((_, child) => walkInline(child, [...activeMarks]));
      return;
    }
    $(node)
      .contents()
      .each((_, child) => walkInline(child, [...activeMarks]));
  }

  $(el)
    .contents()
    .each((_, child) => walkInline(child, []));

  return { children, markDefs };
}

// ─── Fetch existing category mappings from Sanity ────────────────────────────

async function getCategoryMap() {
  const categories = await client.fetch(
    '*[_type == "category"]{ _id, title, "slug": slug.current }'
  );
  const map = new Map();
  for (const cat of categories) {
    map.set(cat.slug, cat._id);
  }
  return map;
}

// ─── Fetch WP category slug by ID ───────────────────────────────────────────

const wpCategoryCache = new Map();

async function getWpCategorySlug(catId) {
  if (wpCategoryCache.has(catId)) return wpCategoryCache.get(catId);
  try {
    const data = await fetchJson(
      `${WP_API_BASE}/categories/${catId}?_fields=slug`
    );
    wpCategoryCache.set(catId, data.slug);
    return data.slug;
  } catch {
    return null;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  Adding Missing Posts to Sanity           ║");
  console.log("╚══════════════════════════════════════════╝\n");

  // Get Sanity category mappings
  const categoryMap = await getCategoryMap();
  console.log(`Loaded ${categoryMap.size} categories from Sanity.\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const slug of MISSING_SLUGS) {
    console.log(`━━━ Fetching: ${slug} ━━━`);

    try {
      // Fetch post from WP API
      const posts = await fetchJson(
        `${WP_API_BASE}/posts?slug=${slug}&_embed`
      );
      if (!posts || posts.length === 0) {
        console.error(`  ✗ Post not found on WP: ${slug}`);
        errorCount++;
        continue;
      }

      const wp = posts[0];
      const title = decodeEntities(wp.title.rendered);
      console.log(`  Title: ${title}`);

      // Upload featured image
      let featuredImage = null;
      const embedded = wp._embedded || {};
      const featMedia = (embedded["wp:featuredmedia"] || [])[0];
      if (featMedia && featMedia.source_url) {
        console.log(`  ↓ Uploading featured image...`);
        const imgRef = await uploadImageFromUrl(featMedia.source_url);
        if (imgRef) {
          featuredImage = {
            ...imgRef,
            alt: featMedia.alt_text || title,
          };
        }
      }

      // Convert HTML → Portable Text
      const htmlContent = wp.content.rendered;
      let ptBlocks = htmlToPortableText(htmlContent);

      // Upload inline images
      for (let j = 0; j < ptBlocks.length; j++) {
        const block = ptBlocks[j];
        if (block._type === "image" && block._sanity_image_url) {
          console.log(`  ↓ Uploading inline image...`);
          const imgRef = await uploadImageFromUrl(block._sanity_image_url);
          if (imgRef) {
            ptBlocks[j] = {
              _type: "image",
              _key: block._key,
              asset: imgRef.asset,
              alt: block.alt || "",
              caption: block.caption || "",
            };
          } else {
            ptBlocks[j] = null;
          }
        }
      }
      ptBlocks = ptBlocks.filter(Boolean);

      // Extract excerpt
      const excerpt = stripHtml(wp.excerpt.rendered).substring(0, 200);

      // Build category references
      const categoryRefs = [];
      for (const catId of wp.categories || []) {
        const catSlug = await getWpCategorySlug(catId);
        if (catSlug && categoryMap.has(catSlug)) {
          categoryRefs.push({
            _type: "reference",
            _ref: categoryMap.get(catSlug),
            _key: generateKey(),
          });
        }
      }

      // Extract SEO data from Yoast
      const yoast = wp.yoast_head_json || {};
      const ogImages = yoast.og_image || [];
      let seoOgImage = null;
      if (ogImages.length > 0 && ogImages[0].url) {
        seoOgImage = await uploadImageFromUrl(ogImages[0].url);
      }

      const seo = {
        _type: "seo",
        metaTitle: yoast.title ? decodeEntities(yoast.title) : undefined,
        metaDescription: yoast.description
          ? decodeEntities(yoast.description)
          : undefined,
        canonicalUrl: yoast.canonical || undefined,
        noIndex:
          yoast.robots &&
          typeof yoast.robots === "object" &&
          yoast.robots.index === "noindex"
            ? true
            : false,
        ogImage: seoOgImage || undefined,
      };

      // Build and save the document
      const docId = `wp-post-${wp.id}`;
      const doc = {
        _id: docId,
        _type: "post",
        title: title,
        slug: { _type: "slug", current: slug },
        publishedAt: wp.date,
        excerpt: excerpt,
        content: ptBlocks,
        featuredImage: featuredImage || undefined,
        categories: categoryRefs.length > 0 ? categoryRefs : undefined,
        seo: seo,
      };

      await client.createOrReplace(doc);
      successCount++;
      console.log(`  ✓ Saved to Sanity!\n`);
    } catch (err) {
      errorCount++;
      console.error(`  ✗ ERROR: ${err.message}\n`);
    }

    await sleep(500);
  }

  // Summary
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  Migration Complete                      ║");
  console.log("╚══════════════════════════════════════════╝");
  console.log(`  Posts OK:   ${successCount}`);
  console.log(`  Posts FAIL: ${errorCount}`);
  console.log(`  Images:     ${imageCache.size} unique uploaded`);
  console.log();

  if (errorCount > 0) {
    console.log("⚠ Some posts failed. Re-run the script to retry (idempotent).");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
