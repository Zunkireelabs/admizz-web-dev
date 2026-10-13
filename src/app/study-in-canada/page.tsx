import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Canada - Admizz Education",
  description:
    "Study in Canada with top universities, expert guidance, visa assistance, and scholarships. Begin your path to global education today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-canada",
  },
  openGraph: {
    title: "Study in Canada - Admizz Education",
    description:
      "Study in Canada with top universities, expert guidance, visa assistance, and scholarships. Begin your path to global education today!",
    url: "https://admizzeducation.com/study-in-canada",
    siteName: "Admizz Education",
    images: ["/images/og/untitled-design-80.webp"],
    type: "website",
  },
};

const canadaData: CountryPageData = {
  countryName: "Canada",
  countryCategorySlug: "canada",
  nepalGuide: {
    href: "/study-in-canada-from-nepal",
    title: "Applying from Nepal? Read the Nepal-specific guide to studying in Canada",
    text: "Costs, the student visa process, intakes, test scores and scholarships for Nepali students.",
  },
  heroHeading: "STUDY IN CANADA",
  heroSubheading: "Build Your Global Career With World-Class Canadian Education",
  heroDescription: "Canada is one of the most popular study destinations for international students, offering globally recognised degrees, high academic standards, affordable tuition, and promising post-study work opportunities. From university selection and application support to scholarships, visas, and pre-departure guidance, Admizz Education helps you secure admission to top Canadian universities with complete confidence and clarity.",
  heroBackground: "/images/hero/canada-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Ottawa" },
    { label: "Language", value: "English & French" },
    { label: "Dialing Code", value: "+1" },
    { label: "Currency", value: "CAD $" },
    { label: "Population", value: "39+ Million" },
    { label: "Study permit fee", value: "CAD 150" },
    { label: "Living funds to show", value: "CAD 23,448" },
    { label: "Tuition fee", value: "CAD $15,000" },
  ],
  whyStudyTitle: "Why Study In Canada ?",
  whyStudyIntro:
    "Canada is one of the world's top study-abroad destinations known for high-quality education, globally recognised degrees, affordable tuition fees, and a safe, welcoming environment.",
  benefits: [
    { title: "World-Class Education", icon: "/images/icons/school-1.webp", description: "Canadian institutions deliver globally recognised programs with exceptional academic and research standards." },
    { title: "Affordable Study Costs", icon: "/images/icons/scholarship-108.webp", description: "Students enjoy lower tuition fees and manageable living expenses compared internationally." },
    { title: "Safe Multicultural Environment", icon: "/images/icons/visa-1.webp", description: "Canada offers welcoming communities supporting diverse international students with inclusivity." },
    { title: "Strong Career Opportunities", icon: "/images/icons/consultation.webp", description: "Internships, co-op programs, and industry links boost professional growth significantly." },
    { title: "Easy PR Pathway", icon: "/images/icons/visa-108.webp", description: "Post-study immigration routes help students achieve permanent residency more smoothly." },
    { title: "High Quality Life", icon: "/images/icons/accomodation-108.webp", description: "Vibrant cities and breathtaking landscapes create enjoyable, enriching student lifestyle experiences." },
  ],
  admissionTitle: "Admission Requirement For Studying In Canada",
  admissionIntro:
    "Canada is one of the most popular destinations for international students, offering world-class education, globally recognised degrees, and excellent post-study opportunities.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in Canada",
      intro: "To secure admission into a Canadian university or college, students must meet specific academic, language, and documentation requirements.",
      documents: ["Academic transcripts and mark sheets", "English language proficiency test scores", "Statement of Purpose (SOP)", "Letters of Recommendation (LORs)", "Valid passport", "Proof of funds (financial documents)", "Updated resume or CV", "Work experience (program-specific)"],
    },
    {
      title: "Documents Required for Your Letter of Acceptance and Study Permit",
      intro: "To secure your Canadian Letter of Acceptance, students must submit essential academic, identity, and financial documents ensuring eligibility and readiness for study permit processing.",
      documents: ["Valid passport", "Academic transcripts and certificates", "English language test score (IELTS/PTE/TOEFL)", "Application form and offer letter", "Proof of tuition fee payment (if required)", "Proof of funds (GIC or bank statement)", "Passport-size photographs", "Statement of Purpose (SOP)"],
    },
    {
      title: "Visa Documentation",
      intro: "Preparing the right documents is essential for a smooth Canadian study permit application, ensuring fast processing, strong eligibility, and successful visa approval.",
      documents: ["Valid passport", "Letter of Acceptance (LOA) from a DLI", "Proof of funds (GIC / bank statements / loan letter)", "Tuition fee payment receipts", "Passport-size photographs (as per IRCC specifications)", "English language test score (IELTS/PTE/TOEFL)"],
    },
  ],
  intakes: {
    title: "Academic Intakes in the Canada",
    intro: "Canada offers multiple academic intakes each year, giving international students flexibility to choose the best time to begin their studies.",
    items: [
      { name: "Fall Intake (September)", details: [] },
      { name: "Winter Intake (January)", details: [] },
      { name: "Summer Intake (May)", details: [] },
    ],
  },
  universities: [
    { name: "University of Toronto", logo: "/images/universities/canada/university-of-toronto.webp" },
    { name: "McGill University", logo: "/images/universities/canada/mcgill-university.webp" },
    { name: "University of British Columbia", logo: "/images/universities/canada/university-of-british-columbia.webp" },
    { name: "University of Alberta", logo: "/images/universities/canada/university-of-alberta.webp" },
    { name: "McMaster University", logo: "/images/universities/canada/mcmaster-university.webp" },
    { name: "University of Waterloo", logo: "/images/universities/canada/university-of-waterloo.webp" },
    { name: "Queen's University", logo: "/images/universities/canada/queens-university.webp" },
    { name: "Simon Fraser University", logo: "/images/universities/canada/simon-fraser-university.webp" },
    { name: "Dalhousie University", logo: "/images/universities/canada/dalhousie-university.webp" },
    { name: "Western University", logo: "/images/universities/canada/western-university.webp" },
  ],
  costTitle: "Cost of Studying in Canada",
  costIntro:
    "Studying in Canada is affordable compared to many top study destinations. The total cost depends on tuition fees, living expenses, health insurance, travel costs, and personal lifestyle.",
  costTable: [
    { program: "Undergraduate", fee: "CAD 15,000 – 30,000" },
    { program: "Postgraduate", fee: "CAD 15,000 – 35,000" },
    { program: "Diploma / Certificate", fee: "CAD 10,000 – 22,000" },
    { program: "MBA / Executive Programs", fee: "CAD 30,000 – 60,000" },
    { program: "Living funds to show for the study permit (single applicant, applications from 1 Sep 2026)", fee: "CAD 23,448" },
    { program: "Study permit application fee", fee: "CAD 150" },
    { program: "Health Insurance", fee: "CAD 600 – 900 per year" },
  ],
  costNote: "Costs vary by province. Toronto and Vancouver are higher; smaller cities are more affordable.",
  visaTitle: "Canada Student Visa Process",
  visaIntro:
    "Dreaming of studying in Canada? The journey begins with understanding the student visa (study permit) process.",
  visaSteps: [
    { title: "Choose Course & College", description: "Select a DLI-approved program wisely." },
    { title: "Apply to Institution", description: "Submit application with required documents." },
    { title: "Receive Offer Letter", description: "Get a conditional or final acceptance." },
    { title: "Pay Tuition Deposit", description: "Secure your seat by paying fees." },
    { title: "Gather Visa Documents", description: "Prepare financial proof, passport, transcripts." },
    { title: "Complete Medical Exam", description: "Take IRCC-approved immigration medical exam." },
    { title: "Submit Biometrics", description: "Schedule and complete biometrics at VAC." },
    { title: "Apply for Study Permit", description: "Upload documents and submit online application." },
    { title: "Wait for Processing", description: "IRCC reviews your study permit application." },
    { title: "Receive Visa Approval", description: "Get your POE letter from IRCC." },
    { title: "Fly to Canada", description: "Carry all documents and travel safely." },
    { title: "Get Study Permit", description: "Receive permit at the port of entry." },
  ],
  faqItems: [
    { question: "Is Canada a good country for international students?", answer: "Yes, Canada is one of the top study destinations offering quality education, affordable tuition, safety, and strong work opportunities." },
    { question: "What are the admission requirements to study in Canada?", answer: "Requirements include academic transcripts, English proficiency test scores, passport, SOP, LORs, and financial proof." },
    { question: "How much does it cost to study in Canada?", answer: "Tuition ranges from CAD 10,000–35,000 per year, depending on program and university." },
    { question: "Can international students work while studying in Canada?", answer: "Yes. Eligible international students can work off campus up to 24 hours a week during the academic term and full-time during scheduled breaks, according to IRCC. To work off campus you must be a full-time student in a program of at least 6 months at a designated learning institution, have a study permit that allows off-campus work, and have a social insurance number. Working more than the limit can cost you your student status." },
    { question: "What is a provincial attestation letter (PAL) for a Canada study permit?", answer: "In most cases you need a provincial or territorial attestation letter (PAL/TAL) from your school before you apply for a study permit, and you usually have to accept your offer and pay part or all of your tuition to get it. If you are studying in Quebec you need a Quebec Acceptance Certificate (CAQ) instead. Since 2026 certain master's and doctoral-level students are exempt from the attestation letter requirement, so check IRCC to see whether your program qualifies. The Student Direct Stream ended on 8 November 2024, so all applicants now apply through the regular study permit process." },
    { question: "How long does it take to get a Canada study visa?", answer: "Processing times vary by country and by time of year. Check the current estimate for Nepal on the IRCC website, and apply as early as you can." },
    { question: "Is IELTS mandatory to study in Canada?", answer: "IELTS is accepted widely but not mandatory; some institutions accept PTE, TOEFL, or offer ESL pathway programs." },
    { question: "What is a GIC for Canada student visa?", answer: "A GIC is one way students show their living funds, but IRCC accepts other proof too. For a single applicant you must show CAD 22,895 for applications made between 1 January 2025 and 31 August 2026, and CAD 23,448 for applications from 1 September 2026, in addition to your first-year tuition and travel costs." },
    { question: "Can students get PR after studying in Canada?", answer: "Yes, through pathways like PGWP + Express Entry, PNP programs, and work experience." },
    { question: "What is the PGWP and how long is it valid?", answer: "A post-graduation work permit (PGWP) can be valid from 8 months up to 3 years. For most programs the length depends on how long your program was, and a master's degree can get up to 3 years if the program was at least 8 months. Since 1 November 2024 most PGWP applicants must also give proof of language test results. Your permit cannot last longer than your passport is valid." },
  ],
};

export default async function StudyInCanadaPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "canada" });
  return <CountryPageTemplate data={canadaData} blogPosts={blogPosts} />;
}
