import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onChange: (page: number) => void;
}

/** 1 … 4 5 6 … 12 — always shows first, last and the pages around the current one. */
function pageItems(page: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | "gap")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) items.push("gap");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < total - 1) items.push("gap");
  items.push(total);
  return items;
}

const base =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-[10px] border px-3 text-[14px] font-semibold transition-colors";

export default function Pagination({ page, totalPages, totalItems, pageSize, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-col items-center gap-4">
      <p className="text-[14px] text-gray-dark" aria-live="polite">
        Showing <strong className="text-navy">{from}–{to}</strong> of <strong className="text-navy">{totalItems}</strong> universities
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <button
            type="button"
            onClick={() => onChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className={`${base} gap-1 border-border-light text-navy hover:border-blue-royal hover:text-blue-royal disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-light disabled:hover:text-navy`}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Previous</span>
          </button>
        </li>
        {pageItems(page, totalPages).map((item, i) =>
          item === "gap" ? (
            <li key={`gap-${i}`} aria-hidden className="px-1 text-gray-dark">…</li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={`${base} ${
                  item === page
                    ? "border-blue-royal bg-blue-royal text-white"
                    : "border-border-light text-navy hover:border-blue-royal hover:text-blue-royal"
                }`}
              >
                {item}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            onClick={() => onChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
            className={`${base} gap-1 border-border-light text-navy hover:border-blue-royal hover:text-blue-royal disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-light disabled:hover:text-navy`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </li>
      </ul>
    </nav>
  );
}
