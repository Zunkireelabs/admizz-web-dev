import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in USA from Nepal - Admizz Education",
  description:
    "Study in USA from Nepal with Admizz Education – Complete guide to universities, visas, tests, intakes & careers. Expert guidance for Nepali students.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-usa-from-nepal",
  },
  openGraph: {
    title: "Study in USA from Nepal - Admizz Education",
    description:
      "Study in USA from Nepal with Admizz Education – Complete guide to universities, visas, tests, intakes & careers. Expert guidance for Nepali students.",
    url: "https://admizzeducation.com/study-in-usa-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "USA",
  countryCategorySlug: "usa",
  heroHeading: "Study in USA from Nepal",
  heroSubheading:
    "Dreaming of studying in the United States from Nepal? The USA offers world-class universities, flexible programs, global exposure, and high-paying career opportunities. With the right guidance, studying in the USA becomes simple and achievable. Admizz Education supports Nepali students at every step — from choosing the right university to securing a US student visa.",

  introTitle: "Complete Guide to Universities, Visas, Tests, Intakes & Careers",
  introContent:
    "The USA is home to the world's most advanced education system, offering unparalleled opportunities for Nepali students. From top-ranked universities like MIT and Harvard to flexible course structures and STEM OPT extensions of up to 36 months, the USA remains the top choice for ambitious Nepali students seeking global careers.",

  whyStudyTitle: "Why Study in the USA from Nepal?",
  whyStudyIntro:
    "As a matter of fact, the USA is home to the world's most advanced education system, offering unparalleled opportunities for Nepali students.",
  benefits: [
    {
      title: "World's Top Universities",
      description:
        "Home to MIT, Harvard, Stanford, and more. 18 of the top 20 global universities are in the USA. Globally recognized degrees that open doors worldwide.",
    },
    {
      title: "Flexible Course Structure",
      description:
        "Freedom to choose majors and minors. Interdisciplinary programs tailored to your interests. Liberal arts approach for well-rounded education.",
    },
    {
      title: "Research & Innovation Hub",
      description:
        "Access to cutting-edge research facilities. Internships and co-op programs with top companies. Strong focus on STEM and innovation.",
    },
    {
      title: "STEM OPT Extension - 36 Months",
      description:
        "Work in the USA for up to 3 years after graduation. 12 months standard OPT + 24 months STEM extension. Gain valuable international work experience.",
    },
    {
      title: "High Return on Investment (ROI)",
      description:
        "Average starting salary: $60,000-$100,000+. Strong career prospects in technology and business. Networking opportunities with global leaders.",
    },
    {
      title: "Global Career Opportunities",
      description:
        "American degree valued by employers worldwide. Access to Fortune 500 companies. Strong alumni networks across industries.",
    },
  ],

  whyAdmizzTitle: "Why Choose Admizz Education?",
  whyAdmizzPoints: [
    "Free career counselling – Personalized guidance tailored to your goals",
    "University shortlisting – Access to 100+ partner universities",
    "Scholarship assistance – $5M+ awarded to our students",
    "F-1 visa support – 95% visa approval success rate",
    "End-to-end support – From Nepal to USA and beyond",
    "Proven track record – 10,000+ successful placements",
  ],

  topCoursesTitle: "Best Courses to Study in the USA",
  topCourses: [
    "Computer Science & IT",
    "Data Science & AI",
    "Engineering (STEM)",
    "Business Analytics & MBA",
    "Finance & Accounting",
    "Biotechnology & Life Sciences",
    "Public Health & Healthcare",
  ],

  visaTitle: "USA Student Visa (F-1) Process – Step by Step",
  visaIntro:
    "Follow these essential steps to successfully obtain your F-1 student visa from Nepal.",
  visaRequirements: [
    {
      category: "1. Select University",
      details: "Choose your course and university from SEVP-approved institutions",
    },
    {
      category: "2. Receive Offer",
      details: "Get admission offer letter from the university",
    },
    {
      category: "3. Accept & Deposit",
      details: "Accept offer and pay the required tuition deposit",
    },
    {
      category: "4. Receive I-20",
      details: "Get official I-20 form from the university",
    },
    {
      category: "5. Pay SEVIS Fee",
      details: "Complete SEVIS I-901 fee payment ($350)",
    },
    {
      category: "6. Submit DS-160",
      details: "Fill and submit the online visa application form",
    },
    {
      category: "7. Visa Interview",
      details: "Attend interview at the US Embassy in Kathmandu",
    },
    {
      category: "8. Visa Approval",
      details: "Receive F-1 visa stamp. Admizz provides comprehensive support with 95% success rate.",
    },
  ],

  intakesTitle: "Plan Your Admission - Key Intakes in the USA",
  intakesIntro:
    "Choosing the right intake significantly improves your admission and funding chances.",
  intakes: [
    {
      intake: "Fall (Aug-Sep) – Main Intake",
      months: "Application: November – January",
      details:
        "Maximum universities and programs. Best scholarships and financial aid options. Largest student cohorts for better networking.",
    },
    {
      intake: "Spring (January) – Alternative",
      months: "Application: July – October",
      details:
        "Excellent alternative if you miss Fall intake. Fewer courses but less competition for admission.",
    },
    {
      intake: "Summer (May-Jun) – Limited",
      months: "Select universities only",
      details:
        "Available at limited universities. Suitable for specific programs. Smaller class sizes, ideal for accelerated programs.",
    },
  ],
  intakesNote:
    "Admizz Education helps you select the best intake based on your academic profile and career goals.",

  testTitle: "English & Entrance Exam Requirements",
  testIntro:
    "US universities accept multiple English proficiency tests, giving you flexibility in your application.",
  testRequirements: [
    {
      test: "IELTS (Bachelor's)",
      score: "6.0 – 6.5",
      notes: "Most widely accepted English proficiency test",
    },
    {
      test: "TOEFL (Bachelor's)",
      score: "70 – 80 iBT",
      notes: "Preferred by many US universities",
    },
    {
      test: "Duolingo (Bachelor's)",
      score: "95 – 105",
      notes: "Increasingly accepted alternative",
    },
    {
      test: "IELTS (Master's)",
      score: "6.5 – 7.0",
      notes: "Higher requirement for graduate programs",
    },
    {
      test: "TOEFL (Master's)",
      score: "80 – 100 iBT",
      notes: "Standard for graduate admissions",
    },
    {
      test: "Duolingo (Master's)",
      score: "105 – 120",
      notes: "Accepted at select graduate programs",
    },
    {
      test: "GRE / GMAT",
      score: "Varies by program",
      notes: "Required for some MS and MBA programs. Many universities offer test waivers.",
    },
  ],
  testNote:
    "Whether you qualify for a waiver or need a strategic test preparation plan, Admizz Education ensures you're exam-ready and application-strong.",

  costTitle: "Cost of Studying in the USA from Nepal",
  costIntro:
    "Here's a comprehensive breakdown of yearly expenses for Nepali students planning to study in America.",
  costTables: [
    {
      title: "Tuition Fees (Per Year)",
      rows: [
        {
          category: "Undergraduate",
          cost: "$15,000 – $35,000",
        },
        {
          category: "Postgraduate",
          cost: "$20,000 – $40,000",
        },
        {
          category: "MBA / Professional",
          cost: "$30,000 – $60,000+",
        },
      ],
    },
    {
      title: "Additional Costs (Per Year)",
      rows: [
        {
          category: "Living Costs",
          cost: "$10,000 – $15,000",
        },
        {
          category: "Health Insurance",
          cost: "$500 – $1,500",
        },
      ],
    },
  ],
  costNote:
    "Living expenses vary significantly by state. Cities like New York and San Francisco are costlier than smaller towns in the Midwest.",

  scholarshipsTitle: "Scholarships for Nepalese Students",
  scholarshipsIntro:
    "Nepali students can apply for various prestigious scholarships to significantly reduce tuition costs.",
  scholarships: [
    {
      name: "Fulbright Program",
      details:
        "Fully funded master's degree for exceptional scholars from Nepal.",
    },
    {
      name: "Hubert H. Humphrey Fellowship",
      details:
        "For mid-career professionals with leadership potential.",
    },
    {
      name: "EducationUSA Opportunity Funds",
      details:
        "Financial assistance for underprivileged students.",
    },
    {
      name: "University-Specific Scholarships",
      details:
        "Merit-based awards based on GPA and test scores.",
    },
    {
      name: "International Student Grants",
      details:
        "Available at many US institutions for talented students.",
    },
  ],
  scholarshipsNote:
    "Admizz Education helps identify relevant scholarships and supports you in applying with a strong profile and compelling documents.",

  universities: [
    { name: "Colorado State University", logo: "/images/universities/usa/COLORADO.webp" },
    { name: "Webster University", logo: "/images/universities/usa/webster-1.webp" },
    { name: "Avila University", logo: "/images/universities/usa/AVILA.webp" },
    { name: "Concordia University", logo: "/images/universities/usa/CONCORDIA.webp" },
    { name: "Southeast Missouri State", logo: "/images/universities/usa/SOUTHEAST-MISSOURI.webp" },
    { name: "Herzing University", logo: "/images/universities/usa/HERZING.webp" },
    { name: "Wright State University", logo: "/images/universities/usa/WRIGHT-STATE.webp" },
    { name: "Washington University", logo: "/images/universities/usa/WASHINGTON.webp" },
    { name: "Texas State University", logo: "/images/universities/usa/TEXAS.webp" },
    { name: "Murray State University", logo: "/images/universities/usa/MURRAY.webp" },
    { name: "Youngstown State University", logo: "/images/universities/usa/YOUNGSTOWN.webp" },
    { name: "University of Central Arkansas", logo: "/images/universities/usa/CENTRAL-ARKANSAS.webp" },
    { name: "Dakota State University", logo: "/images/universities/usa/DAKOTA-STATE.webp" },
    { name: "University of South Dakota", logo: "/images/universities/usa/UNIVERSITY-F-SOUTH-DAKOTA.webp" },
    { name: "Pacific Oaks College", logo: "/images/universities/usa/PACIFIC.webp" },
    { name: "Bethesda University", logo: "/images/universities/usa/BETHESDA.webp" },
    { name: "St. Cloud State University", logo: "/images/universities/usa/ST-CLOUD.webp" },
    { name: "South Dakota State University", logo: "/images/universities/usa/South.webp" },
    { name: "Post University", logo: "/images/universities/usa/POST.webp" },
    { name: "Northwest Missouri State", logo: "/images/universities/usa/NORTHWEST.webp" },
    { name: "Minnesota State University", logo: "/images/universities/usa/MINNESOTA-STATE.webp" },
  ],

  faqItems: [
    {
      question: "Can I apply to US universities after +2 in Nepal?",
      answer:
        "Yes, absolutely! US universities accept Nepali students with +2 qualifications for undergraduate programs. However, you'll need to meet English proficiency requirements and submit required standardized test scores.",
    },
    {
      question: "Is IELTS or TOEFL mandatory for USA?",
      answer:
        "Yes. US universities require proof of English proficiency through IELTS, TOEFL, or Duolingo. Nevertheless, some universities may waive this requirement if you studied in English medium for a certain period.",
    },
    {
      question: "Can Nepali students work while studying in the USA?",
      answer:
        "Yes. International students can work part-time (20 hours per week) on-campus during studies and full-time during breaks. Additionally, after one year, you may qualify for CPT (internship opportunities).",
    },
    {
      question: "Are scholarships available for Nepali students?",
      answer:
        "Yes. Scholarships are available from government-funded programs like Fulbright to university-specific awards. In fact, many universities offer merit-based scholarships ranging from partial to full tuition coverage.",
    },
    {
      question: "What is OPT and CPT?",
      answer:
        "OPT (Optional Practical Training) allows you to work after graduation for 12 months, or 36 months for STEM programs. Meanwhile, CPT (Curricular Practical Training) allows internships during your course after completing one academic year.",
    },
    {
      question: "How long does the F-1 visa process take?",
      answer:
        "Once you receive your I-20 and pay the SEVIS fee, the F-1 visa typically takes 1-4 weeks after the interview. However, processing times may vary during peak seasons.",
    },
    {
      question: "Can I stay in the USA after graduation?",
      answer:
        "Yes. With OPT, you can stay 1 year (or 3 years for STEM programs). Furthermore, you may apply for an H-1B work visa to continue working in the USA long-term.",
    },
    {
      question: "Does Admizz offer test preparation in Nepal?",
      answer:
        "Yes. Admizz Education offers expert coaching for IELTS, TOEFL, SAT, GRE, GMAT, and all other required exams. As a result, our students achieve competitive scores for top university admissions.",
    },
  ],

  ctaTitle: "Ready to Begin Your Study Abroad Journey?",
  ctaContent:
    "Our expert consultants are here to guide you every step of the way.",
};

export default async function StudyInUSAFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(
    postsByCategoryQuery,
    { categorySlug: "usa" }
  );
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
