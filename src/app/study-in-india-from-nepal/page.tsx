import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData, CountryTheme } from "@/components/ui/NepalVariantTemplate";
import IndiaAnimations from "@/components/india/IndiaAnimations";
import IndiaCinematicHero from "@/components/india/IndiaCinematicHero";
import IndiaCostViz from "@/components/india/IndiaCostViz";
import IndiaCityMap from "@/components/india/IndiaCityMap";
import IndiaWhyNarrative from "@/components/india/IndiaWhyNarrative";
import IndiaStickyMobileCTA from "@/components/india/IndiaStickyMobileCTA";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in India from Nepal - Admizz Education",
  description:
    "Study in India from Nepal with top universities, affordable fees, quality education & global exposure. Apply now for 2025 intake!",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-india-from-nepal",
  },
  openGraph: {
    title: "Study in India from Nepal - Admizz Education",
    description:
      "Study in India from Nepal with top universities, affordable fees, quality education & global exposure. Apply now for 2025 intake!",
    url: "https://admizzeducation.com/study-in-india-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/nepali-2.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "India",
  countryCategorySlug: "india",
  heroHeading: "Study in India from Nepal",
  heroSubheading: "Build a Bright Future in One of the World's Top Study Destinations",

  introTitle: "Your Path to Quality Education",
  introContent: "Study in India from Nepal has become one of the most popular choices for students seeking quality education with affordability and convenience. India's strong academic system, low tuition fees, cultural similarities, and proximity to Nepal make it an ideal destination. Prestigious institutions like IITs, IIMs, and AIIMS, alongside UGC-recognized universities and AICTE-approved colleges, offer world-class opportunities right next door. Whether you pursue Engineering, Medicine, Management, IT, or Humanities programs, Admizz provides comprehensive guidance from college selection through entrance exam preparation, accommodation, and documentation.",

  whyStudyTitle: "Why Study in India from Nepal",
  benefits: [
    {
      title: "Globally Accepted Degrees",
      description: "Indian universities are globally recognized and accepted for jobs or higher studies worldwide."
    },
    {
      title: "Affordable Tuition & Living",
      description: "Study at top institutions at lower costs compared to UK, USA, or Australia."
    },
    {
      title: "Cultural & Linguistic Familiarity",
      description: "Easy adjustment due to shared culture, food, festivals, and in many cases, language (Hindi/English)."
    },
    {
      title: "Excellent Medical & Engineering Colleges",
      description: "India is home to renowned institutes in medicine, engineering, pharmacy, and IT."
    },
    {
      title: "Thousands of Courses",
      description: "Pick from AI, data science, hotel management, fashion design, business, arts, or traditional subjects."
    },
    {
      title: "Easy Travel & Entry Process",
      description: "Open border and strong bilateral ties ensure smooth entry, faster admissions, and simple documentation."
    }
  ],

  visaTitle: "Indian Visa Requirements",
  visaIntro: "Nepalese students do not require a traditional student visa to study in India due to the open-border policy. However, registration at the university and FRRO documentation may be required depending on duration and region.",
  visaRequirements: [
    {
      category: "Visa Needed",
      details: "No visa required for Nepalese nationals"
    },
    {
      category: "Entry",
      details: "Valid passport or citizenship card"
    },
    {
      category: "University Registration",
      details: "Required at time of admission"
    },
    {
      category: "FRRO/Police Registration",
      details: "Not required except some cases based on duration/region"
    },
    {
      category: "Study Permit",
      details: "Academic documents and NOC from Nepal's Ministry of Education"
    }
  ],

  intakesTitle: "Admission Intakes & Duration",
  intakes: [
    {
      intake: "Main Intake",
      months: "July–August",
      details: "Primary intake for most institutions"
    },
    {
      intake: "Winter Intake",
      months: "January–February",
      details: "Selected institutions based on availability"
    },
    {
      intake: "Rolling Intake",
      months: "Throughout the year",
      details: "Limited programs, common for short-term certifications"
    }
  ],
  intakesNote: "Apply 4–6 months before your preferred intake to ensure smooth admission, documentation, and accommodation arrangements.",

  testTitle: "Eligibility & Entrance Exams",
  testIntro: "Admizz assists with entrance exam preparation and university applications.",
  testRequirements: [
    {
      test: "Engineering (B.Tech)",
      score: "JEE Advanced / IELTS / TOEFL / Direct for Nepalese Students",
      notes: ""
    },
    {
      test: "Medical (MBBS/BDS)",
      score: "NEET",
      notes: ""
    },
    {
      test: "Management (MBA)",
      score: "University-specific / Direct for Nepalese Students",
      notes: ""
    },
    {
      test: "General UG/PG",
      score: "Direct for Nepalese Students",
      notes: ""
    },
    {
      test: "Law",
      score: "CLAT / LSAT",
      notes: ""
    }
  ],

  costTitle: "Cost of Studying",
  costIntro: "Government institutions like IITs, AIIMS, and central universities offer subsidized education for SAARC country students, including Nepal.",
  costTables: [
    {
      title: "Approximate Annual Tuition Fees",
      rows: [
        {
          category: "Diploma",
          cost: "₹15,000–₹50,000 (Government) | ₹40,000–₹1,00,000 (Private)"
        },
        {
          category: "Undergraduate",
          cost: "₹30,000–₹1,00,000 (Government) | ₹80,000–₹3,00,000 (Private)"
        },
        {
          category: "Postgraduate",
          cost: "₹50,000–₹2,00,000 (Government) | ₹1,00,000–₹4,00,000 (Private)"
        },
        {
          category: "Engineering (B.Tech)",
          cost: "₹40,000–₹1,20,000 (Government) | ₹1,00,000–₹3,50,000 (Private)"
        },
        {
          category: "Medical (MBBS)",
          cost: "₹50,000–₹2,00,000 (Government) | ₹5,00,000–₹15,00,000 (Private)"
        },
        {
          category: "MBA Programs",
          cost: "₹1,00,000–₹2,50,000 (Government) | ₹2,00,000–₹7,00,000 (Private)"
        }
      ]
    },
    {
      title: "Course Duration",
      rows: [
        {
          category: "Bachelor's Degree",
          cost: "3–4 years"
        },
        {
          category: "Master's Degree",
          cost: "2 years"
        },
        {
          category: "Medical (MBBS/BDS)",
          cost: "5–5.5 years"
        },
        {
          category: "Engineering (B.Tech)",
          cost: "4 years"
        },
        {
          category: "Diploma Programs",
          cost: "1–3 years"
        },
        {
          category: "PhD Programs",
          cost: "3–5 years"
        }
      ]
    }
  ],

  scholarshipsTitle: "Scholarships",
  scholarshipsIntro: "Admizz helps identify and apply for eligible scholarships.",
  scholarships: [
    {
      name: "ICCR Scholarships",
      details: "Full/partial scholarships for UG, PG, and PhD students from Nepal"
    },
    {
      name: "SAARC Scholarship Schemes",
      details: "Regional initiatives to support education among SAARC members"
    },
    {
      name: "University Merit Scholarships",
      details: "Provided by private/public universities based on academic scores"
    },
    {
      name: "COMPEX Scholarships",
      details: "Fully Funded Scholarship offered by the Indian Embassy exclusively for Nepalese Students"
    }
  ],

  universities: [
    { name: "IISc Bangalore", logo: "/images/universities/india/iisc-bangalore.webp" },
    { name: "University of Delhi", logo: "/images/universities/india/university-of-delhi.webp" },
    { name: "Jawaharlal Nehru University", logo: "/images/universities/india/jawaharlal-nehru-university.webp" },
    { name: "Banaras Hindu University", logo: "/images/universities/india/banaras-hindu-university.webp" },
    { name: "Anna University", logo: "/images/universities/india/anna-university.webp" },
    { name: "VIT", logo: "/images/universities/india/vit.webp" },
    { name: "Manipal Academy", logo: "/images/universities/india/manipal-academy.webp" },
    { name: "Symbiosis International University", logo: "/images/universities/india/symbiosis-international-university.webp" },
    { name: "Delhi Technological University", logo: "/images/universities/india/delhi-technological-university.webp" },
    { name: "KIIT University", logo: "/images/universities/india/kalinga-institute.webp" },
    { name: "RK University", logo: "/images/universities/india/rk-university.webp" },
  ],

  faqItems: [
    {
      question: "Do Nepalese students need a visa to study in India?",
      answer: "No. Due to the open-border policy between India and Nepal, Nepalese students do not require a visa. However, registration at the university is necessary."
    },
    {
      question: "Are Indian degrees valid in Nepal?",
      answer: "Yes. Degrees from Indian universities are recognized in Nepal and accepted for employment and further education."
    },
    {
      question: "What entrance exams are required for Indian universities?",
      answer: "Exams like JEE, NEET, CAT, CUET, or university-specific tests may be needed, depending on the course."
    },
    {
      question: "How much does it cost to study in India for a Nepali student?",
      answer: "Annual tuition may range from ₹50,000 to ₹2,00,000, depending on the course and institution. Living expenses are also lower than Western countries."
    },
    {
      question: "Are there scholarships for Nepali students?",
      answer: "Yes. ICCR, university-level, and merit-based scholarships are available for students from Nepal."
    },
    {
      question: "When should I apply to Indian universities?",
      answer: "Ideally, 3–6 months before your intended intake (March–April for July, October–November for January)."
    },
    {
      question: "Can I work part-time while studying in India?",
      answer: "Part-time jobs are allowed off-campus but subject to institutional policy and Indian labor laws. Most students take internships or assistantships."
    },
    {
      question: "Does Admizz help with India study admissions?",
      answer: "Yes. Admizz provides complete guidance for Nepali students — from university selection and document prep to scholarships and admission."
    }
  ],

  ctaTitle: "Take the First Step – Start Your Education in India",
  ctaContent: "India offers top-tier education, cultural connection, and cost-effective learning with hundreds of globally recognized institutions across medicine, engineering, business, IT, and humanities. Admizz helps you choose the right college/university, navigate entrance exams, secure scholarships, and complete admission formalities. Thousands of students from Nepal are already studying in India and building successful careers. Now it's your turn!"
};

