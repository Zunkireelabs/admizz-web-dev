import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";
import { content } from "./content";

const post = {
  "title": "UK eVisa and Digital Visas for Students: How It Works",
  "slug": "uk-evisa-digital-visa-systems-study-abroad-nepali-students-2026",
  "sections": [],
  "featuredImage": {
    "url": "/images/blog/uk-evisa-digital-visa-systems-study-abroad-nepali-students-2026.webp",
    "alt": "UK eVisa on a phone with a passport: digital visa systems for Nepali students"
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
      "slug": "international-students",
      "title": "International Students"
    },
    {
      "slug": "for-nepalese-students",
      "title": "Nepali Students"
    }
  ],
  "publishedAt": "2026-11-03T00:00:00.000Z",
  "description": "UK eVisa for students: create a UKVI account, use a 90-day share code, and compare Australia, Canada and Germany online visa systems for Nepali students.",
  "quickAnswer": "A successful UK Student visa gives you an eVisa, a digital record you access through a UKVI account, replacing the BRP. A share code lasts 90 days and access can take up to 24 hours after linking. Canada requires online study permit applications and Germany uses its Consular Services Portal.",
  "faqItems": [
    {
      "question": "Does the UK eVisa replace the BRP for students?",
      "answer": "GOV.UK says the eVisa is replacing biometric residence permits and that a successful Student visa applicant gets an eVisa, an online record of immigration status."
    },
    {
      "question": "How do I create a UKVI account for my eVisa?",
      "answer": "Create an account with a phone number and email you can use to sign in, then confirm your identity and link the account to your eVisa. You usually see it straight away, but it can take up to 24 hours."
    },
    {
      "question": "How long does a UK share code last?",
      "answer": "GOV.UK says a share code lasts for 90 days and can be used as many times as you need before it expires. You can then get a new one."
    },
    {
      "question": "Do I need a UKVI account before I travel to the UK?",
      "answer": "GOV.UK advises signing in to your UKVI account before travel to view your eVisa and check your permission and details, because incorrect details may mean being delayed or denied boarding."
    },
    {
      "question": "Do I have to apply online for a Canada study permit?",
      "answer": "IRCC says you must apply online, from inside or outside Canada, with limited exceptions such as disability. You need an IRCC account to pay fees, submit and check status."
    },
    {
      "question": "Can I apply for a German student visa online from Nepal?",
      "answer": "The German Embassy Kathmandu says you can apply through the Consular Services Portal, but you still need an in-person appointment for biometrics, the fee and checking original documents."
    }
  ],
  "path": "/uk-evisa-digital-visa-systems-study-abroad-nepali-students-2026",
  "faqSchemaOnly": true
};

export const metadata: Metadata = {
  title: "UK eVisa and Digital Visas for Students: How It Works",
  description: "UK eVisa for students: create a UKVI account, use a 90-day share code, and compare Australia, Canada and Germany online visa systems for Nepali students.",
  alternates: { canonical: "https://admizzeducation.com/uk-evisa-digital-visa-systems-study-abroad-nepali-students-2026" },
  openGraph: {
    title: "UK eVisa and Digital Visas for Students: How It Works",
    description: "UK eVisa for students: create a UKVI account, use a 90-day share code, and compare Australia, Canada and Germany online visa systems for Nepali students.",
    url: "https://admizzeducation.com/uk-evisa-digital-visa-systems-study-abroad-nepali-students-2026",
    siteName: "Admizz Education",
    type: "article",
    images: ["/images/blog/uk-evisa-digital-visa-systems-study-abroad-nepali-students-2026.webp"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} content={content} />;
}
