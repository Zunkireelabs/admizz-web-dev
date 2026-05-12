import type { Metadata } from "next";
import CountryPageTemplate from "@/components/ui/CountryPageTemplate";
import type { CountryPageData } from "@/components/ui/CountryPageTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in the USA - Admizz Education",
  description:
    "Study in the USA at top universities with expert guidance, visa assistance, and scholarships. Start your American dream today!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-the-usa",
  },
  openGraph: {
    title: "Study in the USA - Admizz Education",
    description:
      "Study in the USA at top universities with expert guidance, visa assistance, and scholarships. Start your American dream today!",
    url: "https://admizzeducation.com/study-in-the-usa",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

const usaData: CountryPageData = {
  countryName: "the USA",
  countryCategorySlug: "usa",
  heroHeading: "STUDY IN THE USA",
  heroSubheading: "Shape Your Global Future With World-Class US Education",
  heroDescription: "Kick-start your study abroad journey with Admizz Education, your trusted partner for studying in the USA. From university selection and application support to scholarships, visas, and pre-departure guidance, we help you secure admission to top US universities with complete confidence and clarity.",
  heroBackground: "/images/hero/usa-hero.webp",
  quickFacts: [
    { label: "Capital", value: "Washington" },
    { label: "Language", value: "English" },
    { label: "Dialing Code", value: "+1" },
    { label: "Currency", value: "US Dollar ($)" },
    { label: "Population", value: "330+" },
    { label: "Universities", value: "359" },
    { label: "Intl. Students", value: "485,555" },
    { label: "Tuition fee", value: "$20,000/yr" },
  ],
  whyStudyTitle: "Why Study in the USA?",
  whyStudyIntro:
    "The United States is one of the world's most preferred study destinations, offering globally recognized degrees, cutting-edge research, flexible learning options, and exceptional career opportunities. Whether you're pursuing STEM, business, healthcare, or arts, studying in the USA empowers you with skills, exposure, and a future-ready global edge.",
  benefits: [
    { title: "World-Class Universities", description: "The USA hosts globally top-ranked universities known for academic excellence, modern classrooms, advanced labs, and innovation.", icon: "/images/icons/school-1.webp" },
    { title: "Flexible Learning System", description: "American universities allow customised course combinations, helping students explore interests and switch majors easily if needed.", icon: "/images/icons/knowledge.webp" },
    { title: "Global Career Opportunities", description: "Students benefit from strong industry connections, internships, OPT, and CPT programs supporting excellent international career growth.", icon: "/images/icons/consultation.webp" },
    { title: "Cutting-Edge Research Environment", description: "The USA leads innovation with advanced research facilities, funded projects, and opportunities to work alongside global experts.", icon: "/images/icons/exam-1.webp" },
    { title: "Highly Diverse & Inclusive Culture", description: "Students enjoy a multicultural environment promoting broad perspectives, personal growth, global friendships, and supportive campus communities.", icon: "/images/icons/visa-1.webp" },
    { title: "Strong Post-Study Prospects", description: "Graduates from U.S. universities gain worldwide recognition, improving employability across international markets and long-term career pathways.", icon: "/images/icons/accomodation-108.webp" },
  ],
  admissionTitle: "Admission Requirements for Studying in the USA",
  admissionIntro:
    "Gaining admission to a U.S. university involves meeting academic standards, submitting essential documents, and presenting a strong overall profile. To help you navigate the process smoothly, here are the key admission requirements every international student must fulfill.",
  documentSections: [
    {
      title: "Admission Requirements for Studying in the USA",
      intro: "Planning to study in the USA? Understanding the essential admission requirements helps you prepare confidently. From academic records and test scores to financial proof, ensure every document is ready for a smooth application process.",
      documents: [
        "Academic Records (Transcripts & Certificates)",
        "TOEFL/IELTS/Duolingo Scores",
        "Valid Passport",
        "SOP (Statement of Purpose)",
        "University Application Form",
        "Letters of Recommendation",
        "Financial Proof (for I-20 issuance)",
        "Resume/CV",
      ],
    },
    {
      title: "Documents Required for I-20",
      intro: "To receive your I-20 from a US institution, you must submit essential academic, identity, and financial documents. These records help universities verify your eligibility and issue the form required for your student visa.",
      documents: [
        "Passport (valid for the course duration)",
        "Academic Transcripts & Certificates",
        "English Proficiency Scores (TOEFL/IELTS/Duolingo)",
        "Admission Offer Letter",
        "Financial Proof (bank statements or loan sanction letter)",
        "Passport-size Photographs",
        "Proof of Application Fee Payment",
        "Completed University I-20 Request Form",
      ],
    },
    {
      title: "Visa Documentation for the USA (F-1 Student Visa)",
      intro: "For a successful US student visa application, students must prepare complete and accurate documents. These help verify your identity, financial readiness, and genuine student intent for pursuing full-time education in the USA.",
      documents: [
        "Valid passport",
        "Form I-20 (From University)",
        "DS-160 Confirmation Page",
        "Visa Appointment Confirmation",
        "Academic Transcripts",
        "English Proficiency Scores",
        "Financial Proof (Bank Statements/Loan Letter)",
        "Passport-Sized Photos",
        "SOP/Study Plan (if asked)",
      ],
    },
  ],
  intakes: {
    title: "Academic Intakes in the USA",
    intro: "US universities offer multiple academic intakes, giving students flexible entry options throughout the year. Understanding these admission cycles helps you plan applications, deadlines, test preparation, and visa timelines effectively.",
    items: [
      { name: "Fall Intake (August/September)", details: ["Primary and most popular intake"] },
      { name: "Spring Intake (January)", details: ["Suitable for students who miss Fall deadlines."] },
      { name: "Summer Intake (May/June)", details: ["Limited programs but ideal for short courses"] },
    ],
  },
  universities: [
    { name: "Colorado State University", logo: "/images/universities/usa/COLORADO.webp" },
    { name: "Webster University", logo: "/images/universities/usa/webster-1.webp" },
    { name: "Avila University", logo: "/images/universities/usa/AVILA.webp" },
    { name: "Concordia University", logo: "/images/universities/usa/CONCORDIA.webp" },
    { name: "Southeast Missouri State", logo: "/images/universities/usa/SOUTHEAST-MISSOURI.webp" },
    { name: "Herzing University", logo: "/images/universities/usa/HERZING.webp" },
    { name: "Wright State University", logo: "/images/universities/usa/WRIGHT-STATE.webp" },
    { name: "Washington University", logo: "/images/universities/usa/WASHINGTON.webp" },
    { name: "Texas State University", logo: "/images/universities/usa/TEXAS.webp" },
    { name: "Murray State University", logo: "/images/universities/usa/MURRAY.webp" },
    { name: "Youngstown State University", logo: "/images/universities/usa/YOUNGSTOWN.webp" },
    { name: "University of Central Arkansas", logo: "/images/universities/usa/CENTRAL-ARKANSAS.webp" },
    { name: "Dakota State University", logo: "/images/universities/usa/DAKOTA-STATE.webp" },
    { name: "University of South Dakota", logo: "/images/universities/usa/UNIVERSITY-F-SOUTH-DAKOTA.webp" },
    { name: "Pacific Oaks College", logo: "/images/universities/usa/PACIFIC.webp" },
    { name: "Bethesda University", logo: "/images/universities/usa/BETHESDA.webp" },
    { name: "St. Cloud State University", logo: "/images/universities/usa/ST-CLOUD.webp" },
    { name: "South Dakota State University", logo: "/images/universities/usa/South.webp" },
    { name: "Post University", logo: "/images/universities/usa/POST.webp" },
    { name: "Northwest Missouri State", logo: "/images/universities/usa/NORTHWEST.webp" },
    { name: "University of Central Missouri", logo: "/images/universities/usa/university-f.webp" },
    { name: "Minnesota State University", logo: "/images/universities/usa/MINNESOTA-STATE.webp" },
  ],
  costTitle: "Cost of Studying in the USA",
  costIntro: "Here's a rough idea of the yearly expenses for International students:",
  costTable: [
    { program: "Undergraduate", fee: "$15,000 – $35,000" },
    { program: "Postgraduate", fee: "$20,000 – $40,000" },
    { program: "MBA/Professional", fee: "$30,000 – $60,000+" },
    { program: "Living Costs", fee: "$10,000 – $15,000" },
    { program: "Health Insurance", fee: "$500 – $1,500" },
  ],
  costNote: "Living expenses vary by state — cities like New York are costlier than smaller towns.",
  visaTitle: "Visa Process for the USA (F1 Visa)",
  visaIntro: "Understanding the USA student visa process is essential for a smooth study abroad journey. From gathering key documents and receiving your I-20 to completing biometrics and attending the visa interview, each step must be followed carefully to ensure timely approval and stress-free travel.",
  visaSteps: [
    { title: "Choose Course & University", description: "Select your preferred US university and program based on eligibility and goals." },
    { title: "Submit Application", description: "Apply through university portals with academic records, SOP, resume, and test scores." },
    { title: "Receive Offer Letter", description: "Get conditional or unconditional admission based on your academic profile." },
    { title: "Submit Financial Proof", description: "Provide bank statements or sponsor letters to meet university financial requirements." },
    { title: "Receive Form I-20", description: "Your university issues the I-20 after financial and academic verification." },
    { title: "Pay SEVIS Fee", description: "Complete the SEVIS I-901 fee payment to activate your student record." },
    { title: "Fill DS-160 Form", description: "Submit the online non-immigrant visa application and save the confirmation page." },
    { title: "Book Visa Appointment", description: "Schedule OFC (biometrics) and US Embassy visa interview dates." },
    { title: "Attend Biometrics", description: "Visit the VAC centre to submit fingerprints and photograph." },
    { title: "Attend Visa Interview", description: "Appear for the F1 visa interview with I-20, financial proof, and academic documents." },
    { title: "Wait for Decision", description: "Most F1 visa decisions are made immediately after the interview." },
    { title: "Collect Passport", description: "Receive your passport with F1 visa stamp from the VAC or courier." },
    { title: "Prepare for Travel", description: "Book tickets, arrange accommodation, and carry essential documents." },
    { title: "Travel to the USA", description: "Arrive in the US up to 30 days before your program start date." },
  ],
  faqItems: [
    { question: "Why should international students choose to study in the USA?", answer: "The USA offers world-class universities, cutting-edge research, flexible programs, and global career opportunities, making it a top choice for students worldwide." },
    { question: "What is the cost of studying in the USA?", answer: "Tuition typically ranges from $15,000 to $50,000 per year, depending on the university and program." },
    { question: "Do I need IELTS or TOEFL to study in the USA?", answer: "Most universities require English proficiency tests like IELTS, TOEFL, or Duolingo, although some offer waivers." },
    { question: "What is the I-20 form and why is it important?", answer: "The I-20 is issued by your university and is required for the F-1 visa application and SEVIS activation." },
    { question: "Can students work part-time while studying in the USA?", answer: "Yes, international students can work up to 20 hours per week on-campus during semesters." },
    { question: "What are OPT and CPT?", answer: "OPT allows students to work after graduation, while CPT is work authorization during studies." },
    { question: "How long does it take to get a US student visa?", answer: "Visa processing usually takes a few days to a few weeks, depending on consulate workload." },
    { question: "What are the major intakes in US universities?", answer: "Fall (August), Spring (January), and Summer (May)." },
    { question: "Can I take dependents with me on an F-1 visa?", answer: "Yes, dependents can travel on an F-2 visa." },
    { question: "How early should I start my USA university application?", answer: "Start at least 10–12 months in advance for the best chances of admission and scholarships." },
  ],
};

export default async function StudyInUSAPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "usa" });
  return <CountryPageTemplate data={usaData} blogPosts={blogPosts} />;
}
