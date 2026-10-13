// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in India - Admizz Education",
  description:
    "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-india",
  },
  openGraph: {
    title: "Study in India - Admizz Education",
    description:
      "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!",
    url: "https://admizzeducation.com/study-in-india",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

const indiaData: CountryPageData = {
  countryName: "India",
  countryCategorySlug: "india",
  nepalGuide: {
    href: "/study-in-india-from-nepal",
    title: "Applying from Nepal? Read the Nepal-specific guide to studying in India",
    text: "Entry rules, entrance exams, fees and scholarships including COMPEX for Nepali students.",
  },
  heroHeading: "STUDY IN INDIA",
  heroSubheading: "Unlock Quality Education and Career-Ready Opportunities",
  heroDescription: "Study in India and unlock quality education, diverse programs, and career-ready opportunities. Admizz Education guides you through course selection, university admissions, documentation, and support — making your journey effortless, informed, and future-focused across India's leading academic destinations.",
  heroBackground: "/images/hero/india-hero.webp",
  quickFacts: [
    { label: "Capital", value: "New Delhi" },
    { label: "Dialing Code", value: "+91" },
    { label: "Currency", value: "Indian Rupee (₹)" },
    { label: "Visa for Nepali citizens", value: "Not required" },
    { label: "Official portal", value: "studyinindia.gov.in" },
  ],
  whyStudyTitle: "Why Study in India?",
  whyStudyIntro:
    "Study in India for a wide choice of universities and institutes, English-medium programs in many fields, a cultural mix, and scholarships for Nepali students. Nepali citizens need no visa to enter.",
  benefits: [
    { title: "Wide Choice of Institutions", icon: "/images/icons/school-1.webp", description: "Central universities, national institutes, and private universities offer courses across many fields." },
    { title: "Scholarships for Nepali Students", icon: "/images/icons/scholarship-108.webp", description: "The Embassy of India in Kathmandu says around 1,500 scholarships and seats are provided to Nepali nationals every year." },
    { title: "English Programs", icon: "/images/icons/knowledge.webp", description: "Many Indian institutions offer English-taught courses. Check the language of instruction for your course." },
    { title: "Cultural Diversity", icon: "/images/icons/visa-1.webp", description: "Experience India's vibrant culture, traditions, and student communities." },
    { title: "Open Border for Nepal", icon: "/images/icons/consultation.webp", description: "Citizens of Nepal are exempt from the Indian visa requirement, according to India's Bureau of Immigration." },
    { title: "Campus Facilities", icon: "/images/icons/school-1.webp", description: "Facilities differ by institution, so review the campus, labs and hostel details of each one you shortlist." },
  ],
  admissionTitle: "Admission Requirements for Studying in India",
  admissionIntro:
    "Each institution sets its own admission requirements. Common items are academic records, an entrance exam score where the course needs one (for example JEE for IITs, NITs and IIITs, or NEET-UG for MBBS/BDS), identity documents, and a Study in India ID. Nepali applicants may need a UGC equivalence certificate for their Class 12.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in India",
      intro: "Check the admission page of each institution, because documents and entrance exams differ by course.",
      documents: [
        "Academic Transcripts",
        "UGC Equivalence Certificate for Class 12 (if asked)",
        "Entrance Exam Score (where the course needs one)",
        "Study in India (SII) ID",
        "Citizenship Certificate or Passport",
        "Statement of Purpose and Recommendations (if the institution asks)",
        "Proof of Financial Capacity (if the scheme asks)",
        "Application Form & Fee",
      ],
    },
    {
      title: "Documents Required for Admission Confirmation",
      intro: "Confirmation formalities are set by each institution, and they usually include the following.",
      documents: [
        "Final Academic Transcripts",
        "Previous Qualifications",
        "Offer Letter Acceptance",
        "Tuition Fee Payment Receipt",
        "Identity Document",
        "Passport-Sized Photographs",
      ],
    },
    {
      title: "Documents for the Embassy's Self-Financing Scheme (Nepali Nationals)",
      intro: "The Embassy of India in Kathmandu asked for these with its 2026-27 application for MBBS/BDS and BE/B.Tech/B.Arch/B.Pharmacy seats.",
      documents: [
        "First Four Pages of Passport",
        "Citizenship Certificate with English Translation",
        "Birth Certificate with English Translation",
        "Character Certificate",
        "Marksheets with Percentage Conversion",
        "UGC or AIU Equivalence Certificate for 10+2",
        "NEET-UG Score Sheet (MBBS/BDS)",
        "Proof of Financial Capacity",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in India",
    intro: "Intake and application dates are set by each institution and by the scheme you apply through, so check the current calendar before you plan.",
    items: [
      { name: "Institution Intakes (dates set by each college or university)", details: [] },
      { name: "Embassy of India Scholarship Cycle (dates announced each year)", details: [] },
    ],
  },
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
  costTitle: "Cost of Studying in India",
  costIntro: "Tuition and living costs differ by institution, course and city, so check the fee page of each college you shortlist. These are the fixed figures the Embassy of India in Kathmandu publishes for Nepali students.",
  costTable: [
    { program: "Tuition and living costs", fee: "Set by each institution and city" },
    { program: "COMPEX 2026 application fee", fee: "NPR 400" },
    { program: "Law Scholarship Scheme (top-20 NIRF law colleges)", fee: "Up to NPR 6.4 lakh a year, reimbursed" },
    { program: "Self-Financing Scheme (MBBS, BDS, BE/B.Tech, B.Arch, B.Pharmacy)", fee: "No scholarship or financial aid" },
  ],
  costNote: "Note: Check current fees on each institution's website and current scheme terms on the Embassy of India, Kathmandu website.",
  visaTitle: "Entry and Student Visa Process for India",
  visaIntro: "Citizens of Nepal and Bhutan are exempt from the Indian visa and registration requirements. Other nationalities follow the Study in India student visa process below.",
  visaSteps: [
    { title: "Choose Course & Institution", description: "Select your preferred Indian institution and program based on eligibility and goals." },
    { title: "Register on Study in India", description: "Register on studyinindia.gov.in to get your unique Study in India (SII) ID. COMPEX 2026 applications required it." },
    { title: "Receive Admission Offer", description: "Get your admission offer letter from the institution." },
    { title: "Nepali Citizens: No Visa", description: "Coming from Nepal by land or air, carry a government-approved photo ID showing your nationality. You need a valid passport if you enter from elsewhere." },
    { title: "Other Nationalities: Apply for a Student Visa", description: "Apply on indianvisaonline.gov.in after you hold your SII ID and offer letter. The Study in India portal says applying there does not guarantee a visa." },
    { title: "Student Visa Validity", description: "Student visas are issued for the course duration, up to five years, and can be extended in India." },
    { title: "University Registration", description: "Complete your registration and enrollment formalities at the institution." },
    { title: "FRRO/FRO Registration (Not for Nepali Citizens)", description: "Foreign nationals on student visas valid for more than 180 days register with the FRRO/FRO within 14 days of arrival. Citizens of Nepal and Bhutan are exempt." },
  ],
  faqItems: [
    { question: "Why should I study in India?", answer: "India offers a wide choice of universities and institutes, English-medium programs in many fields, and scholarships for Nepali students. Nepali citizens are exempt from the Indian visa requirement, according to the Bureau of Immigration, and the two countries share an open border." },
    { question: "What are the top universities in India?", answer: "India has institutions such as the IITs, IIMs, AIIMS, Delhi University, JNU, and many other universities and institutes. Check the current official ranking and the course you want before you shortlist." },
    { question: "How can I apply to study in India?", answer: "Register on the Study in India portal for your SII ID, then apply to institutions through their admission pages. Nepali students can also apply for Embassy of India scholarships, but only directly. Admizz can guide you through course selection and documents." },
    { question: "Do Nepali citizens need a visa to study in India?", answer: "No. The Bureau of Immigration says citizens of Nepal are exempt from the requirement of an Indian visa. Coming from Nepal by land or air you need a government-approved photo ID showing your nationality. A valid passport is needed if you enter from anywhere other than Nepal." },
    { question: "Do Nepali students need to register with the FRRO?", answer: "No. Citizens of Nepal and Bhutan are exempt from the requirement of visa and registration. FRRO/FRO registration within 14 days of arrival applies to foreign nationals on student visas valid for more than 180 days." },
    { question: "What is the cost of studying in India?", answer: "It depends on the institution, course and city, so check each college's fee page. Fixed figures from the Embassy of India in Kathmandu include a COMPEX application fee of NPR 400 and a Law Scholarship that reimburses up to NPR 6.4 lakh a year for tuition, admission and hostel fees." },
    { question: "Can I extend my student visa in India?", answer: "For nationalities that need a student visa, the Study in India portal says student visas are issued for up to five years depending on the course and can be extended in India. Nepali citizens do not need a student visa." },
  ],
};

export default async function StudyInIndiaPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "india" });
  return <CountryPageTemplate data={indiaData} blogPosts={blogPosts} />;
}
