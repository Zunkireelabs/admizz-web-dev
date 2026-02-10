import Link from "next/link";
import type { Metadata } from "next";
import { client, urlFor } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Blogs | Admizz Education",
  description:
    "Get expert study abroad guidance, from choosing the right university to visa support. Make your global education dream a reality today!",
  alternates: {
    canonical: "https://admizzeducation.com/blogs/",
  },
  openGraph: {
    title: "Blogs | Admizz Education",
    description:
      "Get expert study abroad guidance, from choosing the right university to visa support. Make your global education dream a reality today!",
    url: "https://admizzeducation.com/blogs/",
    siteName: "Admizz Education",
    images: ["/images/og/blog.webp"],
    type: "website",
  },
};

export default async function BlogsPage() {
  const posts: SanityPost[] = await client.fetch(allPostsQuery);

  // Split into latest (first 6) and rest
  const latestPosts = posts.slice(0, 6);
  const remainingPosts = posts.slice(6);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
            Explore. Learn. Succeed
          </h1>
          <p className="mt-2 text-lg font-medium">Admizz Education Blogs</p>
          <p className="mt-3 text-[15px] text-white/80 max-w-2xl mx-auto">
            Explore our latest blog posts and get one step closer to your dream
            destination.
          </p>
        </div>
      </section>

      {/* ===== LATEST INSIGHTS ===== */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Latest Insights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post.slug.current} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ALL POSTS ===== */}
      {remainingPosts.length > 0 && (
        <section className="bg-off-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
              More Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => (
                <PostCard key={post.slug.current} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-[28px] font-bold leading-snug">
            Join 100K+ students from across the world and pursue your dream
            course abroad.
          </p>
          <Link
            href="/contact/"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}

function PostCard({ post }: { post: SanityPost }) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(400).height(225).auto("format").url()
    : null;

  return (
    <div className="bg-white border border-border-light rounded-[10px] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {imageUrl && (
        <Link href={`/${post.slug.current}/`}>
          <img
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </Link>
      )}
      <div className="p-5 flex flex-col flex-1">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {post.categories.map((cat) => (
              <Link
                key={cat.slug.current}
                href={`/category/${cat.slug.current}/`}
                className="text-[11px] font-semibold text-blue-royal bg-blue-royal/10 px-2 py-0.5 rounded-full hover:bg-blue-royal/20 transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}

        <h3 className="text-[15px] font-bold text-navy leading-snug flex-1">
          <Link href={`/${post.slug.current}/`} className="hover:text-blue-royal transition-colors">
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
            <span className="text-xs text-gray-medium">{formattedDate}</span>
          )}
          <Link
            href={`/${post.slug.current}/`}
            className="text-sm font-semibold text-blue-royal hover:text-blue-dark transition-colors"
          >
            Read More &raquo;
          </Link>
        </div>
      </div>
    </div>
  );
}
