import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
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
  countryName: "the UK",
  countryCategorySlug: "uk",
  heroHeading: "Study in the UK from Nepal",
  heroSubheading: "Course choice, applications and your Student visa, handled with a counsellor at our Kathmandu office.",
  heroImage: "/images/hero/uk-hero.webp",
  quickFacts: [
    { label: "Intakes", value: "Sep · Jan · May" },
    { label: "Tuition from", value: "£11,000 / yr" },
    { label: "Master's", value: "1 year" },
    { label: "Graduate visa", value: "18 months" },
    { label: "English", value: "IELTS 6.0+" },
  ],
  introTitle: "Study in the UK from Nepal",
  introContent:
    "UK degrees are recognised worldwide, most master's take one year, and graduates can stay to work on the Graduate visa.",
  whyStudyTitle: "A shorter degree that still opens doors",
  whyStudyIntro: "Why so many students from Nepal pick the UK.",
  highlightStats: [
    {
      value: "18",
      unit: "months",
      label: "Graduate visa",
      note: "to work in the UK after a bachelor's or master's (applications from 1 January 2027). PhD graduates get 3 years.",
    },
    { value: "12", unit: "months", label: "for most master's" },
    { value: "20", unit: "hours a week", label: "work during term" },
  ],
  benefits: [
    {
      title: "1-year master's",
      description: "Most taught master's take 12 months, so you pay a year less in fees and rent.",
    },
    {
      title: "Quality-checked universities",
      description: "Every university is regulated and regularly reviewed by UK bodies.",
    },
    {
      title: "Work while you study",
      description: "Up to 20 hours a week in term on degree courses (10 below degree level), full-time in holidays.",
    },
    {
      title: "Degrees recognised worldwide",
      description: "Accepted by employers and universities in Nepal and abroad.",
    },
  ],
  visaTitle: "Your Student visa, step by step",
  visaIntro: "Most decisions arrive within 3 weeks of your biometrics appointment.",
  visaRequirements: [
    { category: "Choose a course", details: "Pick a course at a UKVI-licensed university. We shortlist with you." },
    { category: "Offer, deposit & CAS", details: "Accept your offer, pay the deposit and receive your CAS number." },
    { category: "TB test in Kathmandu", details: "At a UKVI-approved clinic. The certificate goes with your application." },
    { category: "Apply online & pay fees", details: "Visa form, visa fee and the immigration health surcharge." },
    { category: "Biometrics in Kathmandu", details: "Photo and fingerprints at the visa application centre." },
    { category: "Decision & eVisa", details: "Your visa is digital, in your UKVI account. Then we brief you before you fly." },
  ],
  visaDocuments: [
    "Valid passport",
    "CAS from your university",
    "Bank statements held 28 days",
    "Academic transcripts",
    "IELTS or PTE result",
    "TB test certificate",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "September has the most courses and scholarships. Apply early.",
  intakes: [
    { intake: "September intake", months: "Apply November – May", details: "Main intake. Most courses and scholarships." },
    { intake: "January intake", months: "Apply July – October", details: "Good option if you miss September." },
    { intake: "May intake", months: "Check with each university", details: "Selected courses only." },
  ],
  costTitle: "What a year in the UK costs",
  costIntro: "Typical tuition, plus the living-cost amount UKVI asks you to show for your visa.",
  costTables: [
    {
      title: "Tuition per year",
      rows: [
        { category: "Undergraduate", cost: "£11k – £20k" },
        { category: "Postgraduate", cost: "£12k – £25k" },
        { category: "MBA", cost: "£20k – £35k+" },
      ],
    },
    {
      title: "Living & visa costs",
      rows: [
        { category: "London", cost: "£1,529 / mo" },
        { category: "Outside London", cost: "£1,171 / mo" },
        { category: "Health surcharge", cost: "£776 / yr" },
      ],
    },
  ],
  costNote: "Living costs: UKVI funds requirement for up to 9 months. Source: GOV.UK, checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "We check which of these you qualify for in your first consultation.",
  scholarships: [
    { name: "Chevening", provider: "UK Government", details: "Fully funded master's for future leaders." },
    { name: "Commonwealth", provider: "UK Government", details: "Fully funded development-related postgraduate study." },
    { name: "GREAT Scholarships", provider: "British Council", details: "From £10,000 towards tuition, many subjects." },
    { name: "Saltire", provider: "Scottish Government", details: "£8,000 for science and technology in Scotland." },
    { name: "University awards", provider: "Universities", details: "£2,000 – £20,000, based on merit or need." },
  ],
  students: [
    { name: "Aashis Kuswar", image: "/events/assets/alumni/Aashis_Kuswar_2026_UK.jpeg", caption: "UK · 2026 intake" },
    { name: "Anshu Kumari Mahato", image: "/events/assets/alumni/AnshuKumariMahato_2025_UK.jpg", caption: "UK · 2025 intake" },
    { name: "Bikash Sah Teli", image: "/events/assets/alumni/Bikash_Sah_Teli_2026_UK.jpeg", caption: "UK · 2026 intake", imagePosition: "center 75%" },
    { name: "Biky Sah Teli", image: "/events/assets/alumni/Biky_Sah_Teli_2026_UK.jpeg", caption: "UK · 2026 intake" },
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
        "Usually about 3 weeks after your biometrics appointment in Kathmandu. Priority services can be faster.",
    },
    {
      question: "Can I work while studying in the UK?",
      answer:
        "Yes, 20 hours/week during term time on degree-level courses (10 hours below degree level) and full-time during holidays.",
    },
    {
      question: "Do I need IELTS for UK study?",
      answer:
        "Yes, most universities require IELTS (6.0-7.0). Some accept alternatives like PTE or may waive if you studied in English medium.",
    },
    {
      question: "What is the post-study work visa duration?",
      answer:
        "The Graduate Route Visa gives Bachelor's/Master's graduates 18 months (applications from 1 January 2027), and PhD graduates 3 years to work in the UK.",
    },
    {
      question: "Can I apply with a study gap?",
      answer:
        "Yes, many UK universities accept gaps of 5-10 years with proper justification through work experience or personal development.",
    },
    {
      question: "What are the living expenses in the UK?",
      answer:
        "UKVI requires you to show £1,529 per month in London or £1,171 per month outside London, for up to 9 months, to cover accommodation, food, and transport.",
    },
  ],

  ctaTitle: "Plan your UK move with us",
  ctaContent: "Free first consultation with our UK team, in person or on a call.",
};

export default async function StudyInUKFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "uk" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
