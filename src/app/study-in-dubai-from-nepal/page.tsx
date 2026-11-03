import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Dubai from Nepal - Admizz Education",
  description:
    "Study in Dubai from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-dubai-from-nepal",
  },
  openGraph: {
    title: "Study in Dubai from Nepal - Admizz Education",
    description:
      "Study in Dubai from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-dubai-from-nepal",
    siteName: "Admizz Education",
    images: [
      {
        url: "/images/og/countries/study-in-dubai.jpg",
        width: 1200,
        height: 630,
        alt: "Study in Dubai from Nepal - Admizz Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Dubai from Nepal - Admizz Education",
    description:
      "Study in Dubai from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    images: ["/images/og/countries/study-in-dubai.jpg"],
  },
};

const pageData: NepalVariantData = {
  countryName: "Dubai",
  countryCategorySlug: "dubai",
  heroHeading: "Study in Dubai from Nepal",
  heroSubheading: "UK, Australian and US degrees at Dubai campuses, with your university sponsoring the student visa. We guide you from Kathmandu.",
  heroImage: "/images/hero/dubai-hero.webp",
  quickFacts: [
    { label: "Intakes", value: "Sep · Jan · Apr" },
    { label: "Tuition from", value: "AED 60,000 / yr" },
    { label: "Bachelor's", value: "3–4 years" },
    { label: "Golden visa", value: "10 yrs, top grads" },
    { label: "English", value: "IELTS 6.0+" },
  ],
  introTitle: "Study in Dubai from Nepal",
  introContent:
    "Most of Dubai's universities are branch campuses of foreign universities, based in Dubai Knowledge Park and Dubai International Academic City. They teach in English and award their home university's degree. Kathmandu to Dubai is a direct flight of about four and a half hours.",
  whyStudyTitle: "A foreign degree, closer to home",
  whyStudyIntro: "Why students from Nepal pick Dubai.",
  highlightStats: [
    {
      value: "37",
      unit: "branch campuses",
      label: "International universities in Dubai",
      note: "out of 41 international higher education providers, per KHDA figures for 2024–25.",
    },
    { value: "10", unit: "years", label: "golden visa for top graduates" },
    { value: "3", unit: "years", label: "for most UK-style bachelor's" },
  ],
  benefits: [
    {
      title: "Home-campus degrees",
      description: "Study in Dubai from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "Checked by KHDA",
      description: "Study in Dubai from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "Visa through your university",
      description: "Study in Dubai from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "A route to stay on",
      description: "Study in Dubai from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
  ],
  visaTitle: "Your student visa, step by step",
  visaIntro: "In Dubai the university is your visa sponsor. Its visa team files the application with GDRFA Dubai.",
  visaRequirements: [
    { category: "Choose a university", details: "Pick a KHDA-approved university and course. We shortlist with you." },
    { category: "Offer & fee NOC", details: "Get your offer, then a no objection letter from Nepal's Ministry of Education to send fees abroad." },
    { category: "Pay deposit & visa fee", details: "Part of the first year's tuition, the visa fee and a refundable visa deposit." },
    { category: "University files your visa", details: "It applies to GDRFA Dubai for your entry permit. We brief you in Kathmandu before you fly." },
    { category: "Fly to Dubai", details: "Enter on the entry permit, then report to your university's visa office." },
    { category: "Medical test & Emirates ID", details: "Medical fitness test (age 18 and above), health insurance and Emirates ID biometrics in Dubai. Validity varies by visa type and sponsor; a sponsored residence visa can be for 1, 2 or 3 years." },
  ],
  visaDocuments: [
    "Passport valid at least 1 year",
    "Unconditional offer letter",
    "Photo on a white background",
    "Tuition deposit and visa fee receipts",
    "Academic transcripts",
    "IELTS or PTE result",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "September has the most courses. Leave a few weeks for the visa before you start.",
  intakes: [
    { intake: "September intake", months: "Apply March – July", details: "Main intake. Most courses and scholarships." },
    { intake: "January intake", months: "Apply August – November", details: "Offered by most Dubai universities." },
    { intake: "April intake", months: "Check with each university", details: "Selected courses only." },
  ],
  costTitle: "What a year in Dubai costs",
  costIntro: "Typical tuition at Dubai campuses, plus housing and visa costs at two universities as examples.",
  costTables: [
    {
      title: "Tuition per year",
      rows: [
        { category: "Foundation year", cost: "AED 49k – 60k" },
        { category: "Undergraduate", cost: "AED 60k – 90k" },
        { category: "Postgraduate / MBA", cost: "AED 60k – 90k" },
      ],
    },
    {
      title: "Living & visa costs",
      rows: [
        { category: "Shared student room", cost: "AED 8,500 / semester" },
        { category: "Student visa (from Nepal)", cost: "AED 5,555" },
        { category: "Visa deposit (refundable)", cost: "AED 2,500" },
        { category: "Visa renewal", cost: "AED 4,570 / yr" },
      ],
    },
  ],
  costNote:
    "Tuition: 2026–27 fee lists of Dubai campuses (e.g. Middlesex, Wollongong, Amity). Housing: American University in Dubai. Visa: Middlesex University Dubai, fee includes Emirates ID and medical insurance. Sources: aud.edu, mdx.ac.ae, checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "Most funding in Dubai is a tuition discount from your university. We check what you qualify for.",
  scholarships: [
    { name: "Undergraduate Merit Scholarship", provider: "Heriot-Watt University Dubai", details: "30%, 40% or 50% off first-year tuition, based on your grades." },
    { name: "Postgraduate Merit Scholarship", provider: "Heriot-Watt University Dubai", details: "10% or 15% off tuition, based on your bachelor's results." },
    { name: "International Study Grant", provider: "Middlesex University Dubai", details: "Tuition grant for international applicants, set by admissions." },
    { name: "University awards", provider: "Other Dubai campuses", details: "Merit discounts that change each intake. We check current terms." },
  ],
  universities: [
    { name: "American University in Dubai", logo: "/images/universities/uae/american-university-in-dubai.webp" },
    { name: "American University of Sharjah", logo: "/images/universities/uae/american-university-of-sharjah.webp" },
    { name: "University of Sharjah", logo: "/images/universities/uae/university-of-sharjah.webp" },
    { name: "Khalifa University", logo: "/images/universities/uae/khalifa-university.webp" },
    { name: "United Arab Emirates University", logo: "/images/universities/uae/uaeu.webp" },
    { name: "Heriot-Watt University Dubai", logo: "/images/universities/uae/heriot-watt-university-dubai.webp" },
    { name: "Middlesex University Dubai", logo: "/images/universities/uae/middlesex-university-dubai.webp" },
    { name: "Canadian University Dubai", logo: "/images/universities/uae/canadian-university-dubai.webp" },
    { name: "Zayed University", logo: "/images/universities/uae/zayed-university.webp" },
    { name: "University of Wollongong Dubai", logo: "/images/universities/uae/university-of-wollongong-dubai.webp" },
  ],

  faqItems: [
    {
      question: "Who sponsors my student visa in Dubai?",
      answer:
        "Your university. It applies to GDRFA Dubai for your entry permit, and you finish the residence visa in Dubai with a medical test and Emirates ID.",
    },
    {
      question: "How long does the Dubai student visa take?",
      answer:
        "GDRFA Dubai lists 48 hours for the residence permit service itself, but the entry permit, medical test and Emirates ID steps add time. Apply early and allow a few weeks before your start date.",
    },
    {
      question: "Can I work part-time while studying in Dubai?",
      answer:
        "MOHRE issues a student training and employment permit. You need a valid residence visa, training needs a no-objection certificate from your institution, and the permit runs for three months. We could not verify a weekly hour limit, so confirm with your university and MOHRE.",
    },
    {
      question: "Do I need IELTS to study in Dubai?",
      answer:
        "Most universities ask for an accepted English test, and the score is set by each one. Zayed University, for example, lists EmSAT English 1250, IELTS 5.5 or TOEFL iBT 71 for international undergraduates. Check your university's current requirement.",
    },
    {
      question: "Are Dubai degrees recognized?",
      answer:
        "Branch campuses award their home university's degree. Check that your university and course are approved by KHDA before you apply.",
    },
    {
      question: "Can I stay in the UAE after graduating?",
      answer:
        "Top graduates can apply for a 10-year golden visa: a bachelor's GPA of 3.5 or higher (3.8 at some universities), within two years of graduating. You also get a 60-day grace period after your student residence ends. Others need a job and a work visa.",
    },
  ],

  ctaTitle: "Plan your Dubai move with us",
  ctaContent: "Free first consultation with our Dubai team, in person or on a call.",
};

export default async function StudyInDubaiFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "dubai" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
