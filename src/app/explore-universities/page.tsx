import Link from "next/link";
import type { Metadata } from "next";
import { universityProfiles, getActiveCountries, toUniversityCard, EXPLORE_BASE_PATH } from "@/lib/university-kb";
import UniversityExplorer from "@/components/university-kb/UniversityExplorer";

export const metadata: Metadata = {
  title: "Find a University Abroad: Courses, Fees & Intakes | Admizz Education",
  description:
    "Search Admizz partner universities abroad by course, country, intake and scholarship. Compare tuition fees, entry requirements and documents for Nepali students.",
  alternates: { canonical: `https://admizzeducation.com${EXPLORE_BASE_PATH}` },
  // Keep out of search until the feature launches.
  robots: { index: false, follow: false },
};

export default function ExploreUniversitiesPage() {
  const cards = universityProfiles.map(toUniversityCard);
  const countries = getActiveCountries().map((c) => ({ slug: c.slug, name: c.name, currency: c.currency }));

  return (
    <main className="bg-white pb-20">
      <UniversityExplorer
        universities={cards}
        countries={countries}
        title="Find your university abroad"
        subtitle="Courses, tuition fees, scholarships, intakes and required documents for every Admizz partner university."
        breadcrumb={
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/75">
            <Link href="/" className="hover:text-white hover:underline underline-offset-2">Home</Link>
            <span className="mx-1.5" aria-hidden>/</span>
            <span className="text-white font-medium">Find College</span>
          </nav>
        }
      />
    </main>
  );
}
