// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in New Zealand from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in New Zealand from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-newzealand-from-nepal",
  },
  openGraph: {
    title: "Study in New Zealand from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in New Zealand from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
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

  lastChecked: "October 2026",
  dateModified: "2026-10-13",
  sourcesTitle: "Official sources",
  sources: [
    { label: "Immigration New Zealand: post-study work visa", url: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/post-study-work-visa" },
    { label: "Immigration New Zealand: Fee Paying Student Visa", url: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/full-fee-paying-student-visa" },
    { label: "Immigration NZ: Fee Paying Student Visa", url: "https://www.immigration.govt.nz/visas/fee-paying-student-visa/" },
    { label: "Immigration NZ: Working on a student visa", url: "https://www.immigration.govt.nz/study/once-you-have-a-student-visa/working-on-a-student-visa/" },
    { label: "Immigration NZ: Student visa wait times", url: "https://www.immigration.govt.nz/process-to-apply/waiting-for-a-visa/processing-a-visa-application/how-long-it-takes-to-process-an-application/student-visa-wait-times/" },
    { label: "Immigration NZ: Post-Study Work Visa", url: "https://www.immigration.govt.nz/visas/post-study-work-visa/" },
    { label: "Manaaki New Zealand Scholarships: eligible countries", url: "https://www.nzscholarships.govt.nz/check-eligible-countries/" },
  ],

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
        "Know your costs up front: Immigration New Zealand sets a living-cost requirement and tuition varies by university and course.",
    },
    {
      title: "Safe & Friendly Environment",
      description:
        "One of the safest countries with multicultural inclusivity.",
    },
    {
      title: "Post-Study Work Opportunities",
      description:
        "Eligible graduates can apply for a Post-Study Work Visa for up to 3 years, depending on the level of the qualification.",
    },
    {
      title: "Scholarships & Financial Aid",
      description:
        "Nepal is an eligible country for Manaaki New Zealand Scholarships at postgraduate level, and universities run their own awards.",
    },
  ],

  visaTitle: "New Zealand Student Visa Requirements for Nepali Students",
  visaIntro:
    "To study in New Zealand, Nepali students need to apply for a Fee-Paying Student Visa. Here's what you should know:",
  visaRequirements: [
    {
      category: "Visa Type",
      details: "Fee Paying Student Visa (from NZD 850)",
    },
    {
      category: "Eligibility",
      details:
        "An offer of place from an approved New Zealand education provider, showing the course name, its length, and that the provider assessed your English and academic ability",
    },
    {
      category: "Work Rights",
      details:
        "Up to 25 hours a week during term and full-time in holidays for eligible students. Your visa conditions confirm what you can do.",
    },
    {
      category: "Financial Proof",
      details:
        "Tuition for 1 course or 1 year of study (whichever is shorter) and NZD 20,000 for each year (NZD 1,667 a month for study under a year) for living costs",
    },
    {
      category: "Insurance & Health",
      details:
        "You must agree to have insurance for travel and any health care you need. A chest X-ray may be required for stays over 6 months, and a police certificate if you are 17+ and will stay 24 months or more.",
    },
    {
      category: "English Test",
      details:
        "A test result is not mandatory for the visa, but it can help show your genuine intention to study. Your university sets its own English entry level.",
    },
    {
      category: "Paying Tuition",
      details:
        "If you apply from outside New Zealand, you can choose not to pay tuition until Immigration New Zealand tells you your application is approved in principle. You then send a receipt or letter from your provider showing you have paid, and you need an unconditional offer of place before the visa is approved. Paying first can make processing faster.",
    },
    {
      category: "Documents",
      details:
        "Offer of place, evidence of your tuition payment, and bank statements or proof that your living costs have been paid.",
    },
    {
      category: "Application Process",
      details: "Online only. Paper student visa applications stopped on September 18, 2025. Immigration New Zealand advises students from Nepal to apply at least 3 months before travel.",
    },
  ],
  visaNote:
    "Admizz offers complete visa assistance including document preparation, SOP writing, financial guidance, and interview support.",

  intakesTitle: "New Zealand Intakes for Nepali Students",
  intakesIntro:
    "Nepali students can apply for the following intakes in New Zealand:",
  intakes: [
    {
      intake: "Main",
      months: "February",
    },
    {
      intake: "Mid-Year",
      months: "July",
    },
    {
      intake: "Other",
      months: "Some providers also start in November or at other times of year",
    },
  ],
  intakesNote:
    "Immigration New Zealand strongly encourages students from Nepal to apply for the visa at least 3 months before travel, so start the university application well before that.",

  costTitle: "Cost of Studying in New Zealand from Nepal",
  costIntro:
    "Tuition in New Zealand varies by university and course, so check the fee on your chosen course page. For the visa, Immigration New Zealand sets the amounts below.",
  costTables: [
    {
      title: "Amounts Set by Immigration New Zealand",
      rows: [
        {
          category: "Student visa application fee",
          cost: "From NZD 850",
        },
        {
          category: "Living costs to show (tertiary study)",
          cost: "NZD 20,000 a year, or NZD 1,667 a month for study under a year",
        },
        {
          category: "Tuition to show",
          cost: "Fees for 1 course or 1 year of study, whichever is shorter",
        },
        {
          category: "PhD tuition",
          cost: "Domestic fee rate (PhD students at NZ universities are treated as domestic for fees)",
        },
      ],
    },
  ],

  scholarshipsTitle: "Scholarships for Nepali Students",
  scholarshipsIntro:
    "Nepal is on the list of eligible countries for Manaaki New Zealand Scholarships, and individual universities run their own awards. Always check each scholarship's own page for eligibility and deadlines.",
  scholarships: [
    {
      name: "Manaaki New Zealand Scholarships (NZ Government)",
      details:
        "Postgraduate study for citizens of Nepal: postgraduate certificate (6 months), postgraduate diploma (1 year), master's (1-2 years) or PhD (3.5 years). Check the open and close dates for each round.",
    },
    {
      name: "University scholarships",
      details:
        "New Zealand universities offer their own merit awards for international students. Amounts and eligibility differ by university, so check each university's scholarship page.",
    },
  ],
  scholarshipsNote:
    "Scholarship rounds can close early for countries with many applicants, so apply early.",

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

  quickAnswer:
    "To study in New Zealand from Nepal you need an offer of place from an approved education provider and a Fee Paying Student Visa, applied for online (fee from NZD 850). You must show tuition for 1 course or 1 year of study, whichever is shorter, plus NZD 20,000 a year for living costs. Eligible students can work up to 25 hours a week in term. Immigration New Zealand advises students from Nepal to apply at least 3 months before travel.",
  lastUpdated: "October 2026",
  relatedLinks: [
    { label: "Study in New Zealand", href: "/study-in-newzealand", description: "universities, admission and visa overview" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "Visa assistance for study abroad", href: "/visa-assistance-for-study-abroad" },
    { label: "Test preparation", href: "/test-prep", description: "IELTS, PTE and TOEFL coaching" },
    { label: "Post-study work options compared", href: "/post-study-work-options-uk-canada-usa-australia-nepali-students-2026", description: "UK, Canada, USA and Australia" },
    { label: "Study abroad from Nepal checklist", href: "/study-abroad-from-nepal", description: "step-by-step planning" },
  ],
  extraSections: [
    {
      id: "nz-work-rights",
      title: "Working in New Zealand During and After Your Studies",
      table: {
        headers: ["Topic", "What to know"],
        rows: [
          ["During study", "Eligible students can work part-time up to 25 hours a week and full-time in holidays. Your visa conditions set the exact limit. You must work for an employer, because self-employment is not allowed on a student visa."],
          ["Who qualifies", "For example, tertiary students studying full-time for a qualification at Level 4 or higher, and students on qualifying courses."],
          ["After study", "The Post-Study Work Visa lets you stay and work for up to 3 years, depending on your qualification. The fee is from NZD 1,670, and you can hold it only once."],
          ["Degree level 7 or higher", "At least 30 weeks of full-time study in New Zealand, and you can work in any job."],
          ["Non-degree level 7 or lower", "The qualification must be on the eligible list, and you must work in a job related to your study."],
          ["When to apply", "Within 3 months after your student visa expires (6 months for a doctorate). Show at least NZD 5,000 for living expenses, and meet health and character requirements."],
          ["From November 16, 2026", "Post-Study Work Visa eligibility is extended to some Level 7 graduate diploma holders, and a new 6-month Short-Term Graduate Work Visa is introduced for some Level 5 to 7 graduates."],
        ],
      },
      note: "Sources: Immigration New Zealand, Working on a student visa, Post-Study Work Visa, and New and updated post-study work visa options.",
    },
  ],

  faqItems: [
    {
      question: "How much money do I need to show for a New Zealand student visa from Nepal?",
      answer: "You must show tuition for 1 course or 1 year of study, whichever is shorter, plus NZD 20,000 for each year of living costs for tertiary study, or NZD 1,667 a month if you study for under a year. Immigration New Zealand accepts evidence such as bank statements.",
    },
    {
      question: "How long does a New Zealand student visa take for Nepali students?",
      answer: "Immigration New Zealand lists average waits of about 2.5 weeks for universities and 4.5 weeks for polytechnics, but it says applicants from Nepal should apply at least 3 months before travel because of high volumes. Times vary, especially at peak season.",
    },
    {
      question: "Do I need a medical certificate or police certificate for a New Zealand student visa?",
      answer: "A chest X-ray is required for stays over 6 months if you are from a country not on INZ's low-incidence TB list, and results must be under 3 months old. A police certificate is needed if you are 17 or over and will stay 24 months or more.",
    },
    {
      question: "Do I have to pay my tuition before applying for a New Zealand student visa from Nepal?",
      answer: "Not always. If you apply from outside New Zealand, Immigration New Zealand lets you choose not to pay tuition until it tells you your application is approved in principle. You must then show a receipt or a letter from your provider confirming you have paid before the visa is issued, and you need an unconditional offer of place. Paying before you apply can make processing faster.",
    },
    {
      question: "Is IELTS compulsory for a New Zealand student visa?",
      answer: "No. Immigration New Zealand says an English test result is not mandatory for the visa but can help show your genuine intention to study. Your university or institute sets its own English entry requirement, so check the course page for the score it needs.",
    },
    {
      question: "Can Nepali students apply for the Manaaki New Zealand Scholarship?",
      answer: "Yes, Nepal is on the eligible country list. Nepali citizens can apply for postgraduate study only: a 6-month certificate, 1-year diploma, master's of 1 to 2 years, or a PhD of 3.5 years. Rounds can close early, so check the scholarship website for current dates.",
    },
    {
      question: "Can I work while studying in New Zealand?",
      answer: "Yes. Eligible students can work up to 25 hours a week during term and full-time in holidays under Immigration New Zealand rules. Your visa conditions confirm what you can do, and you must work for an employer.",
    },
    {
      question: "How long is the Post-Study Work Visa in New Zealand?",
      answer: "It lets you work for up to 3 years, depending on the level of your qualification, if you studied an eligible qualification in New Zealand. Apply within 3 months of your student visa ending (6 months for a doctorate). The fee is from NZD 1,670.",
    },
    {
      question: "Which intakes can I apply for in New Zealand?",
      answer: "The main intakes are February and July, and some providers also start students in November or at other times. Because Immigration New Zealand advises applying for the visa at least 3 months before travel, begin your university application well ahead.",
    },
    {
      question: "Can I apply to study in New Zealand after +2 from Nepal?",
      answer: "Yes, if an approved New Zealand provider offers you a place on a course that suits your qualifications. The provider assesses your English and academic ability, and the offer of place is the base document for your student visa.",
    },
    {
      question: "Does Admizz provide visa assistance for New Zealand?",
      answer: "Yes. Admizz helps with document preparation, financial guidance and checking your online student visa application before you submit it.",
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
