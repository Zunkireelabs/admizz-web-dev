// Shared renderer for agent-authored blog posts (src/app/blogs/<slug>/page.tsx).
//
// Unlike the Sanity-backed /[slug]/page.tsx template, a post using this
// component has no CMS document behind it — its content is a plain,
// JSON-serializable data object sitting right in its own page.tsx, committed
// like any other file in the repo. This component owns ALL of the JSX/markup
// so every generated post's page.tsx can stay a tiny, safe data literal (see
// that file's own comment for why data-as-props, not content interpolated
// directly into JSX, is what keeps a post with quotes/braces/backticks in its
// title or body from ever producing broken TypeScript).
//
// Categories: real ones only (server/generators/blog-outline.js validates
// every category against the site's own live Sanity taxonomy before a post
// is ever drafted — an invented category never reaches here).
//
// Related articles: intentionally SAME-SOURCE-ONLY — other locally-generated
// posts from src/data/generated-posts.json, never a cross-link into Sanity.
// Mixing sources here would mean either fetching Sanity at render time (this
// component has no Sanity credential and shouldn't need one) or guessing at
// topical relevance across two completely different taxonomies, which is
// exactly the kind of unverified behavior this codebase avoids elsewhere.
// Computed at render/build time from the manifest (not baked in at
// generation time), so it never goes stale as new posts are added later.
import Link from "next/link";
import ArticleInfoBox from "@/components/ArticleInfoBox";
import PostSummary from "@/components/PostSummary";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import BlogCtaBanner from "@/components/BlogCtaBanner";
import AdmizzTrustBox from "@/components/AdmizzTrustBox";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";
import CTAForm from "@/components/ui/CTAForm";
import generatedPostsData from "@/data/generated-posts.json";
import type { GeneratedPostManifestEntry } from "@/types";
import { renderMarkdownLite } from "./lib/markdown-lite";

export interface GeneratedBlogPostSection {
  heading: string;
  body: string;
}

export interface GeneratedBlogPostCategory {
  slug: string;
  title: string;
}

export interface GeneratedBlogPostProps {
  slug: string;
  title: string;
  sections: GeneratedBlogPostSection[];
  featuredImage?: { url: string; alt?: string } | null;
  categories?: GeneratedBlogPostCategory[];
  infoBox?: { label: string; value: string }[];
  publishedAt?: string | null;
  // All optional, so every existing generated post keeps rendering unchanged.
  // description: used for the BlogPosting schema (falls back to the first
  // sentences of the body). quickAnswer: the same visible answer-first card the
  // Sanity template shows. faqItems: a visible FAQ plus matching FAQPage schema —
  // schema is only ever emitted alongside the visible FAQ, never on its own.
  description?: string | null;
  quickAnswer?: string | null;
  faqItems?: { question: string; answer: string }[] | null;
  updatedAt?: string | null;
  // Public path of this post, e.g. "/my-slug". Defaults to "/blogs/<slug>".
  path?: string;
  // Hand-written HTML body (styles are scoped exactly like a Sanity rawHtml
  // block). When set it replaces `sections`.
  html?: string | null;
  // Portable Text array copied from a Sanity post (rendered by the same
  // PortableTextRenderer the Sanity template uses). Replaces `sections`.
  content?: unknown[] | null;
  // FAQPage schema only, no visible FAQ section: for a body that already
  // shows its own FAQ.
  faqSchemaOnly?: boolean;
}

const SITE = "https://admizzeducation.com";

