// Type definitions for Admizz Education

// Sanity CMS types

export interface SanityPost {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  content?: any[];
  featuredImage?: SanityImage;
  categories?: SanityCategory[];
  seo?: SanitySEO;
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
