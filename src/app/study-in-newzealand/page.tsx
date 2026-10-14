// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in New Zealand - Admizz Education",
  description:
    "Study in New Zealand with top-ranked universities, expert guidance, visa support, and scholarships. Start your global journey today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-newzealand",
  },
  openGraph: {
    title: "Study in New Zealand - Admizz Education",
    description:
      "Study in New Zealand with top-ranked universities, expert guidance, visa support, and scholarships. Start your global journey today!",
    url: "https://admizzeducation.com/study-in-newzealand",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const nzData: CountryPageData = {
  countryName: "New Zealand",
  countryCategorySlug: "new-zealand",
  nepalGuide: {
    href: "/study-in-newzealand-from-nepal",
    title: "Applying from Nepal? Read the Nepal-specific guide to studying in New Zealand",
    text: "Costs, the student visa process, intakes, test scores and scholarships for Nepali students.",
  },
  heroHeading: "STUDY IN NEW ZEALAND",
  heroSubheading: "Experience High-Quality Education and a Welcoming Lifestyle",
  heroDescription: "Experience high-quality education, innovative learning, and a welcoming lifestyle in New Zealand. Admizz Education supports you with university selection, application guidance, visa processing, and personalised counselling to build a strong international career with confidence.",
  heroBackground: "/images/hero/newzealand-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Wellington" },
    { label: "Language", value: "English" },
    { label: "Dialing Code", value: "+64" },
    { label: "Currency", value: "NZD ($)" },
    { label: "Population", value: "5+ Million" },
    { label: "Student visa fee", value: "From NZD 850" },
    { label: "Living costs to show", value: "NZD 20,000 a year" },
  ],
  whyStudyTitle: "Why Choose New Zealand?",
  whyStudyIntro:
    "New Zealand offers a powerful blend of world-class education, safe living, and industry-focused opportunities. With globally recognised universities, innovative teaching methods, and strong post-study pathways, it has become one of the most trusted destinations for students seeking academic excellence and career growth.",
  benefits: [
    { icon: "/images/icons/school-1.webp", title: "Globally Ranked Universities", description: "Deliver internationally recognised degrees supported by strong research and modern academics." },
    { icon: "/images/icons/accomodation-108.webp", title: "Safe and Friendly Environment", description: "Offer welcoming communities, supportive campuses, and excellent quality of life." },
    { icon: "/images/icons/consultation.webp", title: "Industry-Connected Learning", description: "Provide practical learning experiences aligned with evolving global workforce requirements." },
    { icon: "/images/icons/consultation.webp", title: "Work Opportunities for Students", description: "Eligible students can work up to 25 hours a week in term and full-time in holidays." },
    { icon: "/images/icons/visa-108.webp", title: "Strong Post-Study Pathways", description: "Eligible graduates can apply for a Post-Study Work Visa for up to 3 years, depending on the level of the qualification." },
    { icon: "/images/icons/scholarship-108.webp", title: "Affordable, High-Quality Education", description: "Know your costs early: tuition varies by university and course, and Immigration New Zealand sets a clear living-cost requirement." },
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
      title: "Documents to Confirm Your Place",
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
        "English test scores, if you have them (not mandatory for the visa, but your university sets its own level)",
        "Statement of Purpose (SOP)",
        "Financial proof (tuition + living expenses)",
        "Evidence of living costs, such as bank statements",
        "Online visa application with all supporting documents",
        "Evidence of tuition payment and the visa fee",
        "Passport-size photographs",
        "Chest X-ray or medical certificate and police certificate, where required",
      ],
    },
  ],
  intakes: {
    title: "Academic Intake",
    intro: "New Zealand universities offer multiple intakes throughout the year to accommodate international students. Choosing the right intake ensures timely application, visa processing, and a smooth start to your academic journey.",
    items: [
      { name: "February Intake", details: ["Ideal for most undergraduate and postgraduate courses."] },
      { name: "July Intake", details: ["Secondary intake for selected programs and universities."] },
      { name: "Other start dates", details: ["Some providers also start students in November or at other times of year. Check your course."] },
    ],
  },
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
    { name: "Southern Institute of Technology", logo: "/images/universities/newzealand/southern-institute-of-technology.webp" },
  ],
  costTitle: "Cost of Studying in New Zealand",
  costIntro: "Studying in New Zealand offers world-class education, but understanding the expenses is crucial for international students. Costs vary by university, course, and city.",
  costTable: [
    { program: "Tuition (all levels)", fee: "Varies by university and course" },
    { program: "PhD tuition", fee: "Domestic fee rate at NZ universities" },
    { program: "Living costs to show (tertiary study)", fee: "NZD 20,000 a year" },
    { program: "Student visa application fee", fee: "From NZD 850" },
  ],
  costNote: "Note: Visa amounts are set by Immigration New Zealand and can change. Tuition depends on the course, so check your university's fee page.",
  visaTitle: "Visa Process",
  visaIntro: "Applying for a New Zealand student visa is a critical step for international students. Proper documentation, timely submission, and understanding the process ensure smooth approval and hassle-free travel.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select a New Zealand Qualifications Authority (NZQA) approved institution and program." },
    { title: "Submit Application", description: "Apply directly through the university portal with required academic documents." },
    { title: "Receive Offer Letter", description: "Get conditional or unconditional offer based on your eligibility and academic profile." },
    { title: "Meet Financial Requirements", description: "Show tuition for 1 course or 1 year (whichever is shorter) and NZD 20,000 a year for living costs, and agree to hold travel and health insurance." },
    { title: "Prepare Visa Documents", description: "Collect passport, offer letter, financial proof, any English test scores, and a chest X-ray or police certificate where required." },
    { title: "Apply for Student Visa", description: "Submit your application online with Immigration New Zealand (INZ). Paper applications are no longer accepted. The fee is from NZD 850." },
    { title: "Biometrics Submission", description: "Provide biometrics if Immigration New Zealand asks for them." },
    { title: "Wait for Visa Decision", description: "INZ lists average waits of about 2.5 weeks for universities and 4.5 weeks for polytechnics, but advises students from Nepal to apply at least 3 months before travel." },
    { title: "Receive Visa Approval", description: "Get your student visa approval notice and check the visa conditions carefully." },
    { title: "Travel to New Zealand", description: "Carry all essential documents, including visa approval, offer letter, and insurance details." },
    { title: "Complete Arrival Formalities", description: "Provide documentation at the airport and comply with immigration and health regulations." },
  ],
  faqItems: [
    { question: "Why should I choose New Zealand for higher studies?", answer: "New Zealand offers world-class education, safe campuses, and global career opportunities." },
    { question: "What are the top universities in New Zealand?", answer: "University of Auckland, University of Otago, University of Canterbury, Victoria University of Wellington, Massey University, and University of Waikato." },
    { question: "What is the academic intake in New Zealand?", answer: "Major intakes are in February and July, and some providers also start students in November or at other times." },
    { question: "What are the admission requirements for New Zealand universities?", answer: "You need academic transcripts, a valid passport, and an English level set by your university (often shown by IELTS). Requirements differ by university and course, so check the course page." },
    { question: "How much does it cost to study in New Zealand?", answer: "Tuition varies by university and course. For the visa, Immigration New Zealand requires NZD 20,000 a year for living costs plus tuition for 1 course or 1 year of study, whichever is shorter." },
    { question: "What documents are required for a New Zealand student visa?", answer: "Passport, offer of place, evidence of tuition and living costs, agreement to hold insurance, and a chest X-ray or police certificate where required. English scores are not mandatory for the visa." },
    { question: "How do I apply for a New Zealand student visa?", answer: "Apply online via Immigration New Zealand (INZ), submit documents, and pay the fee (from NZD 850). Paper applications are no longer accepted. Apply at least 3 months before travel." },
    { question: "Can I work while studying in New Zealand?", answer: "Yes. Eligible students can work up to 25 hours a week in term and full-time in holidays. Check your visa conditions." },
  ],
};

export default async function StudyInNewZealandPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "new-zealand" });
  return <CountryPageTemplate data={nzData} blogPosts={blogPosts} />;
}
