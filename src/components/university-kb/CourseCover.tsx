import Image from "next/image";

// Real photos (CC0, see docs/COURSE-COVER-PHOTOS.md) in public/images/course-covers/<key>.webp.
// The course name picks the most specific photo first, then the subject; anything else falls back
// to the campus photo.
const PHOTO_BY_NAME: [RegExp, string][] = [
  [/cyber|security/i, "cyber"],
  [/artificial intelligence|machine learning|\bai\b/i, "ai"],
  [/data (science|analytics)|analytics|big data/i, "data"],
  [/nursing|midwifery|health|clinical/i, "health"],
  [/human resource|\bhr\b|people|leadership/i, "people"],
  [/project management|construction project/i, "project"],
  [/international business|international management|global/i, "global"],
  [/accounting|finance|banking|economics/i, "finance"],
  [/marketing|advertising|digital media/i, "marketing"],
  [/\bmba\b/i, "business"],
  [/computer science|software|computing|information technology/i, "computer"],
  [/engineering management/i, "engineering"],
];
const PHOTO_BY_SUBJECT: Record<string, string> = {
  "Business & Management": "business",
  "Computer Science": "computer",
  "Data Science": "data",
  "Health & Medicine": "health",
  "Finance & Economics": "finance",
  Engineering: "engineering",
  Marketing: "marketing",
  Law: "law",
  "Creative & Media": "creative",
  Science: "science",
  "Arts & Humanities": "arts",
  Psychology: "psychology",
  Education: "education",
  "Hospitality & Tourism": "hospitality",
  "Architecture & Construction": "construction",
  "Project Management": "project",
};

export function photoFor(subject?: string, name?: string): string {
  const byName = name ? PHOTO_BY_NAME.find(([re]) => re.test(name)) : undefined;
  return byName?.[1] ?? (subject ? PHOTO_BY_SUBJECT[subject] : undefined) ?? "campus";
}

export default function CourseCover({ subject, name, label }: { subject?: string; name?: string; label?: string }) {
  const photo = photoFor(subject, name);
  return (
    <div aria-hidden className="relative h-36 overflow-hidden rounded-t-2xl bg-navy">
      <Image
        src={`/images/course-covers/${photo}.webp`}
        alt=""
        fill
        sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
      {/* dark fade so the label stays readable on any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
      {label && (
        <span className="absolute bottom-3 left-5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-navy shadow-sm">
          {label}
        </span>
      )}
    </div>
  );
}
