#!/usr/bin/env node
// Content/SEO gate for repo-authored posts (src/data/generated-posts.json).
// Rules live in docs/seo-content-rules.md. Runs in prebuild AFTER generate-sitemap.mjs
// so it can confirm every post made it into public/sitemap.xml.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const SITE = 'https://admizzeducation.com';
const errors = [];
const warnings = [];

const manifest = JSON.parse(readFileSync(join(ROOT, 'src/data/generated-posts.json'), 'utf8'));
const sitemap = existsSync(join(ROOT, 'public/sitemap.xml'))
  ? readFileSync(join(ROOT, 'public/sitemap.xml'), 'utf8')
  : '';

// Posts published before these rules existed and not yet backfilled. NEVER add a new post here.
const LEGACY_EXEMPT = new Set([]);

// One look for every blog. Older posts keep their own <style> (listed in own-css-posts.json) and are restyled by the
// shared sheet. A NEW post may not bring its own CSS: write it as sections so it matches every other post.
{
  const OWN_CSS = new Set(JSON.parse(readFileSync(join(ROOT, 'src/data/own-css-posts.json'), 'utf8')).slugs);
  const postsDir = join(ROOT, 'src/content/blog/posts');
  if (existsSync(postsDir)) {
    for (const f of readdirSync(postsDir).filter((x) => x.endsWith('.json'))) {
      const slug = f.replace(/\.json$/, '');
      if (OWN_CSS.has(slug)) continue;
      const post = JSON.parse(readFileSync(join(postsDir, f), 'utf8'));
      const hasStyle = (post.content || []).some((b) => b._type === 'rawHtml' && /<style[\s>]/i.test(b.html || ''));
      if (hasStyle) errors.push(`src/content/blog/posts/${f}: carries its own <style>; write it as plain sections so it uses the shared blog design`);
    }
  }
  for (const entry of manifest) {
    const dir = join(ROOT, 'src/app', entry.slug);
    for (const name of ['page.tsx', 'content.ts', 'content.tsx']) {
      const p = join(dir, name);
      if (existsSync(p) && /<style[\s>]/i.test(readFileSync(p, 'utf8')) && !OWN_CSS.has(entry.slug)) {
        errors.push(`src/app/${entry.slug}/${name}: carries its own <style>; use the shared blog design instead`);
      }
    }
  }
}

const seen = new Set();

for (const entry of manifest) {
  const { slug } = entry;
  const where = `generated-posts.json[${slug}]`;

  if (seen.has(slug)) errors.push(`${where}: duplicate slug in manifest`);
  seen.add(slug);

  for (const field of ['title', 'excerpt', 'imageUrl', 'publishedAt', 'href']) {
    if (!entry[field]) errors.push(`${where}: missing "${field}"`);
  }
  if (!Array.isArray(entry.categories) || entry.categories.length === 0) {
    errors.push(`${where}: needs at least one category`);
  }

  const pagePath = join(ROOT, 'src/app', slug, 'page.tsx');
  if (!existsSync(pagePath)) {
    errors.push(`${where}: no page at src/app/${slug}/page.tsx`);
    continue;
  }
  const src = readFileSync(pagePath, 'utf8');
  const bodyFile = ['content.ts', 'content.tsx'].map((f) => join(ROOT, 'src/app', slug, f)).find(existsSync);
  const body = src + (bodyFile ? readFileSync(bodyFile, 'utf8') : '');
  const legacy = LEGACY_EXEMPT.has(slug);
  const file = `src/app/${slug}/page.tsx`;

  if (!legacy && !/"quickAnswer"\s*:\s*"[^"]{20,}/.test(src)) {
    errors.push(`${file}: missing a "quickAnswer" (visible answer-first summary)`);
  }
  if (!/"faqItems"\s*:\s*\[\s*\{/.test(src)) {
    errors.push(`${file}: missing visible "faqItems"`);
  }
  if (!src.includes(`${SITE}/${slug}`)) {
    errors.push(`${file}: metadata canonical must be ${SITE}/${slug} (no trailing slash)`);
  }
  if (!legacy && !/"heading"\s*:\s*"Sources"|<h2[^>]*>\s*Sources/i.test(body)) {
    errors.push(`${file}: missing a "Sources" section (official sources are required)`);
  }

  // Only the <head> metadata counts; the on-page H1 ("title" in the post literal) may be longer.
  const metaBlock = src.slice(src.indexOf('export const metadata'));
  const title = (metaBlock.match(/^\s+title:\s*"([^"]+)"/m) || [])[1] || '';
  const desc = (metaBlock.match(/^\s+description:\s*"([^"]+)"/m) || [])[1] || '';
  if (!title) errors.push(`${file}: metadata has no title`);
  if (!desc) errors.push(`${file}: metadata has no description`);
  if (title.length > 65) errors.push(`${file}: metadata title is ${title.length} chars (keep under 60-65 so it is not truncated)`);
  if (desc.length > 165) errors.push(`${file}: metadata description is ${desc.length} chars (keep under 160)`);

  // American English (docs/seo-content-rules.md). Official names are exempt, so they are blanked out first.
  const visible = body
    .replace(/Confirmation of Enrolment|sponsor licence|Visa Application Centre|Orange Knowledge Programme|honours degree/gi, '')
    .replace(/\]\([^)]*\)/g, ']()')   // ignore link URLs
    .replace(/"(?:path|slug|href)"\s*:\s*"[^"]*"/g, '')
    .replace(/https?:\/\/[^\s"')]+/g, '')       // absolute URLs (canonical, og:url, sources)
    .replace(/"\/[^"\s]*"/g, '""');               // site paths and image paths
  const brit = visible.match(/\b(counsell\w*|recognis\w*|personalis\w*|customis\w*|organis\w*|specialis\w*|programmes?|enrolments?|centres?|advisers?|practise|travelling|Nepalese)\b/gi);
  if (brit) errors.push(`${file}: British spelling or "Nepalese" in visible text (${[...new Set(brit.map((w) => w.toLowerCase()))].join(', ')}). Use American English and "Nepali"`);
  const dayFirst = visible.match(/\b\d{1,2} (January|February|March|April|May|June|July|August|September|October|November|December)\b/);
  if (dayFirst) errors.push(`${file}: day-first date "${dayFirst[0]}". Use month-first, e.g. November 30, 2026`);

  if (legacy) warnings.push(`${file}: legacy post exempt from quickAnswer/Sources, backfill it`);

  if (sitemap && !sitemap.includes(`<loc>${SITE}/${slug}</loc>`)) {
    errors.push(`${where}: URL is missing from public/sitemap.xml`);
  }
}

for (const w of warnings) console.warn('  warn: ' + w);

if (errors.length) {
  console.error('\nContent validation failed (see docs/seo-content-rules.md):\n');
  for (const e of errors) console.error('  - ' + e);
  console.error('');
  process.exit(1);
}

console.log(`content: ${manifest.length} repo-authored posts passed validation`);