const indiaTheme: CountryTheme = {
  primary: "#1C5D3F",
  primaryDeep: "#0B3D2E",
  accent: "#FF6B1A",
  accentSoft: "#FFB870",
  gold: "#C9A961",
  surfaceTint: "#FFF8F1",
  ink: "#1A1A1A",

  heroImage:
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=80",
  heroGradient:
    "linear-gradient(115deg, rgba(11,61,46,0.92) 0%, rgba(11,61,46,0.7) 45%, rgba(255,107,26,0.55) 100%)",

  showChakraDividers: true,
  dividerStyle: "filigree",
  heritagePattern: true,
  serifHeadings: true,
  showFlagStripeOnCards: true,
  benefitLandmarks: [
    "taj-mahal",
    "lotus-temple",
    "hawa-mahal",
    "india-gate",
    "mysore-palace",
    "red-fort",
  ],
  universitiesBackdrop: "gateway-of-india",
  ctaLandmarks: { left: "charminar", right: "victoria-memorial" },
  journeyStrip: {
    stats: [
      { value: "1500+", label: "Students successfully enrolled worldwide" },
      { value: "95%", label: "Student Visa Approval Rate with Expert Guidance" },
      { value: "$2M+", label: "In Scholarships Awarded to Our Students" },
    ],
  },
};

