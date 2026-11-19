// Type definitions for Admizz Education

// Blog content types (posts in src/content/blog)

export interface InfoBoxItem {
  label: string;
  value: string;
}

export interface BlogPost {
  title: string;
  slug: { current: string };
  publishedAt: string;
  _updatedAt?: string;
  excerpt?: string;
  content?: any[];
  featuredImage?: BlogImage;
  infoBox?: InfoBoxItem[];
  categories?: BlogCategory[];
  seo?: BlogSEO;
  // Real Q&A pairs already present as visible content in the post body —
  // this field only lets [slug]/page.tsx emit FAQPage schema for them, it
  // never sources the FAQ section's own visible text on the page.
  faqItems?: { question: string; answer: string }[];
}

export interface BlogCategory {
  title: string;
  slug: { current: string };
}

export interface BlogSEO {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImage?: BlogImage;
}

export interface BlogImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

// One normalized shape both content (src/content/blog) and locally-generated
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
