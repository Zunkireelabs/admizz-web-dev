import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";

export const metadata: Metadata = {
  title: "Study in South Korea - Admizz Education",
  description:
    "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-south-korea/",
  },
  openGraph: {
    title: "Study in South Korea - Admizz Education",
    description:
      "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!",
    url: "https://admizzeducation.com/study-in-south-korea/",
    siteName: "Admizz Education",
    images: ["/images/og/flag-of-australia.png"],
    type: "website",
  },
};

const southKoreaData: CountryPageData = {
  countryName: "South Korea",
  heroHeading: "STUDY IN SOUTH KOREA",
  heroSubheading: "South Korea has become a global learning hub where innovation hums through every lecture hall and creativity blooms in every campus street. Admizz Education stands beside you as your trusted navigator, helping you enter this dynamic academic world with confidence and clarity.",
  quickFacts: [
    { label: "Capital", value: "Seoul" },
    { label: "Language", value: "Korean" },
    { label: "Dialing Code", value: "+82" },
    { label: "Currency", value: "South Korean Won" },
    { label: "Population", value: "51+ Million" },
    { label: "Universities", value: "43+" },
    { label: "Intl. Students", value: "485,555" },
    { label: "Tuition fee", value: "$1,600–$10,800" },
  ],
  whyStudyTitle: "Why Study In South Korea ?",
  whyStudyIntro:
    "South Korea offers globally ranked universities, innovative learning, safe modern cities, rich cultural experiences, and excellent career opportunities. It's the ideal destination for ambitious students seeking quality education and future-focused growth.",
  benefits: [
    { title: "World-Class Universities", description: "South Korea hosts globally ranked institutions known for academic excellence and advanced learning environments." },
    { title: "Affordable Quality Education", description: "Students benefit from reasonable tuition fees without compromising on teaching standards or campus facilities." },
    { title: "Strong Career Opportunities", description: "Graduates access high-demand roles across technology, business, research, engineering, and creative fields." },
    { title: "Attractive Scholarships", description: "Universities and government programs offer generous scholarships that support international student growth." },
    { title: "Rich Cultural Experience", description: "A unique blend of tradition, innovation, arts, and global pop culture enhances student life." },
    { title: "Safe, Modern Cities", description: "International students enjoy secure, tech-driven cities with efficient transport and vibrant daily life." },
  ],
  admissionTitle: "Admission Requirements for Studying in South Korea",
  admissionIntro:
    "Admission requirements include academic qualifications, language proficiency, valid passport, SOP, recommendation letters, financial proof, and university-specific documents. These ensure students meet eligibility standards for successful admission to South Korean universities.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in South Korea",
      intro: "Prepare essential documents including transcripts, language scores, SOP, recommendations, passport, and financial proof to ensure a smooth admission process in South Korea.",
      documents: [
        "Completed university application form",
        "Academic transcripts and certificates",
        "Passport (valid for study duration)",
        "Passport-size photographs",
        "English test scores (IELTS/TOEFL) or TOPIK for Korean-taught programs",
        "Statement of Purpose (SOP)",
        "Letters of Recommendation",
        "Updated CV/Resume (if required)",
        "Financial proof or bank statements",
      ],
    },
    {
      title: "Documents Required for CAS (Confirmation of Acceptance for Studies)",
      intro: "To receive your Certificate of Admission for South Korea, students must submit accurate academic records, identity documents, financial proof, and university-required forms. These documents help confirm eligibility and support a smooth visa process.",
      documents: [
        "Valid passport (scanned copy)",
        "Completed university application form",
        "Academic transcripts and graduation certificates",
        "Proof of English or Korean proficiency (IELTS/TOEFL or TOPIK)",
        "Passport-size photographs",
        "Statement of Purpose (SOP)",
        "Financial proof showing sufficient funds for tuition and living expenses",
        "Application fee payment receipt",
      ],
    },
    {
      title: "Visa Documentation",
      intro: "To secure your South Korean student visa, you must submit accurate academic, financial, and identification documents. These ensure eligibility, confirm your admission status, and support a smooth, timely visa approval process.",
      documents: [
        "Valid passport (original + copies)",
        "Visa application form (completed and signed)",
        "Passport-size photographs (as per embassy guidelines)",
        "Certificate of Admission from the university",
        "Academic transcripts and graduation certificates",
        "Bank statements showing required financial funds",
        "Tuition fee payment receipt (if applicable)",
        "Statement of Purpose (if requested)",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in South Korea",
    intro: "South Korean universities offer multiple intakes each year, giving international students flexible entry points to begin their studies. These structured admission cycles help students plan applications, visas, and travel with confidence.",
    items: [
      { name: "Spring Intake (March)", details: ["The primary and most popular intake with wide program availability and higher scholarship opportunities."] },
      { name: "Fall Intake (September)", details: ["A major intake offering strong course options, ideal for students completing their studies mid-year."] },
    ],
  },
  universities: [],
  costTitle: "Cost of Studying in South Korea",
  costIntro: "Understanding the cost of studying in South Korea helps international students plan their finances effectively.",
  costTable: [
    { program: "Undergraduate", fee: "$3,000 – $7,000" },
    { program: "Postgraduate", fee: "$4,000 – $10,000" },
    { program: "MBA / Professional", fee: "$8,000 – $15,000" },
    { program: "Living Expenses", fee: "$4,000 – $8,000 per year" },
    { program: "Health Insurance", fee: "$200 – $400 per year" },
  ],
  costNote: "Note: Total costs vary by city. Seoul is higher; smaller cities are more budget friendly.",
  visaTitle: "South Korea Student Visa Process",
  visaIntro: "Planning to study in South Korea? Follow the step-by-step visa process to secure your student visa, meet requirements, and start your academic journey smoothly with proper documentation.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select a recognized South Korean university and program suitable for your study goals." },
    { title: "Submit Application", description: "Apply directly to the university with all required academic documents and certificates." },
    { title: "Receive Acceptance Letter", description: "Obtain your official acceptance letter from the university to proceed with visa application." },
    { title: "Prepare Financial Documents", description: "Show proof of sufficient funds to cover tuition fees and living expenses." },
    { title: "Gather Required Documents", description: "Collect passport, photos, transcripts, acceptance letter, financial proof, and health/insurance certificates." },
    { title: "Complete Visa Application", description: "Fill out the South Korea D-2/D-4 visa application form accurately." },
    { title: "Pay Visa Fees", description: "Submit the required visa fee at the South Korean embassy or consulate." },
    { title: "Submit Application", description: "Submit all documents and application form to the South Korean embassy/consulate." },
    { title: "Attend Interview (if required)", description: "Some applicants may be asked to attend an interview at the consulate." },
    { title: "Wait for Visa Decision", description: "Processing typically takes 2–4 weeks depending on the embassy." },
    { title: "Collect Visa", description: "Once approved, collect your visa and verify all details." },
    { title: "Travel to South Korea", description: "Carry your visa, passport, acceptance letter, and other essential documents while traveling." },
    { title: "University Registration", description: "Register at your university and submit required documents within the stipulated timeframe." },
    { title: "Apply for Alien Registration Card (ARC)", description: "Register at the local immigration office within 90 days of arrival." },
  ],
  faqItems: [
    { question: "What are the top universities in South Korea for international students?", answer: "Top universities include Seoul National University, KAIST, Yonsei University, and Korea University, offering world-class programs in engineering, business, and sciences." },
    { question: "What are the eligibility requirements for studying in South Korea?", answer: "Students must have a valid passport, high school/undergraduate transcripts, proof of finances, Korean or English proficiency, and an acceptance letter from a recognized university." },
    { question: "How much does it cost to study in South Korea?", answer: "Tuition ranges from $3,000–$10,000 per year, while living expenses vary between $4,000–$8,000 annually, depending on the city and lifestyle." },
    { question: "What types of student visas are available in South Korea?", answer: "International students generally apply for D-2 (regular degree) or D-4 (language program) visas, depending on their program of study." },
    { question: "What documents are required for a South Korea student visa?", answer: "Required documents include acceptance letter, visa application form, passport, financial proof, academic transcripts, photos, and health/insurance certificates." },
    { question: "When are the academic intakes in South Korea?", answer: "Most universities offer two main intakes: Spring (March) and Fall (September), with some offering additional summer or winter sessions." },
    { question: "Can international students work while studying in South Korea?", answer: "Yes, students with a D-2 visa can work up to 20 hours per week during semesters and full-time during vacations after obtaining university permission." },
    { question: "How do I apply for scholarships in South Korea?", answer: "Many universities and government programs like the Korean Government Scholarship Program (KGSP) offer scholarships. Apply directly with required documents before the intake deadlines." },
    { question: "What is the language requirement for studying in South Korea?", answer: "Programs may require either Korean proficiency (TOPIK) or English proficiency (TOEFL/IELTS), depending on the medium of instruction." },
    { question: "How long does the South Korea visa process take?", answer: "Visa processing typically takes 2–4 weeks at the consulate. Start early to ensure enough time before your university intake." },
  ],
};

export default function StudyInSouthKoreaPage() {
  return <CountryPageTemplate data={southKoreaData} />;
}
