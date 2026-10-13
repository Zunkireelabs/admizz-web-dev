import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Australia - Admizz Education",
  description:
    "Study in Australia at top universities with expert guidance, visa support, and scholarship opportunities. Start your global journey today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-australia",
  },
  openGraph: {
    title: "Study in Australia - Admizz Education",
    description:
      "Study in Australia at top universities with expert guidance, visa support, and scholarship opportunities. Start your global journey today!",
    url: "https://admizzeducation.com/study-in-australia",
    siteName: "Admizz Education",
    images: ["/images/og/untitled-design-80.webp"],
    type: "website",
  },
};

const ausData: CountryPageData = {
  countryName: "Australia",
  countryCategorySlug: "australia",
  nepalGuide: {
    href: "/study-in-australia-from-nepal",
    title: "Applying from Nepal? Read the Nepal-specific guide to studying in Australia",
    text: "Costs, the Student visa process, English requirements, intakes and scholarships for Nepali students.",
  },
  heroHeading: "STUDY IN AUSTRALIA",
  heroSubheading: "Shape Your Future at World-Class Australian Education",
  heroDescription: "Australia offers world-class universities, globally recognised degrees, strong post-study work opportunities, and a safe multicultural environment. From university selection and application support to scholarships, visas, and pre-departure guidance, Admizz Education helps you secure admission to top Australian universities with complete confidence.",
  heroBackground: "/images/hero/australia-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Canberra" },
    { label: "Language", value: "English" },
    { label: "Dialing Code", value: "+61" },
    { label: "Currency", value: "Australian Dollar" },
    { label: "Population", value: "26+ Million" },
    { label: "Student visa charge", value: "From AUD 2,500" },
    { label: "Living funds to show", value: "AUD 29,710" },
    { label: "Tuition fee", value: "AUD 28,000" },
  ],
  whyStudyTitle: "Why Study In the Australia?",
  whyStudyIntro:
    "Australia offers world-class universities, globally recognised degrees, strong post-study work opportunities, and a safe multicultural environment, making it a top destination for international students seeking quality education and global career growth.",
  benefits: [
    { title: "Top-Ranked Global Universities", icon: "/images/icons/school-1.webp", description: "Universities consistently rank globally, offering innovative education and exceptional learning experiences." },
    { title: "Highly Recognized International Degree", icon: "/images/icons/exam-1.webp", description: "Australian degrees ensure strong credibility and open diverse international career opportunities." },
    { title: "Strong Post-Study Opportunities", icon: "/images/icons/visa-108.webp", description: "Generous post-study work visas help students gain valuable global industry exposure." },
    { title: "Safe Multicultural Student Environment", icon: "/images/icons/visa-1.webp", description: "Students enjoy inclusive communities, cultural diversity, personal safety, and supportive surroundings." },
    { title: "Industry-Focused Practical Learning", icon: "/images/icons/consultation.webp", description: "Australia offers clean cities, advanced facilities, outdoor lifestyle, and balanced well-being." },
    { title: "High Quality Lifestyle", icon: "/images/icons/accomodation-108.webp", description: "Australia offers clean cities, advanced facilities, outdoor lifestyle, and balanced well-being." },
  ],
  admissionTitle: "Admission Requirements for Studying in Australia",
  admissionIntro:
    "Planning to study in Australia? Understanding the admission requirements is your first step toward joining globally ranked universities and building a rewarding international career.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in Australia",
      intro: "Understanding the admission requirements for studying in Australia helps you prepare a strong and accurate application.",
      documents: ["Academic Records (Transcripts, Certificates)", "IELTS / TOEFL / Duolingo Scores", "Valid Passport", "Visa", "Statement of Purpose (SOP)", "University Application Form", "Letters of Recommendation", "Financial Proof", "Resume/CV"],
    },
    {
      title: "Documents Required for Your Confirmation of Enrolment (CoE)",
      intro: "Preparing the necessary documents for your Confirmation of Enrolment is an essential step for students planning to study in Australia.",
      documents: ["Valid Passport", "Offer Letter from the University", "Academic Transcripts & Certificates", "Proof of Payment for Tuition Deposit", "Financial Proof (Funds to cover tuition & living expenses)", "Passport-size Photographs", "Statement of Purpose (SOP)"],
    },
    {
      title: "Visa Documentation",
      intro: "Preparing the essential visa documentation is crucial for international students planning to study in Australia.",
      documents: ["Valid Passport", "Confirmation of Enrolment (CoE)", "English Proficiency Test Scores (IELTS/PTE/TOEFL)", "Academic Transcripts & Certificates", "Proof of Funds (Tuition, Living, Travel)", "Statement of Purpose (SOP)", "Passport-size photographs", "Completed Visa Application Form (Subclass 500)", "Proof of Visa Application Fee Payment"],
    },
  ],
  intakes: {
    title: "Main Academic Intakes in Australia",
    intro: "Australia offers multiple academic intakes each year, giving international students flexible options to begin their studies.",
    items: [
      { name: "February Intake (Primary / Major Intake)", details: [] },
      { name: "July Intake (Secondary Major Intake)", details: [] },
      { name: "November Intake (Minor Intake, limited programs)", details: [] },
    ],
  },
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
  costTitle: "Cost of Studying in Australia",
  costIntro: "Understanding the cost of studying in Australia helps international students plan their budget effectively.",
  costTable: [
    { program: "Undergraduate Tuition Fees", fee: "AUD 20,000 – AUD 45,000" },
    { program: "Postgraduate Tuition Fees", fee: "AUD 22,000 – AUD 50,000" },
    { program: "MBA / Professional Courses", fee: "AUD 35,000 – AUD 60,000+" },
    { program: "Living Expenses", fee: "AUD 21,000 – AUD 27,000" },
    { program: "Living costs Home Affairs requires you to show (single student, since 10 May 2024)", fee: "AUD 29,710" },
    { program: "Student visa application charge (from 1 July 2026)", fee: "From AUD 2,500" },
    { program: "OSHC (Health Insurance)", fee: "AUD 500 – AUD 800 per year" },
  ],
  costNote: "Total costs vary by city. Sydney and Melbourne are higher; Adelaide and Perth are more affordable.",
  visaTitle: "Australia Student Visa Process",
  visaIntro: "The Australia student visa process is designed to ensure international students meet academic, financial, and health requirements.",
  visaSteps: [
    { title: "Receive Offer Letter", description: "Get official admission confirmation from your chosen Australian university." },
    { title: "Accept Offer & Pay Deposit", description: "Secure your seat by paying the required initial tuition fee." },
    { title: "Obtain Confirmation of Enrolment (CoE)", description: "University issues CoE necessary for lodging your student visa application." },
    { title: "Prepare Required Visa Documents", description: "Collect academic, financial, health, and identification documents before applying." },
    { title: "Create Your ImmiAccount", description: "Register on Australia's immigration portal to start your visa application." },
    { title: "Submit Visa Application (Subclass 500)", description: "Complete online form with accurate details and upload all required documents." },
    { title: "Pay Visa Application Fee", description: "Make the mandatory payment to officially process your visa submission." },
    { title: "Provide Biometrics If Requested", description: "Visit a designated center to complete fingerprinting and photograph requirements." },
    { title: "Complete Medical Examination", description: "Approved panel doctors assess your health for Australian visa eligibility." },
    { title: "Await Visa Outcome", description: "Immigration reviews your application and issues the visa grant decision." },
    { title: "Receive Visa Grant Letter", description: "Your official student visa approval is issued by Australian immigration." },
    { title: "Book Your Flight", description: "Plan travel to Australia before your academic program start date." },
    { title: "Purchase OSHC Insurance", description: "Buy mandatory OSHC health cover required for international student visa." },
    { title: "Travel to Australia", description: "Carry visa documents, CoE, passport, and essential records during travel." },
  ],
  faqItems: [
    { question: "Is Australia a good destination for international students?", answer: "Yes. Australia offers world-ranked universities, practical courses, excellent student support, and strong post-study work opportunities for global students." },
    { question: "What are the minimum requirements to study in Australia?", answer: "Students need academic transcripts, English proficiency scores, Statement of Purpose, passport, financial proof, and university-specific eligibility documents." },
    { question: "How much does it cost to study in Australia?", answer: "Tuition ranges AUD 20,000–50,000 per year; living costs start at AUD 21,000–27,000 annually, depending on city and lifestyle." },
    { question: "What is the English proficiency requirement for Australian universities?", answer: "For tests taken on or after 7 August 2025 the Student visa minimums are IELTS Academic 6.0, PTE Academic 47 and TOEFL iBT 67, with lower scores if your course comes with English study. Most universities ask for IELTS 6.0–6.5 or the PTE or TOEFL equivalent, varying by university and course, so check the course page." },
    { question: "How long does the Australia student visa process take?", answer: "Processing times for the Student visa (subclass 500) change through the year and depend on how complete your application is. Check the current times on the Department of Home Affairs website and apply early." },
    { question: "What are the major intakes for studying in Australia?", answer: "Australia has three intakes: February (major), July (major), and November (limited courses)." },
    { question: "What is the Australia post-study work visa duration?", answer: "The Temporary Graduate visa (subclass 485) is usually granted for 2 to 3 years for bachelor's, master's and doctoral graduates, depending on your qualification. Rules change, so check the Department of Home Affairs website before you plan around it." },
    { question: "How much bank balance is required for an Australian student visa?", answer: "Home Affairs sets the living-cost amount at AUD 29,710 for a single student (since 10 May 2024). You must also show you can pay your tuition fees and travel costs, and the first 12 months of the stay. Since 2 October 2026 most Student visa applicants cannot include family members in their application." },
    { question: "Can international students work while studying in Australia?", answer: "Yes. Students can work 48 hours per fortnight during classes and unlimited hours during breaks." },
    { question: "How can Admizz Education help with studying in Australia?", answer: "Admizz provides personalized university selection, application support, SOP assistance, scholarship guidance, visa documentation, and complete pre-departure services." },
  ],
};

export default async function StudyInAustraliaPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "australia" });
  return <CountryPageTemplate data={ausData} blogPosts={blogPosts} />;
}
