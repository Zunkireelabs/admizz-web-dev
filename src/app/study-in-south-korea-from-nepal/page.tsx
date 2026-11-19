import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { getPostsByCategory } from "@/lib/blog-content";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in South Korea from Nepal - Admizz Education",
  description:
    "Study in Korea from Nepal: costs, visa, intakes, GKS scholarship and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-south-korea-from-nepal",
  },
  openGraph: {
    title: "Study in South Korea from Nepal - Admizz Education",
    description:
      "Study in Korea from Nepal: costs, visa, intakes, GKS scholarship and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-south-korea-from-nepal",
    siteName: "Admizz Education",
    images: [
      {
        url: "/images/og/countries/study-in-south-korea.jpg",
        width: 1200,
        height: 630,
        alt: "Study in South Korea from Nepal - Admizz Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in South Korea from Nepal - Admizz Education",
    description:
      "Study in Korea from Nepal: costs, visa, intakes, GKS scholarship and partner universities for Nepali students. Admission support from Admizz.",
    images: ["/images/og/countries/study-in-south-korea.jpg"],
  },
};

const pageData: NepalVariantData = {
  countryName: "South Korea",
  countryCategorySlug: "south-korea",
  heroHeading: "Study in South Korea from Nepal",
  heroSubheading: "Course choice, applications and your D-2 student visa, handled with a counselor at our offices in Kathmandu, Birgunj and Janakpur.",
  heroImage: "/images/hero/south-korea-hero.webp",
  quickFacts: [
    { label: "Intakes", value: "Mar · Sep" },
    { label: "Tuition from", value: "₩4.3M / yr" },
    { label: "Bachelor's", value: "4 years" },
    { label: "Job-seeker visa", value: "D-10-1" },
    { label: "Language", value: "IELTS / TOPIK" },
  ],
  introTitle: "Study in South Korea from Nepal",
  introContent:
    "Korean universities teach in Korean and, on many programs, in English. Public university fees are low, and you can start with a Korean language course on a D-4 visa.",
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
    { value: "TOPIK 3", unit: "to start", label: "minimum Korean level for part-time work in bachelor's years 1\u20132 (Level 4 from year 3)" },
  ],
  benefits: [
    {
      title: "Low public tuition",
      description: "Study in Korea from Nepal: costs, visa, intakes, GKS scholarship and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "Work part-time",
      description: "Study in Korea from Nepal: costs, visa, intakes, GKS scholarship and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "Government scholarship",
      description: "Study in Korea from Nepal: costs, visa, intakes, GKS scholarship and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "Stay on to find work",
      description: "Study in Korea from Nepal: costs, visa, intakes, GKS scholarship and partner universities for Nepali students. Admission support from Admizz.",
    },
  ],
  visaTitle: "Your D-2 student visa, step by step",
  visaIntro: "You apply at the Korean Embassy in Kathmandu. Allow 21 working days or more.",
  visaRequirements: [
    { category: "Choose a course", details: "Pick a university and program, English- or Korean-taught. We shortlist with you." },
    { category: "Standard Admission Certificate", details: "Your university issues it once you are accepted and pay fees." },
    { category: "Verify documents", details: "Academic papers verified by the Korean Embassy in Kathmandu. Allow 10 days." },
    { category: "TB test in Kathmandu", details: "At one of the 4 hospitals designated by the Embassy." },
    { category: "Apply at the Embassy", details: "Book an appointment online and submit your file. Fee: NPR 9,300 (single entry, over 90 days, from July 1, 2026)." },
    { category: "Decision & arrival", details: "Visa in your passport. Then we brief you before you fly." },
  ],
  visaDocuments: [
    "Valid passport",
    "Standard Admission Certificate",
    "Verified transcripts & certificates",
    "IELTS or TOPIK report",
    "TB report (Embassy hospital)",
    "Balance certificate & 6 months' statements",
    "SOP and family relationship certificate",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "March is the start of the Korean academic year. Apply early.",
  intakes: [
    { intake: "March intake", months: "Apply September – November", details: "Main intake (Spring). Most programs." },
    { intake: "September intake", months: "Apply March – May", details: "Fall intake. Fewer programs." },
    { intake: "Language courses", months: "Several start dates a year", details: "Korean language study on a D-4 visa." },
  ],
  testTitle: "Language requirements",
  testIntro: "What you need depends on the language your program is taught in.",
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
        "It depends on your university and program. Korean-taught programs usually ask for TOPIK, and English-taught programs set their own English requirement. The Korean Embassy in Nepal asks visa applicants for an IELTS or TOPIK report.",
    },
    {
      question: "Can I work part-time while studying?",
      answer:
        "Yes, with a part-time work permit from Korean immigration. Bachelor's students need TOPIK Level 3 in years 1\u20132 and Level 4 in years 3\u20134, and master's and doctoral students need TOPIK Level 4. Weekly hours depend on your degree, year and Korean level, and Study in Korea publishes the table, so check it and your university's international office before you plan around a number.",
    },
    {
      question: "How much money do I need to show for the visa?",
      answer:
        "The Embassy asks for a balance certificate and 6 months of bank statements from an A-level bank. The Nepal embassy page does not publish a minimum balance, so we confirm the amount with the embassy and your university.",
    },
    {
      question: "What is the difference between D-2 and D-4 visas?",
      answer:
        "D-2 is for degree study (bachelor's, master's, PhD). D-4 is for Korean language courses, often taken before a degree.",
    },
    {
      question: "Can I stay in Korea after graduating?",
      answer:
        "Yes. You can apply to change to a D-10-1 job-seeking visa after your studies. It can be extended in 6-month steps up to 2 years, and manual or unskilled work is not allowed on it. Once you find a job, the visa must be changed to one that matches the work.",
    },
    {
      question: "When should I start applying?",
      answer:
        "6 to 9 months before you want to start. The main intakes are March and September.",
    },
    {
      question: "What documents do I need for a Korean D-2 student visa from Nepal?",
      answer:
        "The Korean Embassy in Nepal lists a passport, an invitation letter and letter of guarantee, a balance certificate and bank statements (accepted only from an A-level bank), verified educational documents, an official TOPIK or IELTS report and a TB medical report. For a D-2 visa of more than 90 days your university also provides documents such as the Standard Admission Certificate, and a scholarship certificate or a professor's financial affidavit if they apply. You also bring a photo and your original passport with a photocopy.",
    },
    {
      question: "How much is the Korean student visa fee in Nepal, and how long does it take?",
      answer:
        "The Embassy lists a fee of NPR 9,300 for a stay of more than 90 days (NPR 6,200 for up to 90 days), as of July 1, 2026. It says the visa issuance process can take 21 working days or more, and your passport must be valid for at least 6 months.",
    },
    {
      question: "Is the 2027 Global Korea Scholarship graduate round open for Nepal?",
      answer:
        "We found no 2027 graduate notice on the Korean Embassy in Nepal's notice board as of November 19, 2026. The 2026 round was posted on February 2, 2026 and accepted applications from February 12 to February 25, 2026, with 4 Embassy Track places for Nepal.",
    },
  ],
  ctaTitle: "Plan your South Korea move with us",
  ctaContent: "Free first consultation with our South Korea team, in person or on a call.",
};

export default async function StudyInSouthKoreaFromNepalPage() {
  const blogPosts: BlogPost[] = getPostsByCategory("south-korea");
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