// Plain-text first ~160 chars of the body, used only when no description is
// passed. Strips the light Markdown the generator allows.
function fallbackDescription(sections: GeneratedBlogPostSection[]): string | undefined {
  const text = (sections[0]?.body || "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*`_#>-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return undefined;
  return text.length <= 160 ? text : `${text.slice(0, 157).replace(/\s+\S*$/, "")}...`;
}

// Up to 3: same-category posts first (real topical relevance), most-recent
// others filling any remaining slots — never the current post itself.
function relatedPosts(currentSlug: string, categories: GeneratedBlogPostCategory[]): GeneratedPostManifestEntry[] {
  const others = (generatedPostsData as GeneratedPostManifestEntry[]).filter((p) => p.slug !== currentSlug);
  const categorySlugs = new Set(categories.map((c) => c.slug));
  const byDate = (a: GeneratedPostManifestEntry, b: GeneratedPostManifestEntry) => {
    const at = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bt = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bt - at;
  };
  const sameCategory = categorySlugs.size
    ? others.filter((p) => (p.categories || []).some((c) => categorySlugs.has(c.slug))).sort(byDate)
    : [];
  const rest = others.filter((p) => !sameCategory.includes(p)).sort(byDate);
  return [...sameCategory, ...rest].slice(0, 3);
}

export default function GeneratedBlogPost({
  slug,
  title,
  sections,
  featuredImage,
  categories,
  infoBox,
  publishedAt,
  description,
  quickAnswer,
  faqItems,
  updatedAt,
  path,
  html,
  content,
  faqSchemaOnly,
}: GeneratedBlogPostProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const related = relatedPosts(slug, categories || []);

  // Same BlogPosting / BreadcrumbList / FAQPage structured data the Sanity
  // template emits, built only from this post's own real fields.
  const canonicalUrl = `${SITE}${path || `/blogs/${slug}`}`;
  const schemaDescription = description || fallbackDescription(sections);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: schemaDescription,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE}/#website` },
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...((updatedAt || publishedAt) ? { dateModified: updatedAt || publishedAt } : {}),
    ...(featuredImage?.url ? { image: featuredImage.url } : {}),
    author: {
      "@type": "EducationalOrganization",
      "@id": `${SITE}/#organization`,
      name: "Admizz Education",
      url: SITE,
    },
    publisher: {
      "@type": "EducationalOrganization",
      "@id": `${SITE}/#organization`,
      name: "Admizz Education",
      logo: { "@type": "ImageObject", url: `${SITE}/icon-192.webp` },
    },
  };
  const faqs = faqItems && faqItems.length > 0 ? faqItems : null;
  const faqSchema = faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${SITE}/` },
          { name: "Blogs", url: `${SITE}/blogs` },
          { name: title, url: canonicalUrl },
        ]}
      />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-[13px] font-semibold bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-[22px] sm:text-2xl md:text-[36px] font-bold leading-tight max-w-3xl">
            {title}
          </h1>
          {formattedDate && (
            <p className="mt-3 text-white/70 text-sm">
              By Admizz Education <span aria-hidden="true">·</span> {formattedDate}
            </p>
          )}
        </div>
      </section>

      {/* ===== CONTENT + SIDEBAR ===== */}
      <article className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="flex-1 min-w-0 max-w-3xl">
            {featuredImage?.url && (
              // eslint-disable-next-line @next/next/no-img-element -- a plain
              // remote URL (Pexels or similar), not a local/optimizable asset.
              <img
                src={featuredImage.url}
                alt={featuredImage.alt || title}
                width={1200}
                height={630}
                loading="eager"
                decoding="async"
                className="w-full h-auto rounded-lg mb-8"
              />
            )}

            {infoBox && infoBox.length > 0 && <ArticleInfoBox items={infoBox} />}

            {quickAnswer && <PostSummary text={quickAnswer} />}

            {html && <PortableTextRenderer content={[{ _type: "rawHtml", _key: "raw-html", html }]} />}

            {content && <PortableTextRenderer content={content as any[]} />}

            {!html && !content && sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-2xl md:text-[28px] font-bold text-navy mt-8 mb-4">
                  {section.heading}
                </h2>
                {renderMarkdownLite(section.body, `section-${i}`)}
              </div>
            ))}

            {faqs && !faqSchemaOnly && (
              <section id="faq">
                <h2 className="text-2xl md:text-[28px] font-bold text-navy mt-8 mb-4">
                  Frequently Asked Questions
                </h2>
                {faqs.map((item) => (
                  <div key={item.question}>
                    <h3 className="text-xl md:text-2xl font-bold text-navy mt-8 mb-4">{item.question}</h3>
                    <p className="text-base text-gray-dark leading-relaxed mb-4">{item.answer}</p>
                  </div>
                ))}
              </section>
            )}

            <AdmizzTrustBox />
          </div>

          <aside className="hidden lg:block w-[472px] shrink-0">
            <div className="sticky top-[90px]">
              <CTAForm title="Book a Free Counseling Session" colorScheme="light" formSource="blog-post" />
            </div>
          </aside>
        </div>

        <div className="lg:hidden mt-10 max-w-xl mx-auto">
          <CTAForm title="Book a Free Counseling Session" colorScheme="light" formSource="blog-post" />
        </div>
      </article>

      {/* ===== RELATED ARTICLES (other locally-generated posts only) ===== */}
      {related.length > 0 && (
        <section className="py-14 md:py-20" style={{ background: "#F8F9FF" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-[26px] md:text-[34px] font-bold text-center mb-3"
              style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}
            >
              Related Articles
            </h2>
            <p
              className="text-center text-[15px] max-w-2xl mx-auto mb-10"
              style={{ color: "#5a6275", lineHeight: 1.7 }}
            >
              Explore more articles on similar topics — tips, guides, and expert advice to help you succeed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rPost) => {
                const rDate = rPost.publishedAt
                  ? new Date(rPost.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : null;

                return (
                  <Link
                    key={rPost.slug}
                    href={rPost.href}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#eef1f6] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  >
                    {rPost.imageUrl && (
                      <div className="relative overflow-hidden" style={{ aspectRatio: "19/10" }}>
                        <img
                          src={rPost.imageUrl}
                          alt={rPost.imageAlt || rPost.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-1">
                      {rPost.categories && rPost.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {rPost.categories.map((cat) => (
                            <span
                              key={cat.slug}
                              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                              style={{ background: "#EBF2FF", color: "#1E6DEB" }}
                            >
                              {cat.title}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3
                        className="text-[16px] font-bold leading-snug mb-2 group-hover:text-[#1E6DEB] transition-colors line-clamp-2"
                        style={{ color: "#0D1282" }}
                      >
                        {rPost.title}
                      </h3>

                      {rPost.excerpt && (
                        <p className="text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ color: "#5a6275" }}>
                          {rPost.excerpt}
                        </p>
                      )}

                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#f0f2f5]">
                        {rDate && (
                          <span className="text-[12px]" style={{ color: "#9ca3af" }}>
                            {rDate}
                          </span>
                        )}
                        <span
                          className="text-[13px] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                          style={{ color: "#1E6DEB" }}
                        >
                          Read More
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA BANNER ===== */}
      <BlogCtaBanner />
    </main>
  );
}
