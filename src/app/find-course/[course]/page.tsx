import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { universityProfiles, toCourseCatalog, upcomingIntakes } from "@/lib/university-kb";
import { groupCourses, searchGroups, minFee } from "@/lib/university-kb/course-groups";
import { formatMoney } from "@/lib/university-kb/countries";
import CourseDetail, { type CourseDetailData } from "@/components/university-kb/CourseDetail";

interface PageProps {
  params: Promise<{ course: string }>;
}

// Built once for the whole module; every course page reads from the same grouping as Find Course.
const catalog = toCourseCatalog(universityProfiles);
const groups = groupCourses(catalog);
const pages = groups.filter((g) => g.hasPage);

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((g) => ({ course: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { course } = await params;
  const g = pages.find((x) => x.slug === course);
  if (!g) return {};
  const from = minFee(g);
  const currency = catalog.universities[g.offers[0].u].currency;
  return {
    title: `${g.name}: ${g.offers.length} Universities, Fees & Intakes | Admizz Education`,
    description: `${g.name} is offered by ${g.offers.length} Admizz partner universities${from !== undefined ? `, from ${formatMoney(from, currency)}` : ""}. Compare fees, duration and intakes.`,
    alternates: { canonical: `https://admizzeducation.com/find-course/${g.slug}` },
    // Keep out of search until the feature launches (same as Find College).
    robots: { index: false, follow: false },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { course } = await params;
  const g = pages.find((x) => x.slug === course);
  if (!g) notFound();

  const subjectCounts = new Map<string, number>();
  for (const o of g.offers) if (o.course.subject !== "General") subjectCounts.set(o.course.subject, (subjectCounts.get(o.course.subject) ?? 0) + 1);
  const subject = Array.from(subjectCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  // Other versions of this course (same name plus extra words, e.g. "... with Placement").
  const related = searchGroups(groups, g.name)
    .filter((x) => x.group.key !== g.key && x.tier <= 2)
    .sort((a, b) => b.group.offers.length - a.group.offers.length)
    .slice(0, 6)
    .map(({ group }) => {
      const first = group.offers[0];
      return {
        name: group.name,
        count: group.offers.length,
        // A course page when one exists, otherwise straight to the only university that offers it.
        href: group.hasPage ? `/find-course/${group.slug}` : `${catalog.universities[first.u].href}#course-${first.course.slug}`,
      };
    });

  // Intakes that are open for these universities, for the enquiry form.
  const intakes = Array.from(
    new Set(
      g.offers.flatMap((o) => {
        const profile = universityProfiles.find((p) => `/explore-universities/${p.country}/${p.slug}` === catalog.universities[o.u].href);
        return profile ? upcomingIntakes(profile).map((i) => `${i.month} ${i.year}`) : [];
      }),
    ),
  );

  const data: CourseDetailData = {
    name: g.name,
    level: g.level,
    subject,
    currency: catalog.universities[g.offers[0].u].currency,
    intakes,
    offers: g.offers.map((o) => ({
      university: catalog.universities[o.u],
      course: {
        slug: o.course.slug,
        fee: o.course.fee,
        per: o.course.per,
        feeFrom: o.course.feeFrom,
        durationMonths: o.course.durationMonths,
        intakes: o.course.intakes,
        placement: o.course.placement,
      },
    })),
    related,
  };

  return (
    <main className="bg-white">
      <CourseDetail data={data} />
    </main>
  );
}
