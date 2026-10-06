"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Goes back in history when the visitor came from within the site (keeps their
// search/filters); otherwise falls back to the listing page.
export default function BackButton({ fallbackHref, label }: { fallbackHref: string; label: string }) {
  const router = useRouter();

  const goBack = () => {
    const cameFromSite = document.referrer && new URL(document.referrer).origin === window.location.origin;
    if (cameFromSite && window.history.length > 1) router.back();
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
