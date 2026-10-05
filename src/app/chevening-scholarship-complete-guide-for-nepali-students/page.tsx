import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";
import { html } from "./content";

const post = {
  "title": "Chevening Scholarship – Complete Guide for Nepali Students",
  "slug": "chevening-scholarship-complete-guide-for-nepali-students",
  "sections": [],
  "featuredImage": {
    "url": "https://cdn.sanity.io/images/vd27cmpc/production/8cf72756d3af554eb9ecad93849d77c77b41b3c9-1376x697.webp?w=1200&auto=format",
    "alt": "Chevening Scholarship – Complete Guide for Nepali Students"
  },
  "categories": [
    {
      "slug": "nepal",
      "title": "Nepal"
    },
    {
      "slug": "study-abroad",
      "title": "Study Abroad"
    },
    {
      "slug": "uk",
      "title": "UK"
    },
    {
      "slug": "scholarships",
      "title": "Scholarships"
    }
  ],
  "publishedAt": "2026-04-24T13:16:00.000Z",
  "updatedAt": "2026-10-05T00:00:00.000Z",
  "description": "Fully funded UK Master's for Nepali students. Chevening 2027/28 eligibility, benefits, essays and interview tips. Deadline: 6 October 2026, 11:00 UTC.",
  "faqItems": [
    {
      "answer": "No. Chevening requires at least two years of work experience by the application deadline. This can be paid work, voluntary work, or internships, but it must be documented with dates and responsibilities.",
      "question": "Can fresh graduates apply for the Chevening Scholarship from Nepal?"
    },
    {
      "answer": "Chevening is highly competitive worldwide, and only a small percentage of applicants receive an award. A well-prepared, authentic, and specific application greatly improves your chances of being shortlisted.",
      "question": "How competitive is the Chevening Scholarship for Nepali students?"
    },
    {
      "answer": "Chevening Scholarships fund only one-year Master's programmes at UK universities. They do not fund PhDs, two-year taught programmes, or undergraduate studies.",
      "question": "Does Chevening fund PhD programmes or only Master's degrees?"
    },
    {
      "answer": "You can choose any eligible one-year Master's course at a UK university, and you must apply to three courses.",
      "question": "Can I choose any UK university for my Chevening application?"
    },
    {
      "answer": "You don't need an offer to submit your Chevening application. If you are selected, you must hold an unconditional offer from one of your chosen UK courses by July 2027, or you lose the scholarship.",
      "question": "What happens if I don't have a university offer before the Chevening deadline?"
    },
    {
      "answer": "You need to meet the English language requirement of the UK universities you apply to. The test and score vary by course, and most universities accept IELTS Academic.",
      "question": "Do I need IELTS to apply for the Chevening Scholarship from Nepal?"
    },
    {
      "answer": "There is no upper age limit. The programme targets early-to-mid career professionals, usually with two to ten years of experience.",
      "question": "Is there an age limit for the Chevening Scholarship?"
    },
    {
      "answer": "Admizz Education offers essay coaching, university and course selection, mock interviews, referee briefing, and application review for Chevening applicants from Nepal.",
      "question": "How can Admizz Education help me with my Chevening application?"
    }
  ],
  "faqSchemaOnly": true,
  "path": "/chevening-scholarship-complete-guide-for-nepali-students"
};

export const metadata: Metadata = {
  title: "Chevening Scholarship 2027/28 Nepal: Deadline & How to Apply",
  description: "Fully funded UK Master's for Nepali students. Chevening 2027/28 eligibility, benefits, essays and interview tips. Deadline: 6 October 2026, 11:00 UTC.",
  alternates: { canonical: "https://admizzeducation.com/chevening-scholarship-complete-guide-for-nepali-students" },
  openGraph: {
    title: "Chevening Scholarship 2027/28 Nepal: Deadline & How to Apply",
    description: "Fully funded UK Master's for Nepali students. Chevening 2027/28 eligibility, benefits, essays and interview tips. Deadline: 6 October 2026, 11:00 UTC.",
    url: "https://admizzeducation.com/chevening-scholarship-complete-guide-for-nepali-students",
    siteName: "Admizz Education",
    type: "article",
    images: ["https://cdn.sanity.io/images/vd27cmpc/production/8cf72756d3af554eb9ecad93849d77c77b41b3c9-1376x697.webp?w=1200&h=630&fit=crop&auto=format"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} html={html} />;
}
