# CLAUDE.md — Admizz Education Website

## Project Overview

| | |
|---|---|
| **Site** | admizzeducation.com — education consultancy, Nepal → study abroad |
| **Stack** | Next.js 16.1.6 · React · TypeScript · Tailwind CSS v4 · Sanity CMS · nginx · Docker · Traefik |
| **GitHub** | https://github.com/Zunkireelabs/admizz-web-dev.git |
| **Active branch** | `deploy/static-export-migration` (merges to `main` after prod verified) |
| **Scale** | 235 pages — 143 blog posts · 27 categories · ~65 static marketing pages |

---

## Automatic Skill Routing

When the user gives **any development request**, automatically invoke `/project-pm`.

**Auto-invoke triggers:**
- "Build / Create / Implement / Add X"
- "Fix / Update / Change / Refactor X"
- Feature requests, bug fixes, new pages

**Do NOT auto-invoke:**
- Questions: "How does X work?"
- Reading: "Show me X"
- Documentation tasks
- User already typed `/skill-name`

---

## Available Skills

| Skill | Domain | When to Use |
|-------|--------|-------------|
| `/project-pm` | **Orchestrator** | All development tasks — routes to specialists |
| `/nextjs-page-builder` | **Generator** | New country pages, Nepal variants, SEO landing pages |
| `/seo-specialist` | **Specialist** | Metadata, structured data, sitemap, canonicals, redirects |
| `/aeo-geo-specialist` | **Specialist** | AI Search Optimization — ChatGPT/Perplexity/AI Overviews citations |
| `/frontend-dev` | **Specialist** | React components, Tailwind styling, responsive layouts |
| `/deploy` | **Utility** | Docker builds, dev/prod deployments, container health |
| `/sanity-cms` | **Specialist** | Sanity schemas, GROQ queries, content migration, Portable Text |
| `/skill-architect` | **Meta** | Create/optimize skills, audit coverage |

---

## Deployment Architecture

> **Critical — read before touching Dockerfile, deploy.sh, or next.config.ts**

### How it works

```
HOST MACHINE                          DOCKER CONTAINER
─────────────────────────────         ─────────────────────────
npm ci                                nginx:alpine (~8 MB RAM)
  └─ next build --webpack    ──────►  COPY out/ → /usr/share/nginx/html/
       └─ generates ./out/            nginx serves static HTML/JS/CSS
            (235 pages, ~200 MB)      Traefik handles TLS + redirects
```

**Before migration (OLD — do not revert to this):**
Docker ran `npm install` + `next build` inside the container on every deploy (~10 min, --no-cache).

**After migration (CURRENT):**
`npm ci` + `next build` run on the **host**, produce `./out/`, then Docker just copies it into nginx:alpine. Deploy time: **~20–60 seconds** for text/code changes, **~3–5 min** for cold `npm ci`.

### Key files

| File | Purpose |
|---|---|
| `next.config.ts` | Minimal — `output: "export"` + `images: { unoptimized: true }` only |
| `Dockerfile` | `FROM nginx:alpine` — copies `nginx/static.conf` + `out/` |
| `Dockerfile.standalone.bak` | Backup of old Node SSR Dockerfile (keep for reference) |
| `nginx/static.conf` | nginx server config — routing, cache headers, gzip, 404 |
| `deploy.sh` | Orchestrates: `npm ci` → `npm run build` → `docker compose build` → `up -d` |
| `docker-compose.dev.yml` | Dev container + Traefik labels (port 80, all redirect middlewares) |
| `docker-compose.yml` | Prod container + Traefik labels (port 80, www→non-www + all redirects) |
| `.dockerignore` | **`out/` must NOT be listed here** — Docker needs it to COPY into the image |

---

## Environments

