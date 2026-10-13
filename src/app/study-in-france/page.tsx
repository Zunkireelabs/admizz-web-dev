// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
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
  nepalGuide: {
    href: "/study-in-france-from-nepal",
    title: "Applying from Nepal? Read the Nepal-specific guide to studying in France",
    text: "Costs, the student visa process, intakes, test scores and scholarships for Nepali students.",
  },
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
            { label: "Public tuition (non-EU)", value: "~\u20AC2,900 \u2013 \u20AC3,950" },
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
        "More than 1,650 programs are taught in English, according to Campus France.",
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
        "Access internship pathways and, for eligible master\u2019s-level graduates, a 12-month permit to look for work after your degree.",
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
        "French Language Test Scores (TCF/DELF/DALF) \u2013 for French-taught programs",
        "Proof of Funds / Bank Statements",
        "Visa Application Documents (VFS / Consulate)",
      ],
    },
    {
      title: "Documents Required for the Campus France Application and Interview",
      intro:
        "Campus France Nepal asks you to bring your interview appointment letter, pre-registration certificate, payment receipts, passport, original academic documents, language certificates if you have them, proof of tuition payment and proof of accommodation.",
      documents: [
        "Valid Passport",
        "Academic Transcripts",
        "Resume / CV",
        "SOP",
        "LORs",
        "English Proficiency Test Scores",
        "French Language Test Scores",
        "Campus France Application Form & Payment Receipt",
        "Proof of tuition payment and accommodation (booking, rental agreement or explanatory letter)",
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
      "Most programs in France start in September, and some institutions have other start dates. Campus France lists 15 December as the DAP registration closing date for the following September, so plan applications, documents and visa timelines early.",
    items: [
      { name: "September / Fall Intake (main start for most programs)", details: [] },
      { name: "Other start dates (varies by institution, check each program)", details: [] },
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
    { program: "Public University \u2013 Bachelor\u2019s (2026-27, non-EU)", fee: "About \u20AC2,900 per year" },
    { program: "Public University \u2013 Master\u2019s (2026-27, non-EU)", fee: "About \u20AC3,950 per year" },
    { program: "Public University \u2013 Doctorate", fee: "About \u20AC398 per year" },
    { program: "Private Institutions", fee: "\u20AC6,000 \u2013 \u20AC18,000+ per year" },
    { program: "Average Monthly Student Budget", fee: "About \u20AC800 (outside Paris), \u20AC1,000 (Paris)" },
    { program: "Student Housing (CROUS)", fee: "\u20AC150 \u2013 \u20AC600 per month" },
    { program: "CVEC Student Contribution (2026-27)", fee: "\u20AC105" },
    { program: "Health Cover (social security affiliation)", fee: "Free for students" },
  ],
  costNote:
    "Note: Tuition figures are Campus France\u2019s 2026-27 non-EU rates for public institutions; official pages show small differences (about \u20AC2,895\u2013\u20AC2,902 and \u20AC3,941\u2013\u20AC3,950), so confirm with your institution. Visa applications from 1 August 2026 must show at least \u20AC877.50 per month in resources. Costs vary by city, program and lifestyle.",
  visaTitle: "France Student Visa Process",
  visaIntro:
    "Follow the simplified France student visa process\u2014from Campus France approval to biometric submission and visa collection\u2014for a smooth, stress-free study journey.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select your preferred French university and program based on eligibility and goals." },
    { title: "Create Campus France Account", description: "Register on the Campus France portal to begin your application process." },
    { title: "Upload Documents", description: "Submit academic transcripts, language scores, SOP, and other required documents online." },
    { title: "Pay Campus France Fee", description: "Pay the Campus France fee on the Etudes en France platform." },
    { title: "Attend Campus France Interview", description: "Appear for your Campus France interview to verify your academic profile and study plans." },
    { title: "Complete Campus France Procedure", description: "Once the Etudes en France procedure is complete, your file is passed on for the visa stage." },
    { title: "Apply on France-Visas Portal", description: "Complete your visa application on the official France-Visas portal." },
    { title: "Book VFS Visa Appointment", description: "Book your appointment with VFS to submit your application." },
    { title: "Prepare Visa Documents", description: "Collect the documents listed on France-Visas, including proof of at least \u20AC877.50 per month (from 1 August 2026) and insurance proof." },
    { title: "Attend VFS Appointment", description: "Submit your documents and biometrics at VFS." },
    { title: "Wait for Visa Decision", description: "The French consular authorities review your application and decide." },
    { title: "Collect Passport", description: "Collect your passport with the visa." },
    { title: "Travel to France", description: "Carry all essential documents and travel to France before your program start date." },
    { title: "Validate VLS-TS Visa After Arrival", description: "Validate your VLS-TS online at administration-etrangers-en-france.interieur.gouv.fr within 3 months of arriving; Campus France lists the fee as \u20AC100 for most nationalities." },
  ],
  faqItems: [
    { question: "What are the eligibility requirements to study in France?", answer: "Requirements vary by institution, but you generally need academic transcripts, a valid passport, proof of English or French as the program requires, and proof of funds. Nepali students also complete the Etudes en France procedure with Campus France, including an interview, before the visa application." },
    { question: "How much does it cost to study in France?", answer: "For 2026-27, public institutions charge non-EU students about \u20AC2,900 a year for a bachelor\u2019s and \u20AC3,950 for a master\u2019s. Private institutions charge \u20AC6,000 to \u20AC18,000 or more. Campus France puts the average monthly student budget at about \u20AC800 outside Paris and \u20AC1,000 in Paris." },
    { question: "What documents are required for a France student visa?", answer: "Campus France Nepal sends applicants to France-Visas for the official document list. You need your passport, admission proof, proof of at least \u20AC877.50 a month for applications from 1 August 2026, and insurance proof. You also bring proof of accommodation to the Campus France interview." },
    { question: "How long does the France student visa process take?", answer: "Processing time depends on the consular authorities and the completeness of your file, and Campus France does not publish a fixed figure. Complete the Etudes en France procedure first, then apply on France-Visas and submit at VFS as early as you can." },
    { question: "Can I work while studying in France?", answer: "Yes. The VLS-TS student visa allows 964 hours of work per year, which Campus France describes as about 20 hours a week. The limit is counted over the year, so you can work more in holidays." },
    { question: "What are the major academic intakes in France?", answer: "Most programs start in September, and some institutions have other start dates, so check each program. Campus France lists 15 December as the DAP registration closing date on Etudes en France for the following September." },
    { question: "Is studying in France affordable for international students?", answer: "Public tuition is subsidised, about \u20AC2,900 (bachelor\u2019s) and \u20AC3,950 (master\u2019s) a year for non-EU students in 2026-27. Scholarships such as Eiffel and Erasmus Mundus exist, and holders of a French government scholarship can be exempt from the higher rate." },
    { question: "Do I need health insurance to study in France?", answer: "Affiliation to French social security is free and compulsory for students, done on etudiant-etranger.ameli.fr after you arrive. The separate CVEC student contribution is \u20AC105 for 2026-27. For the visa, follow the insurance proof listed on France-Visas." },
    { question: "How do I apply to study in France?", answer: "Choose a program, create an account on the Etudes en France platform, upload documents, pay, and attend the Campus France interview. Then apply for your visa on France-Visas and submit it through VFS. After arrival, validate your VLS-TS online within 3 months." },
    { question: "What are the job opportunities after studying in France?", answer: "Graduates with a licence professionnelle or master\u2019s-level degree may be eligible for the 12-month, non-renewable APS permit to look for work or prepare a business. Campus France says access depends on a bilateral agreement with your country, so check eligibility before relying on it." },
  ],
};

export default async function StudyInFrancePage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "france" });
  return <CountryPageTemplate data={franceData} blogPosts={blogPosts} />;
}
