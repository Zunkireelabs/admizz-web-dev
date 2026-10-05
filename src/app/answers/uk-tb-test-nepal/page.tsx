import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";

const post = {
  "title": "Do I Need a TB Test for a UK Student Visa from Nepal?",
  "slug": "uk-tb-test-nepal",
  "sections": [
    {
      "heading": "The details",
      "body": "- **Who needs it:** people coming to the UK for 6 months or more who have lived in a listed country for 6 months or more within the last 6 months.\n- **Nepal:** listed by GOV.UK, which links to the approved clinics in Nepal.\n- **Where:** only at an approved clinic.\n- **Validity:** 6 months from the date of your x-ray, so time the test so your certificate is valid on the day you apply.\n\nSee where this fits in the [full UK student visa guide](/uk-student-visa-from-nepal)."
    },
    {
      "heading": "Sources",
      "body": "- [GOV.UK: TB test for a UK visa](https://www.gov.uk/tb-test-visa)\n\nChecked in October 2026. Rules change, so confirm on the official site when you apply. For help with your own application, talk to our [counselling team](/register)."
    }
  ],
  "featuredImage": {
    "url": "/images/blog/answers-uk-tb-test-nepal.webp",
    "alt": "Do I Need a TB Test for a UK Student Visa from Nepal?"
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
  "description": "Nepal is on the UK TB test list. If you are coming for 6 months or more you need a test at an approved clinic, valid 6 months from the x-ray.",
  "quickAnswer": "Yes, in most cases. You need a tuberculosis test if you are coming to the UK for 6 months or more and have lived in a listed country for 6 months or more, and Nepal is on the UK's list. The test must be done at an approved clinic, and the certificate is valid for 6 months from the date of your x-ray.",
  "faqItems": [
    {
      "question": "How long is a UK TB test certificate valid?",
      "answer": "If your test shows you do not have TB, you are given a certificate valid for 6 months from the date of your x-ray."
    },
    {
      "question": "Where do I take the TB test in Nepal?",
      "answer": "You must take it at an approved clinic. GOV.UK lists the approved clinics in Nepal."
    }
  ],
  "path": "/answers/uk-tb-test-nepal"
};

export const metadata: Metadata = {
  title: "UK Student Visa TB Test from Nepal: Short Answer",
  description: "Nepal is on the UK TB test list. If you are coming for 6 months or more you need a test at an approved clinic, valid 6 months from the x-ray.",
  alternates: { canonical: "https://admizzeducation.com/answers/uk-tb-test-nepal" },
  openGraph: {
    title: "UK Student Visa TB Test from Nepal: Short Answer",
    description: "Nepal is on the UK TB test list. If you are coming for 6 months or more you need a test at an approved clinic, valid 6 months from the x-ray.",
    url: "https://admizzeducation.com/answers/uk-tb-test-nepal",
    siteName: "Admizz Education",
    type: "article",
    images: ["/images/blog/answers-uk-tb-test-nepal.webp"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} />;
}
