import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";

export const metadata: Metadata = {
  title: "Study in UAE from Nepal - Admizz Education",
  description:
    "Study in the UAE with top-ranked universities, expert admission support, modern campuses, and visa assistance. Apply for 2025 intake now!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-uae-from-nepal/",
  },
  openGraph: {
    title: "Study in UAE from Nepal - Admizz Education",
    description:
      "Study in the UAE with top-ranked universities, expert admission support, modern campuses, and visa assistance. Apply for 2025 intake now!",
    url: "https://admizzeducation.com/study-in-uae-from-nepal/",
    siteName: "Admizz Education",
    images: ["/images/og/UAE.jpg"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "UAE",
  heroHeading: "Build a Bright Future in One of the World's Top Study Destinations",
  heroSubheading: "Experience world-class education in a vibrant international hub. Study in the UAE with Admizz Education—get expert counselling, top university options, visa guidance, and scholarship support for your academic success.",
  introTitle: "Shape Your Future in the Heart of Innovation",
  introContent: "Dreaming of studying in a global education hub that blends modern innovation with cultural heritage? The United Arab Emirates (UAE) is a rapidly growing destination for international students offering globally recognized degrees, modern infrastructure, and world-class campuses. With campuses of top international universities, strong academic standards, and English-taught programs, the UAE is ideal for undergraduate, postgraduate, and doctoral studies. Cities like Dubai, Abu Dhabi, and Sharjah are not only education centers but also dynamic economic and cultural hotspots. At Admizz Education, we help you choose the right university, prepare for admissions, apply for scholarships, and guide you through visa processing—ensuring a smooth academic journey to the UAE.",
  whyStudyTitle: "Why Study in the UAE?",
  whyStudyIntro: "The UAE offers more than just excellent academics—it's a gateway to global career opportunities and diverse learning experiences. Here's why students from around the world choose the UAE:",
  benefits: [
    {
      title: "Academic Excellence",
      description: "Study at international branch campuses of top-ranked global universities or renowned UAE institutions like Khalifa University and UAEU.",
    },
    {
      title: "Global Recognition",
      description: "Earn degrees that are internationally accredited and respected by employers and universities worldwide.",
    },
    {
      title: "English-Taught Programs",
      description: "Most programs are taught in English, making it easy for international students to adapt and succeed.",
    },
    {
      title: "Safe & Student-Friendly Environment",
      description: "Live and learn in a safe, multicultural, and innovation-driven society.",
    },
    {
      title: "Work While You Study",
      description: "International students can take up part-time internships or work in designated zones under student visa rules.",
    },
    {
      title: "Scholarships & Financial Support",
      description: "Many institutions offer merit-based and need-based scholarships to reduce your financial burden.",
    },
  ],
  visaTitle: "Student Visa Requirements for the UAE",
  visaIntro: "To study in the UAE, international students must apply for a Student Residence Visa sponsored by a recognized university.",
  visaRequirements: [
    {
      category: "Visa Type",
      details: "UAE Student Residence Visa",
    },
    {
      category: "Who It's For",
      details: "International students enrolled in full-time academic programs in UAE",
    },
    {
      category: "Validity",
      details: "Usually 1 year, renewable annually",
    },
    {
      category: "Documents Required",
      details: "Admission letter, passport, medical certificate, proof of funds, Emirates ID registration",
    },
    {
      category: "Processing Time",
      details: "2 to 6 weeks (depending on university and location)",
    },
    {
      category: "More Info",
      details: "Check UAE Government Portal for updates",
    },
  ],
  intakesTitle: "Intakes Available in the UAE",
  intakesIntro: "UAE universities usually offer two major intakes with some institutions also allowing mid-year enrollments.",
  intakes: [
    {
      intake: "Fall Intake",
      months: "August – September",
    },
    {
      intake: "Spring Intake",
      months: "January – February",
    },
    {
      intake: "Summer (Optional)",
      months: "May – June (in selected programs)",
    },
  ],
  intakesNote: "Plan your application accordingly to secure your seat and apply for scholarships early.",
  testTitle: "IELTS Requirements for Studying in the UAE",
  testIntro: "English proficiency is mandatory for admission into most UAE universities. IELTS is widely accepted across institutions.",
  testRequirements: [
    {
      test: "Undergraduate",
      score: "5.5 – 6.0 overall band",
    },
    {
      test: "Postgraduate",
      score: "6.0 – 6.5 overall band",
    },
    {
      test: "Top Universities",
      score: "May require 7.0 or higher",
    },
  ],
  testNote: "Some institutions accept alternatives like TOEFL, PTE, or may conduct their own language tests. Contact Admizz for guidance on test prep and admissions.",
  costTitle: "Cost to Study in the UAE",
  costIntro: "The UAE offers affordable and high-quality education in a globally connected environment.",
  costTables: [
    {
      rows: [
        {
          category: "Foundation Courses",
          cost: "AED 15,000 – AED 25,000",
        },
        {
          category: "Undergraduate Programs",
          cost: "AED 35,000 – AED 70,000",
        },
        {
          category: "Postgraduate Programs",
          cost: "AED 45,000 – AED 90,000",
        },
        {
          category: "MBA / Specialized Courses",
          cost: "AED 60,000 – AED 120,000",
        },
        {
          category: "Living Expenses",
          cost: "AED 2,500 – AED 4,000/month",
        },
      ],
    },
  ],
  costNote: "Living expenses include rent, food, travel, and basic needs.",
  scholarshipsTitle: "Scholarships to Study in the UAE",
  scholarshipsIntro: "Many UAE universities offer scholarships to attract and support international students based on academic merit and financial need.",
  scholarships: [
    {
      name: "Khalifa University Scholarships",
      details: "Full or partial funding for STEM programs at undergraduate and postgraduate levels",
    },
    {
      name: "University of Dubai Merit Scholarships",
      details: "Offered to high-achieving students across business and IT programs",
    },
    {
      name: "Middlesex University Dubai Scholarships",
      details: "Tuition discounts and academic grants for outstanding international students",
    },
    {
      name: "Abu Dhabi University Scholarships",
      details: "Multiple categories including merit, family tuition waivers, and athletic scholarships",
    },
    {
      name: "Amity University Dubai Scholarships",
      details: "Merit-based and sports scholarships available across multiple disciplines",
    },
  ],
  scholarshipsNote: "Contact Admizz to discover scholarships tailored to your profile and simplify the application process.",
  universities: [],
  faqItems: [
    {
      question: "Why should I choose the UAE for higher education?",
      answer: "The UAE combines quality education with multicultural living, globally accredited degrees, and excellent career opportunities.",
    },
    {
      question: "What are the major intakes in the UAE?",
      answer: "The two primary intakes are Fall (Aug–Sept) and Spring (Jan–Feb), with limited courses available in Summer.",
    },
    {
      question: "What is the cost of studying in the UAE?",
      answer: "Tuition ranges from AED 35,000 to AED 90,000 per year depending on the program. Living costs range between AED 2,500–4,000/month.",
    },
    {
      question: "Do I need IELTS to apply?",
      answer: "Yes, most universities require IELTS or equivalent proof of English proficiency.",
    },
    {
      question: "Are scholarships available for international students?",
      answer: "Yes, many institutions offer scholarships based on merit, need, or special achievements.",
    },
    {
      question: "Can I work while studying in the UAE?",
      answer: "Yes, students can work part-time under specific visa permissions and university guidelines.",
    },
    {
      question: "Is the UAE safe for international students?",
      answer: "Absolutely. The UAE is one of the safest countries globally, with a student-friendly environment.",
    },
    {
      question: "What kind of visa is required to study in the UAE?",
      answer: "You need a Student Residence Visa sponsored by your university, renewable annually.",
    },
    {
      question: "How long does it take to process a student visa?",
      answer: "Typically 2–6 weeks, depending on documentation and university timelines.",
    },
    {
      question: "How can Admizz help me study in the UAE?",
      answer: "Admizz provides expert support in university selection, application, scholarship help, visa process, and relocation planning.",
    },
  ],
  ctaTitle: "Get in Touch with Admizz",
  ctaContent: "Dreaming of studying in the UAE? Admizz Education is your trusted partner in making that dream a reality. From selecting top universities to helping with scholarship applications and guiding you through the visa process—we're with you every step of the way. Whether it's a business degree in Dubai, engineering in Abu Dhabi, or media studies in Sharjah, we simplify your path to success in the UAE. Take the first step toward your global education journey with Admizz today!",
};

export default function StudyInUAEFromNepalPage() {
  return <NepalVariantTemplate data={pageData} />;
}
