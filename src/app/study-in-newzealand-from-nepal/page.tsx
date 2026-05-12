import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in New Zealand from Nepal - Admizz Education",
  description:
    "Study in New Zealand from Nepal with Admizz Education – Expert guidance, top universities, visa support, scholarships & affordable study abroad solutions.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-newzealand-from-nepal",
  },
  openGraph: {
    title: "Study in New Zealand from Nepal - Admizz Education",
    description:
      "Study in New Zealand from Nepal with Admizz Education – Expert guidance, top universities, visa support, scholarships & affordable study abroad solutions.",
    url: "https://admizzeducation.com/study-in-newzealand-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "New Zealand",
  countryCategorySlug: "new-zealand",
  heroHeading: "Study in New Zealand from Nepal",
  heroSubheading:
    "Explore world-class universities, scholarships, and a smooth visa process with Admizz Education. Start your journey to quality education in New Zealand today!",

  introTitle: "Why Choose New Zealand for Higher Education?",
  introContent:
    "New Zealand is rapidly becoming one of the most preferred study destinations for Nepali students due to its globally recognized degrees, safe environment, and innovative learning opportunities. Here's why studying in New Zealand is a smart choice.",

  whyStudyTitle: "Why Choose New Zealand for Higher Education?",
  whyStudyIntro:
    "New Zealand is rapidly becoming one of the most preferred study destinations for Nepali students due to its globally recognized degrees, safe environment, and innovative learning opportunities.",
  benefits: [
    {
      title: "World-Class Education",
      description:
        "Home to top-ranked universities offering internationally recognized programs.",
    },
    {
      title: "Affordable Tuition & Living Costs",
      description:
        "Competitive education costs compared to other western countries.",
    },
    {
      title: "Safe & Friendly Environment",
      description:
        "One of the safest countries with multicultural inclusivity.",
    },
    {
      title: "Post-Study Work Opportunities",
      description:
        "Gain valuable work experience after graduation.",
    },
    {
      title: "Scholarships & Financial Aid",
      description:
        "Numerous scholarships are available to support Nepali students.",
    },
  ],

  visaTitle: "New Zealand Student Visa Requirements for Nepalese Students",
  visaIntro:
    "To study in New Zealand, Nepalese students need to apply for a Fee-Paying Student Visa. Here's what you should know:",
  visaRequirements: [
    {
      category: "Visa Type",
      details: "Fee-Paying Student Visa",
    },
    {
      category: "Eligibility",
      details:
        "Offer letter from an NZQA-recognized university or institute",
    },
    {
      category: "Work Rights",
      details:
        "20 hours/week during semesters and full-time during holidays",
    },
    {
      category: "Financial Proof",
      details:
        "Proof of tuition payment and $20,000 NZD/year for living expenses",
    },
    {
      category: "Insurance & Health",
      details:
        "Must have medical and travel insurance during your stay",
    },
    {
      category: "Application Process",
      details: "Apply online via immigration.govt.nz",
    },
  ],
  visaNote:
    "Admizz offers complete visa assistance including document preparation, SOP writing, financial guidance, and interview support.",

  intakesTitle: "New Zealand Intakes for Nepalese Students",
  intakesIntro:
    "Nepalese students can apply for the following intakes in New Zealand:",
  intakes: [
    {
      intake: "Main",
      months: "February – March",
    },
    {
      intake: "Mid-Year",
      months: "July – August",
    },
    {
      intake: "Rolling",
      months: "Some courses offer flexible intakes",
    },
  ],
  intakesNote: "Apply early to secure scholarships and preferred course dates.",

  costTitle: "Cost of Studying in New Zealand from Nepal",
  costIntro:
    "Studying in New Zealand offers great value with globally recognized education and a high standard of living. Below is a breakdown of expected expenses for Nepalese students:",
  costTables: [
    {
      title: "Tuition Fees (Per Year)",
      rows: [
        {
          category: "Undergraduate",
          cost: "NZD $20,000 – $30,000",
        },
        {
          category: "Postgraduate",
          cost: "NZD $25,000 – $40,000",
        },
        {
          category: "PhD (with subsidy)",
          cost: "NZD $6,500 – $10,000 (domestic rate)",
        },
        {
          category: "Vocational/Diploma",
          cost: "NZD $10,000 – $22,000",
        },
      ],
    },
  ],

  scholarshipsTitle: "Scholarships for Nepalese Students",
  scholarshipsIntro:
    "New Zealand offers a wide range of scholarships to help Nepalese students fund their studies. These merit-based and need-based opportunities make studying in New Zealand more affordable and accessible.",
  scholarships: [
    {
      name: "New Zealand Scholarships (MFAT)",
      details:
        "Fully funded by NZ government for postgraduate students from Nepal.",
    },
    {
      name: "University of Auckland International Student Excellence Scholarship",
      details:
        "For outstanding academic achievers enrolling in UG or PG programs.",
    },
    {
      name: "Victoria University of Wellington Tongarewa Scholarship",
      details:
        "Partial funding for UG and PG international students.",
    },
    {
      name: "Lincoln University International Scholarships",
      details:
        "Offered to high-performing international students across all levels.",
    },
    {
      name: "AUT International Excellence Scholarships",
      details:
        "For full-time UG and PG students showing academic merit.",
    },
    {
      name: "University-specific Merit Awards",
      details:
        "Based on grades, IELTS scores, or leadership and extracurricular activities.",
    },
  ],
  scholarshipsNote:
    "Some scholarships cover tuition fees, living expenses, and travel costs.",

  universities: [
    { name: "University of Auckland", logo: "/images/universities/newzealand/university-of-auckland.webp" },
    { name: "University of Otago", logo: "/images/universities/newzealand/university-of-otago.webp" },
    { name: "Victoria University of Wellington", logo: "/images/universities/newzealand/victoria-university-of-wellington.webp" },
    { name: "University of Canterbury", logo: "/images/universities/newzealand/university-of-canterbury.webp" },
    { name: "Massey University", logo: "/images/universities/newzealand/massey-university.webp" },
    { name: "Lincoln University", logo: "/images/universities/newzealand/lincoln-university.webp" },
    { name: "Auckland University of Technology", logo: "/images/universities/newzealand/auckland-university-of-technology.webp" },
    { name: "Unitec Institute of Technology", logo: "/images/universities/newzealand/unitec-institute-of-technology.webp" },
    { name: "Eastern Institute of Technology", logo: "/images/universities/newzealand/eastern-institute-of-technology.webp" },
  ],

  faqItems: [
    {
      question: "Can I apply to study in New Zealand after +2 from Nepal?",
      answer:
        "Yes, Nepalese students who have completed Grade 12 can apply for undergraduate diploma or bachelor's degree programs in New Zealand.",
    },
    {
      question:
        "Is IELTS mandatory to study in New Zealand from Nepal?",
      answer:
        "Yes, most institutions require IELTS or an equivalent English proficiency test like PTE or TOEFL for admission.",
    },
    {
      question:
        "How much does it cost to study in New Zealand for Nepalese students?",
      answer:
        "Tuition fees range from NZD 15,000 to NZD 30,000 per year. Living expenses are around NZD 15,000 annually.",
    },
    {
      question:
        "Are there scholarships for Nepalese students in New Zealand?",
      answer:
        "Yes, several universities offer scholarships based on academic performance, leadership, or financial need.",
    },
    {
      question: "Can I work while studying in New Zealand?",
      answer:
        "Yes, Nepalese students on a student visa can work up to 20 hours per week during semesters and full-time during scheduled breaks.",
    },
    {
      question:
        "What is the post-study work visa policy in New Zealand?",
      answer:
        "Graduates can apply for a post-study work visa for up to 3 years depending on the level and location of the qualification.",
    },
    {
      question:
        "When should I start applying for New Zealand intakes?",
      answer:
        "It's best to start 6–9 months in advance. Major intakes are in February and July, with some institutions offering rolling intakes.",
    },
    {
      question:
        "Does Admizz provide visa assistance for New Zealand?",
      answer:
        "Absolutely. Admizz offers complete support for student visa applications, including document preparation, interview tips, and lodgment.",
    },
  ],

  ctaTitle: "Ready to start your journey to study in New Zealand from Nepal?",
  ctaContent:
    "Admizz Education guides you through university selection, visa process, scholarships, and accommodation.",
};

export default async function StudyInNewZealandFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(
    postsByCategoryQuery,
    { categorySlug: "new-zealand" }
  );
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
