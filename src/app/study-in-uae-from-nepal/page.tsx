// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import { DESTINATION_COMPARE_HEADERS, DESTINATION_COMPARE_ROWS, DESTINATION_COMPARE_SOURCES } from "@/data/destination-compare";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in UAE from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in the UAE from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-dubai-from-nepal",
  },
  openGraph: {
    title: "Study in UAE from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in the UAE from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-dubai-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/UAE.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "UAE",
  countryCategorySlug: "uae",
  heroHeading: "Build a Bright Future in One of the World's Top Study Destinations",
  heroSubheading: "Experience world-class education in a vibrant international hub. Study in the UAE with Admizz Education—get expert counseling, top university options, visa guidance, and scholarship support for your academic success.",
  introTitle: "Shape Your Future in the Heart of Innovation",
  introContent: "The United Arab Emirates (UAE) offers federal universities such as United Arab Emirates University and Zayed University, institutions in Abu Dhabi and Sharjah, and international branch campuses. Higher education is regulated at national level by the Ministry of Higher Education and Scientific Research (MoHESR) and its Commission for Academic Accreditation (CAA), with local regulators such as KHDA in Dubai, ADEK in Abu Dhabi and the Sharjah Council for Higher Education. This page covers the wider UAE. For Dubai branch campuses, free zones and KHDA, see our Dubai guide. At Admizz Education, we help you choose the right university, prepare for admissions, apply for scholarships, and guide you through visa processing.",
  // Last edit of this page in the repo (git). Update when the content is next changed or reviewed.
  dateModified: "2026-10-08",
  guideTabLabel: "Compare",
  guideSections: [
    {
      id: "compare",
      title: "Compare the UAE with Other Study Destinations",
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

  whyStudyTitle: "Why Study in the UAE?",
  whyStudyIntro: "The UAE spans several emirates, each with its own universities and regulators. Here is what students look at:",
  benefits: [
    {
      title: "Federal and Private Universities",
      description: "Choose from federal institutions such as UAEU and Zayed University, Abu Dhabi institutions such as Khalifa University, Sharjah universities, and international branch campuses.",
    },
    {
      title: "Accreditation You Can Check",
      description: "The CAA licenses institutions and accredits their academic programs, and the Ministry of Education publishes the list of licensed institutions.",
    },
    {
      title: "English-Taught Programs",
      description: "Many programs are taught in English. Check the language of instruction for your specific program.",
    },
    {
      title: "Multicultural Environment",
      description: "Live and learn in a multicultural society with students from many countries.",
    },
    {
      title: "Work While You Study",
      description: "MOHRE offers a student training and employment permit. Check eligibility and limits with your university and MOHRE before you work.",
    },
    {
      title: "Scholarships & Financial Support",
      description: "Some institutions offer scholarships. For example, Khalifa University states that it awards full scholarships to all admitted postgraduate students.",
    },
  ],
  visaTitle: "Student Visa Requirements for the UAE",
  visaIntro: "Students can be sponsored by a resident parent or by an accredited university or college where they are enrolled. Students without a resident parent in the UAE use university sponsorship.",
  visaRequirements: [
    {
      category: "Visa Type",
      details: "UAE student residence visa",
    },
    {
      category: "Who Issues It",
      details: "Residency services are federal under the Federal Authority for Identity, Citizenship, Customs and Port Security (ICP). In Dubai the permit is handled by GDRFA Dubai",
    },
    {
      category: "Sponsor",
      details: "An accredited university or college, or a resident parent. Under parental sponsorship, male students can be sponsored up to age 25, and female students until marriage",
    },
    {
      category: "Key Document",
      details: "A certificate from the university or institute stating the duration of study",
    },
    {
      category: "Medical, Insurance and ID",
      details: "Applicants aged 18 and above take a medical fitness test; health insurance or a health card is needed; you pass a security check and apply for an Emirates ID",
    },
    {
      category: "Validity",
      details: "Varies by visa type and sponsor; a sponsored residence visa can be for 1, 2 or 3 years",
    },
    {
      category: "Processing Time and Fees",
      details: "Vary by emirate and university. In Dubai, GDRFA lists AED 740 in total and 48 hours for the permit service",
    },
    {
      category: "More Info",
      details: "Check the UAE Government Portal (u.ae) and ICP for updates",
    },
  ],
  visaNote: "Sources: u.ae, Residence visa for studying in the UAE and General provisions for the residence visa. Rules and fees change, so confirm on official websites.",
  intakesTitle: "Intakes Available in the UAE",
  intakesIntro: "Each university sets its own intakes and deadlines, and they can differ between emirates and programs.",
  intakes: [
    {
      intake: "Main intake",
      months: "Set by each university",
    },
    {
      intake: "Second intake",
      months: "Set by each university",
    },
  ],
  intakesNote: "Confirm start dates and deadlines on the university's admissions page, and apply early to leave time for the visa.",
  testTitle: "English Requirements for Studying in the UAE",
  testIntro: "Minimum English scores are set by each university and program. One official example is below.",
  testRequirements: [
    {
      test: "Zayed University (international undergraduate)",
      score: "EmSAT English 1250, or IELTS 5.5, or TOEFL iBT 71",
    },
    {
      test: "Khalifa University (international applicants from schools outside the UAE)",
      score: "IELTS or TOEFL required; minimum set by the university",
    },
    {
      test: "Other universities",
      score: "Set by each university",
    },
  ],
  testNote: "Always check the current requirement on your chosen university's website. Contact Admizz for guidance on test prep and admissions.",
  costTitle: "Cost to Study in the UAE",
  costIntro: "Tuition varies widely by emirate, university and program, so we show only fees published by the institutions themselves.",
  costTables: [
    {
      rows: [
        {
          category: "Zayed University, international students without a UAE national ID (per credit hour)",
          cost: "AED 2,500",
        },
        {
          category: "Other universities",
          cost: "Set by each university; ask for the current fee schedule",
        },
        {
          category: "Dubai student residence permit (GDRFA)",
          cost: "AED 740 in total",
        },
        {
          category: "Health insurance",
          cost: "Required; the premium depends on the policy",
        },
      ],
    },
  ],
  costNote: "Accommodation and living costs depend on the emirate and your lifestyle. Ask your university for a written estimate before paying a deposit.",
  scholarshipsTitle: "Scholarships to Study in the UAE",
  scholarshipsIntro: "Scholarships are offered by individual institutions. Check each university's website for current awards and deadlines.",
  scholarships: [
    {
      name: "Khalifa University postgraduate scholarships",
      details: "Khalifa University states that it awards full scholarships to all admitted postgraduate students, Emirati and international",
    },
    {
      name: "Zayed University scholarships",
      details: "Zayed University states that scholarships cover tuition fees only, not transport, accommodation or equipment",
    },
    {
      name: "Other university scholarships",
      details: "Set by each university; ask the admissions office",
    },
  ],
  scholarshipsNote: "Contact Admizz to discover scholarships tailored to your profile and simplify the application process.",
  universities: [
    { name: "American University in Dubai", logo: "/images/universities/uae/american-university-in-dubai.webp" },
    { name: "American University of Sharjah", logo: "/images/universities/uae/american-university-of-sharjah.webp" },
    { name: "University of Sharjah", logo: "/images/universities/uae/university-of-sharjah.webp" },
    { name: "Khalifa University", logo: "/images/universities/uae/khalifa-university.webp" },
    { name: "United Arab Emirates University", logo: "/images/universities/uae/uaeu.webp" },
    { name: "Heriot-Watt University Dubai", logo: "/images/universities/uae/heriot-watt-university-dubai.webp" },
    { name: "Middlesex University Dubai", logo: "/images/universities/uae/middlesex-university-dubai.webp" },
    { name: "Canadian University Dubai", logo: "/images/universities/uae/canadian-university-dubai.webp" },
    { name: "Zayed University", logo: "/images/universities/uae/zayed-university.webp" },
    { name: "University of Wollongong Dubai", logo: "/images/universities/uae/university-of-wollongong-dubai.webp" },
  ],
  quickAnswer:
    "To study in the UAE you need admission to a licensed, accredited institution, which sponsors your student residence visa; students can also be sponsored by a resident parent. You need a medical fitness test if you are 18 or older, health insurance, a security check and an Emirates ID. Validity of a sponsored visa can be 1, 2 or 3 years. The CAA licenses institutions and accredits programs, so check both before you pay. Top graduates can qualify for a 10-year Golden Residence.",
  lastUpdated: "October 2026",
  sources: [
    { label: "u.ae: Residence visa for studying in the UAE", url: "https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/residence-visa-for-studying-in-the-uae" },
    { label: "u.ae: General provisions for the residence visa", url: "https://u.ae/en/information-and-services/visa-and-emirates-id/Visa-information/general-provisions-for-the-residence-visa" },
    { label: "u.ae: Higher education regulatory bodies", url: "https://u.ae/en/information-and-services/education/higher-education/Higher-education-regulatory-bodies" },
    { label: "Ministry of Education: List of licensed institutions", url: "https://www.moe.gov.ae/En/MediaCenter/News/Pages/licensedInstitutions.aspx" },
    { label: "GDRFA Dubai: Golden residence for top students and graduates", url: "https://www.gdrfad.gov.ae/en/services/8ea80dad-f43e-11eb-0320-0050569629e8" },
    { label: "MOHRE: Training and work permit for students", url: "https://www.mohre.gov.ae/en/services/training-and-work-permit-for-students-2022" },
    ...DESTINATION_COMPARE_SOURCES,
  ],
  extraSections: [
    {
      id: "uae-accreditation",
      title: "Licensing and Accreditation Across the UAE",
      bullets: [
        "The Ministry of Higher Education and Scientific Research (MoHESR) leads higher education development in the UAE.",
        "The Commission for Academic Accreditation (CAA) is the national body that licenses institutions and accredits their academic programs.",
        "KHDA regulates education in Dubai, ADEK in Abu Dhabi, and the Sharjah Council for Higher Education and Scientific Research in Sharjah.",
        "The Ministry of Education advises students to register only in accredited institutions and programs so that qualifications can be attested and recognized by employers.",
      ],
      note: "Sources: u.ae, Higher education regulatory bodies; Ministry of Education, List of licensed institutions.",
    },
    {
      id: "uae-visa-documents",
      title: "Student Visa Requirements and Documents",
      table: {
        headers: ["Item", "Detail"],
        rows: [
          ["Sponsor", "Accredited university or college, or a resident parent"],
          ["Parental sponsorship age", "Male students up to 25; female students until marriage"],
          ["Study certificate", "Issued by the university or institute, stating the duration of study"],
          ["Medical test", "Applicants aged 18 and above"],
          ["Health insurance", "Medical insurance or health card"],
          ["Security check and Emirates ID", "Required; apply to ICP for the Emirates ID"],
          ["Validity", "Sponsored residence visas can be for 1, 2 or 3 years"],
        ],
      },
      note: "Sources: u.ae, Residence visa for studying in the UAE and General provisions for the residence visa.",
    },
    {
      id: "uae-money-needed",
      title: "Money to Show for a UAE Student Visa",
      bullets: [
        "The official u.ae student visa page does not list a fixed bank balance, fee or processing time.",
        "Fees depend on the emirate. In Dubai, GDRFA lists AED 740 in total for the student residence permit.",
        "Your university may ask for fee payment proof or financial documents in its own process. Ask it for the exact list in writing.",
      ],
      note: "Sources: u.ae and GDRFA Dubai. Confirm current amounts on official websites.",
    },
    {
      id: "uae-work-rights",
      title: "Working and Staying in the UAE",
      bullets: [
        "During study: MOHRE issues a student training and employment permit. Non-national students need a valid residence visa, and for training a no-objection certificate from the educational institution is required. The permit runs for three months.",
        "We could not verify a fixed weekly hour limit for international students on official sites. Check with your university and MOHRE before you work.",
        "After study: the Golden Residence (10 years) is open to top graduates of UAE universities licensed by the Ministry of Education and classified Category A (GPA 3.5 or above) or Category B (GPA 3.8 or above), who graduated no more than two years ago.",
        "Graduates of top-100 ranked international universities with a GPA of 3.5 or above can also qualify.",
      ],
      note: "Sources: MOHRE, Training and work permit for students; GDRFA Dubai and u.ae, Golden visa.",
    },
  ],
  faqItems: [
    {
      question: "Why should I choose the UAE for higher education?",
      answer: "The UAE has federal universities, institutions in Abu Dhabi and Sharjah, and international branch campuses, all under a national licensing and accreditation system run by the CAA. That lets you check an institution and its programs before you apply. Multicultural living and English-taught programs add to the appeal.",
    },
    {
      question: "What are the major intakes in the UAE?",
      answer: "Each university sets its own intakes, and they can differ between emirates and programs. Check the admissions page of your chosen university for start dates and deadlines, and apply early so the sponsored student visa can be processed before your course starts.",
    },
    {
      question: "What is the cost of studying in the UAE?",
      answer: "Tuition is set by each university. As one published example, Zayed University charges international students without a UAE national ID AED 2,500 per credit hour. Add accommodation, living costs and health insurance, and ask your university for a written estimate before paying a deposit.",
    },
    {
      question: "Do I need IELTS to apply?",
      answer: "Most universities ask for proof of English, and the score is set by each one. For example, Zayed University lists EmSAT English 1250, IELTS 5.5 or TOEFL iBT 71 for international undergraduates. Check your university's current requirement before booking a test.",
    },
    {
      question: "Are scholarships available for international students?",
      answer: "Some institutions offer scholarships. Khalifa University states that it awards full scholarships to all admitted postgraduate students, while Zayed University states its scholarships cover tuition only. Check each university for current awards, criteria and deadlines, since they change.",
    },
    {
      question: "Can I work while studying in the UAE?",
      answer: "MOHRE issues a student training and employment permit. Non-national students need a valid residence visa, training needs a no-objection certificate from the institution, and the permit runs for three months. We could not verify a weekly hour limit, so confirm with your university and MOHRE.",
    },
    {
      question: "What kind of visa is required to study in the UAE?",
      answer: "You need a student residence visa. An accredited university or college can sponsor you, or a resident parent can. You need a medical test if you are 18 or older, health insurance, a security check and an Emirates ID. A sponsored visa can be valid for 1, 2 or 3 years.",
    },
    {
      question: "How do I check that a UAE university is accredited?",
      answer: "The CAA licenses institutions and accredits their programs, and the Ministry of Education publishes the list of licensed institutions. In Dubai, KHDA also lists licensed providers. Check both the institution and your exact program before paying fees, because qualifications are attested only if they are accredited.",
    },
    {
      question: "Is the UAE student visa different in Dubai, Abu Dhabi and Sharjah?",
      answer: "The visa type is the same, a student residence visa sponsored by your university, but processing is handled by the local immigration authority. In Dubai that is GDRFA, which lists AED 740 in total fees. Other emirates may differ, so ask your university for its exact steps.",
    },
    {
      question: "Can I get a Golden Visa after graduating in the UAE?",
      answer: "Possibly. The 10-year Golden Residence covers top graduates of UAE universities licensed by the Ministry of Education that are Category A (GPA 3.5) or Category B (GPA 3.8), within two years of graduating. Graduates of top-100 ranked international universities with a GPA of 3.5 can also qualify.",
    },
    {
      question: "How can Admizz help me study in the UAE?",
      answer: "Admizz provides expert support in university selection, application, scholarship help, visa process, and relocation planning.",
    },
  ],
  relatedLinks: [
    { label: "Study in Dubai from Nepal", href: "/study-in-dubai-from-nepal", description: "the Dubai-focused guide: branch campuses, costs and visas" },
    { label: "Study in Dubai", href: "/study-in-dubai", description: "destination overview" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "Visa assistance for study abroad", href: "/visa-assistance-for-study-abroad" },
  ],
  ctaTitle: "Get in Touch with Admizz",
  ctaContent: "Dreaming of studying in the UAE? Admizz Education is your trusted partner in making that dream a reality. From selecting top universities to helping with scholarship applications and guiding you through the visa process—we're with you every step of the way. Whether it's a business degree in Dubai, engineering in Abu Dhabi, or media studies in Sharjah, we simplify your path to success in the UAE. Take the first step toward your global education journey with Admizz today!",
};

export default async function StudyInUAEFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "uae" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
