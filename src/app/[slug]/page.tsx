import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { allPostSlugsQuery, postBySlugQuery, relatedPostsQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { SanityPost } from "@/types";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import ArticleInfoBox from "@/components/ArticleInfoBox";
import CTAForm from "@/components/ui/CTAForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allPostSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) return {};

  const seo = post.seo;
  const title = seo?.metaTitle || post.title;
  const description = seo?.metaDescription || post.excerpt || "";
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
  const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

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
    ? await client.fetch(relatedPostsQuery, { slug, categorySlugs })
    : [];

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <Link
                  key={cat.slug.current}
                  href={`/category/${cat.slug.current}`}
                  className="text-[13px] font-semibold bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-[22px] sm:text-2xl md:text-[36px] font-bold leading-tight max-w-3xl">
            {post.title}
          </h1>

          {formattedDate && (
            <p className="mt-3 text-white/70 text-sm">{formattedDate}</p>
          )}
        </div>
      </section>

      {/* ===== CONTENT + SIDEBAR ===== */}
      <article className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left: Blog Content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Featured Image */}
            {featuredImageUrl && (
              <img
                src={featuredImageUrl}
                alt={post.featuredImage?.alt || post.title}
                width={1200}
                height={630}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto rounded-lg mb-8"
              />
            )}

            {/* Info Box */}
            {post.infoBox && <ArticleInfoBox items={post.infoBox} />}

            {/* Body */}
            {post.content && <PortableTextRenderer content={post.content} />}
          </div>

          {/* Right: Sticky Consultation Form (desktop) */}
          <aside className="hidden lg:block w-[472px] shrink-0">
            <div className="sticky top-[90px]">
              <CTAForm title="Talk to Counselor Today" colorScheme="light" />
            </div>
          </aside>
        </div>

        {/* Mobile: Form below content */}
        <div className="lg:hidden mt-10 max-w-xl mx-auto">
          <CTAForm title="Talk to Counselor Today" colorScheme="light" />
        </div>
      </article>

      {/* ===== RELATED ARTICLES ===== */}
      {relatedPosts.length > 0 && (
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
              {relatedPosts.map((rPost) => {
                const rImage = rPost.featuredImage
                  ? urlFor(rPost.featuredImage).width(600).auto("format").url()
                  : null;
                const rDate = rPost.publishedAt
                  ? new Date(rPost.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : null;

                return (
                  <Link
                    key={rPost.slug.current}
                    href={`/${rPost.slug.current}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#eef1f6] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  >
                    {/* Image */}
                    {rImage && (
                      <div className="relative overflow-hidden" style={{ aspectRatio: "19/10" }}>
                        <img
                          src={rImage}
                          alt={rPost.featuredImage?.alt || rPost.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Category tags */}
                      {rPost.categories && rPost.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {rPost.categories.map((cat) => (
                            <span
                              key={cat.slug.current}
                              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                              style={{ background: "#EBF2FF", color: "#1E6DEB" }}
                            >
                              {cat.title}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3
                        className="text-[16px] font-bold leading-snug mb-2 group-hover:text-[#1E6DEB] transition-colors line-clamp-2"
                        style={{ color: "#0D1282" }}
                      >
                        {rPost.title}
                      </h3>

                      {/* Excerpt */}
                      {rPost.excerpt && (
                        <p className="text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ color: "#5a6275" }}>
                          {rPost.excerpt}
                        </p>
                      )}

                      {/* Footer: date + read more */}
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
      <section className="relative py-14 md:py-20 overflow-hidden" style={{ background: "#FFFAED" }}>
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%)", backdropFilter: "blur(2px)" }} />
        <div className="hidden sm:block absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-40 z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)" }} />
        <div className="hidden sm:block absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-30 z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(13,18,130,0.1)", border: "1px solid rgba(13,18,130,0.2)" }}>
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                <span className="text-[13px] font-semibold tracking-wide" style={{ color: "#0D1282" }}>Accepting Applications</span>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-rubik), sans-serif", color: "#0D1282" }}>
                Ready to Build Your <span style={{ color: "#E8430C" }}>Global Career?</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-md mb-8" style={{ color: "rgba(13,18,130,0.7)" }}>
                Let our expert counselors guide you through university selection, applications, visas, and everything in between.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>24hr Response</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>Average reply time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Free Consultation</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>No commitment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Expert Team</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>10+ years experience</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/register" className="group block bg-white rounded-2xl p-6 md:p-7 transition-shadow hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#EEF2FF" }}>
                    <svg className="w-6 h-6" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  </div>
                  <svg className="w-5 h-5 text-[#0D1282] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>Schedule a Free Consultation</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">Book a free 30-minute call to discuss your study abroad goals and get expert recommendations.</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: "#0D1282" }}>
                  Book your slot
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
              <a href="mailto:hello@admizz.com" className="flex items-center justify-center gap-3 rounded-2xl px-5 py-3 w-full transition-colors hover:opacity-90" style={{ background: "rgba(13,18,130,0.1)", border: "1px solid rgba(13,18,130,0.2)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(13,18,130,0.1)" }}>
                  <svg className="w-4 h-4" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Email Us</p>
                  <p className="text-[13px] sm:text-[11px] truncate" style={{ color: "rgba(13,18,130,0.5)" }}>hello@admizz.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    
{/* SEOAI:FAQ:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<script type=\"application/ld+json\">{\"@type\":\"FAQPage\",\"@context\":\"https://schema.org\",\"mainEntity\":[{\"name\":\"What is the Australia Student Visa (Subclass 500)?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"The Australia Student Visa (Subclass 500) allows international students to stay in Australia for the duration of their study program, typically up to 5 years, depending on course length. It covers students enrolled in universities, vocational education, English language courses, and schools.\",\"@type\":\"Answer\"}},{\"name\":\"What are the key benefits of the Australia Student Visa (Subclass 500)?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Key benefits include work rights of up to 48 hours per fortnight during study periods, full-time work rights during scheduled course breaks, the ability for family members to accompany eligible students, pathways to post-study work visas, and access to globally ranked universities.\",\"@type\":\"Answer\"}},{\"name\":\"What are the eligibility criteria for applying for the Australia Student Visa (Subclass 500)?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"To apply, students must have a Confirmation of Enrolment (CoE) from an Australian provider, demonstrate genuine intent to study, prove English language proficiency, show sufficient finances for tuition and living expenses, have Overseas Student Health Cover (OSHC), and meet health and character requirements.\",\"@type\":\"Answer\"}},{\"name\":\"What is the process for applying for the Australia Student Visa (Subclass 500)?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"The application process includes course and university selection, obtaining an offer letter and CoE, preparing financial and other necessary documents, submitting the visa application, completing biometrics and health checks, and receiving visa grant notification.\",\"@type\":\"Answer\"}},{\"name\":\"How much does the Australia Student Visa (Subclass 500) cost?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"The visa application fee is AUD 710.\",\"@type\":\"Answer\"}},{\"name\":\"Can students work while on the Australia Student Visa (Subclass 500)?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Yes, students can work up to 48 hours per fortnight during study periods and have full-time work rights during scheduled course breaks.\",\"@type\":\"Answer\"}}]}</script>" }} />{/* SEOAI:FAQ:END */}
</main>
  );
}
