/**
 * Image URLs for blog content now served from this repo (CRET-12).
 *
 * This is a COMPATIBILITY SHIM. It keeps the chained call signature of Sanity's
 * image builder — urlFor(img).width(600).auto("format").url() — so that swapping
 * the data source did not require editing the markup of the ~6 places that build
 * a blog image URL. That was the point: an untouched expression cannot change
 * what it renders. A follow-up can replace these call sites with a plain
 * `post.featuredImage.card` and delete this file.
 *
 * scripts/export-sanity-to-repo.mjs wrote three renditions per post, matching
 * what each call site asked the CDN for:
 *
 *   .width(1200).auto("format")          article hero   -> <slug>-1200.webp
 *   .width(600).auto("format")           listing card   -> <slug>-600.webp
 *   .width(400).height(225).auto(...)    insights card  -> <slug>-600.webp (CSS crops)
 *   .width(1200).height(630)             share preview  -> og/<slug>.jpg
 *
 * The 400x225 request maps to the 600px file on purpose: that card is
 * `object-cover` inside a fixed aspect box, so the crop is done by CSS and only
 * the source resolution differs — 600px wide keeps it sharp without shipping the
 * 1200px file to a listing page.
 */

/** The featuredImage object written by the export script. */
export interface LocalImage {
  _type: "localImage";
  /** 1200px webp, for the article hero. */
  article: string;
  /** 600px webp, for listing and related cards. */
  card: string;
  /** 1200x630 JPEG, for og:image and twitter:image. */
  og: string;
  alt: string | null;
  caption: string | null;
  _sanityRef?: string;
  _sanityOgRef?: string;
}

export interface ImageUrlBuilderLike {
  width(w: number): ImageUrlBuilderLike;
  height(h: number): ImageUrlBuilderLike;
  auto(mode: string): ImageUrlBuilderLike;
  url(): string;
}

function isLocalImage(value: unknown): value is LocalImage {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { _type?: string })._type === "localImage" &&
    typeof (value as { article?: unknown }).article === "string"
  );
}

/**
 * Picks the rendition for the dimensions a call site asked for. A request with
 * height 630 is the share preview; anything 600px or narrower is a card; the
 * rest is the article hero.
 */
function pick(image: LocalImage, width: number | null, height: number | null): string {
  if (height === 630) return image.og;
  if (width !== null && width <= 600) return image.card;
  return image.article;
}

export function urlFor(source: unknown): ImageUrlBuilderLike {
  if (!isLocalImage(source)) {
    // Loud on purpose. Every blog image in src/content/blog is a localImage; a
    // different shape means an un-migrated code path (for example a Portable
    // Text `image` block, which no post currently uses) that needs handling
    // rather than a silently broken <img src="">.
    throw new Error(
      `urlFor() received a non-local image: ${JSON.stringify(source)?.slice(0, 200)}. ` +
        "Blog images come from src/content/blog via scripts/export-sanity-to-repo.mjs.",
    );
  }
  let width: number | null = null;
  let height: number | null = null;
  const builder: ImageUrlBuilderLike = {
    width(w) {
      width = w;
      return builder;
    },
    height(h) {
      height = h;
      return builder;
    },
    auto() {
      return builder;
    },
    url() {
      return pick(source, width, height);
    },
  };
  return builder;
}
