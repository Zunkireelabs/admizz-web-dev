import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  countries,
  getActiveCountries,
  getUniversitiesByCountry,
  toUniversityCard,
  EXPLORE_BASE_PATH,
  type CountrySlug,
} from "@/lib/university-kb";
import UniversityExplorer from "@/components/university-kb/UniversityExplorer";

interface PageProps {
  params: Promise<{ country: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getActiveCountries().map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const info = countries[country as CountrySlug];
  if (!info) return {};
  return {
    title: `Universities in ${info.name}: Courses, Fees & Intakes | Admizz Education`,
    alternates: { canonical: `https://admizzeducation.com${EXPLORE_BASE_PATH}/${info.slug}` },
    robots: { index: false, follow: false },
  };
}

export default async function CountryUniversitiesPage({ params }: PageProps) {
  const { country } = await params;
  const info = countries[country as CountrySlug];
  if (!info) notFound();
  const cards = getUniversitiesByCountry(info.slug).map(toUniversityCard);

  return (
    <main className="bg-white pb-20">
      <UniversityExplorer
        universities={cards}
        countries={[{ slug: info.slug, name: info.name, currency: info.currency }]}
        fixedCountry={info.slug}
        title={`Universities in ${info.name}`}
        subtitle={
          <>
            {info.summary}{" "}
            {info.studyInPage && (
              <Link href={info.studyInPage} className="font-semibold text-white hover:underline underline-offset-4">
                Read our {info.name} study guide →
              </Link>
            )}
          </>
        }
        breadcrumb={
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/75">
            <Link href="/" className="hover:text-white hover:underline underline-offset-2">Home</Link>
            <span className="mx-1.5" aria-hidden>/</span>
            <Link href={EXPLORE_BASE_PATH} className="hover:text-white hover:underline underline-offset-2">Find College</Link>
            <span className="mx-1.5" aria-hidden>/</span>
            <span className="text-white font-medium">{info.name}</span>
          </nav>
        }
      />
    </main>
  );
}