| | Dev | Prod |
|---|---|---|
| **URL** | dev-web.admizzeducation.com | admizzeducation.com |
| **Container** | `admizz-edu-web-dev` | `1662127bf800_admizz-edu-web-prod` ⚠️ |
| **Port** | 80 (nginx) | 3000 (Node — not yet migrated) |
| **Compose file** | `docker-compose.dev.yml` | `docker-compose.yml` |
| **Status** | ✅ Static nginx (migrated) | ⏳ Awaiting 24h soak then prod migration |

⚠️ The prod container has a weird name prefix from a past name collision. When migrating prod, run `docker rm -f 1662127bf800_admizz-edu-web-prod` first so the new `admizz-edu-web-prod` name is free.

---

## Commands

```bash
# Local dev server (hot reload, no static export)
npm run dev

# Build static export → produces ./out/  (runs sitemap generator first)
npm run build

# Full deploy to dev (npm ci + build + docker + restart)
./deploy.sh dev

# Full deploy to prod — only run with explicit go-ahead
./deploy.sh prod

# Quick rebuild (when out/ already exists — skip npm ci + next build)
docker compose -f docker-compose.dev.yml build && \
docker compose -f docker-compose.dev.yml down && \
docker compose -f docker-compose.dev.yml up -d

# Check container health + memory
docker stats admizz-edu-web-dev --no-stream

# Tail nginx logs
docker logs admizz-edu-web-dev -f --tail 50

# Sanity Studio
npm run studio:deploy
```

**Prebuild hook:** `npm run build` automatically runs `node scripts/generate-sitemap.mjs` first, which regenerates `public/sitemap.xml` with all static pages + blog posts + categories (212 URLs as of last run).

---

## Redirects

All URL redirects have been **removed from `next.config.ts`** and are now **Traefik middleware labels** in the compose files. Do not add `redirects()` back to `next.config.ts` — it is incompatible with `output: "export"`.

| Old URL | Destination | Code |
|---|---|---|
| `/:path+/` (trailing slash) | `/:path+` | 308 |
| `/test-preparation` | `/test-prep` | 308 |
| `/book-your-free-consultation` | `/register` | 308 |
| `/win-big-campaign` | `/campaign` | 308 |
| `/study-in-new-zealand-from-nepal` | `/study-in-newzealand-from-nepal` | 308 |
| `/tag/:slug` | `/blogs` | 308 |
| `/author/:slug` | `/blogs` | 308 |
| `/blogs/page/:num` | `/blogs` | 307 |
| `/e-floating-buttons/:slug` | `/` | 308 |
| `www.admizzeducation.com` | `admizzeducation.com` | 308 (prod only) |

Traefik uses 308/307 (the HTTP/2-correct equivalents of 301/302). Browsers and search engines handle them identically to 301/302.

To add a new redirect: add a `redirectregex` middleware label pair to **both** `docker-compose.dev.yml` and `docker-compose.yml`, then append the middleware name to the router's `middlewares=` chain.

---

## Sanity CMS & Webhook Auto-Rebuild

**Sanity config:**
- Project ID: `vd27cmpc`
- Dataset: `production`
- API version: `2026-02-10`
- Used for: **blog posts and categories only** — all other content is hardcoded

**Webhook server** (`webhook/server.mjs`):
- Listens on port `9090`
- Endpoint: `POST /webhook` (HMAC-verified Sanity webhook)
- Health check: `GET /health`
- On valid event: runs `./deploy.sh $DEPLOY_ENV` (env set in `webhook/.env`)
- Logs to `webhook/logs/YYYY-MM-DD.log`

**Service file** (`webhook/admizz-webhook.service`): NOT yet installed as systemd.
Currently running as a manual process. To install permanently (requires sudo → Anish):
```bash
sudo cp webhook/admizz-webhook.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now admizz-webhook
systemctl status admizz-webhook
```

---

## Project Structure

