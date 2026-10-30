import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in New Zealand from Nepal - Admizz Education",
  description:
    "Study in New Zealand from Nepal: intakes, tuition, the Fee Paying Student Visa, work rights and the Post Study Work Visa, with help from Admizz Education in Kathmandu.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-newzealand-from-nepal",
  },
  openGraph: {
    title: "Study in New Zealand from Nepal - Admizz Education",
    description:
      "Study in New Zealand from Nepal: intakes, tuition, the Fee Paying Student Visa, work rights and the Post Study Work Visa, with help from Admizz Education in Kathmandu.",
    url: "https://admizzeducation.com/study-in-newzealand-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "New Zealand",
  countryCategorySlug: "new-zealand",
  heroHeading: "Study in New Zealand from Nepal",
  heroSubheading: "Course choice, applications and your Fee Paying Student Visa, handled with a counsellor at our Kathmandu office.",
  heroImage: "/images/hero/newzealand-hero.webp",
  quickFacts: [
    { label: "Intakes", value: "Feb · Jul" },
    { label: "Tuition from", value: "NZ$22,000 / yr" },
    { label: "Work in term", value: "25 hrs / week" },
    { label: "Post-study work", value: "Up to 3 years" },
    { label: "English", value: "IELTS 6.0+" },
  ],
  introTitle: "Study in New Zealand from Nepal",
  introContent:
    "New Zealand has eight state universities plus polytechnics and private institutes. Students can work part-time during study, and eligible graduates can stay to work afterwards.",
  whyStudyTitle: "Study, work part-time, then stay on to work",
  whyStudyIntro: "Why students from Nepal choose New Zealand.",
  highlightStats: [
    {
      value: "3",
      unit: "years",
      label: "Post Study Work Visa",
      note: "after a master's or doctorate studied in New Zealand. Bachelor's graduates get a visa matching their study length, up to 3 years.",
    },
    { value: "25", unit: "hours a week", label: "work during study" },
    { value: "NZ$20,000", unit: "a year", label: "living funds to show" },
  ],
  benefits: [
    {
      title: "Work while you study",
      description: "Up to 25 hours a week during study and full-time in scheduled holidays.",
    },
    {
      title: "Stay on to work",
      description: "The Post Study Work Visa lets eligible graduates work for any employer for up to 3 years.",
    },
    {
      title: "Lower PhD fees",
      description: "International PhD students living in New Zealand pay the same fees as local students.",
    },
    {
      title: "Quality-checked qualifications",
      description: "Courses are approved by NZQA or Universities New Zealand and recognised abroad.",
    },
  ],
  visaTitle: "Your Student visa, step by step",
  visaIntro: "You apply online for a Fee Paying Student Visa. 80% of applications are decided within 7 weeks.",
  visaRequirements: [
    { category: "Choose a course", details: "Pick a course at an approved education provider. We shortlist with you." },
    { category: "Offer of place", details: "Get your offer letter showing the course, length and fees." },
    { category: "Chest X-ray in Nepal", details: "With an INZ panel physician. Needed for stays over 6 months." },
    { category: "Police certificate", details: "From Nepal Police, if you are 17+ and will stay 24 months or more." },
    { category: "Apply online & pay fee", details: "On the Immigration New Zealand portal, with proof of funds and insurance." },
    { category: "Decision & eVisa", details: "Your visa is sent by email. Then we brief you before you fly." },
  ],
  visaDocuments: [
    "Valid passport",
    "Offer of place",
    "Proof of tuition fees paid",
    "Funds: NZ$20,000 per year",
    "Chest X-ray certificate",
    "Police certificate (if needed)",
    "Medical & travel insurance",
  ],
  intakesTitle: "When you can start",
  intakesIntro: "February has the widest choice of courses. Apply early.",
  intakes: [
    { intake: "February intake", months: "Apply August – November", details: "Main intake (Semester 1). Most courses." },
    { intake: "July intake", months: "Apply February – April", details: "Semester 2. Many courses, fewer than February." },
    { intake: "Other start dates", months: "Check with each provider", details: "Some polytechnics and institutes start courses year-round." },
  ],
  costTitle: "What a year in New Zealand costs",
  costIntro: "Typical tuition, plus the living-cost amount Immigration New Zealand asks you to show for your visa.",
  costTables: [
    {
      title: "Tuition per year",
      rows: [
        { category: "Bachelor's", cost: "NZ$22k – NZ$32k" },
        { category: "Master's", cost: "NZ$26k – NZ$37k" },
        { category: "PhD", cost: "NZ$6.5k – NZ$9k" },
      ],
    },
    {
      title: "Living & visa costs",
      rows: [
        { category: "Living funds", cost: "NZ$20,000 / yr" },
        { category: "Student visa fee", cost: "From NZ$850" },
        { category: "Post Study Work Visa fee", cost: "From NZ$1,670" },
      ],
    },
  ],
  costNote:
    "Tuition: typical ranges from Study with New Zealand; medicine and veterinary science cost more. Living funds and visa fees: Immigration New Zealand, checked October 2026.",
  scholarshipsTitle: "Funding you can apply for",
  scholarshipsIntro: "We check which of these you qualify for in your first consultation.",
  scholarships: [
    { name: "Manaaki New Zealand Scholarships", provider: "NZ Government (MFAT)", details: "Fully funded postgraduate study for eligible Nepali citizens." },
    { name: "International Student Excellence Scholarship", provider: "University of Auckland", details: "Up to NZ$10,000 off first-year tuition, based on merit." },
    { name: "PhD at domestic fees", provider: "NZ Government", details: "International PhD students in New Zealand pay local fee rates." },
    { name: "University awards", provider: "Universities", details: "Merit scholarships towards tuition at most universities." },
  ],
  universities: [
    { name: "University of Auckland", logo: "/images/universities/newzealand/university-of-auckland.webp" },
    { name: "University of Otago", logo: "/images/universities/newzealand/university-of-otago.webp" },
    { name: "Victoria University of Wellington", logo: "/images/universities/newzealand/victoria-university-of-wellington.webp" },
    { name: "University of Canterbury", logo: "/images/universities/newzealand/university-of-canterbury.webp" },
    { name: "Massey University", logo: "/images/universities/newzealand/massey-university.webp" },
    { name: "Lincoln University", logo: "/images/universities/newzealand/lincoln-university.webp" },
    { name: "Auckland University of Technology", logo: "/images/universities/newzealand/auckland-university-of-technology.webp" },
    { name: "Unitec Institute of Technology", logo: "/images/universities/newzealand/unitec-institute-of-technology.webp" },
    { name: "Eastern Institute of Technology", logo: "/images/universities/newzealand/eastern-institute-of-technology.webp" },
  ],

  faqItems: [
    {
      question: "Can I apply to study in New Zealand after +2 from Nepal?",
      answer:
        "Yes. After Grade 12 you can apply for a diploma or a bachelor's degree. Entry grades and English scores depend on the course.",
    },
    {
      question: "Is IELTS required to study in New Zealand?",
      answer:
        "Most providers ask for IELTS (usually 6.0 for bachelor's and 6.5 for postgraduate) or an accepted equivalent such as PTE or TOEFL.",
    },
    {
      question: "How much money do I need to show for the visa?",
      answer:
        "NZ$20,000 for each year of study for living costs, plus proof your tuition is paid. For courses under a year it is NZ$1,667 a month.",
    },
    {
      question: "Can I work while studying in New Zealand?",
      answer:
        "Yes. Eligible students can work up to 25 hours a week during study and full-time in scheduled holidays.",
    },
    {
      question: "How long is the Post Study Work Visa?",
      answer:
        "Up to 3 years, depending on your qualification and how long you studied in New Zealand. Master's and doctoral graduates can get 3 years.",
    },
    {
      question: "Do I need a medical or police certificate?",
      answer:
        "A chest X-ray from an INZ panel physician if you will stay over 6 months. A police certificate if you are 17+ and will stay 24 months or more.",
    },
    {
      question: "When should I start applying?",
      answer:
        "6 to 9 months before you want to start. Main intakes are February and July.",
    },
  ],

  ctaTitle: "Plan your New Zealand move with us",
  ctaContent: "Free first consultation with our New Zealand team, in person or on a call.",
};

export default async function StudyInNewZealandFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(
    postsByCategoryQuery,
    { categorySlug: "new-zealand" }
  );
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}
