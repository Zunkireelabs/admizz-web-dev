import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData, CountryTheme } from "@/components/ui/NepalVariantTemplate";
import UKCinematicHero from "@/components/uk/UKCinematicHero";
import UKWhyNarrative from "@/components/uk/UKWhyNarrative";
import UKCityMap from "@/components/uk/UKCityMap";
import UKCostViz from "@/components/uk/UKCostViz";
import UKStickyMobileCTA from "@/components/uk/UKStickyMobileCTA";
import CrownDivider from "@/components/uk/CrownDivider";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in UK from Nepal - Admizz Education",
  description:
    "Study in UK from Nepal with Admizz Education – Your complete guide to UK education, visas, costs & careers. Expert guidance for Nepali students.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-uk-from-nepal",
  },
  openGraph: {
    title: "Study in UK from Nepal - Admizz Education",
    description:
      "Study in UK from Nepal with Admizz Education – Your complete guide to UK education, visas, costs & careers. Expert guidance for Nepali students.",
    url: "https://admizzeducation.com/study-in-uk-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "UK",
  countryCategorySlug: "uk",
  heroHeading: "Study in UK from Nepal",
  heroSubheading:
    "From university selection to visa approval, we guide Nepali students through every step of their UK education journey. Join 2,000+ students who achieved their British university dreams with Admizz Education.",

  introTitle: "Study in UK from Nepal with Expert Guidance",
  introContent:
    "The UK offers a perfect balance of quality education, affordability, and career growth for Nepali students. From globally recognised degrees to 2-year post-study work visas, the UK remains one of the top destinations for Nepali students seeking world-class education and international career opportunities.",

  whyStudyTitle: "Why Study in the UK from Nepal?",
  whyStudyIntro:
    "The UK offers a perfect balance of quality education, affordability, and career growth for Nepali students.",
  benefits: [
    {
      title: "Globally Recognised Degrees",
      description:
        "UK universities rank among the world's top institutions. Degrees recognized worldwide by employers. 4 UK universities in QS World Top 10.",
    },
    {
      title: "1-Year Master's Programs",
      description:
        "Save time and money with shorter duration. Start your career faster than other countries. Intensive, industry-focused curriculum.",
    },
    {
      title: "Graduate Route Visa - 2 Years",
      description:
        "Work in UK for 2 years after graduation. 3 years for PhD graduates. Gain valuable international experience.",
    },
    {
      title: "Multicultural & Safe",
      description:
        "Diverse community from 200+ countries. Safe cities with excellent transport. Strong Nepali student community.",
    },
    {
      title: "Part-Time Work Allowed",
      description:
        "Work 20 hours/week during term. Full-time work during holidays. Earn £10-15/hour minimum wage.",
    },
    {
      title: "Quality Assurance",
      description:
        "All universities rigorously quality-checked. Qualifications recognized globally. High employability after graduation.",
    },
  ],

  visaTitle: "UK Student Visa Process – Step by Step",
  visaIntro:
    "Admizz Education provides end-to-end UK visa support with 95% success rate.",
  visaRequirements: [
    {
      category: "1. Choose Course",
      details: "Select your program and receive offer from a UKVI-approved university",
    },
    {
      category: "2. Receive Offer",
      details: "Accept offer and meet conditions set by the university",
    },
    {
      category: "3. Pay Deposit",
      details: "Secure your place with tuition deposit payment",
    },
    {
      category: "4. Get CAS",
      details: "Receive Confirmation of Acceptance for Studies from the university",
    },
    {
      category: "5. Prepare Docs",
      details: "Gather all required documents including financial proof and English proficiency",
    },
    {
      category: "6. Submit Application",
      details: "Complete online visa application with all supporting documents",
    },
    {
      category: "7. Biometrics",
      details: "Attend VFS appointment in Kathmandu for biometric submission",
    },
    {
      category: "8. Visa Approval",
      details: "Decision within 3-4 weeks. Priority services available for faster processing.",
    },
  ],

  intakesTitle: "Key Intakes in the UK",
  intakesIntro:
    "Understanding UK intakes helps you plan early and avoid last-minute rejections.",
  intakes: [
    {
      intake: "September (Main Intake)",
      months: "Application: November – May",
      details:
        "Most popular intake. Maximum universities & course options. Higher scholarship availability.",
    },
    {
      intake: "January (Alternative)",
      months: "Application: July – October",
      details:
        "Good alternative if you miss September. Limited course options. Ideal for gap year students.",
    },
    {
      intake: "May (Limited)",
      months: "Select universities only",
      details:
        "Suitable for diploma and selected master's programs. Smaller student cohorts.",
    },
  ],

  costTitle: "Cost of Studying in the UK from Nepal",
  costIntro:
    "Planning to study in UK requires a clear understanding of the overall costs involved.",
  costTables: [
    {
      title: "Tuition Fees (Per Year)",
      rows: [
        {
          category: "Undergraduate",
          cost: "£10,000 – £20,000",
        },
        {
          category: "Postgraduate",
          cost: "£12,000 – £25,000",
        },
        {
          category: "MBA / Professional",
          cost: "£20,000 – £35,000+",
        },
      ],
    },
    {
      title: "Additional Costs (Per Year)",
      rows: [
        {
          category: "Living Expenses",
          cost: "£9,000 – £12,000",
        },
        {
          category: "Health Surcharge (NHS)",
          cost: "£470",
        },
      ],
    },
  ],
  costNote:
    "Total costs vary by city. London is higher; smaller cities are more budget-friendly.",

  scholarshipsTitle: "Scholarships for Nepalese Students",
  scholarshipsIntro:
    "The UK offers a wide range of funding opportunities to reduce financial stress.",
  scholarships: [
    {
      name: "Chevening Scholarships",
      details:
        "Fully funded master's degree for future leaders from Nepal. Covers tuition, living costs, and travel.",
    },
    {
      name: "Commonwealth Scholarships",
      details:
        "Full funding for postgraduate students from developing Commonwealth nations. Focus on development-related subjects.",
    },
    {
      name: "GREAT Scholarships",
      details:
        "Minimum £10,000 offered by UK universities & British Council. Available across multiple fields of study.",
    },
    {
      name: "Saltire Scholarships",
      details:
        "£8,000 for science, tech, and renewable energy studies at Scottish universities only.",
    },
    {
      name: "University Awards",
      details:
        "£2,000 - £20,000 based on merit and financial need. Examples include Manchester and Edinburgh Global scholarships.",
    },
  ],

  universities: [
    { name: "Buckinghamshire New University", logo: "/images/universities/uk/Buckinghamshire-New-University.webp" },
    { name: "BPP University", logo: "/images/universities/uk/BPP-University.webp" },
    { name: "Coventry University", logo: "/images/universities/uk/Coventry-University.webp" },
    { name: "Health Sciences University", logo: "/images/universities/uk/Health-Sciences-University.webp" },
    { name: "Ravensbourne University London", logo: "/images/universities/uk/Ravensbourne-University-London.webp" },
    { name: "University of Sunderland", logo: "/images/universities/uk/University-of-Sunderland.webp" },
    { name: "University of East London", logo: "/images/universities/uk/University-of-East-London.webp" },
    { name: "Ulster University", logo: "/images/universities/uk/Ulster-University.webp" },
    { name: "University of Greenwich", logo: "/images/universities/uk/University-of-Greenwich.webp" },
    { name: "The University of Law", logo: "/images/universities/uk/The-University-of-Law.webp" },
    { name: "University of Roehampton", logo: "/images/universities/uk/University-of-Roehampton.webp" },
    { name: "University of Worcester", logo: "/images/universities/uk/University-of-Worcester.webp" },
    { name: "University of West London", logo: "/images/universities/uk/University-of-West-London.webp" },
    { name: "University of the West of Scotland", logo: "/images/universities/uk/University-of-the-West-of-Scotland.webp" },
    { name: "York St John University", logo: "/images/universities/uk/York-St-John-University.webp" },
  ],

  faqItems: [
    {
      question: "How long does the UK student visa process take?",
      answer:
        "Usually 3-4 weeks after biometric submission from VFS Global Kathmandu. Priority services are available for faster processing.",
    },
    {
      question: "Can I work while studying in the UK?",
      answer:
        "Yes, 20 hours/week during term time and full-time during holidays. The UK minimum wage is £10-15/hour.",
    },
    {
      question: "Do I need IELTS for UK study?",
      answer:
        "Yes, most universities require IELTS (6.0-7.0). Some accept alternatives like PTE or may waive if you studied in English medium.",
    },
    {
      question: "What is the post-study work visa duration?",
      answer:
        "2-year Graduate Route Visa for Bachelor's/Master's graduates, and 3 years for PhD students to work in the UK.",
    },
    {
      question: "Can I apply with a study gap?",
      answer:
        "Yes, many UK universities accept gaps of 5-10 years with proper justification through work experience or personal development.",
    },
    {
      question: "What are the living expenses in the UK?",
      answer:
        "£9,000-£12,000/year outside London, £15,600/year in London including accommodation, food, and transport.",
    },
  ],

  ctaTitle: "Ready to Begin Your Study Abroad Journey?",
  ctaContent:
    "Our expert consultants are here to guide you every step of the way.",
};

