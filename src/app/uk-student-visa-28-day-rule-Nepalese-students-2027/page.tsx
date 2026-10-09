import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";
import { content } from "./content";

const post = {
  "title": "UK Student Visa 28-Day Rule for Nepalese Students (2027)",
  "slug": "uk-student-visa-28-day-rule-Nepalese-students-2027",
  "sections": [],
  "featuredImage": {
    "url": "https://cdn.sanity.io/images/vd27cmpc/production/688c69c4dfb01683574b242a1fcab5d94ae744ae-1200x628.png?w=1200&auto=format",
    "alt": "Nepalese student reviewing a bank statement showing 28 days of funds for a UK student visa application"
  },
  "categories": [
    {
      "slug": "visa-guides",
      "title": "Visa Guides"
    },
    {
      "slug": "uk",
      "title": "UK"
    },
    {
      "slug": "student-finance",
      "title": "Student Finance"
    }
  ],
  "publishedAt": "2026-10-05T02:30:00.000Z",
  "updatedAt": "2026-10-05T09:24:41Z",
  "description": "How the UK 28-day bank balance rule works for Nepalese students: amounts, whose account counts, loan letters and the mistakes that cause refusals.",
  "faqItems": [
    {
      "question": "Can my balance go below the amount on one day?",
      "answer": "No. The required amount must be held for all 28 consecutive days. Keep a margin above the minimum."
    },
    {
      "question": "Is an education loan accepted instead of savings?",
      "answer": "Yes, if the sanction letter comes from a regulated bank and meets UKVI's rules on content and dates. Check the current requirements."
    },
    {
      "question": "Do I need the full tuition in my account?",
      "answer": "You need the unpaid first-year tuition plus maintenance funds. Money already paid to the university, such as your CAS deposit, is deducted."
    }
  ],
  "faqSchemaOnly": true,
  "path": "/uk-student-visa-28-day-rule-Nepalese-students-2027"
};

export const metadata: Metadata = {
  title: "UK 28-Day Bank Balance Rule Explained (2027)",
  description: "How the UK 28-day bank balance rule works for Nepalese students: amounts, whose account counts, loan letters and the mistakes that cause refusals.",
  alternates: { canonical: "https://admizzeducation.com/uk-student-visa-28-day-rule-Nepalese-students-2027" },
  openGraph: {
    title: "UK 28-Day Bank Balance Rule Explained (2027)",
    description: "How the UK 28-day bank balance rule works for Nepalese students: amounts, whose account counts, loan letters and the mistakes that cause refusals.",
    url: "https://admizzeducation.com/uk-student-visa-28-day-rule-Nepalese-students-2027",
    siteName: "Admizz Education",
    type: "article",
    images: ["https://cdn.sanity.io/images/vd27cmpc/production/688c69c4dfb01683574b242a1fcab5d94ae744ae-1200x628.png?w=1200&h=630&fit=crop&auto=format"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} content={content} />;
}
