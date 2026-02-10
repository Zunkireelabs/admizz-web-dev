# Admizz Education — Migration Phases

## Phase 1: Crawl & Audit WordPress Site [DONE]
**Goal:** Understand exactly what exists on the current site.

**Completed:**
- [x] Crawled all 6 Yoast sitemaps (posts, pages, categories, tags, authors)
- [x] Discovered 206 total URLs (138 blog posts, 37 pages, 13 categories, 15 tags, 3 authors)
- [x] Extracted SEO metadata (title, description, H1, OG image) for all 30+ static pages
- [x] Mapped homepage structure (10 sections)
- [x] Mapped navigation (header + footer)
- [x] Identified issues (missing titles, wrong OG images, /study-in-australia/ conflict)
- [x] Full audit saved to `docs/site-audit.md`

---

## Phase 2: Design Extraction & Build Static Pages
**Goal:** Achieve 1:1 visual parity — visitors must see the exact same website.

**Strategy: Hybrid Approach**
- Extract the design system from WordPress (fonts, colors, spacing, component patterns)
- Download all images and assets
- Build shared layout components (Header, Footer) pixel-perfect in Tailwind
- Rebuild each page section-by-section in clean React + Tailwind, matching the WordPress visual output exactly
- Use screenshots for side-by-side validation

### Step 2A: Design Extraction [DONE]
Extract everything needed to replicate the visual design:

- [x] Identify page builder used (Elementor / other) — Astra theme + Elementor
- [x] Extract fonts (families, weights, sizes used across the site) — Montserrat 300-700
- [x] Extract color palette (primary, secondary, accent, text, background colors)
- [x] Extract spacing scale / layout patterns (section padding, gaps, max-widths)
- [x] Extract button styles, card styles, form styles
- [x] Download all images and assets (logos, icons, hero images, flags, partner logos)
- [x] Screenshot every page for reference (desktop + mobile)
- [x] Identify reusable section patterns across pages (hero variants, CTA blocks, FAQ, testimonials, etc.)
- [x] Document design system in `docs/design-system.md`

### Step 2B: Build Shared Components [DONE]
Build the reusable pieces first:

- [x] Header — Logo, navigation dropdown (Study Destinations), mobile menu, Register CTA
- [x] Footer — Multi-column layout, quick links, company links, social icons
- [x] Hero section component (reusable across country pages)
- [x] FAQ accordion component
- [x] Testimonial carousel component
- [x] CTA / registration form component
- [x] Stats / trust indicators component
- [x] University logo grid component
- [x] Country card component (for study destinations grid)

### Step 2C: Build Pages (~30 real pages) [DONE]

**Core Pages:**
- [x] `/` — Homepage (hero, stats, services, destinations grid, test prep, testimonials, FAQ, university logos)
- [x] `/about/` — About page
- [x] `/contact/` — Contact page (with form)
- [x] `/blogs/` — Blog listing page (placeholder — will connect to Sanity later)
- [x] `/study-destinations/` — Study destinations overview
- [x] `/privacy-policy/` — Privacy policy
- [x] `/recruitment-partners/` — Recruitment partners
- [x] `/universities/` — Universities / colleges

**Country Study Pages (10):**
- [x] `/study-in-the-usa/`
- [x] `/study-in-the-uk/`
- [x] `/study-in-australia/`
- [x] `/study-in-canada/`
- [x] `/study-in-newzealand/`
- [x] `/study-in-south-korea/`
- [x] `/study-in-india/`
- [x] `/study-in-france/`
- [x] `/study-in-denmark/`
- [x] `/study-in-dubai/`

**"From Nepal" Variant Pages (7):**
- [x] `/study-in-canada-from-nepal/`
- [x] `/study-in-south-korea-from-nepal/`
- [x] `/study-in-india-from-nepal/`
- [x] `/study-in-france-from-nepal/`
- [x] `/study-in-denmark-from-nepal/`
- [x] `/study-in-dubai-from-nepal/`
- [x] `/study-in-uae-from-nepal/`

**SEO Landing Pages (5):**
- [x] `/best-education-consultancy-for-study-abroad/`
- [x] `/study-abroad-consultancy-in-nepal/`
- [x] `/overseas-education-consultants-in-nepal/`
- [x] `/top-education-consultancy-in-nepal/`
- [x] `/study-abroad-consultants-in-kathmandu/`

