import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in France from Nepal - Admizz Education",
  description:
    "Study in France from Nepal with Admizz \u2013 expert guidance for top universities, visa support & a smooth journey to global education.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-france-from-nepal",
  },
  openGraph: {
    title: "Study in France from Nepal - Admizz Education",
    description:
      "Study in France from Nepal with Admizz \u2013 expert guidance for top universities, visa support & a smooth journey to global education.",
    url: "https://admizzeducation.com/study-in-france-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/france.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "France",
  countryCategorySlug: "france",
  heroHeading: "Build a Bright Future in One of the World's Top Study Destinations",
  heroSubheading: "Study in France from Nepal with world-class universities, affordable tuition, scholarships, cultural exposure, and excellent career opportunities abroad.",

  introTitle: "Your Pathway to a Premier Education in France",
  introContent: "France has emerged as a preferred destination for Nepalese students seeking quality education and European career prospects. The country features globally recognized universities, reasonably priced public institution tuition, and numerous programs taught in English across Business, Engineering, Arts, Science, and Hospitality disciplines. Admizz Education provides comprehensive support including university selection, scholarship guidance, visa assistance, and pre-departure preparation for students planning to study in France.",

  whyStudyTitle: "Why Study in France from Nepal?",
  benefits: [
    {
      title: "Top-Ranked Universities",
      description: "France is home to prestigious institutions and Grandes Écoles that offer globally respected degrees."
    },
    {
      title: "Affordable Tuition",
      description: "Public universities offer some of the lowest tuition fees in Europe, even for international students."
    },
    {
      title: "English-Taught Programs",
      description: "Thousands of bachelor's and master's courses are available in English — especially in business, engineering, and tech."
    },
    {
      title: "Multicultural Environment",
      description: "France offers a vibrant student life, with many services and discounts for international students."
    },
    {
      title: "Post-Study Work Rights",
      description: "Stay up to 2 years in France after graduation to explore career opportunities."
    },
    {
      title: "Scholarships for Nepalese Students",
      description: "French and EU-funded scholarships help reduce financial burden."
    }
  ],

  visaTitle: "France Student Visa Requirements for Nepalese Students",
  visaIntro: "Nepalese students pursuing studies longer than 3 months require a Long-Stay Student Visa (VLS-TS).",
  visaRequirements: [
    {
      category: "Valid Passport",
      details: "At least 3 months beyond stay"
    },
    {
      category: "Campus France Registration",
      details: "Mandatory for visa processing"
    },
    {
      category: "University Acceptance Letter",
      details: "From recognized French institution"
    },
    {
      category: "Proof of Accommodation",
      details: "Booking confirmation or housing letter"
    },
    {
      category: "Financial Proof",
      details: "€615/month via bank statement or sponsor"
    },
    {
      category: "Insurance",
      details: "Medical & travel coverage up to €30,000"
    },
    {
      category: "Academic Documents",
      details: "Transcripts, certificates, CV, SOP"
    },
    {
      category: "Passport-Size Photos",
      details: "Recent, per visa guidelines"
    },
    {
      category: "Visa Fee Receipt",
      details: "Approx. €50–€99"
    },
    {
      category: "Visa Application Form",
      details: "Available at france-visas.gouv.fr"
    }
  ],
  visaNote: "Visa application submission occurs at VFS Global Kathmandu following Campus France approval.",

  intakesTitle: "France Intakes for Nepalese Students",
  intakes: [
    {
      intake: "Fall",
      months: "September – October (Primary intake)"
    },
    {
      intake: "Spring",
      months: "January – February (Limited programs)"
    }
  ],
  intakesNote: "Advisory: Begin applications 6–9 months before intended intake.",

  testTitle: "Language & IELTS Requirements",
  testRequirements: [
    {
      test: "IELTS",
      score: "6.0–6.5 for most programs"
    },
    {
      test: "Other Accepted Tests",
      score: "TOEFL, PTE, Duolingo (varies by institution)"
    }
  ],
  testNote: "While French isn't mandatory for English-taught courses, basic French proficiency supports daily life and employment prospects.",

  costTitle: "Cost of Studying in France from Nepal",
  costIntro: "France ranks among Europe's most economical study destinations. Public institution tuition receives government subsidization, significantly lowering costs compared to alternative countries. Students additionally benefit from affordable healthcare and housing assistance programs.",
  costTables: [
    {
      title: "Estimated Annual Expenses for Nepalese Students",
      rows: [
        {
          category: "Public University Tuition (UG)",
          cost: "€170 – €600/year"
        },
        {
          category: "Public University Tuition (PG)",
          cost: "€250 – €700/year"
        },
        {
          category: "Private Institutions",
          cost: "€3,000 – €10,000/year"
        },
        {
          category: "Living Expenses",
          cost: "€8,000 – €12,000/year"
        },
        {
          category: "Accommodation (Monthly)",
          cost: "€200 – €600 depending on city"
        },
        {
          category: "Health Insurance",
          cost: "Around €300/year"
        },
        {
          category: "Transportation & Misc.",
          cost: "€50 – €100/month"
        }
      ]
    }
  ],
  costNote: "Tip for Nepalese Students: CAF (French Housing Assistance) may reduce monthly rent by up to 35%.",

  scholarshipsTitle: "Scholarships for Nepalese Students",
  scholarshipsIntro: "France provides several scholarship opportunities:",
  scholarships: [
    {
      name: "Charpak Scholarship",
      details: "Offered by French Embassy for bachelor's and master's degrees"
    },
    {
      name: "Eiffel Excellence Scholarship",
      details: "Government-funded for outstanding master's and PhD students"
    },
    {
      name: "Erasmus+",
      details: "EU-funded for joint degree programs"
    },
    {
      name: "Campus France Merit Scholarships",
      details: "Based on academic performance"
    },
    {
      name: "University-specific awards",
      details: "Based on academic performance or financial need"
    }
  ],

  universities: [
    { name: "Sorbonne University", logo: "/images/universities/france/sorbonne-university.webp" },
    { name: "Universit\u00E9 PSL", logo: "/images/universities/france/universite-psl.svg" },
    { name: "\u00C9cole Polytechnique", logo: "/images/universities/france/ecole-polytechnique.webp" },
    { name: "Sciences Po", logo: "/images/universities/france/sciences-po.webp" },
    { name: "University of Paris-Saclay", logo: "/images/universities/france/university-of-paris-saclay.webp" },
    { name: "Universit\u00E9 Grenoble Alpes", logo: "/images/universities/france/universite-grenoble-alpes.webp" },
    { name: "Aix-Marseille University", logo: "/images/universities/france/aix-marseille-university.webp" },
    { name: "Universit\u00E9 de Strasbourg", logo: "/images/universities/france/universite-de-strasbourg.webp" },
    { name: "Universit\u00E9 de Bordeaux", logo: "/images/universities/france/universite-de-bordeaux.webp" },
    { name: "Universit\u00E9 de Lille", logo: "/images/universities/france/universite-de-lille.webp" },
  ],

  faqItems: [
    {
      question: "Can I study in France without knowing French?",
      answer: "Yes. Many universities offer full-time programs in English, particularly at the postgraduate level."
    },
    {
      question: "Do I need IELTS to study in France from Nepal?",
      answer: "Yes, most English-taught programs require IELTS or equivalent test."
    },
    {
      question: "How long can I stay in France after graduation?",
      answer: "Students may apply for post-study work visas valid for up to 2 years after graduation."
    },
    {
      question: "What is the average cost of studying in France?",
      answer: "Public university tuition runs approximately €2,770–€3,770 annually. Living expenses span €700–€1,200 monthly."
    },
    {
      question: "Are scholarships available for Nepalese students?",
      answer: "Yes. Charpak, Eiffel, and Erasmus+ scholarships accept Nepalese applicants."
    },
    {
      question: "Can I work part-time while studying?",
      answer: "Yes. International students may work up to 964 hours annually (averaging 20 hours weekly)."
    },
    {
      question: "When should I start the application process?",
      answer: "Begin 6–9 months before intended intake for admissions and visa processing."
    },
    {
      question: "Does Admizz help with French student visa applications?",
      answer: "Absolutely. Admizz provides complete documentation and guidance for France visa applications."
    }
  ],

  ctaTitle: "Start Your France Journey with Admizz Today",
  ctaContent: "France offers unmatched advantages for Nepalese students including academic prestige, innovation, lifestyle, and career opportunities across business, science, fashion, hospitality, and arts fields. Admizz specializes in comprehensive support covering university selection, SOP writing, Campus France procedures, visa interview preparation, and accommodation arrangement. With Admizz, you're not just applying — you're preparing to succeed."
};

export default async function StudyInFranceFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "france" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
