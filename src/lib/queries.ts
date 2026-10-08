import retired from "@/data/retired-posts.json";
const RETIRED = JSON.stringify(retired.slugs);
// GROQ queries for Sanity CMS

// All posts for /blogs/ listing page (ordered by publish date)
export const allPostsQuery = `
  *[_type == "post" && !(slug.current in ${RETIRED})] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage,
    categories[]->{ title, slug }
  }
`;

// Single post by slug (for individual blog post pages)
export const postBySlugQuery = `
  *[_type == "post" && !(slug.current in ${RETIRED}) && slug.current == $slug][0] {
    title,
    slug,
    publishedAt,
    _updatedAt,
    excerpt,
    content,
    featuredImage,
    infoBox,
    categories[]->{ title, slug },
    seo,
    faqItems
  }
`;

// All post slugs (for generateStaticParams at build time)
export const allPostSlugsQuery = `
  *[_type == "post" && !(slug.current in ${RETIRED})] { "slug": slug.current }
`;

// All categories (for category listing/navigation)
export const allCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    title,
    slug
  }
`;

// Posts filtered by category slug (for /category/[slug]/ pages)
export const postsByCategoryQuery = `
  *[_type == "post" && !(slug.current in ${RETIRED}) && $categorySlug in categories[]->slug.current]
    | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage,
    categories[]->{ title, slug }
  }
`;

// All category slugs (for generateStaticParams at build time)
export const allCategorySlugsQuery = `
  *[_type == "category"] { "slug": slug.current }
`;

// Related posts by shared categories (for blog post pages)
export const relatedPostsQuery = `
  *[_type == "post" && !(slug.current in ${RETIRED}) && slug.current != $slug && count((categories[]->slug.current)[@ in $categorySlugs]) > 0]
    | order(publishedAt desc) [0...3] {
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage,
    categories[]->{ title, slug }
  }
`;

// All post slugs with dates (for sitemap generation)
export const allPostsForSitemapQuery = `
  *[_type == "post" && !(slug.current in ${RETIRED})] | order(publishedAt desc) {
    "slug": slug.current,
    publishedAt
  }
`;
