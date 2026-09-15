import { urlFor } from "@/lib/sanity";
import type { SanityPost, BlogListItem } from "@/types";
import type { GeneratedPostManifestEntry } from "@/types";

// Both post sources (Sanity CMS, locally-generated) convert into this one
// shape before reaching PostCard/MoreArticles — those components render
// ONE kind of thing and never need to know which source it came from.
// Sanity's urlFor() image resolution happens HERE, once, so PostCard never
// touches a Sanity-specific API (a local post's image is already a plain
// URL — running it through urlFor() would break).
export function fromSanityPost(post: SanityPost): BlogListItem {
  return {
    key: post.slug.current,
    href: `/${post.slug.current}`,
    title: post.title,
    excerpt: post.excerpt || null,
    imageUrl: post.featuredImage
      ? urlFor(post.featuredImage).width(600).auto("format").url()
      : null,
    imageAlt: post.featuredImage?.alt || post.title,
    categories: (post.categories || []).map((c) => ({ slug: c.slug.current, title: c.title })),
    publishedAt: post.publishedAt || null,
  };
}

// generated-posts.json entries already carry a plain, pre-resolved image
// URL (or null) and their own href — the Action Center wrote both at
// creation time (frontend.js's computeGeneratedPostsManifestUpdate).
export function fromGeneratedPost(entry: GeneratedPostManifestEntry): BlogListItem {
  return {
    key: `generated-${entry.slug}`,
    href: entry.href,
    title: entry.title,
    excerpt: entry.excerpt,
    imageUrl: entry.imageUrl,
    imageAlt: entry.imageAlt || entry.title,
    categories: entry.categories || [],
    publishedAt: entry.publishedAt,
  };
}
