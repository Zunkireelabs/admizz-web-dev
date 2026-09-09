// Shared renderer for agent-authored blog posts (src/app/blogs/<slug>/page.tsx).
//
// Unlike the Sanity-backed /[slug]/page.tsx template, a post using this
// component has no CMS document behind it — its content is a plain,
// JSON-serializable data object sitting right in its own page.tsx, committed
// like any other file in the repo. This component owns ALL of the JSX/markup
// so every generated post's page.tsx can stay a tiny, safe data literal (see
// that file's own comment for why data-as-props, not content interpolated
// directly into JSX, is what keeps a post with quotes/braces/backticks in its
// title or body from ever producing broken TypeScript).
//
// Deliberately does NOT reproduce categories or related-posts: both are
// Sanity taxonomy queries with no equivalent for a plain file-backed post,
// and guessing at one here would be exactly the kind of unverified behavior
// this codebase avoids elsewhere. Hero, info box and CTA form are the pieces
// that don't depend on that taxonomy, reused as-is from the existing template.
import ArticleInfoBox from "@/components/ArticleInfoBox";
import CTAForm from "@/components/ui/CTAForm";

export interface GeneratedBlogPostSection {
  heading: string;
  body: string;
}

export interface GeneratedBlogPostProps {
  title: string;
  sections: GeneratedBlogPostSection[];
  featuredImage?: { url: string; alt?: string } | null;
  infoBox?: { label: string; value: string }[];
  publishedAt?: string | null;
}

// A section's body is plain generated prose, not markdown — split on blank
// lines into paragraphs rather than pulling in a markdown renderer for what
// is deliberately minimal, always-buildable output (same posture
// newpage-render.js's Markdown renderers take for every other net-new page
// type on this platform).
function paragraphs(body: string) {
  return (body || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default function GeneratedBlogPost({
  title,
  sections,
  featuredImage,
  infoBox,
  publishedAt,
}: GeneratedBlogPostProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[22px] sm:text-2xl md:text-[36px] font-bold leading-tight max-w-3xl">
            {title}
          </h1>
          {formattedDate && (
            <p className="mt-3 text-white/70 text-sm">{formattedDate}</p>
          )}
        </div>
      </section>

      {/* ===== CONTENT + SIDEBAR ===== */}
      <article className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="flex-1 min-w-0 max-w-3xl">
            {featuredImage?.url && (
              // eslint-disable-next-line @next/next/no-img-element -- a plain
              // remote URL (Pexels or similar), not a local/optimizable asset.
              <img
                src={featuredImage.url}
                alt={featuredImage.alt || title}
                width={1200}
                height={630}
                loading="eager"
                decoding="async"
                className="w-full h-auto rounded-lg mb-8"
              />
            )}

            {infoBox && infoBox.length > 0 && <ArticleInfoBox items={infoBox} />}

            {sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#001353] mb-3">
                  {section.heading}
                </h2>
                {paragraphs(section.body).map((p, j) => (
                  <p key={j} className="text-gray-700 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <aside className="hidden lg:block w-[472px] shrink-0">
            <div className="sticky top-[90px]">
              <CTAForm title="Talk to Counselor Today" colorScheme="light" formSource="blog-post" />
            </div>
          </aside>
        </div>

        <div className="lg:hidden mt-10 max-w-xl mx-auto">
          <CTAForm title="Talk to Counselor Today" colorScheme="light" formSource="blog-post" />
        </div>
      </article>
    </main>
  );
}
