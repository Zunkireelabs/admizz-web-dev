// Renderer for repo-authored blog posts (src/app/<slug>/page.tsx + an entry in src/data/generated-posts.json).
//
// DESIGN RULE: this file contains NO page design of its own. The page frame (hero, sticky consultation form,
// Related Articles, CTA banner) is src/components/BlogPostLayout.tsx, the same component src/app/[slug]/page.tsx
// uses for the 181 standard posts, and the body pieces (PostSummary, FactsCard "At a Glance", PostSources,
// AdmizzTrustBox, FAQ) are the same components too. To change how blogs look, edit those shared components.
// Never copy their markup in here, or the two post types drift apart again.
//
// Content is a plain JSON-serializable data object inside the post's own page.tsx (data-as-props, so quotes or
// braces in a title or body can never produce broken TypeScript). Related articles are other repo-authored posts
// from src/data/generated-posts.json, computed at build time.
import ArticleInfoBox from "@/components/ArticleInfoBox";
import PostSummary from "@/components/PostSummary";
import PortableTextRenderer, { FactsCard, type BodyBlock } from "@/components/PortableTextRenderer";
import { postFacts as writtenPostFacts } from "@/data/post-facts";
import PostSources from "@/components/PostSources";
import AdmizzTrustBox from "@/components/AdmizzTrustBox";
import BlogPostLayout from "@/components/BlogPostLayout";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";
import generatedPostsData from "@/data/generated-posts.json";
import type { GeneratedPostManifestEntry } from "@/types";
import { renderMarkdownLite } from "./lib/markdown-lite";
import { blogH2, blogP, blogFaqQuestion } from "./lib/blog-typography";

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
  // Same "At a Glance" card every other post opens with (see [slug]/page.tsx): hand-written facts when the post has
  // them, otherwise built from data the post already has.
  const bodyWordCount = sections.map((x) => x.body).join(" ").split(/\s+/).filter(Boolean).length;
  const factsDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
    : null;
  const sectionFacts = writtenPostFacts[slug] ?? (infoBox && infoBox.length > 0 ? infoBox : null) ?? [
    ...(categories?.[0] ? [{ label: "Topic", value: categories[0].title }] : []),
    ...(factsDate ? [{ label: "Published", value: factsDate }] : []),
    { label: "Reading Time", value: `${Math.max(2, Math.round(bodyWordCount / 220))} min read` },
    { label: "Written By", value: "Admizz Education" },
  ];

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
  // citation: the official pages listed in the post's own "Sources" section (external links only).
  const sourcesBody = sections.find((x) => x.heading.trim().toLowerCase() === "sources")?.body || "";
  const citations = [...sourcesBody.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => ({
    "@type": "CreativeWork",
    name: m[1],
    url: m[2],
  }));
  // The "Sources" section is shown with the same card every other post uses (PostSources), not as plain body text.
  // Links become the card rows, "checked in <Month Year>" becomes its footer, and any other sentence (for example a
  // caveat about a page we could not open) stays visible as a paragraph above the card.
  const sourceLinks = [...sourcesBody.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => ({ label: m[1], url: m[2] }));
  const checkedIn = sourcesBody.match(/checked[^.]*?\bin ([A-Z][a-z]+ \d{4})/i)?.[1];
  const sourceNote = sourcesBody
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !/^[-*]\s+\[/.test(l))
    .join(" ");
  const showSourcesCard = sourceLinks.length > 0;
  const bodySections = showSourcesCard ? sections.filter((x) => x.heading.trim().toLowerCase() !== "sources") : sections;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    ...(citations.length > 0 ? { citation: citations } : {}),
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
      {/* The page frame (hero, sidebar form, Related Articles, CTA banner) is the one shared blog design. */}
      <BlogPostLayout
        title={title}
        categories={categories}
        dateLabel={formattedDate}
        featuredImage={featuredImage?.url ? { src: featuredImage.url, alt: featuredImage.alt } : null}
        related={related.map((r) => ({
          slug: r.slug,
          title: r.title,
          excerpt: r.excerpt,
          image: r.imageUrl,
          imageAlt: r.imageAlt,
          categories: r.categories,
          dateLabel: r.publishedAt
            ? new Date(r.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
            : null,
        }))}
      >
            {(html || content) && infoBox && infoBox.length > 0 && <ArticleInfoBox items={infoBox} />}

            {quickAnswer && <PostSummary text={quickAnswer} />}

            {html && <PortableTextRenderer content={[{ _type: "rawHtml", _key: "raw-html", html }]} />}

            {content && <PortableTextRenderer content={content as BodyBlock[]} />}

            {!html && !content && sectionFacts.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#001353]">Introduction</span>
                  <span className="flex-1 h-px bg-[#001353]/20" />
                </div>
                <FactsCard title="At a Glance" facts={sectionFacts} />
              </div>
            )}

            {!html && !content && bodySections.map((section, i) => (
              <div key={i}>
                <h2 className={blogH2.className} style={blogH2.style}>
                  {section.heading}
                </h2>
                {renderMarkdownLite(section.body, `section-${i}`, "blog")}
              </div>
            ))}

            {faqs && !faqSchemaOnly && (
              <section id="faq">
                <h2 className={blogH2.className} style={blogH2.style}>
                  Frequently Asked Questions
                </h2>
                {faqs.map((item) => (
                  <div key={item.question}>
                    <h3 className={blogFaqQuestion.className} style={blogFaqQuestion.style}>{item.question}</h3>
                    <p className={blogP.className} style={blogP.style}>{item.answer}</p>
                  </div>
                ))}
              </section>
            )}

            {!html && !content && showSourcesCard && sourceNote && renderMarkdownLite(sourceNote, "sources-note", "blog")}

            {!html && !content && showSourcesCard && (
              <PostSources entry={{ checked: checkedIn, sources: sourceLinks }} />
            )}

            <AdmizzTrustBox />
      </BlogPostLayout>
    </main>
  );
}
