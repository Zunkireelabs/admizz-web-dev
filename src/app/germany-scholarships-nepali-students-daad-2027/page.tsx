import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";
import { content } from "./content";

const post = {
  "title": "Germany Scholarships for Nepali Students 2027",
  "slug": "germany-scholarships-nepali-students-daad-2027",
  "sections": [],
  "featuredImage": {
    "url": "/images/blog/germany-scholarships-nepali-students-daad-2027.webp",
    "alt": "Germany scholarships for Nepali students 2027: DAAD, Deutschlandstipendium and Erasmus Mundus"
  },
  "categories": [
    {
      "slug": "germany",
      "title": "Germany"
    },
    {
      "slug": "scholarships",
      "title": "Scholarships"
    },
    {
      "slug": "study-abroad",
      "title": "Study Abroad"
    },
    {
      "slug": "for-nepalese-students",
      "title": "Nepali Students"
    }
  ],
  "publishedAt": "2026-11-03T00:00:00.000Z",
  "description": "Germany scholarships for Nepali students 2027: DAAD Helmut-Schmidt and EPOS at €992 a month, the €300 Deutschlandstipendium, and Erasmus Mundus.",
  "quickAnswer": "Real routes for Nepali students include DAAD's Helmut-Schmidt Program and EPOS courses (both €992 a month, master's level, applied for at the course), the €300 a month Deutschlandstipendium (applied for at the university), and Erasmus Mundus Joint Masters. The Helmut-Schmidt deadline is July 31 each year. Each program sets its own window.",
  "faqItems": [
    {
      "question": "Can Nepali students get a DAAD scholarship?",
      "answer": "Yes, for certain programs. DAAD's database lists Nepal as an eligible country for the Helmut-Schmidt Program, and Nepal is on the DAC country list for EPOS. Most DAAD funding is for people who already hold a first degree, so it targets master's and PhD study."
    },
    {
      "question": "How do I apply for a DAAD scholarship from Nepal?",
      "answer": "Open the call for your program in the DAAD scholarship database and select Nepal in the country filter. For the Helmut-Schmidt Program and EPOS, you send your application directly to the master's course, not to DAAD. Each program sets its own deadline."
    },
    {
      "question": "What is the Deutschlandstipendium and can international students get it?",
      "answer": "It is a merit-based scholarship of €300 a month, paid half by the federal government and half by private sponsors, regardless of income. Students of all nationalities can apply if their state or state-recognized university offers it. Doctoral students are excluded."
    },
    {
      "question": "Are there fully funded scholarships in Germany for a master's?",
      "answer": "Some programs, such as the DAAD Helmut-Schmidt Program and EPOS courses, pay €992 a month and cover insurance, and Helmut-Schmidt holders are exempt from tuition fees. Some Erasmus Mundus Joint Masters also offer full scholarships. Each program lists its own terms."
    },
    {
      "question": "What is the deadline for the Helmut-Schmidt Program?",
      "answer": "DAAD says the deadline is July 31 each year and applications open June 1. The round described in the May 2026 FAQ is for 2027 and has closed, so check the new call for the next round."
    }
  ],
  "path": "/germany-scholarships-nepali-students-daad-2027",
  "faqSchemaOnly": true
};

export const metadata: Metadata = {
  title: "Germany Scholarships for Nepali Students 2027",
  description: "Germany scholarships for Nepali students 2027: DAAD Helmut-Schmidt and EPOS at €992 a month, the €300 Deutschlandstipendium, and Erasmus Mundus.",
  alternates: { canonical: "https://admizzeducation.com/germany-scholarships-nepali-students-daad-2027" },
  openGraph: {
    title: "Germany Scholarships for Nepali Students 2027",
    description: "Germany scholarships for Nepali students 2027: DAAD Helmut-Schmidt and EPOS at €992 a month, the €300 Deutschlandstipendium, and Erasmus Mundus.",
    url: "https://admizzeducation.com/germany-scholarships-nepali-students-daad-2027",
    siteName: "Admizz Education",
    type: "article",
    images: ["/images/blog/germany-scholarships-nepali-students-daad-2027.webp"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} content={content} />;
}
