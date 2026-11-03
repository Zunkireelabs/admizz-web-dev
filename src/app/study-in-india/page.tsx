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
    images: [
      {
        url: "/images/og/countries/study-in-india.jpg",
        width: 1200,
        height: 630,
        alt: "Study in India - Admizz Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in India - Admizz Education",
    description:
      "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!",
    images: ["/images/og/countries/study-in-india.jpg"],
  },
};

const indiaData: CountryPageData = {
  countryName: "India",
  countryCategorySlug: "india",
  heroHeading: "STUDY IN INDIA",
  flagColors: ["#E8751A", "#138808"],
  heroSubheading: "Unlock Quality Education and Career-Ready Opportunities",
  heroDescription: "Study in India and unlock quality education, diverse programs, and career-ready opportunities. Admizz Education guides you through course selection, university admissions, documentation, and support — making your journey effortless, informed, and future-focused across India's leading academic destinations.",
  heroBackground: "/images/hero/india-hero.webp",
  quickFacts: [
    { label: "Language", value: "Hindi" },
    { label: "Currency", value: "Indian Rupee (₹)" },
    { label: "Visa for Nepali citizens", value: "Not required" },
    { label: "Intl. Students (2023\u201324)", value: "58,134" },
    { label: "Tuition fee", value: "₹50,000" },
  ],
  whyStudyTitle: "Why Study in India?",
  whyStudyIntro:
    "Study in India for globally recognized education, affordable fees, diverse culture, advanced universities, English-taught programs, and excellent career opportunities for international students.",
  benefits: [
    { title: "Global Recognition", icon: "/images/icons/school-1.webp", description: "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!" },
    { title: "Affordable Education", icon: "/images/icons/scholarship-108.webp", description: "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!" },
    { title: "English Programs", icon: "/images/icons/knowledge.webp", description: "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!" },
    { title: "Cultural Diversity", icon: "/images/icons/visa-1.webp", description: "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!" },
    { title: "Career Opportunities", icon: "/images/icons/consultation.webp", description: "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!" },
    { title: "Modern Campuses", icon: "/images/icons/school-1.webp", description: "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!" },
  ],
  admissionTitle: "Admission Requirements for Studying in India",
  admissionIntro:
    "Admission requirements for studying in India include academic documents, English proficiency (Only for a few top universities), a valid passport (except Nepal & Bhutan), financial proof, entrance exams, and supporting documents like SOPs and recommendations (mostly for government institutions), ensuring a smooth and transparent application process.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in India",
      intro: "India's admission process requires academic records, English proficiency, entrance exams, valid passport, financial proof, and essential documents for smooth international student enrollment.",
      documents: [
        "Academic Transcripts",
        "Valid Passport",
        "English Proficiency",
        "Entrance Exams",
        "Statement of Purpose (SOP)",
        "Letters of Recommendation (LORs)",
        "Proof of Financial Support",
        "Application Form & Fee",
      ],
    },
    {
      title: "Documents Required for Admission Confirmation",
      intro: "Admission requires verified academic documents, passport details, financial evidence, offer letter acceptance, and supporting records to confirm eligibility for an Indian Visa (If required)",
      documents: [
        "Valid Passport",
        "Final Academic Transcripts",
        "English Language Proof",
        "Previous Qualifications",
        "Offer Letter Acceptance",
        "Financial Documents",
        "Tuition Fee Payment Receipt",
        "Sponsor Letter (If Applicable)",
        "Passport-Sized Photographs",
      ],
    },
    {
      title: "Visa Documentation",
      intro: "Citizens of Nepal and Bhutan do not need an Indian visa; Nepali citizens carry a government-approved photo ID, or a valid passport if entering from anywhere other than Nepal. Other nationalities apply for a student visa with a Study in India (SII) ID and an offer letter.",
      documents: [
        "Government-Approved Photo ID or Valid Passport (Nepali citizens)",
        "Study in India (SII) ID",
        "Offer Letter from the Institution",
        "Visa Application Form (other nationalities only)",
        "Tuition Fee Payment Receipt",
        "Academic Documents",
        "Passport-Sized Photographs",
        "Proof of Financial Capacity (if the scheme asks)",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in India",
    intro: "India follows a structured academic calendar that helps international students plan their applications, visa processes, and course enrollment smoothly.",
    items: [
      { name: "July–August Intake (Primary Intake)", details: [] },
      { name: "January–February Intake (Secondary Intake)", details: [] },
      { name: "Rolling / Flexible Intakes (Special Courses)", details: [] },
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
  costIntro: "Study in India offers affordable tuition fees, low living expenses, quality education, and excellent value compared to major global study destinations.",
  costTable: [
    { program: "Engineering & IT", fee: "₹2,00,000 – ₹6,00,000" },
    { program: "Medicine (MBBS/MD)", fee: "₹5,00,000 – ₹25,00,000" },
    { program: "Management (MBA)", fee: "₹3,00,000 – ₹10,00,000" },
    { program: "Arts Science Humanities", fee: "₹80,000 – ₹3,00,000" },
    { program: "Living Expenses", fee: "₹15,000 – ₹30,000 per month" },
    { program: "Hostel / Accommodation", fee: "₹8,000 – ₹20,000 per month" },
  ],
  costNote: "Note: Costs vary by city. Metro cities like Mumbai, Bangalore, and Delhi are higher; smaller cities are more affordable.",
  visaTitle: "Entry and Student Visa Process for India",
  visaIntro: "Citizens of Nepal and Bhutan are exempt from the Indian visa and registration requirements. Other nationalities follow the Study in India student visa process below.",
  visaSteps: [
    { title: "Choose & Get Admitted", description: "Select your preferred Indian institution and program, and get your admission offer letter." },
    { title: "Register on Study in India", description: "Register on studyinindia.gov.in to get your unique Study in India (SII) ID." },
    { title: "Nepali Citizens: No Visa", description: "Coming from Nepal by land or air, carry a government-approved photo ID showing your nationality. You need a valid passport if you enter from elsewhere." },
    { title: "Other Nationalities: Apply for a Student Visa", description: "Apply on indianvisaonline.gov.in after you hold your SII ID and offer letter. Student visas are issued for the course duration, up to five years, and can be extended in India." },
    { title: "University Registration", description: "Complete your registration and enrollment formalities at the institution." },
    { title: "FRRO/FRO Registration (Not for Nepali Citizens)", description: "Foreign nationals on student visas valid for more than 180 days register with the FRRO/FRO within 14 days of arrival. Citizens of Nepal and Bhutan are exempt." },
  ],
  faqItems: [
    { question: "Why should I study in India?", answer: "India offers a wide choice of universities and institutes, English-medium programs in many fields, and scholarships for Nepali students. Nepali citizens are exempt from the Indian visa requirement, according to the Bureau of Immigration, and the two countries share an open border." },
    { question: "What are the top universities in India?", answer: "India has institutions such as the IITs, IIMs, AIIMS, Delhi University, JNU, and many other universities and institutes. Check the current official ranking and the course you want before you shortlist." },
    { question: "How can I apply to study in India?", answer: "Register on the Study in India portal for your SII ID, then apply to institutions through their admission pages. Nepali students can also apply for Embassy of India scholarships, but only directly. Admizz can guide you through course selection and documents." },
    { question: "Do Nepali citizens need a visa to study in India?", answer: "No. The Bureau of Immigration says citizens of Nepal are exempt from the requirement of an Indian visa. Coming from Nepal by land or air you need a government-approved photo ID showing your nationality. A valid passport is needed if you enter from anywhere other than Nepal." },
    { question: "How long does it take to get an Indian student visa?", answer: "Nepali citizens do not need a student visa. For other nationalities, the Study in India portal says applying does not guarantee a visa and that student visas are issued for up to five years. We have no official processing time, so apply early." },
    { question: "Can I work while studying in India?", answer: "International students on a student visa are generally not permitted to work in India. However, internships related to the course of study may be allowed with university approval." },
    { question: "What is the cost of studying in India?", answer: "Tuition fees range from ₹50,000 to ₹25,00,000 per year depending on the program and university. Living costs are ₹15,000 to ₹30,000 per month." },
    { question: "Is health insurance required for studying in India?", answer: "While not always mandatory, health insurance is strongly recommended for international students to cover medical expenses during their stay in India." },
    { question: "Can I extend my student visa in India?", answer: "For nationalities that need a student visa, the Study in India portal says student visas are issued for up to five years depending on the course and can be extended in India. Nepali citizens do not need a student visa." },
    { question: "Do Nepali students need to register with the FRRO?", answer: "No. Citizens of Nepal and Bhutan are exempt from the requirement of visa and registration. FRRO/FRO registration within 14 days of arrival applies to foreign nationals on student visas valid for more than 180 days." },
  ],
};

export default async function StudyInIndiaPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "india" });
  return <CountryPageTemplate data={indiaData} blogPosts={blogPosts} />;
}
