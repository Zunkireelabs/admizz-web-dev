import Link from "next/link";
import { EXPLORE_BASE_PATH } from "@/lib/university-kb";

const options = [
  { key: "college", label: "Find College", href: EXPLORE_BASE_PATH },
  { key: "course", label: "Find Course", href: "/find-course" },
] as const;

// Switch between the two Course Finder pages (separate URLs).
export default function FinderToggle({ active }: { active: "college" | "course" }) {
  return (
    <div role="tablist" aria-label="Course Finder mode" className="mt-5 inline-flex rounded-full bg-white/10 p-1">
      {options.map((o) => (
        <Link
          key={o.key}
          href={o.href}
          role="tab"
          aria-selected={active === o.key}
          className={`rounded-full px-5 py-2 text-[14px] font-semibold transition-colors ${
            active === o.key ? "bg-yellow text-black" : "text-white/85 hover:text-white"
          }`}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
