"use client";

import { Check, Plus } from "lucide-react";
import { COMPARE_MAX, useCompareList } from "@/lib/university-kb/compare-store";

interface Props {
  id: string;
  name: string;
  /** "card" sits on a university card; "header" sits next to the main CTA. */
  variant?: "card" | "header";
}

export default function CompareToggle({ id, name, variant = "card" }: Props) {
  const { has, isFull, toggle } = useCompareList();
  const selected = has(id);
  const disabled = !selected && isFull;

  const base =
    variant === "card"
      ? "px-3 py-1.5 text-[13px] rounded-[8px] shadow-sm"
      : "px-5 py-3 text-[15px] rounded-[10px] whitespace-nowrap";

  const look = selected
    ? "border-blue-royal bg-blue-royal text-white hover:bg-blue-dark"
    : "border-blue-royal/40 bg-white text-blue-royal hover:border-blue-royal hover:bg-blue-royal/5";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      disabled={disabled}
      aria-pressed={selected}
      title={disabled ? `You can compare up to ${COMPARE_MAX} universities` : undefined}
      aria-label={selected ? `Remove ${name} from compare` : `Add ${name} to compare`}
      className={`inline-flex items-center justify-center gap-1.5 border font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${base} ${look}`}
    >
      {selected ? <Check className="w-4 h-4" aria-hidden /> : <Plus className="w-4 h-4" aria-hidden />}
      {selected ? "Added to compare" : "Compare"}
    </button>
  );
}
