import { universityProfiles, toCourseCatalog } from "@/lib/university-kb";
import { groupCourses, minFee } from "@/lib/university-kb/course-groups";
import { formatMoney } from "@/lib/university-kb/countries";
import { renderBrandCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/brand-card";

export const alt = "Course at Admizz partner universities";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";
export const dynamicParams = false;

const catalog = toCourseCatalog(universityProfiles);
const pages = groupCourses(catalog).filter((g) => g.hasPage);

export function generateStaticParams() {
  return pages.map((g) => ({ course: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  const g = pages.find((x) => x.slug === course);
  const from = g ? minFee(g) : undefined;
  const currency = g ? catalog.universities[g.offers[0].u].currency : "GBP";
  const parts = g ? [`${g.offers.length} universities`, from !== undefined ? `from ${formatMoney(from, currency)}` : null] : [];

  return renderBrandCard({
    eyebrow: g ? `COURSE · ${g.level.toUpperCase()}` : "COURSE FINDER",
    title: g?.name ?? "Find your course abroad",
    subtitle: parts.filter(Boolean).join("  ·  ") || "Search courses at Admizz partner universities",
    footer: "admizzeducation.com/course-finder",
  });
}
