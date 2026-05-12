import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Denmark from Nepal - Admizz Education",
  description:
    "Study in Denmark from Nepal with Admizz. Get expert help with university selection, scholarships, visa & more. Start your journey today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-denmark-from-nepal",
  },
  openGraph: {
    title: "Study in Denmark from Nepal - Admizz Education",
    description:
      "Study in Denmark from Nepal with Admizz. Get expert help with university selection, scholarships, visa & more. Start your journey today!",
    url: "https://admizzeducation.com/study-in-denmark-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "Denmark",
  countryCategorySlug: "denmark",
  heroHeading: "Study in Denmark from Nepal",
  heroSubheading: "Build a Bright Future in One of the World's Top Study Destinations",

  introTitle: "A Smart Step Towards a Global Future",
  introContent: "Denmark is an educational destination featuring world-class universities, English-taught programs, and post-study work opportunities. Danish education prioritizes academic excellence, creativity, and real-world problem solving. At Admizz Education, we provide complete service handling university selection, application support, and IELTS coaching alongside visa processing and pre-departure assistance.",

  whyStudyTitle: "Why Study in Denmark from Nepal",
  whyStudyIntro: "Denmark offers an exceptional education system with innovative teaching methods and excellent opportunities for international students.",
  benefits: [
    {
      title: "World-Class Universities",
      description: "Denmark offers world-class universities like Copenhagen, Aarhus, and DTU, providing globally recognized, career-focused degrees.",
    },
    {
      title: "English-Taught Programs",
      description: "Many Bachelor's and Master's courses are available in English, making it accessible and convenient for Nepali students.",
    },
    {
      title: "Practice-Oriented Learning",
      description: "Danish education emphasizes critical thinking, problem-solving, and real-world application.",
    },
    {
      title: "Affordable Tuition & Scholarships",
      description: "Compared to other European countries, Denmark offers relatively lower tuition fees and several scholarship options.",
    },
    {
      title: "Safe, Clean & Student-Friendly",
      description: "Ranked as one of the safest and happiest countries in the world, Denmark offers a peaceful, inclusive, and high-quality lifestyle.",
    },
    {
      title: "Post-Study Work Opportunities",
      description: "International students can stay back up to 2 years after graduation to work and gain experience in Denmark's robust job market.",
    },
  ],

  visaTitle: "Denmark Student Visa Requirements for Nepalese Students",
  visaIntro: "The Danish Long-Stay Student Visa (Type D) is a Residence Permit for Higher Education. Here are the required documents and information.",
  visaRequirements: [
    {
      category: "Admission Letter",
      details: "From recognized Danish university",
    },
    {
      category: "ST1 Application Form",
      details: "Filled jointly by student and institution",
    },
    {
      category: "Valid Passport",
      details: "Must be valid for entire study duration",
    },
    {
      category: "Financial Proof",
      details: "Approximately DKK 76,764/year or NPR 15,00,000+",
    },
    {
      category: "English Proficiency",
      details: "IELTS/TOEFL/PTE scores",
    },
    {
      category: "Accommodation Proof",
      details: "Rental agreement or accommodation confirmation",
    },
    {
      category: "Travel & Health Insurance",
      details: "Valid travel and health insurance coverage",
    },
    {
      category: "Passport Photos",
      details: "35mm x 45mm passport-size photos",
    },
    {
      category: "Biometric Data",
      details: "Fingerprints and photo",
    },
    {
      category: "Visa Fee",
      details: "Approximately DKK 1,890",
    },
  ],
  visaNote: "Processing Time: 2 to 3 months. Apply early to avoid delays.",

  intakesTitle: "Denmark Intakes for Nepalese Students",
  intakesIntro: "Denmark offers two main intakes throughout the year, with the autumn intake being the primary option for most programs.",
  intakes: [
    {
      intake: "Main Intake (Autumn/September)",
      months: "Application deadline: January – March (varies by university)",
      details: "Bachelor's, Master's, Professional Programs - main intake with maximum course and university options",
    },
    {
      intake: "Secondary Intake (Spring/February)",
      months: "Limited availability in select universities",
      details: "Mostly limited to Master's or technical courses - fewer options overall",
    },
  ],
  intakesNote: "Recommended Timeline for Nepalese Students: Research & shortlist universities (August – October, previous year), Take English proficiency tests (September – November), Prepare documents & SOP (November – December), Submit applications (January – March), Receive offers (April – May), Apply for student visa (May – July), Intake begins (August – September).",

  testTitle: "English Language Requirements",
  testIntro: "Most Danish universities require proof of English proficiency. Here are the typical requirements for Nepali students.",
  testRequirements: [
    {
      test: "IELTS",
      score: "6.5 overall (no band less than 6.0)",
    },
    {
      test: "TOEFL iBT",
      score: "83–100",
    },
    {
      test: "PTE",
      score: "58–65",
    },
  ],
  testNote: "Requirements may vary by university and program. Check specific university requirements before applying.",

  costTitle: "Cost of Studying in Denmark from Nepal",
  costIntro: "Understanding the costs involved is crucial for planning your study journey to Denmark. Here's a breakdown of tuition fees and living expenses.",
  costTables: [
    {
      title: "Tuition Fees (Annual)",
      rows: [
        {
          category: "Bachelor's Programs",
          cost: "DKK 45,000 – 105,000",
          nprCost: "NPR 9 – 20+ Lakhs",
        },
        {
          category: "Master's Programs",
          cost: "DKK 55,000 – 120,000",
          nprCost: "NPR 11 – 24+ Lakhs",
        },
        {
          category: "MBA/Specialized",
          cost: "Up to DKK 150,000",
          nprCost: "NPR 30+ Lakhs",
        },
      ],
    },
    {
      title: "Living Expenses (Monthly & Annual)",
      rows: [
        {
          category: "Accommodation (Monthly/Yearly)",
          cost: "DKK 2,500 – 4,500 / DKK 30,000 – 54,000",
        },
        {
          category: "Food & Utilities (Monthly/Yearly)",
          cost: "DKK 1,500 – 2,000 / DKK 18,000 – 24,000",
        },
        {
          category: "Transportation (Monthly/Yearly)",
          cost: "DKK 300 – 500 / DKK 3,600 – 6,000",
        },
        {
          category: "Miscellaneous (Monthly/Yearly)",
          cost: "DKK 800 – 1,200 / DKK 9,600 – 14,400",
        },
        {
          category: "Total Living Expenses",
          cost: "DKK 60,000 – 96,000/year",
          nprCost: "NPR 12–18 Lakhs",
        },
      ],
    },
    {
      title: "Other Expenses",
      rows: [
        {
          category: "Residence Permit (Visa)",
          cost: "DKK 1,890",
          nprCost: "NPR 37,000",
        },
        {
          category: "Health Insurance",
          cost: "DKK 3,000 – 5,000/year",
        },
        {
          category: "IELTS or TOEFL Test",
          cost: "NPR 20,000 – 25,000",
        },
        {
          category: "Flight Ticket (One-way)",
          cost: "NPR 60,000 – 100,000",
        },
      ],
    },
  ],
  costNote: "Estimated Total First-Year Cost: Tuition + Living (NPR 20 – 40 Lakhs) + Additional Expenses (NPR 1.5 – 2.5 Lakhs) = Total: NPR 21.5 – 42.5 Lakhs",

  scholarshipsTitle: "Scholarships for Nepalese Students to Study in Denmark",
  scholarshipsIntro: "Several scholarship opportunities are available to help reduce the cost of studying in Denmark. Popular universities offering scholarships include University of Copenhagen, Aarhus University, Technical University of Denmark (DTU), Copenhagen Business School (CBS), Aalborg University, and Roskilde University.",
  scholarships: [
    {
      name: "Danish Government Scholarship",
      provider: "Ministry of Higher Education",
      details: "Full or partial tuition + living expenses. Eligibility: Outstanding academic performance, non-EU/EEA students",
    },
    {
      name: "Erasmus+ Scholarship",
      provider: "European Union",
      details: "Tuition fees, travel allowance, living stipend. Eligibility: Erasmus Mundus Joint Master Degree programs",
    },
    {
      name: "Nordplus Programme",
      provider: "Nordic Council",
      details: "Travel + study grants (limited). Eligibility: Exchange students in Nordplus institutions",
    },
    {
      name: "University-Specific Scholarships",
      provider: "Individual Danish Universities",
      details: "Tuition waivers, partial funding. Eligibility: Academic merit or financial need",
    },
    {
      name: "Private Foundation Scholarships",
      provider: "Danish Foundations/Alumni Networks",
      details: "Variable coverage. Eligibility: Course-specific, merit-based",
    },
  ],
  scholarshipsNote: "Tip: Apply early and ensure your SOP, recommendation letters, and test scores (IELTS/PTE) are strong.",

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

  faqItems: [
    {
      question: "Why should Nepalese students choose Denmark for higher education?",
      answer: "Denmark offers world-class education, globally recognized degrees, innovative teaching methods, and excellent post-study work opportunities. It's known for its high quality of life, student-friendly cities, and strong English-taught programs.",
    },
    {
      question: "Do I need to speak Danish to study in Denmark?",
      answer: "No. Many Bachelor's and Master's programs are taught entirely in English. However, learning basic Danish can be helpful for daily life and part-time job opportunities.",
    },
    {
      question: "What are the English language requirements for Nepali students?",
      answer: "Requirements typically include: IELTS: 6.5 overall (no band less than 6.0), TOEFL iBT: 83–100, PTE: 58–65. Requirements may vary by university and program.",
    },
    {
      question: "What are the intakes to apply for universities in Denmark?",
      answer: "The primary intake is Autumn (September). Some universities also offer a Spring (February) intake for select programs.",
    },
    {
      question: "How much does it cost to study in Denmark for Nepali students?",
      answer: "Tuition Fees: NPR 9 – 30+ Lakhs/year. Living Expenses: NPR 12 – 18 Lakhs/year. Scholarships available to help reduce costs.",
    },
    {
      question: "Are there scholarships available for Nepalese students in Denmark?",
      answer: "Yes. Nepali students can apply for Danish Government Scholarships, Erasmus+ Scholarships, University-specific merit scholarships, and Private foundation or alumni scholarships.",
    },
    {
      question: "Can I work while studying in Denmark?",
      answer: "Yes. International students can work 20 hours per week during the semester and full-time during holidays.",
    },
    {
      question: "Can I stay in Denmark after graduation?",
      answer: "Yes. After completing your studies, you can apply for a 6-month post-study job search visa, and later for a work visa if you find employment.",
    },
    {
      question: "What are the student visa requirements for Nepalese students?",
      answer: "You'll need: Admission letter from Danish university, ST1 visa application form, Proof of funds (~NPR 15+ Lakhs/year), Health insurance, accommodation, and biometric data.",
    },
    {
      question: "How can Admizz Education help me study in Denmark?",
      answer: "Admizz provides: University shortlisting, Test prep (IELTS/PTE), Scholarship guidance, Visa documentation & application support, Pre-departure counseling.",
    },
  ],

  ctaTitle: "Start Your Journey to Study in Denmark from Nepal",
  ctaContent: "At Admizz, we help Nepalese students navigate the entire Denmark study process — from choosing the right university to preparing documents and applying for a visa. We make it clear, personalized, and stress-free. Your future in Denmark starts here — with Admizz.",
};

export default async function StudyInDenmarkFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "denmark" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
