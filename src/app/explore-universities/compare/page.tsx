import { Suspense } from "react";
import type { Metadata } from "next";
import { universityProfiles, countries, EXPLORE_BASE_PATH } from "@/lib/university-kb";
import CompareView from "@/components/university-kb/CompareView";

export const metadata: Metadata = {
  title: "Compare Universities: Fees, Scholarships & Intakes | Admizz Education",
  description: "Compare up to three universities side by side — tuition fees, scholarships, intakes and entry requirements.",
  alternates: { canonical: `https://admizzeducation.com${EXPLORE_BASE_PATH}/compare` },
  // Selection lives in the URL / browser, so there is nothing for search engines here.
  robots: { index: false, follow: true },
};

export default function ComparePage() {
  return (
    <main className="bg-white pb-20">
      {/* useSearchParams needs a Suspense boundary in a static export. */}
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <CompareView universities={universityProfiles} countries={countries} />
      </Suspense>
    </main>
  );
}
