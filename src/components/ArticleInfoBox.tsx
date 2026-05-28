import type { InfoBoxItem } from "@/types";

interface ArticleInfoBoxProps {
  items: InfoBoxItem[];
}

export default function ArticleInfoBox({ items }: ArticleInfoBoxProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8 border-t-4 border-[#001353] bg-white rounded-b-lg shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {items.map((item, index) => (
          <div key={index} className="px-5 py-4">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
              {item.label}
            </p>
            <p className="text-lg font-bold text-[#001353]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
