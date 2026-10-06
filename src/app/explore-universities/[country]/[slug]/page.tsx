import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  countries,
  universityProfiles,
  getUniversity,
  universityPath,
  upcomingIntakes,
} from "@/lib/university-kb";
import { EnquiryProvider } from "@/components/university-kb/EnquiryForm";
import UniversityHeader from "@/components/university-kb/UniversityHeader";
import UniversityTabs from "@/components/university-kb/UniversityTabs";
import { buildUniversityPanels } from "@/components/university-kb/UniversityPanels";
import UniversitySidebar from "@/components/university-kb/UniversitySidebar";

interface PageProps {
  params: Promise<{ country: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return universityProfiles.map((u) => ({ country: u.country, slug: u.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country, slug } = await params;
  const u = getUniversity(country, slug);
  if (!u) return {};
  return {
    title: `${u.name}: Courses, Fees, Scholarships & Intakes | Admizz Education`,
    alternates: {
      canonical: `https://admizzeducation.com${universityPath(u)}`,
    },
    // Keep out of search until the feature launches.
    robots: { index: false, follow: false },
  };
}

export default async function UniversityPage({ params }: PageProps) {
  const { country, slug } = await params;
  const u = getUniversity(country, slug);
  if (!u) notFound();
  const info = countries[u.country];

  return (
    <EnquiryProvider
      university={u.name}
      universitySlug={u.slug}
      intakes={upcomingIntakes(u).map((i) => `${i.month} ${i.year}`)}
    >
      <main className="bg-white pb-20">
        <UniversityHeader university={u} country={info} />
        <div className="max-w-7xl mx-auto px-4 mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <UniversityTabs
            panels={buildUniversityPanels(u, info)}
            counts={{
              courses: u.courses.length || undefined,
              apply: u.applicationStages.length,
              documents: u.requiredDocuments.length,
            }}
          />
          <div>
            <UniversitySidebar university={u} />
          </div>
        </div>
      </main>
    </EnquiryProvider>
  );
}
