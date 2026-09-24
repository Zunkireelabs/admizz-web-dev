// Type definitions for Admizz Education

// Sanity CMS types

export interface InfoBoxItem {
  label: string;
  value: string;
}

export interface SanityPost {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  content?: any[];
  featuredImage?: SanityImage;
  infoBox?: InfoBoxItem[];
  categories?: SanityCategory[];
  seo?: SanitySEO;
  // Real Q&A pairs already present as visible content in the post body —
  // this field only lets [slug]/page.tsx emit FAQPage schema for them, it
  // never sources the FAQ section's own visible text on the page.
  faqItems?: { question: string; answer: string }[];
}

export interface SanityCategory {
  title: string;
  slug: { current: string };
}

export interface SanitySEO {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImage?: SanityImage;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

// One normalized shape both Sanity-backed and locally-generated
// (src/data/generated-posts.json) blog posts convert into before reaching
// PostCard/MoreArticles — see src/app/blogs/lib/normalize.ts.
export interface BlogListItem {
  key: string;
  href: string;
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
  imageAlt: string;
  categories: { slug: string; title: string }[];
  publishedAt: string | null;
}

// One entry in src/data/generated-posts.json — written by the Action
// Center's frontend.js (computeGeneratedPostsManifestUpdate) in the same
// commit as the post file itself.
export interface GeneratedPostManifestEntry {
  slug: string;
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  categories?: { slug: string; title: string }[];
  publishedAt: string | null;
  href: string;
  _aiManaged?: boolean;
}
