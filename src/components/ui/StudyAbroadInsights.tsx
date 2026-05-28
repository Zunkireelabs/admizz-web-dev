import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import type { SanityPost } from "@/types";

interface StudyAbroadInsightsProps {
  posts: SanityPost[];
  countryName: string;
  categorySlug?: string;
}

export default function StudyAbroadInsights({
  posts,
  countryName,
  categorySlug,
}: StudyAbroadInsightsProps) {
  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 3);
  const cleanCountry = countryName.replace(/^the /i, "");

  return (
    <section className="py-16 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          Study Abroad Insights
        </h2>
        <p className="text-[15px] text-gray-dark text-center mb-10 max-w-2xl mx-auto">
          Explore our latest articles about studying in {cleanCountry} — tips,
          guides, and expert advice to help you succeed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post) => {
            const imageUrl = post.featuredImage
              ? urlFor(post.featuredImage)
                  .width(400)
                  .height(225)
                  .auto("format")
                  .url()
              : null;

            const formattedDate = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
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
                      className="w-full h-48 object-cover"
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
                          className="text-[13px] font-semibold text-blue-royal bg-blue-royal/10 px-3 py-1.5 rounded-full hover:bg-blue-royal/20 transition-colors"
                        >
                          {cat.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  <h3 className="text-[15px] font-bold text-navy leading-snug flex-1">
                    <Link
                      href={`/${post.slug.current}`}
                      className="hover:text-blue-royal transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {post.excerpt && (
                    <p className="mt-2 text-sm text-gray-dark line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    {formattedDate && (
                      <span className="text-[13px] text-gray-medium">
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

        {categorySlug && posts.length > 3 && (
          <div className="text-center mt-8">
            <Link
              href={`/category/${categorySlug}/`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-royal hover:text-blue-dark transition-colors"
            >
              View all articles
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
