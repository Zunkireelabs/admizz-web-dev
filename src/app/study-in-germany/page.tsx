import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Germany - Admizz Education",
  description:
    "Study in Germany at world-renowned universities with tuition-free public education, expert guidance, visa support, and scholarships. Begin your international journey today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-germany",
  },
  openGraph: {
    title: "Study in Germany - Admizz Education",
    description:
      "Study in Germany at world-renowned universities with tuition-free public education, expert guidance, visa support, and scholarships. Begin your international journey today!",
    url: "https://admizzeducation.com/study-in-germany",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const germanyData: CountryPageData = {
  countryName: "Germany",
  countryCategorySlug: "germany",
  heroHeading: "STUDY IN GERMANY",
  heroSubheading: "World-Class Education with Tuition-Free Public Universities",
  heroDescription:
    "Study in Germany and benefit from tuition-free public universities, cutting-edge research facilities, and globally recognised degrees. Admizz Education supports you with course guidance, admissions, documentation, and visa assistance \u2014 ensuring a smooth, confident journey toward top-quality education and career opportunities in Germany.",
  heroBackground: "/images/hero/germany-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Berlin" },
    { label: "Language", value: "German English" },
    { label: "Dialing Code", value: "+49" },
    { label: "Currency", value: "Euro (\u20AC)" },
    { label: "Population", value: "84+ Million" },
    { label: "Universities", value: "400+" },
    { label: "Intl. Students", value: "460,000+" },
    { label: "Tuition fee", value: "\u20AC0 \u2013 \u20AC20,000" },
  ],
  whyStudyTitle: "Why Study In Germany?",
  whyStudyIntro:
    "Germany is one of the most sought-after study destinations in the world, offering tuition-free education at public universities, globally ranked institutions, and excellent career prospects in Europe\u2019s largest economy. With a strong focus on research, innovation, and industry partnerships, studying in Germany opens doors to a successful international career.",
  benefits: [
    {
      icon: "/images/icons/school-1.webp",
      title: "Tuition-Free Public Universities",
      description:
        "Most public universities in Germany charge no tuition fees for international students, making it one of the most affordable study destinations worldwide.",
    },
    {
      icon: "/images/icons/scholarship-108.webp",
      title: "Globally Ranked Institutions",
      description:
        "Home to prestigious universities like TU Munich, LMU Munich, Heidelberg University, and Humboldt University, consistently ranked among the world\u2019s best.",
    },
    {
      icon: "/images/icons/knowledge.webp",
      title: "English-Taught Programs",
      description:
        "Over 1,800 international programs are available fully in English at Bachelor\u2019s, Master\u2019s, and PhD levels across German universities.",
    },
    {
      icon: "/images/icons/accomodation-108.webp",
      title: "Strong Economy & Career Prospects",
      description:
        "Germany is Europe\u2019s largest economy and home to global companies like BMW, Siemens, SAP, and Bosch, offering excellent internship and job opportunities.",
    },
    {
      icon: "/images/icons/consultation.webp",
      title: "Post-Study Work Opportunities",
      description:
        "Graduates receive an 18-month post-study work visa to find employment in Germany, one of the most generous policies in Europe.",
    },
    {
      icon: "/images/icons/visa-1.webp",
      title: "Rich Cultural Experience",
      description:
        "Experience a vibrant cultural scene, historic cities, world-class museums, and a diverse, welcoming student community across Germany.",
    },
  ],
  admissionTitle: "Admission Requirements for Studying in Germany",
  admissionIntro:
    "Discover the essential documents required to study in Germany, including academic records, ID proof, financial statements, language scores, and visa paperwork for a smooth and successful admission process.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in Germany",
      intro:
        "Prepare your Germany study application with essential documents, including academic transcripts, passport, language scores, SOP, LORs, financial proof, health insurance, and visa papers for a smooth admission process.",
      documents: [
        "Valid Passport",
        "Academic Transcripts (10th, 12th, Bachelor\u2019s, Master\u2019s if applicable)",
        "APS Certificate (Akademische Pr\u00FCfstelle) \u2013 for applicants from certain countries",
        "Updated CV / Resume",
        "Statement of Purpose (SOP) / Motivation Letter",
        "Letters of Recommendation (LORs)",
        "English Proficiency Test Scores (IELTS/TOEFL/PTE) \u2013 for English-taught programs",
        "German Language Test Scores (TestDaF/DSH/Goethe-Zertifikat) \u2013 for German-taught programs",
        "Proof of Funds / Blocked Account (\u20AC11,208 per year)",
        "Health Insurance (mandatory)",
        "Visa Application Documents",
      ],
    },
    {
      title: "Documents Required for University Admission",
      intro:
        "Prepare your Germany university application with essential documents, including passport, academic transcripts, language scores, SOP, LORs, proof of funds, health insurance, and admission-specific papers for smooth enrolment.",
      documents: [
        "Valid Passport",
        "Academic Transcripts & Certificates",
        "APS Certificate (if applicable)",
        "Resume / CV",
        "Motivation Letter / SOP",
        "LORs",
        "Language Proficiency Scores (English or German)",
        "University Application Form",
        "Portfolio (for art/design programs)",
        "GRE/GMAT Scores (for select Master\u2019s/MBA programs)",
        "University Offer Letter / Admission Letter",
      ],
    },
    {
      title: "Visa Documentation",
      intro:
        "Secure your Germany student visa by preparing key documents, including academic transcripts, passport, admission letter, blocked account proof, health insurance, and application forms for a smooth visa process.",
      documents: [
        "Valid Passport (minimum 6 months validity)",
        "University Admission Letter",
        "Blocked Account Proof (\u20AC11,208)",
        "Health Insurance Certificate",
        "Academic Transcripts & Certificates",
        "Language Proficiency Scores",
        "Motivation Letter / SOP",
        "Passport-size Photographs (biometric)",
        "Visa Application Form",
        "Proof of Financial Means",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in Germany",
    intro:
      "Germany offers two major academic intakes each year for international students. Understanding these intakes helps students plan applications, document submission, and visa timelines effectively.",
    items: [
      { name: "Winter Semester (October) \u2013 Major Intake", details: [] },
      { name: "Summer Semester (April) \u2013 Minor Intake", details: [] },
    ],
  },
  universities: [
    { name: "Technical University of Munich", logo: "/images/universities/germany/technical-university-of-munich.webp" },
    { name: "Ludwig Maximilian University", logo: "/images/universities/germany/ludwig-maximilians-universitat.webp" },
    { name: "Heidelberg University", logo: "/images/universities/germany/heidelberg-university.webp" },
    { name: "RWTH Aachen University", logo: "/images/universities/germany/rwth-aachen-university.webp" },
    { name: "Humboldt University of Berlin", logo: "/images/universities/germany/humboldt-universitat-berlin.webp" },
    { name: "Freie Universit\u00E4t Berlin", logo: "/images/universities/germany/freie-universitat-berlin.webp" },
    { name: "Karlsruhe Institute of Technology", logo: "/images/universities/germany/karlsruhe-institute-of-technology.webp" },
    { name: "Technische Universit\u00E4t Berlin", logo: "/images/universities/germany/technische-universitat-berlin.webp" },
    { name: "University of Freiburg", logo: "/images/universities/germany/university-of-freiburg.webp" },
    { name: "University of Hamburg", logo: "/images/universities/germany/university-of-hamburg.webp" },
  ],
  costTitle: "Cost of Studying in Germany",
  costIntro:
    "Understanding the cost of studying in Germany helps international students plan their budget effectively. Germany is known for its affordable education, with most public universities charging no tuition fees.",
  costTable: [
    { program: "Public University \u2013 Bachelor\u2019s / Master\u2019s", fee: "\u20AC0 (Semester contribution: \u20AC150\u2013\u20AC350)" },
    { program: "Public University \u2013 Baden-W\u00FCrttemberg (non-EU)", fee: "\u20AC1,500 per semester" },
    { program: "Private Universities", fee: "\u20AC5,000 \u2013 \u20AC20,000 per year" },
    { program: "MBA / Professional Programs", fee: "\u20AC15,000 \u2013 \u20AC40,000 per year" },
    { program: "Living Expenses \u2013 Major Cities (Berlin, Munich)", fee: "\u20AC10,000 \u2013 \u20AC14,400 per year" },
    { program: "Living Expenses \u2013 Smaller Cities", fee: "\u20AC8,000 \u2013 \u20AC10,000 per year" },
    { program: "Health Insurance", fee: "\u20AC110 \u2013 \u20AC180 per month" },
  ],
  costNote:
    "Note: Most public universities in Germany do not charge tuition fees (except Baden-W\u00FCrttemberg for non-EU students). Students must open a blocked account with \u20AC11,208 as proof of financial means for the visa. Costs vary by city, program, and lifestyle.",
  visaTitle: "Germany Student Visa Process",
  visaIntro:
    "Follow the simplified Germany student visa process \u2014 from university admission to visa approval \u2014 for a smooth, stress-free study journey.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select your preferred German university and program based on eligibility, language requirements, and career goals." },
    { title: "Apply to University via uni-assist or Direct", description: "Submit your application through uni-assist (centralised portal) or directly to the university, depending on the institution." },
    { title: "Receive Admission Letter", description: "Get your official admission letter (Zulassungsbescheid) from the German university." },
    { title: "Open a Blocked Account", description: "Open a blocked account (Sperrkonto) with \u20AC11,208 at a German bank as proof of financial means." },
    { title: "Obtain Health Insurance", description: "Secure mandatory health insurance coverage from a recognised German or international provider." },
    { title: "Book Visa Appointment", description: "Schedule your student visa appointment at the nearest German Embassy or Consulate." },
    { title: "Prepare Visa Documents", description: "Collect and organise all required visa documents including admission letter, blocked account, insurance, and academic records." },
    { title: "Attend Visa Interview", description: "Visit the German Embassy/Consulate to submit biometrics, documents, and attend your visa interview." },
    { title: "Wait for Visa Decision", description: "The German Embassy processes your application. Processing times vary from 4 to 12 weeks." },
    { title: "Collect Passport", description: "Receive your passport with the student visa stamp from the Embassy or via courier." },
    { title: "Travel to Germany", description: "Carry all essential documents and travel to Germany before your semester start date." },
    { title: "Register at Local Authorities", description: "Complete your Anmeldung (city registration) and enrol at your university within the first few weeks of arrival." },
  ],
  faqItems: [
    { question: "Is studying in Germany really free?", answer: "Yes, most public universities in Germany do not charge tuition fees for international students. However, students pay a small semester contribution (\u20AC150\u2013\u20AC350) that covers administrative fees and a public transport pass. Private universities do charge tuition fees ranging from \u20AC5,000 to \u20AC20,000 per year." },
    { question: "What are the eligibility requirements to study in Germany?", answer: "Students need academic transcripts, a valid passport, language proficiency scores (English or German depending on the program), a Statement of Purpose or Motivation Letter, Letters of Recommendation, and proof of financial means (blocked account with \u20AC11,208)." },
    { question: "Do I need to know German to study in Germany?", answer: "Not necessarily. Germany offers over 1,800 English-taught programs at various levels. However, knowing basic German is helpful for daily life. For German-taught programs, you need TestDaF, DSH, or Goethe-Zertifikat scores." },
    { question: "What is a blocked account and how much do I need?", answer: "A blocked account (Sperrkonto) is a special bank account required for the student visa. You must deposit \u20AC11,208 per year, from which you can withdraw a fixed monthly amount (\u20AC934) for living expenses." },
    { question: "How long does the Germany student visa process take?", answer: "The visa process typically takes 4 to 12 weeks after submitting your application at the German Embassy. It is recommended to apply at least 3 months before your intended travel date." },
    { question: "Can I work while studying in Germany?", answer: "Yes, international students in Germany can work up to 120 full days or 240 half days per year without a special work permit. Many students find part-time jobs, internships, or working student (Werkstudent) positions." },
    { question: "What are the major academic intakes in Germany?", answer: "Germany has two major intakes: Winter Semester (October, primary intake with the most programs) and Summer Semester (April, secondary intake with fewer available programs). Application deadlines are typically July 15 for winter and January 15 for summer." },
    { question: "What are the top universities in Germany?", answer: "Some of Germany\u2019s top universities include Technical University of Munich (TUM), Ludwig Maximilian University (LMU) Munich, Heidelberg University, Humboldt University of Berlin, RWTH Aachen, and Freie Universit\u00E4t Berlin." },
    { question: "What are the career prospects after studying in Germany?", answer: "Germany offers an 18-month post-study work visa for graduates to find employment. With Europe\u2019s largest economy and global companies like BMW, Siemens, SAP, Bosch, and Deutsche Bank, graduates have excellent career prospects in engineering, IT, automotive, finance, and more." },
    { question: "How much does it cost to live in Germany as a student?", answer: "Living costs range from \u20AC800 to \u20AC1,200 per month depending on the city. Major cities like Munich and Berlin are more expensive, while smaller university towns like Freiburg, Jena, or G\u00F6ttingen offer more affordable living." },
  ],
};

export default async function StudyInGermanyPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "germany" });
  return <CountryPageTemplate data={germanyData} blogPosts={blogPosts} />;
}
