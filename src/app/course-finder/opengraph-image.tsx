import { renderBrandCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/brand-card";

export const alt = "Find your course abroad | Admizz Education";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export default function Image() {
  return renderBrandCard({
    eyebrow: "COURSE FINDER",
    title: "Find your course abroad",
    subtitle: "Search courses at Admizz partner universities",
    footer: "admizzeducation.com/course-finder",
  });
}
