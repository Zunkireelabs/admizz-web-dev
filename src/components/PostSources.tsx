import type { PostSourcesEntry } from "@/data/post-sources";

// "Sources" card shown under a Sanity-backed post (data: src/data/post-sources.ts).
// Built as a normal component with the site's own utility classes, so it always carries its styling.
function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "link";
  }
}

export default function PostSources({ entry }: { entry: PostSourcesEntry }) {
  if (!entry.sources || entry.sources.length === 0) return null;

  return (
    <section
      id="sources"
      className="mt-12 rounded-[14px] border-[1.5px] bg-white p-5 sm:p-8"
      style={{ borderColor: "#C8D5EF" }}
    >
      <h2
        className="text-[22px] sm:text-[26px] font-bold text-navy leading-tight pb-3 mb-3 border-b-2"
        style={{ fontFamily: "var(--font-rubik), sans-serif", borderColor: "#C8D5EF" }}
      >
        Sources
      </h2>
      <p className="text-[15px] text-gray-dark mb-4 leading-relaxed">
        The facts in this guide come from the official pages below. Open them to confirm the latest details before you apply.
      </p>
      <ul className="list-none p-0 m-0">
        {entry.sources.map((s, i) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 sm:gap-4 rounded-md px-2 py-3 text-[15px] leading-snug text-[#1a1a18] no-underline transition-colors hover:bg-[#F4F6FF] ${i > 0 ? "border-t border-border-light" : ""}`}
            >
              <span className="hidden sm:inline-block shrink-0 rounded-full bg-[#EAF0FA] px-2.5 py-1 text-xs font-semibold text-[#2A3D8F] whitespace-nowrap">
                {hostOf(s.url)}
              </span>
              <span className="flex-1">{s.label}</span>
              <span className="shrink-0 font-bold text-blue-royal" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
      {entry.checked && (
        <p className="mt-4 rounded-lg bg-[#FAF8F3] px-4 py-3 text-sm text-gray-dark">
          📅 Checked in {entry.checked}. Rules change, so confirm on the official site before you apply.
        </p>
      )}
    </section>
  );
}
