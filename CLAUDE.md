# CLAUDE.md - Project Intelligence

## Project Overview

**Project**: Admizz Education Website
**Tech Stack**: Next.js 16.1.6, React, TypeScript, Tailwind CSS v4, Sanity CMS, Docker, Nginx

---

## Automatic Skill Routing

When the user gives ANY development request, **automatically invoke `/project-pm`**.

### Trigger Patterns (auto-invoke PM):
- "Build/Create/Implement/Add X"
- "Fix/Update/Change/Refactor X"
- Feature requests or bug fixes

### Exceptions (do NOT auto-invoke):
- Questions: "How does X work?"
- Reading: "Show me X"
- Documentation tasks
- Direct skill invocation (`/skill-name`)

---

## Available Skills

| Skill | Domain | When to Use |
|-------|--------|-------------|
| `/project-pm` | **Orchestrator** | All development tasks (routes to specialists) |
| `/nextjs-page-builder` | **Generator** | New country pages, Nepal variants, SEO landing pages, static pages |
| `/seo-specialist` | **Specialist** | Metadata audits, structured data syntax, sitemap, canonicals, redirects |
| `/aeo-geo-specialist` | **Specialist** | AI Search Optimization (AEO/GEO/LLMO) — content extractability, citation signals, AI-bot access, ChatGPT/Perplexity/AI Overviews/Claude tactics |
| `/frontend-dev` | **Specialist** | React components, Tailwind styling, responsive layouts, accessibility |
| `/deploy` | **Utility** | Docker builds, dev/prod deployments, health checks |
| `/sanity-cms` | **Specialist** | Sanity schemas, GROQ queries, content migration, Portable Text |
| `/skill-architect` | **Meta** | Create/optimize skills, analyze coverage |

---

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Deploy (dev first, prod only on explicit instruction)
./deploy.sh
```

---

## Project Structure

```
admizz-edu-web-dev/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   └── ui/           # CTAForm, FAQ, Hero, Stats, Testimonials, etc.
│   ├── lib/              # Queries, utilities
│   ├── sanity/           # Sanity CMS schemas
│   └── types/            # TypeScript types
├── public/               # Static assets (images, icons)
├── nginx/                # Nginx config for static export
├── webhook/              # Auto-rebuild webhook server
├── docs/                 # Documentation, scraped content
├── docker-compose.yml    # Production Docker setup
└── CLAUDE.md
```

---

## Key Architecture Patterns

- **Tailwind v4**: `@theme` directive in `globals.css` for custom colors
- **Font**: Montserrat 300-700 via `next/font/google`
- **Templates**: `CountryPageTemplate` for country pages, `NepalVariantTemplate` for Nepal variants
- **Hero gradient**: `bg-gradient-to-r from-blue-royal to-blue-dark text-white`
- **CTA button**: `bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px]`
- **Design tokens**: rounded-[10px], text-[15px] body, py-16 px-4 sections, max-w-7xl containers

---

## Quality Standards

```
1. Code compiles without errors (npx next build)
2. TypeScript strict (no `any`)
3. Follows existing component patterns
4. Deploy to dev first, prod only on explicit instruction
```

---

## Constraints

- Standalone output via Next.js (`output: 'standalone'`) served by Node.js in Docker
- Static pages built at build time via `generateStaticParams()`
- Sanity CMS for blog content only
- Always verify build after changes
