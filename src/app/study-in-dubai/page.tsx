import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";

export const metadata: Metadata = {
  title: "Study in Dubai - Admizz Education",
  description:
    "Study in Dubai with top universities, modern campuses, expert guidance, and visa support. Start your global education journey today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-dubai/",
  },
  openGraph: {
    title: "Study in Dubai - Admizz Education",
    description:
      "Study in Dubai with top universities, modern campuses, expert guidance, and visa support. Start your global education journey today!",
    url: "https://admizzeducation.com/study-in-dubai/",
    siteName: "Admizz Education",
    images: ["/images/og/flag-of-australia.png"],
    type: "website",
  },
};

const dubaiData: CountryPageData = {
  countryName: "Dubai",
  heroHeading: "Study in Dubai",
  heroSubheading: "Study in Dubai and explore world-class universities, industry-driven programs, and a dynamic international lifestyle. Admizz Education assists with course selection, admissions, documentation, and visa guidance—ensuring a seamless, well-supported journey toward top-quality education and global career opportunities in Dubai.",
  quickFacts: [
    { label: "Capital", value: "Abu Dhabi" },
    { label: "Language", value: "Arabic" },
    { label: "Dialing Code", value: "+971" },
    { label: "Currency", value: "UAE Dirham" },
    { label: "Population", value: "3.6+ Million" },
    { label: "Universities", value: "359" },
    { label: "Intl. Students", value: "485,555" },
    { label: "Tuition fee", value: "AED 40,000" },
  ],
  whyStudyTitle: "Why Study In Dubai?",
  whyStudyIntro:
    "Study in Dubai offers international students world-class universities, globally recognized degrees, safe living, cultural diversity, and excellent career opportunities. Experience quality education in one of the fastest-growing global education hubs.",
  benefits: [
    { title: "World-Class Universities", description: "Dubai hosts top-ranked global universities offering internationally accredited degrees in engineering, business, IT, design, and healthcare." },
    { title: "Affordable Tuition & Scholarships", description: "International students can access competitive tuition fees, flexible payment plans, and multiple scholarship opportunities for merit and need-based applicants." },
    { title: "High Employability & Internships", description: "With a booming job market in finance, technology, logistics, hospitality, and engineering, Dubai offers strong internship and post-study work opportunities." },
    { title: "Cultural Diversity & Global Exposure", description: "Over 200 nationalities live in Dubai, offering international students a vibrant, multicultural environment with global networking opportunities." },
    { title: "Easy Student Visa & Pathway to Career", description: "Dubai provides a streamlined student visa process and options for work permits, making it easy to study, work, and build a career in the UAE." },
    { title: "Safe & Modern Environment", description: "Dubai is known for world-class infrastructure, strict safety standards, and a student-friendly environment ideal for focused academic growth." },
  ],
  admissionTitle: "Admission Requirements for Studying in Dubai",
  admissionIntro:
    "Dubai's admission requirements ensure quality education. International students must meet academic eligibility, English proficiency, valid documents, and financial proof to secure admission to top universities and pursue globally recognized degree programs.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in Dubai",
      intro: "To study in Dubai, international students must submit essential admission documents, including academic records, passport copies, language certificates, financial proof, and university-specific forms to secure a smooth application and visa process.",
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
      title: "Documents Required for CAS",
      intro: "CAS for Dubai requires essential documents including passport, academic records, English proficiency, financial proof, and fee payment to confirm university admission.",
      documents: [
        "Valid Passport Copy",
        "Offer Letter / Conditional Offer Letter",
        "Academic Documents",
        "English Proficiency Test Results",
        "Payment Receipt for Tuition Fee / CAS Deposit",
        "Passport-size Photographs",
        "Completed University Enrollment Form",
      ],
    },
    {
      title: "Visa Documentation",
      intro: "Dubai student visa requires essential documentation, including passport copies, admission letter, financial proof, medical records, and photographs to ensure smooth visa processing for international students.",
      documents: [
        "Valid Passport Copy",
        "Passport-Size Photographs",
        "Offer Letter / Admission Letter from University",
        "Completed Visa Application Form",
        "Proof of Tuition Fee Payment",
        "Academic Certificates & Transcripts",
        "Financial Proof",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in Dubai",
    intro: "Dubai universities follow multiple academic intakes to accommodate international students, offering flexible admission windows throughout the year.",
    items: [
      { name: "Fall Intake (September) – Major Intake", details: [] },
      { name: "Spring Intake (January) – Secondary Intake", details: [] },
      { name: "Summer Intake (May/June) – Limited Intake", details: [] },
      { name: "Rolling Intakes (Year-Round)", details: [] },
    ],
  },
  universities: [],
  costTitle: "Cost of Studying in Dubai",
  costIntro: "Understanding the cost of studying in Dubai helps international students plan their budget effectively.",
  costTable: [
    { program: "Undergraduate", fee: "AED 40,000 – AED 70,000" },
    { program: "Postgraduate", fee: "AED 45,000 – AED 90,000" },
    { program: "MBA / Professional Programs", fee: "AED 60,000 – AED 120,000+" },
    { program: "Living Expenses", fee: "AED 30,000 – AED 50,000 per year" },
    { program: "Health Insurance", fee: "AED 2,000 – AED 4,000 per year" },
  ],
  costNote: "Costs vary by university and lifestyle. Living and tuition expenses may differ based on location and accommodation choices.",
  visaTitle: "Dubai Student Visa Process",
  visaIntro: "The Dubai student visa process is simple and efficient, requiring university admission, essential documents, medical testing, and residency approval.",
  visaSteps: [
    { title: "Receive Admission Offer", description: "Secure an offer letter from a Dubai university or college." },
    { title: "Submit Required Documents", description: "Prepare passport, photos, academic records, financial proof, and other required documents." },
    { title: "University Applies for Entry Permit", description: "Your university submits the student visa entry permit application." },
    { title: "Receive Entry Permit", description: "Entry visa (e-Visa) is issued, allowing you to travel to Dubai." },
    { title: "Travel to Dubai", description: "Arrive in Dubai to complete medical and visa stamping procedures." },
    { title: "Complete Medical Fitness Test", description: "Undergo mandatory medical tests including X-ray and blood test." },
    { title: "Apply for Emirates ID", description: "Visit an EID center for biometrics (fingerprints & photo)." },
    { title: "Visa Stamping Process", description: "Your passport is submitted for residency stamping." },
    { title: "Receive UAE Student Residency Visa", description: "Student visa issued for 1 year (renewable through the university)." },
    { title: "Start Your Studies", description: "Begin classes at your chosen Dubai institution." },
  ],
  faqItems: [
    { question: "Is Dubai good for students?", answer: "Yes, Dubai is an excellent destination for students. It offers world-class universities, globally recognized degrees, a safe and modern living environment, cultural diversity, and strong career opportunities across industries like finance, technology, hospitality, and engineering." },
    { question: "What are the admission requirements for studying in Dubai?", answer: "International students need a valid passport, academic transcripts, English proficiency test scores (IELTS/TOEFL), a statement of purpose, letters of recommendation, and proof of financial support. Specific requirements may vary by university and program." },
    { question: "What are the major intakes in Dubai universities?", answer: "Dubai universities offer three main intakes: Fall Intake (September) which is the major intake, Spring Intake (January) as the secondary intake, and Summer Intake (May/June) with limited programs. Some universities also offer rolling admissions throughout the year." },
    { question: "What is the cost of studying in Dubai?", answer: "Undergraduate programs typically cost AED 40,000 – AED 70,000, postgraduate programs range from AED 45,000 – AED 90,000, and MBA or professional programs can cost AED 60,000 – AED 120,000+. Living expenses are approximately AED 30,000 – AED 50,000 per year." },
    { question: "Do I need IELTS to study in Dubai?", answer: "Most universities in Dubai require English proficiency test scores such as IELTS or TOEFL for admission. However, some institutions may offer conditional admission or accept alternative English proficiency evidence depending on the student's academic background." },
    { question: "How long does the Dubai student visa take?", answer: "The Dubai student visa process typically takes 2 to 4 weeks once all required documents are submitted. The timeline includes entry permit issuance, medical fitness testing, Emirates ID registration, and residency visa stamping." },
    { question: "Can international students work while studying in Dubai?", answer: "Yes, international students in Dubai can work part-time with proper authorization. Many universities and free zones offer internship and work opportunities that help students gain industry experience while completing their studies." },
    { question: "Are there scholarships available for international students in Dubai?", answer: "Yes, many Dubai universities offer scholarships for international students based on academic merit, financial need, and specific program criteria. Students are encouraged to check directly with their chosen university for available scholarship opportunities and deadlines." },
    { question: "Is Dubai safe for international students?", answer: "Dubai is one of the safest cities in the world, with strict law enforcement, modern infrastructure, and a welcoming multicultural environment. International students enjoy a secure and student-friendly atmosphere ideal for focused academic growth." },
    { question: "Can I stay in Dubai after completing my studies?", answer: "Yes, graduates from Dubai universities may apply for work permits and residency visas to continue living and working in the UAE. Dubai offers post-study work opportunities and career pathways across various industries for qualified graduates." },
  ],
};

export default function StudyInDubaiPage() {
  return <CountryPageTemplate data={dubaiData} />;
}
