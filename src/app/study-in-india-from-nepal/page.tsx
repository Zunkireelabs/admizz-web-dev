import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in India from Nepal - Admizz Education",
  description:
    "Study in India from Nepal: no visa needed, admission steps, fees, Embassy of India scholarships and intakes for the 2027 academic year.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-india-from-nepal",
  },
  openGraph: {
    title: "Study in India from Nepal - Admizz Education",
    description:
      "Study in India from Nepal: no visa needed, admission steps, fees, Embassy of India scholarships and intakes for the 2027 academic year.",
    url: "https://admizzeducation.com/study-in-india-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/nepali-2.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "India",
  countryCategorySlug: "india",
  heroHeading: "Study in India from Nepal",
  heroSubheading: "No visa needed. Course choice, admission and documents, handled with a counsellor at our Kathmandu office.",
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
      note: "Nepali citizens entering by land or air from Nepal need no passport or visa (MHA Exemption Order, September 2025). Carry your citizenship certificate or passport.",
    },
    { value: "US$2,000", unit: "a semester", label: "NIT tuition, SAARC rate (DASA)" },
    { value: "6.4", unit: "lakh NPR a year", label: "Embassy law scholarship cap" },
  ],
  benefits: [
    {
      title: "No visa or permit",
      description: "Enter with your citizenship certificate or passport. There is no visa fee or visa wait.",
    },
    {
      title: "Lower fees",
      description: "Government institutes charge SAARC students reduced rates, e.g. US$2,000 a semester at NITs via DASA.",
    },
    {
      title: "Government scholarships",
      description: "The Embassy of India in Kathmandu runs several schemes for Nepali students each year.",
    },
    {
      title: "Close to home",
      description: "Similar food, culture and climate, and you can travel home by road for holidays.",
    },
  ],
  visaTitle: "Your admission, step by step",
  visaIntro: "No visa is needed, so the work is in admission and documents. Start 4–6 months before your course.",
  visaRequirements: [
    { category: "Choose a course", details: "Pick a UGC-recognised university or AICTE-approved college. We shortlist with you." },
    { category: "Entrance test if needed", details: "NEET-UG for MBBS/BDS, DASA for NITs, or the university's own test." },
    { category: "Apply & get your admission letter", details: "Apply to the university, or through an Embassy scheme in Kathmandu." },
    { category: "Equivalence certificate", details: "UGC or AIU certificate that your +2 equals Class 12 in India." },
    { category: "Pay fees & book housing", details: "Pay the first-semester fee and confirm a hostel place." },
    { category: "Travel & enrol", details: "Cross by road or fly from Kathmandu, then complete enrolment on campus." },
  ],
  visaDocuments: [
    "Citizenship certificate (with English translation)",
    "Passport, if flying in from a third country",
    "Class 10 and 12 mark sheets",
    "UGC or AIU equivalence certificate",
    "Admission letter from the university",
    "Character certificate from your last school",
    "Entrance test score (NEET, DASA etc.)",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "Most Indian universities start once a year, in July or August.",
  intakes: [
    { intake: "July intake", months: "Apply March – June", details: "Main intake for most universities and Embassy schemes." },
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
    { name: "ICCR Scholarships", provider: "Government of India (ICCR)", details: "Bachelor's, master's and PhD study in India. Apply via the ICCR portal." },
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
        "No. Nepali citizens entering India by land or air from Nepal need no passport or visa. Carry your citizenship certificate or passport as ID. If you fly in from another country, you need a valid passport.",
    },
    {
      question: "Do I need to register with the FRRO?",
      answer:
        "Nepali citizens have not been required to register with the FRRO. Your university will still record your details as a foreign student, so keep your ID and admission papers ready.",
    },
    {
      question: "Are Indian degrees valid in Nepal?",
      answer:
        "Degrees from UGC-recognised universities are accepted in Nepal. Check recognition before you apply, and get your degree's equivalence in Nepal when you return.",
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
        "Start 4–6 months before your course. Most courses start in July or August, and Embassy scheme deadlines usually fall between April and September.",
    },
  ],

  ctaTitle: "Plan your India move with us",
  ctaContent: "Free first consultation with our India team, in person or on a call.",
};

export default async function StudyInIndiaFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "india" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
