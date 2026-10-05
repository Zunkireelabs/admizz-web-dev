import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";

const post = {
  "title": "What English Level Do I Need for a UK Student Visa?",
  "slug": "uk-student-visa-english-requirement",
  "sections": [
    {
      "heading": "The details",
      "body": "- **Degree level or above:** CEFR B2\n- **Below degree level:** CEFR B1\n- **Evidence:** an approved Secure English Language Test, or for degree-level courses an assessment by your university, which must still be equivalent to B2.\n- **Ask first:** check which option your university accepts before you book a test.\n\nNot sure which test to take? Read [IELTS versus PTE](/ielts-vs-pte). The full process is in our [UK student visa guide](/uk-student-visa-from-nepal)."
    },
    {
      "heading": "Sources",
      "body": "- [GOV.UK: Student visa, knowledge of English](https://www.gov.uk/student-visa/knowledge-of-english)\n\nChecked in October 2026. Rules change, so confirm on the official site when you apply. For help with your own application, talk to our [counselling team](/register)."
    }
  ],
  "featuredImage": {
    "url": "/images/blog/answers-uk-student-visa-english-requirement.webp",
    "alt": "What English Level Do I Need for a UK Student Visa?"
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
      "slug": "nepal",
      "title": "Nepal"
    }
  ],
  "publishedAt": "2026-10-05T00:00:00.000Z",
  "updatedAt": "2026-10-05T00:00:00.000Z",
  "description": "For a degree-level course you need CEFR level B2. Below degree level you need B1. Use an approved test or your university's own assessment.",
  "quickAnswer": "For a degree-level course or above you need English at CEFR level B2. For courses below degree level you need level B1. You can show it with an approved Secure English Language Test, and for degree-level courses your university may assess your English itself, which must still be equivalent to B2.",
  "faqItems": [
    {
      "question": "Can my university assess my English instead of a test?",
      "answer": "For degree-level courses and above, GOV.UK says your higher education provider can assess your level of English itself."
    },
    {
      "question": "What English level is needed below degree level?",
      "answer": "For courses below degree level you need CEFR level B1."
    }
  ],
  "path": "/answers/uk-student-visa-english-requirement"
};

export const metadata: Metadata = {
  title: "UK Student Visa English Requirement: Short Answer",
  description: "For a degree-level course you need CEFR level B2. Below degree level you need B1. Use an approved test or your university's own assessment.",
  alternates: { canonical: "https://admizzeducation.com/answers/uk-student-visa-english-requirement" },
  openGraph: {
    title: "UK Student Visa English Requirement: Short Answer",
    description: "For a degree-level course you need CEFR level B2. Below degree level you need B1. Use an approved test or your university's own assessment.",
    url: "https://admizzeducation.com/answers/uk-student-visa-english-requirement",
    siteName: "Admizz Education",
    type: "article",
    images: ["/images/blog/answers-uk-student-visa-english-requirement.webp"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} />;
}
