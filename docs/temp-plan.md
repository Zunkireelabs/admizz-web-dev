Admizz Education — Foundational Project Setup Plan                                                                                │
│                                                                                                                                   │
│ Context                                                                                                                           │
│                                                                                                                                   │
│ Setting up the Next.js static export project skeleton for the Admizz Education WordPress migration. No pages, no content — just   │
│ the infrastructure, tooling, and configuration so everything is ready for the migration work.                                     │
│                                                                                                                                   │
│ Domains:                                                                                                                          │
│ - Dev: dev-web.admizzeducation.com (already pointed to VPS)                                                                       │
│ - Prod: admizzeducation.com (locked behind root password, not used yet)                                                           │
│                                                                                                                                   │
│ ---                                                                                                                               │
│ Step 1: Initialize Next.js Project                                                                                                │
│                                                                                                                                   │
│ - Run npx create-next-app@latest with TypeScript, Tailwind CSS v4, App Router, src/ directory                                     │
│ - Clean out boilerplate content (default page content, styles) but keep the structure                                             │
│                                                                                                                                   │
│ Step 2: Configure next.config.ts                                                                                                  │
│                                                                                                                                   │
│ Per template — static export mode:                                                                                                │
│ output: "export"                                                                                                                  │
│ trailingSlash: true                                                                                                               │
│ images: { unoptimized: true }                                                                                                     │
│ eslint: { ignoreDuringBuilds: true }                                                                                              │
│                                                                                                                                   │
│ Step 3: Create Project Directory Structure                                                                                        │
│                                                                                                                                   │
│ src/                                                                                                                              │
│ ├── app/                                                                                                                          │
│ │   ├── layout.tsx        (bare shell — no page content)                                                                          │
│ │   ├── page.tsx           (empty placeholder)                                                                                    │
│ │   └── globals.css        (Tailwind imports only)                                                                                │
│ ├── components/                                                                                                                   │
│ │   ├── ui/               (empty — ready for components)                                                                          │
│ │   └── layout/           (empty — ready for Header/Footer etc.)                                                                  │
│ ├── lib/                                                                                                                          │
│ │   ├── sanity.ts         (Sanity client — placeholder config via env vars)                                                       │
│ │   └── queries.ts        (GROQ queries — empty exports for now)                                                                  │
│ └── types/                                                                                                                        │
│     └── index.ts          (empty — ready for type definitions)                                                                    │
│                                                                                                                                   │
│ Step 4: Sanity Client Placeholder                                                                                                 │
│                                                                                                                                   │
│ - Install @sanity/client and next-sanity                                                                                          │
│ - Create src/lib/sanity.ts with client reading from env vars:                                                                     │
│   - NEXT_PUBLIC_SANITY_PROJECT_ID                                                                                                 │
│   - NEXT_PUBLIC_SANITY_DATASET                                                                                                    │
│ - Create .env.local.example documenting required env vars                                                                         │
│ - Create empty src/lib/queries.ts                                                                                                 │
│                                                                                                                                   │
│ Step 5: Environment Files                                                                                                         │
│                                                                                                                                   │
│ - .env.local.example with all required env vars documented                                                                        │
│ - No actual .env.local committed (will be created manually)                                                                       │
│                                                                                                                                   │
│ Step 6: Nginx Config                                                                                                              │
│                                                                                                                                   │
│ - Create nginx/static.conf per template (static serving, 1yr cache, gzip, SPA fallback)                                           │
│                                                                                                                                   │
│ Step 7: Dockerfile                                                                                                                │
│                                                                                                                                   │
│ - Nginx Alpine-based, copies out/ into container, per template                                                                    │
│                                                                                                                                   │
│ Step 8: Docker Compose Files                                                                                                      │
│                                                                                                                                   │
│ - docker-compose.dev.yml — container admizz-edu-web-dev, domain dev-web.admizzeducation.com, Traefik labels, hosting network      │
│ - docker-compose.yml — container admizz-edu-web-prod, domain admizzeducation.com, www redirect middleware, Traefik labels,        │
│ hosting network                                                                                                                   │
│                                                                                                                                   │
│ Step 9: Deployment Script (deploy.sh)                                                                                             │
│                                                                                                                                   │
│ - Accepts dev or prod argument                                                                                                    │
│ - Dev: builds and deploys normally                                                                                                │
│ - Prod: requires root password verification before proceeding (using su -c to validate root credentials)                          │
│ - Runs: npm install → npm run build → verify out/ exists → docker compose build --no-cache → down → up -d                         │
│                                                                                                                                   │
│ Step 10: Bare Layout & Globals                                                                                                    │
│                                                                                                                                   │
│ - src/app/layout.tsx — minimal HTML shell with <html>, <body>, children, Tailwind globals import                                  │
│ - src/app/page.tsx — simple placeholder text ("Admizz Education — Setup Complete")                                                │
│ - src/app/globals.css — Tailwind v4 imports only                                                                                  │
│                                                                                                                                   │
│ Step 11: TODO Tracker                                                                                                             │
│                                                                                                                                   │
│ - Create docs/TODO.md to track pending items:                                                                                     │
│   - Set up Sanity project (project ID, dataset)                                                                                   │
│   - Configure .env.local with Sanity credentials                                                                                  │
│   - Migrate static page content from WordPress                                                                                    │
│   - Migrate blog content to Sanity                                                                                                │
│   - Set up Sanity content model (post, category schemas)                                                                          │
│   - Build blog pages with Sanity integration                                                                                      │
│   - Generate sitemap                                                                                                              │
│   - Generate robots.txt                                                                                                           │
│   - SEO metadata parity validation                                                                                                │
│   - URL parity validation                                                                                                         │
│   - Lighthouse performance audit                                                                                                  │
│                                                                                                                                   │
│ ---                                                                                                                               │
│ Verification                                                                                                                      │
│                                                                                                                                   │
│ 1. npm run dev — starts without errors                                                                                            │
│ 2. npm run build — produces out/ directory successfully                                                                           │
│ 3. Placeholder page renders at localhost                                                                                          │
│ 4. Docker build succeeds locally                                                                                                  │
│ 5. All directory structure in place 

