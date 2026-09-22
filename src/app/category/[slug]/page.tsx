import Link from "next/link";
import type { Metadata } from "next";
import { client, urlFor } from "@/lib/sanity";
import {
  allCategorySlugsQuery,
  postsByCategoryQuery,
  allCategoriesQuery,
} from "@/lib/queries";
import type { SanityPost, SanityCategory } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allCategorySlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Fetch category name
  const categories: SanityCategory[] = await client.fetch(allCategoriesQuery);
  const category = categories.find((c) => c.slug.current === slug);
  const name = category?.title || slug;

  const title = `${name} Archives - Admizz Education`;
  const description = `Browse all ${name} articles on Admizz Education. Expert study abroad guidance and insights.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://admizzeducation.com/category/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://admizzeducation.com/category/${slug}`,
      siteName: "Admizz Education",
      type: "website",
      images: [
        {
          url: "https://admizzeducation.com/images/og/blog.webp",
          width: 1200,
          height: 630,
          alt: `${name} - Admizz Education`,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch category info and posts
  const [categories, posts]: [SanityCategory[], SanityPost[]] = await Promise.all([
    client.fetch(allCategoriesQuery),
    client.fetch(postsByCategoryQuery, { categorySlug: slug }),
  ]);

  const category = categories.find((c) => c.slug.current === slug);
  const categoryName = category?.title || slug;

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-white/70 mb-2">Category</p>
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
            {categoryName}
          </h1>
          <p className="mt-3 text-[15px] text-white/80">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>
        </div>
      </section>

      {/* ===== POSTS ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const formattedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : null;

                const imageUrl = post.featuredImage
                  ? urlFor(post.featuredImage)
                      .width(600)
                      .auto("format")
                      .url()
                  : null;

                return (
                  <div
                    key={post.slug.current}
                    className="bg-white border border-border-light rounded-[10px] overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                  >
                    {imageUrl && (
                      <Link href={`/${post.slug.current}`}>
                        <img
                          src={imageUrl}
                          alt={post.featuredImage?.alt || post.title}
                          className="w-full aspect-[19/10] object-cover"
                          loading="lazy"
                        />
                      </Link>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {post.categories.map((cat) => (
                            <Link
                              key={cat.slug.current}
                              href={`/category/${cat.slug.current}`}
                              className="text-[11px] font-semibold text-blue-royal bg-blue-royal/10 px-2 py-0.5 rounded-full hover:bg-blue-royal/20 transition-colors"
                            >
                              {cat.title}
                            </Link>
                          ))}
                        </div>
                      )}

                      <h2 className="text-[15px] font-bold text-navy leading-snug flex-1">
                        <Link
                          href={`/${post.slug.current}`}
                          className="hover:text-blue-royal transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {post.excerpt && (
                        <p className="mt-2 text-sm text-gray-dark line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between">
                        {formattedDate && (
                          <span className="text-xs text-gray-medium">
                            {formattedDate}
                          </span>
                        )}
                        <Link
                          href={`/${post.slug.current}`}
                          className="text-sm font-semibold text-blue-royal hover:text-blue-dark transition-colors"
                        >
                          Read More &raquo;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-dark text-lg">
              No articles found in this category.
            </p>
          )}
        </div>
      </section>

      {/* ===== BACK TO BLOG ===== */}
      <section className="bg-off-white py-10">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-block bg-blue-royal text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
          >
            &laquo; Back to all blogs
          </Link>
        </div>
      </section>
    
{/* SEOAI:EXPANDEDCONTENT:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \"<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \\\"<!-- SEOAI:FOCUS:comparison-content --><div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\">\n  <section class=\"gap-2.5\">\n    <h2 class=\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\">Admizz Education vs. Competitors on Living Costs Insights</h2>\n    <div class=\"text-sm md:text-base mb-3 opacity-90\"><p class=\"text-sm md:text-base mb-3 opacity-90\">When exploring living costs while studying abroad, understanding the depth and accuracy of provided insights is crucial. Admizz Education offers real-time data on various countries, highlighting the balance between part-time work and living expenses. This allows students to make informed financial decisions in their academic journeys.</p><div class=\"overflow-x-auto\"><table class=\"w-full border-collapse\"><thead><tr><th class=\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\">Feature</th><th class=\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\">Alternative</th><th class=\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\">This Option</th></tr></thead><tbody><tr><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Real-time Data Accuracy</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">General estimates without specific data points, making it harder for students to plan.</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Detailed insights based on real wages and expenses for various countries.</td></tr><tr><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Country Coverage</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Limited on geography, which may exclude valuable insights for students considering less common study abroad locations.</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Focuses on key markets including the UK, Australia, USA, New Zealand, and India.</td></tr></tbody></table></div></div>\n  </section>\n</div><!-- SEOAI:FOCUS:author-byline --><div class=\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\\\">\\n  <section class=\\\"gap-2.5\\\">\\n    <h2 class=\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\">About the Author</h2>\\n    <div class=\\\"text-sm md:text-base mb-3 opacity-90\\\"><p class=\\\"text-sm md:text-base mb-3 opacity-90\\\">By the Admizz Education Team</p></div>\\n  </section>\\n</div>\" }} />" }} />{/* SEOAI:EXPANDEDCONTENT:END */}
</main>
  );
}
