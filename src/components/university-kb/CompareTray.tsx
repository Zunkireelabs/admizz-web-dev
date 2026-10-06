"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { COMPARE_MAX, useCompareList } from "@/lib/university-kb/compare-store";

export interface TrayUniversity {
  id: string;
  name: string;
  logo: string;
}

// Floating bar shown on all Find College pages once something is selected.
export default function CompareTray({ universities, comparePath }: { universities: TrayUniversity[]; comparePath: string }) {
  const { list, remove, clear } = useCompareList();
  const pathname = usePathname();
  const selected = list.map((id) => universities.find((u) => u.id === id)).filter((u): u is TrayUniversity => Boolean(u));

  if (selected.length === 0 || pathname === comparePath) return null;

  const canCompare = selected.length >= 2;
  const href = `${comparePath}?u=${selected.map((u) => u.id).join(",")}`;

  return (
    <>
    {/* Spacer so the fixed bar never covers the end of the page. */}
    <div aria-hidden className="h-32 md:h-20" />
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border-light bg-white/95 backdrop-blur shadow-[0_-8px_30px_rgba(0,19,83,0.12)]">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-3 overflow-x-auto">
          <p className="shrink-0 text-[14px] font-semibold text-navy">
            Compare <span className="text-gray-dark font-normal">({selected.length}/{COMPARE_MAX})</span>
          </p>
          {selected.map((u) => (
            <div key={u.id} className="flex shrink-0 items-center gap-2 rounded-[10px] border border-border-light bg-white py-1.5 pl-2 pr-1">
              <Image src={u.logo} alt="" width={64} height={32} className="h-7 w-14 object-contain" />
              <span className="max-w-[140px] truncate text-[13px] font-medium text-navy">{u.name}</span>
              <button
                type="button"
                onClick={() => remove(u.id)}
                aria-label={`Remove ${u.name} from compare`}
                className="rounded-full p-1 text-gray-dark hover:bg-off-white hover:text-navy"
              >
                <X className="w-3.5 h-3.5" aria-hidden />
              </button>
            </div>
          ))}
          {Array.from({ length: COMPARE_MAX - selected.length }).map((_, i) => (
            <div
              key={i}
              className="hidden shrink-0 rounded-[10px] border border-dashed border-border-light px-4 py-2.5 text-[13px] text-gray-medium md:block"
            >
              Add a university
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={clear}
            className="text-[14px] font-semibold text-gray-dark hover:text-navy hover:underline underline-offset-4"
          >
            Clear
          </button>
          {canCompare ? (
            <Link
              href={href}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-yellow px-6 py-2.5 text-[15px] font-semibold text-black hover:bg-yellow-bright transition-colors md:flex-none"
            >
              Compare now <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          ) : (
            <span className="flex-1 rounded-[10px] bg-off-white px-4 py-2.5 text-center text-[14px] text-gray-dark md:flex-none">
              Add one more to compare
            </span>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
