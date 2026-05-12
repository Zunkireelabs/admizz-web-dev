import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in France - Admizz Education",
  description:
    "Study in France at prestigious universities with expert guidance, visa support, and scholarships. Begin your international journey today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-france",
  },
  openGraph: {
    title: "Study in France - Admizz Education",
    description:
      "Study in France at prestigious universities with expert guidance, visa support, and scholarships. Begin your international journey today!",
    url: "https://admizzeducation.com/study-in-france",
    siteName: "Admizz Education",
    images: ["/images/og/france.webp"],
    type: "website",
  },
};

const franceData: CountryPageData = {
  countryName: "France",
  countryCategorySlug: "france",
  heroHeading: "STUDY IN FRANCE",
  heroSubheading: "Experience Prestigious Universities and Rich Cultural Heritage",
  heroDescription: "Study in France and experience prestigious universities, innovative programs, and a vibrant cultural landscape. Admizz Education supports you with course guidance, admissions, documentation, and visa assistance — ensuring a smooth, confident journey toward top-quality education and international opportunities in France.",
  heroBackground: "/images/hero/france-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Paris" },
    { label: "Language", value: "French English" },
    { label: "Dialing Code", value: "+33" },
    { label: "Currency", value: "Euro (\u20AC)" },
    { label: "Population", value: "67+ Million" },
    { label: "Universities", value: "43+" },
    { label: "Intl. Students", value: "485,555" },
    { label: "Tuition fee", value: "\u20AC8,448 \u2013 \u20AC27,000" },
  ],
  whyStudyTitle: "Why Study In France?",
  whyStudyIntro:
    "France is one of the most preferred study-abroad destinations for students seeking world-class education, affordable tuition, and unmatched cultural exposure. With globally ranked universities, innovative programs, and strong career opportunities across Europe, studying in France opens doors to a successful international future.",
  benefits: [
    {
      icon: "/images/icons/school-1.webp",
      title: "World-Class Education",
      description:
        "Home to top universities and Grandes \u00C9coles known for excellence in engineering, business, fashion, arts, and research.",
    },
    {
      icon: "/images/icons/scholarship-108.webp",
      title: "Affordable Tuition Fees",
      description:
        "Public universities offer highly subsidised education for international students.",
    },
    {
      icon: "/images/icons/knowledge.webp",
      title: "English-Taught Programs",
      description:
        "Thousands of Bachelor\u2019s and Master\u2019s degrees are available fully in English.",
    },
    {
      icon: "/images/icons/accomodation-108.webp",
      title: "Safe & Student-Friendly Country",
      description:
        "Vibrant student cities like Paris, Lyon, Toulouse, Lille, and Bordeaux.",
    },
    {
      icon: "/images/icons/consultation.webp",
      title: "Strong Career Opportunities",
      description:
        "Access internship pathways and post-study work opportunities across the EU.",
    },
    {
      icon: "/images/icons/visa-1.webp",
      title: "Cultural & Global Exposure",
      description:
        "Rich heritage, world-famous cuisine, and a multicultural learning environment.",
    },
  ],
  admissionTitle: "Admission Requirements for Studying in France",
  admissionIntro:
    "Discover the essential documents required to study in France, including academic records, ID proof, financial statements, language scores, and visa paperwork for a smooth and successful admission process.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in France",
      intro:
        "Prepare your France study application with essential documents, including academic transcripts, passport, language scores, SOP, LORs, financial proof, medical insurance, and visa papers for a smooth admission process.",
      documents: [
        "Valid Passport",
        "Academic Transcripts (10th, 12th, Bachelor\u2019s, Master\u2019s if applicable)",
        "Updated CV / Resume",
        "Statement of Purpose (SOP)",
        "Letters of Recommendation (LORs)",
        "English Proficiency Test Scores (IELTS/TOEFL/PTE) \u2013 if required",
        "French Language Test Scores (TCF/DELF/DALF) \u2013 optional",
        "Proof of Funds / Bank Statements",
        "Visa Application Documents (VFS / Consulate)",
      ],
    },
    {
      title: "Documents Required for CAS (Confirmation of Acceptance for Studies)",
      intro:
        "Prepare your France study application with essential documents, including passport, academic transcripts, language scores, SOP, LORs, proof of funds, medical insurance, Campus France documents, and visa papers for smooth admission.",
      documents: [
        "Valid Passport",
        "Academic Transcripts",
        "Resume / CV",
        "SOP",
        "LORs",
        "English Proficiency Test Scores",
        "French Language Test Scores",
        "Campus France Application Form & Payment Receipt",
        "Proof of Funds (Bank statements for 3\u20136 months)",
        "VFS Visa Application Documents",
        "University Offer Letter / Acceptance Letter",
      ],
    },
    {
      title: "Visa Documentation",
      intro:
        "Secure your France university offer letter by preparing key documents, including academic transcripts, passport, CV, SOP, LORs, language scores, and application forms for a smooth and successful admission process.",
      documents: [
        "Valid passport",
        "Academic Transcripts",
        "SOP",
        "LORs",
        "English Proficiency Scores",
        "French Language Scores",
        "Passport-size photographs",
        "Application Fee Payment Receipt",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in France",
    intro:
      "France offers two major academic intakes each year for international students, along with a few limited-specialisation rolling intakes. Understanding these intakes helps students plan applications, document submission, and visa timelines effectively.",
    items: [
      { name: "September / Fall Intake (Major Intake)", details: [] },
      { name: "January / Spring (Minor Intake)", details: [] },
      { name: "March April June (limited programs)", details: [] },
    ],
  },
  universities: [
    { name: "Sorbonne University", logo: "/images/universities/france/sorbonne-university.webp" },
    { name: "Universit\u00E9 PSL", logo: "/images/universities/france/universite-psl.svg" },
    { name: "\u00C9cole Polytechnique", logo: "/images/universities/france/ecole-polytechnique.webp" },
    { name: "Sciences Po", logo: "/images/universities/france/sciences-po.webp" },
    { name: "University of Paris-Saclay", logo: "/images/universities/france/university-of-paris-saclay.webp" },
    { name: "Universit\u00E9 Grenoble Alpes", logo: "/images/universities/france/universite-grenoble-alpes.webp" },
    { name: "Aix-Marseille University", logo: "/images/universities/france/aix-marseille-university.webp" },
    { name: "Universit\u00E9 de Strasbourg", logo: "/images/universities/france/universite-de-strasbourg.webp" },
    { name: "Universit\u00E9 de Bordeaux", logo: "/images/universities/france/universite-de-bordeaux.webp" },
    { name: "Universit\u00E9 de Lille", logo: "/images/universities/france/universite-de-lille.webp" },
  ],
  costTitle: "Cost of Studying in France",
  costIntro:
    "Understanding the cost of studying in France helps international students plan their budget effectively.",
  costTable: [
    { program: "Public University \u2013 Bachelor\u2019s", fee: "\u20AC2,770 per year" },
    { program: "Public University \u2013 Master\u2019s", fee: "\u20AC3,770 per year" },
    { program: "Private Universities / Grandes \u00C9coles", fee: "\u20AC6,000 \u2013 \u20AC25,000 per year" },
    { program: "MBA / Professional Programs", fee: "\u20AC20,000 \u2013 \u20AC45,000 per year" },
    { program: "Living Expenses \u2013 Paris", fee: "\u20AC12,000 \u2013 \u20AC16,800 per year" },
    { program: "Living Expenses \u2013 Other Cities", fee: "\u20AC8,400 \u2013 \u20AC12,000 per year" },
    { program: "Health Insurance", fee: "\u20AC200 \u2013 \u20AC500 per year" },
  ],
  costNote:
    "Note: Costs vary by city, program, and personal lifestyle. Verify exact tuition and fees with your chosen university and the French consulate / Campus France.",
  visaTitle: "France Student Visa Process",
  visaIntro:
    "Follow the simplified France student visa process\u2014from Campus France approval to biometric submission and visa collection\u2014for a smooth, stress-free study journey.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select your preferred French university and program based on eligibility and goals." },
    { title: "Create Campus France Account", description: "Register on the Campus France portal to begin your application process." },
    { title: "Upload Documents", description: "Submit academic transcripts, language scores, SOP, and other required documents online." },
    { title: "Pay Campus France Fee", description: "Complete the mandatory Campus France processing fee payment." },
    { title: "Attend Campus France Interview", description: "Appear for your Campus France interview to verify your academic profile and study plans." },
    { title: "Receive Campus France NOC", description: "Get your No Objection Certificate from Campus France after successful evaluation." },
    { title: "Apply on France-Visas Portal", description: "Submit your visa application online through the official France-Visas portal." },
    { title: "Book VFS Visa Appointment", description: "Schedule your visa appointment at the nearest VFS Global centre." },
    { title: "Prepare Visa Documents", description: "Collect and organize all required visa documents including financial proof and insurance." },
    { title: "Attend VFS Appointment", description: "Visit the VFS centre to submit biometrics, documents, and complete your visa application." },
    { title: "Wait for Visa Decision", description: "The French consulate reviews your application and processes the visa decision." },
    { title: "Collect Passport", description: "Receive your passport with the student visa stamp from VFS or courier." },
    { title: "Travel to France", description: "Carry all essential documents and travel to France before your program start date." },
    { title: "Validate VLS-TS Visa After Arrival", description: "Complete the mandatory VLS-TS visa validation process online within 3 months of arrival in France." },
  ],
  faqItems: [
    { question: "What are the eligibility requirements to study in France?", answer: "Students need academic transcripts, a valid passport, English or French proficiency scores, Statement of Purpose, Letters of Recommendation, and proof of funds." },
    { question: "How much does it cost to study in France?", answer: "Public university tuition ranges from \u20AC2,770 to \u20AC3,770 per year. Private institutions and Grandes \u00C9coles can cost \u20AC6,000 to \u20AC25,000 or more annually." },
    { question: "What documents are required for a France student visa?", answer: "You need a valid passport, academic transcripts, SOP, LORs, language proficiency scores, Campus France NOC, proof of funds, and passport-size photographs." },
    { question: "How long does the France student visa process take?", answer: "The visa process typically takes 2 to 4 weeks after submitting your application at VFS, depending on the consulate workload and completeness of documents." },
    { question: "Can I work while studying in France?", answer: "Yes, international students in France can work up to 964 hours per year (approximately 20 hours per week) during their studies." },
    { question: "What are the major academic intakes in France?", answer: "France has two major intakes: September/Fall (primary intake) and January/Spring (secondary intake), with limited programs available in March, April, and June." },
    { question: "Is studying in France affordable for international students?", answer: "Yes, France is one of the most affordable study destinations in Europe, with low public university tuition fees and various scholarships available for international students." },
    { question: "Do I need health insurance to study in France?", answer: "Yes, health insurance is mandatory for all international students in France. Students under 28 can enrol in the French social security system, and additional private insurance costs \u20AC200\u2013\u20AC500 per year." },
    { question: "How do I apply to study in France?", answer: "Start by selecting a university and program, create a Campus France account, upload documents, attend the Campus France interview, and then apply for your student visa through the France-Visas portal and VFS." },
    { question: "What are the job opportunities after studying in France?", answer: "France offers post-study work permits allowing graduates to stay and work. With strong industries in engineering, business, technology, fashion, and hospitality, graduates have excellent career prospects across the EU." },
  ],
};

export default async function StudyInFrancePage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "france" });
  return <CountryPageTemplate data={franceData} blogPosts={blogPosts} />;
}