```
admizz-edu-web-dev/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout (Montserrat font, GA, ScrollToTop)
│   │   ├── globals.css           # Tailwind v4 @theme tokens + base styles
│   │   ├── [slug]/page.tsx       # Blog post pages (generateStaticParams)
│   │   ├── blogs/page.tsx        # Blog listing
│   │   ├── category/[slug]/      # Category archive pages (generateStaticParams)
│   │   ├── study-in-*/           # Country pages (UK, USA, Canada, Australia, etc.)
│   │   ├── study-in-*-from-nepal/# Nepal variant pages
│   │   ├── register/             # Free consultation form
│   │   ├── test-prep/            # Test preparation page
│   │   ├── about/, contact/,     # Standard pages
│   │   ├── campaign/, campaign-uk/
│   │   └── ...                   # 65+ static routes total
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── CountryPageTemplate.tsx   # Template for country pages
│   │       ├── NepalVariantTemplate.tsx  # Template for "from Nepal" variants
│   │       ├── CTAForm.tsx               # Consultation form (card/inline variants)
│   │       ├── Hero.tsx
│   │       ├── FAQ.tsx                   # "use client" accordion
│   │       ├── Stats.tsx
│   │       ├── Testimonials.tsx
│   │       ├── TestimonialsBento.tsx
│   │       ├── GoogleReviews.tsx
│   │       ├── UniversityGrid.tsx
│   │       ├── CountryCard.tsx
│   │       ├── AlumniSection.tsx
│   │       ├── TrustedPartners.tsx
│   │       ├── GlobalPresence.tsx
│   │       ├── WhyChooseAdmizz.tsx
│   │       ├── StudyAbroadInsights.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── queries.ts            # All GROQ queries (Sanity)
│   │   ├── sanity.ts             # Sanity client + urlFor
│   │   └── universities.ts       # University data
│   ├── sanity/schemas/           # Sanity content schemas
│   └── types/index.ts            # TypeScript types (SanityPost, SanityCategory, etc.)
├── public/
│   ├── images/                   # Hero images, og images, icons, university logos
│   ├── sitemap.xml               # Auto-generated by prebuild script
│   └── robots.txt
├── nginx/
│   └── static.conf               # nginx: routing, 1yr cache on assets, gzip, 404
├── out/                          # Static export output (git-ignored, Docker needs it)
├── scripts/
│   └── generate-sitemap.mjs      # Runs before every build
├── webhook/
│   ├── server.mjs                # Sanity webhook listener (port 9090)
│   ├── admizz-webhook.service    # systemd unit (not yet installed)
│   └── webhook/.env              # WEBHOOK_SECRET, DEPLOY_ENV, PROJECT_DIR
├── docs/                         # Migration plans, scraped content, audit docs
├── Dockerfile                    # nginx:alpine static image
├── Dockerfile.standalone.bak     # Old Node SSR Dockerfile (rollback reference)
├── docker-compose.yml            # Prod: nginx port 80, Traefik labels + redirects
├── docker-compose.dev.yml        # Dev: nginx port 80, Traefik labels + redirects
├── deploy.sh                     # Deployment script (dev|prod)
├── next.config.ts                # output: "export", images: unoptimized
└── .dockerignore                 # out/ must NOT appear here
```

---

## Key Architecture Patterns

### Static Export Rules
- `next.config.ts` uses `output: "export"` — the whole site pre-renders to `./out/` at build time
- **Never add `export const dynamic = "force-dynamic"`** to any page — it breaks the static export build
- **Never add `export const dynamic = "force-static"` is fine** but unnecessary (default)
- Dynamic blog/category pages work via `generateStaticParams()` — all slugs fetched from Sanity at build time
- No API routes, no middleware, no server actions — the site is 100% static HTML

### Templates
- **`CountryPageTemplate`** — use for all country pages (study-in-uk, study-in-canada, etc.)
- **`NepalVariantTemplate`** — use for all "from Nepal" variant pages (study-in-uk-from-nepal, etc.)
- Do not build country pages from scratch — always use the templates

