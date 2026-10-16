"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { hasInAppHistory } from "@/lib/nav-history";

// Goes back to the previous page when the visitor has clicked through the site (keeps their
// search/filters); otherwise (direct landing) falls back to the listing page.
export default function BackButton({ fallbackHref, label }: { fallbackHref: string; label: string }) {
  const router = useRouter();

  const goBack = () => {
    if (hasInAppHistory() && window.history.length > 1) router.back();
    else router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/30 px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-white hover:text-blue-dark transition-colors"
    >
      <ArrowLeft className="w-4 h-4" aria-hidden />
      {label}
    </button>
  );
}
