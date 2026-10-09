import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";
import { content } from "./content";

const post = {
  "title": "UK Scholarships for Nepalese Students (2027 Guide)",
  "slug": "uk-scholarships-for-Nepalese-students-2027",
  "sections": [],
  "featuredImage": {
    "url": "https://cdn.sanity.io/images/vd27cmpc/production/40a094349f93bb0e1eb146f030affe81a189608d-1200x628.png?w=1200&auto=format",
    "alt": "Nepalese student celebrating a UK scholarship award with documents"
  },
  "categories": [
    {
      "slug": "uk",
      "title": "UK"
    },
    {
      "slug": "study-abroad",
      "title": "Study Abroad"
    },
    {
      "slug": "scholarships",
      "title": "Scholarships"
    }
  ],
  "publishedAt": "2026-10-05T02:40:00.000Z",
  "updatedAt": "2026-10-05T02:40:03Z",
  "description": "A complete 2027 guide to UK scholarships for Nepalese students: Chevening, GREAT, university awards, eligibility, timing and how to apply.",
  "faqItems": [
    {
      "question": "Can I get a scholarship with average grades?",
      "answer": "Smaller university awards and early-payment discounts are possible, but the biggest awards need strong grades."
    },
    {
      "question": "Does Chevening need work experience?",
      "answer": "Yes, at least two years (about 2,800 hours) of work experience."
    },
    {
      "question": "Should I apply for scholarships before the visa?",
      "answer": "Yes. Awards are decided before your CAS and visa, and a tuition award lowers the funds you must show."
    }
  ],
  "faqSchemaOnly": true,
  "path": "/uk-scholarships-for-Nepalese-students-2027"
};

export const metadata: Metadata = {
  title: "UK Scholarships for Nepalese Students — 2027 Guide",
  description: "A complete 2027 guide to UK scholarships for Nepalese students: Chevening, GREAT, university awards, eligibility, timing and how to apply.",
  alternates: { canonical: "https://admizzeducation.com/uk-scholarships-for-Nepalese-students-2027" },
  openGraph: {
    title: "UK Scholarships for Nepalese Students — 2027 Guide",
    description: "A complete 2027 guide to UK scholarships for Nepalese students: Chevening, GREAT, university awards, eligibility, timing and how to apply.",
    url: "https://admizzeducation.com/uk-scholarships-for-Nepalese-students-2027",
    siteName: "Admizz Education",
    type: "article",
    images: ["https://cdn.sanity.io/images/vd27cmpc/production/40a094349f93bb0e1eb146f030affe81a189608d-1200x628.png?w=1200&h=630&fit=crop&auto=format"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} content={content} />;
}
