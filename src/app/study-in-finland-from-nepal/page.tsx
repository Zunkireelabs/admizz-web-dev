// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Finland from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in Finland from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-finland-from-nepal",
  },
  openGraph: {
    title: "Study in Finland from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in Finland from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
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
    "Finland is renowned for its research-driven education system. Finnish universities and universities of applied sciences offer English-taught programmes and strong connections to industry. For Nepali students, Finland represents an excellent opportunity to gain a globally recognised degree in a safe, inclusive, and technologically advanced society. At Admizz Education, we provide end-to-end support — from university selection and application assistance to IELTS coaching, residence permit application support, and pre-departure guidance.",

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
        "Finland has 13 universities and 22 universities of applied sciences (UAS), offering more than 600 English-taught bachelor's and master's degree programmes, according to Study in Finland.",
    },
    {
      title: "Affordable Tuition & Scholarships",
      description:
        "Students from outside the EU/EEA usually pay €9,000–€20,000 a year for English-taught bachelor's and master's programmes. Many universities offer their own scholarships or tuition waivers.",
    },
    {
      title: "Safe & Inclusive Society",
      description:
        "Finland offers a safe, inclusive and well-organised society for international students.",
    },
    {
      title: "Innovation & Technology Hub",
      description:
        "Finnish universities of applied sciences are professionally oriented and have strong ties with working life, according to Study in Finland.",
    },
    {
      title: "Post-Study Work Opportunities",
      description:
        "Graduates of a Finnish degree can apply for a residence permit to look for work, granted for a maximum of two years, according to Migri.",
    },
  ],

  visaTitle: "Finland Student Residence Permit Requirements for Nepalese Students",
  visaIntro:
    "Non-EU/EEA students need a residence permit for studies. You apply through the Enter Finland online service, then visit a Finnish mission to verify your identity.",
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
      details: "€9,600 in your bank account when you apply for studies of a year or longer; €800 per month for shorter studies",
    },
    {
      category: "English Proficiency",
      details: "As required by your university or programme (check the programme page on Studyinfo.fi)",
    },
    {
      category: "Health Insurance",
      details: "Valid private insurance covering medical expenses, as required by Migri",
    },
    {
      category: "Tuition Fee",
      details: "Proof of the paid tuition fee, or proof of funds for the tuition fee as well as living costs",
    },
    {
      category: "Identity Verification",
      details: "Visit a Finnish mission to verify your identity after applying online",
    },
    {
      category: "Residence Permit Fee",
      details: "€600 for an online application, €750 for a paper application (first permit for studies, from 1 January 2026)",
    },
  ],
  visaNote:
    "Processing time: Migri reports that most first student permit applications in spring and summer are decided within 30 days, with an estimated 90 days if there is no decision by then. Apply as soon as you are admitted.",

  intakesTitle: "Finland Intakes for Nepalese Students",
  intakesIntro:
    "Most English-taught programmes start in August or September. The joint application for them opens in January (7 to 21 January in 2026), and a smaller number of programmes start in January.",
  intakes: [
    {
      intake: "Main Intake (Autumn/September)",
      months: "Joint application each January via Studyinfo.fi",
      details:
        "Bachelor's and Master's programmes in English. Almost 300 English-taught options were in the January 2026 joint application, and you can apply to up to six programmes with one form",
    },
    {
      intake: "Secondary Intake (Spring/January)",
      months: "Fewer programmes, apply in the autumn joint application",
      details:
        "A smaller number of programmes start in January. For January 2026 starts the joint application was open 1 to 11 September 2025",
    },
  ],
  intakesNote:
    "Study in Finland lists an application fee of €100. Results of the January joint application are published from early February, and all results by late May. Check exact dates for each programme on Studyinfo.fi, because separate applications can run at other times.",

  testTitle: "English Language Requirements",
  testIntro:
    "Finnish institutions set their own English requirements, so there is no single national score. Check the admission criteria of each programme on Studyinfo.fi.",
  testRequirements: [
    {
      test: "IELTS, TOEFL, PTE or other accepted tests",
      score: "Set by each university or programme",
    },
  ],
  testNote:
    "Accepted tests and minimum scores vary by institution and programme. Always confirm on the programme's admission criteria page.",

  costTitle: "Cost of Studying in Finland from Nepal",
  costIntro:
    "Tuition fees for non-EU/EEA students are set by each institution. Study in Finland gives €9,000–€20,000 a year for English-taught bachelor's and master's programmes, and a fee of at least €1,500 per academic year applies by law. The figures below are Admizz estimates, so confirm with the university.",
  costTables: [
    {
      title: "Tuition Fees (Annual)",
      rows: [
        {
          category: "English-taught bachelor's and master's (non-EU/EEA students, typical range per Study in Finland)",
          cost: "€9,000 – €20,000",
        },
        {
          category: "Doctoral programmes",
          cost: "Tuition-free regardless of nationality",
        },
        {
          category: "Application fee (Studyinfo.fi)",
          cost: "€100",
        },
      ],
    },
    {
      title: "Living Expenses",
      rows: [
        {
          category: "Minimum funds Migri requires (studies of 1 year or longer)",
          cost: "€800 per month (€9,600 for a year)",
        },
        {
          category: "Budget recommended by Study in Finland",
          cost: "About €900 – €1,200 per month",
        },
        {
          category: "Student union fee",
          cost: "About €50 – €70 per academic year",
        },
        {
          category: "Student healthcare fee",
          cost: "Around €35 per term",
        },
      ],
    },
    {
      title: "Other Expenses",
      rows: [
        {
          category: "Residence Permit Fee (first permit for studies, from 1 January 2026)",
          cost: "€600 online / €750 paper",
        },
        {
          category: "Flight Ticket (One-way)",
          cost: "NPR 50,000 – 90,000",
        },
      ],
    },
  ],
  costNote:
    "Tuition for the first year is part of what you must show: you either prove you have paid it or prove you have funds for it as well as living costs. Living costs vary by city, and Helsinki is generally the most expensive.",

  scholarshipsTitle: "Scholarships for Nepalese Students to Study in Finland",
  scholarshipsIntro:
    "Scholarships in Finland for bachelor's and master's students come from the universities themselves rather than the government.",
  scholarships: [
    {
      name: "University scholarships and tuition fee waivers",
      provider: "Individual Finnish universities and UAS",
      details:
        "Offered by each institution to students who pay tuition. They usually cover tuition fees partly or fully, not living costs, and are competitive. Many universities let you apply together with your admission application.",
    },
    {
      name: "Government scholarships for bachelor's and master's",
      provider: "None",
      details:
        "Study in Finland states there are no governmental scholarship programmes for bachelor's or master's studies, and warns that adverts for fully funded Finnish government scholarships are false.",
    },
    {
      name: "EDUFI Fellowship",
      provider: "Finnish National Agency for Education (EDUFI)",
      details:
        "Doctoral-level only. The fellowship for foreign doctoral researchers ended at the end of 2025, with no new applications after 17 October 2025.",
    },
  ],
  scholarshipsNote:
    "Scholarship rules, amounts and deadlines are set by each university, so check the scholarship page of every programme you apply to.",

  universities: [
    { name: "Haaga-Helia University of Applied Science", logo: "/images/universities/finland/haaga-helia.webp" },
    { name: "South-Eastern Finland University of Applied Science", logo: "/images/universities/finland/south-eastern-finland.webp" },
    { name: "Lab University of Applied Science", logo: "/images/universities/finland/lab-university.webp" },
    { name: "Satakunta University of Applied Science", logo: "/images/universities/finland/satakunta-university.webp" },
    { name: "Vaasa University of Applied Science", logo: "/images/universities/finland/vaasa-university.webp" },
    { name: "Karelia University of Applied Science", logo: "/images/universities/finland/karelia-university.webp" },
  ],

  quickAnswer:
    "To study in Finland from Nepal you need a place at a Finnish university or university of applied sciences and a residence permit for studies, applied for through Enter Finland. The first-permit fee is €600 online or €750 on paper (from 1 January 2026). For studies of a year or longer you must have €9,600 in your bank account, and you need valid insurance. Students may work an average of 30 hours a week. After a Finnish degree you can apply for a permit to look for work for up to two years.",
  lastUpdated: "October 2026",
  sources: [
    { label: "Migri: Residence permit application for studies", url: "https://migri.fi/en/residence-permit-application-for-studies" },
    { label: "Migri: Income requirement for students", url: "https://migri.fi/en/income-requirement-for-students" },
    { label: "Migri: Working and internships during studies", url: "https://migri.fi/en/working-and-internships-during-studies" },
    { label: "Migri: Residence permit to look for work", url: "https://migri.fi/en/residence-permit-to-look-for-work" },
    { label: "Study in Finland: Fees and cost of living", url: "https://www.studyinfinland.fi/funding-your-studies/fees-and-cost-living" },
    { label: "Study in Finland: Bachelor's and master's scholarships", url: "https://www.studyinfinland.fi/funding-your-studies/bachelors-and-masters-scholarships" },
  ],
  relatedLinks: [
    { label: "Study in Finland", href: "/study-in-finland", description: "universities, admission and visa overview" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "Visa assistance for study abroad", href: "/visa-assistance-for-study-abroad" },
    { label: "Test preparation", href: "/test-prep", description: "IELTS, PTE and TOEFL coaching" },
  ],
  extraSections: [
    {
      id: "finland-requirements",
      title: "Finland Residence Permit for Studies: What You Need",
      bullets: [
        "A place at a Finnish higher education institution, and a residence permit for studies before you travel.",
        "Apply online through Enter Finland, then visit a Finnish mission to verify your identity.",
        "Fee for a first permit for studies from 1 January 2026: €600 online, €750 on paper.",
        "Valid private insurance that covers medical and drug expenses, as Migri requires.",
        "Proof of paid tuition, or of funds for tuition as well as living costs, if your programme charges a fee.",
      ],
      note: "Source: Migri, Residence permit application for studies. Rules and fees change, so confirm on migri.fi before you apply.",
    },
    {
      id: "finland-money-needed",
      title: "How Much Money You Must Show for a Finland Student Permit",
      table: {
        headers: ["Situation", "Amount"],
        rows: [
          ["Studies of 1 year or longer", "€9,600 in your bank account when you apply"],
          ["Studies shorter than 1 year", "€800 per month"],
          ["If you hold a grant or scholarship for living costs", "It counts toward the requirement. A €2,000 grant means showing €7,600"],
          ["Tuition fee", "Proof of payment, or enough funds for tuition as well as living costs"],
        ],
      },
      note: "For a first permit you cannot use income from work to meet the requirement. Source: Migri, Income requirement for students.",
    },
    {
      id: "finland-documents",
      title: "Documents and Process for Nepali Applicants",
      bullets: [
        "Admission offer from your institution, valid passport and your Enter Finland application.",
        "Bank statement showing the required funds, and proof of tuition payment where it applies.",
        "Insurance cover that meets Migri's requirements for the length of your studies.",
        "Identity verification at a Finnish mission after you apply online. Migri and Study in Finland do not list extra documents for Nepal on these pages, so confirm any local steps with the mission that serves Nepal.",
        "Processing: Migri reports most first student applications in spring and summer are decided within 30 days, with an estimated 90 days if there is no decision by then.",
      ],
      note: "Sources: Migri and Study in Finland, Student residence permit.",
    },
    {
      id: "finland-work-rights",
      title: "Working in Finland During and After Your Studies",
      bullets: [
        "During study: you may work in any field for an average of 30 hours a week, which Migri also states as 120 hours a month or 1,560 hours a year.",
        "You can exceed 30 hours in some weeks, such as in holidays, as long as the average at the end of the year is no more than 30 hours.",
        "Work that is a compulsory part of your degree, such as a thesis or internship that earns credits, is not counted in the limit.",
        "After study: if you complete a degree in Finland you can apply for a residence permit to look for work, granted for a maximum of two years. You must show at least €800 per month, and the permit allows unrestricted work.",
      ],
      note: "Sources: Migri, Working and internships during studies, and Residence permit to look for work.",
    },
  ],

  faqItems: [
    {
      question: "Why should Nepalese students choose Finland for higher education?",
      answer:
        "Finland has 13 universities and 22 universities of applied sciences, and more than 600 English-taught bachelor's and master's programmes, according to Study in Finland. Students may work an average of 30 hours a week, and graduates can apply for a permit to look for work for up to two years.",
    },
    {
      question: "Do I need to speak Finnish to study in Finland?",
      answer:
        "Not for English-taught programmes. Study in Finland lists more than 600 English-taught bachelor's and master's programmes, and you can search them on Studyinfo.fi. Language rules differ by programme, so check each programme's admission criteria.",
    },
    {
      question: "What are the English language requirements for Nepali students?",
      answer:
        "There is no single national score. Each university or programme sets its accepted tests and minimum scores, so check the admission criteria on Studyinfo.fi for every programme you apply to. Admizz can help you prepare for IELTS, PTE or TOEFL once you know the target score.",
    },
    {
      question: "What are the intakes to apply for universities in Finland?",
      answer:
        "Most English-taught programmes start in August or September, and the joint application opens each January (7 to 21 January in 2026). A smaller number of programmes start in January and use the autumn joint application. Separate applications can run at other times, so check each programme.",
    },
    {
      question: "How much does it cost to study in Finland for Nepali students?",
      answer:
        "Study in Finland gives €9,000 to €20,000 a year in tuition for English-taught bachelor's and master's programmes for students from outside the EU/EEA. It recommends budgeting about €900 to €1,200 a month for living, and Migri requires you to show at least €800 a month.",
    },
    {
      question: "Are there scholarships available for Nepalese students in Finland?",
      answer:
        "Yes, from universities. Scholarships and tuition waivers are offered by individual institutions and usually cover tuition, not living costs. Study in Finland says there are no government scholarships for bachelor's or master's studies and warns that adverts for fully funded government scholarships are false.",
    },
    {
      question: "Can I work while studying in Finland?",
      answer:
        "Yes. With a residence permit for studies you may work in any field for an average of 30 hours a week. You can exceed 30 hours in some weeks, such as holidays, if the average by the end of the year is within the limit. Both you and your employer are responsible for staying within it.",
    },
    {
      question: "Can I stay in Finland after graduation?",
      answer:
        "Yes. After completing a degree in Finland you can apply for a residence permit to look for work, granted for a maximum of two years. You must have at least €800 per month at your disposal, and the permit gives an unrestricted right to work.",
    },
    {
      question: "What is the Finland student visa fee?",
      answer:
        "For a first residence permit for studies, Migri charges €600 for an online application and €750 for a paper application, from 1 January 2026. You apply through Enter Finland, then visit a Finnish mission to verify your identity. Check migri.fi for the current fee before you pay.",
    },
    {
      question: "How much bank balance is required for a Finland student permit?",
      answer:
        "For studies of a year or longer you must have €9,600 in your bank account when you apply. For studies shorter than a year it is €800 per month. A grant or scholarship for living costs counts toward this. You cannot use income from work for a first permit.",
    },
    {
      question: "How long does the Finland student residence permit take?",
      answer:
        "Migri says that in spring and summer most first student applications are decided within 30 days when the decision is positive. If you have no decision after 30 days, the estimated processing time is 90 days. Apply as soon as you are admitted, and check migri.fi for the current estimate.",
    },
    {
      question: "How can Admizz Education help me study in Finland?",
      answer:
        "Admizz provides university shortlisting, test preparation, scholarship guidance, residence permit documentation and application support, and pre-departure counselling for Finland.",
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