### Component Conventions
- **Client components**: `FAQ`, `CTAForm`, `SpinWheel`, `MoreArticles` (PostCard load-more) — must have `"use client"`
- **Server components**: all page files, all layout files — no `"use client"` unless strictly needed
- **CTAForm variants**: `colorScheme="light"` (white card) or `colorScheme="dark"` (navy card)

### Fonts
- **Montserrat** 300–700 via `next/font/google` — loaded in `src/app/layout.tsx`
- **Rubik** used for select headings (CTAs, hero titles) — loaded similarly

---

## Tailwind v4 Design Tokens

Defined via `@theme` in `src/app/globals.css`. Use class names directly (e.g. `bg-navy`, `text-blue-royal`).

**Primary colors:**
| Token | Hex | Usage |
|---|---|---|
| `navy` | `#001353` | Dark headings, footer background |
| `blue-dark` | `#0D1282` | Hero gradient end, CTAs |
| `blue-royal` | `#31429C` | Hero gradient start, buttons, links |
| `blue-oxford` | `#002147` | Alternative dark |

**Accent colors:**
| Token | Hex | Usage |
|---|---|---|
| `yellow` | `#FDED22` | Primary CTA button background |
| `golden` | `#FCB730` | Star ratings, highlights |

**Neutrals:** `off-white` (#F8F8F8), `gray-dark` (#5C7189), `border-light` (#D7DAE8)

**Repeated patterns:**
- Hero: `bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16`
- CTA button: `bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px]`
- Section: `py-16 px-4`, container: `max-w-7xl mx-auto`
- Cards: `rounded-[10px]`, body text: `text-[15px]`
- Tablet breakpoint: `921px` (custom, use `tablet:` prefix)

---

## SEO Patterns

- **Canonical URLs**: no trailing slash — `https://admizzeducation.com/study-in-uk`
- **Sitemap**: auto-generated at `public/sitemap.xml` on every build (212 URLs: 42 static + 143 blog posts + 27 categories)
- **Metadata**: every page exports `export const metadata: Metadata` with title, description, canonical, openGraph
- **Structured data**: JSON-LD added to high-value pages (country pages, blog posts)
- **OG images**: stored at `public/images/og/`

---

## Quality Standards

```
1. Build must pass: npm run build (produces out/ with no errors)
2. TypeScript strict: no `any` types
3. Follows existing component patterns (use templates, don't reinvent)
4. Always deploy to dev first — prod only on explicit instruction
5. Never add force-dynamic to any page (breaks static export)
6. Never add 'out' to .dockerignore (Docker needs it to build the image)
7. Redirects go in Traefik labels (compose files), not next.config.ts
8. Run sitemap check after adding new pages: confirm URL appears in public/sitemap.xml
```

---

## Gotchas & Hard-Won Lessons

| Gotcha | Detail |
|---|---|
| `out/` in `.dockerignore` | Breaks Docker build — `COPY out/` fails. Keep `out` OUT of `.dockerignore` |
| `force-dynamic` on any page | Crashes the static export build with "Page cannot be static" error |
| `headers()` / `redirects()` in `next.config.ts` | Incompatible with `output: "export"` — use nginx/Traefik instead |
| 404 page path | Next.js exports custom 404 to `/404.html` (root), not `/404/index.html` — nginx `error_page` must point to `/404.html` |
| Prod container name | `1662127bf800_admizz-edu-web-prod` — must `docker rm -f` it before prod migration so new name `admizz-edu-web-prod` is free |
| Blog page freshness | Static export = content frozen at build time. Sanity content changes only appear after a webhook-triggered rebuild |
| Traefik redirect codes | Traefik uses 308/307 (not 301/302) — correct for HTTP/2, works identically in browsers and search engines |
| `npm run build` vs Docker build | `npm run build` runs on HOST (needs `.env.local` with Sanity vars). Docker build only copies the result — it does NOT re-run next build |
