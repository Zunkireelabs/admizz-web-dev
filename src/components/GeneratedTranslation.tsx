// Shared renderer for agent-authored translated pages (a language-suffixed
// sibling route, e.g. src/app/about-fr/page.tsx — see
// resolveTranslationTarget in the platform's url-file-map.js). Same
// data-as-props contract as GeneratedBlogPost.tsx: this component owns 100%
// of the actual markup, the page.tsx it's imported from stays a tiny, safe
// JSON.stringify'd data literal.
//
// Reuses the same hero/container/prose classes as GeneratedBlogPost and
// GeneratedDirectAnswer — no new visual treatment. `content` is a single
// opaque translated string (no section splitting exists for translation
// today, see renderTranslationBody's own markdown equivalent), so it's
// rendered as one continuous body rather than split into heading blocks.
import CTAForm from "@/components/ui/CTAForm";
import { renderMarkdownLite } from "./lib/markdown-lite";

export interface GeneratedTranslationProps {
  title: string;
  content: string;
}

export default function GeneratedTranslation({ title, content }: GeneratedTranslationProps) {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[22px] sm:text-2xl md:text-[36px] font-bold leading-tight max-w-3xl">
            {title}
          </h1>
        </div>
      </section>

      {/* ===== CONTENT + SIDEBAR ===== */}
      <article className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="flex-1 min-w-0 max-w-3xl">
            {renderMarkdownLite(content, "translation-content")}
          </div>

          <aside className="hidden lg:block w-[472px] shrink-0">
            <div className="sticky top-[90px]">
              <CTAForm title="Talk to Counselor Today" colorScheme="light" formSource="translation" />
            </div>
          </aside>
        </div>

        <div className="lg:hidden mt-10 max-w-xl mx-auto">
          <CTAForm title="Talk to Counselor Today" colorScheme="light" formSource="translation" />
        </div>
      </article>
    </main>
  );
}
