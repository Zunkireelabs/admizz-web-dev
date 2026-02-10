import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";

export const metadata: Metadata = {
  title: "Study in New Zealand - Admizz Education",
  description:
    "Study in New Zealand with top-ranked universities, expert guidance, visa support, and scholarships. Start your global journey today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-newzealand/",
  },
  openGraph: {
    title: "Study in New Zealand - Admizz Education",
    description:
      "Study in New Zealand with top-ranked universities, expert guidance, visa support, and scholarships. Start your global journey today!",
    url: "https://admizzeducation.com/study-in-newzealand/",
    siteName: "Admizz Education",
    images: ["/images/og/flag-of-australia.png"],
    type: "website",
  },
};

const nzData: CountryPageData = {
  countryName: "New Zealand",
  heroHeading: "STUDY IN NEWZEALAND",
  heroSubheading:
    "Experience high-quality education, innovative learning, and a welcoming lifestyle in New Zealand. Admizz Education supports you with university selection, application guidance, visa processing, and personalised counselling to build a strong international career with confidence.",
  quickFacts: [
    { label: "Capital", value: "Wellington" },
    { label: "Language", value: "English" },
    { label: "Dialing Code", value: "+64" },
    { label: "Currency", value: "NZD ($)" },
    { label: "Population", value: "5+ Million" },
    { label: "Universities", value: "359" },
    { label: "Intl. Students", value: "485,555" },
    { label: "Tuition fee", value: "NZD 31,000" },
  ],
  whyStudyTitle: "Why Choose New Zealand?",
  whyStudyIntro:
    "New Zealand offers a powerful blend of world-class education, safe living, and industry-focused opportunities. With globally recognised universities, innovative teaching methods, and strong post-study pathways, it has become one of the most trusted destinations for students seeking academic excellence and career growth.",
  benefits: [
    { title: "Globally Ranked Universities", description: "Deliver internationally recognised degrees supported by strong research and modern academics." },
    { title: "Safe and Friendly Environment", description: "Offer welcoming communities, supportive campuses, and excellent quality of life." },
    { title: "Industry-Connected Learning", description: "Provide practical learning experiences aligned with evolving global workforce requirements." },
    { title: "Work Opportunities for Students", description: "Allow flexible part-time work options that support financial stability and learning." },
    { title: "Strong Post-Study Pathways", description: "Enable graduates to secure skilled employment through clear visa opportunities." },
    { title: "Affordable, High-Quality Education", description: "Ensure excellent academic standards at comparatively lower tuition and living costs." },
  ],
  admissionTitle: "Admission Requirement For Studying In New Zealand",
  admissionIntro:
    "New Zealand offers a transparent and student-friendly admission process. Understanding the requirements helps you prepare confidently and increases your chances of securing admission to top universities and institutes. Here's everything you need to begin your study journey.",
  documentSections: [
    {
      title: "Documents Required for Admission",
      intro: "Documents Required for Admission:",
      documents: [
        "Academic Documents (Certificates & Transcripts)",
        "IELTS / TOEFL Score (if applicable)",
        "Copy of a Valid Passport",
        "Statement of Purpose (SOP)",
        "Work Experience Documents (if any)",
        "University Application Form",
        "Financial Proof (bank statements, loan letters, etc.)",
        "Letters of Recommendation (LORs)",
        "A CV / Resume (if possible)",
      ],
    },
    {
      title: "Documents Required for CAS",
      intro: "Prepare your New Zealand study application with essential documents that confirm your academic eligibility, financial capacity, identity proof, and genuine student intent.",
      documents: [
        "Valid Passport",
        "Offer Letter from the University",
        "Academic Certificates & Transcripts",
        "Tuition Fee Payment Receipt (as required by institution)",
        "Financial Evidence (bank statements or sponsor documents)",
        "Confirmation of Enrolment Details (course, duration, fees)",
        "Passport-size Photograph (as per university guidelines)",
      ],
    },
    {
      title: "Visa Documentation",
      intro: "Prepare your New Zealand student visa with complete documentation that verifies your identity, financial readiness, academic background, and genuine intent to study.",
      documents: [
        "Valid passport",
        "Offer Letter from a New Zealand education provider",
        "Academic certificates & transcripts",
        "English proficiency test scores (IELTS/TOEFL/PTE)",
        "Statement of Purpose (SOP)",
        "Financial proof (tuition + living expenses)",
        "Bank statements (latest 6 months)",
        "Completed visa application form",
        "Fee payment receipt (if required)",
        "Passport-size photographs",
      ],
    },
  ],
  intakes: {
    title: "Academic Intake",
    intro: "New Zealand universities offer multiple intakes throughout the year to accommodate international students. Choosing the right intake ensures timely application, visa processing, and a smooth start to your academic journey.",
    items: [
      { name: "February Intake", details: ["Ideal for most undergraduate and postgraduate courses."] },
      { name: "July Intake", details: ["Secondary intake for selected programs and universities."] },
      { name: "November Intake", details: ["Limited courses available, mostly postgraduate programs."] },
    ],
  },
  universities: [],
  costTitle: "Cost of Studying in New Zealand",
  costIntro: "Studying in New Zealand offers world-class education, but understanding the expenses is crucial for international students. Costs vary by university, course, and city.",
  costTable: [
    { program: "Undergraduate", fee: "NZD 22,000 – 32,000" },
    { program: "Postgraduate", fee: "NZD 24,000 – 35,000" },
    { program: "Professional / MBA", fee: "NZD 30,000 – 45,000+" },
    { program: "Living Expenses", fee: "NZD 15,000 – 18,000" },
    { program: "Health Insurance", fee: "NZD 600 – 800" },
  ],
  costNote: "Note: Costs vary by city and lifestyle. Auckland is generally higher; smaller cities are more budget-friendly.",
  visaTitle: "Visa Process",
  visaIntro: "Applying for a New Zealand student visa is a critical step for international students. Proper documentation, timely submission, and understanding the process ensure smooth approval and hassle-free travel.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select a New Zealand Qualifications Authority (NZQA) approved institution and program." },
    { title: "Submit Application", description: "Apply directly through the university portal with required academic documents." },
    { title: "Receive Offer Letter", description: "Get conditional or unconditional offer based on your eligibility and academic profile." },
    { title: "Meet Financial Requirements", description: "Maintain sufficient funds for tuition fees, living costs, and insurance." },
    { title: "Prepare Visa Documents", description: "Collect passport, offer letter, financial proof, English proficiency scores, and health insurance." },
    { title: "Apply for Student Visa", description: "Submit your online visa application through Immigration New Zealand (INZ) portal and pay applicable fees." },
    { title: "Biometrics Submission", description: "Provide fingerprints and photo at a visa application centre if required." },
    { title: "Wait for Visa Decision", description: "Visa processing typically takes 2–6 weeks depending on your application and documents." },
    { title: "Receive Visa Approval", description: "Get your student visa approval notice and check the visa conditions carefully." },
    { title: "Travel to New Zealand", description: "Carry all essential documents, including visa approval, offer letter, and insurance details." },
    { title: "Complete Arrival Formalities", description: "Provide documentation at the airport and comply with immigration and health regulations." },
  ],
  faqItems: [
    { question: "Why should I choose New Zealand for higher studies?", answer: "New Zealand offers world-class education, safe campuses, and global career opportunities." },
    { question: "What are the top universities in New Zealand?", answer: "University of Auckland, University of Otago, University of Canterbury, Victoria University of Wellington, Massey University, and University of Waikato." },
    { question: "What is the academic intake in New Zealand?", answer: "Major intakes are in February and July, with some courses available in November." },
    { question: "What are the admission requirements for New Zealand universities?", answer: "You need academic transcripts, English proficiency (IELTS/TOEFL), a valid passport, and SOP." },
    { question: "How much does it cost to study in New Zealand?", answer: "Tuition ranges from NZD 22,000–35,000 per year, living costs NZD 15,000–18,000 annually." },
    { question: "What documents are required for a New Zealand student visa?", answer: "Passport, offer letter, financial proof, health insurance, academic certificates, SOP, and English scores." },
    { question: "How do I apply for a New Zealand student visa?", answer: "Apply online via Immigration New Zealand (INZ), submit documents, pay fees, and provide biometrics if required." },
    { question: "Can I work while studying in New Zealand?", answer: "Yes, international students can work up to 20 hours per week during semesters and full-time during vacations." },
  ],
};

export default function StudyInNewZealandPage() {
  return <CountryPageTemplate data={nzData} />;
}
