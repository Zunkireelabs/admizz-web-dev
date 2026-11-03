import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Denmark - Admizz Education",
  description:
    "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-denmark",
  },
  openGraph: {
    title: "Study in Denmark - Admizz Education",
    description:
      "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!",
    url: "https://admizzeducation.com/study-in-denmark",
    siteName: "Admizz Education",
    images: [
      {
        url: "/images/og/countries/study-in-denmark.jpg",
        width: 1200,
        height: 630,
        alt: "Study in Denmark - Admizz Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Denmark - Admizz Education",
    description:
      "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!",
    images: ["/images/og/countries/study-in-denmark.jpg"],
  },
};

const denmarkData: CountryPageData = {
  countryName: "Denmark",
  countryCategorySlug: "denmark",
  heroHeading: "STUDY IN DENMARK",
  flagColors: ["#C8102E", "#8E0B20"],
  heroSubheading: "Access Innovative Education in a Welcoming European Hub",
  heroDescription: "Study in Denmark and access innovative education, industry-focused programs, and a welcoming international environment. Admizz Education guides you through course selection, admissions, documentation, and visa support — ensuring a smooth, informed journey toward world-class learning and future-ready opportunities in Denmark.",
  heroBackground: "/images/hero/denmark-hero.webp",
  quickFacts: [
    { label: "Language", value: "Danish" },
    { label: "Currency", value: "Danish Krone (DKK)" },
    { label: "Residence permit fee", value: "DKK 3,060" },
    { label: "Main intake", value: "September" },
    { label: "Tuition fee", value: "DKK 45,000-120,000" },
  ],
  whyStudyTitle: "Why Study In Denmark ?",
  whyStudyIntro:
    "Study in Denmark for world-class education, innovative teaching, affordable living, strong career opportunities, and a safe, welcoming European study environment.",
  benefits: [
    { icon: "/images/icons/school-1.webp", title: "World-Ranked Universities", description: "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!" },
    { icon: "/images/icons/knowledge.webp", title: "Innovative Student-Centric Teaching", description: "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!" },
    { icon: "/images/icons/consultation.webp", title: "Strong Career Prospects", description: "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!" },
    { icon: "/images/icons/scholarship-108.webp", title: "Affordable Education & Scholarships", description: "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!" },
    { icon: "/images/icons/knowledge.webp", title: "English-Taught Programs & Global Exposure", description: "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!" },
    { icon: "/images/icons/accomodation-108.webp", title: "High Quality of Life & Safety", description: "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!" },
  ],
  admissionTitle: "Admission Requirements for Studying in Denmark",
  admissionIntro:
    "To study in Denmark, students must prepare essential academic, financial, and identity documents that prove eligibility, language proficiency, and funding. Proper documentation ensures smooth admission, visa approval, and timely university enrollment.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in Denmark",
      intro: "Prepare essential academic, financial, and identity documents to secure admission and a smooth student visa process for studying in Denmark.",
      documents: [
        "Passport (valid for the entire study period)",
        "Academic transcripts & certificates (10th, 12th, bachelor\u2019s/master\u2019s)",
        "English proficiency test score (IELTS/TOEFL/PTE)",
        "Updated CV / Resume",
        "Statement of Purpose (SOP)",
        "Letters of Recommendation (LORs)",
        "University application form",
        "Proof of funds (DKK 7,426 per month of study, 2026 level, or first-semester tuition paid)",
        "Tuition fee payment receipt (if applicable)",
        "Passport-size photographs",
      ],
    },
    {
      title: "Documents Required for CAS",
      intro: "Prepare all required academic, financial, and identification documents accurately to ensure a smooth and timely CAS issuance for your university admission.",
      documents: [
        "Valid passport",
        "Academic transcripts and certificates",
        "English proficiency test score",
        "Proof of funds",
        "Tuition fee payment receipt (if required)",
        "Passport-size photographs",
        "SOP / Personal statement",
        "CAS information form or Pre-CAS questionnaire",
      ],
    },
    {
      title: "Visa Documentation",
      intro: "Prepare essential academic, financial, and identity documents to ensure a smooth Denmark student visa process and successful entry into top Danish institutions.",
      documents: [
        "Valid passport",
        "Completed Denmark student visa application (ST1 form)",
        "Admission letter from a recognized Danish institution",
        "Proof of tuition fee payment",
        "Financial proof of DKK 7,426 per month of study (2026 level), or first-semester tuition paid",
        "Academic transcripts & certificates",
        "English proficiency test score",
        "Passport-size photographs",
        "Statement of Purpose (optional but recommended)",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in Denmark",
    intro: "Denmark\u2019s main intake is September, and some programs also start in February. Bachelor\u2019s applicants from outside Denmark apply through optagelse.dk by March 15, 12 noon (CET).",
    items: [
      { name: "September / Fall Intake (Major Intake)", details: [] },
      { name: "February Intake (Secondary Intake)", details: [] },
      { name: "Rolling Intakes (Program/University-Specific)", details: [] },
    ],
  },
  universities: [
    { name: "University of Copenhagen", logo: "/images/universities/denmark/university-of-copenhagen.webp" },
    { name: "Aarhus University", logo: "/images/universities/denmark/aarhus-university.webp" },
    { name: "Technical University of Denmark", logo: "/images/universities/denmark/technical-university-of-denmark.webp" },
    { name: "Copenhagen Business School", logo: "/images/universities/denmark/copenhagen-business-school.webp" },
    { name: "Aalborg University", logo: "/images/universities/denmark/aalborg-university.webp" },
    { name: "University of Southern Denmark", logo: "/images/universities/denmark/university-of-southern-denmark.webp" },
    { name: "Roskilde University", logo: "/images/universities/denmark/roskilde-university.webp" },
    { name: "IT University of Copenhagen", logo: "/images/universities/denmark/it-university-of-copenhagen.webp" },
    { name: "VIA University College", logo: "/images/universities/denmark/via-university-college.webp" },
    { name: "University College Copenhagen", logo: "/images/universities/denmark/university-college-copenhagen.webp" },
  ],
  costTitle: "Cost of Studying in Denmark",
  costIntro: "Tuition for non-EU/EEA students is set by each institution. Study in Denmark lists a range of DKK 45,000-120,000 a year. For the study residence permit you must also show funds for living costs.",
  costTable: [
    { program: "Tuition, non-EU/EEA students (range across programs)", fee: "DKK 45,000 \u2013 DKK 120,000 per year" },
    { program: "Funds to show for the residence permit (2026 level)", fee: "DKK 7,426 per month of study, up to DKK 89,112 for studies over a year" },
    { program: "Residence permit application fee (2026 rate)", fee: "DKK 3,060" },
    { program: "Living Expenses", fee: "\u20AC9,000 \u2013 \u20AC16,000 per year" },
    { program: "Health Insurance", fee: "\u20AC300 \u2013 \u20AC600 per year" },
  ],
  costNote: "Note: Contact your university for the exact tuition fee. Costs vary by city. Copenhagen is more expensive; smaller cities like Odense or Aalborg are more affordable.",
  visaTitle: "Denmark Student Visa Process",
  visaIntro: "Understand the complete Denmark student visa process, from receiving your admission letter to securing your residence permit and traveling for studies.",
  visaSteps: [
    { title: "Choose & Get Admitted", description: "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!" },
    { title: "Complete the ST1 Form", description: "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!" },
    { title: "Show Funds & Upload Documents", description: "Pay the residence permit fee (DKK 3,060, 2026 rate). Show DKK 7,426 per month of study (2026 level) in bank statements no more than 30 days old, or a granted scholarship or loan, or pay your first semester\u2019s tuition. Upload the documents listed in your online application." },
    { title: "Biometrics", description: "Give fingerprints and a photo within 14 days of submitting the online application." },
    { title: "Visa Decision", description: "SIRI normally takes 2 months, up to 3 months if more information is needed." },
    { title: "Travel & Register for CPR", description: "Study in Denmark with world-class education, expert guidance, visa support, and scholarship options. Apply now for a brighter future!" },
  ],
  faqItems: [
    { question: "Is Denmark good for international students?", answer: "Yes, Denmark is an excellent choice for international students, offering world-ranked universities, innovative teaching methods, English-taught programs, a safe environment, and strong post-study career opportunities in Europe." },
    { question: "What are the admission requirements for studying in Denmark?", answer: "Students typically need a valid passport, academic transcripts and certificates, English proficiency scores (IELTS/TOEFL/PTE), a Statement of Purpose, Letters of Recommendation, proof of funds, and a completed university application form." },
    { question: "What is the cost of studying in Denmark?", answer: "Study in Denmark lists non-EU/EEA tuition at DKK 45,000-120,000 per year, set by each institution. The residence permit fee is DKK 3,060, and you must show DKK 7,426 per month of study (2026 level)." },
    { question: "Do I need IELTS to study in Denmark?", answer: "Most Danish universities require an English proficiency test such as IELTS, TOEFL, or PTE for admission into English-taught programs. Some universities may accept alternative proof of English proficiency." },
    { question: "What are the main intakes in Denmark?", answer: "The main intake is September, and some programs also start in February. Bachelor\u2019s applicants from outside Denmark apply through optagelse.dk by March 15, 12 noon (CET). Check each program for its own dates." },
    { question: "Can I work while studying in Denmark?", answer: "Yes. Students in state-approved programs may work 90 hours per month from September to May and full-time in June, July and August, according to the Danish immigration service." },
    { question: "How do I apply for a Denmark student visa?", answer: "After receiving your admission, you apply online with form ST1 on nyidanmark.dk, pay the DKK 3,060 fee, submit your documents, give biometrics within 14 days, and await SIRI\u2019s decision, normally 2 months." },
    { question: "What financial proof is needed for a Denmark student visa?", answer: "You must show DKK 7,426 per month of study (2026 level), up to DKK 89,112 for studies over a year, with bank statements no more than 30 days old or a granted scholarship or loan. Paying your first semester\u2019s tuition can replace this." },
    { question: "Is accommodation easy to find in Denmark?", answer: "Universities in Denmark often assist international students with accommodation options, including student housing and residences. It is recommended to apply early, especially in cities like Copenhagen where demand is high." },
    { question: "Can I stay in Denmark after completing my studies?", answer: "Yes. After a completed bachelor\u2019s or master\u2019s you can apply for a job-seeking residence permit. For applications from October 1, 2026 it can be granted for up to 1 year (earlier applications could get up to 3 years). Check nyidanmark.dk." },
  ],
};

export default async function StudyInDenmarkPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "denmark" });
  return <CountryPageTemplate data={denmarkData} blogPosts={blogPosts} />;
}
