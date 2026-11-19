# Admizz Education Website Migration — Project Brief

## 1. Project Overview

**Objective:** Migrate the existing Admizz Education website from WordPress to Next.js Static Export using the Zunkiree Labs standard Docker + Traefik template.

**Goals:**

- Preserve 100% of existing content
- Preserve 100% of SEO value
- Maintain identical URLs, structure, and content
- Keep blog content as files in the repo (no CMS; see section 6)

> This is a **technology migration**, not a redesign or re-architecture of content.

---

## 2. High-Level Architecture

### Frontend

| Layer | Technology |
|---|---|
| Framework | Next.js (Static Export mode) |
| Rendering | Static Site Generation (SSG) |
| Styling | Tailwind CSS |
| Hosting | Docker + Nginx |
| Reverse Proxy / SSL | Traefik |

> No runtime backend required.

### CMS

- **Repo-based blog content** (`src/content/blog`), no CMS
- Scope: Blog posts, Blog categories, SEO metadata

---

## 3. Non-Negotiable Constraints

| Constraint | Status |
|---|---|
| URL changes | Not allowed |
| Slug changes | Not allowed |
| Content rewriting | Not allowed |
| SEO metadata loss | Not allowed |
| Visual redesign (unless matching current UI) | Not allowed |

Everything visible on the current website must behave identically for **users**, **search engines**, and **crawlers**.

---

## 4. URL & SEO Requirements (CRITICAL)

### URL Structure

- Must exactly match current WordPress URLs
- Example: `/blog/some-post/`
- Trailing slashes enabled
- No redirects unless strictly unavoidable

### SEO Parity

Each blog post must preserve:

- Meta title
- Meta description
- H1
- Canonical URL
- Open Graph data (if exists)
- Publish date (important for SEO trust)

---

## 5. Content Sources

### Static Pages

> Hardcoded in Next.js — content copied directly from WordPress.

- Home
- About
- Services
- Contact
- Any other non-blog pages

### Blog Content

> Sourced from `src/content/blog`.

- Title, Slug, Body (rich text)
- Featured image
- Categories / tags
- SEO fields

---

## 6. Blog Content Model (repo files, CRET-12)

Blogs live in the repo, not in a CMS. Posts are JSON files in `src/content/blog/posts/<slug>.json`
(index: `src/content/blog/index.json`, categories: `src/content/blog/categories.json`), read at build
time by `src/lib/blog-content.ts`. Types: `BlogPost`, `BlogCategory`, `BlogSEO`, `BlogImage` in `src/types/index.ts`.
New posts are written as repo pages with `GeneratedBlogPost`; rules in `docs/seo-content-rules.md`.

**Post fields:** `title`, `slug` (must match the WP slug), `publishedAt`, `excerpt`, `content`, `featuredImage`, `categories`, `seo`
(`metaTitle`, `metaDescription`, `canonicalUrl`, `noIndex`, `ogImage`).

---

## 7. Build & Data Flow

```
Edit files in src/content/blog → PR → Next.js build → /out (static) → Nginx (Docker) → Traefik (SSL + domain)
```

### Rebuild Strategy

- Merging into `stage` deploys dev-web; merging into `main` deploys production (GitHub Actions). No webhook.

---

## 8. Project Structure

> Uses Zunkiree Labs standard Next.js Static Docker template, unchanged.

**Key additions:**

```
src/lib/blog-content.ts    — reads blog posts from src/content/blog
src/app/[slug]/page.tsx    — Blog detail page
src/app/blogs/page.tsx     — Blog listing
```

- SEO utility for meta tags

---

## 9. SEO & Metadata Handling

- Use Next.js `generateMetadata()` for blog and static pages
- **Metadata source:**
  - Blogs → `src/content/blog` (plus `src/data/post-seo-overrides.ts`)
  - Static pages → Local constants
- Canonical URLs must be absolute
- `noindex` respected if set

---

## 10. Sitemap & Robots

- Generate sitemap at build time
- Include all static pages and all blog posts
- Sitemap URLs must match live domain
- `robots.txt` must allow indexing

---

## 11. Images & Performance

- Use static images where possible
- Blog images served locally from `public/images/blog/`
- Long-term caching enabled in Nginx (already in template)

---

## 12. Environments

| Environment | Stack |
|---|---|
| **Development** | Local Next.js dev server |
| **Production** | Docker container, Traefik-managed SSL, domain: `admizzeducation.com` |

---

## 13. Assumptions

- WordPress site remains live until migration is verified
- Full URL list can be exported from WP
- Content volume is manageable for one-time migration
- No multilingual support required (currently)

---

## 14. Out of Scope

Redesign, UX improvements, new landing pages, marketing automation, analytics rework, auth/dashboards.

---

## 15. Success Criteria

- **Google Search Console:** No spike in crawl errors, no deindexing, rankings remain stable
- **Content team:** Can publish blogs without dev help
- **Performance:** Site loads faster than WordPress version
