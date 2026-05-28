import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Finland - Admizz Education",
  description:
    "Study in Finland with tuition-free universities, innovative education, and excellent quality of life. Get expert guidance from Admizz Education for admissions, visas, and scholarships.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-finland",
  },
  openGraph: {
    title: "Study in Finland - Admizz Education",
    description:
      "Study in Finland with tuition-free universities, innovative education, and excellent quality of life. Get expert guidance from Admizz Education for admissions, visas, and scholarships.",
    url: "https://admizzeducation.com/study-in-finland",
    siteName: "Admizz Education",
    images: ["/images/destinations/finland1.webp"],
    type: "website",
  },
};

const finlandData: CountryPageData = {
  countryName: "Finland",
  countryCategorySlug: "finland",
  heroHeading: "STUDY IN FINLAND",
  heroSubheading: "World-Class Education in the Happiest Country on Earth",
  heroDescription:
    "Finland is globally renowned for its innovative, research-driven education system, tuition-free degree programmes at public universities for EU/EEA students, and affordable options for non-EU students. With a safe, inclusive society, stunning natural landscapes, and strong post-study career prospects, Finland is an ideal destination for international students. Admizz Education guides you through every step — from university selection and applications to visa support and pre-departure preparation.",
  heroBackground: "/images/destinations/finland1.webp",
  quickFacts: [
    { label: "Capital", value: "Helsinki" },
    { label: "Language", value: "Finnish, Swedish" },
    { label: "Dialing Code", value: "+358" },
    { label: "Currency", value: "Euro (€)" },
    { label: "Population", value: "5.6 Million" },
    { label: "Universities", value: "38+" },
    { label: "Intl. Students", value: "30,000+" },
    { label: "Tuition fee", value: "€4,000 – €18,000" },
  ],
  whyStudyTitle: "Why Study In Finland?",
  whyStudyIntro:
    "Finland consistently ranks among the top countries for education quality, innovation, and quality of life. Its universities offer cutting-edge research, practical learning, and globally recognised degrees in a safe and welcoming environment.",
  benefits: [
    {
      title: "Top-Ranked Education System",
      icon: "/images/icons/school-1.webp",
      description:
        "Finnish universities rank highly worldwide, known for innovative teaching methods and research excellence.",
    },
    {
      title: "Affordable Tuition & Living",
      icon: "/images/icons/exam-1.webp",
      description:
        "Non-EU students pay €4,000–€18,000 per year, with generous scholarships available to reduce costs further.",
    },
    {
      title: "Strong Post-Study Work Options",
      icon: "/images/icons/visa-108.webp",
      description:
        "Finland offers a two-year post-graduation residence permit, giving graduates time to find employment.",
    },
    {
      title: "Safe & High Quality of Life",
      icon: "/images/icons/visa-1.webp",
      description:
        "Ranked the happiest country in the world, Finland offers exceptional safety, healthcare, and social services.",
    },
    {
      title: "Innovation & Technology Hub",
      icon: "/images/icons/consultation.webp",
      description:
        "Home to Nokia, Supercell, and a thriving startup ecosystem, Finland connects education with industry.",
    },
    {
      title: "English-Taught Programmes",
      icon: "/images/icons/accomodation-108.webp",
      description:
        "Over 500 degree programmes are taught entirely in English across Finnish universities and UAS institutions.",
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
        "Portfolio (for design/architecture programmes)",
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
        "Financial Proof (minimum €6,720 per year for living expenses)",
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
        "Proof of Funds (€6,720 per year or €560/month)",
        "Motivation Letter / Statement of Purpose",
        "Passport-size Photographs",
        "Completed Residence Permit Application (via Enter Finland portal)",
        "Proof of Health Insurance",
        "Proof of Residence Permit Application Fee Payment (€350)",
      ],
    },
  ],
  intakes: {
    title: "Main Academic Intakes in Finland",
    intro:
      "Finnish universities primarily follow an autumn-based academic calendar, with most programmes starting in September.",
    items: [
      { name: "Autumn Intake (September – Primary Intake)", details: [] },
      { name: "Spring Intake (January – Limited Programmes)", details: [] },
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
    "Finland offers competitive tuition fees for non-EU/EEA students, with many universities providing generous scholarship programmes.",
  costTable: [
    { program: "Undergraduate Tuition Fees", fee: "€4,000 – €12,000 per year" },
    { program: "Postgraduate Tuition Fees", fee: "€6,000 – €18,000 per year" },
    { program: "MBA / Professional Courses", fee: "€8,000 – €24,000 per year" },
    { program: "Living Expenses", fee: "€700 – €1,200 per month" },
    { program: "Health Insurance", fee: "€300 – €600 per year" },
  ],
  costNote:
    "Helsinki is the most expensive city; Tampere, Turku, and Oulu offer more affordable living. Many universities offer tuition fee waivers and scholarships for non-EU students.",
  visaTitle: "Finland Student Residence Permit Process",
  visaIntro:
    "Non-EU/EEA students need a student residence permit to study in Finland. The process is streamlined through the Enter Finland online portal.",
  visaSteps: [
    { title: "Receive Acceptance Letter", description: "Get official admission confirmation from your chosen Finnish university." },
    { title: "Accept Offer & Pay Tuition", description: "Confirm your place and pay the first instalment of tuition fees if applicable." },
    { title: "Arrange Financial Proof", description: "Ensure you have at least €6,720 per year available in a Finnish bank account or equivalent proof." },
    { title: "Obtain Health Insurance", description: "Arrange comprehensive health insurance coverage for the duration of your stay in Finland." },
    { title: "Create Enter Finland Account", description: "Register on the Enter Finland portal to begin your residence permit application." },
    { title: "Submit Online Application", description: "Complete the residence permit form and upload all required documents through the portal." },
    { title: "Pay Application Fee", description: "Pay the student residence permit fee of €350 online through the Enter Finland portal." },
    { title: "Visit Finnish Embassy / VFS", description: "Book an appointment to verify your identity and submit biometrics at your nearest embassy or VFS centre." },
    { title: "Await Processing", description: "Processing typically takes 30–90 days. Track your application status through Enter Finland." },
    { title: "Receive Residence Permit Card", description: "Upon approval, collect your residence permit card from the embassy or have it mailed." },
    { title: "Register in Finland", description: "After arrival, register your address at the local Digital and Population Data Services Agency (DVV)." },
    { title: "Arrive in Finland", description: "Travel to Finland with all documents, residence permit card, and university acceptance letter." },
  ],
  faqItems: [
    { question: "Is Finland a good destination for international students?", answer: "Yes. Finland offers world-class education, a safe society, high quality of life, and strong career opportunities — making it one of the best countries for international students." },
    { question: "Is studying in Finland free?", answer: "For EU/EEA students, tuition is free at public universities. Non-EU/EEA students pay €4,000–€18,000 per year, but generous scholarships are widely available." },
    { question: "What are the minimum requirements to study in Finland?", answer: "Students need completed secondary education (12th grade), English proficiency scores (IELTS 6.0–6.5 or equivalent), a valid passport, and financial proof of €6,720 per year." },
    { question: "How much does it cost to live in Finland as a student?", answer: "Living costs range from €700–€1,200 per month depending on the city. Helsinki is the most expensive, while Tampere, Turku, and Oulu are more affordable." },
    { question: "What is the English proficiency requirement for Finnish universities?", answer: "Most programmes require IELTS 6.0–6.5, TOEFL iBT 79–92, or PTE 54–62, though requirements vary by university and programme." },
    { question: "How long does the Finland residence permit process take?", answer: "The student residence permit typically takes 30–90 days to process after submitting your application through the Enter Finland portal." },
    { question: "Can international students work while studying in Finland?", answer: "Yes. Students can work up to 25 hours per week during term time and full-time during holidays without needing a separate work permit." },
    { question: "What is the post-study work visa in Finland?", answer: "Graduates receive an extended residence permit of up to two years to search for employment in Finland after completing their degree." },
    { question: "When should I apply to Finnish universities?", answer: "The main application period for autumn intake runs from January to March via Studyinfo.fi. Some programmes have a second round in March–April." },
    { question: "How can Admizz Education help with studying in Finland?", answer: "Admizz provides personalised university selection, application support, SOP assistance, scholarship guidance, residence permit documentation, and complete pre-departure services for Finland." },
  ],
};

export default async function StudyInFinlandPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "finland" });
  return <CountryPageTemplate data={finlandData} blogPosts={blogPosts} />;
}
