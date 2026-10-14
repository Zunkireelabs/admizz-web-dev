// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import { DESTINATION_COMPARE_HEADERS, DESTINATION_COMPARE_ROWS, DESTINATION_COMPARE_SOURCES } from "@/data/destination-compare";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Dubai from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in Dubai from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-dubai-from-nepal",
  },
  openGraph: {
    title: "Study in Dubai from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in Dubai from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-dubai-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/UAE.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "Dubai",
  countryCategorySlug: "dubai",
  heroHeading: "Study in Dubai from Nepal",
  heroSubheading:
    "Planning to study in Dubai from Nepal? Discover globally ranked universities, modern campuses, and diverse career paths. Explore opportunities, apply with ease, and turn your international education dream into reality.",

  introTitle: "The New Hub for Global Education",
  introContent:
    "Dubai hosts international branch campuses from the UK, Australia, India and other countries, many of them in free zones such as Dubai International Academic City and regulated by the Knowledge and Human Development Authority (KHDA). These institutions offer programs in business, engineering, IT, healthcare, and hospitality. This page is about Dubai specifically: branch campuses, free zones, KHDA licensing and Dubai residence permits. For federal universities and other emirates such as Abu Dhabi and Sharjah, see our UAE guide. At Admizz Education, we assist you at every step: university selection, scholarship guidance, English test preparation, application support, visa documentation, and pre-departure counseling.",

  // Last edit of this page in the repo (git). Update when the content is next changed or reviewed.
  dateModified: "2026-10-08",
  guideTabLabel: "Compare",
  guideSections: [
    {
      id: "compare",
      title: "Compare Dubai with Other Study Destinations",
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

  whyStudyTitle: "Why Study in Dubai?",
  benefits: [
    {
      title: "Branch Campuses in One City",
      description:
        "KHDA's directory lists dozens of licensed international higher education providers in Dubai, most of them branch campuses of universities from other countries.",
    },
    {
      title: "Regulated Quality",
      description:
        "KHDA licenses higher education providers in Dubai, rates branch campuses on a star scale, and certifies degrees from licensed universities.",
    },
    {
      title: "Multicultural Experience",
      description:
        "Join an international student community in a multicultural city that encourages cross-cultural friendships and global awareness.",
    },
    {
      title: "Work Opportunities",
      description:
        "Student training and employment permits exist through MOHRE, and many programs include internships. Check what your visa and university allow before you accept any job.",
    },
    {
      title: "Scholarships & Support",
      description:
        "Many universities offer their own scholarships and student support services. Amounts and eligibility are set by each university.",
    },
    {
      title: "Modern Campuses",
      description:
        "Dubai's campuses are built for international programs, with libraries, labs and career support centers. Facilities differ by institution.",
    },
  ],

  visaTitle: "Dubai Student Visa Requirements",
  visaIntro:
    "In Dubai a foreign student gets a residence permit with the licensed university or college acting as host and guarantor. GDRFA Dubai issues the permit.",
  visaRequirements: [
    {
      category: "Valid Passport",
      details: "A copy of your passport is required",
    },
    {
      category: "University Admission",
      details:
        "Enrolment in a university or college that is licensed in the UAE and approved by the Ministry of Education or the competent educational authority in the emirate (in Dubai, KHDA)",
    },
    {
      category: "Visa Application",
      details: "The university, as sponsor and guarantor, normally handles the permit with you",
    },
    {
      category: "Photo",
      details: "A recent colour personal photo with a white background",
    },
    {
      category: "Medical Fitness Test",
      details: "A medical examination approved by the competent authorities; the UAE requires it for applicants aged 18 and above",
    },
    {
      category: "Health Insurance",
      details: "Required for the residence permit application; health insurance is mandatory in Dubai",
    },
    {
      category: "Emirates ID",
      details: "Residence visa holders apply for an Emirates ID from the Federal Authority for Identity, Citizenship, Customs and Port Security (ICP)",
    },
    {
      category: "Residence Permit Fees (GDRFA)",
      details: "AED 200 permit fee, AED 10 Knowledge Dirham, AED 10 Innovation Dirham, AED 500 in-country fee and AED 20 delivery (AED 740 in total). The fee rises by AED 100 a year when the residency is longer than two years",
    },
    {
      category: "Processing Time",
      details: "GDRFA lists 48 hours for the residence permit service itself. Entry permit, medical test and Emirates ID steps add time, so apply early",
    },
    {
      category: "Visa Validity",
      details: "Varies by visa type and sponsor; a sponsored residence visa can be for 1, 2 or 3 years",
    },
    {
      category: "After Your Studies",
      details: "GDRFA lists a 60-day grace period to stay in the country after the permit expires or is cancelled",
    },
  ],
  visaNote:
    "Sources: GDRFA Dubai, Issuing a residency permit to a student; u.ae, Residence visa for studying in the UAE. Fees and rules change, so confirm on the official websites before you apply.",

  intakesTitle: "Dubai Intakes for Nepalese Students",
  intakesIntro: "Each university sets its own intakes and application deadlines.",
  intakes: [
    {
      intake: "Main intake",
      months: "Set by each university",
      details: "Confirm the start date and deadline with the university you apply to.",
    },
    {
      intake: "Second intake",
      months: "Set by each university",
      details: "Not every program starts more than once a year.",
    },
  ],

  testTitle: "English Language & Standardized Test Requirements",
  testIntro: "Minimum English scores differ by university and program, so check the admissions page of each institution.",
  testRequirements: [
    {
      test: "IELTS / TOEFL / PTE",
      score: "Set by each university",
      notes: "Most universities ask for an accepted English test.",
    },
    {
      test: "University Placement Test",
      score: "Varies",
      notes: "Some universities may run their own English assessment.",
    },
    {
      test: "GRE / GMAT",
      score: "As required",
      notes: "Only for programs that ask for them.",
    },
  ],

  costTitle: "Cost of Studying in Dubai from Nepal",
  costIntro:
    "Tuition in Dubai is set by each university and varies widely by program, so ask the university for its current fee schedule. The fees below are the official Dubai residence permit fees.",
  costTables: [
    {
      title: "Dubai Student Residence Permit Fees (GDRFA)",
      rows: [
        { category: "Residence permit", cost: "AED 200" },
        { category: "Knowledge Dirham", cost: "AED 10" },
        { category: "Innovation Dirham", cost: "AED 10" },
        { category: "In-country fee", cost: "AED 500" },
        { category: "Delivery", cost: "AED 20" },
        { category: "Total", cost: "AED 740" },
      ],
    },
  ],
  costNote:
    "Tuition, accommodation, living costs and health insurance premiums depend on the university and your lifestyle. Health insurance is mandatory in Dubai. Ask your university for a written cost estimate before you pay a deposit.",

  scholarshipsTitle: "Scholarships for Nepalese Students",
  scholarshipsIntro:
    "Scholarships in Dubai are offered by individual universities. We do not list amounts here because they change each year.",
  scholarships: [
    {
      name: "University merit scholarships",
      provider: "Each university",
      details: "Ask the admissions office about current awards, criteria and deadlines",
    },
  ],
  scholarshipsNote:
    "Admizz can help you check which scholarships fit your profile and apply on time.",

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
    "In Dubai, your licensed university sponsors your student residence permit and acts as host and guarantor. GDRFA Dubai asks for a passport copy, a recent colour photo, an approved medical exam and health insurance, and lists fees of AED 740 in total (AED 200 permit, AED 10, AED 10, AED 500 in-country and AED 20 delivery) with a stated service time of 48 hours. KHDA licenses Dubai's international higher education providers, most of them branch campuses. Confirm your university and program are licensed before you pay.",
  lastUpdated: "October 2026",
  sources: [
    { label: "GDRFA Dubai: Issuing a residency permit to a student", url: "https://www.gdrfad.gov.ae/en/services/f52024e0-b812-11ed-5210-4cd98f768936" },
    { label: "u.ae: Residence visa for studying in the UAE", url: "https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/residence-visa-for-studying-in-the-uae" },
    { label: "KHDA: Higher education directory and ratings", url: "https://web.khda.gov.ae/en/education-directory/Higher-Education" },
    { label: "u.ae: Higher education regulatory bodies", url: "https://u.ae/en/information-and-services/education/higher-education/Higher-education-regulatory-bodies" },
    { label: "MOHRE: Training and work permit for students", url: "https://www.mohre.gov.ae/en/services/training-and-work-permit-for-students-2022" },
    { label: "Dubai.ae: Health insurance", url: "https://www.dubai.ae/living/healthcare/health-insurance" },
    ...DESTINATION_COMPARE_SOURCES,
  ],
  extraSections: [
    {
      id: "dubai-visa-fees",
      title: "Dubai Student Residence Permit: Documents and Fees",
      intro: "Dubai residency is handled by GDRFA Dubai. The university, college or institute must be licensed to operate in the UAE and approved by the Ministry of Education or the competent authority in the emirate.",
      table: {
        headers: ["Item", "Detail"],
        rows: [
          ["Documents", "Passport copy, recent colour photo with white background, approved medical examination, health insurance, ID receipt"],
          ["Permit fee", "AED 200"],
          ["Knowledge Dirham and Innovation Dirham", "AED 10 each"],
          ["In-country fee", "AED 500"],
          ["Delivery", "AED 20"],
          ["Total", "AED 740 (the fee rises by AED 100 a year when residency is over two years)"],
          ["Stated service time", "48 hours"],
          ["Grace period after the permit ends", "60 days"],
        ],
      },
      note: "Source: GDRFA Dubai, Issuing a residency permit to a student. Amounts change, so confirm on the GDRFA website.",
    },
    {
      id: "dubai-khda-free-zones",
      title: "KHDA, Free Zones and Branch Campuses in Dubai",
      bullets: [
        "KHDA regulates the quality of education in Dubai and certifies higher education degrees from licensed universities in Dubai.",
        "KHDA's directory lists 41 international higher education providers licensed in Dubai, 37 of them international branch campuses.",
        "Institutions in Dubai free zones such as Dubai International Academic City need an Academic Authorisation from KHDA, valid for 12 months, based on approval by KHDA's UQAIB quality process or licensure by the Commission for Academic Accreditation (CAA).",
        "KHDA rates branch campuses on a one to five star scale, developed with QS.",
        "Before you pay, check that your university is on the KHDA directory or the CAA/Ministry of Education licensed list, and that your program is accredited.",
      ],
      note: "Sources: KHDA higher education directory and rating pages; u.ae, Higher education regulatory bodies. Counts change as new campuses open.",
    },
    {
      id: "dubai-money-needed",
      title: "Money to Show for a Dubai Student Visa",
      bullets: [
        "The official GDRFA student residence permit page does not list a fixed bank balance. The documents it lists are the passport copy, photo, medical examination, health insurance and ID receipt.",
        "Your university may ask for proof of fees paid or a financial document as part of its own admission and sponsorship process. Ask it for the exact list in writing.",
        "Plan for tuition, accommodation, living costs and health insurance. All of these depend on your university and lifestyle.",
      ],
      note: "Source: GDRFA Dubai, Issuing a residency permit to a student.",
    },
    {
      id: "dubai-work-rights",
      title: "Working and Staying in Dubai",
      bullets: [
        "During study: MOHRE issues a student training and employment permit. A non-national student needs a valid residence visa, and for training a no-objection certificate from the educational institution is required. The permit runs for three months.",
        "We could not verify a fixed weekly hour limit for international students on official sites. Ask your university and check MOHRE before you start any job.",
        "After study: the UAE Golden Residence (10 years) is open to top graduates who meet GPA, university classification and timing conditions. See our UAE guide for the conditions.",
        "Otherwise, you have a 60-day grace period after your student residence ends.",
      ],
      note: "Sources: MOHRE, Training and work permit for students; GDRFA Dubai, Golden residence permit for top students and graduates.",
    },
  ],

  faqItems: [
    {
      question: "Why should I choose Dubai for higher education?",
      answer:
        "Dubai has dozens of international higher education providers licensed by KHDA, most of them branch campuses of universities from other countries, in a multicultural city. KHDA licenses providers, rates branch campuses and certifies degrees, which gives you an official quality check before you apply.",
    },
    {
      question: "Are degrees from Dubai universities valid internationally?",
      answer:
        "KHDA certifies degrees from licensed universities in Dubai, and the Ministry of Education advises students to register only in accredited institutions and programs. Recognition abroad depends on the university, the program and the country, so check licensing, accreditation and attestation before you pay any fee.",
    },
    {
      question: "What are the major intakes for Dubai universities?",
      answer:
        "Each university sets its own intakes and deadlines, and not every program starts more than once a year. Check the admissions page of your chosen university for exact start dates, and apply early because the student residence permit needs time after your offer.",
    },
    {
      question: "Do I need IELTS or TOEFL to apply to Dubai universities?",
      answer:
        "Most universities ask for an accepted English test, but the minimum score is set by each university and program. Some may run their own English assessment. Check the admissions page of your university for the current score and accepted tests.",
    },
    {
      question: "How much does it cost to study in Dubai from Nepal?",
      answer:
        "Tuition is set by each university and differs by program, so ask for the current fee schedule. The official Dubai student residence permit fees add up to AED 740 (AED 200 permit, AED 10, AED 10, AED 500 in-country and AED 20 delivery), plus health insurance, accommodation and living costs.",
    },
    {
      question: "Are there scholarships available for Nepalese students?",
      answer:
        "Scholarships in Dubai come from individual universities, so amounts and criteria differ and change each year. Ask each admissions office what is open to international students and what deadlines apply. Admizz can help you shortlist awards that fit your profile.",
    },
    {
      question: "Can I work part-time while studying in Dubai?",
      answer:
        "MOHRE issues a student training and employment permit, and a non-national student needs a valid residence visa. A no-objection certificate from the educational institution is required for training. We could not verify a fixed weekly hour limit, so check with your university and MOHRE before working.",
    },
    {
      question: "How is a student visa issued in Dubai?",
      answer:
        "Your licensed university acts as host and guarantor, and GDRFA Dubai issues the student residence permit. It asks for a passport copy, a recent photo, an approved medical examination and health insurance. The listed fees total AED 740 and the stated service time is 48 hours.",
    },
    {
      question: "What is KHDA and why does it matter?",
      answer:
        "KHDA is Dubai's education regulator. It licenses higher education providers, rates branch campuses from one to five stars and certifies degrees from licensed universities in Dubai. Checking your university on KHDA's directory before you apply helps you avoid unlicensed providers.",
    },
    {
      question: "Is health insurance compulsory for students in Dubai?",
      answer:
        "Yes. Health insurance is a requirement for the student residence permit application, and health insurance is mandatory in Dubai under Dubai's health insurance law. Ask your university whether it arranges a policy or requires you to buy one, and check what the policy covers.",
    },
    {
      question: "Can I stay in Dubai after my studies?",
      answer:
        "After your student residence ends you get a 60-day grace period. Top graduates who meet the conditions can apply for the 10-year Golden Residence, which requires a high GPA from a qualifying university and applying within two years of graduating. Other options depend on a job and a work permit.",
    },
    {
      question: "How can Admizz Education help me?",
      answer:
        "Admizz Education provides free guidance on university selection, test prep, scholarships, application filing, visa support, and pre-departure briefings.",
    },
  ],

  relatedLinks: [
    { label: "Study in the UAE from Nepal", href: "/study-in-uae-from-nepal", description: "the UAE-wide guide: Abu Dhabi, Sharjah and public universities" },
    { label: "Study in Dubai", href: "/study-in-dubai", description: "destination overview" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "Visa assistance for study abroad", href: "/visa-assistance-for-study-abroad" },
  ],
  ctaTitle: "Begin Your Journey to Study in Dubai from Nepal",
  ctaContent:
    "Are you a student in Nepal dreaming of studying in a land of innovation, opportunity, and global exposure? Dubai offers international branch campuses, industry-focused programs, and a multicultural learning environment. At Admizz Education, we support Nepalese students throughout the entire Dubai study process — from selecting the right university to scholarship guidance, visa support, and pre-departure preparation. We make your journey easy, personalized, and stress-free. Don't let uncertainty hold you back. Contact us today to book your free Dubai education consultation. Your journey to Dubai begins here — with Admizz.",
};

export default async function StudyInDubaiFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "dubai" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
