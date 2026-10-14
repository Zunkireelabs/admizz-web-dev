import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import { DESTINATION_COMPARE_HEADERS, DESTINATION_COMPARE_ROWS, DESTINATION_COMPARE_SOURCES } from "@/data/destination-compare";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in USA from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in the USA from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-usa-from-nepal",
  },
  openGraph: {
    title: "Study in USA from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in the USA from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-usa-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "USA",
  countryCategorySlug: "usa",
  heroHeading: "Study in USA from Nepal",
  heroSubheading:
    "Dreaming of studying in the United States from Nepal? The USA offers world-class universities, flexible programs, global exposure, and high-paying career opportunities. With the right guidance, studying in the USA becomes simple and achievable. Admizz Education supports Nepali students at every step — from choosing the right university to securing a US student visa.",

  quickAnswer:
    "To study in the USA from Nepal you need an offer from a SEVP-approved university, an I-20 form, and an F-1 visa interview at the US Embassy in Kathmandu. You pay a $350 SEVIS I-901 fee and a $185 visa application fee, and you can apply for the visa up to 365 days before your program starts. Universities usually ask for IELTS 6.0–6.5 or TOEFL 70–80 for a bachelor's degree, and IELTS 6.5–7.0 or TOEFL 80–100 for a master's. Budget roughly $25,500–$56,500 per year for tuition, living costs and health insurance (MBA and professional programs cost more). Fall (August–September) is the main intake, with Spring (January) as the alternative. After study, OPT can be filed from 90 days before to 60 days after your program end date, and STEM OPT adds 24 months for eligible STEM graduates.",
  lastUpdated: "October 2026",
  sources: [
    { label: "Study in the States (US Department of Homeland Security)", url: "https://studyinthestates.dhs.gov/" },
    { label: "EducationUSA (US Department of State)", url: "https://educationusa.state.gov/" },
    { label: "ICE: I-901 SEVIS fee", url: "https://www.ice.gov/sevis/i901" },
    { label: "US Department of State: Fees for visa services", url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html" },
    { label: "USCIS: Optional Practical Training for F-1 students", url: "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students" },
    { label: "Study in the States: STEM OPT extension overview", url: "https://studyinthestates.dhs.gov/stem-opt-hub/additional-resources/stem-opt-extension-overview" },
    { label: "US Department of State: Student visa", url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html" },
    { label: "Study in the States: Paying the I-901 SEVIS fee", url: "https://studyinthestates.dhs.gov/students/prepare/paying-the-i-901-sevis-fee" },
  ],
  relatedLinks: [
    { label: "Study in the USA", href: "/study-in-the-usa", description: "universities, admission and visa overview" },
    { label: "US F-1 student visa interview from Nepal", href: "/usa-f1-visa-interview-opt-nepali-students-2026", description: "fees, SEVIS, OPT and STEM OPT" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal", description: "how we help you find and win funding" },
    { label: "Visa assistance for study abroad", href: "/visa-assistance-for-study-abroad", description: "documents, mock interviews and application review" },
    { label: "Test preparation", href: "/test-prep", description: "IELTS, TOEFL, GRE, GMAT and SAT coaching" },
    { label: "Study in the UK from Nepal", href: "/study-in-uk-from-nepal" },
    { label: "Study in Canada from Nepal", href: "/study-in-canada-from-nepal" },
  ],

  introTitle: "Complete Guide to Universities, Visas, Tests, Intakes & Careers",
  introContent:
    "The USA is home to the world's most advanced education system, offering unparalleled opportunities for Nepali students. From top-ranked universities like MIT and Harvard to flexible course structures and STEM OPT extensions of up to 36 months, the USA remains the top choice for ambitious Nepali students seeking global careers.",

  lastChecked: "October 2026",
  dateModified: "2026-10-12",
  guideTabLabel: "Fees & Documents",
  guideSections: [
    {
      id: "f1-fees",
      title: "F-1 Visa Fees and Documents for Nepali Students",
      intro: "There are two separate payments, and they go to different places.",
      bullets: [
        "Visa application fee: US$185 for F-1 student visas, as listed by the US State Department.",
        "I-901 SEVIS fee: US$350 for F and M visa applicants, paid on fmjfee.com. Print the payment confirmation, because you must show proof of payment at the interview. If you apply for your visa within 12 months of paying, you do not pay it again.",
        "Interview: Nepali applicants interview at the US Embassy in Kathmandu. Check np.usembassy.gov for current booking and payment instructions.",
        "Bring: a valid passport, your Form I-20 signed by you and the school, the SEVIS payment confirmation, the DS-160 confirmation page, the visa fee receipt and appointment confirmation, academic records and test scores, and proof of how you will pay for your studies.",
      ],
      note: "Fees and embassy instructions change, so confirm them on travel.state.gov, ice.gov and np.usembassy.gov on the day you pay.",
      links: [
        { label: "F-1 interview and OPT guide", href: "/usa-f1-visa-interview-opt-nepali-students-2026" },
        { label: "H-1B lottery guide", href: "/h1b-wage-weighted-lottery-2026-nepali-students-opt" },
      ],
    },
    {
      id: "compare",
      title: "USA vs the UK, Canada and Australia",
      intro:
        "How the USA compares on visa fees, the funds you must show and work after study, using official figures as checked in October 2026.",
      table: { headers: DESTINATION_COMPARE_HEADERS, rows: DESTINATION_COMPARE_ROWS },
      links: [
        { label: "UK", href: "/study-in-uk-from-nepal" },
        { label: "Canada", href: "/study-in-canada-from-nepal" },
        { label: "Australia", href: "/study-in-australia" },
      ],
    },
  ],
  sourcesTitle: "Official sources",

  whyStudyTitle: "Why Study in the USA from Nepal?",
  whyStudyIntro:
    "As a matter of fact, the USA is home to the world's most advanced education system, offering unparalleled opportunities for Nepali students.",
  benefits: [
    {
      title: "World's Top Universities",
      description:
        "Home to MIT, Harvard, Stanford, and more. 18 of the top 20 global universities are in the USA. Globally recognized degrees that open doors worldwide.",
    },
    {
      title: "Flexible Course Structure",
      description:
        "Freedom to choose majors and minors. Interdisciplinary programs tailored to your interests. Liberal arts approach for well-rounded education.",
    },
    {
      title: "Research & Innovation Hub",
      description:
        "Access to cutting-edge research facilities. Internships and co-op programs with top companies. Strong focus on STEM and innovation.",
    },
    {
      title: "STEM OPT Extension - 36 Months",
      description:
        "STEM graduates can work in the USA for up to 3 years after graduation: 12 months of OPT plus a 24-month STEM extension, if they meet the conditions. Gain valuable international work experience.",
    },
    {
      title: "High Return on Investment (ROI)",
      description:
        "Average starting salary: $60,000-$100,000+. Strong career prospects in technology and business. Networking opportunities with global leaders.",
    },
    {
      title: "Global Career Opportunities",
      description:
        "American degree valued by employers worldwide. Access to Fortune 500 companies. Strong alumni networks across industries.",
    },
  ],

  whyAdmizzTitle: "Why Choose Admizz Education?",
  whyAdmizzPoints: [
    "Free career counseling – Personalized guidance tailored to your goals",
    "University shortlisting – Access to 100+ partner universities",
    "Scholarship assistance – $2M+ in scholarships awarded to our students",
    "F-1 visa support – 95% visa approval success rate",
    "End-to-end support – From Nepal to USA and beyond",
    "Proven track record – 1,500+ students enrolled worldwide",
  ],

  topCoursesTitle: "Best Courses to Study in the USA",
  topCourses: [
    "Computer Science & IT",
    "Data Science & AI",
    "Engineering (STEM)",
    "Business Analytics & MBA",
    "Finance & Accounting",
    "Biotechnology & Life Sciences",
    "Public Health & Healthcare",
  ],

  visaTitle: "USA Student Visa (F-1) Process – Step by Step",
  visaIntro:
    "Follow these essential steps to successfully obtain your F-1 student visa from Nepal.",
  visaRequirements: [
    {
      category: "1. Select University",
      details: "Choose your course and university from SEVP-approved institutions",
    },
    {
      category: "2. Receive Offer",
      details: "Get admission offer letter from the university",
    },
    {
      category: "3. Accept & Deposit",
      details: "Accept offer and pay the required tuition deposit",
    },
    {
      category: "4. Receive I-20",
      details: "Get official I-20 form from the university",
    },
    {
      category: "5. Pay SEVIS Fee",
      details: "Complete SEVIS I-901 fee payment ($350)",
    },
    {
      category: "6. Submit DS-160",
      details: "Fill and submit the online visa application form",
    },
    {
      category: "7. Visa Interview",
      details: "Attend interview at the US Embassy in Kathmandu",
    },
    {
      category: "8. Visa Approval",
      details: "Receive F-1 visa stamp. Admizz provides comprehensive support with 95% success rate.",
    },
  ],

  intakesTitle: "Plan Your Admission - Key Intakes in the USA",
  intakesIntro:
    "Choosing the right intake significantly improves your admission and funding chances.",
  intakes: [
    {
      intake: "Fall (Aug-Sep) – Main Intake",
      months: "Application: November – January",
      details:
        "Maximum universities and programs. Best scholarships and financial aid options. Largest student cohorts for better networking.",
    },
    {
      intake: "Spring (January) – Alternative",
      months: "Application: July – October",
      details:
        "Excellent alternative if you miss Fall intake. Fewer courses but less competition for admission.",
    },
    {
      intake: "Summer (May-Jun) – Limited",
      months: "Select universities only",
      details:
        "Available at limited universities. Suitable for specific programs. Smaller class sizes, ideal for accelerated programs.",
    },
  ],
  intakesNote:
    "Admizz Education helps you select the best intake based on your academic profile and career goals.",

  testTitle: "English & Entrance Exam Requirements",
  testIntro:
    "US universities accept multiple English proficiency tests, giving you flexibility in your application.",
  testRequirements: [
    {
      test: "IELTS (Bachelor's)",
      score: "6.0 – 6.5",
      notes: "Most widely accepted English proficiency test",
    },
    {
      test: "TOEFL (Bachelor's)",
      score: "70 – 80 iBT",
      notes: "Preferred by many US universities",
    },
    {
      test: "Duolingo (Bachelor's)",
      score: "95 – 105",
      notes: "Increasingly accepted alternative",
    },
    {
      test: "IELTS (Master's)",
      score: "6.5 – 7.0",
      notes: "Higher requirement for graduate programs",
    },
    {
      test: "TOEFL (Master's)",
      score: "80 – 100 iBT",
      notes: "Standard for graduate admissions",
    },
    {
      test: "Duolingo (Master's)",
      score: "105 – 120",
      notes: "Accepted at select graduate programs",
    },
    {
      test: "GRE / GMAT",
      score: "Varies by program",
      notes: "Required for some MS and MBA programs. Many universities offer test waivers.",
    },
  ],
  testNote:
    "Whether you qualify for a waiver or need a strategic test preparation plan, Admizz Education ensures you're exam-ready and application-strong.",

  costTitle: "Cost of Studying in the USA from Nepal",
  costIntro:
    "Here's a comprehensive breakdown of yearly expenses for Nepali students planning to study in America.",
  costTables: [
    {
      title: "Tuition Fees (Per Year)",
      rows: [
        {
          category: "Undergraduate",
          cost: "$15,000 – $35,000",
        },
        {
          category: "Postgraduate",
          cost: "$20,000 – $40,000",
        },
        {
          category: "MBA / Professional",
          cost: "$30,000 – $60,000+",
        },
      ],
    },
    {
      title: "Additional Costs (Per Year)",
      rows: [
        {
          category: "Living Costs",
          cost: "$10,000 – $15,000",
        },
        {
          category: "Health Insurance",
          cost: "$500 – $1,500",
        },
        {
          category: "SEVIS I-901 fee (one-time, F-1)",
          cost: "$350",
        },
        {
          category: "Visa application fee (one-time, non-refundable)",
          cost: "$185",
        },
      ],
    },
    {
      title: "Estimated Total Per Year (tuition + living + insurance)",
      rows: [
        {
          category: "Undergraduate",
          cost: "$25,500 – $51,500",
        },
        {
          category: "Postgraduate",
          cost: "$30,500 – $56,500",
        },
        {
          category: "MBA / Professional",
          cost: "$40,500 – $76,500+",
        },
      ],
    },
  ],
  costNote:
    "Living expenses vary significantly by state. Cities like New York and San Francisco are costlier than smaller towns in the Midwest.",

  scholarshipsTitle: "Scholarships for Nepali Students",
  scholarshipsIntro:
    "Nepali students can apply for various prestigious scholarships to significantly reduce tuition costs.",
  scholarships: [
    {
      name: "Fulbright Program",
      details:
        "Fully funded master's degree for exceptional scholars from Nepal.",
    },
    {
      name: "Hubert H. Humphrey Fellowship",
      details:
        "For mid-career professionals with leadership potential.",
    },
    {
      name: "EducationUSA Opportunity Funds",
      details:
        "Financial assistance for underprivileged students.",
    },
    {
      name: "University-Specific Scholarships",
      details:
        "Merit-based awards based on GPA and test scores.",
    },
    {
      name: "International Student Grants",
      details:
        "Available at many US institutions for talented students.",
    },
  ],
  scholarshipsNote:
    "Admizz Education helps identify relevant scholarships and supports you in applying with a strong profile and compelling documents.",

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
    { name: "Minnesota State University", logo: "/images/universities/usa/MINNESOTA-STATE.webp" },
  ],

  faqItems: [
    {
      question: "Can I apply to US universities after +2 in Nepal?",
      answer:
        "Yes, absolutely! US universities accept Nepali students with +2 qualifications for undergraduate programs. However, you'll need to meet English proficiency requirements and submit required standardized test scores.",
    },
    {
      question: "Is IELTS or TOEFL mandatory for USA?",
      answer:
        "Yes. US universities require proof of English proficiency through IELTS, TOEFL, or Duolingo. Nevertheless, some universities may waive this requirement if you studied in English medium for a certain period.",
    },
    {
      question: "Can Nepali students work while studying in the USA?",
      answer:
        "Yes. International students can work part-time (20 hours per week) on-campus during studies and full-time during breaks. Additionally, you may qualify for CPT (internships that are part of your program), usually after one academic year.",
    },
    {
      question: "Are scholarships available for Nepali students?",
      answer:
        "Yes. Scholarships are available from government-funded programs like Fulbright to university-specific awards. In fact, many universities offer merit-based scholarships ranging from partial to full tuition coverage.",
    },
    {
      question: "What is OPT and CPT?",
      answer:
        "OPT (Optional Practical Training) allows you to work after graduation for 12 months, or 36 months for STEM programs. Meanwhile, CPT (Curricular Practical Training) allows work that is part of your program of study, usually after one academic year. At graduate level your school may authorise CPT in the first semester if your program requires it.",
    },
    {
      question: "How long does the F-1 visa process take?",
      answer:
        "After you receive your I-20 and pay the SEVIS fee, you book your visa interview at the US Embassy in Kathmandu. The wait for an interview and the processing time change through the year, so check current wait times on the US Department of State website and apply early. F-1 visas can be issued up to 365 days before your program start date.",
    },
    {
      question: "Can I stay in the USA after graduation?",
      answer:
        "Yes. With OPT, you can stay 1 year (or 3 years for STEM programs). Furthermore, you may apply for an H-1B work visa to continue working in the USA long-term.",
    },
    {
      question: "How much does it cost to study in the USA from Nepal?",
      answer:
        "Expect roughly $25,500–$51,500 per year for a bachelor's degree and $30,500–$56,500 for a master's, covering tuition, living costs and health insurance. MBA and professional programs cost more. Costs depend heavily on the university and the state you live in.",
    },
    {
      question: "What are the requirements to study in the USA from Nepal?",
      answer:
        "For a bachelor's you need a completed +2 or equivalent, an English proficiency score (IELTS, TOEFL or Duolingo) and any test scores the university asks for. For a master's you need your bachelor's transcripts and, for some programs, GRE or GMAT scores. Every applicant also needs a statement of purpose, recommendation letters, a valid passport and proof of funds for the F-1 visa.",
    },
    {
      question: "Can I get a full scholarship to study in the USA from Nepal?",
      answer:
        "Fully funded awards such as the Fulbright Program exist but are highly competitive. Most Nepali students combine partial merit scholarships from the university with graduate assistantships (for master's and PhD programs) and family funding. Admizz helps you shortlist universities that offer the most aid for your profile.",
    },
    {
      question: "What is the difference between F-1, M-1 and J-1 visas?",
      answer:
        "F-1 is the visa for academic study at a college or university, and it is the one most Nepali degree students need. M-1 is for vocational or technical study, and J-1 is for exchange programs such as Fulbright. Your I-20 or DS-2019 form tells you which visa applies.",
    },
    {
      question: "How early can I apply for a US student visa?",
      answer:
        "F-1 and M-1 visas can be issued up to 365 days before your program start date. You need your original I-20 at the interview, and you may enter the US up to 30 days before the start date on your I-20.",
    },
    {
      question: "How much are the US student visa fees?",
      answer:
        "The SEVIS I-901 fee is $350 for F-1 and M-1 students, and the visa application fee for the F student visa is $185 and is non-refundable. Some nationalities pay a separate visa issuance fee listed in the State Department Reciprocity Tables. The U.S. Embassy in Nepal has announced that student visa issuance fees for Nepali students were removed, so check the embassy website for the current position. All of these are paid in addition to tuition, so check the official sites before you pay as fees change.",
    },
    {
      question: "Can I study in the USA with a study gap from Nepal?",
      answer:
        "Many US universities will consider a study gap if you can explain it, for example with work or other courses. How long a gap is acceptable differs by university and program, so check each university's admission page or ask an Admizz counsellor.",
    },
    {
      question: "Does Admizz offer test preparation in Nepal?",
      answer:
        "Yes. Admizz Education offers expert coaching for IELTS, TOEFL, SAT, GRE, GMAT, and all other required exams. As a result, our students achieve competitive scores for top university admissions.",
    },
  ],

  extraSections: [
    {
      id: "usa-requirements",
      title: "US Admission Requirements for Nepali Students",
      intro:
        "Each US university sets its own entry rules, so always check the program page. These are the usual requirements.",
      bullets: [
        "Bachelor's: completed secondary education (+2 / 12 years of schooling) and your transcripts. Some universities also ask for SAT or ACT scores, and many are test-optional.",
        "Master's: a completed bachelor's degree and transcripts. Some programs ask for GRE or GMAT scores, and many offer waivers.",
        "English: IELTS, TOEFL or Duolingo scores at the level the university requires (see the test table above).",
        "A statement of purpose, recommendation letters and, for some programs, a resume, portfolio or interview.",
        "Proof of funds for the first year, as shown on your I-20.",
      ],
    },
    {
      id: "usa-visa-documents",
      title: "Documents for the F-1 Visa Interview in Kathmandu",
      intro: "Bring the originals and keep copies. Your university and the US Embassy confirm the exact list for your case.",
      bullets: [
        "A valid passport.",
        "The original Form I-20 signed by you and your school.",
        "Your SEVIS I-901 fee payment receipt ($350).",
        "Your DS-160 confirmation page and your visa application fee receipt ($185).",
        "Academic transcripts, certificates and test scores (IELTS, TOEFL, Duolingo, GRE or GMAT if you took them).",
        "Financial documents showing how you will pay for your first year, matching the amount on your I-20.",
      ],
    },
    {
      id: "usa-visa-types",
      title: "F-1, M-1 and J-1: Which Visa Do You Need?",
      table: {
        headers: ["Visa", "Used for"],
        rows: [
          ["F-1", "Academic study at a college or university (most degree students)"],
          ["M-1", "Vocational or technical study"],
          ["J-1", "Exchange programs, such as Fulbright"],
        ],
      },
      note: "F-1 and M-1 visas can be issued up to 365 days before your program start date. Source: Study in the States (DHS).",
    },
    {
      id: "usa-work-rights",
      title: "Working in the USA: On-Campus, CPT and OPT",
      bullets: [
        "On campus: F-1 students can work on campus with approval from their school's Designated School Official (DSO), up to 20 hours a week while classes are in session and full-time during breaks. The only exception to the 20-hour limit is an emergency suspension announced in the Federal Register.",
        "CPT (Curricular Practical Training): work that is part of your program of study, full-time or part-time, with a signed cooperative agreement or a letter from your employer and your DSO's approval on a new I-20. You usually need one full academic year of study first, but at graduate level your DSO may authorise CPT in your first semester if your program requires it. 12 months or more of full-time CPT makes you ineligible for OPT, while part-time CPT does not.",
        "OPT (Optional Practical Training): up to 12 months of work related to your major at each education level, so you can have another 12 months at master's level. You must apply to USCIS for a work permit (EAD) and wait for it before you start work, and while school is in session you can work only 20 hours a week.",
        "STEM OPT: if you are on regular OPT and your degree is on the DHS STEM Designated Degree Program List, you can apply for a further 24-month extension, which brings the total to 36 months. Your employer must use E-Verify, and you and your employer must complete a training plan (Form I-983).",
      ],
      note: "Sources: USCIS and Study in the States (DHS). Rules and processing change, so confirm the details with your school's international student office.",
      links: [
        { label: "Study abroad rule changes", href: "/study-abroad-rule-updates" },
      ],
    },
  ],

  ctaTitle: "Ready to Begin Your Study Abroad Journey?",
  ctaContent:
    "Our expert consultants are here to guide you every step of the way.",
};

export default async function StudyInUSAFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(
    postsByCategoryQuery,
    { categorySlug: "usa" }
  );
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
