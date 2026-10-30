import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in France from Nepal - Admizz Education",
  description:
    "Study in France from Nepal: Campus France and student visa steps, 2026-27 tuition, living costs, scholarships and intakes for Nepali students.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-france-from-nepal",
  },
  openGraph: {
    title: "Study in France from Nepal - Admizz Education",
    description:
      "Study in France from Nepal: Campus France and student visa steps, 2026-27 tuition, living costs, scholarships and intakes for Nepali students.",
    url: "https://admizzeducation.com/study-in-france-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/france.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "France",
  countryCategorySlug: "france",
  heroHeading: "Study in France from Nepal",
  heroSubheading: "Course choice, Campus France and your student visa, handled with a counsellor at our Kathmandu office.",
  heroImage: "/images/hero/france-hero.webp",
  quickFacts: [
    { label: "Intakes", value: "Sep · Jan" },
    { label: "Tuition from", value: "€2,902 / yr" },
    { label: "Work", value: "964 hrs / yr" },
    { label: "Job-search permit", value: "1 year" },
    { label: "Language", value: "IELTS / DELF" },
  ],
  introTitle: "Study in France from Nepal",
  introContent:
    "Public universities in France charge set national fees, many master's programmes are taught in English, and master's graduates can stay a year to look for work.",
  whyStudyTitle: "Set public fees and a year to find work",
  whyStudyIntro: "Why students from Nepal pick France.",
  highlightStats: [
    {
      value: "964",
      unit: "hours a year",
      label: "work while you study",
      note: "About 60% of full-time hours. Internships that are part of your course don't count towards it.",
    },
    { value: "€2,902", unit: "a year", label: "public bachelor's tuition (2026-27)" },
    { value: "12", unit: "months", label: "job-search permit after a master's" },
  ],
  benefits: [
    {
      title: "Set public university fees",
      description: "€2,902 a year for a bachelor's and €3,950 for a master's at public universities in 2026-27.",
    },
    {
      title: "Programmes in English",
      description: "Many master's and business school programmes are taught fully in English.",
    },
    {
      title: "Work while you study",
      description: "Up to 964 hours a year on a student residence permit.",
    },
    {
      title: "A year to find work",
      description: "Master's-level graduates can get a 1-year permit to look for a job or start a business.",
    },
  ],
  visaTitle: "Your student visa, step by step",
  visaIntro: "Nepali students apply through Études en France first, then for a long-stay student visa (VLS-TS).",
  visaRequirements: [
    { category: "Choose a programme", details: "Pick a public university or school. We shortlist with you." },
    { category: "Études en France application", details: "Apply online via Campus France Nepal, Pulchowk, Lalitpur." },
    { category: "Campus France interview", details: "A short interview on your study plan and background." },
    { category: "Admission & housing", details: "Accept your offer and arrange accommodation." },
    { category: "Visa form on France-Visas", details: "Fill in the long-stay student visa form online." },
    { category: "Submit at VFS Kathmandu", details: "Documents and biometrics at VFS Global, Thapathali." },
    { category: "Decision & arrival", details: "Validate your visa online within 3 months of arriving (€150)." },
  ],
  visaDocuments: [
    "Valid passport",
    "Admission letter",
    "Campus France / Études en France number",
    "Proof of funds (€877.50 a month)",
    "Proof of accommodation",
    "Academic transcripts and certificates",
    "IELTS or French test result",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "September has the most programmes. Études en France takes time, so apply early.",
  intakes: [
    { intake: "September intake", months: "Apply October – March", details: "Main intake. Most programmes and scholarships." },
    { intake: "January intake", months: "Check with each school", details: "Selected programmes, mostly at business schools." },
  ],
  costTitle: "What a year in France costs",
  costIntro: "Public tuition is set nationally for 2026-27. Private schools set their own fees.",
  costTables: [
    {
      title: "Tuition per year",
      rows: [
        { category: "Public bachelor's", cost: "€2,902" },
        { category: "Public master's", cost: "€3,950" },
        { category: "Private / business schools", cost: "€6k – €18k+" },
      ],
    },
    {
      title: "Living & visa costs",
      rows: [
        { category: "Funds to show", cost: "€877.50 / mo" },
        { category: "Visa validation", cost: "€150" },
        { category: "Student contribution (CVEC)", cost: "€105 / yr" },
      ],
    },
  ],
  costNote: "Sources: Campus France (tuition), service-public.gouv.fr (funds, validation) and etudiant.gouv.fr (CVEC), checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "We check which of these you qualify for in your first consultation.",
  scholarships: [
    { name: "France Excellence Eiffel", provider: "French Government", details: "Master's and PhD. Your French university nominates you." },
    { name: "Erasmus Mundus", provider: "European Union", details: "Full scholarships for joint master's across European universities." },
    { name: "University fee waivers", provider: "Universities", details: "Some public universities reduce fees for international students." },
    { name: "School scholarships", provider: "Business & engineering schools", details: "Merit-based tuition reductions, set by each school." },
  ],
  universities: [
    { name: "Sorbonne University", logo: "/images/universities/france/sorbonne-university.webp" },
    { name: "Universit\u00E9 PSL", logo: "/images/universities/france/universite-psl.svg" },
    { name: "\u00C9cole Polytechnique", logo: "/images/universities/france/ecole-polytechnique.webp" },
    { name: "Sciences Po", logo: "/images/universities/france/sciences-po.webp" },
    { name: "University of Paris-Saclay", logo: "/images/universities/france/university-of-paris-saclay.webp" },
    { name: "Universit\u00E9 Grenoble Alpes", logo: "/images/universities/france/universite-grenoble-alpes.webp" },
    { name: "Aix-Marseille University", logo: "/images/universities/france/aix-marseille-university.webp" },
    { name: "Universit\u00E9 de Strasbourg", logo: "/images/universities/france/universite-de-strasbourg.webp" },
    { name: "Universit\u00E9 de Bordeaux", logo: "/images/universities/france/universite-de-bordeaux.webp" },
    { name: "Universit\u00E9 de Lille", logo: "/images/universities/france/universite-de-lille.webp" },
  ],

  faqItems: [
    {
      question: "Can I study in France without knowing French?",
      answer:
        "Yes. Many master's and business school programmes are taught in English. Basic French helps with daily life and part-time work.",
    },
    {
      question: "Do I need IELTS to study in France?",
      answer:
        "For English-taught programmes, most schools ask for IELTS or a similar test. For French-taught programmes, you need a French test such as DELF or TCF.",
    },
    {
      question: "How much money do I need to show for the visa?",
      answer:
        "At least €877.50 a month for your stay, through bank statements, a sponsor or a scholarship.",
    },
    {
      question: "Can I work part-time while studying?",
      answer:
        "Yes, up to 964 hours a year on a student residence permit. Internships that are part of your course don't count.",
    },
    {
      question: "Can I stay in France after graduating?",
      answer:
        "If you finish a master's-level degree, you can get a 1-year permit to look for work or start a business. The permit can't be renewed.",
    },
    {
      question: "How much is tuition at public universities?",
      answer:
        "For new non-EU students in 2026-27: €2,902 a year for a bachelor's and €3,950 for a master's. Some universities offer fee waivers.",
    },
    {
      question: "Where do Nepali students apply for the visa?",
      answer:
        "Complete Études en France with Campus France Nepal, fill in the form on France-Visas, then submit your documents at VFS Global in Kathmandu.",
    },
  ],

  ctaTitle: "Plan your France move with us",
  ctaContent: "Free first consultation with our France team, in person or on a call.",
};

export default async function StudyInFranceFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "france" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
