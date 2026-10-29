import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in the UK - Admizz Education",
  description:
    "Study in the UK at world-renowned universities with expert guidance, visa support, and scholarship options. Apply now for upcoming intakes!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-the-uk",
  },
  openGraph: {
    title: "Study in the UK - Admizz Education",
    description:
      "Study in the UK at world-renowned universities with expert guidance, visa support, and scholarship options. Apply now for upcoming intakes!",
    url: "https://admizzeducation.com/study-in-the-uk",
    siteName: "Admizz Education",
    images: [
      {
        url: "/images/og/countries/study-in-the-uk.jpg",
        width: 1200,
        height: 630,
        alt: "Study in the UK - Admizz Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in the UK - Admizz Education",
    description:
      "Study in the UK at world-renowned universities with expert guidance, visa support, and scholarship options. Apply now for upcoming intakes!",
    images: ["/images/og/countries/study-in-the-uk.jpg"],
  },
};

const ukData: CountryPageData = {
  countryName: "the UK",
  countryCategorySlug: "uk",
  heroHeading: "STUDY IN THE UK",
  flagColors: ["#012169", "#C8102E"],
  heroSubheading: "Shape Your Future at World-Class Universities",
  heroDescription: "Choosing the UK for higher studies opens doors to international exposure, employment opportunities, and globally recognized qualifications. From university selection and application support to scholarships, visas, and pre-departure guidance, Admizz Education helps you secure admission to top UK universities with complete confidence.",
  heroBackground: "/images/hero/uk-hero.webp",
  quickFacts: [
    { label: "Capital", value: "London" },
    { label: "Language", value: "English" },
    { label: "Dialing Code", value: "+44" },
    { label: "Currency", value: "Pound sterling (GBP)" },
    { label: "Population", value: "67M+" },
    { label: "Universities", value: "165+" },
    { label: "Intl. Students", value: "685,000+" },
    { label: "Tuition fee", value: "From £11,000/yr" },
  ],
  whyStudyTitle: "Why Study in the UK?",
  whyStudyIntro:
    "Choosing the UK for higher studies opens doors to international exposure, employment opportunities, and globally recognized qualifications.",
  benefits: [
    {
      title: "World-Renowned Universities",
      description:
        "Coventry, Greenwich, Ulster, BPP, Sunderland and many more globally recognised universities.",
      icon: "/images/icons/school-1.webp",
    },
    {
      title: "Affordable & Shorter Program Duration",
      description: "1-year master's and 3-year bachelor's degrees.",
      icon: "/images/icons/scholarship-108.webp",
    },
    {
      title: "Post-Study Work Visa (Graduate Route)",
      description:
        "Stay and work in the UK after graduation: 18 months for bachelor's and master's graduates (applications from 1 January 2027), 3 years for PhD graduates.",
      icon: "/images/icons/visa-108.webp",
    },
    {
      title: "Flexible Course Options",
      description:
        "Over 50,000+ courses across STEM, business, health, arts, media, aviation & more.",
      icon: "/images/icons/knowledge.webp",
    },
    {
      title: "High Employability",
      description:
        "UK graduates are preferred by global employers for their skills and academic quality.",
      icon: "/images/icons/consultation.webp",
    },
    {
      title: "Safe, Diverse & Student-Friendly",
      description:
        "Over 685,000 international students study in the UK.",
      icon: "/images/icons/visa-1.webp",
    },
  ],
  admissionTitle: "Admission Requirements for Studying in the UK",
  admissionIntro:
    "Applying to study in the UK involves a clear set of academic, documentation, and visa-related steps. To help students understand the process better, here is a complete guide to the admission requirements you must prepare before starting your UK education journey.",
  documentSections: [
    {
      title: "Documents Required for Admission",
      intro:
        "Universities in the UK require essential academic and personal documents to evaluate your eligibility. The commonly required documents include:",
      documents: [
        "Academic transcripts (secondary/high school, diploma, bachelor's, master's—whichever applies)",
        "Degree certificates (if applying for postgraduate programs)",
        "Passport copy (front and back)",
        "Updated CV / Resume",
        "Statement of Purpose (SOP) explaining your career goals and program choice",
        "Letters of Recommendation (LORs) — usually 1 to 2 from teachers or employers",
        "English language test scores (IELTS, PTE, TOEFL, or Medium of Instruction letter if accepted)",
        "Work experience certificates (if required by the university or program)",
      ],
    },
    {
      title: "Documents Required for CAS (Confirmation of Acceptance for Studies)",
      intro:
        "Once you receive a conditional or unconditional offer, the university will issue a CAS letter, which is mandatory for the UK student visa. To receive CAS, you must submit:",
      documents: [
        "CAS request form (provided by the university)",
        "Tuition fee payment receipt (partial or initial deposit as required)",
        "Bank statements showing required maintenance funds for 28 days",
        "Proof of living expenses as per UKVI requirements",
        "Sponsor letter (if sponsored by parents or guardians)",
        "Final academic documents (once conditions are met)",
      ],
    },
    {
      title: "Visa Documentation (UK Student Visa)",
      intro:
        "For your UK Student Visa, the following documents are required:",
      documents: [
        "Valid passport",
        "CAS letter from the university",
        "Confirmation of financial support (bank statements, education loan approval letter, savings or term deposits if accepted)",
        "Tuition fee payment receipts",
        "Proof of English proficiency (IELTS/PTE/TOEFL)",
        "Academic documents (all certificates and academic records)",
        "UKVI application form",
        "Visa fee receipt and IHS (Immigration Health Surcharge) payment",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in the UK",
    intro:
      "The UK offers three major academic intakes, giving flexibility to students:",
    items: [
      {
        name: "September / Fall Intake (Major Intake)",
        details: [
          "Largest intake with maximum course availability.",
          "High competition and most preferred by international students.",
        ],
      },
      {
        name: "January / Winter Intake",
        details: [
          "Second-largest intake",
          "Ideal for students who miss the September deadline",
        ],
      },
      {
        name: "May / Summer Intake",
        details: [
          "Limited courses (mainly MBA, IT, healthcare, and selected programs)",
          "Best for students seeking faster admission with fewer applicants",
        ],
      },
    ],
  },
  universities: [
    { name: "University of Roehampton", logo: "/images/universities/uk/University-of-Roehampton.webp" },
    { name: "BPP University", logo: "/images/universities/uk/BPP-University.webp" },
    { name: "University of Greenwich", logo: "/images/universities/uk/University-of-Greenwich.webp" },
    { name: "Buckinghamshire New University", logo: "/images/universities/uk/Buckinghamshire-New-University.webp" },
    { name: "Coventry University", logo: "/images/universities/uk/Coventry-University.webp" },
    { name: "Ulster University", logo: "/images/universities/uk/Ulster-University.webp" },
    { name: "Health Sciences University", logo: "/images/universities/uk/Health-Sciences-University.webp" },
    { name: "Ravensbourne University London", logo: "/images/universities/uk/Ravensbourne-University-London.webp" },
    { name: "University of Sunderland", logo: "/images/universities/uk/University-of-Sunderland.webp" },
    { name: "University of East London", logo: "/images/universities/uk/University-of-East-London.webp" },
    { name: "The University of Law", logo: "/images/universities/uk/The-University-of-Law.webp" },
    { name: "University of Worcester", logo: "/images/universities/uk/University-of-Worcester.webp" },
    { name: "University of West London", logo: "/images/universities/uk/University-of-West-London.webp" },
    { name: "University of the West of Scotland", logo: "/images/universities/uk/University-of-the-West-of-Scotland.webp" },
    { name: "York St John University", logo: "/images/universities/uk/York-St-John-University.webp" },
  ],
  costTitle: "Cost of Studying in the UK",
  costIntro:
    "Planning to Study in the UK requires a clear understanding of the overall costs involved.",
  costTable: [
    { program: "Undergraduate", fee: "£11,000 – £20,000" },
    { program: "Postgraduate", fee: "£12,000 – £25,000" },
    { program: "MBA / Professional", fee: "£20,000 – £35,000+" },
    { program: "Living Expenses (London)", fee: "£1,529 per month" },
    { program: "Living Expenses (outside London)", fee: "£1,171 per month" },
    { program: "Health Surcharge (NHS)", fee: "£776 per year" },
  ],
  costNote:
    "Living expenses are the UKVI funds requirement for up to 9 months. Your total costs vary by city. London is higher; smaller cities are more budget friendly.",
  visaTitle: "UK Student Visa Process",
  visaIntro:
    "Applying for a UK Student visa becomes simple when you understand each step clearly. Below is a complete, easy-to-follow breakdown of the UK student visa process.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select a UKVI-approved institution and the right course." },
    { title: "Submit Application", description: "Apply through UCAS or university portals with required documents." },
    { title: "Receive Offer Letter", description: "Get conditional or unconditional offer based on your eligibility." },
    { title: "Meet Financial Requirements", description: "Maintain sufficient funds for tuition and living expenses." },
    { title: "Complete TB Test", description: "Take your TB test at a UKVI-approved centre." },
    { title: "Request CAS", description: "Submit documents and fee receipts to receive your CAS number." },
    { title: "Prepare Visa Documents", description: "Collect CAS, bank proof, TB certificate, transcripts, and passport." },
    { title: "Apply for Visa", description: "Fill UKVI visa form and pay visa + IHS fees." },
    { title: "Book Biometrics", description: "Schedule your biometrics appointment at a visa application centre." },
    { title: "Attend Biometrics Appointment", description: "Have your photo and fingerprints taken and submit your documents." },
    { title: "Wait for Decision", description: "You will usually get a decision within 3 weeks." },
    { title: "Collect Passport", description: "Get your passport back and your visa decision by email." },
    { title: "Travel to UK", description: "Carry all essential documents when flying to the UK." },
    { title: "Access Your eVisa", description: "Set up your UKVI account and access your eVisa." },
  ],
  faqItems: [
    { question: "Is the UK a good place for international students?", answer: "Yes, the UK is one of the best study destinations due to its world-class universities, high-quality teaching, global recognition, and excellent career opportunities." },
    { question: "What are the requirements to study in the UK for international students?", answer: "You generally need academic transcripts, English proficiency scores (IELTS/PTE), a valid passport, Statement of Purpose, Letters of Recommendation, and proof of funds." },
    { question: "How much does it cost to study in the UK?", answer: "Tuition fees typically range from £10,000 to £25,000 per year, depending on the course and university. For living costs, UKVI requires you to show £1,529 per month in London or £1,171 per month elsewhere, for up to 9 months." },
    { question: "What IELTS score is required for UK universities?", answer: "Most universities require an overall IELTS score of 6.0–6.5, but some top programs may ask for 7.0 or higher." },
    { question: "Can I work while studying in the UK?", answer: "Yes. On a degree-level course you can usually work up to 20 hours per week during term time (10 hours for courses below degree level), and full-time during official holidays." },
    { question: "What is the UK student visa processing time?", answer: "If you apply from outside the UK, you will usually get a decision on your Student visa within 3 weeks." },
    { question: "Is it easy to get a part-time job in the UK as a student?", answer: "Yes, the UK offers plenty of part-time job opportunities in retail, hospitality, customer service, and campus roles." },
    { question: "Can I stay in the UK after completing my studies?", answer: "Yes. The Graduate Route (Post-Study Work Visa) lets you stay and work after your degree: 18 months for bachelor's and master's graduates applying from 1 January 2027, and 3 years for PhD graduates." },
    { question: "What are the best courses to study in the UK?", answer: "Popular courses include MBA, Data Science, Engineering, Healthcare, Law, Computer Science, Business Analytics, Pharmacy, and Finance." },
    { question: "Do UK universities accept gaps in education?", answer: "Yes, most UK universities accept study gaps if properly justified with experience letters, family reasons, medical documents, or valid explanations." },
  ],
};

export default async function StudyInUKPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "uk" });
  return <CountryPageTemplate data={ukData} blogPosts={blogPosts} />;
}
