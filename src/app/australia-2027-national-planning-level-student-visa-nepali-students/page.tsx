import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";
import { content } from "./content";

const post = {
  "title": "Australia Student Visa 2027: Planning Level Explained",
  "slug": "australia-2027-national-planning-level-student-visa-nepali-students",
  "sections": [],
  "featuredImage": {
    "url": "/images/blog/australia-2027-national-planning-level-student-visa-nepali-students.webp",
    "alt": "Australia student visa 2027 for Nepali students: National Planning Level of 295,000"
  },
  "categories": [
    {
      "slug": "australia",
      "title": "Australia"
    },
    {
      "slug": "visa-guides",
      "title": "Visa Guides"
    },
    {
      "slug": "for-nepalese-students",
      "title": "Nepali Students"
    }
  ],
  "publishedAt": "2026-11-03T00:00:00.000Z",
  "description": "Australia student visa 2027 for Nepali students: the 295,000 National Planning Level is not a cap but sets processing priority. Apply early.",
  "quickAnswer": "Australia's 2027 National Planning Level is 295,000 new overseas student commencements, unchanged from 2026. It is not a cap: it sets a prioritization system for offshore Student visa processing, with applications processed as Priority 1 until a provider reaches its threshold (80% in 2026). TAFE is exempt in 2027.",
  "faqItems": [
    {
      "question": "What is Australia's National Planning Level for 2027?",
      "answer": "It is 295,000 new overseas student commencements for 2027, unchanged from 2026, according to Study Australia. It is a planning level that informs visa processing priority, not a cap on student numbers."
    },
    {
      "question": "Is the 2027 National Planning Level a cap on Australia student visas?",
      "answer": "No. Study Australia states the NPL is not a cap or a limit on student numbers. Any genuine international student who meets the Student visa requirements can still apply and be granted a visa."
    },
    {
      "question": "How does the National Planning Level affect student visa processing time?",
      "answer": "Applications are processed as Priority 1 until the chosen provider reaches its threshold, which was 80% of its allocation in 2026. After that, applications are still accepted but processed more slowly. It applies to applications lodged outside Australia."
    },
    {
      "question": "Are TAFE students exempt from the 2027 planning level?",
      "answer": "Yes. Study Australia states that students at TAFE and students in VET courses at dual-sector public universities are exempt from the NPL in 2027."
    },
    {
      "question": "Should Nepali students apply early for an Australia student visa in 2027?",
      "answer": "Yes, applying as soon as your documents and Confirmation of Enrolment are ready is the safest approach, because processing priority depends on how full your provider's allocation is."
    }
  ],
  "path": "/australia-2027-national-planning-level-student-visa-nepali-students",
  "faqSchemaOnly": true
};

export const metadata: Metadata = {
  title: "Australia Student Visa 2027: Planning Level Explained",
  description: "Australia student visa 2027 for Nepali students: the 295,000 National Planning Level is not a cap but sets processing priority. Apply early.",
  alternates: { canonical: "https://admizzeducation.com/australia-2027-national-planning-level-student-visa-nepali-students" },
  openGraph: {
    title: "Australia Student Visa 2027: Planning Level Explained",
    description: "Australia student visa 2027 for Nepali students: the 295,000 National Planning Level is not a cap but sets processing priority. Apply early.",
    url: "https://admizzeducation.com/australia-2027-national-planning-level-student-visa-nepali-students",
    siteName: "Admizz Education",
    type: "article",
    images: ["/images/blog/australia-2027-national-planning-level-student-visa-nepali-students.webp"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} content={content} />;
}
