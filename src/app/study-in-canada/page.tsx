import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";

export const metadata: Metadata = {
  title: "Study in Canada - Admizz Education",
  description:
    "Study in Canada with top universities, expert guidance, visa assistance, and scholarships. Begin your path to global education today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-canada/",
  },
  openGraph: {
    title: "Study in Canada - Admizz Education",
    description:
      "Study in Canada with top universities, expert guidance, visa assistance, and scholarships. Begin your path to global education today!",
    url: "https://admizzeducation.com/study-in-canada/",
    siteName: "Admizz Education",
    images: ["/images/og/untitled-design-80.png"],
    type: "website",
  },
};

const canadaData: CountryPageData = {
  countryName: "Canada",
  heroHeading: "STUDY IN CANADA",
  heroSubheading:
    "Canada is one of the most popular study destinations for international students, offering globally recognised degrees, high academic standards, affordable tuition, and promising post-study work opportunities.",
  quickFacts: [
    { label: "Capital", value: "Ottawa" },
    { label: "Language", value: "English & French" },
    { label: "Dialing Code", value: "+1" },
    { label: "Currency", value: "CAD $" },
    { label: "Population", value: "39+ Million" },
    { label: "Universities", value: "359" },
    { label: "Intl. Students", value: "485,555" },
    { label: "Tuition fee", value: "CAD $15,000" },
  ],
  whyStudyTitle: "Why Study In Canada ?",
  whyStudyIntro:
    "Canada is one of the world's top study-abroad destinations known for high-quality education, globally recognised degrees, affordable tuition fees, and a safe, welcoming environment.",
  benefits: [
    { title: "World-Class Education", description: "Canadian institutions deliver globally recognised programs with exceptional academic and research standards." },
    { title: "Affordable Study Costs", description: "Students enjoy lower tuition fees and manageable living expenses compared internationally." },
    { title: "Safe Multicultural Environment", description: "Canada offers welcoming communities supporting diverse international students with inclusivity." },
    { title: "Strong Career Opportunities", description: "Internships, co-op programs, and industry links boost professional growth significantly." },
    { title: "Easy PR Pathway", description: "Post-study immigration routes help students achieve permanent residency more smoothly." },
    { title: "High Quality Life", description: "Vibrant cities and breathtaking landscapes create enjoyable, enriching student lifestyle experiences." },
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
      title: "Documents Required for CAS (Confirmation of Acceptance for Studies)",
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
  universities: [],
  costTitle: "Cost of Studying in Canada",
  costIntro:
    "Studying in Canada is affordable compared to many top study destinations. The total cost depends on tuition fees, living expenses, health insurance, travel costs, and personal lifestyle.",
  costTable: [
    { program: "Undergraduate", fee: "CAD 15,000 – 30,000" },
    { program: "Postgraduate", fee: "CAD 15,000 – 35,000" },
    { program: "Diploma / Certificate", fee: "CAD 10,000 – 22,000" },
    { program: "MBA / Executive Programs", fee: "CAD 30,000 – 60,000" },
    { program: "Living Expenses", fee: "CAD 12,000 – 18,000 per year" },
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
    { question: "Can international students work while studying in Canada?", answer: "Yes, students can work 20 hours per week and full-time during scheduled breaks." },
    { question: "What is the Student Direct Stream (SDS) for Canada?", answer: "SDS is a fast-track visa process for students from eligible countries with stricter financial requirements." },
    { question: "How long does it take to get a Canada study visa?", answer: "Processing time is usually 4 to 12 weeks, depending on country and season." },
    { question: "Is IELTS mandatory to study in Canada?", answer: "IELTS is accepted widely but not mandatory; some institutions accept PTE, TOEFL, or offer ESL pathway programs." },
    { question: "What is a GIC for Canada student visa?", answer: "A Guaranteed Investment Certificate (GIC) of CAD 20,635 proves your living expense funds for the first year." },
    { question: "Can students get PR after studying in Canada?", answer: "Yes, through pathways like PGWP + Express Entry, PNP programs, and work experience." },
    { question: "What is the PGWP and how long is it valid?", answer: "PGWP allows graduates to work in Canada for up to 3 years, depending on program length." },
  ],
};

export default function StudyInCanadaPage() {
  return <CountryPageTemplate data={canadaData} />;
}
