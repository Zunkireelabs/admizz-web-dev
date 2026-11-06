import { urlFor } from "@/lib/image";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog-content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { SanityPost } from "@/types";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import ArticleInfoBox from "@/components/ArticleInfoBox";
import PostSummary from "@/components/PostSummary";
import { postSummaries } from "@/data/post-summaries";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";
import { postFaqs } from "@/data/post-faqs";
import { postSeoOverrides } from "@/data/post-seo-overrides";
import { postFacts as writtenPostFacts } from "@/data/post-facts";
import { postFaqSchemaOnly } from "@/data/post-faq-schema";
import { postContentPatches } from "@/data/post-content-patches";
import { postSources } from "@/data/post-sources";
import PostSources from "@/components/PostSources";
import AdmizzTrustBox from "@/components/AdmizzTrustBox";
import BlogPostLayout from "@/components/BlogPostLayout";
import { applyContentPatches } from "@/lib/content-patches";
import { blogH2, blogP, blogFaqQuestion } from "@/components/lib/blog-typography";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post: SanityPost | null = getPostBySlug(slug);

  if (!post) return {};

  const seo = post.seo;
  const override = postSeoOverrides[post.slug.current];
  const title = override?.title || seo?.metaTitle || post.title;
  const description = override?.description || seo?.metaDescription || post.excerpt || "";
  const canonical =
    seo?.canonicalUrl || `https://admizzeducation.com/${post.slug.current}`;

  const ogImage = seo?.ogImage
    ? urlFor(seo.ogImage).width(1200).height(630).url()
    : post.featuredImage
      ? urlFor(post.featuredImage).width(1200).height(630).url()
      : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Admizz Education",
      type: "article",
      ...(ogImage ? { images: [ogImage] } : {}),
      ...(post.publishedAt
        ? { publishedTime: post.publishedAt }
        : {}),
    },
    ...(seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post: SanityPost | null = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Corrections kept in this repo (src/data/post-content-patches.ts) are applied
  // to the body here, so outdated facts can be fixed without editing Sanity.
  const patchSet = postContentPatches[post.slug.current];
  const bodyContent = applyContentPatches(post.content, patchSet, post.slug.current);

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const featuredImageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).auto("format").url()
    : null;

  // Fetch related posts by shared categories
  const categorySlugs = post.categories?.map((c) => c.slug.current) || [];
  const relatedPosts: SanityPost[] = categorySlugs.length > 0
    ? getRelatedPosts(slug, categorySlugs)
    : [];

  // Real BlogPosting structured data, built only from this post's own real
  // fields (headline/description/date/image) — never invented. Every post
  // on the site goes through this one route, so this closes the "add
  // schema markup" gap sitewide in one place instead of per-post.
  const canonicalUrl = post.seo?.canonicalUrl || `https://admizzeducation.com/${post.slug.current}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt || undefined,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: "en",
    isPartOf: { "@id": "https://admizzeducation.com/#website" },
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...((patchSet?.updated || post._updatedAt || post.publishedAt)
      ? { dateModified: patchSet?.updated || post._updatedAt || post.publishedAt }
      : {}),
    ...(featuredImageUrl
      ? { image: featuredImageUrl.startsWith("http") ? featuredImageUrl : `https://admizzeducation.com${featuredImageUrl}` }
      : {}),
    author: {
      "@type": "EducationalOrganization",
      "@id": "https://admizzeducation.com/#organization",
      name: "Admizz Education",
      url: "https://admizzeducation.com",
    },
    publisher: {
      "@type": "EducationalOrganization",
      "@id": "https://admizzeducation.com/#organization",
      name: "Admizz Education",
      logo: {
        "@type": "ImageObject",
        url: "https://admizzeducation.com/icon-192.webp",
      },
    },
  };

  // FAQPage schema is only emitted alongside a real, visible FAQ. Posts that
  // already carry faqItems (matching their own in-body FAQ section) are
  // untouched. For a post with none, a curated entry in postFaqs is used AND
  // rendered visibly below the body — unless the body already has its own FAQ
  // heading, in which case neither is added (a page never gets a 2nd FAQ).
  const bodyHasFaq = (post.content || []).some(
    (b: { _type?: string; style?: string; children?: { text?: string }[] }) =>
      b._type === "block" &&
      /^h[1-6]$/.test(b.style || "") &&
      /faq|frequently asked/i.test((b.children || []).map((c) => c.text || "").join("")),
  );
  const ownFaqItems = post.faqItems && post.faqItems.length > 0 ? post.faqItems : null;
  const curatedFaqItems = !ownFaqItems && !bodyHasFaq ? postFaqs[post.slug.current] || null : null;
  // Schema-only items: the body already shows these questions, so no visible
  // section is added (see post-faq-schema.ts).
  const schemaOnlyFaqItems = !ownFaqItems && !curatedFaqItems ? postFaqSchemaOnly[post.slug.current] || null : null;
  const faqItems = ownFaqItems || curatedFaqItems || schemaOnlyFaqItems;
  const faqSchema = faqItems ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } : null;

  const bodyWords = JSON.stringify(post.content || "").replace(/<[^>]+>|\\n|"[a-zA-Z_]+":/g, " ").split(/\s+/).filter(Boolean).length;
  const postFacts = writtenPostFacts[post.slug.current] ?? [
    ...(post.categories?.[0] ? [{ label: "Topic", value: post.categories[0].title }] : []),
    ...(formattedDate ? [{ label: "Published", value: formattedDate }] : []),
    { label: "Reading Time", value: `${Math.max(2, Math.round(bodyWords / 220))} min read` },
    { label: "Written By", value: "Admizz Education" },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://admizzeducation.com/" },
          { name: "Blogs", url: "https://admizzeducation.com/blogs" },
          { name: post.title, url: canonicalUrl },
        ]}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogPostLayout
        title={post.title}
        categories={post.categories?.map((c) => ({ slug: c.slug.current, title: c.title }))}
        dateLabel={formattedDate}
        featuredImage={featuredImageUrl ? { src: featuredImageUrl, alt: post.featuredImage?.alt } : null}
        related={relatedPosts.map((r) => ({
          slug: r.slug.current,
          title: r.title,
          excerpt: r.excerpt,
          image: r.featuredImage ? urlFor(r.featuredImage).width(600).auto("format").url() : null,
          imageAlt: r.featuredImage?.alt,
          categories: r.categories?.map((c) => ({ slug: c.slug.current, title: c.title })),
          dateLabel: r.publishedAt
            ? new Date(r.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
            : null,
        }))}
      >
            {/* Info Box */}
            {post.infoBox && <ArticleInfoBox items={post.infoBox} />}

            {/* Quick Answer (visible, answer-first summary — curated posts only) */}
            {postSummaries[post.slug.current] && (
              <PostSummary text={postSummaries[post.slug.current]} />
            )}

            {/* Body */}
            {post.content && <PortableTextRenderer content={bodyContent ?? post.content} factsTitle="At a Glance" facts={postFacts} />}

            {/* Visible FAQ (only for posts whose body has none) — same
                heading/paragraph styles as the body, so it reads as native. */}
            {curatedFaqItems && (
              <section id="faq">
                <h2 className={blogH2.className} style={blogH2.style}>
                  Frequently Asked Questions
                </h2>
                {curatedFaqItems.map((item) => (
                  <div key={item.question}>
                    <h3 className={blogFaqQuestion.className} style={blogFaqQuestion.style}>
                      {item.question}
                    </h3>
                    <p className={blogP.className} style={blogP.style}>{item.answer}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Official sources + "checked in" line (only for posts with an entry in post-sources.ts) */}
            {postSources[post.slug.current] && <PostSources entry={postSources[post.slug.current]} />}

            {/* "About this guide" publisher box (SEO / GEO trust signal), same on every post */}
            <AdmizzTrustBox />
      </BlogPostLayout>
    </main>
  );
}