export default async function StudyInIndiaFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "india" });
  return (
    <>
      <NepalVariantTemplate
        data={pageData}
        blogPosts={blogPosts}
        theme={indiaTheme}
        customHero={
          <IndiaCinematicHero
            heading={pageData.heroHeading}
            subheading={pageData.heroSubheading}
            countryName={pageData.countryName}
          />
        }
        replaceWhySection={<IndiaWhyNarrative />}
        insertAfterIntakes={<IndiaCityMap />}
        replaceCostSection={
          <IndiaCostViz
            scholarshipsTitle={pageData.scholarshipsTitle}
            scholarshipsIntro={pageData.scholarshipsIntro}
            scholarships={pageData.scholarships}
          />
        }
      />
      <IndiaAnimations />
      <IndiaStickyMobileCTA />
    
{/* SEOAI:FAQ:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<script type=\"application/ld+json\">{\"@type\":\"FAQPage\",\"@context\":\"https://schema.org\",\"mainEntity\":[{\"name\":\"Do Nepali students need a visa to study in India?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"No, Nepali students do not require a traditional student visa to study in India due to the open-border policy.\",\"@type\":\"Answer\"}},{\"name\":\"What are the advantages of studying in India for Nepali students?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Studying in India offers advantages such as low tuition fees, cultural similarities, high-quality education, and no visa hassles. It's also very accessible for Nepali students.\",\"@type\":\"Answer\"}},{\"name\":\"What is the approximate annual tuition fee for Indian government engineering schools?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"The approximate annual tuition fee for one of India's top government engineering schools is ₹50,000.\",\"@type\":\"Answer\"}},{\"name\":\"Are there scholarships available for Nepali students studying in India?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Yes, over $2M in scholarships have been awarded to students, and various SAARC scholarships are available.\",\"@type\":\"Answer\"}},{\"name\":\"What is the process for Nepali students to enroll in Indian universities?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Nepali students can enroll simply by having a valid passport, crossing the border, and registering at the university upon admission.\",\"@type\":\"Answer\"}},{\"name\":\"How many Nepali students are currently studying in India?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"There are currently over 1,500 Nepali students enrolled across various campuses in India.\",\"@type\":\"Answer\"}}]}</script>" }} />{/* SEOAI:FAQ:END */}
</>
  );
}