**Utility Pages (7):**
- [x] `/campaign/`
- [x] `/campaign-uk/`
- [x] `/country-page-thank-you/`
- [x] `/coming-soon/`
- [x] `/thank-you/`
- [x] `/thank-you-uk/`
- [x] `/test-prep-thank-you/`

### Step 2D: SEO Metadata & Validation [DONE]
- [x] Implement `export const metadata` on every page matching WordPress SEO fields exactly
- [x] Add `alternates.canonical` with absolute URLs on all 38 pages
- [x] Add OpenGraph data (title, description, url, siteName, type, images) on all pages
- [x] Download 15 OG images from WordPress to `public/images/og/`
- [x] Fix campaign pages (client components) — metadata via `layout.tsx` approach
- [x] Cross-reference titles/descriptions against `docs/scraped-content/` and `docs/site-audit.md`
- [x] Build verification — 40/40 routes, all pages have title + canonical + og tags

---

## Phase 3: Set Up Sanity CMS [DONE]
**Goal:** Create the Sanity project and content model for blog management.

- [x] Create Sanity project — Project ID: `vd27cmpc`, Dataset: `production`
- [x] Define `post` schema (title, slug, publishedAt, excerpt, content with Portable Text + images + rawHtml, featuredImage, categories, seo)
- [x] Define `category` schema (title, slug)
- [x] Define SEO object type (metaTitle, metaDescription, canonicalUrl, noIndex, ogImage)
- [x] Configure `.env.local` with Sanity credentials
- [x] Wire up Sanity client (`src/lib/sanity.ts`) with real project ID + image URL builder
- [x] Write GROQ queries (`src/lib/queries.ts`) — 7 queries for posts, categories, sitemap
- [x] Define TypeScript interfaces (`src/types/index.ts`)
- [x] Build verification — 40/40 routes compile with Sanity setup

---

## Phase 4: Migrate Blog Content [DONE]
**Goal:** Move all 138 blog posts from WordPress into Sanity and build blog pages.

- [x] Export 138 blog posts from WordPress REST API (with Yoast SEO data + embedded images)
- [x] Export 13 categories from WordPress REST API
- [x] Build migration script (`scripts/migrate-to-sanity.mjs`) — HTML to Portable Text converter
- [x] Import into Sanity — 138/138 posts, 0 failures, 138 images uploaded, 13 categories created
- [x] Install `@portabletext/react` and create `PortableTextRenderer` component
- [x] Build `/[slug]/` blog post page with `generateStaticParams()` + `generateMetadata()`
- [x] Update `/blogs/` listing page — connected to Sanity with post cards
- [x] Build `/category/[slug]/` pages (13 categories) with `generateStaticParams()`
- [x] Add blog table styles (`.blog-table`) for migrated WordPress tables
- [x] Build verification — 190 routes (40 static + 138 posts + 13 categories), 0 errors

---

## Phase 5: SEO & Validation [DONE]
**Goal:** Ensure zero SEO loss and verify everything works.

- [x] Generate `sitemap.xml` at build time — 188 URLs (37 static + 138 posts + 13 categories)
- [x] Generate `robots.txt` (allow all, points to sitemap)
- [x] Pre-build script (`scripts/generate-sitemap.mjs`) fetches slugs from Sanity
- [x] URL parity check — 188/188 WordPress URLs matched
- [x] Metadata parity check — 137/138 titles match Yoast (1 expected: study-in-australia conflict)
- [x] Canonical URL validation — 187/187 pages have correct canonical URLs
- [x] All canonicals use `https://admizzeducation.com` with trailing slashes
- [x] Docker image build — successful (nginx:alpine)

**Remaining:**
- [ ] Lighthouse performance audit (run on deployed dev site)
- [ ] Deploy to `dev-web.admizzeducation.com` via `deploy.sh dev`

---

## Current Status

| Phase | Status |
|-------|--------|
| Phase 1: Crawl & Audit | DONE |
| Phase 2A: Design Extraction | DONE |
| Phase 2B: Build Shared Components | DONE |
| Phase 2C: Build Pages (40 routes) | DONE |
| Phase 2D: SEO Metadata & Validation | DONE |
| Phase 3: Set Up Sanity CMS | DONE |
| Phase 4: Migrate Blog Content | DONE |
| Phase 5: SEO & Validation | DONE |

**Build:** 190 routes, 0 errors, 0 warnings
**Last verified:** 2026-02-10
