import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";

export const metadata: Metadata = {
  title: "Study in Dubai from Nepal - Admizz Education",
  description:
    "Study in Dubai from Nepal for quality education, affordable tuition, global exposure, and top university options. Apply now for 2025 intakes!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-dubai-from-nepal/",
  },
  openGraph: {
    title: "Study in Dubai from Nepal - Admizz Education",
    description:
      "Study in Dubai from Nepal for quality education, affordable tuition, global exposure, and top university options. Apply now for 2025 intakes!",
    url: "https://admizzeducation.com/study-in-dubai-from-nepal/",
    siteName: "Admizz Education",
    images: ["/images/og/flag-of-australia.png"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "Dubai",
  heroHeading: "Study in Dubai from Nepal",
  heroSubheading:
    "Planning to study in Dubai from Nepal? Discover globally ranked universities, modern campuses, and diverse career paths. Explore opportunities, apply with ease, and turn your international education dream into reality.",

  introTitle: "The New Hub for Global Education",
  introContent:
    "Dubai has emerged as a premier education destination, hosting top-ranked international branch campuses from the UK, USA, and Australia. These institutions provide flexible programs, industry-driven curricula, and practical learning experiences spanning business, engineering, IT, healthcare, and hospitality. Studying in Dubai ensures academic freedom, innovation, and hands-on exposure aligned with global career demands. The city's multicultural environment, modern infrastructure, and strong industry connections make it ideal for Nepalese students. At Admizz Education, we assist you at every step — from university selection, scholarship guidance, and English test preparation to application support, visa documentation, and pre-departure counseling.",

  whyStudyTitle: "Why Study in Dubai?",
  benefits: [
    {
      title: "Academic Excellence",
      description:
        "Achieve academic excellence with globally recognized programs, expert faculty, practical learning, and career-focused opportunities.",
    },
    {
      title: "Flexible Learning",
      description:
        "Customize your academic path with elective options, practical training, and internship-based programs designed for real-world success.",
    },
    {
      title: "Multicultural Experience",
      description:
        "Join a global student community in a safe, inclusive environment that encourages cross-cultural friendships and global awareness.",
    },
    {
      title: "Work Opportunities",
      description:
        "Gain hands-on experience with part-time jobs during your studies and internships with top companies in Dubai.",
    },
    {
      title: "Scholarships & Support",
      description:
        "Access scholarships and dedicated student support services that make quality education affordable and stress-free.",
    },
    {
      title: "State-of-the-Art Facilities",
      description:
        "Dubai's campuses are equipped with cutting-edge technology, well-stocked libraries, innovation labs, and dedicated career support centers.",
    },
  ],

  visaTitle: "Dubai Student Visa Requirements",
  visaRequirements: [
    {
      category: "Valid Passport",
      details: "Must be valid for at least 6 months from the application date",
    },
    {
      category: "University Admission Letter",
      details:
        "Official offer or acceptance letter from a recognized Dubai institution",
    },
    {
      category: "Visa Application Form",
      details: "Generally processed and submitted by the university",
    },
    {
      category: "Passport-Sized Photos",
      details: "As per UAE visa specifications",
    },
    {
      category: "Proof of Tuition Fee Payment",
      details: "Receipt or confirmation of initial payment or deposit",
    },
    {
      category: "Financial Support Proof",
      details: "Bank statement or sponsor's financial documents",
    },
    {
      category: "Medical Fitness Certificate",
      details: "Conducted at an approved UAE medical center after arrival",
    },
    {
      category: "Health Insurance",
      details: "Mandatory; must be arranged or approved by the university",
    },
    {
      category: "Visa Fees",
      details: "AED 2,500–3,500 (varies by institution)",
    },
    {
      category: "Security Deposit",
      details: "AED 1,000–2,000 (refundable)",
    },
    {
      category: "Emirates ID & Medical Fees",
      details: "Approximately AED 1,000",
    },
    {
      category: "Processing Time",
      details: "Usually takes 2–4 weeks",
    },
    {
      category: "Visa Validity",
      details: "Valid for 1 year; renewable annually",
    },
    {
      category: "Long-Term Visa Option",
      details: "5-year student visa available for outstanding students",
    },
    {
      category: "Visa Sponsor",
      details: "University acts as the official visa sponsor",
    },
  ],

  intakesTitle: "Dubai Intakes for Nepalese Students",
  intakes: [
    {
      intake: "Fall Intake",
      months: "September (Application: March to July)",
      details:
        "Most popular intake; widest range of programs and scholarships.",
    },
    {
      intake: "Spring Intake",
      months: "January / February (Application: August to November)",
      details:
        "Ideal for students who miss the Fall intake; decent course availability.",
    },
    {
      intake: "Summer Intake",
      months: "May / July (Application: January to March)",
      details:
        "Limited course options; suitable for short-term or special programs.",
    },
  ],

  testTitle: "English Language & Standardized Test Requirements",
  testRequirements: [
    {
      test: "IELTS",
      score: "5.5 – 6.5 (UG), 6.0 – 7.0 (PG)",
      notes: "Most commonly accepted across Dubai universities.",
    },
    {
      test: "TOEFL (iBT)",
      score: "61 – 79 (UG), 79 – 90 (PG)",
      notes: "Internet-based version widely accepted.",
    },
    {
      test: "PTE Academic",
      score: "50 – 58 (UG), 58 – 65 (PG)",
      notes: "Accepted as an alternative to IELTS/TOEFL.",
    },
    {
      test: "Duolingo",
      score: "90 – 110",
      notes: "Accepted by select institutions for remote testing.",
    },
    {
      test: "University Placement Test",
      score: "Varies",
      notes: "Some universities conduct their own in-house English exams.",
    },
    {
      test: "Medium of Instruction (MOI)",
      score: "Case-by-case",
      notes: "May be accepted if previous education was in English.",
    },
    {
      test: "SAT",
      score: "Rarely required",
      notes: "For undergraduate programs",
    },
    {
      test: "GRE",
      score: "As required",
      notes: "Some Engineering or STEM-related master's programs",
    },
    {
      test: "GMAT",
      score: "As required",
      notes: "Required for select MBA or business graduate programs",
    },
  ],

  costTitle: "Cost of Studying in Dubai from Nepal",
  costTables: [
    {
      title: "Tuition Fees by Program Level",
      rows: [
        {
          category: "Undergraduate",
          cost: "AED 30,000 – 60,000",
          nprCost: "1,080,000 – 2,160,000",
        },
        {
          category: "Postgraduate / Master's",
          cost: "AED 40,000 – 75,000",
          nprCost: "1,440,000 – 2,700,000",
        },
        {
          category: "MBA / Specialized Programs",
          cost: "AED 60,000 – 100,000",
          nprCost: "2,160,000 – 3,600,000",
        },
      ],
    },
    {
      title: "Monthly Living Expenses",
      rows: [
        {
          category: "Accommodation",
          cost: "AED 1,500 – 3,000",
          nprCost: "54,000 – 108,000",
        },
        {
          category: "Food",
          cost: "AED 800 – 1,200",
          nprCost: "29,000 – 43,000",
        },
        {
          category: "Transportation",
          cost: "AED 250 – 400",
          nprCost: "9,000 – 14,400",
        },
        {
          category: "Miscellaneous",
          cost: "AED 300 – 500",
          nprCost: "10,800 – 18,000",
        },
      ],
    },
    {
      title: "Visa & Insurance Costs",
      rows: [
        {
          category: "Student Visa Fee",
          cost: "AED 2,500 – 3,500",
          nprCost: "90,000 – 126,000",
        },
        {
          category: "Emirates ID & Medical",
          cost: "AED 1,000",
          nprCost: "36,000",
        },
        {
          category: "Health Insurance",
          cost: "AED 1,000 – 1,500",
          nprCost: "36,000 – 54,000",
        },
      ],
    },
  ],
  costNote:
    "Additional Costs: Airfare (One-way Nepal to Dubai): NPR 40,000 – 60,000 | Books & Supplies: AED 1,000 – 2,000 per year | Entrance Exams (IELTS/TOEFL): NPR 20,000 – 25,000",

  scholarshipsTitle: "Scholarships for Nepalese Students",
  scholarships: [
    {
      name: "Academic Merit Scholarship",
      provider: "University of Dubai",
      details: "Based on GPA / board exam results",
    },
    {
      name: "Vice Chancellor's Scholarship",
      provider: "Middlesex University Dubai",
      details: "10%–50% fee waiver based on academic merit",
    },
    {
      name: "President's Scholarship",
      provider: "Canadian University Dubai",
      details: "Up to 100% scholarship for top performers",
    },
    {
      name: "International Student Merit Scholarship",
      provider: "Heriot-Watt University Dubai",
      details: "Academic and extracurricular achievement",
    },
    {
      name: "Entrance Scholarship",
      provider: "Manipal Academy of Higher Education",
      details: "Awarded to new students based on merit",
    },
    {
      name: "Amity Global Talent Scholarship",
      provider: "Amity University Dubai",
      details: "For talent in academics, arts, sports",
    },
    {
      name: "Merit & Merit-Cum-Need Scholarships",
      provider: "BITS Pilani, Dubai Campus",
      details: "Based on academic score and financial need",
    },
    {
      name: "Alumni/Sibling Discount",
      provider: "Various Universities",
      details: "10%–20% tuition reduction for family ties",
    },
    {
      name: "Sheikh Hamdan Award",
      provider: "Dubai Government",
      details: "For academic and leadership excellence",
    },
    {
      name: "Mohammed bin Rashid Scholarship",
      provider: "MBRF / Dubai Government",
      details: "High-achieving international students",
    },
    {
      name: "Dubai Cares Support",
      provider: "Dubai Cares NGO",
      details: "Case-by-case basis; need-based",
    },
  ],

  universities: [],

  faqItems: [
    {
      question: "Why should I choose Dubai for higher education?",
      answer:
        "Dubai offers globally recognized degrees, multicultural exposure, modern infrastructure, affordable tuition fees, and excellent job prospects after graduation.",
    },
    {
      question: "Are degrees from Dubai universities valid internationally?",
      answer:
        "Yes, most Dubai universities are affiliated with or accredited by UK, US, or Australian institutions, making their degrees widely accepted worldwide.",
    },
    {
      question: "What are the major intakes for Dubai universities?",
      answer:
        "The primary intakes are September (Fall) and January/February (Spring). Some universities also offer a May/July (Summer) intake.",
    },
    {
      question: "Do I need IELTS or TOEFL to apply to Dubai universities?",
      answer:
        "Yes, most universities require English proficiency tests like IELTS, TOEFL, PTE, or Duolingo. Some may offer in-house placement tests or waive it with an English-medium education letter.",
    },
    {
      question: "How much does it cost to study in Dubai from Nepal?",
      answer:
        "Tuition ranges from AED 30,000 to AED 100,000 per year, and living expenses can range between AED 2,500 – 5,000 per month.",
    },
    {
      question: "Are there scholarships available for Nepalese students?",
      answer:
        "Yes, many universities offer merit-based, need-based, and sports/talent scholarships to Nepalese students. Some also provide early-bird discounts and sibling/alumni waivers.",
    },
    {
      question: "Can I work part-time while studying in Dubai?",
      answer:
        "Yes, students can work part-time (up to 15–20 hours/week) during semesters and full-time during breaks, provided they have a work permit through the university.",
    },
    {
      question: "Is a student visa required to study in Dubai?",
      answer:
        "Yes, students need a UAE residence visa for education, usually sponsored by the university. Visa processing takes about 2–4 weeks.",
    },
    {
      question: "What documents are required for admission?",
      answer:
        "Academic transcripts, Passport copy, Passport-size photos, English test score (IELTS/TOEFL), Statement of Purpose (SOP), Recommendation letters (if required)",
    },
    {
      question: "How can Admizz Education help me?",
      answer:
        "Admizz Education provides free guidance on university selection, test prep, scholarships, application filing, visa support, and pre-departure briefings.",
    },
  ],

  ctaTitle: "Begin Your Journey to Study in Dubai from Nepal",
  ctaContent:
    "Are you a student in Nepal dreaming of studying in a land of innovation, opportunity, and global exposure? Dubai is fast becoming a top destination for higher education — offering world-class universities, industry-focused programs, and an international learning environment. At Admizz Education, we support Nepalese students throughout the entire Dubai study process — from selecting the right university to scholarship guidance, visa support, and pre-departure preparation. We make your journey easy, personalized, and stress-free. Don't let uncertainty hold you back. Join the growing number of students from Nepal who are successfully building their futures in Dubai with Admizz by their side. Contact us today to book your free Dubai education consultation. Your journey to Dubai begins here — with Admizz.",
};

export default function StudyInDubaiFromNepalPage() {
  return <NepalVariantTemplate data={pageData} />;
}
