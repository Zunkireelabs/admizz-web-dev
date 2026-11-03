// Visible answer-first summary at the top of a post. Same card treatment as
// ArticleInfoBox (navy top border, white, soft shadow) so it reads as part of
// the existing article header, not a new design.
export default function PostSummary({ text }: { text: string }) {
  if (!text) return null;

  return (
    <section
      aria-label="Quick answer"
      className="mb-8 border-t-4 border-[#001353] bg-white rounded-b-lg shadow-sm px-5 py-4"
    >
      <p className="text-[13px] font-semibold uppercase tracking-wider text-gray-500 mb-2">
        Quick Answer
      </p>
      <p className="text-[16px] leading-[1.7] text-[#001353]">{text}</p>
    </section>
  );
}
