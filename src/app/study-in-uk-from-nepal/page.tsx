import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in UK from Nepal - Admizz Education",
  description:
    "Study in UK from Nepal with Admizz Education – Your complete guide to UK education, visas, costs & careers. Expert guidance for Nepali students.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-uk-from-nepal",
  },
  openGraph: {
    title: "Study in UK from Nepal - Admizz Education",
    description:
      "Study in UK from Nepal with Admizz Education – Your complete guide to UK education, visas, costs & careers. Expert guidance for Nepali students.",
    url: "https://admizzeducation.com/study-in-uk-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "UK",
  countryCategorySlug: "uk",
  heroHeading: "Study in UK from Nepal",
  heroSubheading:
    "From university selection to visa approval, we guide Nepali students through every step of their UK education journey. Join 1,500+ students who achieved their British university dreams with Admizz Education.",

  introTitle: "Study in UK from Nepal with Expert Guidance",
  introContent:
    "The UK offers a perfect balance of quality education, affordability, and career growth for Nepali students. From globally recognised degrees to 2-year post-study work visas, the UK remains one of the top destinations for Nepali students seeking world-class education and international career opportunities.",

  whyStudyTitle: "Why Study in the UK from Nepal?",
  whyStudyIntro:
    "The UK offers a perfect balance of quality education, affordability, and career growth for Nepali students.",
  benefits: [
    {
      title: "Globally Recognised Degrees",
      description:
        "UK universities rank among the world's top institutions. Degrees recognized worldwide by employers. 4 UK universities in QS World Top 10.",
    },
    {
      title: "1-Year Master's Programs",
      description:
        "Save time and money with shorter duration. Start your career faster than other countries. Intensive, industry-focused curriculum.",
    },
    {
      title: "Graduate Route Visa - 2 Years",
      description:
        "Work in UK for 2 years after graduation. 3 years for PhD graduates. Gain valuable international experience.",
    },
    {
      title: "Multicultural & Safe",
      description:
        "Diverse community from 200+ countries. Safe cities with excellent transport. Strong Nepali student community.",
    },
    {
      title: "Part-Time Work Allowed",
      description:
        "Work 20 hours/week during term. Full-time work during holidays. Earn £10-15/hour minimum wage.",
    },
    {
      title: "Quality Assurance",
      description:
        "All universities rigorously quality-checked. Qualifications recognized globally. High employability after graduation.",
    },
  ],

  whyAdmizzTitle: "Why Choose Admizz Education?",
  whyAdmizzPoints: [
    "Free career counselling – Expert guidance tailored to your goals",
    "University shortlisting – Access to 160+ partner universities",
    "Scholarship assistance – $5M+ awarded to our students",
    "Visa support – 95% visa approval success rate",
    "Complete support – From Nepal to UK and beyond",
    "Proven track record – 10,000+ successful placements",
  ],

  topCoursesTitle: "Best Courses to Study in the UK",
  topCourses: [
    "Business & Management",
    "Data Science & AI",
    "Computer Science & IT",
    "Engineering",
    "Health Sciences & Nursing",
    "Finance & Accounting",
    "Law & International Relations",
    "Marketing & Digital Media",
  ],

  visaTitle: "UK Student Visa Process – Step by Step",
  visaIntro:
    "Admizz Education provides end-to-end UK visa support with 95% success rate.",
  visaRequirements: [
    {
      category: "1. Choose Course",
      details: "Select your program and receive offer from a UKVI-approved university",
    },
    {
      category: "2. Receive Offer",
      details: "Accept offer and meet conditions set by the university",
    },
    {
      category: "3. Pay Deposit",
      details: "Secure your place with tuition deposit payment",
    },
    {
      category: "4. Get CAS",
      details: "Receive Confirmation of Acceptance for Studies from the university",
    },
    {
      category: "5. Prepare Docs",
      details: "Gather all required documents including financial proof and English proficiency",
    },
    {
      category: "6. Submit Application",
      details: "Complete online visa application with all supporting documents",
    },
    {
      category: "7. Biometrics",
      details: "Attend VFS appointment in Kathmandu for biometric submission",
    },
    {
      category: "8. Visa Approval",
      details: "Decision within 3-4 weeks. Priority services available for faster processing.",
    },
  ],

  intakesTitle: "Key Intakes in the UK",
  intakesIntro:
    "Understanding UK intakes helps you plan early and avoid last-minute rejections.",
  intakes: [
    {
      intake: "September (Main Intake)",
      months: "Application: November – May",
      details:
        "Most popular intake. Maximum universities & course options. Higher scholarship availability.",
    },
    {
      intake: "January (Alternative)",
      months: "Application: July – October",
      details:
        "Good alternative if you miss September. Limited course options. Ideal for gap year students.",
    },
    {
      intake: "May (Limited)",
      months: "Select universities only",
      details:
        "Suitable for diploma and selected master's programs. Smaller student cohorts.",
    },
  ],

  costTitle: "Cost of Studying in the UK from Nepal",
  costIntro:
    "Planning to study in UK requires a clear understanding of the overall costs involved.",
  costTables: [
    {
      title: "Tuition Fees (Per Year)",
      rows: [
        {
          category: "Undergraduate",
          cost: "£10,000 – £20,000",
        },
        {
          category: "Postgraduate",
          cost: "£12,000 – £25,000",
        },
        {
          category: "MBA / Professional",
          cost: "£20,000 – £35,000+",
        },
      ],
    },
    {
      title: "Additional Costs (Per Year)",
      rows: [
        {
          category: "Living Expenses",
          cost: "£9,000 – £12,000",
        },
        {
          category: "Health Surcharge (NHS)",
          cost: "£470",
        },
      ],
    },
  ],
  costNote:
    "Total costs vary by city. London is higher; smaller cities are more budget-friendly.",

  scholarshipsTitle: "Scholarships for Nepalese Students",
  scholarshipsIntro:
    "The UK offers a wide range of funding opportunities to reduce financial stress.",
  scholarships: [
    {
      name: "Chevening Scholarships",
      details:
        "Fully funded master's degree for future leaders from Nepal. Covers tuition, living costs, and travel.",
    },
    {
      name: "Commonwealth Scholarships",
      details:
        "Full funding for postgraduate students from developing Commonwealth nations. Focus on development-related subjects.",
    },
    {
      name: "GREAT Scholarships",
      details:
        "Minimum £10,000 offered by UK universities & British Council. Available across multiple fields of study.",
    },
    {
      name: "Saltire Scholarships",
      details:
        "£8,000 for science, tech, and renewable energy studies at Scottish universities only.",
    },
    {
      name: "University Awards",
      details:
        "£2,000 - £20,000 based on merit and financial need. Examples include Manchester and Edinburgh Global scholarships.",
    },
  ],

  universities: [
    { name: "Buckinghamshire New University", logo: "/images/universities/uk/Buckinghamshire-New-University.webp" },
    { name: "BPP University", logo: "/images/universities/uk/BPP-University.webp" },
    { name: "Coventry University", logo: "/images/universities/uk/Coventry-University.webp" },
    { name: "Health Sciences University", logo: "/images/universities/uk/Health-Sciences-University.webp" },
    { name: "Ravensbourne University London", logo: "/images/universities/uk/Ravensbourne-University-London.webp" },
    { name: "University of Sunderland", logo: "/images/universities/uk/University-of-Sunderland.webp" },
    { name: "University of East London", logo: "/images/universities/uk/University-of-East-London.webp" },
    { name: "Ulster University", logo: "/images/universities/uk/Ulster-University.webp" },
    { name: "University of Greenwich", logo: "/images/universities/uk/University-of-Greenwich.webp" },
    { name: "The University of Law", logo: "/images/universities/uk/The-University-of-Law.webp" },
    { name: "University of Roehampton", logo: "/images/universities/uk/University-of-Roehampton.webp" },
    { name: "University of Worcester", logo: "/images/universities/uk/University-of-Worcester.webp" },
    { name: "University of West London", logo: "/images/universities/uk/University-of-West-London.webp" },
    { name: "University of the West of Scotland", logo: "/images/universities/uk/University-of-the-West-of-Scotland.webp" },
    { name: "York St John University", logo: "/images/universities/uk/York-St-John-University.webp" },
  ],

  faqItems: [
    {
      question: "How long does the UK student visa process take?",
      answer:
        "Usually 3-4 weeks after biometric submission from VFS Global Kathmandu. Priority services are available for faster processing.",
    },
    {
      question: "Can I work while studying in the UK?",
      answer:
        "Yes, 20 hours/week during term time and full-time during holidays. The UK minimum wage is £10-15/hour.",
    },
    {
      question: "Do I need IELTS for UK study?",
      answer:
        "Yes, most universities require IELTS (6.0-7.0). Some accept alternatives like PTE or may waive if you studied in English medium.",
    },
    {
      question: "What is the post-study work visa duration?",
      answer:
        "2-year Graduate Route Visa for Bachelor's/Master's graduates, and 3 years for PhD students to work in the UK.",
    },
    {
      question: "Can I apply with a study gap?",
      answer:
        "Yes, many UK universities accept gaps of 5-10 years with proper justification through work experience or personal development.",
    },
    {
      question: "What are the living expenses in the UK?",
      answer:
        "£9,000-£12,000/year outside London, £15,600/year in London including accommodation, food, and transport.",
    },
  ],

  ctaTitle: "Ready to Begin Your Study Abroad Journey?",
  ctaContent:
    "Our expert consultants are here to guide you every step of the way.",
};

export default async function StudyInUKFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(
    postsByCategoryQuery,
    { categorySlug: "uk" }
  );
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
