# CLAUDE.md — Admizz Education Website

> **Keep this file true.** When you change how something works (deploy, tracking, CSP, a third-party tool,
> the workflow), update this file in the same PR. Facts below were checked against the repo on 16 Nov 2026.

## Project Overview

| | |
|---|---|
| **Site** | admizzeducation.com — education consultancy, Nepal → study abroad |
| **Stack** | Next.js 16.1.6 · React · TypeScript · Tailwind CSS v4 · repo-based blog content · static export served by nginx · Docker · Traefik |
| **GitHub** | https://github.com/Zunkireelabs/admizz-web-dev.git |
| **Branches** | `stage` (dev-web) and `main` (production). GitHub's *default* branch is still the old `deploy/static-export-migration`, which is **not** used for releases; always target `stage` |
| **Plane board** | **CRET** (Admizz Education module). Every change needs a CRET ticket |
| **Scale** | ~235 pages: ~143 blog posts · 27 categories · ~65 static marketing pages (check `public/sitemap.xml` for the current count) |

---

## How we work (SOP)

Full company SOP: `/Users/sadinshrestha/Projects/zunkireelabs-org/SOPs/developer-workflow/README.md`. The short version for this repo:

1. **Ticket first.** Search Plane (CRET) first; create a ticket if there is none. New work found mid-task becomes a new ticket, not scope creep.
2. **Branch from `stage`** → PR into `stage` → Sadin approves → merge. **Merging deploys dev-web automatically.**
3. **Test on dev-web** (https://dev-web.admizzeducation.com).
4. **Promote**: PR `stage` → `main`. Before opening it, check that the diff (`git diff origin/main origin/stage`) contains only the work you mean to ship. **Merging into `main` deploys production automatically.**
5. **Comment on the ticket as you go** (PR links, what was tested, results). Unproven claims get the `needs-verification` label and are never stated as fact.
6. **Approvals:** merging into `stage` or `main`, any deploy, and ticket state changes need Sadin's OK. **Production only on an explicit go-ahead.**

**CRET ticket states:** Backlog → Todo → In Progress → In Review (internal check by Sadin or Anish) → **Client Review** → Done. There is no "On Stage" state.
- **Client Review:** only Sadin moves a ticket here, with a comment `Sent to <client> on <date> via <channel>`.
- **Done:** only once the client's approval is quoted in a comment (date + channel).
- **Cancel, never delete.** Questions only the owner (Manish, via the Account Manager) can answer become `DECIDE …` tickets.

**Time:** this Plane plan has no time tracking. Record time spent as a ticket comment (`Time spent <date>: N hours: what it covered`).

**To-dos:** `tasks/TRACKER.md` is generated from Plane by `/project-pm sync`. Never hand-edit it. No to-do lists anywhere else (docs, handoffs, session logs).

---

## Automatic Skill Routing

For **any development request** (build, add, fix, update, refactor, new page), automatically invoke `/project-pm`.
Do NOT auto-invoke for questions ("how does X work?"), reading ("show me X"), documentation tasks, or when the user already typed a `/skill-name`.

| Skill | Domain | When to Use |
|-------|--------|-------------|
| `/project-pm` | **Orchestrator** | All development tasks — routes to specialists |
| `/nextjs-page-builder` | **Generator** | New country pages, Nepal variants, SEO landing pages |
| `/seo-specialist` | **Specialist** | Metadata, structured data, sitemap, canonicals, redirects |
| `/aeo-geo-specialist` | **Specialist** | AI Search Optimization — ChatGPT/Perplexity/AI Overviews citations |
| `/frontend-dev` | **Specialist** | React components, Tailwind styling, responsive layouts |
| `/deploy` | **Utility** | Docker builds, container health, deploy troubleshooting |
| `/skill-architect` | **Meta** | Create/optimize skills, audit coverage |

---

## Deployment Architecture

> **Critical — read before touching the workflows, Dockerfile, deploy.sh, nginx/static.conf or next.config.ts**

### Deploys are automatic (GitHub Actions)

| Merge into | Workflow | What happens |
|---|---|---|
| `stage` | `.github/workflows/deploy-staging.yml` ("Deploy to Staging") | Pre-deploy checks (`npm ci` + `npm run build`) → SSH to the VPS → `./deploy.sh dev` → health check on `admizz-edu-web-dev` |
| `main` | `.github/workflows/deploy.yml` ("Deploy to Production", `environment: production`) | Same checks → SSH → `./deploy.sh prod` → health check on `admizz-edu-web-prod` |
| PRs into `stage`/`main` | `.github/workflows/ci.yml` | `npm run build` must pass |

Both deploy from the **same VPS folder** and share a concurrency group, so they never run at the same time.
Watch a deploy with `gh run list --branch <stage|main>` and `gh run watch <id>`. Typical time: staging ~7 min, production ~4–5 min.
Do **not** run `./deploy.sh prod` by hand; merging into `main` is the production deploy.

### What `deploy.sh` does (on the VPS)

```
npm ci → npm run build (next build → ./out/, ~235 pages)
       → docker compose build (FROM nginx:alpine, COPY nginx/static.conf + out/)
       → docker compose up -d   (Traefik handles TLS, hostnames and some redirects)
```

The site is 100% static: nginx serves the files in `out/`. Nothing builds inside the container.

### Key files

| File | Purpose |
|---|---|
| `next.config.ts` | Minimal: `output: "export"` + `images: { unoptimized: true }` only |
| `Dockerfile` | `FROM nginx:alpine`, copies `nginx/static.conf` + `out/` |
| `Dockerfile.standalone.bak` | Old Node SSR Dockerfile (rollback reference only) |
| `nginx/static.conf` | Routing, cache headers, gzip, 404, some 301 redirects, **security headers incl. the enforced CSP** |
| `deploy.sh` | `npm ci` → build → `docker compose build` → `up -d` (`dev` or `prod`) |
| `docker-compose.dev.yml` | Dev container `admizz-edu-web-dev` + Traefik labels |
| `docker-compose.yml` | Prod container `admizz-edu-web-prod` + Traefik labels (www→non-www, careers/events subdomains) |
| `.dockerignore` | **`out/` must NOT be listed here**; Docker needs it to COPY into the image |

### Environments

| | Dev | Prod |
|---|---|---|
| **URL** | dev-web.admizzeducation.com | admizzeducation.com |
| **Branch** | `stage` | `main` |
| **Container** | `admizz-edu-web-dev` (nginx, port 80) | `admizz-edu-web-prod` (nginx, port 80) |
| **Compose file** | `docker-compose.dev.yml` | `docker-compose.yml` |

---

## Security headers & CSP (read before adding ANY third-party tool)

`nginx/static.conf` sends an **enforced** `Content-Security-Policy` (the `$csp` variable, applied in the HTML and default location blocks).
**Any outside host that isn't listed is silently blocked by the browser.** The page looks fine, but the tool doesn't work. The only sign is a red "violates the following Content Security Policy directive" error in the console.

- **Adding a tool** (chat widget, analytics, pixel, embed, form endpoint) means adding its hosts to the right directive (`script-src`, `connect-src`, `frame-src`, `img-src`, `form-action`, …) in the same PR, then checking the console on dev-web for CSP errors.
- **Wildcards don't cover the bare domain:** `https://*.analytics.google.com` does not allow `https://analytics.google.com`.
- **Redirects:** when a request is redirected to a host that isn't allowed, Chrome reports the *original* URL. The real blocked host is the redirect target (e.g. Google Ads `/pagead/1p-conversion` → regional `www.google.com.np`).
- **Saved console logs hide URLs** as `<URL>`. To see the real blocked addresses, paste this in the DevTools console (Chrome may ask you to type `allow pasting` first), reproduce, then run `copy(window.__csp.join('\n'))`:
  ```js
  window.__csp=[];document.addEventListener('securitypolicyviolation',e=>{window.__csp.push(e.violatedDirective+'  '+e.blockedURI);console.log('CSP',e.violatedDirective,e.blockedURI)})
  ```
- **Intentionally blocked today:** Microsoft Clarity (`clarity.ms`, loaded by GTM) and tawk.to chat (`embed.tawk.to`). Allowing them is an owner decision (CRET-20). Don't add them without it.
- To switch the CSP to log-only for debugging, rename the header to `Content-Security-Policy-Report-Only` in both location blocks (PR + approval, never on prod without a go-ahead).

---

## Ad & analytics tracking (CRET-13)

Live on production since 16 Nov 2026. Code: `src/lib/tracking/` (`config.ts`, `track.ts`, `clickIds.ts`), `src/components/tracking/ContactClickTracker.tsx`, `src/components/GoogleAnalytics.tsx`, and the head scripts in `src/app/layout.tsx`.

### IDs (public by design; they appear in page source)

| Tool | ID | Notes |
|---|---|---|
| Google Tag Manager | `GTM-TX24X74T` | Client's container (CRET-3), loaded first in `<head>` (`layout.tsx`). It also fires Clarity and a **second Google Ads account, `AW-17336857486`**. Who manages that account is **unknown, waiting on the owner** |
| Meta Pixel | `2163929454061954` | PageView + Lead. "Automatic advanced matching" is ON in Meta Events Manager (set there, not in code) |
| Google Ads | `AW-16930263430` ("Admizz Education Nepal Pvt. Ltd.") | Lead conversion **"Website lead (form submit)"**, label `GtbwCO_NpLkdEIaj_Yg_`: the **only Primary** website-lead conversion, count One. GA4 `generate_lead` and "Sign Up" are imported as **Secondary**; keep them Secondary or leads count twice. Enhanced conversions: off |
| GA4 | `G-EEJQYRPVP6` | From the `NEXT_PUBLIC_GA_ID` build secret |

### How it's wired

- `layout.tsx` `<head>` order: **GTM snippet → `metaPixelBootstrapScript()` → `googleTagBootstrapScript()`**. The order matters: the Google tag script reads `window.__admizzTrackingOn`, which the pixel script sets.
- **One gtag.js** configures GA4 (every host) and Google Ads (live host only). The Ads config stores the click ID (gclid) in first-party cookies.
- The pixel fires **one** PageView on load and tracks client-side navigations itself. **Never fire PageView again on route changes** (it would double-count). GA4 page views on navigation come from `GoogleAnalytics.tsx`.
- **Every form that creates a lead must call `trackConversion()` on success**, with an event ID that is also sent to the CRM:
  ```ts
  const eventId = newEventId();
  // POST to CRM with custom_fields: { ...leadTrackingFields(eventId), ... }
  // on success:
  trackConversion({ eventId, formName: "consultation-popup" }); // type defaults to "lead"
  ```
  `type`: `"lead"` (student enquiry: the only type sent to Google Ads as a conversion), `"registration"` (event/workshop sign-up), `"application"` (affiliate programme, not a student lead).
  Current callers: consultation popup (`useConsultationForm`), `RegisterForm`, `CRMFormEmbed`, IELTS `RegistrationForm`, affiliate `ApplicationForm`, `SpinWheel`, `DestinationQuiz`.
- WhatsApp/phone/email clicks: `ContactClickTracker` → `trackContact()` (dataLayer `contact_click`; the Ads contact label is empty, so nothing goes to Ads).
- `AD_USER_MATCHING = false` in `config.ts`: lead email/phone are **not** sent to Meta or Google. Turning it on needs owner approval (CRET-18).
- Known gaps: the university enquiry form isn't connected to the CRM (CRET-16); EdgeX iframe forms need a postMessage to be tracked (CRET-17); redirected URLs 404 when they carry `?gclid`/`?fbclid` (CRET-19).

### Where tracking runs, and how to test

- Ad tracking runs **only on admizzeducation.com** (`PRODUCTION_HOSTS`). On dev-web or localhost, add **`?pixel_test=1`** to any URL (remembered for the tab; `?pixel_test=0` turns it off).
- **Claude's own Chrome blocks tracking requests and strips click IDs.** Verify tracking in a person's normal Chrome with DevTools, not via Claude's browser.
- Test steps (dev-web with `?pixel_test=1`, or the live site):
  1. DevTools open **before** submitting. Submit a form with obviously fake data (e.g. name "CRET13 Test").
  2. **Console:** no CSP errors for Google or Meta.
  3. **Network:** filter `GtbwCO` (the Ads lead label). Expect the `/pagead/conversion/16930263430/` hit with status 200 (follow-up 302s ending in 200 are normal). Meta: filter `facebook.com/tr`.
  4. **Delete the test lead from the CRM** afterwards.
- Google Ads "Test installation" opens Tag Assistant. Its *Tags* tab says "no access" unless you're signed in with the Ads owner account; the Network check above is the reliable test.

---

## Commands

```bash
npm run dev          # local dev server (hot reload, no static export)
npm run build        # prebuild (sitemap + validators) → next build → ./out/

# Deploys: merge into stage (dev-web) or main (production). See "Deployment Architecture".
gh run list --branch stage --limit 3       # recent staging deploys
gh run watch <run-id> --exit-status        # follow one

# On the VPS only (troubleshooting)
docker stats admizz-edu-web-dev --no-stream
docker logs admizz-edu-web-dev -f --tail 50
```

**Prebuild hook:** `npm run build` first runs, in order: `scripts/validate-events.mjs` → `scripts/generate-sitemap.mjs` (regenerates `public/sitemap.xml`) → `scripts/generate-llms.mjs` → `scripts/validate-content.mjs`. A validator failure fails the build.

---

## Redirects

Redirects live in **two places**. Never in `next.config.ts` (`redirects()` is incompatible with `output: "export"`).

1. **Traefik labels** in the compose files (add to **both** `docker-compose.dev.yml` and `docker-compose.yml`: a `redirectregex` middleware label pair, then append its name to the router's `middlewares=` chain):

| Old URL | Destination | Code |
|---|---|---|
| `/:path+/` (trailing slash) | `/:path+` | 308 |
| `/test-preparation` | `/test-prep` | 308 |
| `/book-your-free-consultation` | `/register` | 308 |
| `/win-big-campaign` | `/campaign` | 308 |
| `/study-in-new-zealand-from-nepal` | `/study-in-newzealand-from-nepal` | 308 |
| `/tag/:slug`, `/author/:slug` | `/blogs` | 308 |
| `/blogs/page/:num` | `/blogs` | 307 |
| `/e-floating-buttons/:slug` | `/` | 308 |
| `www.admizzeducation.com` | `admizzeducation.com` | 308 (prod only) |

2. **nginx `location` blocks** in `nginx/static.conf` (301): merged consultancy pages → `/top-education-consultancy-in-nepal` or `/education-consultancy-in-kathmandu`, merged UK/USA guides → the country pages (slugs also in `src/data/retired-posts.json`), and renamed or moved URLs (NEB result, old event slugs).

Traefik uses 308/307 (the HTTP/2 equivalents of 301/302); search engines treat them the same.

---

## Blog Content

Blogs live in the repo, not in a CMS (CRET-12). Sanity is no longer used at build or run time (the workflows still pass old Sanity secrets; they're unused).

- Posts: `src/content/blog/posts/<slug>.json`, index in `src/content/blog/index.json`, images in `public/images/blog/`.
- Reads go through `src/lib/blog-content.ts`. Content rules: `docs/seo-content-rules.md`.
- To change a blog: edit the file → PR → merge (deploys). There is no webhook or auto-rebuild.

**Site facts** (numbers, ratings, contact details) come from `docs/FACTS.md`; company stats live in `src/lib/admizz-stats.ts`. Never hardcode them on a page.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout: fonts, GTM + Meta Pixel + Google tag head scripts
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Tailwind v4 @theme tokens + base styles
│   ├── [slug]/page.tsx       # Blog post pages (generateStaticParams)
│   ├── blogs/, category/[slug]/
│   ├── study-in-*/           # Country pages (CountryPageTemplate)
│   ├── study-in-*-from-nepal/# Nepal variants (NepalVariantTemplate)
│   ├── events/               # Event pages + meta.json cards
│   └── register/, test-prep/, about/, contact/, campaign/, ...  (~65 static routes)
├── components/
│   ├── layout/ (Header, Footer)
│   ├── ui/ (templates, CTAForm, consultation popup, CRMFormEmbed, FAQ, ...)
│   ├── tracking/ContactClickTracker.tsx
│   └── GoogleAnalytics.tsx
├── content/blog/             # Repo-based blog posts + index
└── lib/
    ├── tracking/             # Ad tracking: config.ts, track.ts, clickIds.ts
    ├── blog-content.ts
    └── universities.ts
nginx/static.conf             # nginx: routing, cache, gzip, 404, 301s, security headers + CSP
scripts/                      # prebuild: validate-events, generate-sitemap, generate-llms, validate-content
.github/workflows/            # ci.yml, deploy-staging.yml, deploy.yml
docs/                         # FACTS.md, seo-content-rules.md, design-system.md, plans/audits
```

---

## Key Architecture Patterns

### Static Export Rules
- `next.config.ts` uses `output: "export"`: the whole site pre-renders to `./out/` at build time.
- **Never add `export const dynamic = "force-dynamic"`**; it breaks the static export build.
- Dynamic blog/category pages use `generateStaticParams()`; slugs are read from `src/content/blog` at build time.
- No API routes, no middleware, no server actions. Forms post directly to the CRM (`edgex.zunkireelabs.com`) from the browser.

### Templates
- **`CountryPageTemplate`** for all country pages; **`NepalVariantTemplate`** for all "from Nepal" pages. Don't build them from scratch.

### Component Conventions
- **Client components** (`"use client"`): `FAQ`, `CTAForm`, `SpinWheel`, `MoreArticles`, forms, tracking components.
- **Server components**: all page and layout files. No `"use client"` unless strictly needed.
- **CTAForm variants**: `colorScheme="light"` (white card) or `colorScheme="dark"` (navy card).

### Fonts
- **Montserrat** 300–700 and **Rubik** (select headings) via `next/font/google` in `src/app/layout.tsx`.

---

## Tailwind v4 Design Tokens

Defined via `@theme` in `src/app/globals.css`. Use class names directly (e.g. `bg-navy`, `text-blue-royal`).

| Token | Hex | Usage |
|---|---|---|
| `navy` | `#001353` | Dark headings, footer background |
| `blue-dark` | `#0D1282` | Hero gradient end, CTAs |
| `blue-royal` | `#31429C` | Hero gradient start, buttons, links |
| `blue-oxford` | `#002147` | Alternative dark |
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

- **Canonical URLs**: no trailing slash, e.g. `https://admizzeducation.com/study-in-uk`
- **Sitemap**: auto-generated at `public/sitemap.xml` on every build (check the file for the count)
- **Content rules**: `docs/seo-content-rules.md`; `scripts/validate-content.mjs` fails the build if a repo-authored post breaks them
- **Metadata**: every page exports `metadata: Metadata` with title, description, canonical, openGraph
- **Structured data**: JSON-LD on high-value pages (country pages, blog posts)
- **OG images**: `public/images/og/`

---

## Quality Standards

```
1. Build must pass: npm run build (produces out/ with no errors)
2. TypeScript strict: no `any` types
3. Follow existing patterns (use templates, don't reinvent)
4. stage (dev-web) first; production only on Sadin's explicit go-ahead
5. Never add force-dynamic to any page
6. Never add 'out' to .dockerignore
7. Redirects go in Traefik labels or nginx/static.conf, never next.config.ts
8. New page → confirm its URL appears in public/sitemap.xml
9. New lead form → calls trackConversion() on success (see Ad & analytics tracking)
10. New third-party tool → its hosts added to the CSP, and the console checked on dev-web
11. Changed how something works → update this file in the same PR
```

---

## Events System

Event cards on `/events` are auto-detected at build time from `meta.json` files.

**To add an event:** create `src/app/events/your-event/page.tsx` and `src/app/events/your-event/meta.json`, then deploy. The card appears automatically. No `meta.json` = the page exists but isn't listed (e.g. `spin-and-win-v2`, `spin-and-win-terms-and-conditions`). `EventsInit.tsx` moves past events (by `endDate`) to the Past tab at runtime.

**`meta.json` fields:**
```json
{
  "title": "Event Name — Location",
  "eyebrow": "Admizz Education Presents",
  "bannerTitle": "EVENT NAME",
  "subtitle": "Short tagline",
  "description": "Card body text (1–2 sentences).",
  "dateLabel": "March 17, 2026 • 10:00 AM",
  "ctaText": "Register Now →",
  "endDate": "2026-03-17T17:00:00",
  "gradient": "linear-gradient(135deg, #012169 0%, #C8102E 100%)",
  "mode": "in-person",
  "overlayLight": true,
  "href": "/events/your-event"
}
```
- `mode`: `"online"` or `"in-person"`; `overlayLight`: `true` for dark gradients, `false` for light ones; `endDate`: ISO datetime.

**Build-time validation** (`scripts/validate-events.mjs`, prebuild) fails the build if an event has a missing/invalid `endDate`, an `endDate` matching the `*-12-31T23:59:59` placeholder, or a `dateLabel` containing `Coming Soon`, `TBA`, `TBD` or `Stay Tuned`. Never ship a placeholder date; create the `meta.json` only once the real date is known.

**Exception: Spin & Win is hardcoded** in `events/page.tsx` because the `spin-and-win` folder is owned by root (can't write `meta.json`). Keep the hardcoded card until that permission is fixed.

---

## Gotchas & Hard-Won Lessons

| Gotcha | Detail |
|---|---|
| CSP silently blocks new tools | Any host not in `$csp` (`nginx/static.conf`) is blocked with only a console error. Add hosts in the same PR and check the console on dev-web |
| CSP and redirects | A blocked redirect target is reported under the *original* URL; the missing host is where it redirected to |
| Tracking off on dev-web | Ad tracking only runs on admizzeducation.com; use `?pixel_test=1` elsewhere |
| Claude's Chrome can't verify tracking | It blocks tracking requests and strips click IDs. Verify in a person's DevTools |
| Double conversions | GA4 `generate_lead` / "Sign Up" must stay Secondary in Google Ads; never fire Meta PageView on route changes |
| Test leads are real | Every test submit creates a CRM lead (and an ad conversion on the live site). Use a fake name like "CRET13 Test" and delete it after |
| `out/` in `.dockerignore` | Breaks the Docker build (`COPY out/` fails) |
| `force-dynamic` on any page | Crashes the static export build |
| `headers()` / `redirects()` in `next.config.ts` | Incompatible with `output: "export"`; use nginx/Traefik |
| 404 page path | Next.js exports the custom 404 to `/404.html` (root); nginx `error_page` points there |
| Content freshness | Static export = content frozen at build time; changes appear after the next merge/deploy |
| Default branch | GitHub's default is `deploy/static-export-migration`; `gh pr create` without `--base stage` targets the wrong branch |
| Squash promotions | `stage`→`main` PRs are squash-merged, so `git log main..stage` lists old commits that are already on main. Compare **content** with `git diff origin/main origin/stage` instead |
