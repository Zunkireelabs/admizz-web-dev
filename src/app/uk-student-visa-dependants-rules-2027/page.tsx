import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";
import { content } from "./content";

const post = {
  "title": "Can You Take Dependants on a UK Student Visa? (2027)",
  "slug": "uk-student-visa-dependants-rules-2027",
  "sections": [],
  "featuredImage": {
    "url": "https://cdn.sanity.io/images/vd27cmpc/production/4203b83b843c95d75df895251db6ae75c40a3310-1200x628.png?w=1200&auto=format",
    "alt": "International postgraduate student with partner and child planning a UK Student visa dependant application"
  },
  "categories": [
    {
      "slug": "student-finance",
      "title": "Student Finance"
    },
    {
      "slug": "visa-guides",
      "title": "Visa Guides"
    },
    {
      "slug": "study-abroad",
      "title": "Study Abroad"
    },
    {
      "slug": "uk",
      "title": "UK"
    }
  ],
  "publishedAt": "2026-10-05T04:49:00.000Z",
  "updatedAt": "2026-10-05T04:52:47Z",
  "description": "Who can bring a partner or children on a UK Student visa in 2027? Eligibility, fees, funds per dependant and alternatives, explained simply.",
  "faqItems": [
    {
      "question": "Can I bring my wife on a one-year Masters?",
      "answer": "No. Dependants are limited to postgraduate research and government-sponsored students, so taught Masters students cannot bring a partner."
    },
    {
      "question": "Do dependants need to show their own funds?",
      "answer": "Yes. Each dependant needs separate funds of £845 (London) or £680 (outside London) a month for up to 9 months, held for 28 days."
    },
    {
      "question": "Can my partner join me later?",
      "answer": "Only if you qualify to bring dependants, and each person must meet the visa requirements at the time they apply."
    }
  ],
  "faqSchemaOnly": true,
  "path": "/uk-student-visa-dependants-rules-2027"
};

export const metadata: Metadata = {
  title: "UK Student Visa Dependants Rules 2027",
  description: "Who can bring a partner or children on a UK Student visa in 2027? Eligibility, fees, funds per dependant and alternatives, explained simply.",
  alternates: { canonical: "https://admizzeducation.com/uk-student-visa-dependants-rules-2027" },
  openGraph: {
    title: "UK Student Visa Dependants Rules 2027",
    description: "Who can bring a partner or children on a UK Student visa in 2027? Eligibility, fees, funds per dependant and alternatives, explained simply.",
    url: "https://admizzeducation.com/uk-student-visa-dependants-rules-2027",
    siteName: "Admizz Education",
    type: "article",
    images: ["https://cdn.sanity.io/images/vd27cmpc/production/4203b83b843c95d75df895251db6ae75c40a3310-1200x628.png?w=1200&h=630&fit=crop&auto=format"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} content={content} />;
}
