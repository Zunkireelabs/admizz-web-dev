import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";

export const metadata: Metadata = {
  title: "Study in India - Admizz Education",
  description:
    "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-india/",
  },
  openGraph: {
    title: "Study in India - Admizz Education",
    description:
      "Study in India at top universities with diverse programs, affordable education, and expert admission support. Apply for your future today!",
    url: "https://admizzeducation.com/study-in-india/",
    siteName: "Admizz Education",
    images: ["/images/og/flag-of-australia.png"],
    type: "website",
  },
};

const indiaData: CountryPageData = {
  countryName: "India",
  heroHeading: "STUDY IN INDIA",
  heroSubheading: "Study in India and unlock quality education, diverse programs, and career-ready opportunities. Admizz Education guides you through course selection, university admissions, documentation, and support—making your journey effortless, informed, and future-focused across India's leading academic destinations.",
  quickFacts: [
    { label: "Capital", value: "New Delhi" },
    { label: "Language", value: "Hindi" },
    { label: "Dialing Code", value: "+91" },
    { label: "Currency", value: "Indian Rupee (₹)" },
    { label: "Population", value: "1.4+ Billion" },
    { label: "Universities", value: "359" },
    { label: "Intl. Students", value: "485,555" },
    { label: "Tuition fee", value: "₹50,000" },
  ],
  whyStudyTitle: "Why Study in India?",
  whyStudyIntro:
    "Study in India for globally recognised education, affordable fees, diverse culture, advanced universities, English-taught programs, and excellent career opportunities for international students.",
  benefits: [
    { title: "Global Recognition", description: "Degrees from top Indian universities are valued worldwide for strong academic standards." },
    { title: "Affordable Education", description: "Tuition fees and living costs are low compared to major study destinations." },
    { title: "English Programs", description: "Most Indian universities offer English-taught courses across diverse academic fields." },
    { title: "Cultural Diversity", description: "Experience India's vibrant culture, traditions, and inclusive student-friendly lifestyle." },
    { title: "Career Opportunities", description: "Strong industry links provide internships, projects, and excellent job prospects." },
    { title: "Modern Campuses", description: "Universities offer safe campuses, advanced labs, and technology-driven learning environments." },
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
      intro: "Visa documentation includes passport, admission proof, financial statements, photographs, application forms, biometrics, and supporting certificates required to secure a successful student visa.",
      documents: [
        "Valid Passport",
        "Visa Application Form",
        "CAS/Admission Letter",
        "Financial Proof",
        "Tuition Fee Payment Receipt",
        "English Proficiency Proof",
        "Academic Documents",
        "Passport-Sized Photographs",
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
  universities: [],
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
  visaTitle: "India Student Visa Process for International Students",
  visaIntro: "The India Student Visa process is simple, transparent, and designed to help international students smoothly enter the country for higher education.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select your preferred Indian university and program based on eligibility and goals." },
    { title: "Receive Admission Letter", description: "Get your official admission letter from the chosen Indian university." },
    { title: "Prepare Required Documents", description: "Gather all academic, financial, and identity documents needed for the visa application." },
    { title: "Complete Online Visa Application", description: "Fill out the online student visa application form with accurate details." },
    { title: "Pay Visa Fees", description: "Complete the required visa fee payment through the designated payment channels." },
    { title: "Schedule Appointment", description: "Book your visa appointment at the nearest Indian Embassy or Consulate." },
    { title: "Submit Documents & Biometrics", description: "Visit the visa centre to submit your documents and provide biometric data." },
    { title: "Visa Processing", description: "Wait for the visa authorities to review and process your application." },
    { title: "Visa Approval", description: "Receive your visa approval and collect your passport with the student visa stamp." },
    { title: "Travel to India", description: "Book your flights and travel to India before your program start date." },
    { title: "University Registration", description: "Complete your registration and enrollment formalities at the university." },
    { title: "FRRO/FRO Registration", description: "Register with the Foreigners Regional Registration Office (FRRO) or Foreigners Registration Office (FRO) within 14 days of arrival." },
  ],
  faqItems: [
    { question: "Why should I study in India?", answer: "India offers globally recognised education, affordable fees, diverse culture, English-taught programs, advanced universities, and excellent career opportunities for international students." },
    { question: "What are the top universities in India?", answer: "India is home to top institutions including IITs, IIMs, AIIMS, Delhi University, JNU, and many other nationally and internationally recognised universities." },
    { question: "How can I apply to study in India?", answer: "You can apply through university portals or through Admizz Education, which guides you through course selection, documentation, and the complete admission process." },
    { question: "What documents are required for a student visa to India?", answer: "You need a valid passport, admission letter, financial proof, visa application form, passport-sized photographs, academic documents, and English proficiency proof." },
    { question: "How long does it take to get an Indian student visa?", answer: "The Indian student visa process typically takes 2 to 4 weeks, depending on the applicant's country and completeness of documentation." },
    { question: "Can I work while studying in India?", answer: "International students on a student visa are generally not permitted to work in India. However, internships related to the course of study may be allowed with university approval." },
    { question: "What is the cost of studying in India?", answer: "Tuition fees range from ₹50,000 to ₹25,00,000 per year depending on the program and university. Living costs are ₹15,000 to ₹30,000 per month." },
    { question: "Is health insurance required for studying in India?", answer: "While not always mandatory, health insurance is strongly recommended for international students to cover medical expenses during their stay in India." },
    { question: "Can I extend my student visa in India?", answer: "Yes, student visas can be extended through the FRRO/FRO office if your course duration requires it, subject to valid enrollment and documentation." },
    { question: "How do I register with local authorities after arriving in India?", answer: "International students must register with the Foreigners Regional Registration Office (FRRO) or Foreigners Registration Office (FRO) within 14 days of arrival in India." },
  ],
};

export default function StudyInIndiaPage() {
  return <CountryPageTemplate data={indiaData} />;
}
