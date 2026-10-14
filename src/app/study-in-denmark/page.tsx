// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
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
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

const denmarkData: CountryPageData = {
  countryName: "Denmark",
  countryCategorySlug: "denmark",
  nepalGuide: {
    href: "/study-in-denmark-from-nepal",
    title: "Applying from Nepal? Read the Nepal-specific guide to studying in Denmark",
    text: "Costs, the student visa process, intakes, test scores and scholarships for Nepali students.",
  },
  heroHeading: "STUDY IN DENMARK",
  heroSubheading: "Access Innovative Education in a Welcoming European Hub",
  heroDescription: "Study in Denmark and access innovative education, industry-focused programs, and a welcoming international environment. Admizz Education guides you through course selection, admissions, documentation, and visa support — ensuring a smooth, informed journey toward world-class learning and future-ready opportunities in Denmark.",
  heroBackground: "/images/hero/denmark-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Copenhagen" },
    { label: "Language", value: "Danish" },
    { label: "Dialing Code", value: "+45" },
    { label: "Currency", value: "Danish Krone (DKK)" },
    { label: "Population", value: "About 6 Million" },
    { label: "Main Intake", value: "September" },
    { label: "Tuition (non-EU/EEA)", value: "DKK 45,000-120,000" },
    { label: "Permit fee", value: "DKK 3,060" },
  ],
  whyStudyTitle: "Why Study In Denmark ?",
  whyStudyIntro:
    "Study in Denmark for internationally recognised education, innovative teaching, English-taught programs, a job-seeking permit after graduation, and a safe, welcoming European study environment.",
  benefits: [
    { icon: "/images/icons/school-1.webp", title: "World-Ranked Universities", description: "Denmark is home to internationally recognised institutions known for research and industry-driven learning." },
    { icon: "/images/icons/knowledge.webp", title: "Innovative Student-Centric Teaching", description: "Danish education focuses on problem-solving, real-world applications, group work, and creative thinking\u2014skills highly valued worldwide." },
    { icon: "/images/icons/consultation.webp", title: "Strong Career Prospects", description: "Students in state-approved programmes may work 90 hours a month from September to May and full-time in June to August, and graduates can apply for a job-seeking residence permit." },
    { icon: "/images/icons/scholarship-108.webp", title: "Affordable Education & Scholarships", description: "Non-EU/EEA tuition is set by each institution, and limited Danish Government Scholarships can cover part or all of it." },
    { icon: "/images/icons/knowledge.webp", title: "English-Taught Programs & Global Exposure", description: "Many programs are taught entirely in English, enabling international students to study comfortably and compete globally." },
    { icon: "/images/icons/accomodation-108.webp", title: "High Quality of Life & Safety", description: "With a secure, clean, and modern environment, Denmark offers a secure, clean, and modern study environment." },
  ],
  admissionTitle: "Admission Requirements for Studying in Denmark",
  admissionIntro:
    "To study in Denmark, students must prepare essential academic, financial, and identity documents that prove eligibility, language proficiency, and funding. Proper documentation ensures smooth admission, visa approval, and timely university enrollment.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in Denmark",
      intro: "Prepare essential academic, financial, and identity documents to secure admission and a smooth student visa process for studying in Denmark.",
      documents: [
        "Valid passport",
        "Academic transcripts & certificates (10th, 12th, bachelor\u2019s/master\u2019s)",
        "English proficiency test score (IELTS/TOEFL or as your university accepts)",
        "Updated CV / Resume",
        "Statement of Purpose (SOP)",
        "Letters of Recommendation (LORs)",
        "University application form",
        "Proof of funds (bank statements/education loan)",
        "Tuition fee payment receipt (if applicable)",
        "Passport-size photographs",
      ],
    },
    {
      title: "Visa Documentation",
      intro: "Prepare essential academic, financial, and identity documents to ensure a smooth Denmark student visa process and successful entry into top Danish institutions.",
      documents: [
        "Valid passport",
        "Completed Denmark student visa application (ST1 form)",
        "Admission letter from a recognised Danish institution",
        "Financial proof of DKK 7,426 per month of study (2026 level), or first-semester tuition paid",
        "Academic transcripts & certificates",
        "English proficiency test score",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in Denmark",
    intro: "Denmark\u2019s main intake is September, and some programs also start in February. Bachelor\u2019s applicants from outside Denmark apply through optagelse.dk by 15 March, 12 noon (CET).",
    items: [
      { name: "September / Fall Intake (Major Intake)", details: [] },
      { name: "February Intake (Secondary Intake)", details: [] },
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
  ],
  costNote: "Note: Contact your university for the exact tuition fee. Living costs vary by city. Source: Study in Denmark and Nyidanmark.dk.",
  visaTitle: "Denmark Student Visa Process",
  visaIntro: "Understand the complete Denmark student visa process, from receiving your admission letter to securing your residence permit and travelling for studies.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select an accredited Danish institution and your preferred program." },
    { title: "Receive Admission Offer", description: "Obtain an official acceptance letter from the university." },
    { title: "University Initiates ST1 Form", description: "Your institution completes Part A of the Denmark ST1 visa application." },
    { title: "Complete ST1 (Part B)", description: "Fill in your section of the ST1 application and upload required details." },
    { title: "Pay Visa Application Fee", description: "Pay the residence permit fee, DKK 3,060 at the 2026 rate." },
    { title: "Prepare Financial Documents", description: "Arrange DKK 7,426 per month of study (2026 level) in bank statements or a granted scholarship or loan, or pay your first semester's tuition." },
    { title: "Submit Required Documents", description: "Upload the documents listed in your online application, including your funds proof." },
    { title: "Book Biometrics Appointment", description: "Arrange to give biometrics at a Danish diplomatic mission or application centre." },
    { title: "Attend Biometrics", description: "Give fingerprints and a photo within 14 days of submitting the online application." },
    { title: "Await Visa Decision", description: "SIRI normally takes 2 months, up to 3 months if more information is needed." },
    { title: "Receive Residence Permit", description: "Get your Denmark residence permit confirmation and entry approval." },
    { title: "Travel to Denmark", description: "Carry all essential documents and arrive before your program start date." },
    { title: "Register for CPR", description: "Register after arrival to get your CPR number, as your institution and the Danish authorities advise." },
  ],
  faqItems: [
    { question: "Is Denmark good for international students?", answer: "Yes. Denmark offers internationally recognised universities, English-taught programs, a practice-oriented teaching style, and a job-seeking residence permit after graduation. Check each program\u2019s fee and requirements." },
    { question: "What are the admission requirements for studying in Denmark?", answer: "Students typically need a valid passport, academic transcripts and certificates, English proficiency scores (IELTS/TOEFL or as the university accepts), a Statement of Purpose, Letters of Recommendation, proof of funds, and a completed university application form." },
    { question: "What is the cost of studying in Denmark?", answer: "Study in Denmark lists non-EU/EEA tuition at DKK 45,000-120,000 per year, set by each institution. The residence permit fee is DKK 3,060, and you must show DKK 7,426 per month of study (2026 level)." },
    { question: "Do I need IELTS to study in Denmark?", answer: "English-taught programs require English at Danish \u2018English B\u2019 level, which Study in Denmark equates to IELTS 6.5 or TOEFL iBT 79-93. Some programs require \u2018English A\u2019 (IELTS 7.0, TOEFL iBT 94-101). Each institution sets its own equivalents." },
    { question: "What are the main intakes in Denmark?", answer: "The main intake is September, and some programs also start in February. Bachelor\u2019s applicants from outside Denmark apply through optagelse.dk by 15 March, 12 noon (CET). Check each program for its own dates." },
    { question: "Can I work while studying in Denmark?", answer: "Yes. Students in state-approved programs may work 90 hours per month from September to May and full-time in June, July and August, according to the Danish immigration service." },
    { question: "How do I apply for a Denmark student visa?", answer: "After receiving your admission, you apply online with form ST1 on nyidanmark.dk, pay the DKK 3,060 fee, submit your documents, give biometrics within 14 days, and await SIRI\u2019s decision, normally 2 months." },
    { question: "What financial proof is needed for a Denmark student visa?", answer: "You must show DKK 7,426 per month of study (2026 level), up to DKK 89,112 for studies over a year, with bank statements no more than 30 days old or a granted scholarship or loan. Paying your first semester\u2019s tuition can replace this." },
    { question: "Is accommodation easy to find in Denmark?", answer: "Housing options and support vary by university, so ask your institution early. Study in Denmark lists typical monthly rent of DKK 3,000-6,500, and demand is usually higher in larger cities." },
    { question: "Can I stay in Denmark after completing my studies?", answer: "Yes. After a completed bachelor\u2019s or master\u2019s you can apply for a job-seeking residence permit. For applications from 1 October 2026 it can be granted for up to 1 year (earlier applications could get up to 3 years). Check nyidanmark.dk." },
  ],
};

export default async function StudyInDenmarkPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "denmark" });
  return <CountryPageTemplate data={denmarkData} blogPosts={blogPosts} />;
}
