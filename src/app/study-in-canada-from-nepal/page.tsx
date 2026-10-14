import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import { DESTINATION_COMPARE_HEADERS, DESTINATION_COMPARE_ROWS, DESTINATION_COMPARE_SOURCES } from "@/data/destination-compare";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Canada from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in Canada from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-canada-from-nepal",
  },
  openGraph: {
    title: "Study in Canada from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in Canada from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-canada-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "Canada",
  countryCategorySlug: "canada",
  heroHeading: "Study in Canada from Nepal",
  heroSubheading: "Study in Canada from Nepal with Admizz Education—expert counseling, top universities, visa support & affordable study abroad solutions.",

  introTitle: "Your Gateway to Global Education with Admizz Education",
  introContent: "Canada is one of the most popular study abroad destinations for Nepali students because of its world-class education system, affordable tuition fees, scholarship opportunities, and excellent career prospects. Admizz Education helps Nepali students pursue education in Canada with personalized support including scholarship assistance, visa documentation, statement of purpose (SOP) writing, and pre-departure preparation. Book your free counseling session with Admizz Education today and take the first step toward studying in Canada.",

  quickAnswer:
    "For a Canada study permit application made on or after September 1, 2026, IRCC asks a single applicant to show CAN$23,448 for living costs, plus first-year tuition and travel. The permit costs CAN$150 and biometrics CAN$85. Most new bachelor's and college applicants also need a provincial attestation letter (PAL), while master's and doctoral students at public institutions are exempt.",
  lastChecked: "October 2026",
  dateModified: "2026-10-13",
  guideTabLabel: "Fees & Study Permit",
  guideSections: [
    {
      id: "permit-fees",
      title: "Canada Study Permit Fees, Funds and the PAL",
      intro: "Check the figures on the IRCC site on the day you apply, because they change.",
      bullets: [
        "Study permit fee: CAN$150 per person. Biometrics: CAN$85 per person, with a maximum of CAN$170 for a family applying together.",
        "Living-cost proof: CAN$23,448 per year for one applicant on applications from September 1, 2026, plus first-year tuition and travel costs.",
        "2026 cap: IRCC has set 309,670 application spaces for students who need a PAL or TAL, and expects to issue up to 408,000 permits (155,000 for new students and 253,000 extensions).",
        "PAL exemption: master's and doctoral students at public universities and colleges are exempt, which makes postgraduate study the easier route for many Nepali applicants.",
        "After study: a Post-Graduation Work Permit (PGWP) is possible if your program and school are eligible. The language level is CLB 7 for degree programs and CLB 5 for college programs.",
      ],
      links: [
        { label: "Costs, GIC and PGWP guide", href: "/canada-study-costs-gic-pgwp-2026-nepali-students" },
        { label: "Study permit cap and PAL guide", href: "/canada-study-permit-cap-2026-nepali-students" },
        { label: "IELTS for Canadian universities", href: "/minimum-ielts-requirement-for-canadian-universities" },
      ],
    },
    {
      id: "compare",
      title: "Canada vs the UK, USA and Australia",
      intro:
        "How Canada compares on visa fees, the funds you must show and work after study, using official figures as checked in October 2026.",
      table: { headers: DESTINATION_COMPARE_HEADERS, rows: DESTINATION_COMPARE_ROWS },
      links: [
        { label: "UK", href: "/study-in-uk-from-nepal" },
        { label: "USA", href: "/study-in-usa-from-nepal" },
        { label: "Australia", href: "/study-in-australia-from-nepal" },
      ],
    },
  ],
  sourcesTitle: "Official sources",
  sources: [
    { label: "IRCC: Study permit", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" },
    { label: "IRCC: Proof of financial support", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html" },
    { label: "IRCC: Guide 5269, applying for a study permit outside Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5269-applying-study-permit-outside-canada.html" },
    { label: "IRCC: Work off campus as an international student", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html" },
    { label: "IRCC: About the post-graduation work permit", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/about.html" },
  ],

  whyStudyTitle: "Why Study in Canada from Nepal",
  whyStudyIntro: "For Nepali students, Canada offers the perfect blend of academic excellence, career opportunities, and quality of life.",
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
      description: "A Post-Graduation Work Permit (PGWP) can be valid for 8 months up to 3 years, depending on your program, to gain Canadian work experience.",
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

  visaTitle: "Student Visa Requirements for Canada (Nepali Students)",
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
    {
      category: "Translations",
      details: "Any document that is not in English or French, such as Nepali-language certificates, needs an English or French translation. It can come from a Canadian certified translator, or from a person fluent in both languages who swears an affidavit. You and your family members cannot translate your own documents.",
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
  costIntro: "With part-time work opportunities and scholarships, Nepali students can manage their expenses effectively.",
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
          category: "Living funds to show for the study permit (single applicant, applications from 1 Sep 2026)",
          cost: "CAD 23,448",
        },
        {
          category: "Study permit application fee",
          cost: "CAD 150",
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

  universities: [
    { name: "University of Toronto", logo: "/images/universities/canada/university-of-toronto.webp" },
    { name: "McGill University", logo: "/images/universities/canada/mcgill-university.webp" },
    { name: "University of British Columbia", logo: "/images/universities/canada/university-of-british-columbia.webp" },
    { name: "University of Alberta", logo: "/images/universities/canada/university-of-alberta.webp" },
    { name: "McMaster University", logo: "/images/universities/canada/mcmaster-university.webp" },
    { name: "University of Waterloo", logo: "/images/universities/canada/university-of-waterloo.webp" },
    { name: "Queen's University", logo: "/images/universities/canada/queens-university.webp" },
    { name: "Simon Fraser University", logo: "/images/universities/canada/simon-fraser-university.webp" },
    { name: "Dalhousie University", logo: "/images/universities/canada/dalhousie-university.webp" },
    { name: "Western University", logo: "/images/universities/canada/western-university.webp" },
  ],

  lastUpdated: "October 2026",
  relatedLinks: [
    { label: "Study in Canada", href: "/study-in-canada", description: "universities, admission and visa overview" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "Visa assistance for study abroad", href: "/visa-assistance-for-study-abroad" },
    { label: "Test preparation", href: "/test-prep", description: "IELTS, PTE and TOEFL coaching" },
  ],
  extraSections: [
    {
      id: "canada-money-needed",
      title: "How Much Money You Must Show for a Canada Study Permit",
      table: {
        headers: ["Item", "Amount"],
        rows: [
          ["Living costs, single applicant (applications from September 1, 2026)", "CAD 23,448 a year"],
          ["Living costs, single applicant (applications January 1, 2025 to August 31, 2026)", "CAD 22,895 a year"],
          ["Each additional family member (from September 1, 2026)", "CAD 6,318 a year"],
          ["Each additional family member (January 1, 2025 to August 31, 2026)", "CAD 6,170 a year"],
          ["Tuition", "Your first year's tuition fees"],
          ["Travel", "Transportation to and from Canada for you and any family members"],
        ],
      },
      note: "For programs longer than a year you must also say how you plan to pay for the full duration. Quebec has its own financial requirements. Source: IRCC, Proof of financial support. Amounts change, so confirm on the IRCC website before you apply.",
    },
    {
      id: "canada-pal",
      title: "Provincial Attestation Letter (PAL) and Quebec CAQ",
      bullets: [
        "In most cases you need a provincial or territorial attestation letter (PAL/TAL) from your school before you apply for a study permit.",
        "You usually have to accept your offer and pay your tuition fees, in part or in full, to get your PAL/TAL.",
        "If you are studying in Quebec you need a Quebec Acceptance Certificate (CAQ) instead.",
        "Since 2026 certain master's and doctoral-level students are exempt from the PAL/TAL requirement. Check IRCC to see whether your program qualifies.",
      ],
      note: "Source: IRCC, Study permit: Get the right documents.",
    },
    {
      id: "canada-work-rights",
      title: "Working in Canada During and After Your Studies",
      bullets: [
        "During study: eligible students can work off campus up to 24 hours a week in term time and unlimited hours in scheduled breaks. You must be a full-time student in a program of at least 6 months at a designated learning institution, have a study permit that allows off-campus work, and have a social insurance number.",
        "After study: a post-graduation work permit (PGWP) can be valid from 8 months up to 3 years. Programs from 8 months to under 2 years can get up to the program length, programs of 2 years or more can get 3 years, and a master's degree can get up to 3 years if the program was at least 8 months.",
        "Language proof: since November 1, 2024 most PGWP applicants must give proof of language test results.",
        "Your PGWP cannot be valid for longer than your passport.",
      ],
      note: "Sources: IRCC, Work off campus as an international student, and About the post-graduation work permit.",
    },
  ],

  faqItems: [
    {
      question: "What is a provincial attestation letter (PAL) for a Canada study permit?",
      answer: "In most cases you need a provincial or territorial attestation letter (PAL/TAL) from your school before you apply for a study permit, and you usually have to accept your offer and pay part or all of your tuition to get it. If you are studying in Quebec you need a Quebec Acceptance Certificate (CAQ) instead. Since 2026 certain master's and doctoral-level students are exempt from the attestation letter requirement, so check IRCC to see whether your program qualifies.",
    },
    {
      question: "How much money do I need to show for a Canada study permit?",
      answer: "For a single applicant, CAD 22,895 for living costs if you apply between January 1, 2025 and August 31, 2026, and CAD 23,448 if you apply from September 1, 2026. On top of that you must show your first year of tuition and your travel costs.",
    },
    {
      question: "Can Nepali students work while studying in Canada?",
      answer: "Yes. Eligible students can work off campus up to 24 hours a week during the academic term and full-time during scheduled breaks, according to IRCC. To work off campus you must be a full-time student in a program of at least 6 months at a designated learning institution, have a study permit that allows off-campus work, and have a social insurance number. Working more than the limit can cost you your student status.",
    },
    {
      question: "Do I need to translate my Nepali documents for a Canada study permit?",
      answer: "Yes. IRCC requires an English or French translation of any document that is not already in one of those languages. The translation can be done by a Canadian certified translator, or by a person fluent in both languages who swears an affidavit about their language skills and the accuracy of the translation. You and your family members cannot translate your own documents.",
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
      answer: "Processing times vary by country and by time of year. Check the current estimate for Nepal on the IRCC website, and apply early.",
    },
    {
      question: "How long is a post-graduation work permit (PGWP) in Canada?",
      answer: "A PGWP can be valid from 8 months up to 3 years. For programs from 8 months to under 2 years it can be up to the length of your program, for programs of 2 years or more it can be 3 years, and a master's degree can get up to 3 years if the program was at least 8 months. Since November 1, 2024 most applicants must give proof of language test results, and the permit cannot last longer than your passport is valid.",
    },
    {
      question: "Can studying in Canada lead to PR?",
      answer: "Yes, through PGWP and Canadian work experience, students can apply for PR.",
    },
    {
      question: "What scholarships are available for Nepali students?",
      answer: "Vanier, OGS, Lester B. Pearson, McGill, and other university-specific awards.",
    },
    {
      question: "Do Nepali students need proof of funds?",
      answer: "Yes, sufficient funds must be shown to cover tuition and living costs.",
    },
    {
      question: "Which are the most popular courses in Canada for Nepali students?",
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

export default async function StudyInCanadaFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "canada" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
