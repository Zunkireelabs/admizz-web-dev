import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import { DESTINATION_COMPARE_HEADERS, DESTINATION_COMPARE_ROWS, DESTINATION_COMPARE_SOURCES } from "@/data/destination-compare";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Australia from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in Australia from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-australia-from-nepal",
  },
  openGraph: {
    title: "Study in Australia from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in Australia from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-australia-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

// Every visa fact on this page was checked against Department of Home Affairs,
// Study Australia, Department of Education or DFAT pages in October 2026.
// Re-check the fee, the funds amount and the English minimum before editing.
const pageData: NepalVariantData = {
  countryName: "Australia",
  countryCategorySlug: "australia",
  heroHeading: "Study in Australia from Nepal",
  heroSubheading:
    "Study in Australia from Nepal with Admizz Education: expert counselling, university selection, Student visa support and scholarship guidance for Nepali students.",

  quickAnswer:
    "To study in Australia from Nepal you need a Confirmation of Enrolment (CoE) from a registered Australian provider, Overseas Student Health Cover (OSHC), a Genuine Student statement, and an English test score of at least IELTS 6.0, PTE Academic 47 or TOEFL iBT 67 (for tests taken on or after 7 August 2025). You must show you can pay your tuition, travel and living costs, with the living-cost amount set at AUD 29,710 for a single student. The Student visa (subclass 500) costs from AUD 2,500 from 1 July 2026. Students can work up to 48 hours a fortnight while their course is in session, and graduates can usually apply for the Temporary Graduate visa for 2 to 3 years.",
  lastChecked: "October 2026",
  dateModified: "2026-10-13",
  guideTabLabel: "Fees & Rules",
  guideSections: [
    {
      id: "visa-fees",
      title: "Australia Student Visa Fee, Funds and Health Cover",
      intro: "Check all three figures on the official sites on the day you apply, because they change.",
      bullets: [
        "Visa application charge: AUD 2,500 from July 1, 2026, up from AUD 2,000. Nepal is not on the published exempt list.",
        "Funds: Study Australia says you must show at least AUD 29,710 for living costs. You also show your tuition and travel costs, and the amounts for a partner or children differ, so check Home Affairs for your case.",
        "OSHC: you must hold adequate health cover for your whole stay, and the application is refused without proof of OSHC.",
        "Genuine Student requirement: applies to applications lodged on or after March 23, 2024. The form asks about your ties to family, community, employment and finances, and why you chose your course and Australia. Write your answers yourself.",
      ],
      note: "From October 2, 2026, Home Affairs lists new student visa application rules that change who can apply while in Australia.",
      links: [
        { label: "Visa fee, funds and OSHC guide", href: "/australia-student-visa-cost-funds-2026-27-nepali-students" },
        { label: "October 2026 visa changes", href: "/australia-student-visa-changes-october-2026-nepali-students" },
        { label: "Nepal assessment level", href: "/australia-assessment-level-3-nepal-2026" },
      ],
    },
    {
      id: "english",
      title: "English Test Scores for the Australia Student Visa",
      intro:
        "Minimum IELTS, PTE and TOEFL scores depend on your course and on the Home Affairs checklist. Lower scores can be accepted with ELICOS or foundation study.",
      links: [
        { label: "IELTS, PTE and TOEFL scores for Australia", href: "/australia-student-visa-english-test-scores-ielts-pte-toefl-2026" },
        { label: "Australia student visa (subclass 500)", href: "/australia-student-visa-subclass-500" },
      ],
    },
    {
      id: "compare",
      title: "Australia vs the UK, USA and Canada",
      intro:
        "How Australia compares on visa fees, the funds you must show and work after study, using official figures as checked in October 2026.",
      table: { headers: DESTINATION_COMPARE_HEADERS, rows: DESTINATION_COMPARE_ROWS },
      links: [
        { label: "UK", href: "/study-in-uk-from-nepal" },
        { label: "USA", href: "/study-in-usa-from-nepal" },
        { label: "Canada", href: "/study-in-canada-from-nepal" },
      ],
    },
  ],
  sourcesTitle: "Official sources",
  sources: [
    { label: "Study Australia: Student visa (subclass 500)", url: "https://www.studyaustralia.gov.au/en/plan-your-move/your-guide-to-visas/student-visa-subclass-500" },
    { label: "Home Affairs: Student visa (subclass 500)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
    { label: "Home Affairs: Genuine Student requirement", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-student-requirement" },
    { label: "Study Australia: Temporary Graduate visa (subclass 485)", url: "https://www.studyaustralia.gov.au/en/plan-your-move/your-guide-to-visas/temporary-graduate-visa-subclass-485" },
    { label: "Department of Education: Managed system for international education", url: "https://education.gov.au/managed-system-international-education-2026" },
    { label: "DFAT: Australia Awards in Nepal", url: "https://www.dfat.gov.au/geo/nepal/development-assistance/australia-awards-nepal" },
    { label: "Study Australia: How to apply for your visa", href: "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process" },
    { label: "Study Australia: Student visa application charge increase", href: "https://www.studyaustralia.gov.au/en/tools-and-resources/news/student-visa-application-charge-increase" },
    { label: "Home Affairs: Fees and charges", href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/fees-and-charges" },
    ...DESTINATION_COMPARE_SOURCES.filter((x) => !x.href.includes("studyaustralia")),
  ],
  relatedLinks: [
    { label: "Study in Australia", href: "/study-in-australia", description: "universities, admission and visa overview" },
    { label: "Australia assessment level and visa guide for Nepal", href: "/australia-assessment-level-3-nepal-2026" },
    { label: "Step-by-step Australia student visa from Nepal", href: "/step-by-step-guide-to-australia-student-visa-from-nepal" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Australia Student visa rules from 2 October 2026", href: "/australia-student-visa-changes-october-2026-nepali-students", description: "family members and onshore applications" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "Visa assistance for study abroad", href: "/visa-assistance-for-study-abroad" },
    { label: "Test preparation", href: "/test-prep", description: "IELTS and PTE coaching" },
  ],

  introTitle: "Your Guide to Studying in Australia from Nepal",
  introContent:
    "Australia is a popular destination for Nepali students because of its globally ranked universities, practical courses, work rights during study and a graduate visa after you finish. Admizz Education helps Nepali students choose a course and university, apply, prepare the Genuine Student statement and financial evidence, and lodge the Student visa. Book a free counselling session to find out which intake and course suit your profile.",

  whyStudyTitle: "Why Study in Australia from Nepal?",
  whyStudyIntro:
    "Australia combines recognised qualifications, work rights and a clear route to work after graduation.",
  benefits: [
    {
      title: "Globally Recognised Universities",
      description:
        "Australian universities appear in the world rankings, and degrees are recognised by employers worldwide.",
    },
    {
      title: "Work While You Study",
      description:
        "Student visa holders can work up to 48 hours a fortnight while their course is in session. Students who have started a master's by research or a doctoral degree have no work hour limits.",
    },
    {
      title: "Graduate Visa After Study",
      description:
        "The Temporary Graduate visa (subclass 485) lets eligible graduates stay and work, usually for 2 to 3 years depending on the qualification.",
    },
    {
      title: "Practical, Industry-Focused Courses",
      description:
        "Courses in business, IT, engineering, health and hospitality combine theory with practical learning.",
    },
    {
      title: "Safe, Multicultural Cities",
      description:
        "Large international student communities, including Nepali students, in cities such as Sydney, Melbourne, Brisbane, Adelaide and Perth.",
    },
    {
      title: "Funded Scholarship Routes",
      description:
        "Australia Awards offers fully funded master's scholarships to eligible Nepali professionals, and many universities offer merit awards to international students.",
    },
  ],

  whyAdmizzTitle: "Why Choose Admizz Education?",
  whyAdmizzPoints: [
    "Free career counselling: personalised guidance for your goals and budget",
    "University shortlisting across Australian partner universities",
    "Help writing the Genuine Student statement and preparing financial evidence",
    "Scholarship assistance and application support",
    "End-to-end support from admission to pre-departure",
  ],

  topCoursesTitle: "Popular Courses to Study in Australia",
  topCourses: [
    "Information Technology and Cyber Security",
    "Business, Accounting and Finance",
    "Engineering",
    "Nursing and Health Sciences",
    "Data Science and Analytics",
    "Hospitality and Tourism",
    "Education and Teaching",
  ],

  visaTitle: "Australia Student Visa (Subclass 500) Process: Step by Step",
  visaIntro:
    "Follow these steps to apply for your Student visa from Nepal. Home Affairs may ask for more evidence depending on your case.",
  visaRequirements: [
    {
      category: "1. Choose Course and Provider",
      details: "Select a course at a registered Australian provider that is open to international students",
    },
    {
      category: "2. Receive and Accept Offer",
      details: "Accept your offer and pay the deposit your provider asks for",
    },
    {
      category: "3. Get Your CoE",
      details: "Your provider issues a Confirmation of Enrolment (CoE) once you have accepted and paid",
    },
    {
      category: "4. Buy OSHC",
      details: "Overseas Student Health Cover is compulsory for the whole of your stay, and your visa is refused without it",
    },
    {
      category: "5. Take an English Test",
      details: "IELTS 6.0 overall or an equivalent approved test, unless you are exempt",
    },
    {
      category: "6. Prepare Funds and Your Genuine Student Statement",
      details: "Show you can cover tuition, travel and living costs, and explain why you want to study in Australia",
    },
    {
      category: "7. Lodge Your Application",
      details: "Apply online and pay the visa application charge, which is from AUD 2,500 from 1 July 2026",
    },
    {
      category: "8. Health and Biometrics, then Decision",
      details: "Complete any health checks or biometrics Home Affairs requests, then wait for the decision",
    },
  ],

  intakesTitle: "Key Intakes in Australia",
  intakesIntro:
    "Most Australian universities start courses in February and July. Some offer a smaller November intake.",
  intakes: [
    {
      intake: "February: Main Intake",
      months: "Semester 1 (late February or early March)",
      details:
        "The largest intake, with the widest choice of courses. Apply several months ahead so you have time for the CoE and visa.",
    },
    {
      intake: "July: Second Main Intake",
      months: "Semester 2",
      details:
        "A good alternative if you miss February, with most popular courses available.",
    },
    {
      intake: "November: Limited",
      months: "Select providers and courses",
      details:
        "Offered by some universities and colleges for specific courses only.",
    },
  ],
  intakesNote:
    "Because the government now manages how many new students each provider can enrol, applying early gives you the best chance of fast processing.",

  testTitle: "English Language Requirements for Australia",
  testIntro:
    "These are the Home Affairs minimum overall scores for tests taken on or after 7 August 2025. Universities often ask for more, so check your course page for the exact score.",
  testRequirements: [
    {
      test: "IELTS Academic (Student visa minimum)",
      score: "6.0 overall",
      notes: "5.5 if your main course comes with at least 10 weeks of ELICOS, a Foundation program or an eligible Pathway program, and 5.0 with at least 20 weeks of ELICOS",
    },
    {
      test: "IELTS (typical university entry)",
      score: "6.0 – 6.5",
      notes: "Varies by university and course",
    },
    {
      test: "PTE Academic (Student visa minimum)",
      score: "47",
      notes: "39 with at least 10 weeks of ELICOS, Foundation or eligible Pathway, and 31 with at least 20 weeks of ELICOS",
    },
    {
      test: "TOEFL iBT (Student visa minimum)",
      score: "67",
      notes: "51 with at least 10 weeks of ELICOS, Foundation or eligible Pathway, and 37 with at least 20 weeks of ELICOS. You must choose 'Taking TOEFL for Australia' when you register",
    },
  ],
  testNote:
    "Your test must have been taken within the 2 years before you lodge your visa application. Home Affairs does not accept tests taken entirely online or at home, such as IELTS Online, OET@Home, MET Digital or TOEFL iBT Home Edition. For TOEFL, you must select 'Taking TOEFL for Australia' when you register (required from 21 January 2026). You may not need a test at all if you are exempt, for example if you enrol in a standalone English course (ELICOS) or a registered postgraduate research course. Home Affairs also accepts C1 Advanced (161), LANGUAGECERT Academic (61), MET (53), OET (1210) and CELPIP General (7). Tests taken before 7 August 2025 have different scores, so check the Home Affairs table if yours is older. Admizz Education offers IELTS and PTE preparation to help you reach your target score.",

  costTitle: "Cost of Studying in Australia from Nepal",
  costIntro:
    "These are the main costs to plan for. Tuition depends on the university and course.",
  costTables: [
    {
      title: "Tuition Fees (Per Year)",
      rows: [
        { category: "Undergraduate", cost: "AUD 20,000 – 45,000" },
        { category: "Postgraduate", cost: "AUD 22,000 – 50,000" },
        { category: "MBA / Professional", cost: "AUD 35,000 – 60,000+" },
      ],
    },
    {
      title: "Visa and Living Costs",
      rows: [
        {
          category: "Living costs Home Affairs requires you to show (single student, since 10 May 2024)",
          cost: "AUD 29,710",
        },
        {
          category: "Student visa application charge (from 1 July 2026)",
          cost: "From AUD 2,500",
        },
        {
          category: "Overseas Student Health Cover (OSHC)",
          cost: "Compulsory, price depends on provider and cover length",
        },
      ],
    },
  ],
  costNote:
    "The AUD 29,710 is the amount Home Affairs sets for evidence of living costs, and you must also show you can pay tuition and travel. Sydney and Melbourne are more expensive than Adelaide or Perth.",

  scholarshipsTitle: "Scholarships for Nepali Students in Australia",
  scholarshipsIntro:
    "Funding comes from the Australian government and from individual universities.",
  scholarships: [
    {
      name: "Australia Awards Scholarships",
      details:
        "Fully funded master's scholarships for eligible Nepali applicants with relevant work experience. Covers tuition, return airfare, a living contribution and OSHC. The round for the 2027 intake was open from 1 February to 30 April 2026. Check the DFAT website for the next round.",
    },
    {
      name: "University International Merit Scholarships",
      details:
        "Many Australian universities offer partial tuition scholarships to international students based on academic results. Amounts and eligibility differ by university.",
    },
    {
      name: "Research Scholarships",
      details:
        "Master's by research and PhD students may receive tuition and living stipends from the university.",
    },
  ],
  scholarshipsNote:
    "Admizz Education helps you shortlist universities with scholarships that match your profile and prepare a strong application.",

  universities: [
    { name: "Monash University", logo: "/images/universities/australia/monash-university.webp" },
    { name: "University of Queensland", logo: "/images/universities/australia/university-of-queensland.webp" },
    { name: "Macquarie University", logo: "/images/universities/australia/macquarie-university.webp" },
    { name: "RMIT University", logo: "/images/universities/australia/rmit-university.webp" },
    { name: "La Trobe University", logo: "/images/universities/australia/la-trobe-university.webp" },
    { name: "Victoria University", logo: "/images/universities/australia/victoria-university.webp" },
    { name: "Western Sydney University", logo: "/images/universities/australia/western-sydney-university.webp" },
    { name: "University of Tasmania", logo: "/images/universities/australia/university-of-tasmania.webp" },
    { name: "Southern Cross University", logo: "/images/universities/australia/southern-cross-university.webp" },
    { name: "Kaplan Business School", logo: "/images/universities/australia/kaplan-business-school.webp" },
  ],

  extraSections: [
    {
      id: "australia-requirements",
      title: "Admission Requirements for Nepali Students",
      intro:
        "Each university sets its own entry rules, so always check the course page. These are the usual requirements.",
      bullets: [
        "Bachelor's: completed secondary education (+2 / 12 years of schooling) with results that meet the course requirement.",
        "Master's: a completed bachelor's degree, usually with a minimum grade set by the university.",
        "English: an approved test score at the level the university requires (see the table above).",
        "Academic transcripts, a CV for some courses, and a statement of purpose or personal statement.",
        "A genuine reason for choosing the course and Australia, which you also explain in the Genuine Student statement.",
      ],
    },
    {
      id: "australia-visa-documents",
      title: "Documents for the Australia Student Visa from Nepal",
      intro: "Based on Home Affairs and Study Australia guidance. Your checklist can differ, so confirm with the Document Checklist Tool.",
      bullets: [
        "A valid passport.",
        "Your Confirmation of Enrolment (CoE).",
        "Proof of Overseas Student Health Cover (OSHC) for the whole of your stay.",
        "An English test result, unless you are exempt.",
        "Evidence that you can pay for travel, tuition and 12 months of living costs. Since 2 October 2026 most students can no longer include family members in their Student visa application (see the rule changes below).",
        "Your Genuine Student statement, written in English (the application form limits each answer to 150 words).",
      ],
    },
    {
      id: "australia-work-rights",
      title: "Working in Australia During and After Your Studies",
      bullets: [
        "During study: up to 48 hours a fortnight while your course is in session. Students who have started a master's by research or a doctoral degree have no work hour limits.",
        "After study: the Temporary Graduate visa (subclass 485) is usually granted for 2 to 3 years for bachelor's, master's and doctoral graduates, depending on the qualification. Other streams exist for diploma and trade graduates.",
        "Rules about work rights and the graduate visa change, so check Home Affairs before you plan around them.",
      ],
      note: "Sources: Study Australia and Home Affairs.",
    },
    {
      id: "australia-oct-2026-rules",
      title: "New Student Visa Rules From 2 October 2026",
      bullets: [
        "Family members: you can no longer include a partner or dependent children in your Student visa application, including a further Student visa application, unless an exemption applies. Exemptions include PhD students, DFAT or Defence-sponsored students, foreign government scholarship recipients, and eligible students from Pacific and ASEAN countries. Family members must be in the same location as you when the application is lodged.",
        "Adding family later: current Student visa holders can no longer add family members after the visa is granted. There are no exemptions to this rule.",
        "Applying from inside Australia: most temporary visa holders must now be outside Australia when they lodge a Student visa application and when it is granted, with no exemptions. Current Student visa holders applying for another Student visa in Australia must also be offshore unless a limited exemption applies, for example if they need up to 12 more months to finish their main course, are sponsored by DFAT or Defence, are starting a PhD, or are moving up to a higher-level qualification.",
        "Dependants: a dependant on a Student visa who wants to apply as the main applicant must apply from outside Australia, with no exemptions.",
      ],
      note: "Source: Department of Home Affairs, 'Changes to Student visa application rules (subclasses 500 and 590)', pages on including family members and on applying while in Australia. These changes do not affect a visa you already hold.",
    },
    {
      id: "australia-managed-growth",
      title: "Why You Should Apply Early: Australia's Managed Growth System",
      bullets: [
        "The government sets a National Planning Level for new international student commencements. For 2026 it is 295,000, which is 25,000 more than 2025.",
        "It is not a cap on students. Any genuine student who meets the visa requirements can still apply.",
        "Visa applications are processed with priority until the provider you chose reaches 80% of its allocation in 2026. After that they are still accepted but processed more slowly.",
      ],
      note: "Source: Study Australia and the Department of Education. Settings are reviewed each year, so check the latest for your intake.",
    },
  ],

  faqItems: [
    {
      question: "How much does it cost to study in Australia from Nepal?",
      answer:
        "Tuition is roughly AUD 20,000–45,000 a year for a bachelor's and AUD 22,000–50,000 for a master's. On top of that, Home Affairs requires you to show living costs of AUD 29,710 for a single student, plus your travel costs, and the Student visa application charge is from AUD 2,500.",
    },
    {
      question: "How much money do I need to show for an Australian student visa?",
      answer:
        "Home Affairs sets the living-cost amount at AUD 29,710 for a single student (since 10 May 2024). You must also show you can pay your tuition fees and travel costs. Since 2 October 2026 most Student visa applicants cannot include a partner or children in their application, so the single-student amount applies to most students.",
    },
    {
      question: "What English score do I need for an Australian student visa?",
      answer:
        "For tests taken on or after 7 August 2025 the Student visa minimums are IELTS Academic 6.0, PTE Academic 47 and TOEFL iBT 67. They are lower if your main course comes with at least 10 or 20 weeks of English study (ELICOS), for example IELTS 5.5 or 5.0. Universities often ask for more, so check your course page.",
    },
    {
      question: "What is the Genuine Student requirement?",
      answer:
        "Since 23 March 2024 every applicant must show they are a genuine student who intends to study in Australia as the main reason for applying. You answer written questions in English about why you chose the course, the provider and Australia, with a limit of 150 words per answer.",
    },
    {
      question: "Can I bring my partner or children on an Australian student visa from Nepal?",
      answer:
        "Since 2 October 2026 you can no longer include family members in your Student visa application unless an exemption applies, such as PhD study, being sponsored by DFAT or Defence, receiving a foreign government scholarship, or being an eligible student from a Pacific or ASEAN country. You also cannot add family members after your visa is granted, and there are no exemptions to that rule.",
    },
    {
      question: "Which English tests does Home Affairs not accept for an Australian student visa?",
      answer:
        "Tests taken entirely online or at home are not accepted, including IELTS Online, OET@Home, MET Digital and TOEFL iBT Home Edition. Your test must also be taken within the 2 years before you lodge your application, and for TOEFL you must choose 'Taking TOEFL for Australia' when you register.",
    },
    {
      question: "Is health insurance compulsory for Australian student visas?",
      answer:
        "Yes. You must have Overseas Student Health Cover (OSHC) for the whole of your stay, and your visa application is refused if you cannot show it.",
    },
    {
      question: "Can Nepali students work while studying in Australia?",
      answer:
        "Yes. Student visa holders can work up to 48 hours a fortnight while their course is in session. Students who have started a master's by research or a doctoral degree have no work hour limits.",
    },
    {
      question: "How long can I stay in Australia after I graduate?",
      answer:
        "Eligible bachelor's, master's and doctoral graduates can usually apply for the Temporary Graduate visa (subclass 485) for 2 to 3 years, depending on the qualification. Rules change, so check Home Affairs before you plan around it.",
    },
    {
      question: "What are the intakes for Australian universities?",
      answer:
        "Most start in February and July, and some providers also offer a smaller November intake for selected courses. Apply several months ahead so there is time for your CoE and visa.",
    },
    {
      question: "Why should I apply early for an Australian student visa?",
      answer:
        "The government manages how many new international students each provider can enrol through the National Planning Level, which is 295,000 for 2026. Applications are processed with priority until your provider reaches 80% of its allocation, and more slowly after that. It is not a cap, but applying early helps.",
    },
    {
      question: "Are there fully funded scholarships for Nepali students in Australia?",
      answer:
        "Yes. Australia Awards offers fully funded master's scholarships to eligible Nepali applicants with several years of relevant work experience, covering tuition, return airfare, a living contribution and OSHC. Check the DFAT website for the next round. Many universities also offer partial merit scholarships.",
    },
    {
      question: "Does Admizz offer test preparation in Nepal?",
      answer:
        "Yes. Admizz Education offers coaching for IELTS, PTE and other English tests that Australian universities and the Student visa accept.",
    },
  ],

  ctaTitle: "Ready to Begin Your Study Abroad Journey?",
  ctaContent:
    "Our expert consultants are here to guide you every step of the way.",
};

export default async function StudyInAustraliaFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(
    postsByCategoryQuery,
    { categorySlug: "australia" }
  );
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
