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
  heroHeading: "STUDY IN DENMARK",
  heroSubheading: "Access Innovative Education in a Welcoming European Hub",
  heroDescription: "Study in Denmark and access innovative education, industry-focused programs, and a welcoming international environment. Admizz Education guides you through course selection, admissions, documentation, and visa support — ensuring a smooth, informed journey toward world-class learning and future-ready opportunities in Denmark.",
  heroBackground: "/images/hero/denmark-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Copenhagen" },
    { label: "Language", value: "Danish" },
    { label: "Dialing Code", value: "+45" },
    { label: "Currency", value: "Danish Krone (DKK)" },
    { label: "Population", value: "5.8 Million" },
    { label: "Universities", value: "359" },
    { label: "Intl. Students", value: "485,555" },
    { label: "Tuition fee", value: "DKK 45,000" },
  ],
  whyStudyTitle: "Why Study In Denmark ?",
  whyStudyIntro:
    "Study in Denmark for world-class education, innovative teaching, affordable living, strong career opportunities, and a safe, welcoming European study environment.",
  benefits: [
    { icon: "/images/icons/school-1.webp", title: "World-Ranked Universities", description: "Denmark is home to globally recognised institutions known for academic excellence, cutting-edge research, and industry-driven learning." },
    { icon: "/images/icons/knowledge.webp", title: "Innovative Student-Centric Teaching", description: "Danish education focuses on problem-solving, real-world applications, group work, and creative thinking\u2014skills highly valued worldwide." },
    { icon: "/images/icons/consultation.webp", title: "Strong Career Prospects", description: "Denmark offers excellent internship pathways, part-time work options, and post-study opportunities in engineering, IT, life sciences, and sustainability." },
    { icon: "/images/icons/scholarship-108.webp", title: "Affordable Education & Scholarships", description: "International students benefit from reasonable tuition fees, strong scholarship options, and great value for quality education." },
    { icon: "/images/icons/knowledge.webp", title: "English-Taught Programs & Global Exposure", description: "Thousands of programs are taught entirely in English, enabling international students to study comfortably and compete globally." },
    { icon: "/images/icons/accomodation-108.webp", title: "High Quality of Life & Safety", description: "With a secure, clean, and modern environment, Denmark consistently ranks among the world\u2019s happiest and safest countries." },
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
        "Proof of funds (bank statements/education loan)",
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
        "Admission letter from a recognised Danish institution",
        "Proof of tuition fee payment",
        "Financial proof showing required living funds",
        "Academic transcripts & certificates",
        "English proficiency test score",
        "Passport-size photographs",
        "Statement of Purpose (optional but recommended)",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in Denmark",
    intro: "Denmark offers multiple academic intakes, allowing international students flexible entry into bachelor\u2019s and master\u2019s programs across top universities and specialized institutions.",
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
  costIntro: "Understand the complete cost of studying in Denmark, including tuition fees, living expenses, and additional student costs for a well-planned study journey.",
  costTable: [
    { program: "Undergraduate", fee: "\u20AC6,000 \u2013 \u20AC15,000" },
    { program: "Postgraduate", fee: "\u20AC8,000 \u2013 \u20AC20,000" },
    { program: "MBA / Professional Programs", fee: "\u20AC15,000 \u2013 \u20AC35,000+" },
    { program: "Living Expenses", fee: "\u20AC9,000 \u2013 \u20AC16,000 per year" },
    { program: "Health Insurance", fee: "\u20AC300 \u2013 \u20AC600 per year" },
  ],
  costNote: "Note: Costs vary by city. Copenhagen is more expensive; smaller cities like Odense or Aalborg are more affordable.",
  visaTitle: "Denmark Student Visa Process",
  visaIntro: "Understand the complete Denmark student visa process, from receiving your admission letter to securing your residence permit and travelling for studies.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select an accredited Danish institution and your preferred program." },
    { title: "Receive Admission Offer", description: "Obtain an official acceptance letter from the university." },
    { title: "University Initiates ST1 Form", description: "Your institution completes Part A of the Denmark ST1 visa application." },
    { title: "Complete ST1 (Part B)", description: "Fill in your section of the ST1 application and upload required details." },
    { title: "Pay Visa Application Fee", description: "Pay the Denmark residence permit fee online (~\u20AC300\u2013\u20AC350)." },
    { title: "Prepare Financial Documents", description: "Arrange proof of funds for tuition fees and living expenses." },
    { title: "Submit Required Documents", description: "Upload passport, academics, funds proof, insurance, and accommodation details." },
    { title: "Book Biometrics Appointment", description: "Schedule your biometrics appointment at VFS or the Danish Embassy." },
    { title: "Attend Biometrics", description: "Submit fingerprints, photograph, and signature within 14 days." },
    { title: "Await Visa Decision", description: "Processing time usually takes 30\u201360 days depending on season." },
    { title: "Receive Residence Permit", description: "Get your Denmark residence permit confirmation and entry approval." },
    { title: "Travel to Denmark", description: "Carry all essential documents and arrive before your program start date." },
    { title: "Register for CPR", description: "Obtain your CPR number and activate Danish health insurance (Yellow Card)." },
  ],
  faqItems: [
    { question: "Is Denmark good for international students?", answer: "Yes, Denmark is an excellent choice for international students, offering world-ranked universities, innovative teaching methods, English-taught programs, a safe environment, and strong post-study career opportunities in Europe." },
    { question: "What are the admission requirements for studying in Denmark?", answer: "Students typically need a valid passport, academic transcripts and certificates, English proficiency scores (IELTS/TOEFL/PTE), a Statement of Purpose, Letters of Recommendation, proof of funds, and a completed university application form." },
    { question: "What is the cost of studying in Denmark?", answer: "Tuition fees for international students generally range from \u20AC6,000 to \u20AC20,000 per year depending on the program, with living expenses around \u20AC9,000 to \u20AC16,000 annually." },
    { question: "Do I need IELTS to study in Denmark?", answer: "Most Danish universities require an English proficiency test such as IELTS, TOEFL, or PTE for admission into English-taught programs. Some universities may accept alternative proof of English proficiency." },
    { question: "What are the main intakes in Denmark?", answer: "The major intake is in September (Fall), with a secondary intake in February. Some programs and universities also offer rolling admissions throughout the year." },
    { question: "Can I work while studying in Denmark?", answer: "Yes, international students in Denmark can work part-time up to 20 hours per week during semesters and full-time during holidays, helping cover living expenses and gain professional experience." },
    { question: "How do I apply for a Denmark student visa?", answer: "After receiving your admission offer, your university initiates the ST1 form. You complete your part, pay the visa fee, submit required documents, attend biometrics, and await the residence permit decision." },
    { question: "What financial proof is needed for a Denmark student visa?", answer: "You need to demonstrate sufficient funds to cover tuition fees and living expenses for the duration of your stay. This can be shown through bank statements, education loans, or scholarship letters." },
    { question: "Is accommodation easy to find in Denmark?", answer: "Universities in Denmark often assist international students with accommodation options, including student housing and residences. It is recommended to apply early, especially in cities like Copenhagen where demand is high." },
    { question: "Can I stay in Denmark after completing my studies?", answer: "Yes, Denmark offers a post-study residence permit that allows graduates to stay and search for employment. The duration and conditions depend on your qualification level and the current immigration rules." },
  ],
};

export default async function StudyInDenmarkPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "denmark" });
  return <CountryPageTemplate data={denmarkData} blogPosts={blogPosts} />;
}
