import type { Metadata } from "next";
import { universityProfiles, toCourseCatalog } from "@/lib/university-kb";
import CourseExplorer from "@/components/university-kb/CourseExplorer";

export const metadata: Metadata = {
  title: "Find a Course Abroad: Search Courses by Subject, Level & Fees | Admizz Education",
  description:
    "Search courses at Admizz partner universities abroad by subject, level, intake and fees. Pick a course and see the university that offers it.",
  alternates: { canonical: "https://admizzeducation.com/course-finder" },
  // Keep out of search until the feature launches (same as Find College).
  robots: { index: false, follow: false },
};

export default function FindCoursePage() {
  const catalog = toCourseCatalog(universityProfiles);

  return (
    <main className="bg-white">
      <CourseExplorer catalog={catalog} />
    </main>
  );
}
