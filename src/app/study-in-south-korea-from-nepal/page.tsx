import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in South Korea from Nepal - Admizz Education",
  description:
    "Study in South Korea from Nepal: March and September intakes, tuition, the D-2 student visa at the Korean Embassy in Kathmandu, part-time work and GKS scholarships.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-south-korea-from-nepal",
  },
  openGraph: {
    title: "Study in South Korea from Nepal - Admizz Education",
    description:
      "Study in South Korea from Nepal: March and September intakes, tuition, the D-2 student visa at the Korean Embassy in Kathmandu, part-time work and GKS scholarships.",
    url: "https://admizzeducation.com/study-in-south-korea-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/korean.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "South Korea",
  countryCategorySlug: "south-korea",
  heroHeading: "Study in South Korea from Nepal",
  heroSubheading: "Course choice, applications and your D-2 student visa, handled with a counsellor at our Kathmandu office.",
  heroImage: "/images/hero/south-korea-hero.webp",
  quickFacts: [
    { label: "Intakes", value: "Mar · Sep" },
    { label: "Tuition from", value: "₩4.3M / yr" },
    { label: "Bachelor's", value: "4 years" },
    { label: "Job-seeker visa", value: "D-10" },
    { label: "Language", value: "IELTS / TOPIK" },
  ],
  introTitle: "Study in South Korea from Nepal",
  introContent:
    "Korean universities teach in Korean and, on many programmes, in English. Public university fees are low, and you can start with a Korean language course on a D-4 visa.",
  whyStudyTitle: "Low public fees and a path to work",
  whyStudyIntro: "Why students from Nepal choose South Korea.",
  highlightStats: [
    {
      value: "₩4.3M",
      unit: "a year",
      label: "Average public tuition",
      note: "for bachelor's degrees at national and public universities. Private universities average about ₩7.6M a year.",
    },
    { value: "2", unit: "intakes", label: "March and September" },
    { value: "30", unit: "hours a week", label: "max work in term (bachelor's)" },
  ],
  benefits: [
    {
      title: "Low public tuition",
      description: "National and public universities average about ₩4.3 million a year for a bachelor's.",
    },
    {
      title: "Work part-time",
      description: "With a work permit, hours depend on your Korean level and year of study. No limit on weekends and holidays.",
    },
    {
      title: "Government scholarship",
      description: "The Global Korea Scholarship covers tuition, airfare, a monthly allowance and Korean language study.",
    },
    {
      title: "Stay on to find work",
      description: "Graduates can switch to the D-10 job-seeker visa, then to a work visa with a job offer.",
    },
  ],
  visaTitle: "Your D-2 student visa, step by step",
  visaIntro: "You apply at the Korean Embassy in Kathmandu. Allow 21 working days or more.",
  visaRequirements: [
    { category: "Choose a course", details: "Pick a university and programme, English- or Korean-taught. We shortlist with you." },
    { category: "Certificate of Admission", details: "Your university issues it once you are accepted and pay fees." },
    { category: "Verify documents", details: "Academic papers verified by the Korean Embassy in Kathmandu. Allow 10 days." },
    { category: "TB test in Kathmandu", details: "At one of the 4 hospitals designated by the Embassy." },
    { category: "Apply at the Embassy", details: "Book an appointment and submit your file. Fee: NPR 9,300." },
    { category: "Decision & arrival", details: "Visa in your passport. Then we brief you before you fly." },
  ],
  visaDocuments: [
    "Valid passport",
    "Standard Admission Certificate",
    "Verified transcripts & certificates",
    "IELTS or TOEFL result",
    "TB report (Embassy hospital)",
    "Balance certificate & 6 months' statements",
    "SOP and family relationship certificate",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "March is the start of the Korean academic year. Apply early.",
  intakes: [
    { intake: "March intake", months: "Apply September – November", details: "Main intake (Spring). Most programmes." },
    { intake: "September intake", months: "Apply March – May", details: "Fall intake. Fewer programmes." },
    { intake: "Language courses", months: "Several start dates a year", details: "Korean language study on a D-4 visa." },
  ],
  testTitle: "Language requirements",
  testIntro: "What you need depends on the language your programme is taught in.",
  testRequirements: [
    { test: "English-taught", score: "IELTS or TOEFL", notes: "Minimum score set by each university." },
    { test: "Korean-taught", score: "TOPIK level 3–4+", notes: "Or finish a Korean language course first." },
  ],
  costTitle: "What a year in South Korea costs",
  costIntro: "Average bachelor's tuition by university type and subject, plus visa fees.",
  costTables: [
    {
      title: "Tuition per year (average)",
      rows: [
        { category: "National / public", cost: "₩4.3M" },
        { category: "Private", cost: "₩7.6M" },
        { category: "Medicine", cost: "₩9.8M" },
      ],
    },
    {
      title: "Visa & other costs",
      rows: [
        { category: "D-2 visa fee", cost: "NPR 9,300" },
        { category: "Document verification", cost: "NPR 620 / set" },
        { category: "Living costs", cost: "Varies by city" },
      ],
    },
  ],
  costNote:
    "Tuition: averages from Study in Korea (Academy Info). Visa and verification fees: Korean Embassy in Nepal. Checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "We check which of these you qualify for in your first consultation.",
  scholarships: [
    { name: "Global Korea Scholarship (GKS)", provider: "Korean Government", details: "Fully funded degree, via the Embassy in Kathmandu or a university." },
    { name: "University scholarships", provider: "Universities", details: "Tuition discounts for international students, often based on grades or TOPIK." },
    { name: "TOPIK-based awards", provider: "Universities", details: "Many universities cut fees for students with higher TOPIK levels." },
  ],
  universities: [],
  faqItems: [
    {
      question: "Can I apply after completing +2 in Nepal?",
      answer:
        "Yes. You can apply for a bachelor's after Grade 12 (NEB or equivalent). Entry grades and language scores depend on the university.",
    },
    {
      question: "Do I need TOPIK to study in South Korea?",
      answer:
        "Not for English-taught programmes, which ask for IELTS or TOEFL. Korean-taught programmes usually need TOPIK level 3 or higher.",
    },
    {
      question: "Can I work part-time while studying?",
      answer:
        "Yes, with a part-time work permit from Korean immigration. Weekly hours depend on your TOPIK level and year of study, up to 30 (bachelor's) or 35 (graduate) in term.",
    },
    {
      question: "How much money do I need to show for the visa?",
      answer:
        "The Embassy asks for a balance certificate and 6 months of bank statements from an A-class bank. Your university sets the amount; we check it with you.",
    },
    {
      question: "What is the difference between D-2 and D-4 visas?",
      answer:
        "D-2 is for degree study (bachelor's, master's, PhD). D-4 is for Korean language courses, often taken before a degree.",
    },
    {
      question: "Can I stay in Korea after graduating?",
      answer:
        "Yes. Graduates can apply for the D-10 job-seeker visa and move to a work visa such as E-7 once they get a job offer.",
    },
    {
      question: "When should I start applying?",
      answer:
        "6 to 9 months before you want to start. The main intakes are March and September.",
    },
  ],
  ctaTitle: "Plan your South Korea move with us",
  ctaContent: "Free first consultation with our South Korea team, in person or on a call.",
};

export default async function StudyInSouthKoreaFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "south-korea" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