const ukTheme: CountryTheme = {
  primary: "#1E3A8A",
  primaryDeep: "#0A1F44",
  accent: "#C8102E",
  accentSoft: "#E63946",
  gold: "#B08D57",
  surfaceTint: "#F5F3EE",
  ink: "#1A1A1A",

  heroImage:
    "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=2000&q=80",
  heroEyebrow: "Pursue your British education",
  heroGradient:
    "linear-gradient(115deg, rgba(10,31,68,0.92) 0%, rgba(10,31,68,0.7) 45%, rgba(200,16,46,0.55) 100%)",

  dividerStyle: "crown",
  showFlagStripeOnCards: true,
  flagColors: ["#C8102E", "#FFFFFF", "#012169"],
  serifHeadings: true,
  heritagePattern: true,
  towerBridgeTransition: true,
  crownTabIcon: true,
  benefitLandmarks: [
    "big-ben",
    "tower-bridge",
    "oxford-spires",
    "kings-college",
    "edinburgh-castle",
    "manchester-town-hall",
  ],
  universitiesBackdrop: "oxford-spires",
  universitiesEyebrow: "Renowned British Institutions",
  ctaLandmarks: { left: "big-ben", right: "tower-bridge" },
  journeyStrip: {
    stats: [
      { value: "2000+", label: "Nepali students placed in UK universities" },
      { value: "97%", label: "UK Student Visa Approval Rate" },
      { value: "£3M+", label: "In Scholarships Secured for Our Students" },
    ],
    eyebrow: "Study Across the United Kingdom",
    accentColor: "#C8102E",
    accentSoftColor: "#E63946",
    ringColor: "#B08D57",
    bgGradient: "linear-gradient(180deg, #F5F3EE 0%, #FFFFFF 100%)",
    cities: [
      {
        name: "London",
        landmark: "Big Ben",
        image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Edinburgh",
        landmark: "Edinburgh Castle",
        image: "https://images.unsplash.com/photo-1546617605-31567bc8c7d3?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Oxford",
        landmark: "Radcliffe Camera",
        image: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Cambridge",
        landmark: "King's College",
        image: "https://images.unsplash.com/photo-1504817343863-5092a923803e?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Manchester",
        landmark: "Town Hall",
        image: "https://images.unsplash.com/photo-1577310528320-fb74a8d5a99e?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
};

export default async function StudyInUKFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(
    postsByCategoryQuery,
    { categorySlug: "uk" }
  );
  return (
    <>
      <NepalVariantTemplate
        data={pageData}
        blogPosts={blogPosts}
        theme={ukTheme}
        customHero={
          <>
            <UKCinematicHero
              heading={pageData.heroHeading}
              subheading={pageData.heroSubheading}
              countryName={pageData.countryName}
            />
            <CrownDivider />
          </>
        }
        replaceWhySection={<UKWhyNarrative />}
        insertAfterIntakes={
          <>
            <CrownDivider />
            <UKCityMap />
            <CrownDivider />
          </>
        }
        replaceCostSection={
          <UKCostViz
            scholarshipsTitle={pageData.scholarshipsTitle}
            scholarshipsIntro={pageData.scholarshipsIntro}
            scholarships={pageData.scholarships}
          />
        }
      />
      <UKStickyMobileCTA />
    </>
  );
}
