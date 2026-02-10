/**
 * WordPress → Sanity CMS Migration Script
 *
 * Migrates 138 blog posts + 13 categories from WordPress export JSON
 * into the Sanity "production" dataset.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/migrate-to-sanity.mjs
 *
 * Prerequisites:
 *   - docs/wordpress-export/posts.json (from WP REST API)
 *   - docs/wordpress-export/categories.json (from WP REST API)
 *   - A Sanity API token with Editor or higher permissions
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

let keyCounter = 0;
function generateKey() {
  return crypto.randomBytes(6).toString("hex");
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8211;/g, "–").replace(/&#8212;/g, "—").replace(/&nbsp;/g, " ").replace(/&#8230;/g, "…").replace(/&quot;/g, '"').trim();
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
    protocol.get(url, { headers: { "User-Agent": "SanityMigration/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
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

// ─── Image Upload Cache ──────────────────────────────────────────────────────

const imageCache = new Map(); // url → { _type, asset: { _ref, _type } }

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

// ─── HTML → Portable Text Converter ─────────────────────────────────────────

function htmlToPortableText(html) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const blocks = [];

  // Process top-level elements in <body>
  const body = $("body");
  body.contents().each((_, el) => {
    processElement($, el, blocks, null, null);
  });

  // Filter out empty blocks
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
    // Standalone text outside block elements — wrap in paragraph
    const text = decodeEntities($(el).text());
    if (text.trim()) {
      blocks.push(makeBlock("normal", [makeSpan(text)], listType, listLevel));
    }
    return;
  }

  if (el.type !== "tag") return;

  const tag = el.tagName.toLowerCase();

  // Skip style and script tags
  if (tag === "style" || tag === "script") return;

  // Headings
  if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
    // Map h5/h6 → h4 (schema only has h2, h3, h4)
    const style = ["h5", "h6"].includes(tag) ? "h4" : tag === "h1" ? "h2" : tag;
    const { children, markDefs } = extractInlineContent($, el);
    blocks.push(makeBlock(style, children, null, null, markDefs));
    return;
  }

  // Paragraphs
  if (tag === "p") {
    const { children, markDefs } = extractInlineContent($, el);
    blocks.push(makeBlock("normal", children, listType, listLevel, markDefs));
    return;
  }

  // Blockquote
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

  // Lists
  if (tag === "ul" || tag === "ol") {
    const lt = tag === "ul" ? "bullet" : "number";
    const level = (listLevel || 0) + 1;
    $(el)
      .children("li")
      .each((_, li) => {
        // Direct text content of the li
        const { children, markDefs } = extractInlineContent($, li, true);
        if (children.length > 0) {
          blocks.push(makeBlock("normal", children, lt, level, markDefs));
        }
        // Nested lists inside this li
        $(li)
          .children("ul, ol")
          .each((_, nestedList) => {
            processElement($, nestedList, blocks, null, level);
          });
      });
    return;
  }

  // Horizontal rule — skip (no equivalent in our PT schema)
  if (tag === "hr") return;

  // Figure — could be table or image
  if (tag === "figure") {
    // Check if it wraps a table
    const table = $(el).find("table");
    if (table.length > 0) {
      blocks.push({
        _type: "rawHtml",
        _key: generateKey(),
        html: $.html(table),
      });
      return;
    }
    // Check if it wraps an image
    const img = $(el).find("img");
    if (img.length > 0) {
      // We'll handle images as placeholders with URL — actual upload happens later
      const src = img.attr("src") || "";
      const alt = img.attr("alt") || "";
      const caption =
        $(el).find("figcaption").text() || "";
      blocks.push({
        _type: "image",
        _key: generateKey(),
        _sanity_image_url: src, // temporary — replaced during upload
        alt: alt,
        caption: caption,
      });
      return;
    }
    return;
  }

  // Standalone table (not in figure)
  if (tag === "table") {
    blocks.push({
      _type: "rawHtml",
      _key: generateKey(),
      html: $.html(el),
    });
    return;
  }

  // Standalone img (not in figure)
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

  // Div, span — treat as containers, recurse into children
  if (tag === "div" || tag === "span" || tag === "section") {
    $(el)
      .contents()
      .each((_, child) => {
        processElement($, child, blocks, listType, listLevel);
      });
    return;
  }

  // br at top level — skip
  if (tag === "br") return;

  // Fallback — try to extract text
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

    // Skip nested lists (handled separately in processElement)
    if (skipNestedLists && (tag === "ul" || tag === "ol")) return;

    // Skip style/script
    if (tag === "style" || tag === "script") return;

    // Bold
    if (tag === "strong" || tag === "b") {
      $(node)
        .contents()
        .each((_, child) => {
          walkInline(child, [...activeMarks, "strong"]);
        });
      return;
    }

    // Italic
    if (tag === "em" || tag === "i") {
      $(node)
        .contents()
        .each((_, child) => {
          walkInline(child, [...activeMarks, "em"]);
        });
      return;
    }

    // Underline
    if (tag === "u") {
      $(node)
        .contents()
        .each((_, child) => {
          walkInline(child, [...activeMarks, "underline"]);
        });
      return;
    }

    // Links
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
        .each((_, child) => {
          walkInline(child, [...activeMarks, markKey]);
        });
      return;
    }

    // Line break
    if (tag === "br") {
      children.push(makeSpan("\n", [...activeMarks]));
      return;
    }

    // Span, sup, sub, small, mark — treat as transparent containers
    if (["span", "sup", "sub", "small", "mark", "abbr", "cite", "code"].includes(tag)) {
      $(node)
        .contents()
        .each((_, child) => {
          walkInline(child, [...activeMarks]);
        });
      return;
    }

    // Fallback for other inline elements
    $(node)
      .contents()
      .each((_, child) => {
        walkInline(child, [...activeMarks]);
      });
  }

  $(el)
    .contents()
    .each((_, child) => {
      walkInline(child, []);
    });

  return { children, markDefs };
}

// ─── Main Migration ──────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  WordPress → Sanity Migration            ║");
  console.log("╚══════════════════════════════════════════╝\n");

  // Load exported data
  const postsPath = path.join(ROOT, "docs/wordpress-export/posts.json");
  const catsPath = path.join(ROOT, "docs/wordpress-export/categories.json");

  if (!fs.existsSync(postsPath) || !fs.existsSync(catsPath)) {
    console.error("ERROR: Export files not found. Run WordPress export first.");
    process.exit(1);
  }

  const wpPosts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
  const wpCategories = JSON.parse(fs.readFileSync(catsPath, "utf-8"));

  console.log(`Loaded ${wpPosts.length} posts and ${wpCategories.length} categories.\n`);

  // ─── Step 1: Import Categories ───────────────────────────────────────────

  console.log("━━━ Step 1: Importing Categories ━━━");
  const wpIdToSanityId = new Map(); // WP category ID → Sanity document ID

  for (const cat of wpCategories) {
    const docId = `wp-category-${cat.id}`;
    const doc = {
      _id: docId,
      _type: "category",
      title: decodeEntities(cat.name),
      slug: { _type: "slug", current: cat.slug },
    };

    await client.createOrReplace(doc);
    wpIdToSanityId.set(cat.id, docId);
    console.log(`  ✓ ${cat.name} (${cat.slug})`);
  }
  console.log(`\n  ${wpCategories.length} categories imported.\n`);

  // ─── Step 2: Import Posts ────────────────────────────────────────────────

  console.log("━━━ Step 2: Importing Posts ━━━\n");

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < wpPosts.length; i++) {
    const wp = wpPosts[i];
    const title = decodeEntities(wp.title.rendered);
    const slug = wp.slug;
    const num = `[${i + 1}/${wpPosts.length}]`;

    console.log(`${num} ${title}`);

    try {
      // 2a. Upload featured image
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

      // 2b. Convert HTML content → Portable Text
      const htmlContent = wp.content.rendered;
      let ptBlocks = htmlToPortableText(htmlContent);

      // 2c. Upload any inline images found in content
      for (let j = 0; j < ptBlocks.length; j++) {
        const block = ptBlocks[j];
        if (block._type === "image" && block._sanity_image_url) {
          const imgUrl = block._sanity_image_url;
          console.log(`  ↓ Uploading inline image...`);
          const imgRef = await uploadImageFromUrl(imgUrl);
          if (imgRef) {
            ptBlocks[j] = {
              _type: "image",
              _key: block._key,
              asset: imgRef.asset,
              alt: block.alt || "",
              caption: block.caption || "",
            };
          } else {
            // Remove failed image block
            ptBlocks[j] = null;
          }
        }
      }
      ptBlocks = ptBlocks.filter(Boolean);

      // 2d. Extract excerpt (strip HTML from WP excerpt)
      const excerpt = stripHtml(wp.excerpt.rendered).substring(0, 200);

      // 2e. Build category references
      const categoryRefs = (wp.categories || [])
        .filter((catId) => wpIdToSanityId.has(catId))
        .map((catId) => ({
          _type: "reference",
          _ref: wpIdToSanityId.get(catId),
          _key: generateKey(),
        }));

      // 2f. Extract SEO data from Yoast
      const yoast = wp.yoast_head_json || {};
      const ogImages = yoast.og_image || [];
      let seoOgImage = null;
      if (ogImages.length > 0 && ogImages[0].url) {
        seoOgImage = await uploadImageFromUrl(ogImages[0].url);
      }

      const seo = {
        _type: "seo",
        metaTitle: yoast.title
          ? decodeEntities(yoast.title)
          : undefined,
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

      // 2g. Build and save the post document
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
      console.log(`  ✓ Saved (${slug})`);
    } catch (err) {
      errorCount++;
      console.error(`  ✗ ERROR: ${err.message}`);
    }

    // Small delay to avoid rate limiting
    if (i % 10 === 9) {
      await sleep(500);
    }
  }

  // ─── Summary ─────────────────────────────────────────────────────────────

  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║  Migration Complete                      ║");
  console.log("╚══════════════════════════════════════════╝");
  console.log(`  Categories: ${wpCategories.length}`);
  console.log(`  Posts OK:    ${successCount}`);
  console.log(`  Posts FAIL:  ${errorCount}`);
  console.log(`  Images:      ${imageCache.size} unique uploaded`);
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
