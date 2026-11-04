import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";
import { content } from "./content";

const post = {
  "title": "UK Student Visa Rules 2026-27: What Changed for Nepal",
  "slug": "uk-student-visa-rule-changes-2026-27-nepali-students",
  "sections": [],
  "featuredImage": {
    "url": "/images/blog/uk-student-visa-rule-changes-2026-27-nepali-students.webp",
    "alt": "UK student visa rule changes 2026-27 for Nepali students: timeline of dates"
  },
  "categories": [
    {
      "slug": "uk",
      "title": "UK"
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
  "description": "UK student visa rules 2026-27 for Nepali students: new funds from Nov 30, 2026, stricter sponsor checks, the 18-month Graduate visa and what to check.",
  "quickAnswer": "For applications from November 30, 2026, UK Student visa funds rise to £1,570 a month in London and £1,203 outside London, for up to 9 months. Sponsors face a stricter compliance test (visa refusal rate under 5%, enrollment 95%), so check your university is on the sponsor register. The Graduate visa is 18 months from January 1, 2027.",
  "faqItems": [
    {
      "question": "What are the new UK student visa funds from November 30, 2026?",
      "answer": "For applications on or after November 30, 2026, you must show £1,570 a month for courses in London or £1,203 a month outside London, for up to 9 months, plus your unpaid first-year tuition."
    },
    {
      "question": "What is the Basic Compliance Assessment for UK universities?",
      "answer": "It is the Home Office check of a sponsor's visa refusal, enrollment and completion rates. Since June 1, 2026 the limits are a refusal rate under 5% and enrollment of at least 95%. A sponsor that fails can lose its licence."
    },
    {
      "question": "How do I check if a UK university can sponsor student visas?",
      "answer": "Search for the university on the GOV.UK Register of licensed sponsors: students before paying a deposit. A university must be on it to issue a Confirmation of Acceptance for Studies."
    },
    {
      "question": "How long is the UK Graduate visa from 2027?",
      "answer": "It is 18 months if you apply on or after January 1, 2027, and 2 years if you apply on or before December 31, 2026. Doctoral graduates get 3 years."
    },
    {
      "question": "Does the UK international student levy affect Nepali students directly?",
      "answer": "The levy is a flat fee of £925 per international student per year charged to English universities from August 1, 2028. You do not pay it, but universities may pass costs on."
    },
    {
      "question": "Has the English language requirement for the UK Student visa changed?",
      "answer": "GOV.UK still lists CEFR level B2 for degree-level courses and B1 for courses below degree level, and shows no future change."
    }
  ],
  "path": "/uk-student-visa-rule-changes-2026-27-nepali-students",
  "faqSchemaOnly": true
};

export const metadata: Metadata = {
  title: "UK Student Visa Rules 2026-27: What Changed for Nepal",
  description: "UK student visa rules 2026-27 for Nepali students: new funds from Nov 30, 2026, stricter sponsor checks, the 18-month Graduate visa and what to check.",
  alternates: { canonical: "https://admizzeducation.com/uk-student-visa-rule-changes-2026-27-nepali-students" },
  openGraph: {
    title: "UK Student Visa Rules 2026-27: What Changed for Nepal",
    description: "UK student visa rules 2026-27 for Nepali students: new funds from Nov 30, 2026, stricter sponsor checks, the 18-month Graduate visa and what to check.",
    url: "https://admizzeducation.com/uk-student-visa-rule-changes-2026-27-nepali-students",
    siteName: "Admizz Education",
    type: "article",
    images: ["/images/blog/uk-student-visa-rule-changes-2026-27-nepali-students.webp"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} content={content} />;
}
