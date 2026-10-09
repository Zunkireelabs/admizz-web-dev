// Shared renderer for agent-authored direct-answer pages
// (src/app/answers/<slug>/page.tsx). Same data-as-props contract as
// GeneratedBlogPost.tsx (see that file's own comment) — this component owns
// 100% of the actual markup, the page.tsx it's imported from stays a tiny,
// safe JSON.stringify'd data literal.
//
// Reuses GeneratedBlogPost's real, already-shipped Admizz classes (hero
// gradient, container widths, heading scale, CTAForm) rather than inventing
// any new visual treatment — this is the same "generated content on the
// existing shell" pattern, just answer-first instead of section-first: the
// whole point of a direct-answer page is that the answer itself appears
// immediately after the heading, no preamble, matching how a real assistant
// (or a skimming reader) expects to find it.
import CTAForm from "@/components/ui/CTAForm";
import { renderMarkdownLite } from "./lib/markdown-lite";

export interface GeneratedDirectAnswerSupportingSection {
  heading: string;
  body: string;
}

export interface GeneratedDirectAnswerProps {
  heading: string;
  directAnswer: string;
  supportingSections?: GeneratedDirectAnswerSupportingSection[];
  featuredImage?: { url: string; alt?: string } | null;
}

export default function GeneratedDirectAnswer({
  heading,
  directAnswer,
  supportingSections,
  featuredImage,
}: GeneratedDirectAnswerProps) {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[22px] sm:text-2xl md:text-[36px] font-bold leading-tight max-w-3xl">
            {heading}
          </h1>
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
                alt={featuredImage.alt || heading}
                width={1200}
                height={630}
                loading="eager"
                decoding="async"
                className="w-full h-auto rounded-lg mb-8"
              />
            )}

            {/* The answer itself — same "highlighted fact box" treatment
                ArticleInfoBox already uses elsewhere on the site, reused
                here (not reinvented) since a direct answer is exactly that:
                the one fact a reader/assistant came for. */}
            <div className="mb-8 border-t-4 border-[#001353] bg-white rounded-b-lg shadow-sm px-5 py-5">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Answer
              </p>
              <div className="text-lg font-medium text-[#001353] leading-relaxed">
                {renderMarkdownLite(directAnswer, "direct-answer")}
              </div>
            </div>

            {supportingSections?.map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#001353] mb-3">
                  {section.heading}
                </h2>
                {renderMarkdownLite(section.body, `supporting-${i}`)}
              </div>
            ))}
          </div>

          <aside className="hidden lg:block w-[472px] shrink-0">
            <div className="sticky top-[90px]">
              <CTAForm title="Talk to Counselor Today" colorScheme="light" formSource="direct-answer" />
            </div>
          </aside>
        </div>

        <div className="lg:hidden mt-10 max-w-xl mx-auto">
          <CTAForm title="Talk to Counselor Today" colorScheme="light" formSource="direct-answer" />
        </div>
      </article>
    </main>
  );
}
