// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in UAE - Admizz Education",
  description:
    "Study in UAE with top universities, modern campuses, expert guidance, and visa support. Start your global education journey today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-dubai",
  },
  openGraph: {
    title: "Study in UAE - Admizz Education",
    description:
      "Study in UAE with top universities, modern campuses, expert guidance, and visa support. Start your global education journey today!",
    url: "https://admizzeducation.com/study-in-dubai",
    siteName: "Admizz Education",
    images: ["/images/og/UAE.webp"],
    type: "website",
  },
};

const dubaiData: CountryPageData = {
  countryName: "UAE",
  countryCategorySlug: "uae",
  nepalGuide: {
    href: "/study-in-dubai-from-nepal",
    title: "Applying from Nepal? Read the Nepal-specific guide to studying in Dubai",
    text: "Costs, the student visa process, intakes, test scores and scholarships for Nepali students.",
  },
  heroHeading: "Study in UAE",
  heroSubheading: "Explore World-Class Education in a Dynamic Global Hub",
  heroDescription: "Study in UAE and explore world-class universities, industry-driven programs, and a dynamic international lifestyle. Admizz Education assists with course selection, admissions, documentation, and visa guidance — ensuring a seamless, well-supported journey toward top-quality education and global career opportunities in the UAE.",
  heroBackground: "/images/hero/dubai-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Abu Dhabi" },
    { label: "Language", value: "Arabic" },
    { label: "Dialing Code", value: "+971" },
    { label: "Currency", value: "UAE Dirham" },
    { label: "KHDA-licensed providers (Dubai)", value: "41" },
    { label: "Branch campuses (Dubai)", value: "37" },
    { label: "Visa sponsor", value: "Your university" },
    { label: "Health insurance", value: "Required" },
  ],
  whyStudyTitle: "Why Study In UAE?",
  whyStudyIntro:
    "Study in UAE offers international students world-class universities, globally recognized degrees, safe living, cultural diversity, and excellent career opportunities. Experience quality education in one of the fastest-growing global education hubs.",
  benefits: [
    { title: "World-Class Universities", icon: "/images/icons/school-1.webp", description: "The UAE hosts federal universities and international branch campuses. The CAA licenses institutions and accredits programs, and KHDA regulates higher education in Dubai." },
    { title: "Tuition & Scholarships", icon: "/images/icons/scholarship-108.webp", description: "Tuition is set by each university, and some institutions offer scholarships. Ask each admissions office for current fees and awards." },
    { title: "High Employability & Internships", icon: "/images/icons/consultation.webp", description: "Many programs include internships. After graduation, top graduates who meet the conditions can apply for the 10-year Golden Residence." },
    { title: "Cultural Diversity & Global Exposure", icon: "/images/icons/visa-1.webp", description: "The UAE offers international students a multicultural environment with global networking opportunities." },
    { title: "University-Sponsored Student Visa", icon: "/images/icons/visa-108.webp", description: "Your accredited university sponsors your student residence visa, and MOHRE offers a student training and employment permit." },
    { title: "Safe & Modern Environment", icon: "/images/icons/accomodation-108.webp", description: "The UAE is known for modern infrastructure and a multicultural, student-friendly environment." },
  ],
  admissionTitle: "Admission Requirements for Studying in UAE",
  admissionIntro:
    "UAE admission requirements ensure quality education. International students must meet academic eligibility, English proficiency, valid documents, and financial proof to secure admission to top universities and pursue globally recognized degree programs.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in UAE",
      intro: "To study in UAE, international students must submit essential admission documents, including academic records, passport copies, language certificates, financial proof, and university-specific forms to secure a smooth application and visa process.",
      documents: [
        "Valid Passport (Front & Back Copy)",
        "Passport-sized Photographs",
        "Academic Transcripts & Certificates",
        "English Proficiency Test Scores",
        "University Application Form",
        "Statement of Purpose (SOP)",
        "Letters of Recommendation (LORs)",
        "Updated CV / Resume",
        "Proof of Financial Support",
      ],
    },
    {
      title: "Documents to Confirm Your Place",
      intro: "Universities usually ask you to confirm your offer before they start your visa. Exact requirements differ, so follow your university's offer letter.",
      documents: [
        "Valid Passport Copy",
        "Offer Letter / Conditional Offer Letter",
        "Academic Documents",
        "English Proficiency Test Results",
        "Payment Receipt for Fees, if your university asks for a deposit",
        "Passport-size Photographs",
        "Completed University Enrollment Form",
      ],
    },
    {
      title: "Visa Documentation",
      intro: "GDRFA Dubai lists a passport copy, a recent colour photo, an approved medical examination, health insurance and an ID receipt for the student residence permit. The university also issues a certificate stating the duration of study.",
      documents: [
        "Valid Passport Copy",
        "Recent Colour Photo (white background)",
        "Study Certificate / Admission Letter from University",
        "Medical Fitness Test (applicants aged 18 and above)",
        "Health Insurance",
        "Emirates ID Application",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in UAE",
    intro: "Each university sets its own intakes and deadlines. Check your university's admissions page for exact start dates.",
    items: [
      { name: "Main intake – set by each university", details: [] },
      { name: "Second intake – set by each university, not available for every program", details: [] },
    ],
  },
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
  costTitle: "Cost of Studying in UAE",
  costIntro: "Understanding the cost of studying in UAE helps international students plan their budget effectively.",
  costTable: [
    { program: "Tuition (all levels)", fee: "Set by each university; ask for the current fee schedule" },
    { program: "Zayed University, international students without UAE national ID", fee: "AED 2,500 per credit hour" },
    { program: "Dubai student residence permit (GDRFA)", fee: "AED 740 in total" },
    { program: "Health Insurance", fee: "Required; premium depends on the policy" },
    { program: "Living Expenses", fee: "Depends on the emirate, accommodation and lifestyle" },
  ],
  costNote: "Tuition and living costs vary widely by university and emirate. Ask your university for a written estimate before paying a deposit. Fees were checked against official sources in October 2026.",
  visaTitle: "UAE Student Visa Process",
  visaIntro: "The UAE student visa is a residence visa sponsored by your accredited university or college. It involves admission, documents, a medical test, health insurance and an Emirates ID.",
  visaSteps: [
    { title: "Receive Admission Offer", description: "Secure an offer letter from a licensed UAE university or college." },
    { title: "Submit Required Documents", description: "Prepare your passport, photo, academic records and any documents your university asks for." },
    { title: "University Sponsors Your Visa", description: "The university acts as host and guarantor and provides a certificate stating the duration of your study." },
    { title: "Medical Fitness Test", description: "Applicants aged 18 and above take the approved medical examination." },
    { title: "Arrange Health Insurance", description: "Valid health insurance is required for the residence permit." },
    { title: "Apply for Emirates ID", description: "Residence visa holders apply for an Emirates ID from ICP and pass a security check." },
    { title: "Receive Student Residence Visa", description: "Validity varies by visa type and sponsor; a sponsored visa can be for 1, 2 or 3 years." },
    { title: "Start Your Studies", description: "Begin classes at your chosen UAE institution." },
  ],
  faqItems: [
    { question: "Is UAE good for students?", answer: "The UAE offers federal universities, international branch campuses and a multicultural living environment. Higher education is licensed and accredited through the CAA at national level, with KHDA regulating Dubai. Check that both your university and your program are accredited before you apply." },
    { question: "What are the admission requirements for studying in UAE?", answer: "International students typically need a valid passport, academic transcripts, English proficiency scores, and often a statement of purpose and recommendation letters. Requirements are set by each university and program, so follow your chosen university's admissions page." },
    { question: "What are the major intakes in UAE universities?", answer: "Each university sets its own intakes and deadlines, and not every program starts more than once a year. Check your university's admissions page for exact start dates." },
    { question: "What is the cost of studying in UAE?", answer: "Tuition is set by each university. For example, Zayed University charges international students without a UAE national ID AED 2,500 per credit hour. The Dubai student residence permit fees total AED 740, and health insurance, accommodation and living costs are extra." },
    { question: "Do I need IELTS to study in UAE?", answer: "Most universities require proof of English, and the score is set by each one. Zayed University, for example, lists EmSAT English 1250, IELTS 5.5 or TOEFL iBT 71 for international undergraduates. Check your university's current requirement." },
    { question: "How long does the UAE student visa take?", answer: "It depends on the emirate and university. In Dubai, GDRFA lists 48 hours for the residence permit service itself, but the entry permit, medical test and Emirates ID steps add time, so apply early." },
    { question: "Can international students work while studying in UAE?", answer: "MOHRE issues a student training and employment permit. Non-national students need a valid residence visa, training needs a no-objection certificate from the institution, and the permit runs for three months. We could not verify a weekly hour limit, so confirm with your university and MOHRE." },
    { question: "Are there scholarships available for international students in UAE?", answer: "Some institutions offer scholarships. Khalifa University states that it awards full scholarships to all admitted postgraduate students. Check each university for current awards, criteria and deadlines." },
    { question: "Is UAE safe for international students?", answer: "The UAE is widely regarded as a safe country for residents and students. Check your university's student services for housing and safety guidance." },
    { question: "Can I stay in UAE after completing my studies?", answer: "After your student residence ends, Dubai's GDRFA lists a 60-day grace period. Top graduates who meet GPA, university classification and timing conditions can apply for the 10-year Golden Residence. Otherwise you need a job and a work permit." },
  ],
};

export default async function StudyInDubaiPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "uae" });
  return <CountryPageTemplate data={dubaiData} blogPosts={blogPosts} />;
}
