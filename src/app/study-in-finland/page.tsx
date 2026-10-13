// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Finland - Admizz Education",
  description:
    "Study in Finland with English-taught programmes, research-driven universities and a high quality of life. Get expert guidance from Admizz Education for admissions, visas, and scholarships.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-finland",
  },
  openGraph: {
    title: "Study in Finland - Admizz Education",
    description:
      "Study in Finland with English-taught programmes, research-driven universities and a high quality of life. Get expert guidance from Admizz Education for admissions, visas, and scholarships.",
    url: "https://admizzeducation.com/study-in-finland",
    siteName: "Admizz Education",
    images: ["/images/destinations/finland1.webp"],
    type: "website",
  },
};

const finlandData: CountryPageData = {
  countryName: "Finland",
  countryCategorySlug: "finland",
  nepalGuide: {
    href: "/study-in-finland-from-nepal",
    title: "Applying from Nepal? Read the Nepal-specific guide to studying in Finland",
    text: "Costs, the student visa process, intakes, test scores and scholarships for Nepali students.",
  },
  heroHeading: "STUDY IN FINLAND",
  heroSubheading: "World-Class Education in the Happiest Country on Earth",
  heroDescription:
    "Finland is globally renowned for its innovative, research-driven education system, tuition-free degree programmes for EU/EEA students, and English-taught bachelor's and master's programmes for international students. With a safe, inclusive society, stunning natural landscapes, and a residence permit to look for work after graduation, Finland is an ideal destination for international students. Admizz Education guides you through every step — from university selection and applications to visa support and pre-departure preparation.",
  heroBackground: "/images/destinations/finland1.webp",
  quickFacts: [
    { label: "Capital", value: "Helsinki" },
    { label: "Language", value: "Finnish, Swedish" },
    { label: "Dialing Code", value: "+358" },
    { label: "Currency", value: "Euro (€)" },
    { label: "Population", value: "5.6 Million" },
    { label: "Universities", value: "13 + 22 UAS" },
    { label: "Intl. Students", value: "30,000+" },
    { label: "Tuition fee", value: "€9,000 – €20,000" },
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
        "Students from outside the EU/EEA usually pay €9,000–€20,000 a year for English-taught bachelor's and master's programmes. Universities offer their own scholarships and tuition waivers.",
    },
    {
      title: "Strong Post-Study Work Options",
      icon: "/images/icons/visa-108.webp",
      description:
        "After a Finnish degree you can apply for a residence permit to look for work, granted for a maximum of two years.",
    },
    {
      title: "Safe & High Quality of Life",
      icon: "/images/icons/visa-1.webp",
      description:
        "Finland offers a safe, well-organised society with strong public services for students.",
    },
    {
      title: "Innovation & Technology Hub",
      icon: "/images/icons/consultation.webp",
      description:
        "Finnish universities of applied sciences are professionally oriented and have strong ties with working life.",
    },
    {
      title: "English-Taught Programmes",
      icon: "/images/icons/accomodation-108.webp",
      description:
        "More than 600 English-taught bachelor's and master's programmes are offered across Finnish universities and universities of applied sciences, according to Study in Finland.",
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
        "English Proficiency Scores (accepted tests and scores set by each programme)",
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
        "Proof of Scholarship Award (if you have one)",
        "Proof of Tuition Payment or Funds, and Financial Proof for the Residence Permit (€9,600 for studies of a year or longer)",
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
        "Admission documents your institution requires",
        "Proof of Funds (€9,600 for studies of a year or longer, or €800 per month for shorter studies)",
        "Completed Residence Permit Application (via Enter Finland portal)",
        "Proof of Health Insurance",
        "Residence Permit Application Fee (€600 online, €750 on paper, from 1 January 2026)",
        "Proof of paid tuition, or of funds for tuition as well as living costs",
      ],
    },
  ],
  intakes: {
    title: "Main Academic Intakes in Finland",
    intro:
      "Most English-taught programmes start in August or September, with the joint application each January via Studyinfo.fi. A smaller number of programmes start in January.",
    items: [
      { name: "Autumn Intake (September – Primary Intake)", details: [] },
      { name: "January Start (Limited Programmes, autumn joint application)", details: [] },
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
    { program: "Tuition, English-taught bachelor's and master's (non-EU/EEA)", fee: "€9,000 – €20,000 per year (typical range)" },
    { program: "Doctoral programmes", fee: "Tuition-free regardless of nationality" },
    { program: "Application fee (Studyinfo.fi)", fee: "€100" },
    { program: "Minimum funds Migri requires", fee: "€800 per month (€9,600 for a year)" },
    { program: "Recommended living budget", fee: "About €900 – €1,200 per month" },
    { program: "Residence permit fee (first permit, from 1 Jan 2026)", fee: "€600 online / €750 paper" },
  ],
  costNote:
    "Figures come from Study in Finland and Migri. There are no government scholarships for bachelor's or master's studies, but many universities offer their own scholarships and tuition waivers. Living costs vary by city.",
  visaTitle: "Finland Student Residence Permit Process",
  visaIntro:
    "Non-EU/EEA students need a student residence permit to study in Finland. You apply through the Enter Finland online service and then verify your identity at a Finnish mission.",
  visaSteps: [
    { title: "Receive Acceptance Letter", description: "Get official admission confirmation from your chosen Finnish university." },
    { title: "Accept Offer & Pay Tuition", description: "Confirm your place. Your application needs proof of paid tuition, or of funds for tuition as well as living costs." },
    { title: "Arrange Financial Proof", description: "Have €9,600 in your bank account for studies of a year or longer, or €800 per month for shorter studies." },
    { title: "Obtain Health Insurance", description: "Take out valid private insurance that meets Migri's requirements for your length of study." },
    { title: "Create Enter Finland Account", description: "Register on the Enter Finland portal to begin your residence permit application." },
    { title: "Submit Online Application", description: "Complete the residence permit form and upload all required documents through the portal." },
    { title: "Pay Application Fee", description: "Pay the fee for a first permit for studies: €600 online or €750 on paper." },
    { title: "Visit a Finnish Mission", description: "Book an appointment at a Finnish embassy or consulate to verify your identity." },
    { title: "Await Processing", description: "Migri reports most first student applications in spring and summer are decided within 30 days, with an estimated 90 days if there is no decision by then. Track your application in Enter Finland." },
    { title: "Receive Your Decision", description: "Once the permit is granted, follow Migri and the mission's instructions to receive your residence permit card." },
    { title: "Arrive in Finland", description: "Travel to Finland with your passport, permit documents and university acceptance letter." },
  ],
  faqItems: [
    { question: "Is Finland a good destination for international students?", answer: "Yes. Finland has 13 universities and 22 universities of applied sciences, and more than 600 English-taught bachelor's and master's programmes, according to Study in Finland. Students may work an average of 30 hours a week, and graduates can apply for a permit to look for work." },
    { question: "Is studying in Finland free?", answer: "For EU/EEA students, tuition in degree programmes is free. Students from outside the EU/EEA usually pay €9,000 to €20,000 a year for English-taught bachelor's and master's programmes, and doctoral programmes are tuition-free for everyone. Universities offer their own scholarships." },
    { question: "What are the minimum requirements to study in Finland?", answer: "You need admission to a programme, which has its own entry and language criteria, and a residence permit for studies if you are from outside the EU/EEA. For studies of a year or longer you must show €9,600 in your bank account, plus valid insurance." },
    { question: "How much does it cost to live in Finland as a student?", answer: "Migri requires you to show at least €800 a month. Study in Finland recommends budgeting about €900 to €1,200 a month. Costs vary by city, and the student union fee is about €50 to €70 per academic year." },
    { question: "What is the English proficiency requirement for Finnish universities?", answer: "There is no single national score. Each university or programme sets its accepted tests and minimum scores, so check the admission criteria of each programme on Studyinfo.fi." },
    { question: "How long does the Finland residence permit process take?", answer: "Migri says most first student applications in spring and summer are decided within 30 days when the decision is positive, and the estimate is 90 days if there is no decision by then. Apply as soon as you are admitted." },
    { question: "Can international students work while studying in Finland?", answer: "Yes. With a residence permit for studies you may work in any field for an average of 30 hours a week. You can exceed 30 hours in some weeks, such as holidays, if the average by the end of the year is within the limit." },
    { question: "What is the post-study work visa in Finland?", answer: "After completing a degree in Finland you can apply for a residence permit to look for work, granted for a maximum of two years. You must have at least €800 per month at your disposal, and the permit allows unrestricted work." },
    { question: "When should I apply to Finnish universities?", answer: "The joint application for English-taught programmes starting in autumn opens each January (7 to 21 January in 2026) via Studyinfo.fi. Some programmes start in January and use the autumn joint application. Separate applications can run at other times." },
    { question: "How can Admizz Education help with studying in Finland?", answer: "Admizz provides personalised university selection, application support, SOP assistance, scholarship guidance, residence permit documentation, and complete pre-departure services for Finland." },
  ],
};

export default async function StudyInFinlandPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "finland" });
  return <CountryPageTemplate data={finlandData} blogPosts={blogPosts} />;
}
