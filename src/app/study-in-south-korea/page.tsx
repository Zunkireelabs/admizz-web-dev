import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { getPostsByCategory } from "@/lib/blog-content";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in South Korea - Admizz Education",
  description:
    "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-south-korea",
  },
  openGraph: {
    title: "Study in South Korea - Admizz Education",
    description:
      "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!",
    url: "https://admizzeducation.com/study-in-south-korea",
    siteName: "Admizz Education",
    images: [
      {
        url: "/images/og/countries/study-in-south-korea.jpg",
        width: 1200,
        height: 630,
        alt: "Study in South Korea - Admizz Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in South Korea - Admizz Education",
    description:
      "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!",
    images: ["/images/og/countries/study-in-south-korea.jpg"],
  },
};

const southKoreaData: CountryPageData = {
  countryName: "South Korea",
  countryCategorySlug: "south-korea",
  heroHeading: "STUDY IN SOUTH KOREA",
  flagColors: ["#CD2E3A", "#0047A0"],
  heroSubheading: "Enter a Dynamic Academic World With Innovation and Creativity",
  heroDescription: "South Korea has become a global learning hub where innovation hums through every lecture hall and creativity blooms in every campus street. Admizz Education stands beside you as your trusted navigator, helping you enter this dynamic academic world with confidence and clarity.",
  heroBackground: "/images/hero/south-korea-hero.webp",
  quickFacts: [
    { label: "Language", value: "Korean" },
    { label: "Currency", value: "South Korean Won" },
    { label: "Universities", value: "43+" },
    { label: "Intl. Students", value: "253,000+" },
    { label: "Tuition fee", value: "$1,600–$10,800" },
  ],
  whyStudyTitle: "Why Study In South Korea ?",
  whyStudyIntro:
    "South Korea offers globally ranked universities, innovative learning, safe modern cities, rich cultural experiences, and excellent career opportunities. It's the ideal destination for ambitious students seeking quality education and future-focused growth.",
  benefits: [
    { icon: "/images/icons/school-1.webp", title: "World-Class Universities", description: "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!" },
    { icon: "/images/icons/scholarship-108.webp", title: "Affordable Quality Education", description: "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!" },
    { icon: "/images/icons/consultation.webp", title: "Strong Career Opportunities", description: "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!" },
    { icon: "/images/icons/scholarship-108.webp", title: "Attractive Scholarships", description: "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!" },
    { icon: "/images/icons/visa-1.webp", title: "Rich Cultural Experience", description: "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!" },
    { icon: "/images/icons/accomodation-108.webp", title: "Safe, Modern Cities", description: "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!" },
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
        "English test scores or TOPIK, as your university requires",
        "Statement of Purpose (SOP)",
        "Letters of Recommendation",
        "Updated CV/Resume (if required)",
        "Financial proof or bank statements",
      ],
    },
    {
      title: "Documents Required for the Standard Admission Certificate",
      intro: "To receive your Standard Admission Certificate for South Korea, students must submit accurate academic records, identity documents, financial proof, and university-required forms. These documents help confirm eligibility and support a smooth visa process.",
      documents: [
        "Valid passport (scanned copy)",
        "Completed university application form",
        "Academic transcripts and graduation certificates",
        "Proof of English or Korean proficiency, as your university requires",
        "Passport-size photographs",
        "Statement of Purpose (SOP)",
        "Financial proof, if your university asks for it",
        "Application fee payment receipt",
      ],
    },
    {
      title: "Visa Documentation",
      intro: "Requirements differ by embassy. Nepali applicants should follow the Korean Embassy in Kathmandu list, which asks for verified academic documents, an IELTS or TOPIK report, a TB medical report, a balance certificate and 6 months of bank statements from an A-level bank.",
      documents: [
        "Valid passport (original + copies)",
        "Visa application form (completed and signed)",
        "Passport-size photographs (as per embassy guidelines)",
        "Standard Admission Certificate from the university",
        "Academic transcripts and graduation certificates",
        "Balance certificate and bank statements, as the embassy requires",
        "Tuition fee payment receipt (if applicable)",
        "Statement of Purpose (required by the Korean Embassy in Nepal)",
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
  universities: [
    { name: "Seoul National University", logo: "/images/universities/south-korea/seoul-national-university.webp" },
    { name: "KAIST", logo: "/images/universities/south-korea/kaist.webp" },
    { name: "Yonsei University", logo: "/images/universities/south-korea/yonsei-university.webp" },
    { name: "Korea University", logo: "/images/universities/south-korea/korea-university.webp" },
    { name: "Sungkyunkwan University", logo: "/images/universities/south-korea/sungkyunkwan-university.webp" },
    { name: "Hanyang University", logo: "/images/universities/south-korea/hanyang-university.webp" },
    { name: "Kyung Hee University", logo: "/images/universities/south-korea/kyung-hee-university.webp" },
    { name: "Ewha Womans University", logo: "/images/universities/south-korea/ewha-womans-university.webp" },
    { name: "Sogang University", logo: "/images/universities/south-korea/sogang-university.webp" },
    { name: "Chung-Ang University", logo: "/images/universities/south-korea/chung-ang-university.webp" },
  ],
  costTitle: "Cost of Studying in South Korea",
  costIntro: "Understanding the cost of studying in South Korea helps international students plan their finances effectively.",
  costTable: [
    { program: "Undergraduate", fee: "About KRW 4.3M (national/public) to KRW 7.6M (private) per year" },
    { program: "Postgraduate", fee: "About KRW 2.5M – 4.4M per year" },
    { program: "MBA / Professional", fee: "$8,000 – $15,000" },
    { program: "Living Expenses", fee: "KRW 750,000 – 1,000,000 per month" },
    { program: "Health Insurance", fee: "National Health Insurance applies after 6 months of stay; D-2 students get a 50% premium reduction" },
  ],
  costNote: "Note: Costs vary by city, university and department. Average annual tuition runs from about KRW 6.0M (humanities and social sciences) to KRW 9.8M (medicine). Source: Study in Korea.",
  visaTitle: "South Korea Student Visa Process",
  visaIntro: "Planning to study in South Korea? Follow the step-by-step visa process to secure your student visa, meet requirements, and start your academic journey smoothly with proper documentation.",
  visaSteps: [
    { title: "Choose & Apply", description: "Study in South Korea with top universities, innovative programs, expert guidance, and visa support. Start your journey to success today!" },
    { title: "Get Your Acceptance Letter", description: "Korean universities issue a Standard Admission Certificate, which you need for the visa." },
    { title: "Prepare Funds & Documents", description: "Prepare the balance certificate and bank statements your embassy asks for. The Korean Embassy in Kathmandu asks for 6 months of statements from an A-level bank." },
    { title: "Apply for D-2/D-4 Visa", description: "D-2 is for degree programs and D-4 for Korean language training. For Nepali applicants, a single-entry visa of more than 90 days costs NPR 9,300 from July 1, 2026." },
    { title: "Visa Decision", description: "The Korean Embassy in Nepal says processing can take 21 working days or more." },
    { title: "Travel & Get Your ARC", description: "Register at the local immigration office for your Alien Registration Card (ARC) within 90 days of arrival." },
  ],
  faqItems: [
    { question: "What are the top universities in South Korea for international students?", answer: "Top universities include Seoul National University, KAIST, Yonsei University, and Korea University, offering world-class programs in engineering, business, and sciences." },
    { question: "What are the eligibility requirements for studying in South Korea?", answer: "Applicants must have completed 12 years of schooling, hold a non-Korean nationality, and meet the university's grade and language requirements. You also need a Standard Admission Certificate and a D-2 student visa. Requirements differ by university." },
    { question: "How much does it cost to study in South Korea?", answer: "Study in Korea lists average annual undergraduate tuition of about KRW 4.3 million at national and public universities and KRW 7.6 million at private ones. Living costs are estimated at KRW 750,000 to 1,000,000 a month. Exact fees depend on the university and department." },
    { question: "What types of student visas are available in South Korea?", answer: "The D-2 visa is for associate, bachelor's, master's and doctoral degree programs. The D-4 visa is for Korean language training. A D-2 stay can be up to 2 years per issuance, with extensions depending on your program." },
    { question: "What documents are required for a South Korea student visa?", answer: "Requirements differ by embassy. The Korean Embassy in Kathmandu asks for the Standard Admission Certificate, passport, SOP, verified academic documents, an IELTS or TOPIK report, a TB medical report, a balance certificate and 6 months of bank statements from an A-level bank." },
    { question: "When are the academic intakes in South Korea?", answer: "Korean universities run two main semesters, starting in March and September. Application windows differ by university and program, so check each university's international admissions page." },
    { question: "Can international students work while studying in South Korea?", answer: "Yes, but D-2 students need part-time work permission from immigration, a certain Korean language level and confirmation from the university's international student advisor. Weekly hours depend on degree level, year and Korean level, so check the official Study in Korea table." },
    { question: "How do I apply for scholarships in South Korea?", answer: "The Korean government offers the Global Korea Scholarship (GKS) for undergraduate and graduate degrees, covering airfare, language training, tuition and a monthly allowance. Many universities also offer their own awards. Check Study in Korea scholarship notices for current dates." },
    { question: "What is the language requirement for studying in South Korea?", answer: "Each university or department sets its own requirement: Korean proficiency (usually TOPIK) for Korean-taught programs, or English proficiency for English-taught programs. Check the accepted tests and minimum scores with your university." },
    { question: "How long does the South Korea visa process take?", answer: "It varies by embassy. The Korean Embassy in Nepal says visa issuance can take 21 working days or more and advises applying at least 21 days before departure. Check your embassy's page for its current timeline." },
  ],
};

export default async function StudyInSouthKoreaPage() {
  const blogPosts: SanityPost[] = getPostsByCategory("south-korea");
  return <CountryPageTemplate data={southKoreaData} blogPosts={blogPosts} />;
}
