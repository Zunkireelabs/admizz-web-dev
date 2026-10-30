import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in Canada from Nepal - Admizz Education",
  description:
    "Study in Canada from Nepal with Admizz Education – colleges and universities, study permit steps, costs, intakes and PGWP work rights for Nepali students.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-canada-from-nepal",
  },
  openGraph: {
    title: "Study in Canada from Nepal - Admizz Education",
    description:
      "Study in Canada from Nepal with Admizz Education – colleges and universities, study permit steps, costs, intakes and PGWP work rights for Nepali students.",
    url: "https://admizzeducation.com/study-in-canada-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "Canada",
  countryCategorySlug: "canada",
  heroHeading: "Study in Canada from Nepal",
  heroSubheading: "College or university choice, your study permit and biometrics, handled with a counsellor at our Kathmandu office.",
  heroImage: "/images/hero/canada-hero.webp",
  quickFacts: [
    { label: "Intakes", value: "Sep · Jan · May" },
    { label: "Avg. grad tuition", value: "CAD 24,000 / yr" },
    { label: "Work in term", value: "24 hrs / week" },
    { label: "PGWP", value: "Up to 3 years" },
    { label: "English", value: "IELTS / PTE" },
  ],
  introTitle: "Study in Canada from Nepal",
  introContent:
    "Canada offers college diplomas and university degrees, lets you work 24 hours a week during term, and graduates can stay to work on a Post-Graduation Work Permit.",
  whyStudyTitle: "Study, work and stay on after you graduate",
  whyStudyIntro: "Why so many students from Nepal pick Canada.",
  highlightStats: [
    {
      value: "3",
      unit: "years",
      label: "Post-Graduation Work Permit",
      note: "for master's graduates (programmes of 8 months or more) and programmes of 2+ years. Shorter programmes get up to the length of the course.",
    },
    { value: "24", unit: "hours a week", label: "off-campus work in term" },
    { value: "CAD 23,448", label: "living funds to show for one year" },
  ],
  benefits: [
    {
      title: "Work after you graduate",
      description: "The PGWP gives up to 3 years of open work, and Canadian work experience can help a later PR application.",
    },
    {
      title: "Work while you study",
      description: "Up to 24 hours a week off campus during term, and unlimited hours in scheduled breaks.",
    },
    {
      title: "Master's without a PAL",
      description: "Since January 2026, master's and PhD students at public institutions don't need a provincial attestation letter.",
    },
    {
      title: "College or university",
      description: "Choose a practical college diploma or a degree. College PGWPs need an eligible field of study.",
    },
  ],
  visaTitle: "Your study permit, step by step",
  visaIntro: "You apply online. Biometrics and your medical exam are done in Kathmandu.",
  visaRequirements: [
    { category: "Get your letter of acceptance", details: "From a Designated Learning Institution (DLI). We shortlist and apply with you." },
    { category: "Get a PAL if you need one", details: "Most bachelor's and college students need one. Master's and PhD at public DLIs don't." },
    { category: "Medical exam in Kathmandu", details: "With an IRCC panel physician. Required for applicants from Nepal." },
    { category: "Apply online & pay fees", details: "In your IRCC account: CAD 150 study permit fee plus CAD 85 biometrics." },
    { category: "Biometrics in Kathmandu", details: "Photo and fingerprints at the VFS Global Canada visa centre, within 30 days of your letter." },
    { category: "Decision & approval letter", details: "Your visa goes in your passport and the study permit is issued when you land. We brief you before you fly." },
  ],
  visaDocuments: [
    "Valid passport",
    "Letter of acceptance from a DLI",
    "PAL, if your programme needs one",
    "Proof of funds: tuition + CAD 23,448",
    "Immigration medical exam",
    "Academic transcripts",
    "IELTS, PTE or TOEFL result",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "September has the most programmes. Apply early, because PAL spaces are limited.",
  intakes: [
    { intake: "Fall intake (September)", months: "Apply October – March", details: "Main intake. Most programmes and scholarships." },
    { intake: "Winter intake (January)", months: "Apply May – September", details: "Good option if you miss September." },
    { intake: "Summer intake (May)", months: "Check with each institution", details: "Selected programmes, mostly at colleges." },
  ],
  costTitle: "What a year in Canada costs",
  costIntro: "Average tuition for international students, plus the living funds IRCC asks you to show.",
  costTables: [
    {
      title: "Tuition per year",
      rows: [
        { category: "Undergraduate (avg)", cost: "CAD 41,746" },
        { category: "Graduate (avg)", cost: "CAD 24,028" },
        { category: "Ontario undergrad (avg)", cost: "CAD 49,802" },
      ],
    },
    {
      title: "Living & visa costs",
      rows: [
        { category: "Living funds (1 person)", cost: "CAD 23,448 / yr" },
        { category: "Study permit fee", cost: "CAD 150" },
        { category: "Biometrics fee", cost: "CAD 85" },
      ],
    },
  ],
  costNote:
    "Tuition: Statistics Canada 2025/2026 university averages for international students. Living funds (outside Quebec, applications from 1 September 2026) and fees: IRCC, canada.ca. Checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "We check which of these you qualify for in your first consultation.",
  scholarships: [
    { name: "Lester B. Pearson Scholarship", provider: "University of Toronto", details: "Covers tuition, books and residence for 4 years. Your school must nominate you." },
    { name: "Ontario Graduate Scholarship", provider: "Province of Ontario & universities", details: "CAD 5,000 a term, up to CAD 15,000 a year. Limited places for international students." },
    { name: "Entrance scholarships", provider: "Universities & colleges", details: "One-off or renewable awards based on your grades." },
    { name: "Graduate funding", provider: "Universities", details: "Research master's and PhD offers often include teaching or research assistant pay." },
  ],
  universities: [
    { name: "University of Toronto", logo: "/images/universities/canada/university-of-toronto.webp" },
    { name: "McGill University", logo: "/images/universities/canada/mcgill-university.webp" },
    { name: "University of British Columbia", logo: "/images/universities/canada/university-of-british-columbia.webp" },
    { name: "University of Alberta", logo: "/images/universities/canada/university-of-alberta.webp" },
    { name: "McMaster University", logo: "/images/universities/canada/mcmaster-university.webp" },
    { name: "University of Waterloo", logo: "/images/universities/canada/university-of-waterloo.webp" },
    { name: "Queen's University", logo: "/images/universities/canada/queens-university.webp" },
    { name: "Simon Fraser University", logo: "/images/universities/canada/simon-fraser-university.webp" },
    { name: "Dalhousie University", logo: "/images/universities/canada/dalhousie-university.webp" },
    { name: "Western University", logo: "/images/universities/canada/western-university.webp" },
  ],

  faqItems: [
    {
      question: "Can I work while studying in Canada?",
      answer: "Yes, up to 24 hours a week off campus during term and unlimited hours during scheduled breaks.",
    },
    {
      question: "Is IELTS compulsory for Canada?",
      answer:
        "Most institutions ask for IELTS, PTE, TOEFL or Duolingo. For the PGWP you will also need a language test: CLB 7 after a degree, CLB 5 after a college programme.",
    },
    {
      question: "Do I need a PAL?",
      answer:
        "Most bachelor's, diploma and certificate students need a provincial attestation letter. Master's and PhD students at public institutions don't, since January 2026.",
    },
    {
      question: "How much money do I need to show?",
      answer:
        "Your first year's tuition plus CAD 23,448 for living costs (one person, outside Quebec, applications from 1 September 2026), plus travel.",
    },
    {
      question: "How long does a Canada study permit take?",
      answer:
        "Processing starts once IRCC has your biometrics, and times change often. Check IRCC's processing-times tool and apply as early as you can.",
    },
    {
      question: "Can studying in Canada lead to PR?",
      answer:
        "It can. Work experience on a PGWP can count towards permanent residence programmes, but PR is not guaranteed.",
    },
    {
      question: "Should I choose a college or a university?",
      answer:
        "Colleges offer shorter, practical diplomas; universities offer degrees. For a college PGWP, your programme must be in an eligible field of study.",
    },
  ],

  ctaTitle: "Plan your Canada move with us",
  ctaContent: "Free first consultation with our Canada team, in person or on a call.",
};

export default async function StudyInCanadaFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "canada" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
