import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in USA from Nepal - Admizz Education",
  description:
    "Study in the USA from Nepal with Admizz Education – universities, F-1 visa steps, costs, intakes and OPT work rights for Nepali students.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-usa-from-nepal",
  },
  openGraph: {
    title: "Study in USA from Nepal - Admizz Education",
    description:
      "Study in the USA from Nepal with Admizz Education – universities, F-1 visa steps, costs, intakes and OPT work rights for Nepali students.",
    url: "https://admizzeducation.com/study-in-usa-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "USA",
  countryCategorySlug: "usa",
  heroHeading: "Study in the USA from Nepal",
  heroSubheading: "University choice, your I-20 and F-1 visa interview prep, handled with a counsellor at our Kathmandu office.",
  heroImage: "/images/hero/usa-hero.webp",
  quickFacts: [
    { label: "Intakes", value: "Aug/Sep · Jan" },
    { label: "Avg. public tuition", value: "$31,880 / yr" },
    { label: "Bachelor's", value: "4 years" },
    { label: "OPT", value: "12 mo (+24 STEM)" },
    { label: "English", value: "IELTS / TOEFL" },
  ],
  introTitle: "Study in the USA from Nepal",
  introContent:
    "The USA has a wide choice of accredited universities and flexible degrees. After graduating, you can work on OPT for 12 months, or up to 36 months with a STEM degree.",
  whyStudyTitle: "Flexible degrees and real work experience after",
  whyStudyIntro: "Why students from Nepal choose the USA.",
  highlightStats: [
    {
      value: "36",
      unit: "months",
      label: "OPT for STEM graduates",
      note: "12 months of OPT plus a 24-month STEM extension. Graduates in other fields get 12 months.",
    },
    { value: "20", unit: "hours a week", label: "on-campus work in term" },
    { value: "4", unit: "years", label: "for most bachelor's" },
  ],
  benefits: [
    {
      title: "Work after you graduate",
      description: "OPT lets you work in your field for 12 months, plus 24 more with an eligible STEM degree.",
    },
    {
      title: "Flexible degrees",
      description: "Many bachelor's programmes let you take a range of classes before you choose your major.",
    },
    {
      title: "Funding for strong students",
      description: "Many universities give merit scholarships, and graduate students can apply for assistantships.",
    },
    {
      title: "Work on campus",
      description: "Up to 20 hours a week during term, with your school's approval, and full-time in breaks.",
    },
  ],
  visaTitle: "Your F-1 visa, step by step",
  visaIntro: "The F-1 interview for Nepali students happens at the US Embassy in Kathmandu.",
  visaRequirements: [
    { category: "Get admitted & your I-20", details: "From a SEVP-certified school. We shortlist and apply with you." },
    { category: "Pay the SEVIS fee", details: "$350 (Form I-901), paid online before your interview." },
    { category: "DS-160 & visa fee", details: "Fill the online form and pay the $185 visa application fee." },
    { category: "Book your interview", details: "At the US Embassy in Kathmandu. Set your social media profiles to public." },
    { category: "Interview in Kathmandu", details: "Bring your passport, I-20 and funding documents. We run mock interviews first." },
    { category: "Decision & visa", details: "If approved, the visa goes in your passport. Then we brief you before you fly." },
  ],
  visaDocuments: [
    "Valid passport",
    "Form I-20 from your school",
    "DS-160 confirmation page",
    "SEVIS fee receipt",
    "Bank statements or sponsor documents",
    "Academic transcripts",
    "IELTS, TOEFL or Duolingo result",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "Fall has the most courses and funding. Deadlines differ by university, so apply early.",
  intakes: [
    { intake: "Fall intake (August/September)", months: "Apply November – February", details: "Main intake. Most courses and scholarships." },
    { intake: "Spring intake (January)", months: "Apply July – October", details: "Good option if you miss Fall." },
    { intake: "Summer intake (May/June)", months: "Check with each university", details: "Selected courses only." },
  ],
  costTitle: "What a year in the USA costs",
  costIntro: "Average published tuition, plus the fees you pay for your visa.",
  costTables: [
    {
      title: "Tuition per year",
      rows: [
        { category: "Public university (avg)", cost: "$31,880" },
        { category: "Private university (avg)", cost: "$45,000" },
        { category: "Master's", cost: "Varies by school" },
      ],
    },
    {
      title: "Living & visa costs",
      rows: [
        { category: "Living costs", cost: "Shown on your I-20" },
        { category: "Visa application fee", cost: "$185" },
        { category: "SEVIS fee", cost: "$350" },
      ],
    },
  ],
  costNote:
    "Tuition: College Board 2025-26 averages for four-year colleges (public = out-of-state rate). Fees: US Department of State and DHS. Checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "We check which of these you qualify for in your first consultation.",
  scholarships: [
    { name: "Fulbright Foreign Student Program", provider: "USEF-Nepal", details: "Fully funded master's in the US. Competition opens once a year." },
    { name: "Merit scholarships", provider: "Universities", details: "Partial to full tuition, based on grades and test scores." },
    { name: "Graduate assistantships", provider: "Universities", details: "Teaching or research roles that can cover tuition and pay a stipend." },
    { name: "Departmental awards", provider: "Universities", details: "Smaller awards from your department, often after the first year." },
  ],
  students: [
    { name: "Ashok Upreti", image: "/events/assets/alumni/Ashok_Upreti_2025_USA.jpg", caption: "USA · 2025 intake" },
  ],
  universities: [
    { name: "Colorado State University", logo: "/images/universities/usa/COLORADO.webp" },
    { name: "Webster University", logo: "/images/universities/usa/webster-1.webp" },
    { name: "Avila University", logo: "/images/universities/usa/AVILA.webp" },
    { name: "Concordia University", logo: "/images/universities/usa/CONCORDIA.webp" },
    { name: "Southeast Missouri State", logo: "/images/universities/usa/SOUTHEAST-MISSOURI.webp" },
    { name: "Herzing University", logo: "/images/universities/usa/HERZING.webp" },
    { name: "Wright State University", logo: "/images/universities/usa/WRIGHT-STATE.webp" },
    { name: "Washington University", logo: "/images/universities/usa/WASHINGTON.webp" },
    { name: "Texas State University", logo: "/images/universities/usa/TEXAS.webp" },
    { name: "Murray State University", logo: "/images/universities/usa/MURRAY.webp" },
    { name: "Youngstown State University", logo: "/images/universities/usa/YOUNGSTOWN.webp" },
    { name: "University of Central Arkansas", logo: "/images/universities/usa/CENTRAL-ARKANSAS.webp" },
    { name: "Dakota State University", logo: "/images/universities/usa/DAKOTA-STATE.webp" },
    { name: "University of South Dakota", logo: "/images/universities/usa/UNIVERSITY-F-SOUTH-DAKOTA.webp" },
    { name: "Pacific Oaks College", logo: "/images/universities/usa/PACIFIC.webp" },
    { name: "Bethesda University", logo: "/images/universities/usa/BETHESDA.webp" },
    { name: "St. Cloud State University", logo: "/images/universities/usa/ST-CLOUD.webp" },
    { name: "South Dakota State University", logo: "/images/universities/usa/South.webp" },
    { name: "Post University", logo: "/images/universities/usa/POST.webp" },
    { name: "Northwest Missouri State", logo: "/images/universities/usa/NORTHWEST.webp" },
    { name: "Minnesota State University", logo: "/images/universities/usa/MINNESOTA-STATE.webp" },
  ],

  faqItems: [
    {
      question: "Can I apply to US universities after +2 in Nepal?",
      answer:
        "Yes. US universities accept +2 for bachelor's programmes. You also need an English test score, and some universities ask for the SAT.",
    },
    {
      question: "Is IELTS or TOEFL mandatory for the USA?",
      answer:
        "Most universities ask for IELTS, TOEFL or Duolingo. Some waive it if you studied in English; check each university.",
    },
    {
      question: "Can I work while studying in the USA?",
      answer:
        "Yes, on campus: up to 20 hours a week during term and full-time in breaks. Off-campus work is only allowed through CPT, OPT or special approval.",
    },
    {
      question: "What are OPT and CPT?",
      answer:
        "CPT is work or an internship that is part of your course, usually after your first year. OPT is up to 12 months of work in your field, plus a 24-month extension for eligible STEM degrees.",
    },
    {
      question: "Are the OPT rules changing?",
      answer:
        "In October 2026 DHS proposed new fees that schools would pay to recommend students for OPT. It is a proposal only and not in effect. We will tell you if it changes.",
    },
    {
      question: "How long does the F-1 visa process take?",
      answer:
        "It depends on interview wait times at the US Embassy in Kathmandu. A student visa can be issued up to 365 days before your course starts, so apply as soon as you have your I-20.",
    },
    {
      question: "Can I stay in the USA after graduation?",
      answer:
        "Yes, on OPT for 12 months (36 with a STEM degree). To stay longer you need an employer-sponsored work visa such as the H-1B.",
    },
  ],

  ctaTitle: "Plan your USA move with us",
  ctaContent: "Free first consultation with our USA team, in person or on a call.",
};

export default async function StudyInUSAFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "usa" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
