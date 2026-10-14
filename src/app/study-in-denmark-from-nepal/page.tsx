// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Denmark from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in Denmark from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-denmark-from-nepal",
  },
  openGraph: {
    title: "Study in Denmark from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in Denmark from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
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
  introContent: "Denmark is an educational destination featuring internationally recognised universities, English-taught programs, and a job-seeking residence permit after graduation. Danish education prioritizes academic excellence, creativity, and real-world problem solving. At Admizz Education, we provide complete service handling university selection, application support, and IELTS coaching alongside visa processing and pre-departure assistance.",

  whyStudyTitle: "Why Study in Denmark from Nepal",
  whyStudyIntro: "Denmark offers an exceptional education system with innovative teaching methods and excellent opportunities for international students.",
  benefits: [
    {
      title: "World-Class Universities",
      description: "Denmark has internationally recognised universities such as Copenhagen, Aarhus, and DTU, offering career-focused degrees.",
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
      description: "Non-EU/EEA tuition is set by each institution (Study in Denmark lists DKK 45,000-120,000 a year), and Danish Government Scholarships can cover part or all of it.",
    },
    {
      title: "Safe, Clean & Student-Friendly",
      description: "Denmark offers a peaceful, inclusive, and high-quality lifestyle for international students.",
    },
    {
      title: "Post-Study Job-Seeking Permit",
      description: "After a completed Danish bachelor's or master's, you can apply for a job-seeking residence permit: up to 1 year for applications from 1 October 2026 (earlier applications could get up to 3 years).",
    },
  ],

  visaTitle: "Denmark Student Visa Requirements for Nepalese Students",
  visaIntro: "Nepali students need a residence permit for studies, applied for online with form ST1 and decided by SIRI, the Danish Agency for International Recruitment and Integration. Here are the main requirements.",
  visaRequirements: [
    {
      category: "Admission",
      details: "Admission to a state-approved or publicly accredited Danish higher education programme",
    },
    {
      category: "ST1 Application Form",
      details: "Applied for online (form ST1) through the Danish immigration website, nyidanmark.dk",
    },
    {
      category: "Financial Proof",
      details: "DKK 7,426 per month of study (2026 level), up to DKK 89,112 for studies over a year",
    },
    {
      category: "Language of Instruction",
      details: "Ability to speak and understand the language of instruction well enough to take part in your programme",
    },
    {
      category: "Biometric Data",
      details: "Fingerprints and photo, given within 14 days of submitting the online application, at a Danish diplomatic mission or application centre",
    },
    {
      category: "Visa Fee",
      details: "DKK 3,060 (2026 rate)",
    },
  ],
  visaNote: "Processing time: normally 2 months, up to 3 months if SIRI needs more information (nyidanmark.dk). Apply early. Check nyidanmark.dk for the full document list.",

  intakesTitle: "Denmark Intakes for Nepalese Students",
  intakesIntro: "Denmark's main intake is September (autumn). Some programmes also start in February.",
  intakes: [
    {
      intake: "Main Intake (Autumn/September)",
      months: "Bachelor's application deadline for international applicants: 15 March, 12 noon (CET)",
      details: "Bachelor's applications go through optagelse.dk. Master's deadlines are set by each institution, so check your programme page",
    },
    {
      intake: "Secondary Intake (Spring/February)",
      months: "Offered by some programmes only",
      details: "Check each programme page on studyindenmark.dk for start dates and deadlines",
    },
  ],

  testTitle: "English Language Requirements",
  testIntro: "English-taught programmes require English at Danish upper-secondary 'English B' level, and some require 'English A'. Study in Denmark gives these equivalents.",
  testRequirements: [
    {
      test: "IELTS",
      score: "6.5 for English B, 7.0 for English A",
    },
    {
      test: "TOEFL iBT",
      score: "79-93 for English B, 94-101 for English A",
    },
  ],
  testNote: "Each institution sets its own score equivalents and may accept other tests. Check your university's requirements before applying.",

  costTitle: "Cost of Studying in Denmark from Nepal",
  costIntro: "Tuition for non-EU/EEA students is set by each institution. Study in Denmark lists DKK 45,000-120,000 a year as the range. Contact your university for the exact fee.",
  costTables: [
    {
      title: "Tuition Fees (Annual, non-EU/EEA students)",
      rows: [
        {
          category: "Typical range across programmes",
          cost: "DKK 45,000 – 120,000",
        },
      ],
    },
    {
      title: "Money to Show and Fees",
      rows: [
        {
          category: "Funds to show per month of study (2026 level)",
          cost: "DKK 7,426",
        },
        {
          category: "Maximum funds to show for studies over a year (2026 level)",
          cost: "DKK 89,112",
        },
        {
          category: "Residence permit application fee (2026 rate)",
          cost: "DKK 3,060",
        },
      ],
    },
  ],
  costNote: "Paying your first semester's tuition can count in place of financial documentation (nyidanmark.dk). Living costs vary by city and lifestyle.",

  scholarshipsTitle: "Scholarships for Nepalese Students to Study in Denmark",
  scholarshipsIntro: "Scholarship options for non-EU/EEA students are limited, and most are run by the institutions themselves. Ask your university what it offers.",
  scholarships: [
    {
      name: "Danish Government Scholarships",
      provider: "Danish higher education institutions",
      details: "A limited number each year for highly qualified non-EU/EEA full-degree students with a time-limited study permit. Can be full or partial tuition waivers and/or grants towards living costs. Apply through the institution",
    },
    {
      name: "Erasmus Mundus Joint Master Degrees",
      provider: "Individual Erasmus Mundus programmes",
      details: "Open to EU/EEA and non-EU/EEA students. Scholarship availability varies by programme, so contact the programme directly",
    },
  ],
  scholarshipsNote: "Tip: Apply early and ensure your SOP, recommendation letters, and English test scores are strong.",

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

  quickAnswer:
    "To study in Denmark from Nepal you need admission to a state-approved Danish programme and a residence permit for studies, applied for online with form ST1 and decided by SIRI. The fee is DKK 3,060 and processing normally takes 2 months, up to 3. You must show DKK 7,426 per month of study (2026 level), or pay your first semester's tuition. Students may work 90 hours a month from September to May and full-time in June, July and August. Bachelor's applications for September close on 15 March.",
  lastUpdated: "October 2026",
  sources: [
    { label: "Nyidanmark.dk: Higher educational programmes (residence permit for studies)", url: "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Study/Higher-Education" },
    { label: "Nyidanmark.dk: Fee overview", url: "https://www.nyidanmark.dk/en-GB/Words-and-concepts/F%C3%A6lles/Fees/Fee---overview-of-fee-rates" },
    { label: "Nyidanmark.dk: New rules for third-country students (1 October 2026)", url: "https://www.nyidanmark.dk/en-GB/News-Front-Page/2026/09/SIRI---Nye-regler-for-studerende" },
    { label: "Study in Denmark: Tuition fees", url: "https://studyindenmark.dk/study-options/tuition-fees-and-scholarships" },
    { label: "Study in Denmark: Language requirements", url: "https://studyindenmark.dk/study-options/how-to-apply/language-requirements" },
    { label: "Study in Denmark: Scholarships", url: "https://studyindenmark.dk/study-options/scholarships" },
  ],
  relatedLinks: [
    { label: "Study in Denmark", href: "/study-in-denmark", description: "universities, admission and visa overview" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "Visa assistance for study abroad", href: "/visa-assistance-for-study-abroad" },
    { label: "Test preparation", href: "/test-prep", description: "IELTS, PTE and TOEFL coaching" },
  ],
  extraSections: [
    {
      id: "denmark-requirements",
      title: "Denmark Residence Permit for Studies: Requirements",
      bullets: [
        "Your programme must be at a publicly accredited or state-approved institution subject to state supervision.",
        "You apply online with form ST1 and give biometrics within 14 days of submitting; from Nepal this is done at a Danish diplomatic mission or application centre.",
        "SIRI decides the application. Normal processing is 2 months, up to 3 months if more information is needed.",
        "You must be able to speak and understand the language of instruction well enough to take part in your programme.",
        "The permit normally matches the standard length of your programme and can be extended.",
      ],
      note: "Source: Nyidanmark.dk, Higher educational programmes. The date you submit determines which rules apply, so check the page before you apply.",
    },
    {
      id: "denmark-money-needed",
      title: "How Much Money You Must Show for Denmark",
      table: {
        headers: ["Item", "Amount"],
        rows: [
          ["Funds per month of study (2026 level)", "DKK 7,426"],
          ["Maximum for studies longer than a year (2026 level)", "DKK 89,112"],
          ["Residence permit application fee (2026)", "DKK 3,060"],
          ["Tuition, non-EU/EEA students (range listed by Study in Denmark)", "DKK 45,000 – 120,000 a year"],
        ],
      },
      note: "Funds can be shown with bank statements (no more than 30 days old) or a scholarship or loan granted to you. Paying your first semester's tuition can replace the financial documentation. Sources: Nyidanmark.dk and Study in Denmark.",
    },
    {
      id: "denmark-work-rights",
      title: "Working in Denmark During and After Your Studies",
      bullets: [
        "During study: students in state-approved programmes may work 90 hours per month from September to May and full-time in June, July and August.",
        "After study: if you apply on or after 1 October 2026, a job-seeking residence permit after a completed bachelor's or master's programme can be granted for up to 1 year (it was up to 3 years for earlier applications; PhD candidates keep 3 years).",
        "You can apply for the job-seeking permit when you hold a valid study permit and have completed the programme, with 4 months or less left on your permit. The fee is DKK 3,060.",
        "From 1 October 2026 accompanying family members can no longer get a residence permit under the job-seeking rules.",
      ],
      note: "Sources: Nyidanmark.dk, Higher educational programmes, Job seeking after studies, and New rules for third-country students.",
    },
  ],

  faqItems: [
    {
      question: "Why should Nepalese students choose Denmark for higher education?",
      answer: "Denmark has English-taught bachelor's and master's programmes, a practice-oriented teaching style, and a job-seeking residence permit after graduation. Non-EU/EEA tuition is set by each institution, and limited Danish Government Scholarships exist. Check the specific programme and its fee before you decide.",
    },
    {
      question: "Do I need to speak Danish to study in Denmark?",
      answer: "No, not for English-taught programmes. You must show English at the level the programme asks for, usually IELTS 6.5 or equivalent. The Danish immigration rules ask you to understand the language of instruction well enough to take part, which for these programmes is English.",
    },
    {
      question: "What are the English language requirements for Nepali students?",
      answer: "Study in Denmark lists IELTS 6.5 or TOEFL iBT 79-93 for 'English B', and IELTS 7.0 or TOEFL iBT 94-101 for 'English A', which some programmes require. Each institution sets its own equivalents and may accept other tests, so check your university.",
    },
    {
      question: "What are the intakes to apply for universities in Denmark?",
      answer: "The main intake is September, and some programmes also start in February. For bachelor's programmes, international applicants apply through optagelse.dk by 15 March, 12 noon CET. Master's deadlines are set by each institution, so check your programme page.",
    },
    {
      question: "How much does it cost to study in Denmark for Nepali students?",
      answer: "Study in Denmark lists non-EU/EEA tuition at DKK 45,000-120,000 a year, with exact fees set by each institution. Add the DKK 3,060 residence permit fee and living costs. For the permit you must show DKK 7,426 per month of study (2026 level).",
    },
    {
      question: "Are there scholarships available for Nepalese students in Denmark?",
      answer: "Yes, but they are limited. Danish universities receive a limited number of Danish Government Scholarships each year for highly qualified non-EU/EEA full-degree students, as full or partial tuition waivers and/or living-cost grants. Erasmus Mundus programmes also accept non-EU/EEA students. Apply through the institution.",
    },
    {
      question: "Can I work while studying in Denmark?",
      answer: "Yes. Students in state-approved programmes may work 90 hours per month from September to May, and full-time in June, July and August, according to the Danish immigration service. That is roughly 20 hours a week in term time, but the official limit is counted monthly.",
    },
    {
      question: "Can I stay in Denmark after graduation?",
      answer: "You can apply for a job-seeking residence permit after completing a bachelor's or master's. If you apply on or after 1 October 2026 it can be granted for up to 1 year; earlier applications could get up to 3 years. The fee is DKK 3,060. Accompanying family members are no longer included.",
    },
    {
      question: "What are the student visa requirements for Nepalese students?",
      answer: "You need admission to a state-approved Danish programme, the ST1 application, proof of DKK 7,426 per month of study (2026 level) or first-semester tuition paid, and the ability to follow the language of instruction. Give biometrics within 14 days at a Danish mission or application centre. The fee is DKK 3,060.",
    },
    {
      question: "How long does a Denmark student visa take for Nepali students?",
      answer: "The Danish immigration service says normal processing for a study residence permit is 2 months, and up to 3 months if SIRI needs additional information. Apply as soon as you have your admission, and submit complete documents to avoid delays. Always check nyidanmark.dk for the current estimate.",
    },
    {
      question: "How much is the Denmark student visa fee?",
      answer: "The fee for a residence permit for higher education is DKK 3,060 at the 2026 rate, according to SIRI's fee overview. The same fee applies to extensions and to the job-seeking permit after graduation. Fees change each year, so confirm on nyidanmark.dk before paying.",
    },
    {
      question: "How can Admizz Education help me study in Denmark?",
      answer: "Admizz provides university shortlisting, test prep (IELTS/PTE), scholarship guidance, visa documentation and application support, and pre-departure counseling.",
    },
  ],

  ctaTitle: "Start Your Journey to Study in Denmark from Nepal",
  ctaContent: "At Admizz, we help Nepalese students navigate the entire Denmark study process — from choosing the right university to preparing documents and applying for a visa. We make it clear, personalized, and stress-free. Your future in Denmark starts here — with Admizz.",
};

export default async function StudyInDenmarkFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "denmark" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
