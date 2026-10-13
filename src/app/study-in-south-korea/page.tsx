// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
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
    images: ["/images/og/korean.webp"],
    type: "website",
  },
};

const southKoreaData: CountryPageData = {
  countryName: "South Korea",
  countryCategorySlug: "south-korea",
  nepalGuide: {
    href: "/study-in-south-korea-from-nepal",
    title: "Applying from Nepal? Read the Nepal-specific guide to studying in South Korea",
    text: "Costs, the student visa process, intakes, test scores and scholarships for Nepali students.",
  },
  heroHeading: "STUDY IN SOUTH KOREA",
  heroSubheading: "Enter a Dynamic Academic World With Innovation and Creativity",
  heroDescription: "South Korea has become a global learning hub where innovation hums through every lecture hall and creativity blooms in every campus street. Admizz Education stands beside you as your trusted navigator, helping you enter this dynamic academic world with confidence and clarity.",
  heroBackground: "/images/hero/south-korea-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Seoul" },
    { label: "Language", value: "Korean" },
    { label: "Dialing Code", value: "+82" },
    { label: "Currency", value: "South Korean Won" },
    { label: "Intl. Students (2025)", value: "253,434" },
    { label: "Nepali Students (2025)", value: "12,784" },
    { label: "Semesters start", value: "March & September" },
    { label: "Avg. undergrad tuition", value: "KRW 4.3M–7.6M/yr" },
  ],
  whyStudyTitle: "Why Study In South Korea ?",
  whyStudyIntro:
    "South Korea offers well-known universities, modern cities, rich cultural experiences, and government and university scholarships. International students there grew from 91,332 in 2015 to 253,434 in 2025, according to Study in Korea.",
  benefits: [
    { icon: "/images/icons/school-1.webp", title: "World-Class Universities", description: "South Korea hosts research universities such as Seoul National University, KAIST and Yonsei University that welcome international students." },
    { icon: "/images/icons/scholarship-108.webp", title: "Affordable Quality Education", description: "Average annual undergraduate tuition is about KRW 4.3 million at national and public universities and KRW 7.6 million at private ones." },
    { icon: "/images/icons/consultation.webp", title: "Strong Career Opportunities", description: "After your degree you can move to a D-10-1 job-seeking visa, which can be extended in 6-month steps up to 2 years." },
    { icon: "/images/icons/scholarship-108.webp", title: "Attractive Scholarships", description: "The Korean government's Global Korea Scholarship (GKS) and many universities offer scholarships to international students." },
    { icon: "/images/icons/visa-1.webp", title: "Rich Cultural Experience", description: "A unique blend of tradition, innovation, arts, and global pop culture enhances student life." },
    { icon: "/images/icons/accomodation-108.webp", title: "Safe, Modern Cities", description: "Study in Korea describes public transport as very affordable, and cities have large international student communities." },
  ],
  admissionTitle: "Admission Requirements for Studying in South Korea",
  admissionIntro:
    "Applicants must have completed 12 years of schooling and meet the language and document requirements set by each university. Typical documents include academic records, language scores, a valid passport, SOP, recommendations and financial proof, but check your university's list.",
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
      title: "Admission Certificate Documents",
      intro: "Korean universities issue a Standard Admission Certificate, which you need for the visa. Submit the academic records, identity documents and forms your university asks for.",
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
        "Statement of Purpose (required by the Korean Embassy in Nepal)",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in South Korea",
    intro: "South Korean universities offer multiple intakes each year, giving international students flexible entry points to begin their studies. These structured admission cycles help students plan applications, visas, and travel with confidence.",
    items: [
      { name: "Spring Intake (March)", details: ["First semester of the Korean academic year. Application windows differ by university."] },
      { name: "Fall Intake (September)", details: ["Second semester. Which programs admit in September depends on the university."] },
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
  costIntro: "Figures below are based on Study in Korea (NIIED) data in Korean won. Check your university for exact fees.",
  costTable: [
    { program: "Undergraduate tuition (average)", fee: "About KRW 4.3 million (national and public) to KRW 7.6 million (private) per year" },
    { program: "Graduate tuition (average)", fee: "About KRW 2.5 million to KRW 4.4 million per year" },
    { program: "Living Expenses", fee: "KRW 750,000 – 1,000,000 per month" },
    { program: "Health Insurance", fee: "National Health Insurance applies after 6 months of stay; D-2 students get a 50% premium reduction" },
  ],
  costNote: "Note: Costs vary by city, university and department. By department the average annual tuition runs from about KRW 6.0 million (humanities and social sciences) to KRW 9.8 million (medicine). Source: Study in Korea.",
  visaTitle: "South Korea Student Visa Process",
  visaIntro: "Planning to study in South Korea? Follow the step-by-step visa process to secure your student visa, meet requirements, and start your academic journey smoothly with proper documentation.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select a recognized South Korean university and program suitable for your study goals." },
    { title: "Submit Application", description: "Apply directly to the university with all required academic documents and certificates." },
    { title: "Receive Acceptance Letter", description: "Obtain your official acceptance letter from the university to proceed with visa application." },
    { title: "Prepare Financial Documents", description: "Prepare the balance certificate and bank statements your embassy asks for." },
    { title: "Gather Required Documents", description: "Collect passport, photo, transcripts, admission certificate, financial documents, and any medical report your embassy requires." },
    { title: "Complete Visa Application", description: "Fill out the South Korea D-2 (degree) or D-4 (language program) visa application form accurately." },
    { title: "Pay Visa Fees", description: "Pay the visa fee set by the Korean embassy or consulate. For Nepali applicants, a single-entry visa of more than 90 days costs NPR 9,300 from 1 July 2026." },
    { title: "Submit Application", description: "Submit all documents and application form to the South Korean embassy/consulate." },
        { title: "Wait for Visa Decision", description: "Times vary by embassy. The Korean Embassy in Nepal says processing can take 21 working days or more." },
    { title: "Collect Visa", description: "Once approved, collect your visa and verify all details." },
    { title: "Travel to South Korea", description: "Carry your visa, passport, acceptance letter, and other essential documents while traveling." },
    { title: "University Registration", description: "Register at your university and submit required documents within the stipulated timeframe." },
    { title: "Apply for Alien Registration Card (ARC)", description: "Register at the local immigration office within 90 days of arrival." },
  ],
  faqItems: [
    { question: "What are the top universities in South Korea for international students?", answer: "Well-known options include Seoul National University, KAIST, Yonsei University, and Korea University. Programs, language requirements and fees differ by university, so compare them on each university's international admissions page." },
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
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "south-korea" });
  return <CountryPageTemplate data={southKoreaData} blogPosts={blogPosts} />;
}
