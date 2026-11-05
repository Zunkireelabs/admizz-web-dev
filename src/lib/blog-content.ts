/**
 * Blog content read from this repo (CRET-12) instead of from Sanity.
 *
 * Each function here replaces one GROQ query from the old src/lib/queries.ts and
 * returns the SAME shape that query returned, so every page and component that
 * consumed Sanity keeps its markup untouched:
 *
 *   allPostsQuery          -> getAllPosts()
 *   postBySlugQuery        -> getPostBySlug(slug)
 *   allPostSlugsQuery      -> getAllPostSlugs()
 *   allCategoriesQuery     -> getAllCategories()
 *   allCategorySlugsQuery  -> getAllCategorySlugs()
 *   postsByCategoryQuery   -> getPostsByCategory(categorySlug)
 *   relatedPostsQuery      -> getRelatedPosts(slug, categorySlugs)
 *
 * Three behaviours of the old queries are reproduced deliberately:
 *
 *  1. RETIRED POSTS. Every query filtered out `slug.current in retired-posts.json`.
 *     That filter lives in readPost()/index loading here, so a retired post is
 *     invisible through every accessor, exactly as before.
 *  2. ORDERING. `| order(publishedAt desc)` is applied as a date sort, with posts
 *     that have no date last (GROQ sorts nulls last on desc).
 *  3. NORMALIZED TEXT. the old Sanity client wrapped client.fetch in
 *     normalizeSanityResult (americanize: "Nepali", American spelling,
 *     month-first dates). The exported files hold the RAW text, so the same
 *     normalizer is applied here on read. Same function, same input, same output
 *     — which is what keeps rendered text identical to the Sanity-backed build.
 *
 * Files are read with fs at build time rather than imported. Everything on this
 * site is prerendered (output: "export"), so there is no runtime filesystem
 * access, and reading on demand keeps 181 post bodies out of the client bundle.
 */
import fs from "node:fs";
import path from "node:path";
import { normalizeSanityResult } from "./text-style";
import retired from "@/data/retired-posts.json";
import type { SanityPost, SanityCategory } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");

const RETIRED = new Set<string>(retired.slugs);

/** One entry of src/content/blog/index.json — listing fields only, no body. */
interface BlogIndexEntry {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  categories: { slug: string; title: string }[];
  noIndex: boolean;
}

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

// Read once per build. A Next build imports this module once per route worker,
// so caching here turns ~40 consumers into one read of each file. Skipped under
// `next dev` so an edit to a post file shows up on refresh without a restart.
const CACHE = process.env.NODE_ENV === "production";
let indexCache: BlogIndexEntry[] | null = null;
let categoriesCache: SanityCategory[] | null = null;
const postCache = new Map<string, SanityPost | null>();

function blogIndex(): BlogIndexEntry[] {
  if (!CACHE || !indexCache) {
    const all = readJson<BlogIndexEntry[]>(path.join(CONTENT_DIR, "index.json"));
    indexCache = all.filter((e) => !RETIRED.has(e.slug)).sort(byPublishedDesc);
  }
  return indexCache;
}

function byPublishedDesc(a: { publishedAt: string | null }, b: { publishedAt: string | null }): number {
  // GROQ's `order(publishedAt desc)` puts missing values last.
  if (!a.publishedAt && !b.publishedAt) return 0;
  if (!a.publishedAt) return 1;
  if (!b.publishedAt) return -1;
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/**
 * The full post, in the shape postBySlugQuery returned. Retired slugs and
 * missing files both give null, so a caller's notFound() path is unchanged.
 */
export function getPostBySlug(slug: string): SanityPost | null {
  if (CACHE && postCache.has(slug)) return postCache.get(slug) ?? null;
  let post: SanityPost | null = null;
  if (!RETIRED.has(slug)) {
    const file = path.join(POSTS_DIR, `${slug}.json`);
    // Guard against a slug escaping the content directory (e.g. "../secrets").
    if (file.startsWith(POSTS_DIR + path.sep) && fs.existsSync(file)) {
      post = normalizeSanityResult(readJson<SanityPost>(file));
    }
  }
  if (CACHE) postCache.set(slug, post);
  return post;
}

/** Listing shape: the fields allPostsQuery projected, newest first. */
export function getAllPosts(): SanityPost[] {
  return blogIndex().map(toListPost);
}

export function getAllPostSlugs(): { slug: string }[] {
  return blogIndex().map((e) => ({ slug: e.slug }));
}

export function getPostsByCategory(categorySlug: string): SanityPost[] {
  return blogIndex()
    .filter((e) => e.categories.some((c) => c.slug === categorySlug))
    .map(toListPost);
}

export function getRelatedPosts(slug: string, categorySlugs: string[]): SanityPost[] {
  const wanted = new Set(categorySlugs);
  return blogIndex()
    .filter((e) => e.slug !== slug && e.categories.some((c) => wanted.has(c.slug)))
    .slice(0, 3)
    .map(toListPost);
}

export function getAllCategories(): SanityCategory[] {
  if (!CACHE || !categoriesCache) {
    const cats = readJson<SanityCategory[]>(path.join(CONTENT_DIR, "categories.json"));
    categoriesCache = normalizeSanityResult(
      [...cats].sort((a, b) => a.title.localeCompare(b.title)),
    );
  }
  return categoriesCache;
}

export function getAllCategorySlugs(): { slug: string }[] {
  return getAllCategories().map((c) => ({ slug: c.slug.current }));
}

/** Posts a sitemap should list: non-retired, minus noIndex. */
export function getPostsForSitemap(): { slug: string; publishedAt: string | null; _updatedAt: string | null }[] {
  return blogIndex()
    .filter((e) => !e.noIndex)
    .map((e) => ({ slug: e.slug, publishedAt: e.publishedAt, _updatedAt: e.updatedAt }));
}

/**
 * An index entry as the listing-shaped SanityPost the old queries returned.
 * The image is the exported localImage object; urlFor() in src/lib/image.ts
 * turns it back into a path, so call sites keep their existing expressions.
 */
function toListPost(entry: BlogIndexEntry): SanityPost {
  const full = getPostBySlug(entry.slug);
  return {
    title: normalizeSanityResult(entry.title),
    slug: { current: entry.slug },
    publishedAt: entry.publishedAt || "",
    excerpt: normalizeSanityResult(entry.excerpt) || undefined,
    featuredImage: full?.featuredImage,
    categories: normalizeSanityResult(
      entry.categories.map((c) => ({ title: c.title, slug: { current: c.slug } })),
    ),
  };
}
