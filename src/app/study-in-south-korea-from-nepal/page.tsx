// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import { DESTINATION_COMPARE_HEADERS, DESTINATION_COMPARE_ROWS, DESTINATION_COMPARE_SOURCES } from "@/data/destination-compare";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in South Korea from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in Korea from Nepal: costs, visa, intakes, GKS scholarship and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-south-korea-from-nepal",
  },
  openGraph: {
    title: "Study in South Korea from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in Korea from Nepal: costs, visa, intakes, GKS scholarship and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-south-korea-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/korean.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "South Korea",
  countryCategorySlug: "south-korea",
  heroHeading: "Build a Bright Future in One of the World's Top Study Destinations",
  heroSubheading: "Study in South Korea from Nepal offers world-class education, scholarships, affordable tuition, cultural exposure, and global career opportunities.",
  introTitle: "Shape Your Future in Korea's World-Class Universities",
  introContent: "South Korea is increasingly popular among Nepalese students: Nepal was the fifth-largest source of international students there in 2025, with 12,784 students. Opportunities include well-known universities like Seoul National University, government-funded options such as the Global Korea Scholarship (GKS), and programs in IT, engineering, business, design, and biotechnology. Partner with Admizz for a smooth and stress-free application journey.",
  // Last edit of this page in the repo (git). Update when the content is next changed or reviewed.
  dateModified: "2026-10-08",
  guideTabLabel: "Compare",
  guideSections: [
    {
      id: "compare",
      title: "Compare South Korea with Other Study Destinations",
      intro:
        "If you are still deciding, here is how the main alternatives compare on visa fees, the funds you must show and work after study, using official figures as checked in October 2026.",
      table: { headers: DESTINATION_COMPARE_HEADERS, rows: DESTINATION_COMPARE_ROWS },
      links: [
        { label: "UK", href: "/study-in-uk-from-nepal" },
        { label: "USA", href: "/study-in-usa-from-nepal" },
        { label: "Canada", href: "/study-in-canada-from-nepal" },
        { label: "Australia", href: "/study-in-australia" },
        { label: "Study abroad checklist", href: "/study-abroad-from-nepal" },
      ],
    },
  ],
  sourcesTitle: "Official sources",

  whyStudyTitle: "Why Study in South Korea from Nepal",
  whyStudyIntro: "South Korea offers exceptional opportunities for Nepalese students looking to pursue higher education abroad.",
  benefits: [
    {
      title: "Globally Respected Universities",
      description: "Well-known research universities such as Seoul National University, KAIST, and Yonsei, plus many other universities that accept international students"
    },
    {
      title: "High-Tech Learning Environment",
      description: "World-class infrastructure, innovative smart classrooms, and advanced research facilities"
    },
    {
      title: "Affordable Tuition & Scholarships",
      description: "Average annual undergraduate tuition is about KRW 4.3 million at national and public universities and KRW 7.6 million at private ones, and government and university scholarships are available"
    },
    {
      title: "Post-Study Work & Job Opportunities",
      description: "After your degree you can move to a D-10-1 job-seeking visa, which can be extended in 6-month steps up to 2 years"
    },
    {
      title: "Cultural and Global Exposure",
      description: "Gain valuable international exposure and cultural experience in an environment blending rich traditions with modern lifestyles"
    },
    {
      title: "Safe, Student-Friendly Country",
      description: "Large international student community, including 12,784 Nepali students in 2025, and affordable public transport"
    }
  ],
  visaTitle: "South Korea Student Visa for Nepalese Students",
  visaIntro: "Nepalese students need a D-2 Student Visa to study in South Korea at the undergraduate, graduate, or doctoral level.",
  visaRequirements: [
    {
      category: "Visa Type",
      details: "D-2 (Student Visa)"
    },
    {
      category: "Issued For",
      details: "Bachelor's, Master's, and Doctoral degree programs"
    },
    {
      category: "Where to Apply",
      details: "Embassy of the Republic of Korea, Kathmandu (an online appointment is required)"
    },
    {
      category: "Processing Time",
      details: "The embassy says processing can take 21 working days or more. Apply at least 21 days before your departure date"
    },
    {
      category: "Validity",
      details: "A D-2 visa allows a stay of up to 2 years per issuance, with extensions depending on your program"
    },
    {
      category: "Work Rights",
      details: "Allowed only with part-time work permission from immigration. Hours depend on your degree level, year and Korean language level"
    }
  ],
  intakesTitle: "Korea University Intakes for Nepalese Students",
  intakesIntro: "Korean universities run two main semesters, starting in March and September. Application windows differ by university, so check each university's international admissions page.",
  intakes: [
    {
      intake: "Spring Intake",
      months: "March",
      details: "First semester of the Korean academic year"
    },
    {
      intake: "Fall Intake",
      months: "September",
      details: "Second semester. Which programs admit in September depends on the university"
    }
  ],
  testTitle: "Language & English Proficiency Requirements",
  testIntro: "Each university or department sets its own language requirement, in English for English-taught programs and in Korean for Korean-taught programs. Check your university's international admissions page for the exact score.",
  testRequirements: [
    {
      test: "Korean embassy visa application (Nepal)",
      score: "IELTS or TOPIK report",
      notes: "Applicants who completed secondary and higher education in the USA, UK, Canada, Australia, New Zealand, Ireland or South Africa may submit proof of education instead"
    },
    {
      test: "English-taught programs",
      score: "Set by each university",
      notes: "Check the accepted tests and minimum scores with your chosen university"
    },
    {
      test: "Korean-taught programs",
      score: "TOPIK, level set by each university",
      notes: "TOPIK scores are valid for 2 years from the date of score announcement"
    }
  ],
  testNote: "Admizz provides IELTS and TOPIK guidance in Nepal. TOPIK is also used for GKS applications and, later, for part-time work permission.",
  costTitle: "Cost of Studying in South Korea from Nepal",
  costIntro: "The cost of studying in South Korea varies by university type (national, public or private), program and city. Estimates below are based on Study in Korea (NIIED) figures; check your university for exact fees.",
  costTables: [
    {
      title: "Annual Cost Breakdown",
      rows: [
        {
          category: "Tuition Fees",
          cost: "₩4,000,000–₩10,000,000",
          nprCost: "NPR 400,000–1,000,000"
        },
        {
          category: "Living Expenses",
          cost: "₩9,000,000–₩12,000,000 (₩750,000–₩1,000,000 a month)"
        },
        {
          category: "Health Insurance",
          cost: "National Health Insurance applies after 6 months of stay; D-2 students get a 50% premium reduction"
        },
        {
          category: "Application & Admin Fees",
          cost: "Set by each university"
        },
        {
          category: "Tuition plus living (estimate)",
          cost: "₩13,000,000–₩22,000,000"
        }
      ]
    }
  ],
  costNote: "Study in Korea lists average annual undergraduate tuition of about KRW 4.3 million at national and public universities and KRW 7.6 million at private universities, and about KRW 2.5 million to 4.4 million for graduate programs. By department the averages run from about KRW 6.0 million (humanities and social sciences) to KRW 9.8 million (medicine). Study in Korea estimates living costs at KRW 750,000 to 1,000,000 a month, including housing of KRW 500,000 to 700,000 (dormitory fees vary).",
  scholarshipsTitle: "Scholarships for Nepalese Students",
  scholarshipsIntro: "Nepali students can apply for the Korean government's Global Korea Scholarship (GKS) and for scholarships offered by individual universities.",
  scholarships: [
    {
      name: "Global Korea Scholarship (GKS)",
      details: "Korean government scholarship for undergraduate and graduate degrees. It covers airfare, Korean language training, tuition and a monthly allowance"
    },
    {
      name: "University Scholarships",
      details: "Many universities offer tuition discounts to international students. Amounts and eligibility are set by each university, so check with the university"
    }
  ],
  scholarshipsNote: "Apply through Admizz Education today and get expert support in finding, applying, and winning scholarships",
  universities: [],
  quickAnswer:
    "To study in South Korea from Nepal you need an admission letter from a Korean university and a D-2 student visa from the Korean Embassy in Kathmandu, applied for through an online appointment. The embassy asks for verified academic documents, a statement of purpose, an IELTS or TOPIK report, a TB medical report, a balance certificate and six months of bank statements, and says processing can take 21 working days or more. Average undergraduate tuition is about KRW 4.3 to 7.6 million a year, and living costs about KRW 750,000 to 1,000,000 a month. Part-time work needs permission from immigration.",
  lastUpdated: "October 2026",
  sources: [
    { label: "Embassy of Korea in Nepal: Visa issuance", url: "https://overseas.mofa.go.kr/np-en/wpge/m_1714/contents.do" },
    { label: "Study in Korea: Student visa and stay status", url: "https://www.studyinkorea.go.kr/en/plan/visaAndStay.do" },
    { label: "Study in Korea: Part-time work and job-seeking visa", url: "https://www.studyinkorea.go.kr/en/life/residenceAndStayInfo.do?tab=part-time-job" },
    { label: "Study in Korea: Study expenses in Korea", url: "https://www.studyinkorea.go.kr/en/plan/abroadExpenses.do" },
    { label: "Study in Korea: Living costs and expenses", url: "https://www.studyinkorea.go.kr/en/life/livingExpense.do" },
    { label: "Study in Korea: Scholarships (GKS)", url: "https://www.studyinkorea.go.kr/en/plan/scholarship.do" },
    ...DESTINATION_COMPARE_SOURCES,
  ],
  relatedLinks: [
    { label: "Study in South Korea", href: "/study-in-south-korea", description: "universities, admission and visa overview" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "Visa assistance for study abroad", href: "/visa-assistance-for-study-abroad" },
    { label: "Test preparation", href: "/test-prep", description: "IELTS and language test coaching" },
  ],
  extraSections: [
    {
      id: "korea-visa-documents",
      title: "Documents for a South Korea Student Visa from Nepal",
      intro: "The Korean Embassy in Kathmandu lists these documents for a D-2 student visa (stay of more than 90 days). A visa appointment must be booked online.",
      bullets: [
        "From the university: Standard Admission Certificate (original and photocopy), a scholarship certificate if you have one, and a photocopy of the university's business registration certificate.",
        "Passport (original and photocopy), one recent passport-size photo, a visa cover letter and a statement of purpose (SOP).",
        "Latest educational certificates for the course you are applying to (transcript and graduation certificate), plus mark sheets and character certificates. All school documents must be verified by the Korean Embassy in Nepal.",
        "An IELTS or TOPIK report. Applicants who completed secondary and higher education in the USA, UK, Canada, Australia, New Zealand, Ireland or South Africa may submit proof of education instead.",
        "A TB medical report from one of the four hospitals designated by the embassy, and a family relationship certificate.",
        "A balance certificate and bank statements for the last 6 months, accepted only from an A-level bank.",
      ],
      note: "Source: Embassy of Korea in Nepal, Visa issuance. The embassy can request extra documents, so check its page before you apply.",
    },
    {
      id: "korea-money",
      title: "Money to Plan for When Studying in Korea",
      intro: "The Nepal embassy page asks for a balance certificate and 6 months of bank statements but does not publish a minimum balance, so confirm the amount with the embassy and your university.",
      table: {
        headers: ["Item", "Amount"],
        rows: [
          ["Student visa fee for Nepali applicants (single entry, more than 90 days), from 1 July 2026", "NPR 9,300"],
          ["Average annual undergraduate tuition, national and public universities", "About KRW 4.3 million"],
          ["Average annual undergraduate tuition, private universities", "About KRW 7.6 million"],
          ["Average annual graduate tuition (national and public to private)", "About KRW 2.5 million to 4.4 million"],
          ["Living costs", "KRW 750,000 to 1,000,000 a month"],
          ["Housing within living costs", "KRW 500,000 to 700,000 a month (dormitory fees vary)"],
        ],
      },
      note: "Sources: Embassy of Korea in Nepal (visa fee); Study in Korea, Study expenses and Living costs. Actual tuition depends on your university and department.",
    },
    {
      id: "korea-work-rights",
      title: "Working in Korea During and After Your Studies",
      bullets: [
        "During study: D-2 students need part-time work permission before they work. You need a certain level of Korean language (TOPIK, Social Integration Program or King Sejong Institute) and confirmation from your university's international student advisor.",
        "Hours depend on your degree level, year and Korean level. For bachelor's years 1 to 2 and for master's and doctoral students permission is available straight away, while bachelor's years 3 to 4 need TOPIK Level 4 or equivalent.",
        "Check the exact weekday and weekend limits for your case in the official Study in Korea table before you take a job.",
        "After study: you can change to a D-10-1 job-seeking visa. It can be extended in 6-month steps up to 2 years, and manual or unskilled work is not allowed on it.",
      ],
      note: "Source: Study in Korea, Part-time work and job-seeking visa (from Hi Korea).",
    },
    {
      id: "korea-gks",
      title: "Global Korea Scholarship (GKS) Basics",
      bullets: [
        "Benefits: airfare, Korean language training fees, tuition and a monthly allowance.",
        "Duration: 1 year of Korean language training plus a 2 to 3 year associate degree or 4 to 6 year bachelor's degree for undergraduates, or a 2 year master's or 3 year doctoral degree for graduates.",
        "Eligibility: you and both parents must hold non-Korean citizenship. Undergraduate applicants must be under 25 and graduates under 40. A minimum academic score of 80% (or equivalent) applies.",
        "TOPIK is used for GKS applications and the level depends on the track, so read the notice for your year.",
        "Application dates change every year. Check the Study in Korea scholarship notices and the Korean Embassy in Nepal for the current round.",
      ],
      note: "Source: Study in Korea, Scholarships (GKS).",
    },
  ],
  faqItems: [
    {
      question: "How much does it cost to study in South Korea from Nepal?",
      answer: "Average annual undergraduate tuition is about KRW 4.3 million at national and public universities and KRW 7.6 million at private ones, according to Study in Korea. Living costs are estimated at KRW 750,000 to 1,000,000 a month. Exact fees depend on your university and department, so check with the university."
    },
    {
      question: "What are the requirements to study in South Korea from Nepal?",
      answer: "You need a Korean university admission letter, verified academic documents, a statement of purpose, an IELTS or TOPIK report, and the D-2 student visa. Applicants must have completed 12 years of schooling, and each university sets its own language and grade requirements. Check your university's international admissions page."
    },
    {
      question: "What documents are needed for a Korean student visa from Nepal?",
      answer: "The Korean Embassy in Kathmandu asks for the Standard Admission Certificate, passport, SOP, verified educational certificates, an IELTS or TOPIK report, a TB medical report, a balance certificate and 6 months of bank statements from an A-level bank. Book your visa appointment online, and check the embassy page for updates."
    },
    {
      question: "How long does the South Korea student visa take from Nepal?",
      answer: "The Korean Embassy in Nepal says visa issuance can take 21 working days or more, and recommends applying at least 21 days before your departure date. Apply as soon as your admission certificate is ready and keep all documents complete."
    },
    {
      question: "Can Nepalese students work part-time while studying in Korea?",
      answer: "Yes, but only with part-time work permission from immigration. You need a certain Korean language level and confirmation from your university's international student advisor. Weekly hours depend on your degree level, year and Korean level, so check the official Study in Korea table."
    },
    {
      question: "Who can apply for the Global Korea Scholarship (GKS)?",
      answer: "GKS covers airfare, Korean language training, tuition and a monthly allowance. Applicants and both parents must be non-Korean citizens, undergraduate applicants must be under 25 and graduate applicants under 40, with a minimum score of 80% or equivalent. TOPIK is used for applications, and dates change every year."
    },
    {
      question: "Can I stay and work in Korea after my degree?",
      answer: "You can apply to change to a D-10-1 job-seeking visa after your studies. It can be extended in 6-month steps up to 2 years, and manual or unskilled work is not allowed on it. Once you find a job, the visa must be changed to one that matches the work."
    },
    {
      question: "Is Korean language (TOPIK) mandatory to study in South Korea?",
      answer: "It depends on your university and program. Korean-taught programs usually ask for a TOPIK score, and English-taught programs set their own English requirement. The Korean Embassy in Nepal asks visa applicants for an IELTS or TOPIK report. TOPIK scores stay valid for 2 years from the score announcement."
    },
    {
      question: "When are the Korean university intakes?",
      answer: "Korean universities run two main semesters, starting in March and September. Application windows differ by university and program, so check your university's international admissions page and start preparing early so your documents, scholarship applications and visa appointment fit the timeline."
    },
    {
      question: "Does Admizz provide Korean language or entrance exam preparation?",
      answer: "Yes. Admizz offers basic Korean language support, guidance for TOPIK, and preparation counseling for university-specific entrance tests (if applicable). Our team also helps with interview training and document translation"
    }
  ],
  ctaTitle: "Get in Touch with Admizz",
  ctaContent: "From helping you select the right Korean university and program to assisting with scholarship applications, visa documentation, and even basic Korean language support — we provide end-to-end guidance tailored to Nepalese students. Contact us today to schedule your free Korea education counselling session. Your global career starts now — make South Korea your next academic destination with Admizz."
};

export default async function StudyInSouthKoreaFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "south-korea" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
