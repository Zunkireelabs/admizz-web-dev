import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Finland from Nepal - Admizz Education",
  description:
    "Study in Finland from Nepal with Admizz. Get expert help with university selection, scholarships, residence permit & more. Start your journey today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-finland-from-nepal",
  },
  openGraph: {
    title: "Study in Finland from Nepal - Admizz Education",
    description:
      "Study in Finland from Nepal with Admizz. Get expert help with university selection, scholarships, residence permit & more. Start your journey today!",
    url: "https://admizzeducation.com/study-in-finland-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "Finland",
  countryCategorySlug: "finland",
  heroHeading: "Study in Finland from Nepal",
  heroSubheading: "Build Your Future in the World's Happiest Country",

  introTitle: "A Gateway to World-Class Nordic Education",
  introContent:
    "Finland is renowned for its innovative, research-driven education system, consistently ranking among the best globally. Finnish universities offer English-taught programmes, affordable tuition, and strong connections to industry. For Nepali students, Finland represents an excellent opportunity to gain a globally recognised degree in a safe, inclusive, and technologically advanced society. At Admizz Education, we provide end-to-end support — from university selection and application assistance to IELTS coaching, residence permit processing, and pre-departure guidance.",

  whyStudyTitle: "Why Study in Finland from Nepal",
  whyStudyIntro:
    "Finland offers exceptional education quality, safety, and career opportunities that make it an increasingly popular destination for Nepali students.",
  benefits: [
    {
      title: "Top-Ranked Education System",
      description:
        "Finnish universities are globally recognised for innovative teaching, cutting-edge research, and practical learning approaches.",
    },
    {
      title: "English-Taught Programmes",
      description:
        "Over 500 degree programmes are taught entirely in English across universities and universities of applied sciences (UAS).",
    },
    {
      title: "Affordable Tuition & Scholarships",
      description:
        "Tuition fees range from €4,000–€18,000/year for non-EU students, with generous scholarship and tuition waiver programmes available.",
    },
    {
      title: "Safe & Inclusive Society",
      description:
        "Ranked the happiest and one of the safest countries in the world, Finland offers an excellent quality of life for international students.",
    },
    {
      title: "Innovation & Technology Hub",
      description:
        "Home to companies like Nokia and a thriving startup ecosystem, Finland connects academic learning with real industry opportunities.",
    },
    {
      title: "Post-Study Work Opportunities",
      description:
        "Graduates receive an extended residence permit of up to two years to search for employment in Finland after completing their degree.",
    },
  ],

  visaTitle: "Finland Student Residence Permit Requirements for Nepalese Students",
  visaIntro:
    "Non-EU/EEA students need a student residence permit to study in Finland. The application is processed through the Enter Finland online portal.",
  visaRequirements: [
    {
      category: "Acceptance Letter",
      details: "From a recognised Finnish university or UAS",
    },
    {
      category: "Valid Passport",
      details: "Must be valid for the entire duration of study",
    },
    {
      category: "Financial Proof",
      details: "Minimum €6,720/year (~NPR 10,00,000+) in a bank account",
    },
    {
      category: "English Proficiency",
      details: "IELTS/TOEFL/PTE scores as required by the university",
    },
    {
      category: "Health Insurance",
      details: "Comprehensive health insurance for the duration of stay",
    },
    {
      category: "Accommodation Proof",
      details: "Rental agreement or student housing confirmation",
    },
    {
      category: "Passport Photos",
      details: "Recent passport-size photographs (36mm x 47mm)",
    },
    {
      category: "Biometric Data",
      details: "Fingerprints and photograph at the embassy or VFS centre",
    },
    {
      category: "Residence Permit Fee",
      details: "€350 (online application)",
    },
  ],
  visaNote:
    "Processing Time: 1 to 3 months. Apply as early as possible after receiving your acceptance letter.",

  intakesTitle: "Finland Intakes for Nepalese Students",
  intakesIntro:
    "Finnish universities primarily follow an autumn-based academic calendar, with the main application window in January.",
  intakes: [
    {
      intake: "Main Intake (Autumn/September)",
      months: "Application deadline: January (via Studyinfo.fi)",
      details:
        "Bachelor's and Master's programmes — primary intake with the widest selection of courses and universities",
    },
    {
      intake: "Secondary Intake (Spring/January)",
      months: "Limited availability, varies by university",
      details:
        "Mostly limited to select Master's programmes and UAS courses — fewer options overall",
    },
  ],
  intakesNote:
    "Recommended Timeline for Nepalese Students: Research & shortlist universities (June – September, previous year), Take English proficiency tests (August – November), Prepare documents & motivation letter (November – December), Submit applications via Studyinfo.fi (January), Receive offers (March – May), Apply for residence permit (May – July), Intake begins (August – September).",

  testTitle: "English Language Requirements",
  testIntro:
    "Finnish universities require proof of English proficiency. Here are the typical requirements for Nepali students.",
  testRequirements: [
    {
      test: "IELTS",
      score: "6.0 – 6.5 overall (no band less than 5.5)",
    },
    {
      test: "TOEFL iBT",
      score: "79 – 92",
    },
    {
      test: "PTE",
      score: "54 – 62",
    },
  ],
  testNote:
    "Requirements vary by university and programme. Some UAS institutions may accept lower scores. Always check specific programme requirements.",

  costTitle: "Cost of Studying in Finland from Nepal",
  costIntro:
    "Finland offers competitive costs compared to many Western countries. Here's a breakdown of tuition fees and living expenses for Nepali students.",
  costTables: [
    {
      title: "Tuition Fees (Annual)",
      rows: [
        {
          category: "Bachelor's Programmes (UAS)",
          cost: "€4,000 – €10,000",
          nprCost: "NPR 6 – 15 Lakhs",
        },
        {
          category: "Master's Programmes",
          cost: "€6,000 – €18,000",
          nprCost: "NPR 9 – 27 Lakhs",
        },
        {
          category: "MBA / Specialised Programmes",
          cost: "€8,000 – €24,000",
          nprCost: "NPR 12 – 36 Lakhs",
        },
      ],
    },
    {
      title: "Living Expenses (Monthly & Annual)",
      rows: [
        {
          category: "Accommodation (Monthly/Yearly)",
          cost: "€300 – €700 / €3,600 – €8,400",
        },
        {
          category: "Food & Groceries (Monthly/Yearly)",
          cost: "€200 – €350 / €2,400 – €4,200",
        },
        {
          category: "Transportation (Monthly/Yearly)",
          cost: "€30 – €60 / €360 – €720",
        },
        {
          category: "Miscellaneous (Monthly/Yearly)",
          cost: "€100 – €200 / €1,200 – €2,400",
        },
        {
          category: "Total Living Expenses",
          cost: "€7,500 – €15,000/year",
          nprCost: "NPR 11 – 22 Lakhs",
        },
      ],
    },
    {
      title: "Other Expenses",
      rows: [
        {
          category: "Residence Permit Fee",
          cost: "€350",
          nprCost: "NPR 52,000",
        },
        {
          category: "Health Insurance",
          cost: "€300 – €600/year",
        },
        {
          category: "IELTS or TOEFL Test",
          cost: "NPR 20,000 – 25,000",
        },
        {
          category: "Flight Ticket (One-way)",
          cost: "NPR 50,000 – 90,000",
        },
      ],
    },
  ],
  costNote:
    "Estimated Total First-Year Cost: Tuition + Living (NPR 17 – 49 Lakhs) + Additional Expenses (NPR 1.5 – 2 Lakhs) = Total: NPR 18.5 – 51 Lakhs. Helsinki is the most expensive city; Tampere, Turku, and Oulu are more affordable.",

  scholarshipsTitle: "Scholarships for Nepalese Students to Study in Finland",
  scholarshipsIntro:
    "Several scholarship opportunities are available to help Nepali students reduce tuition costs. Many Finnish universities offer their own tuition fee waivers and scholarships for non-EU/EEA students.",
  scholarships: [
    {
      name: "Finnish Government Scholarship",
      provider: "EDUFI (Finnish National Agency for Education)",
      details:
        "Monthly grant for doctoral-level studies and research. Eligibility: Doctoral students and young researchers",
    },
    {
      name: "University Tuition Fee Waivers",
      provider: "Individual Finnish Universities & UAS",
      details:
        "Partial or full tuition fee waivers (50%–100%). Eligibility: Academic excellence, applied automatically with admission",
    },
    {
      name: "Erasmus+ Scholarship",
      provider: "European Union",
      details:
        "Tuition fees, travel allowance, living stipend. Eligibility: Erasmus Mundus Joint Master Degree programmes",
    },
    {
      name: "CIMO Fellowships",
      provider: "Finnish National Agency for Education",
      details:
        "Monthly stipend for visiting students and researchers. Eligibility: Master's and doctoral students from developing countries",
    },
    {
      name: "University-Specific Scholarships",
      provider: "Haaga-Helia, LAB, SAMK, Karelia, VAMK, XAMK",
      details:
        "Merit-based tuition discounts and early-bird scholarships. Eligibility: High academic performance and timely application",
    },
  ],
  scholarshipsNote:
    "Tip: Apply early and ensure your motivation letter, recommendation letters, and test scores (IELTS/PTE) are strong. Many Finnish UAS institutions offer automatic scholarship consideration during admission.",

  universities: [
    { name: "Haaga-Helia University of Applied Science", logo: "/images/universities/finland/haaga-helia.webp" },
    { name: "South-Eastern Finland University of Applied Science", logo: "/images/universities/finland/south-eastern-finland.webp" },
    { name: "Lab University of Applied Science", logo: "/images/universities/finland/lab-university.webp" },
    { name: "Satakunta University of Applied Science", logo: "/images/universities/finland/satakunta-university.webp" },
    { name: "Vaasa University of Applied Science", logo: "/images/universities/finland/vaasa-university.webp" },
    { name: "Karelia University of Applied Science", logo: "/images/universities/finland/karelia-university.webp" },
  ],

  faqItems: [
    {
      question: "Why should Nepalese students choose Finland for higher education?",
      answer:
        "Finland offers world-class education, innovative teaching methods, affordable tuition with scholarships, a safe society, and strong post-study work opportunities — making it an excellent choice for Nepali students.",
    },
    {
      question: "Do I need to speak Finnish to study in Finland?",
      answer:
        "No. Over 500 degree programmes are taught entirely in English. However, learning basic Finnish can help with daily life and part-time job opportunities.",
    },
    {
      question: "What are the English language requirements for Nepali students?",
      answer:
        "Requirements typically include: IELTS 6.0–6.5, TOEFL iBT 79–92, or PTE 54–62. Requirements vary by university and programme.",
    },
    {
      question: "What are the intakes to apply for universities in Finland?",
      answer:
        "The primary intake is Autumn (September), with applications opening in January via Studyinfo.fi. Some universities offer a limited Spring (January) intake.",
    },
    {
      question: "How much does it cost to study in Finland for Nepali students?",
      answer:
        "Tuition Fees: NPR 6–36 Lakhs/year depending on programme. Living Expenses: NPR 11–22 Lakhs/year. Scholarships and tuition waivers are widely available.",
    },
    {
      question: "Are there scholarships available for Nepalese students in Finland?",
      answer:
        "Yes. Nepali students can apply for university tuition fee waivers (50%–100%), EDUFI fellowships, Erasmus+ scholarships, and university-specific merit scholarships.",
    },
    {
      question: "Can I work while studying in Finland?",
      answer:
        "Yes. International students can work up to 25 hours per week during term time and full-time during holidays without a separate work permit.",
    },
    {
      question: "Can I stay in Finland after graduation?",
      answer:
        "Yes. Graduates receive an extended residence permit of up to two years to search for employment in Finland.",
    },
    {
      question: "What are the residence permit requirements for Nepalese students?",
      answer:
        "You'll need: Acceptance letter from a Finnish university, valid passport, proof of funds (€6,720/year, ~NPR 10 Lakhs), health insurance, and biometric data. The fee is €350.",
    },
    {
      question: "How can Admizz Education help me study in Finland?",
      answer:
        "Admizz provides: University shortlisting, test prep (IELTS/PTE), scholarship guidance, residence permit documentation & application support, and pre-departure counselling.",
    },
  ],

  ctaTitle: "Start Your Journey to Study in Finland from Nepal",
  ctaContent:
    "At Admizz, we help Nepalese students navigate the entire Finland study process — from choosing the right university to preparing documents and applying for a residence permit. We make it clear, personalised, and stress-free. Your future in Finland starts here — with Admizz.",
};

export default async function StudyInFinlandFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "finland" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
