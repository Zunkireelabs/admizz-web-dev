import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";

export const metadata: Metadata = {
  title: "Study in Canada from Nepal - Admizz Education",
  description:
    "Study in Canada from Nepal with Admizz Education \u2013 Expert guidance, top universities, visa support & affordable study abroad solutions.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-canada-from-nepal/",
  },
  openGraph: {
    title: "Study in Canada from Nepal - Admizz Education",
    description:
      "Study in Canada from Nepal with Admizz Education \u2013 Expert guidance, top universities, visa support & affordable study abroad solutions.",
    url: "https://admizzeducation.com/study-in-canada-from-nepal/",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "Canada",
  heroHeading: "Study in Canada from Nepal",
  heroSubheading: "Study in Canada from Nepal with Admizz Education—expert counselling, top universities, visa support & affordable study abroad solutions.",

  introTitle: "Your Gateway to Global Education with Admizz Education",
  introContent: "Canada is one of the most popular study abroad destinations for Nepalese students because of its world-class education system, affordable tuition fees, scholarship opportunities, and excellent career prospects. Admizz Education helps Nepalese students pursue education in Canada with personalized support including scholarship assistance, visa documentation, statement of purpose (SOP) writing, and pre-departure preparation. Book your free counseling session with Admizz Education today and take the first step toward studying in Canada.",

  whyStudyTitle: "Why Study in Canada from Nepal",
  whyStudyIntro: "For Nepalese students, Canada offers the perfect blend of academic excellence, career opportunities, and quality of life.",
  benefits: [
    {
      title: "Globally Recognized Universities",
      description: "Study at world-class institutions with globally recognized programs and degrees.",
    },
    {
      title: "Affordable Tuition",
      description: "Affordable tuition compared to the USA, UK, or Australia, making quality education accessible.",
    },
    {
      title: "Work While Studying",
      description: "Work part-time while studying with opportunities to gain valuable work experience.",
    },
    {
      title: "Post-Graduation Work Permit",
      description: "Post-Graduation Work Permit (PGWP) for up to 3 years to gain Canadian work experience.",
    },
    {
      title: "Safe & Multicultural",
      description: "Safe, multicultural environment welcoming international students from around the world.",
    },
    {
      title: "High Standard of Living",
      description: "High standard of living with excellent healthcare and security for students and families.",
    },
  ],

  whyAdmizzTitle: "Why Choose Admizz Education",
  whyAdmizzPoints: [
    "Team of experienced counselors with 1000+ student success stories",
    "Direct partnerships with top Canadian universities and colleges",
    "Scholarship assistance and SOP/Essay guidance",
    "High visa success rate for Canada study permits",
    "Full support—admission, visa, test prep, and pre-departure sessions",
  ],

  topCoursesTitle: "Top Courses to Study in Canada",
  topCourses: [
    "Business and Management",
    "Engineering and Technology",
    "Computer Science and IT",
    "Data Science and Artificial Intelligence",
    "Health Sciences and Nursing",
    "Environmental Studies",
    "Social Sciences and Humanities",
    "Media, Arts, and Communication",
  ],

  visaTitle: "Student Visa Requirements for Canada (Nepalese Students)",
  visaIntro: "To study in Canada, students must secure a study permit. Admizz Education's visa experts ensure your application is accurate and complete to increase your success rate.",
  visaRequirements: [
    {
      category: "Letter of Acceptance",
      details: "Letter of Acceptance from a Canadian Designated Learning Institution (DLI)",
    },
    {
      category: "Proof of Funds",
      details: "Proof of sufficient funds to cover tuition and living expenses",
    },
    {
      category: "Valid Passport",
      details: "Valid passport with at least 6 months validity",
    },
    {
      category: "Statement of Purpose",
      details: "SOP (Statement of Purpose) explaining your study plans and goals",
    },
    {
      category: "Visa Application",
      details: "Visa application and biometrics submission",
    },
    {
      category: "Medical & Police Clearance",
      details: "Medical and police clearance certificates",
    },
  ],

  intakesTitle: "Study Intakes in Canada",
  intakesIntro: "Canadian universities and colleges offer three main intakes throughout the year.",
  intakes: [
    {
      intake: "Fall Intake",
      months: "September",
      details: "Primary intake with maximum course availability",
    },
    {
      intake: "Winter Intake",
      months: "January",
      details: "Second major intake with good course options",
    },
    {
      intake: "Summer Intake",
      months: "May",
      details: "Limited programs available at select institutions",
    },
  ],

  testTitle: "Test Preparation for Canada Study Visa",
  testIntro: "With customized study plans, mock tests, and expert trainers, Admizz Education helps you achieve the required scores for Canadian universities.",
  testRequirements: [
    {
      test: "IELTS",
      score: "6.0 - 7.0 overall (minimum)",
      notes: "Most commonly accepted for Canadian institutions",
    },
    {
      test: "TOEFL",
      score: "80 - 100 iBT",
      notes: "Alternative to IELTS",
    },
    {
      test: "PTE",
      score: "58 - 65",
      notes: "Accepted by many Canadian universities",
    },
    {
      test: "Duolingo English Test",
      score: "105 - 120",
      notes: "Increasingly accepted alternative",
    },
    {
      test: "SAT/GRE/GMAT",
      score: "Varies by program",
      notes: "Required for specific programs",
    },
  ],

  costTitle: "Cost to Study in Canada from Nepal",
  costIntro: "With part-time work opportunities and scholarships, Nepalese students can manage their expenses effectively.",
  costTables: [
    {
      title: "Tuition Fees (Annual)",
      rows: [
        {
          category: "Undergraduate Programs",
          cost: "CAD 15,000 – 25,000/year",
          nprCost: "NPR 16,50,000 – 27,50,000",
        },
        {
          category: "Postgraduate Programs",
          cost: "CAD 20,000 – 30,000/year",
          nprCost: "NPR 22,00,000 – 33,00,000",
        },
        {
          category: "Diplomas/Certificates",
          cost: "CAD 10,000 – 18,000/year",
          nprCost: "NPR 11,00,000 – 19,80,000",
        },
      ],
    },
    {
      title: "Living Expenses (Annual)",
      rows: [
        {
          category: "Living Expenses",
          cost: "CAD 10,000 – 15,000/year",
          nprCost: "NPR 11,00,000 – 16,50,000",
        },
      ],
    },
  ],

  scholarshipsTitle: "Scholarships to Study in Canada",
  scholarshipsIntro: "Admizz Education assists you in applying for scholarships that best suit your profile.",
  scholarships: [
    {
      name: "Vanier Canada Graduate Scholarships",
      details: "CAD 50,000/year for doctoral students",
    },
    {
      name: "Ontario Graduate Scholarship (OGS)",
      details: "CAD 15,000 for graduate students in Ontario",
    },
    {
      name: "University of Manitoba Graduate Fellowships",
      details: "Various amounts for graduate students",
    },
    {
      name: "University of Toronto Lester B. Pearson Scholarship",
      details: "Full tuition, books, and living expenses for international students",
    },
    {
      name: "McGill Entrance Scholarships",
      details: "Merit-based scholarships for undergraduate students",
    },
  ],

  universities: [],

  faqItems: [
    {
      question: "Can Nepalese students work while studying in Canada?",
      answer: "Yes, up to 20 hours per week during semesters and full-time during breaks.",
    },
    {
      question: "Is IELTS compulsory for studying in Canada?",
      answer: "Most institutions require IELTS, TOEFL, PTE, or Duolingo. Some offer pathway programs without IELTS.",
    },
    {
      question: "What is the cost of studying in Canada?",
      answer: "Tuition fees range from CAD 15,000 to CAD 30,000/year depending on the course.",
    },
    {
      question: "How long does it take to process a Canada student visa?",
      answer: "Generally 4–8 weeks, depending on your application and biometrics.",
    },
    {
      question: "Can studying in Canada lead to PR?",
      answer: "Yes, through PGWP and Canadian work experience, students can apply for PR.",
    },
    {
      question: "What scholarships are available for Nepalese students?",
      answer: "Vanier, OGS, Lester B. Pearson, McGill, and other university-specific awards.",
    },
    {
      question: "Do Nepalese students need proof of funds?",
      answer: "Yes, sufficient funds must be shown to cover tuition and living costs.",
    },
    {
      question: "Which are the most popular courses in Canada for Nepalese students?",
      answer: "Business, IT, Engineering, Data Science, Nursing, and Social Sciences.",
    },
    {
      question: "Can students apply to Canadian colleges instead of universities?",
      answer: "Yes, colleges are affordable and offer industry-focused programs.",
    },
    {
      question: "How can Admizz Education help me?",
      answer: "By providing counseling, university selection, scholarship guidance, visa assistance, and pre-departure sessions.",
    },
  ],

  ctaTitle: "Ready to Study in Canada from Nepal?",
  ctaContent: "Book your free counseling session with Admizz Education today and take the first step toward studying in Canada.",
};

export default function StudyInCanadaFromNepalPage() {
  return <NepalVariantTemplate data={pageData} />;
}
