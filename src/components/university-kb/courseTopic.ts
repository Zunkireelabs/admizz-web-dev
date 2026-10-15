// The topic label shown on a course card or page, e.g. "Artificial Intelligence". The course name picks the
// most specific topic first (first match wins), then its subject. CourseCover uses the same idea for photos,
// so the photo and the label on a card always agree.
const BY_NAME: [RegExp, string][] = [
  [/cyber|security/i, "Cyber Security"],
  [/artificial intelligence|machine learning|\bai\b/i, "Artificial Intelligence"],
  [/data (science|analytics)|analytics|big data/i, "Data Science"],
  [/nursing|midwifery|health|clinical/i, "Health & Medicine"],
  [/human resource|\bhr\b|people|leadership/i, "Human Resources"],
  [/project management|construction project/i, "Project Management"],
  [/international business|international management|global/i, "International Business"],
  [/accounting|finance|banking|economics/i, "Finance & Economics"],
  [/marketing|advertising|digital media/i, "Marketing"],
  [/\bmba\b/i, "Business & Management"],
  [/computer science|software|computing|information technology/i, "Computer Science"],
  [/engineering/i, "Engineering"],
];

export function labelForCourse(name: string, subject?: string): string | undefined {
  return BY_NAME.find(([re]) => re.test(name))?.[1] ?? subject;
}
