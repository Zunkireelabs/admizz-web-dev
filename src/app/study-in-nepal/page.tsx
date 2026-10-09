import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Nepal - Admizz Education",
  description:
    "Study in Nepal at top universities with affordable tuition, English-medium programs, and globally recognised degrees for international students.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-nepal",
  },
  openGraph: {
    title: "Study in Nepal - Admizz Education",
    description:
      "Study in Nepal at top universities with affordable tuition, English-medium programs, and globally recognised degrees for international students.",
    url: "https://admizzeducation.com/study-in-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/untitled-design-80.webp"],
    type: "website",
  },
};

const nepalData: CountryPageData = {
  countryName: "Nepal",
  countryCategorySlug: "nepal",
  heroHeading: "STUDY IN NEPAL",
  heroSubheading: "Discover Quality Education in the Heart of the Himalayas",
  heroDescription:
    "Nepal offers internationally recognised universities, English-medium programs, affordable tuition, and a unique cultural environment between South and East Asia. From program selection and application support to visas, accommodation, and pre-arrival guidance, Admizz Education helps international students secure admission to leading Nepali universities with complete confidence.",
  heroBackground: "/images/hero/nepal-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Kathmandu" },
    { label: "Language", value: "Nepali / English" },
    { label: "Dialing Code", value: "+977" },
    { label: "Currency", value: "Nepalese Rupee" },
    { label: "Population", value: "30+ Million" },
    { label: "Universities", value: "14+" },
    { label: "Intl. Students", value: "Growing" },
    { label: "Tuition fee", value: "USD 1,500 – 5,000" },
  ],
  whyStudyTitle: "Why Study In Nepal?",
  whyStudyIntro:
    "Nepal offers affordable, internationally recognised education with English-medium programs in medicine, engineering, business, and the humanities. Its diverse natural landscape, rich cultural heritage, and strategic location between India and China make it a unique destination for international students seeking quality education and lifelong experiences.",
  benefits: [
    {
      title: "Affordable Quality Education",
      icon: "/images/icons/school-1.webp",
      description:
        "Nepali universities offer globally accredited programs at a fraction of Western tuition costs, making advanced study highly accessible.",
    },
    {
      title: "English-Medium Programs",
      icon: "/images/icons/exam-1.webp",
      description:
        "Most degree programs in medicine, engineering, business, and IT are taught entirely in English at top Nepali institutions.",
    },
    {
      title: "Strong Medical & Engineering Programs",
      icon: "/images/icons/visa-1.webp",
      description:
        "Nepal is well known for its MBBS and engineering programs, recognised by global councils including WHO and the Medical Council of India.",
    },
    {
      title: "Safe & Welcoming Culture",
      icon: "/images/icons/consultation.webp",
      description:
        "Nepalis are known worldwide for their hospitality. International students settle in quickly with a warm, supportive community.",
    },
    {
      title: "Unique Cultural & Natural Setting",
      icon: "/images/icons/knowledge.webp",
      description:
        "Study with the Himalayas as your backdrop — explore trekking, world heritage sites, and rich cultural traditions during your degree.",
    },
    {
      title: "Affordable Cost of Living",
      icon: "/images/icons/school-1.webp",
      description:
        "Daily living costs in Nepal are significantly lower than most study destinations, allowing students to live comfortably on a modest budget.",
    },
  ],
  admissionTitle: "Admission Requirements for Studying in Nepal",
  admissionIntro:
    "Planning to study in Nepal as an international student? Understanding the admission requirements is your first step toward joining recognised Nepali universities and building a globally relevant career.",
  documentSections: [
    {
      title: "Admission Requirements for International Students",
      intro:
        "Nepali universities have clear, document-based admission processes for international applicants.",
      documents: [
        "Academic Records (Transcripts, Certificates)",
        "English Proficiency Scores (IELTS / TOEFL / Duolingo)",
        "Valid Passport",
        "Statement of Purpose (SOP)",
        "University Application Form",
        "Letters of Recommendation",
        "Financial Proof / Sponsorship Letter",
        "Resume/CV",
        "Equivalency Certificate (where applicable)",
      ],
    },
    {
      title: "Documents Required for Offer Confirmation",
      intro:
        "Once admitted, international students need to confirm their seat with the following documents.",
      documents: [
        "Valid Passport",
        "Offer Letter from the University",
        "Academic Transcripts & Certificates",
        "Proof of Tuition Deposit Payment",
        "Financial Proof (Funds for tuition & living)",
        "Passport-size Photographs",
        "Statement of Purpose (SOP)",
        "Health Certificate",
      ],
    },
    {
      title: "Visa Documentation",
      intro:
        "Preparing the right visa documentation is essential for international students planning to study in Nepal.",
      documents: [
        "Valid Passport (with at least 6 months validity)",
        "Letter of Admission from Recognised University",
        "Academic Transcripts & Certificates",
        "Proof of Funds (Tuition + Living + Travel)",
        "Passport-size Photographs",
        "Completed Student Visa Application Form",
        "Visa Application Fee Payment Receipt",
        "Health & Police Clearance (where required)",
      ],
    },
  ],
  intakes: {
    title: "Main Academic Intakes in Nepal",
    intro:
      "Nepali universities operate on multiple intakes throughout the year, giving international students flexibility to begin their studies.",
    items: [
      { name: "Autumn Intake (September) — Primary Intake", details: [] },
      { name: "Spring Intake (February / March) — Secondary Intake", details: [] },
      { name: "Rolling Admissions (selected programs)", details: [] },
    ],
  },
  universities: [
    { name: "Tribhuvan University", logo: "/images/universities/nepal/tribhuvan-university.webp" },
    { name: "Kathmandu University", logo: "/images/universities/nepal/kathmandu-university.webp" },
    { name: "Pokhara University", logo: "/images/universities/nepal/pokhara-university.webp" },
    { name: "Purbanchal University", logo: "/images/universities/nepal/purbanchal-university.webp" },
    { name: "Nepal Sanskrit University", logo: "/images/universities/nepal/nepal-sanskrit-university.webp" },
    { name: "Mid-Western University", logo: "/images/universities/nepal/mid-western-university.webp" },
    { name: "Far-Western University", logo: "/images/universities/nepal/far-western-university.webp" },
    { name: "Lumbini Buddhist University", logo: "/images/universities/nepal/lumbini-buddhist-university.webp" },
    { name: "Agriculture & Forestry University", logo: "/images/universities/nepal/agriculture-forestry-university.webp" },
    { name: "Nepal Open University", logo: "/images/universities/nepal/nepal-open-university.webp" },
  ],
  costTitle: "Cost of Studying in Nepal",
  costIntro:
    "Studying in Nepal is significantly more affordable than most international destinations. Here's a breakdown of typical costs for international students.",
  costTable: [
    { program: "Undergraduate Tuition Fees", fee: "USD 1,500 – USD 4,000 per year" },
    { program: "Postgraduate Tuition Fees", fee: "USD 2,000 – USD 5,000 per year" },
    { program: "MBBS / Medical Programs", fee: "USD 35,000 – USD 65,000 (full course)" },
    { program: "Living Expenses", fee: "USD 200 – USD 400 per month" },
    { program: "Health Insurance", fee: "USD 60 – USD 150 per year" },
  ],
  costNote:
    "Costs vary by university and program. Kathmandu and Pokhara are slightly more expensive; smaller cities are more affordable.",
  visaTitle: "Nepal Student Visa Process",
  visaIntro:
    "The Nepal student visa process is straightforward for admitted international students. Visas are issued through Nepali embassies or on arrival depending on nationality.",
  visaSteps: [
    {
      title: "Receive Offer Letter",
      description:
        "Get official admission confirmation from your chosen Nepali university or institute.",
    },
    {
      title: "Accept Offer & Pay Deposit",
      description:
        "Confirm your seat by paying the required initial tuition or registration fee.",
    },
    {
      title: "University Registers You with the Ministry",
      description:
        "Your university files your admission with Nepal's Ministry of Education for visa endorsement.",
    },
    {
      title: "Receive Recommendation Letter",
      description:
        "The Ministry issues a visa recommendation letter required for your student visa application.",
    },
    {
      title: "Prepare Required Visa Documents",
      description:
        "Collect academic, financial, health, and identification documents before applying.",
    },
    {
      title: "Apply at the Nepali Embassy / Consulate",
      description:
        "Submit your visa application at the nearest Nepali embassy or consulate in your country.",
    },
    {
      title: "Pay Visa Application Fee",
      description:
        "Make the mandatory payment to officially process your visa submission.",
    },
    {
      title: "Provide Biometrics If Requested",
      description:
        "Some embassies require fingerprinting and photographs as part of the application.",
    },
    {
      title: "Await Visa Outcome",
      description:
        "Embassy reviews your application and issues the visa decision, usually within 2–4 weeks.",
    },
    {
      title: "Receive Student Visa",
      description:
        "Your single-entry student visa is issued — typically valid for one academic year.",
    },
    {
      title: "Book Your Flight to Nepal",
      description:
        "Plan travel to Kathmandu (TIA airport) ahead of your program start date.",
    },
    {
      title: "Complete On-Arrival Registration",
      description:
        "Register with your university and the Department of Immigration within 15 days of arrival.",
    },
    {
      title: "Extend Visa Annually If Required",
      description:
        "Multi-year programs need annual visa renewal supported by your university.",
    },
    {
      title: "Begin Your Studies in Nepal",
      description:
        "Carry passport, visa, offer letter, and academic records to your institution on day one.",
    },
  ],
  faqItems: [
    {
      question: "Is Nepal a good destination for international students?",
      answer:
        "Yes. Nepal offers affordable tuition, English-medium programs, recognised universities, and a safe, welcoming culture for international students.",
    },
    {
      question: "What are the minimum requirements to study in Nepal?",
      answer:
        "International students need academic transcripts, English proficiency scores, Statement of Purpose, valid passport, financial proof, and university-specific eligibility documents.",
    },
    {
      question: "How much does it cost to study in Nepal?",
      answer:
        "Tuition typically ranges USD 1,500–5,000 per year. MBBS programs are higher (USD 35,000–65,000 for the full course). Living costs are USD 200–400 per month.",
    },
    {
      question: "What is the English proficiency requirement for Nepali universities?",
      answer:
        "Most universities accept IELTS 5.5–6.0, TOEFL iBT 60–80, or equivalent. Some programs may waive this for applicants from English-speaking education systems.",
    },
    {
      question: "How long does the Nepal student visa process take?",
      answer:
        "Once you have your university offer and Ministry recommendation letter, visa processing typically takes 2–4 weeks at the Nepali embassy.",
    },
    {
      question: "What are the major intakes for studying in Nepal?",
      answer:
        "Nepali universities mainly run two intakes: Autumn (September — primary) and Spring (February/March). Some programs offer rolling admissions.",
    },
    {
      question: "Can international students work while studying in Nepal?",
      answer:
        "On-campus work and internships are permitted at most universities. Off-campus paid work generally requires additional permission and is limited.",
    },
    {
      question: "Are scholarships available for international students in Nepal?",
      answer:
        "Yes — universities, the Government of Nepal, and bilateral exchange programs (especially with SAARC and ASEAN nations) offer scholarships and fee waivers.",
    },
    {
      question: "Is Nepal safe for international students?",
      answer:
        "Yes. Nepal has low crime rates, friendly communities, and dedicated international student support at major universities. Standard travel precautions apply.",
    },
    {
      question: "How can Admizz Education help with studying in Nepal?",
      answer:
        "Admizz provides personalised university selection, application support, SOP assistance, scholarship guidance, visa documentation, and complete pre-arrival services for international students coming to Nepal.",
    },
  ],
};

export default async function StudyInNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, {
    categorySlug: "nepal",
  });
  return <CountryPageTemplate data={nepalData} blogPosts={blogPosts} />;
}
