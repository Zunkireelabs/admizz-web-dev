import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Denmark from Nepal - Admizz Education",
  description:
    "Study in Denmark from Nepal: tuition, admission deadlines, residence permit steps and costs, explained for Nepali students.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-denmark-from-nepal",
  },
  openGraph: {
    title: "Study in Denmark from Nepal - Admizz Education",
    description:
      "Study in Denmark from Nepal: tuition, admission deadlines, residence permit steps and costs, explained for Nepali students.",
    url: "https://admizzeducation.com/study-in-denmark-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "Denmark",
  heroImage: "/images/hero/denmark-hero.webp",
  countryCategorySlug: "denmark",
  heroHeading: "Study in Denmark from Nepal",
  heroSubheading: "English-taught degrees, part-time work during studies, and help with admission and your residence permit from Kathmandu.",
  quickFacts: [
    { label: "Bachelor's deadline", value: "15 March" },
    { label: "Tuition from", value: "€6,000 / yr" },
    { label: "Work in studies", value: "90 h / month" },
    { label: "Job-search permit", value: "1 year" },
    { label: "English", value: "IELTS 6.5 typical" },
  ],
  introTitle: "Study in Denmark from Nepal",
  introContent:
    "Danish universities and university colleges teach many bachelor's and master's programmes in English. Students can work part-time during studies and full-time in summer.",
  whyStudyTitle: "Project-based degrees with summer work rights",
  whyStudyIntro: "Why students from Nepal look at Denmark.",
  highlightStats: [
    {
      value: "1",
      unit: "year",
      label: "Job-search permit",
      note: "after a state-approved degree, for study permits applied for from 1 October 2026 (it was 3 years before).",
    },
    { value: "90", unit: "hours a month", label: "work September – May" },
    { value: "Full-time", label: "work June – August" },
  ],
  benefits: [
    {
      title: "Taught in English",
      description: "Many bachelor's and master's programmes are fully in English. Danish is not needed to study.",
    },
    {
      title: "Project-based learning",
      description: "Much of the teaching is group projects and problem-solving, often with companies.",
    },
    {
      title: "Work while you study",
      description: "Up to 90 hours a month from September to May, full-time in June, July and August.",
    },
    {
      title: "Government scholarships",
      description: "Universities award Danish Government Scholarships to selected non-EU students.",
    },
  ],
  visaTitle: "Your residence permit for studies, step by step",
  visaIntro: "SIRI normally decides within 2 months, up to 3 if more information is needed.",
  visaRequirements: [
    { category: "Get admitted", details: "Bachelor's via optagelse.dk by 15 March. Master's directly with the university." },
    { category: "Create case order ID & pay fee", details: "Pay the DKK 3,060 fee to SIRI before you apply." },
    { category: "Submit form ST1", details: "Your university fills in its part online, then you complete yours." },
    { category: "Biometrics in Kathmandu", details: "Within 14 days, at the VFS Global centre. The Danish Embassy in New Delhi handles the case." },
    { category: "Decision by SIRI", details: "Usually within 2 months of a complete application." },
    { category: "Arrive in Denmark", details: "Register for your CPR number and residence card. We brief you before you fly." },
  ],
  visaDocuments: [
    "Valid passport",
    "Letter of admission",
    "Form ST1 and fee receipt",
    "Bank statements (max 30 days old)",
    "Tuition receipt, if already paid",
    "Academic transcripts",
  ],
  visaNote:
    "Only state-approved programmes give work rights and a job-search permit. Check your programme with us before you apply.",
  intakesTitle: "When you can start",
  intakesIntro: "Most programmes start in late August or September. Deadlines are early in the year.",
  intakes: [
    { intake: "September intake", months: "Bachelor's: apply by 15 March", details: "Main intake. Master's deadlines are set by each university." },
    { intake: "February intake", months: "Check with each university", details: "Selected programmes only." },
  ],
  costTitle: "What a year in Denmark costs",
  costIntro: "Typical tuition, plus the living-cost amount SIRI asks you to show for your permit.",
  costTables: [
    {
      title: "Tuition per year",
      rows: [
        { category: "Bachelor's & master's", cost: "€6k – €16k" },
        { category: "Some specialised programmes", cost: "Higher, check each" },
      ],
    },
    {
      title: "Living & permit costs",
      rows: [
        { category: "Funds to show", cost: "DKK 7,426 / mo" },
        { category: "Maximum asked", cost: "DKK 89,112" },
        { category: "Permit fee", cost: "DKK 3,060" },
      ],
    },
  ],
  costNote:
    "Funds: 2026 level, capped at 12 months. Sources: SIRI (nyidanmark.dk) and Study in Europe (European Commission), checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "We check which of these you qualify for in your first consultation.",
  scholarships: [
    { name: "Danish Government Scholarships", provider: "Danish universities", details: "Full or partial tuition waiver, sometimes a living grant. For non-EU degree students." },
    { name: "Erasmus Mundus Joint Masters", provider: "European Union", details: "Fully funded joint master's offered with Danish partner universities." },
    { name: "University scholarships", provider: "Universities", details: "Limited awards, set by each university." },
  ],
  scholarshipsNote: "Government scholarships are few and competitive. Each university runs its own selection.",
  universities: [
    { name: "University of Copenhagen", logo: "/images/universities/denmark/university-of-copenhagen.webp" },
    { name: "Aarhus University", logo: "/images/universities/denmark/aarhus-university.webp" },
    { name: "Technical University of Denmark", logo: "/images/universities/denmark/technical-university-of-denmark.webp" },
    { name: "Copenhagen Business School", logo: "/images/universities/denmark/copenhagen-business-school.webp" },
    { name: "Aalborg University", logo: "/images/universities/denmark/aalborg-university.webp" },
    { name: "University of Southern Denmark", logo: "/images/universities/denmark/university-of-southern-denmark.webp" },
    { name: "Roskilde University", logo: "/images/universities/denmark/roskilde-university.webp" },
    { name: "IT University of Copenhagen", logo: "/images/universities/denmark/it-university-of-copenhagen.webp" },
    { name: "VIA University College", logo: "/images/universities/denmark/via-university-college.webp" },
    { name: "University College Copenhagen", logo: "/images/universities/denmark/university-college-copenhagen.webp" },
  ],

  faqItems: [
    {
      question: "Do I need to speak Danish to study in Denmark?",
      answer: "No. Many programmes are taught fully in English. Basic Danish helps with daily life and part-time jobs.",
    },
    {
      question: "When do I apply?",
      answer:
        "For bachelor's, apply on optagelse.dk by 15 March at 12 noon. For master's, apply to the university by its own deadline, usually in spring.",
    },
    {
      question: "How much money do I need to show?",
      answer:
        "SIRI asks for DKK 7,426 per month of study (2026 level), up to DKK 89,112 for 12 months, in your own name.",
    },
    {
      question: "Where do I give my biometrics from Nepal?",
      answer: "At the VFS Global centre in Kathmandu, within 14 days of applying. The Danish Embassy in New Delhi handles Nepali applications.",
    },
    {
      question: "Can I work while studying in Denmark?",
      answer: "Yes, up to 90 hours a month from September to May and full-time in June, July and August, on a state-approved programme.",
    },
    {
      question: "Can I stay in Denmark after graduation?",
      answer:
        "Yes. If you applied for your study permit on or after 1 October 2026, you generally get a 1-year job-search permit (3 years for PhD).",
    },
    {
      question: "Can my spouse come with me?",
      answer: "Generally not, if you apply on or after 1 October 2026. PhD students are an exception.",
    },
  ],

  ctaTitle: "Plan your Denmark move with us",
  ctaContent: "Free first consultation with our Denmark team, in person or on a call.",
};

export default async function StudyInDenmarkFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "denmark" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
