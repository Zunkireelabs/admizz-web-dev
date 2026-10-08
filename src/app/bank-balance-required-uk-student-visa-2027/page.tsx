import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";
import { content } from "./content";

const post = {
  "title": "How Much Bank Balance Is Needed for a UK Student Visa?",
  "slug": "bank-balance-required-uk-student-visa-2027",
  "sections": [],
  "featuredImage": {
    "url": "https://cdn.sanity.io/images/vd27cmpc/production/e48ea174a0fb27bdfa20b7dc96e0b7aeea1135b2-1200x628.png?w=1200&auto=format",
    "alt": "International student calculating UK student visa maintenance funds and tuition on a calculator"
  },
  "categories": [
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
  "publishedAt": "2026-10-05T02:35:00.000Z",
  "updatedAt": "2026-10-05T09:24:21Z",
  "description": "How much money must you show for a UK student visa in 2027? Maintenance amounts, tuition, examples in pounds and rupees, and how the 28-day rule works.",
  "quickAnswer": "For a UK Student visa you must show your unpaid first-year tuition plus maintenance for up to 9 months. Maintenance is £1,171 a month outside London (£10,539) and £1,529 in London (£13,761) for applications before November 30, 2026, then £1,203 (£10,827) and £1,570 (£14,130) from that date. The money must be held for 28 consecutive days, ending within 31 days of your application.",
  "faqItems": [
    {
      "question": "Do I have to keep the money after the visa is approved?",
      "answer": "UKVI checks funds at application, but you will need money to live on. Keep your funds available for your first months."
    },
    {
      "question": "Can my parents' bank account be used?",
      "answer": "Yes, with a signed consent letter and proof of relationship, held for 28 days."
    },
    {
      "question": "Does a scholarship reduce the funds I must show?",
      "answer": "A confirmed tuition scholarship lowers the unpaid tuition you must show. Provide the award letter as evidence."
    }
  ],
  "faqSchemaOnly": true,
  "path": "/bank-balance-required-uk-student-visa-2027"
};

export const metadata: Metadata = {
  title: "UK Student Visa Bank Balance Required (2027)",
  description: "How much money must you show for a UK student visa in 2027? Maintenance amounts, tuition, examples in pounds and rupees, and how the 28-day rule works.",
  alternates: { canonical: "https://admizzeducation.com/bank-balance-required-uk-student-visa-2027" },
  openGraph: {
    title: "UK Student Visa Bank Balance Required (2027)",
    description: "How much money must you show for a UK student visa in 2027? Maintenance amounts, tuition, examples in pounds and rupees, and how the 28-day rule works.",
    url: "https://admizzeducation.com/bank-balance-required-uk-student-visa-2027",
    siteName: "Admizz Education",
    type: "article",
    images: ["https://cdn.sanity.io/images/vd27cmpc/production/e48ea174a0fb27bdfa20b7dc96e0b7aeea1135b2-1200x628.png?w=1200&h=630&fit=crop&auto=format"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} content={content} />;
}
