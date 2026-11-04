import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in India from Nepal - Admizz Education",
  description:
    "Study in India from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-india-from-nepal",
  },
  openGraph: {
    title: "Study in India from Nepal - Admizz Education",
    description:
      "Study in India from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-india-from-nepal",
    siteName: "Admizz Education",
    images: [
      {
        url: "/images/og/countries/study-in-india.jpg",
        width: 1200,
        height: 630,
        alt: "Study in India from Nepal - Admizz Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in India from Nepal - Admizz Education",
    description:
      "Study in India from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    images: ["/images/og/countries/study-in-india.jpg"],
  },
};

const pageData: NepalVariantData = {
  countryName: "India",
  countryCategorySlug: "india",
  heroHeading: "Study in India from Nepal",
  heroSubheading: "No visa needed. Course choice, admission and documents, handled with a counselor at our offices in Kathmandu, Birgunj and Janakpur.",
  heroImage: "/images/hero/india-hero.webp",
  quickFacts: [
    { label: "Intakes", value: "Jul – Aug" },
    { label: "NIT tuition", value: "US$2,000 / sem" },
    { label: "Bachelor's", value: "3 – 4 years" },
    { label: "Visa", value: "Not needed" },
    { label: "English", value: "Class 12 marks" },
  ],
  introTitle: "Study in India from Nepal",
  introContent:
    "Nepali citizens can study in India without a visa. Many courses are taught in English, fees are lower than in Western countries, and home is a bus ride or short flight away.",
  whyStudyTitle: "Close to home, no visa, lower fees",
  whyStudyIntro: "Why so many students from Nepal pick India.",
  highlightStats: [
    {
      value: "0",
      unit: "visas",
      label: "needed to study in India",
      note: "Nepali citizens are exempt from the Indian visa requirement (Bureau of Immigration). Coming from Nepal by land or air, carry a government-approved photo ID showing your nationality.",
    },
    { value: "US$2,000", unit: "a semester", label: "NIT tuition, SAARC rate (DASA)" },
    { value: "6.4", unit: "lakh NPR a year", label: "Embassy law scholarship cap" },
  ],
  benefits: [
    {
      title: "No visa or permit",
      description: "Study in India from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "Lower fees",
      description: "Study in India from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "Government scholarships",
      description: "Study in India from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "Close to home",
      description: "Study in India from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
  ],
  visaTitle: "Your admission, step by step",
  visaIntro: "No visa is needed, so the work is in admission and documents. Start 4–6 months before your course.",
  visaRequirements: [
    { category: "Choose a course", details: "Pick a UGC-recognized university or AICTE-approved college. We shortlist with you." },
    { category: "Entrance test if needed", details: "NEET-UG for MBBS/BDS, DASA for NITs, or the university's own test." },
    { category: "Apply & get your admission letter", details: "Register on studyinindia.gov.in for your SII ID, then apply to the university, or through an Embassy scheme in Kathmandu." },
    { category: "Equivalence certificate", details: "UGC or AIU certificate that your +2 equals Class 12 in India." },
    { category: "Pay fees & book housing", details: "Pay the first-semester fee and confirm a hostel place." },
    { category: "Travel & enrol", details: "Cross by road or fly from Kathmandu, then complete enrollment on campus." },
  ],
  visaDocuments: [
    "Citizenship certificate (with English translation)",
    "Government-approved photo ID (a valid passport if you enter from outside Nepal)",
    "Class 10 and 12 mark sheets",
    "UGC or AIU equivalence certificate",
    "Admission letter from the university",
    "Character certificate from your last school",
    "Entrance test score (NEET, DASA etc.)",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "Most Indian universities start once a year, in July or August.",
  intakes: [
    { intake: "July intake", months: "Apply March – June", details: "Main intake for most universities. Embassy scheme dates are announced each year." },
    { intake: "August intake", months: "Apply April – July", details: "Many private universities and late rounds." },
    { intake: "January intake", months: "Check with each university", details: "Selected private universities and courses only." },
  ],
  testTitle: "Entrance tests by course",
  testIntro: "What you may need, depending on the course.",
  testRequirements: [
    { test: "MBBS / BDS", score: "NEET-UG", notes: "Required for foreign applicants. Embassy schemes ask for the 50th percentile or above." },
    { test: "NITs / IIITs", score: "DASA", notes: "Admission for foreign nationals, based on JEE Main rank." },
    { test: "Embassy COMPEX", score: "Computer test in Kathmandu", notes: "For Embassy-funded engineering, pharmacy, agriculture and nursing seats." },
    { test: "Most other courses", score: "Class 12 marks", notes: "Plus any test the university sets." },
  ],
  costTitle: "What studying in India costs",
  costIntro: "Fees depend heavily on the college. These are verified figures from official notices.",
  costTables: [
    {
      title: "Tuition",
      rows: [
        { category: "NITs via DASA (SAARC)", cost: "US$2,000 / sem + institute fees" },
        { category: "Embassy SFS seats (MBBS, BE)", cost: "College fees, self-paid" },
        { category: "Private universities", cost: "Varies; we share fee sheets" },
      ],
    },
    {
      title: "Visa, fees & funding",
      rows: [
        { category: "Visa fee", cost: "None" },
        { category: "COMPEX application", cost: "NPR 400" },
        { category: "Law scholarship", cost: "Up to NPR 6.4 lakh / yr" },
      ],
    },
  ],
  costNote: "Sources: DASA 2026 fee structure (dasanit.org) and Embassy of India Kathmandu notices, checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "We check which of these you qualify for in your first consultation.",
  scholarships: [
    { name: "ICCR Scholarships", provider: "Government of India (ICCR)", details: "ABVGSS for undergraduate and SJSS for postgraduate study, plus an AYUSH scheme. Apply via the ICCR A2A portal." },
    { name: "COMPEX Scholarship", provider: "Embassy of India, Kathmandu", details: "Bachelor's in engineering, pharmacy, agriculture, food tech or nursing." },
    { name: "Law Scholarship Scheme", provider: "Embassy of India, Kathmandu", details: "Up to NPR 6.4 lakh a year at top-20 NIRF law colleges." },
    { name: "Dr. Homi Jahangir Bhabha", provider: "Embassy of India, Kathmandu", details: "ME / M.Tech study in India." },
    { name: "Nepal Aid Fund", provider: "Embassy of India, Kathmandu", details: "M.Sc. (Agriculture) study in India." },
  ],
  scholarshipsNote: "The Embassy accepts scholarship applications only from students directly, not through agents. We help you prepare; you submit yourself.",
  universities: [
    { name: "IISc Bangalore", logo: "/images/universities/india/iisc-bangalore.webp" },
    { name: "University of Delhi", logo: "/images/universities/india/university-of-delhi.webp" },
    { name: "Jawaharlal Nehru University", logo: "/images/universities/india/jawaharlal-nehru-university.webp" },
    { name: "Banaras Hindu University", logo: "/images/universities/india/banaras-hindu-university.webp" },
    { name: "Anna University", logo: "/images/universities/india/anna-university.webp" },
    { name: "VIT", logo: "/images/universities/india/vit.webp" },
    { name: "Manipal Academy", logo: "/images/universities/india/manipal-academy.webp" },
    { name: "Symbiosis International University", logo: "/images/universities/india/symbiosis-international-university.webp" },
    { name: "Delhi Technological University", logo: "/images/universities/india/delhi-technological-university.webp" },
    { name: "KIIT University", logo: "/images/universities/india/kalinga-institute.webp" },
    { name: "RK University", logo: "/images/universities/india/rk-university.webp" },
  ],

  faqItems: [
    {
      question: "Do Nepali students need a visa to study in India?",
      answer:
        "No. India's Bureau of Immigration says citizens of Nepal are exempt from the requirement of an Indian visa. Coming from Nepal by land or air, carry a government-approved photo ID showing your nationality. You need a valid passport if you enter from anywhere else, and a passport and visa if you arrive from China, Macau, Hong Kong or Pakistan.",
    },
    {
      question: "Do I need to register with the FRRO?",
      answer:
        "No. The Bureau of Immigration states that citizens of Nepal and Bhutan are exempt from the requirement of visa and registration. The FRRO/FRO registration within 14 days applies to foreign nationals on student visas valid for more than 180 days. Your university may still record your details, so keep your ID and admission papers ready.",
    },
    {
      question: "Are Indian degrees valid in Nepal?",
      answer:
        "Degrees from UGC-recognized universities are accepted in Nepal. Check recognition before you apply, and get your degree's equivalence in Nepal when you return.",
    },
    {
      question: "What entrance exams do I need?",
      answer:
        "NEET-UG for MBBS/BDS, DASA for NITs, and the Embassy's own test for COMPEX seats. Many private universities admit on Class 12 marks.",
    },
    {
      question: "How much does it cost to study in India?",
      answer:
        "It depends on the college. NITs charge SAARC students US$2,000 a semester in tuition through DASA, plus institute fees. Private university fees vary widely.",
    },
    {
      question: "When should I apply?",
      answer:
        "Start 4–6 months before your course. Direct applications follow each institution's own deadlines. Embassy scheme dates change every year: ICCR schemes are usually advertised in February–March, the AYUSH scheme in May–June, and COMPEX 2026 opened on August 27. Watch the Embassy of India, Kathmandu website for the next notice.",
    },
  ],

  ctaTitle: "Plan your India move with us",
  ctaContent: "Free first consultation with our India team, in person or on a call.",
};

export default async function StudyInIndiaFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "india" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
