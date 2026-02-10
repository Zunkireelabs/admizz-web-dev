# Admizz Education — TODO

## Completed
- [x] Set up Sanity project (project ID: vd27cmpc, dataset: production)
- [x] Configure `.env.local` with Sanity credentials
- [x] Set up Sanity content model (post, category, seo schemas)
- [x] Migrate static page content from WordPress
- [x] Migrate blog content to Sanity (138 posts, 13 categories, 138 images)
- [x] Build blog pages with Sanity integration ([slug], /blogs/, /category/[slug]/)
- [x] Generate sitemap (188 URLs via pre-build script)
- [x] Generate robots.txt
- [x] SEO metadata parity validation (137/138 match, 1 expected conflict)
- [x] URL parity validation (188/188 matched)
- [x] Canonical URL validation (187/187 correct)
- [x] Docker image build test (passed)

## Remaining
- [ ] Git commit all work
- [ ] Deploy to dev-web.admizzeducation.com
- [ ] Lighthouse performance audit on dev site
- [ ] Production cutover (swap DNS from WordPress to new site)
