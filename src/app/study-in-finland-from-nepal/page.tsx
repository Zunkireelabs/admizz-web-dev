import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Finland from Nepal - Admizz Education",
  description:
    "Study in Finland from Nepal: tuition, the January application round, residence permit steps and costs, explained for Nepali students.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-finland-from-nepal",
  },
  openGraph: {
    title: "Study in Finland from Nepal - Admizz Education",
    description:
      "Study in Finland from Nepal: tuition, the January application round, residence permit steps and costs, explained for Nepali students.",
    url: "https://admizzeducation.com/study-in-finland-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "Finland",
  countryCategorySlug: "finland",
  heroHeading: "Study in Finland from Nepal",
  heroSubheading: "English-taught degrees, a two-year job-search permit after graduation, and help with every step from Kathmandu.",
  quickFacts: [
    { label: "Main application", value: "January" },
    { label: "Tuition from", value: "€9,000 / yr" },
    { label: "Work in studies", value: "30 h / week avg" },
    { label: "Job-search permit", value: "2 years" },
    { label: "English", value: "IELTS 6.0+" },
  ],
  introTitle: "Study in Finland from Nepal",
  introContent:
    "Finnish universities and universities of applied sciences teach many bachelor's and master's programmes in English. You apply through one national system, and after graduating you can stay to look for work.",
  whyStudyTitle: "Practical degrees and time to find work after",
  whyStudyIntro: "Why students from Nepal look at Finland.",
  highlightStats: [
    {
      value: "2",
      unit: "years",
      label: "Job-search permit",
      note: "to look for work after a Finnish degree. You can apply within 5 years of graduating.",
    },
    { value: "30", unit: "hours a week", label: "average work allowed" },
    { value: "€800", unit: "a month", label: "funds to show for your permit" },
  ],
  benefits: [
    {
      title: "Taught in English",
      description: "Many bachelor's and master's programmes are fully in English. Finnish is not needed to study.",
    },
    {
      title: "One application system",
      description: "Apply to up to six programmes with one form on Studyinfo.fi.",
    },
    {
      title: "Work while you study",
      description: "An average of 30 hours a week, in any field, as long as your studies progress.",
    },
    {
      title: "Stay to find a job",
      description: "A permit of up to 2 years to look for work after you graduate.",
    },
  ],
  visaTitle: "Your residence permit for studies, step by step",
  visaIntro: "Apply as soon as you accept your place. June and July are the busiest months.",
  visaRequirements: [
    { category: "Apply on Studyinfo", details: "Joint application in January. Non-EU applicants pay a €100 fee." },
    { category: "Accept your place", details: "Pay the first-year tuition, or show the money for it in your account." },
    { category: "Apply in Enter Finland", details: "Online application and the €600 fee to the Finnish Immigration Service (Migri)." },
    { category: "Identity check in Kathmandu", details: "Book an appointment at the Embassy of Finland after you apply. Bring original documents." },
    { category: "Decision by Migri", details: "Your permit card reaches Kathmandu about 2–3 weeks after a positive decision." },
    { category: "Arrive in Finland", details: "Register your address and start studies. We brief you before you fly." },
  ],
  visaDocuments: [
    "Valid passport",
    "Letter of acceptance",
    "Proof of tuition paid or funds for it",
    "€9,600 in your bank account",
    "Private health insurance",
    "Academic transcripts",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "Most English-taught programmes start in autumn. The January application window is short.",
  intakes: [
    { intake: "August intake", months: "Apply 7–21 January 2027", details: "Main intake. Studies start late August or early September." },
    { intake: "January intake", months: "Apply late August – early September", details: "Fewer programmes, mostly universities of applied sciences." },
  ],
  costTitle: "What a year in Finland costs",
  costIntro: "Typical tuition, plus the living-cost amount Migri asks you to show for your permit.",
  costTables: [
    {
      title: "Tuition per year",
      rows: [
        { category: "Bachelor's & master's", cost: "€9k – €20k" },
        { category: "Finnish-taught & PhD", cost: "Free" },
        { category: "Application fee", cost: "€100 once" },
      ],
    },
    {
      title: "Living & permit costs",
      rows: [
        { category: "Funds to show", cost: "€800 / mo" },
        { category: "Realistic budget", cost: "€900 – €1,200 / mo" },
        { category: "Permit fee (online)", cost: "€600" },
      ],
    },
  ],
  costNote: "Sources: Study in Finland (tuition, budget) and Migri (funds, permit fee), checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "Finland has no government scholarships for bachelor's or master's. Funding comes from universities.",
  scholarships: [
    { name: "University scholarships", provider: "Finnish universities", details: "Partial or full tuition waivers. Usually applied for with your admission." },
    { name: "Erasmus Mundus Joint Masters", provider: "European Union", details: "Fully funded joint master's offered with Finnish partner universities." },
  ],
  scholarshipsNote: "Awards cover tuition, not living costs. Many are renewed each year only if you earn enough credits.",
  universities: [
    { name: "Haaga-Helia University of Applied Science", logo: "/images/universities/finland/haaga-helia.webp" },
    { name: "South-Eastern Finland University of Applied Science", logo: "/images/universities/finland/south-eastern-finland.webp" },
    { name: "Lab University of Applied Science", logo: "/images/universities/finland/lab-university.webp" },
    { name: "Satakunta University of Applied Science", logo: "/images/universities/finland/satakunta-university.webp" },
    { name: "Vaasa University of Applied Science", logo: "/images/universities/finland/vaasa-university.webp" },
    { name: "Karelia University of Applied Science", logo: "/images/universities/finland/karelia-university.webp" },
  ],

  faqItems: [
    {
      question: "Do I need to speak Finnish to study in Finland?",
      answer: "No. Many programmes are taught fully in English. Basic Finnish helps with daily life and part-time jobs.",
    },
    {
      question: "When do I apply?",
      answer:
        "For autumn 2027 starts, the joint application on Studyinfo.fi runs 7–21 January 2027. A smaller round for January starts opens in late August.",
    },
    {
      question: "How much money do I need to show?",
      answer:
        "Migri asks for €800 per month. For a year or longer, you need €9,600 in your bank account when you apply, plus the tuition fee if not yet paid.",
    },
    {
      question: "Where do I give my fingerprints from Nepal?",
      answer: "At the Embassy of Finland in Kathmandu. Book the appointment after submitting your Enter Finland application.",
    },
    {
      question: "Can I work while studying in Finland?",
      answer: "Yes, an average of 30 hours a week in any field. You can work more in some weeks if the yearly average stays within the limit.",
    },
    {
      question: "Can I stay in Finland after graduation?",
      answer: "Yes. You can apply for a residence permit to look for work for up to 2 years, within 5 years of graduating.",
    },
    {
      question: "What English score do I need?",
      answer: "Usually IELTS 6.0–6.5, depending on the programme. Check each programme on Studyinfo.fi.",
    },
  ],

  ctaTitle: "Plan your Finland move with us",
  ctaContent: "Free first consultation with our Finland team, in person or on a call.",
};

export default async function StudyInFinlandFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "finland" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
