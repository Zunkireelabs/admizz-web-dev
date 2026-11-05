import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { getPostsByCategory } from "@/lib/blog-content";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Finland - Admizz Education",
  description:
    "Study in Finland with English-taught programs, research-driven universities and a high quality of life. Get expert help with admissions, visas and scholarships.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-finland",
  },
  openGraph: {
    title: "Study in Finland - Admizz Education",
    description:
      "Study in Finland with English-taught programs, research-driven universities and a high quality of life. Get expert help with admissions, visas and scholarships.",
    url: "https://admizzeducation.com/study-in-finland",
    siteName: "Admizz Education",
    images: [
      {
        url: "/images/og/countries/study-in-finland.jpg",
        width: 1200,
        height: 630,
        alt: "Study in Finland - Admizz Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Finland - Admizz Education",
    description:
      "Study in Finland with English-taught programs, research-driven universities and a high quality of life. Get expert help with admissions, visas and scholarships.",
    images: ["/images/og/countries/study-in-finland.jpg"],
  },
};

const finlandData: CountryPageData = {
  countryName: "Finland",
  countryCategorySlug: "finland",
  heroHeading: "STUDY IN FINLAND",
  flagColors: ["#003580", "#1E5BB8"],
  heroSubheading: "World-Class Education in the Happiest Country on Earth",
  heroDescription:
    "Finland is globally renowned for its innovative, research-driven education system, tuition-free degree programs at public universities for EU/EEA students, and affordable options for non-EU students. With a safe, inclusive society, stunning natural landscapes, and strong post-study career prospects, Finland is an ideal destination for international students. Admizz Education guides you through every step — from university selection and applications to visa support and pre-departure preparation.",
  heroBackground: "/images/hero/finland-hero.webp",
  quickFacts: [
    { label: "Language", value: "Finnish, Swedish" },
    { label: "Currency", value: "Euro (€)" },
    { label: "Universities", value: "13 + 22 UAS" },
    { label: "Intl. Students", value: "30,000+" },
    { label: "Tuition fee", value: "€9,000 – €20,000" },
  ],
  whyStudyTitle: "Why Study In Finland?",
  whyStudyIntro:
    "Finland consistently ranks among the top countries for education quality, innovation, and quality of life. Its universities offer cutting-edge research, practical learning, and globally recognized degrees in a safe and welcoming environment.",
  benefits: [
    {
      title: "Top-Ranked Education System",
      icon: "/images/icons/school-1.webp",
      description:
        "Study in Finland with English-taught programs, research-driven universities and a high quality of life. Get expert help with admissions, visas and scholarships.",
    },
    {
      title: "Affordable Tuition & Living",
      icon: "/images/icons/exam-1.webp",
      description:
        "Study in Finland with English-taught programs, research-driven universities and a high quality of life. Get expert help with admissions, visas and scholarships.",
    },
    {
      title: "Strong Post-Study Work Options",
      icon: "/images/icons/visa-108.webp",
      description:
        "Study in Finland with English-taught programs, research-driven universities and a high quality of life. Get expert help with admissions, visas and scholarships.",
    },
    {
      title: "Safe & High Quality of Life",
      icon: "/images/icons/visa-1.webp",
      description:
        "Study in Finland with English-taught programs, research-driven universities and a high quality of life. Get expert help with admissions, visas and scholarships.",
    },
    {
      title: "Innovation & Technology Hub",
      icon: "/images/icons/consultation.webp",
      description:
        "Study in Finland with English-taught programs, research-driven universities and a high quality of life. Get expert help with admissions, visas and scholarships.",
    },
    {
      title: "English-Taught Programs",
      icon: "/images/icons/accomodation-108.webp",
      description:
        "Study in Finland with English-taught programs, research-driven universities and a high quality of life. Get expert help with admissions, visas and scholarships.",
    },
  ],
  admissionTitle: "Admission Requirements for Studying in Finland",
  admissionIntro:
    "Understanding the admission requirements for studying in Finland is your first step toward joining world-class Finnish universities and building a rewarding international career.",
  documentSections: [
    {
      title: "General Admission Requirements",
      intro:
        "Finnish universities assess applicants based on academic qualifications, language proficiency, and motivation.",
      documents: [
        "Academic Transcripts & Certificates (12th grade or equivalent)",
        "English Proficiency Scores (IELTS / TOEFL / PTE)",
        "Valid Passport",
        "Motivation Letter / Statement of Purpose",
        "University Application Form (via Studyinfo.fi)",
        "CV / Resume",
        "Letters of Recommendation (if required)",
        "Portfolio (for design/architecture programs)",
      ],
    },
    {
      title: "Documents for University Admission",
      intro:
        "Preparing these documents ensures a smooth application process to Finnish universities.",
      documents: [
        "Valid Passport",
        "Acceptance Letter from the University",
        "Academic Transcripts & Certificates",
        "Proof of Tuition Fee Payment or Scholarship Award",
        "Financial Proof (€9,600 for studies of a year or longer)",
        "Passport-size Photographs",
        "Motivation Letter / Statement of Purpose",
      ],
    },
    {
      title: "Visa Documentation",
      intro:
        "International students from non-EU/EEA countries require a student residence permit to study in Finland.",
      documents: [
        "Valid Passport (valid for the duration of stay)",
        "Acceptance Letter from Finnish University",
        "English Proficiency Test Scores (IELTS/TOEFL/PTE)",
        "Academic Transcripts & Certificates",
        "Proof of Funds (€9,600 for studies of a year or longer, or €800 per month for shorter studies)",
        "Motivation Letter / Statement of Purpose",
        "Passport-size Photographs",
        "Completed Residence Permit Application (via Enter Finland portal)",
        "Proof of Health Insurance",
        "Proof of Residence Permit Application Fee Payment (€600 online, €750 on paper, from January 1, 2026)",
      ],
    },
  ],
  intakes: {
    title: "Main Academic Intakes in Finland",
    intro:
      "Most English-taught programs start in August or September, with the joint application each January via Studyinfo.fi. A smaller number of programs start in January.",
    items: [
      { name: "Autumn Intake (September – Primary Intake)", details: [] },
      { name: "January Start (Limited Programs, autumn joint application)", details: [] },
    ],
  },
  universities: [
    { name: "Haaga-Helia University of Applied Science", logo: "/images/universities/finland/haaga-helia.webp" },
    { name: "South-Eastern Finland University of Applied Science", logo: "/images/universities/finland/south-eastern-finland.webp" },
    { name: "Lab University of Applied Science", logo: "/images/universities/finland/lab-university.webp" },
    { name: "Satakunta University of Applied Science", logo: "/images/universities/finland/satakunta-university.webp" },
    { name: "Vaasa University of Applied Science", logo: "/images/universities/finland/vaasa-university.webp" },
    { name: "Karelia University of Applied Science", logo: "/images/universities/finland/karelia-university.webp" },
  ],
  costTitle: "Cost of Studying in Finland",
  costIntro:
    "Tuition fees for non-EU/EEA students are set by each institution. Many universities offer their own scholarships.",
  costTable: [
    { program: "Tuition, English-taught bachelor’s and master’s (non-EU/EEA)", fee: "€9,000 – €20,000 per year (typical range)" },
    { program: "Minimum funds Migri requires", fee: "€800 per month (€9,600 for a year)" },
    { program: "Residence permit fee (first permit, from January 1, 2026)", fee: "€600 online / €750 paper" },
    { program: "Living Expenses", fee: "About €900 – €1,200 per month (recommended budget)" },
    { program: "Health Insurance", fee: "€300 – €600 per year" },
  ],
  costNote:
    "Helsinki is the most expensive city; Tampere, Turku, and Oulu offer more affordable living. There are no government scholarships for bachelor’s or master’s studies, but many universities offer their own scholarships and tuition waivers.",
  visaTitle: "Finland Student Residence Permit Process",
  visaIntro:
    "Non-EU/EEA students need a student residence permit to study in Finland. The process is streamlined through the Enter Finland online portal.",
  visaSteps: [
    { title: "Accept Your Offer", description: "Confirm your place. Your application needs proof of paid tuition, or of funds for tuition as well as living costs." },
    { title: "Funds & Health Insurance", description: "Have €9,600 in your bank account for studies of a year or longer, or €800 per month for shorter studies, plus valid private insurance that meets Migri’s requirements." },
    { title: "Apply on Enter Finland", description: "Complete the residence permit form and upload your documents. Pay the first-permit fee for studies: €600 online or €750 on paper." },
    { title: "Embassy / VFS Visit", description: "Book an appointment at a Finnish embassy or consulate to verify your identity." },
    { title: "Receive Your Permit", description: "Migri reports most first student applications in spring and summer are decided within 30 days, with an estimated 90 days if there is no decision by then." },
    { title: "Arrive & Register", description: "Travel to Finland with your passport, permit documents and university acceptance letter, then register in Finland." },
  ],
  faqItems: [
    { question: "Is Finland a good destination for international students?", answer: "Yes. Finland offers world-class education, a safe society, high quality of life, and strong career opportunities — making it one of the best countries for international students." },
    { question: "Is studying in Finland free?", answer: "For EU/EEA students, tuition is free at public universities. Students from outside the EU/EEA usually pay €9,000–€20,000 a year for English-taught bachelor’s and master’s programs, and doctoral programs are tuition-free for everyone. Universities offer their own scholarships." },
    { question: "What are the minimum requirements to study in Finland?", answer: "Students need completed secondary education (12th grade), English proficiency scores as set by the program, a valid passport, and, for studies of a year or longer, €9,600 in your bank account for the residence permit." },
    { question: "How much does it cost to live in Finland as a student?", answer: "Migri requires you to show at least €800 a month. Study in Finland recommends budgeting about €900 to €1,200 a month. Helsinki is the most expensive, while Tampere, Turku, and Oulu are more affordable." },
    { question: "What is the English proficiency requirement for Finnish universities?", answer: "There is no single national score. Each university or program sets its accepted tests and minimum scores, so check the admission criteria of each program on Studyinfo.fi." },
    { question: "How long does the Finland residence permit process take?", answer: "Migri says most first student applications in spring and summer are decided within 30 days when the decision is positive, and the estimate is 90 days if there is no decision by then. Apply as soon as you are admitted." },
    { question: "Can international students work while studying in Finland?", answer: "Yes. With a residence permit for studies you may work in any field for an average of 30 hours a week. You can exceed 30 hours in some weeks, such as holidays, if the average by the end of the year is within the limit." },
    { question: "What is the post-study work visa in Finland?", answer: "After completing a degree in Finland you can apply for a residence permit to look for work, granted for a maximum of two years. You must have at least €800 per month at your disposal, and the permit allows unrestricted work." },
    { question: "When should I apply to Finnish universities?", answer: "The joint application for English-taught programs starting in autumn opens each January (January 7 to 21 in 2027 for autumn 2027 starts) via Studyinfo.fi. Some programs start in January and use the autumn joint application. Separate applications can run at other times." },
    { question: "How can Admizz Education help with studying in Finland?", answer: "Admizz provides personalized university selection, application support, SOP assistance, scholarship guidance, residence permit documentation, and complete pre-departure services for Finland." },
  ],
};

export default async function StudyInFinlandPage() {
  const blogPosts: SanityPost[] = getPostsByCategory("finland");
  return <CountryPageTemplate data={finlandData} blogPosts={blogPosts} />;
}
