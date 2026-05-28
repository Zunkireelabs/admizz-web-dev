import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import type { SanityPost } from "@/types";

export default function PostCard({ post, index }: { post: SanityPost; index?: number }) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(600).auto("format").url()
    : null;

  return (
    <div className="bg-white border border-border-light rounded-[10px] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {imageUrl && (
        <Link href={`/${post.slug.current}`}>
          <img
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            className="w-full aspect-[19/10] object-cover"
            {...(index !== undefined && index < 3 ? {} : { loading: "lazy" as const })}
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
                className="text-[13px] font-semibold text-blue-royal bg-blue-royal/10 px-2 py-1.5 rounded-full hover:bg-blue-royal/20 transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}

        <h3 className="text-[15px] font-bold text-navy leading-snug flex-1">
          <Link href={`/${post.slug.current}`} className="hover:text-blue-royal transition-colors">
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
            <span className="text-[13px] text-gray-medium">{formattedDate}</span>
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
}
