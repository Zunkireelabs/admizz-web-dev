import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in UAE from Nepal - Admizz Education",
  description:
    "Study in the UAE from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-uae-from-nepal",
  },
  openGraph: {
    title: "Study in UAE from Nepal - Admizz Education",
    description:
      "Study in the UAE from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-uae-from-nepal",
    siteName: "Admizz Education",
    images: [
      {
        url: "/images/og/countries/study-in-dubai.jpg",
        width: 1200,
        height: 630,
        alt: "Study in UAE from Nepal - Admizz Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in UAE from Nepal - Admizz Education",
    description:
      "Study in the UAE from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    images: ["/images/og/countries/study-in-dubai.jpg"],
  },
};

const pageData: NepalVariantData = {
  countryName: "UAE",
  countryCategorySlug: "uae",
  heroHeading: "Study in the UAE from Nepal",
  heroSubheading: "Universities in Abu Dhabi, Dubai and Sharjah, with your university sponsoring the student visa. We guide you from Kathmandu.",
  heroImage: "/images/hero/dubai-hero.webp",
  quickFacts: [
    { label: "Intakes", value: "Sep · Jan" },
    { label: "Tuition from", value: "AED 55,000 / yr" },
    { label: "Bachelor's", value: "3–4 years" },
    { label: "Golden visa", value: "10 yrs, top grads" },
    { label: "English", value: "IELTS 6.0+" },
  ],
  introTitle: "Study in the UAE from Nepal",
  introContent:
    "The UAE has public universities, private universities and foreign branch campuses across Abu Dhabi, Dubai, Sharjah and the other emirates. Most courses are taught in English. Kathmandu has direct flights to Dubai, Abu Dhabi and Sharjah.",
  whyStudyTitle: "Many kinds of university, one visa system",
  whyStudyIntro: "Why students from Nepal pick the UAE.",
  highlightStats: [
    {
      value: "10",
      unit: "years",
      label: "Golden visa",
      note: "for top graduates of UAE universities: bachelor's GPA of 3.5+ (3.8+ at some universities), applied for within two years of graduating.",
    },
    { value: "37", unit: "branch campuses", label: "in Dubai alone" },
    { value: "3–4", unit: "years", label: "for a bachelor's" },
  ],
  benefits: [
    {
      title: "Choice across emirates",
      description: "Study in the UAE from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "Checked by the government",
      description: "Study in the UAE from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "Visa through your university",
      description: "Study in the UAE from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
    {
      title: "A route to stay on",
      description: "Study in the UAE from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    },
  ],
  visaTitle: "Your student visa, step by step",
  visaIntro: "In the UAE the university is your visa sponsor. Its visa team files the application with the immigration authority of its emirate.",
  visaRequirements: [
    { category: "Choose a university", details: "Pick an accredited university and course. We shortlist with you." },
    { category: "Offer & fee NOC", details: "Get your offer, then a no objection letter from Nepal's Ministry of Education to send fees abroad." },
    { category: "Pay deposit & visa fee", details: "Part of the first year's tuition, the visa fee and any visa deposit." },
    { category: "University files your visa", details: "It applies for your entry permit (ICP, or GDRFA in Dubai). We brief you in Kathmandu before you fly." },
    { category: "Fly to the UAE", details: "Enter on the entry permit, then report to your university's visa office." },
    { category: "Medical test & Emirates ID", details: "Medical fitness test (age 18 and above), health insurance and Emirates ID biometrics. Validity varies by visa type and sponsor; a sponsored residence visa can be for 1, 2 or 3 years." },
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
    { intake: "September intake", months: "Apply March – July", details: "Main intake at every university." },
    { intake: "January intake", months: "Apply August – November", details: "Offered by most universities." },
    { intake: "April / May intake", months: "Check with each university", details: "Selected courses at some campuses." },
  ],
  costTitle: "What a year in the UAE costs",
  costIntro: "Typical tuition across the UAE, plus housing and visa costs at named universities as examples.",
  costTables: [
    {
      title: "Tuition per year",
      rows: [
        { category: "Foundation year", cost: "AED 49k – 60k" },
        { category: "Undergraduate", cost: "AED 55k – 111k" },
        { category: "Postgraduate / MBA", cost: "AED 60k – 90k+" },
      ],
    },
    {
      title: "Living & visa costs",
      rows: [
        { category: "University housing", cost: "AED 5,000 – 8,500 / semester" },
        { category: "Student visa (from Nepal)", cost: "AED 5,555" },
        { category: "Visa deposit (refundable)", cost: "AED 2,500" },
        { category: "Visa renewal", cost: "AED 4,570 / yr" },
      ],
    },
  ],
  costNote:
    "Tuition: university fee lists, from UAEU (AED 1,900–2,500 per credit hour) to AUS (AED 110,876). Housing: UAEU and American University in Dubai. Visa: Middlesex University Dubai, fee includes Emirates ID and medical insurance; other universities differ. Checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "Most funding in the UAE comes from universities. We check what you qualify for.",
  scholarships: [
    { name: "Graduate Scholarship", provider: "Khalifa University, Abu Dhabi", details: "For international master's and PhD students. Top tiers cover full tuition." },
    { name: "Undergraduate Merit Scholarship", provider: "Heriot-Watt University Dubai", details: "30%, 40% or 50% off first-year tuition, based on your grades." },
    { name: "International Study Grant", provider: "Middlesex University Dubai", details: "Tuition grant for international applicants, set by admissions." },
    { name: "University awards", provider: "Other UAE universities", details: "Merit discounts that change each intake. We check current terms." },
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
      question: "Who sponsors my student visa in the UAE?",
      answer:
        "Your accredited university, or a resident parent if you have one in the UAE. The university applies for your entry permit, and you finish the residence visa in the UAE with a medical test, health insurance and an Emirates ID.",
    },
    {
      question: "Is studying in the UAE different from studying in Dubai?",
      answer:
        "Dubai is one of seven emirates. The visa type is the same, a student residence visa sponsored by your university, but processing is handled by the local immigration authority (GDRFA in Dubai), so steps and fees can differ. Dubai free-zone campuses are approved by KHDA; universities elsewhere are accredited federally by the CAA.",
    },
    {
      question: "Can I work part-time while studying in the UAE?",
      answer:
        "MOHRE issues a student training and employment permit. You need a valid residence visa, training needs a no-objection certificate from your institution, and the permit runs for three months. We could not verify a weekly hour limit, so confirm with your university and MOHRE.",
    },
    {
      question: "Do I need IELTS to study in the UAE?",
      answer:
        "Most universities ask for proof of English, and the score is set by each one. Zayed University, for example, lists EmSAT English 1250, IELTS 5.5 or TOEFL iBT 71 for international undergraduates. Check your university's current requirement.",
    },
    {
      question: "How much does it cost to study in the UAE?",
      answer:
        "Undergraduate tuition runs from about AED 55,000 a year at public universities to about AED 111,000 at AUS. Add housing, food and visa costs.",
    },
    {
      question: "Can I stay in the UAE after graduating?",
      answer:
        "Top graduates can apply for a 10-year golden visa: a bachelor's GPA of 3.5 or higher (3.8 at some universities), within two years of graduating. You also get a 60-day grace period after your student residence ends (as listed by GDRFA Dubai). Others need a job and a work visa.",
    },
  ],

  ctaTitle: "Plan your UAE move with us",
  ctaContent: "Free first consultation with our UAE team, in person or on a call.",
};

export default async function StudyInUAEFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "uae" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
