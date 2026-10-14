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
import { DESTINATION_COMPARE_HEADERS, DESTINATION_COMPARE_ROWS, DESTINATION_COMPARE_SOURCES } from "@/data/destination-compare";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in UK from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in the UK from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-uk-from-nepal",
  },
  openGraph: {
    title: "Study in UK from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in the UK from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
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
    "The UK offers a perfect balance of quality education, affordability, and career growth for Nepali students. From globally recognised degrees to the Graduate visa that lets you work in the UK after you finish, the UK remains one of the top destinations for Nepali students seeking world-class education and international career opportunities.",

  quickAnswer:
    "To study in the UK from Nepal you need an offer and a CAS from a licensed university, the £558 student visa fee, the £776-a-year health surcharge, and funds of £1,171 a month outside London (£1,529 in London) for up to 9 months, held for 28 days. These funds rise to £1,203 and £1,570 for applications from November 30, 2026. Most degrees ask for IELTS 6.0-7.0.",
  lastChecked: "October 2026",
  dateModified: "2026-10-12",
  guideTabLabel: "Requirements",
  guideSections: [
    {
      id: "requirements",
      title: "UK Admission Requirements for Nepali Students",
      intro:
        "Each university sets its own entry grades, so the figures below are a starting point. We confirm the exact requirement for your course before you apply.",
      table: {
        headers: ["Level", "Academic requirement", "English requirement"],
        rows: [
          [
            "Undergraduate",
            "Completed +2 (Grade 12) or equivalent. Required grades and subjects vary by university and course.",
            "CEFR B2 for degree level (IELTS 6.0-6.5 is typical)",
          ],
          [
            "Postgraduate (taught)",
            "Bachelor's degree. Many universities set a minimum percentage or CGPA, which varies.",
            "CEFR B2 for degree level (IELTS 6.5 is typical)",
          ],
          [
            "Foundation or diploma",
            "Completed +2 or equivalent. Often a route into a degree.",
            "CEFR B1 for courses below degree level",
          ],
        ],
      },
      note: "The UK government sets the minimum English level for the visa: B2 for degree level and above, B1 below degree level. A university can ask for more.",
      links: [
        { label: "UK visa English requirement", href: "/answers/uk-student-visa-english-requirement" },
      ],
    },
    {
      id: "documents",
      title: "UK Student Visa Documents Checklist",
      intro: "Prepare these before you start the online visa application.",
      bullets: [
        "Valid passport and your Confirmation of Acceptance for Studies (CAS) number from the university.",
        "Proof of funds: the full amount held for 28 consecutive days, with the last day within 31 days of your application.",
        "English proof: an approved Secure English Language Test result, or a university assessment of your English where allowed.",
        "Tuberculosis (TB) test certificate from an approved clinic. Required for stays of 6 months or more, and Nepal is on the list. The certificate is valid for 6 months.",
        "Academic documents used for your offer, and an ATAS certificate if your postgraduate subject needs one.",
        "Parental consent if you are 16 or 17.",
      ],
      note: "You can apply up to 6 months before your course starts, and a decision usually takes about 3 weeks from outside the UK.",
      links: [
        { label: "Visa fee", href: "/answers/uk-student-visa-fee-nepal" },
        { label: "Bank balance", href: "/answers/uk-student-visa-bank-balance-nepal" },
        { label: "TB test", href: "/answers/uk-tb-test-nepal" },
        { label: "Full cost breakdown", href: "/uk-student-visa-cost-2027" },
      ],
    },
    {
      id: "cost-npr",
      title: "UK Student Visa Costs in Nepali Rupees",
      intro:
        "The main official amounts, converted to NPR for planning. You pay the visa fee and surcharge in pounds, so the rupee amount depends on the exchange rate on the day.",
      table: {
        headers: ["Cost", "Amount in GBP", "Approx. in NPR"],
        rows: [
          ["Student visa application fee", "£558", "NPR 1,14,400"],
          ["Immigration Health Surcharge, per year", "£776", "NPR 1,59,100"],
          ["Living funds outside London, 9 months (applications before November 30, 2026)", "£10,539", "NPR 21,60,500"],
          ["Living funds in London, 9 months (applications before November 30, 2026)", "£13,761", "NPR 28,21,000"],
          ["Living funds outside London, 9 months (applications from November 30, 2026)", "£10,827", "NPR 22,19,500"],
          ["Living funds in London, 9 months (applications from November 30, 2026)", "£14,130", "NPR 28,96,700"],
        ],
      },
      note: "NPR amounts are approximate, at NPR 205 per £1 (Nepal Rastra Bank selling rate, checked October 12, 2026) and rounded. The funds are money you must hold for 28 days, not a fee you pay. Check the Nepal Rastra Bank rate before you transfer money.",
      links: [
        { label: "Full cost breakdown", href: "/uk-student-visa-cost-2027" },
        { label: "Bank balance", href: "/answers/uk-student-visa-bank-balance-nepal" },
      ],
    },
    {
      id: "work-rights",
      title: "Work Rights and the Graduate Route",
      bullets: [
        "During study: degree-level students can usually work up to 20 hours a week in term time and full-time in official holidays. Your visa conditions are final.",
        "After study: the Graduate Route lets Bachelor's and Master's graduates stay and work for 18 months when they apply on or after January 1, 2027. Applications before that date get 2 years.",
        "PhD graduates get 3 years on the Graduate Route.",
        "Dependants: since January 1, 2024, only postgraduate research students and government-sponsored students on courses longer than 6 months can bring dependants.",
      ],
      links: [
        { label: "Dependants rules", href: "/uk-student-visa-dependants-rules-2027" },
        { label: "UK scholarships for Nepali students", href: "/uk-scholarships-for-Nepalese-students-2027" },
      ],
    },
    {
      id: "rankings",
      title: "Top UK Universities by QS World Ranking",
      intro:
        "Four UK universities sit in the global top 10 of the QS World University Rankings 2027. Rankings are one factor; fit, fees and entry requirements matter just as much.",
      table: {
        headers: ["University", "QS World Ranking 2027"],
        rows: [
          ["Imperial College London", "=2"],
          ["University of Oxford", "4"],
          ["University of Cambridge", "6"],
          ["University College London (UCL)", "=8"],
          ["University of Edinburgh", "35"],
          ["King's College London", "37"],
          ["University of Manchester", "=40"],
        ],
      },
      note: "Ranks are from QS, June 2026. An equals sign (=) means the university shares that rank. The partner universities Admizz works with are listed further down this page.",
    },
    {
      id: "compare",
      title: "UK vs the USA, Canada, Australia and Germany",
      intro:
        "How the UK compares on visa fees, the funds you must show and what you can do after study, using official figures as checked in October 2026.",
      table: { headers: DESTINATION_COMPARE_HEADERS, rows: DESTINATION_COMPARE_ROWS },
      note: "The UK's one-year master's degrees shorten your study time and your total cost. Compare your own budget and work plans before you decide.",
      links: [
        { label: "USA", href: "/study-in-usa-from-nepal" },
        { label: "Canada", href: "/study-in-canada-from-nepal" },
        { label: "Australia", href: "/study-in-australia" },
      ],
    },
  ],
  sourcesTitle: "Official sources",
  sources: [
    { label: "GOV.UK: Student visa", href: "https://www.gov.uk/student-visa" },
    { label: "GOV.UK: Graduate visa", href: "https://www.gov.uk/graduate-visa" },
    { label: "Nepal Rastra Bank: foreign exchange rates", href: "https://www.nrb.org.np/forex/" },
    { label: "QS World University Rankings", href: "https://www.topuniversities.com/world-university-rankings" },
    { label: "Chevening Scholarships", href: "https://www.chevening.org/" },
    ...DESTINATION_COMPARE_SOURCES.filter((x) => !x.href.includes("gov.uk")),
  ],

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
      title: "Graduate Visa After Your Degree",
      description:
        "Stay and work in the UK after a bachelor's or master's: 2 years if you apply by 31 December 2026, 18 months if you apply from 1 January 2027. 3 years for PhD graduates.",
    },
    {
      title: "Multicultural & Safe",
      description:
        "Diverse community from 200+ countries. Safe cities with excellent transport. Strong Nepali student community.",
    },
    {
      title: "Part-Time Work Allowed",
      description:
        "You may be able to work on a Student visa. How much depends on what you study and whether it is term time, and your visa states your exact limit.",
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
      details: "Book and attend your biometrics appointment at a visa application centre",
    },
    {
      category: "8. Visa Approval",
      details: "A decision usually takes about 3 weeks from outside the UK. Priority services may be available for faster processing.",
    },
  ],

  intakesTitle: "Key Intakes in the UK",
  intakesIntro:
    "Understanding UK intakes helps you plan early and avoid last-minute rejections.",
  intakes: [
    {
      intake: "Michaelmas Term — September (Main Intake)",
      months: "Application: November – May",
      details:
        "The traditional British autumn term. Most popular intake — maximum universities, course options, and scholarship availability.",
    },
    {
      intake: "Hilary / Lent Term — January (Alternative)",
      months: "Application: July – October",
      details:
        "The winter–spring term. A solid alternative if you miss Michaelmas. Slightly limited course options. Ideal for gap-year students.",
    },
    {
      intake: "Trinity Term — May (Limited)",
      months: "Select universities only",
      details:
        "The shorter summer term. Suitable for diploma and selected master's programs. Smaller, more intimate cohorts.",
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
          category: "Living costs to show for the visa (outside London, up to 9 months)",
          cost: "£1,171 a month = £10,539",
        },
        {
          category: "Living costs to show for the visa (London, up to 9 months)",
          cost: "£1,529 a month = £13,761",
        },
        {
          category: "Student visa application fee",
          cost: "£558",
        },
        {
          category: "Immigration Health Surcharge (NHS)",
          cost: "£776 per year",
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
        "GOV.UK says a decision usually takes about 3 weeks when you apply from outside the UK. Count from your biometrics appointment at VFS Global Kathmandu, and apply up to 6 months before your course starts. Priority services may be available.",
    },
    {
      question: "Can I work while studying in the UK?",
      answer:
        "You may be able to. How much you can work depends on what you are studying and whether it is term time, and your visa states your exact limit. You cannot be self-employed or work as a professional sportsperson or sports coach.",
    },
    {
      question: "Do I need IELTS for UK study?",
      answer:
        "Yes, most universities require IELTS (6.0-7.0). Some accept alternatives like PTE or may waive if you studied in English medium.",
    },
    {
      question: "How long is the UK Graduate visa after study?",
      answer:
        "For bachelor's and master's graduates it is 2 years if you apply on or before 31 December 2026 and 18 months if you apply on or after 1 January 2027. PhD graduates get 3 years. Most students starting in 2027 will graduate after the change, so plan for 18 months.",
    },
    {
      question: "Can I apply with a study gap?",
      answer:
        "Many UK universities will consider a study gap if you can explain it, for example with work experience or other activity. How long a gap is acceptable varies by university and course, so check before you apply.",
    },
    {
      question: "What are the living expenses in the UK?",
      answer:
        "For a visa application you must show £1,171 a month outside London or £1,529 a month in London, for up to 9 months (£10,539 or £13,761), plus any unpaid tuition. These rise to £1,203 and £1,570 from November 30, 2026. Actual spending varies by city.",
    },
    {
      question: "How much is the UK student visa fee?",
      answer:
        "The UK student visa costs £558 when you apply from outside the UK. You also pay the Immigration Health Surcharge of £776 per year of your stay, up front, as part of the application. Both are charged for each person who joins you.",
    },
    {
      question: "How much bank balance is needed for a UK student visa?",
      answer:
        "You need your first-year tuition not yet paid, plus £1,171 a month outside London or £1,529 a month in London for up to 9 months. Hold the money for 28 consecutive days, ending within 31 days of applying. The monthly amounts rise from November 30, 2026.",
    },
    {
      question: "Do Nepali students need a TB test for the UK?",
      answer:
        "Yes. Nepal is on the UK's TB test list, and the test is required if you will stay 6 months or more. Take it at an approved clinic. The certificate is valid for 6 months, so book the test close to your visa application.",
    },
    {
      question: "When should I apply for a UK student visa?",
      answer:
        "You can apply up to 6 months before your course starts, once you have your CAS. For a September start, apply to universities well before that, since most visa decisions take about 3 weeks. Starting early leaves time for the TB test and funds.",
    },
  ],

  relatedLinks: [
    { label: "Study in the UK", href: "/study-in-the-uk", description: "universities, admission and visa overview" },
    { label: "Chevening scholarship guide for Nepali students", href: "/chevening-scholarship-complete-guide-for-nepali-students", description: "fully funded UK master's" },
    { label: "Total cost of studying in the UK from Nepal", href: "/total-cost-studying-uk-from-nepal-2027" },
    { label: "UK student visa from Nepal", href: "/uk-student-visa-from-nepal" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "UK Graduate visa cut to 18 months from 2027", href: "/uk-graduate-visa-18-months-from-2027-nepali-students", description: "what it means for students starting in 2027" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "Test preparation", href: "/test-prep", description: "IELTS and PTE coaching" },
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

  dividerStyle: "uk-alternating",
  showFlagStripeOnCards: true,
  flagColors: ["#C8102E", "#FFFFFF", "#012169"],
  serifHeadings: true,
  heritagePattern: true,
  towerBridgeTransition: true,
  crownTabIcon: true,
  dropCapIntro: true,
  ctaCrownOrnament: true,
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
