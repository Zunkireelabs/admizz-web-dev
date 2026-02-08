# Admizz Education Website Migration — Project Brief

## 1. Project Overview

**Objective:** Migrate the existing Admizz Education website from WordPress to Next.js Static Export using the Zunkiree Labs standard Docker + Traefik template.

**Goals:**

- Preserve 100% of existing content
- Preserve 100% of SEO value
- Maintain identical URLs, structure, and content
- Introduce a Headless CMS (Sanity) for blog/content management

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

- **Sanity** (Headless CMS)
- Scope limited to: Blog posts, Blog categories/tags, SEO metadata
- Sanity Studio hosted separately (managed by Sanity)

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

> Sourced from Sanity.

- Title, Slug, Body (rich text)
- Featured image
- Categories / tags
- SEO fields

---

## 6. Sanity CMS — Content Model

### Document: `post`

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `slug` | slug | required, must match WP slug |
| `publishedAt` | datetime | |
| `excerpt` | text | |
| `content` | portable text | |
| `featuredImage` | image | |
| `categories` | reference[] | |
| `seo` | object | see below |

**SEO Object Fields:** `metaTitle`, `metaDescription`, `canonicalUrl`, `noIndex` (boolean), `ogImage`

### Document: `category`

| Field | Type |
|---|---|
| `title` | string |
| `slug` | slug |

---

## 7. Build & Data Flow

```
Sanity (publish/edit) → Next.js (GROQ fetch at build) → /out (static) → Nginx (Docker) → Traefik (SSL + domain)
```

### Rebuild Strategy

- **Initial:** Manual rebuild via `deploy.sh`
- **Future (optional):** Webhook-triggered rebuild

---

## 8. Project Structure

> Uses Zunkiree Labs standard Next.js Static Docker template, unchanged.

**Key additions:**

```
src/lib/sanity.ts          — Sanity client
src/lib/queries.ts         — GROQ queries
src/app/blog/[slug]/page.tsx — Blog detail page
src/app/blog/page.tsx      — Blog listing
```

- SEO utility for meta tags

---

## 9. SEO & Metadata Handling

- Use Next.js `generateMetadata()` for blog and static pages
- **Metadata source:**
  - Blogs → Sanity
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
- Blog images served via Sanity CDN (or downloaded locally — optional)
- Long-term caching enabled in Nginx (already in template)

---

## 12. Environments

| Environment | Stack |
|---|---|
| **Development** | Local Next.js dev server, optional dev Sanity dataset |
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
