# Handoff Log: Admizz Education Migration
**Date:** 2026-02-10
**Project:** admizzeducation.com WordPress to Next.js Migration

---

## Project Summary

Migrating [admizzeducation.com](https://admizzeducation.com) from WordPress (Astra theme + Elementor) to **Next.js 16.1.6 + Tailwind CSS v4**, with Sanity CMS for blog content.

The goal is a **zero-SEO-loss technology migration** -- same URLs, same content, same metadata. Not a redesign.

---

## Current Status: ALL PHASES COMPLETE

| Phase | Status |
|-------|--------|
| Phase 1: Crawl & Audit | DONE |
| Phase 2A: Design Extraction | DONE |
| Phase 2B: Build Shared Components | DONE |
| Phase 2C: Build Pages (40 routes) | DONE |
| Phase 2D: SEO Metadata & Validation | DONE |
| Phase 3: Set Up Sanity CMS | DONE |
| Phase 4: Migrate Blog Content (138 posts) | DONE |
| Phase 5: SEO & Validation | DONE |

**Last verified build:** `npx next build` passes with **190 routes**, zero errors.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (Static Export) | 16.1.6 |
| React | React | 19.2.3 |
| Language | TypeScript | Latest |
| Styling | Tailwind CSS v4 | `@theme` directive in globals.css |
| Font | Montserrat 300-700 | via `next/font/google` |
| CMS | Sanity | Project ID: `vd27cmpc`, Dataset: `production` |
| Server | Nginx (Docker) | alpine |
| Proxy | Traefik | docker-compose ready |

### Key Config (`next.config.ts`)
```ts
output: "export"       // Static export only
trailingSlash: true     // Matches WordPress URL structure
images: { unoptimized: true }
```

---

## Git Status

**Branch:** `main`
**All work since initial scaffold needs to be committed.**

---

## File Structure

```
src/
  app/
    layout.tsx              # Root layout (Montserrat font, Header/Footer)
    page.tsx                # Homepage
    globals.css             # Tailwind v4 @theme with custom design tokens
    [slug]/page.tsx         # Dynamic blog post page (138 posts from Sanity)
    blogs/page.tsx          # Blog listing page (connected to Sanity)
    category/[slug]/page.tsx # Category archive pages (13 categories)
    about/page.tsx
    contact/page.tsx
    privacy-policy/page.tsx
    recruitment-partners/page.tsx
    universities/page.tsx
    study-destinations/page.tsx
    study-in-the-usa/page.tsx         # Uses CountryPageTemplate
    study-in-the-uk/page.tsx
    study-in-australia/page.tsx
    study-in-canada/page.tsx
    study-in-newzealand/page.tsx
    study-in-south-korea/page.tsx
    study-in-india/page.tsx
    study-in-france/page.tsx
    study-in-denmark/page.tsx
    study-in-dubai/page.tsx
    study-in-canada-from-nepal/page.tsx    # Uses NepalVariantTemplate
    study-in-south-korea-from-nepal/page.tsx
    study-in-india-from-nepal/page.tsx
    study-in-france-from-nepal/page.tsx
    study-in-denmark-from-nepal/page.tsx
    study-in-dubai-from-nepal/page.tsx
    study-in-uae-from-nepal/page.tsx
    best-education-consultancy-for-study-abroad/page.tsx   # SEO landing pages
    study-abroad-consultancy-in-nepal/page.tsx
    overseas-education-consultants-in-nepal/page.tsx
    top-education-consultancy-in-nepal/page.tsx
    study-abroad-consultants-in-kathmandu/page.tsx
    campaign/page.tsx           # "use client" - has form
    campaign/layout.tsx         # Metadata for client component
    campaign-uk/page.tsx        # "use client" - has form
    campaign-uk/layout.tsx      # Metadata for client component
    coming-soon/page.tsx
    thank-you/page.tsx
    thank-you-uk/page.tsx
    country-page-thank-you/page.tsx
    test-prep-thank-you/page.tsx
  components/
    layout/
      Header.tsx            # Site header with nav dropdown
      Footer.tsx            # Multi-column footer
    ui/
      CountryPageTemplate.tsx   # Reusable template for 10 country study pages
      NepalVariantTemplate.tsx  # Reusable template for 7 "From Nepal" pages
      FAQ.tsx               # Client component - accordion
      CTAForm.tsx           # Client component - registration form (card/inline)
      Hero.tsx
      Stats.tsx
      Testimonials.tsx
      CountryCard.tsx
      ServiceCard.tsx
      SectionHeading.tsx
      UniversityGrid.tsx
    PortableTextRenderer.tsx  # Sanity Portable Text renderer for blog content
  lib/
    sanity.ts             # Sanity client + image URL builder
    queries.ts            # 7 GROQ queries
  types/
    index.ts              # TypeScript interfaces (SanityPost, SanityCategory, etc.)
  sanity/
    schemas/
      post.ts             # Post document schema
      category.ts         # Category document schema
      seo.ts              # SEO object type schema
      index.ts            # Barrel export

scripts/
  generate-sitemap.mjs   # Pre-build: generates public/sitemap.xml from Sanity
  migrate-to-sanity.mjs  # One-time: WordPress to Sanity migration (138 posts)

docs/
  migration-phases.md     # Master plan — ALL PHASES DONE
  design-system.md        # Extracted design tokens from WordPress
  site-audit.md           # WordPress crawl results (206 URLs)
  project-brief.md        # Project overview and constraints
  role.md                 # Architecture principles
  TODO.md                 # Remaining tasks
  HANDOFF-LOG.md          # This file
  scraped-content/        # 24 markdown files with scraped WordPress content
  wordpress-export/       # Exported WordPress data (posts.json, categories.json)

public/
  images/                 # All images (logos, about, destinations, icons, OG images)
  sitemap.xml             # Generated sitemap (188 URLs)
  robots.txt              # Search engine directives

Dockerfile               # Production Docker build (nginx:alpine)
docker-compose.yml        # Production compose (admizzeducation.com)
docker-compose.dev.yml    # Dev compose (dev-web.admizzeducation.com)
deploy.sh                 # Deployment script (dev/prod)
nginx/static.conf         # Nginx config for static serving
```

---

## Build & Route Summary

**Total routes: 190**
- 37 static pages (hardcoded content)
- 138 blog post pages (from Sanity via `[slug]`)
- 13 category archive pages (from Sanity via `category/[slug]`)
- 1 `_not-found` page
- 1 root `/` page

**SEO validation:**
- 188/188 WordPress URLs have matching HTML output
- 187/187 pages have correct canonical URLs
- sitemap.xml contains 188 URLs
- robots.txt allows all crawlers

---

## Sanity CMS

- **Project ID:** `vd27cmpc`
- **Dataset:** `production`
- **Content:** 138 posts, 13 categories, 138 images
- **Dashboard:** https://www.sanity.io/manage/project/vd27cmpc
- **Schemas:** post, category, seo (defined in `src/sanity/schemas/`)

### Build workflow
```
Sanity (publish/edit) → npm run build (GROQ fetch + sitemap) → /out (static) → Nginx (Docker) → Traefik (SSL)
```

The `prebuild` script in `package.json` runs `generate-sitemap.mjs` before `next build` to generate `public/sitemap.xml` with fresh data from Sanity.

---

## How to Run

```bash
# Install dependencies
npm install

# Dev server
npm run dev

# Production build (generates sitemap + 190 routes)
npm run build

# Docker build & deploy to dev
./deploy.sh dev

# Docker build & deploy to production
./deploy.sh prod
```

---

## Remaining Tasks

1. **Git commit** — All work since initial scaffold is uncommitted
2. **Deploy to dev** — `./deploy.sh dev` to push to `dev-web.admizzeducation.com`
3. **Lighthouse audit** — Run on deployed dev site
4. **Production cutover** — Swap DNS from WordPress to new site when ready

---

## Important Notes

1. **Campaign pages are client components.** `/campaign/` and `/campaign-uk/` use `"use client"` because they have registration forms. SEO metadata is exported from separate `layout.tsx` files.

2. **`/study-in-australia/` URL conflict.** This slug exists as both a WordPress blog post and a static page. The static page takes priority in Next.js routing. The blog post content exists in Sanity but is not accessible at this URL.

3. **Tags (15) and Authors (3) are not migrated.** These WordPress URLs will return 404. If they have backlinks, nginx redirects can be added later.

4. **WordPress is still live.** The migration is built in parallel. Do not modify the live WordPress site until cutover.

5. **Sitemap is generated pre-build.** The `prebuild` npm script fetches blog slugs from Sanity and generates `public/sitemap.xml` before `next build` runs.
