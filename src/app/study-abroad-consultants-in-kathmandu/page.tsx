import Link from "next/link";
import type { Metadata } from "next";
import CountryCard from "@/components/ui/CountryCard";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
import CTAForm from "@/components/ui/CTAForm";
import TestimonialsBento from "@/components/ui/TestimonialsBento";

export const metadata: Metadata = {
  title: "Study Abroad Consultants in Kathmandu - Admizz Education",
  description:
    "Trusted Study Abroad Consultants in Kathmandu helping Nepali students study in Australia, Canada, UK, USA & more with expert guidance.",
  alternates: {
    canonical: "https://admizzeducation.com/study-abroad-consultants-in-kathmandu",
  },
  openGraph: {
    title: "Study Abroad Consultants in Kathmandu - Admizz Education",
    description:
      "Trusted Study Abroad Consultants in Kathmandu helping Nepali students study in Australia, Canada, UK, USA & more with expert guidance.",
    url: "https://admizzeducation.com/study-abroad-consultants-in-kathmandu",
    siteName: "Admizz Education",
    images: ["/images/og/australia-scaled.webp"],
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "1500+", label: "Students Successfully Enrolled" },
  { value: "100+", label: "Partner Institutions Worldwide" },
  { value: "95%", label: "Student Visa Approval Rate" },
  { value: "$2M+", label: "Scholarships Awarded" },
];

const services = [
  {
    title: "Career Counselling & Profile Evaluation",
    description:
      "Our counsellors carefully analyze your academic records, financial status, and career interests to recommend the best countries, courses, and universities that match your goals.",
    icon: (
      <svg className="w-10 h-10 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "University & Course Selection",
    description:
      "We help you choose from top-ranked universities across the world based on your preferred course, tuition budget, and future career opportunities.",
    icon: (
      <svg className="w-10 h-10 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a23.54 23.54 0 0 0-2.688 2.18M4.26 10.147A23.625 23.625 0 0 1 12 8.443a23.625 23.625 0 0 1 7.74 1.704m0 0a23.54 23.54 0 0 1 2.688 2.18M12 3v2.25" />
      </svg>
    ),
  },
  {
    title: "Application & SOP Guidance",
    description:
      "We assist with university applications, Statement of Purpose (SOP), Letters of Recommendation (LOR), and resume building to create a strong application profile.",
    icon: (
      <svg className="w-10 h-10 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Scholarship & Financial Aid",
    description:
      "We identify and help you apply for available scholarships, bursaries, and financial aid programs to make studying abroad more affordable.",
    icon: (
      <svg className="w-10 h-10 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Visa Assistance & Documentation",
    description:
      "Our visa experts ensure that all paperwork is accurate, complete, and submitted on time. We also provide interview preparation for smooth visa approval.",
    icon: (
      <svg className="w-10 h-10 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Accommodation & Travel Assistance",
    description:
      "We assist in finding safe and affordable student accommodations, book your flights, and provide guidance for international travel.",
    icon: (
      <svg className="w-10 h-10 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Pre-Departure & Post-Arrival Support",
    description:
      "We organize detailed pre-departure briefings and provide ongoing support after arrival, including part-time job guidance and student networking tips.",
    icon: (
      <svg className="w-10 h-10 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
  },
  {
    title: "Test Preparation",
    description:
      "Our dedicated test preparation department in Kathmandu offers world-class training for IELTS, TOEFL, PTE, SAT, GRE, GMAT with certified trainers.",
    icon: (
      <svg className="w-10 h-10 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a23.54 23.54 0 0 0-2.688 2.18M4.26 10.147A23.625 23.625 0 0 1 12 8.443a23.625 23.625 0 0 1 7.74 1.704m0 0a23.54 23.54 0 0 1 2.688 2.18M12 3l.722 2.164M12 3l-.722 2.164M15.75 15a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
];

const destinations = [
  { name: "Study in Australia", image: "/images/destinations/aus1.webp", href: "/study-in-australia", description: "Globally ranked universities, excellent research facilities, and post-study work opportunities." },
  { name: "Study in Canada", image: "/images/destinations/canada1.webp", href: "/study-in-canada", description: "Affordable education, multicultural communities, and permanent residency pathways." },
  { name: "Study in France", image: "/images/destinations/france1.webp", href: "/study-in-france", description: "Famous for arts, fashion, business, and technology programs." },
  { name: "Study in India", image: "/images/destinations/india1.webp", href: "/study-in-india", description: "Affordable education options in a culturally diverse environment for international students." },
  { name: "Study in New Zealand", image: "/images/destinations/newzealand1.webp", href: "/study-in-newzealand", description: "Safe, welcoming, and focused on hands-on, career-oriented education." },
  { name: "Study in South Korea", image: "/images/destinations/usa1.webp", href: "/study-in-south-korea", description: "Advanced technology-driven education paired with cultural richness." },
  { name: "Study in the UK", image: "/images/destinations/uk1.webp", href: "/study-in-the-uk", description: "Home to prestigious, centuries-old institutions and globally recognized degrees." },
  { name: "Study in the USA", image: "/images/destinations/usa1.webp", href: "/study-in-the-usa", description: "The top destination for research, innovation, and global careers." },
];

const whyChoose = [
  {
    title: "End-to-End Assistance",
    description: "From counselling to pre-departure, we manage the entire process seamlessly.",
    icon: (
      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    title: "Personalized Counselling",
    description: "One-on-one sessions designed to understand your profile, goals, and budget.",
    icon: (
      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    title: "University Partnerships",
    description: "Access to globally ranked universities and reputed institutions worldwide.",
    icon: (
      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
  },
  {
    title: "Transparent Process",
    description: "No hidden charges, no false promises -- only ethical, reliable guidance.",
    icon: (
      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    title: "Experienced Visa Experts",
    description: "95% visa success rate with accurate documentation and interview prep.",
    icon: (
      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Scholarship Guidance",
    description: "Assistance in applying for merit-based and need-based scholarships.",
    icon: (
      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .982-3.172M12 3.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" />
      </svg>
    ),
  },
  {
    title: "Dedicated Test Prep Unit",
    description: "Professional IELTS, TOEFL, PTE, SAT, GRE, and GMAT coaching for higher success rates.",
    icon: (
      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Post-Arrival Support",
    description: "Continued assistance even after you reach your study destination.",
    icon: (
      <svg className="w-8 h-8 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const testimonialData = [
  {
    name: "Niraj Bhattarai",
    initial: "N",
    color: "#1E6DEB",
    university: "University of West of Scotland",
    originFlag: "NP",
    destFlag: "GB",
    route: "Nepal → UK",
    text: "From university selection to visa approval, Admizz Education provided exceptional support and made my journey to the UK effortless. I highly recommend them to anyone looking for a trustworthy study abroad partner.",
  },
  {
    name: "Yousuf Abdirahman Mohamed",
    initial: "Y",
    color: "#E8430C",
    university: "Kalinga Institute of Industrial Technology",
    originFlag: "SO",
    destFlag: "IN",
    route: "Somalia → India",
    text: "I appreciated your unlimited help for my MBA career. It was very tough but I gained a very solid educational background. Thanks Admizz!",
  },
  {
    name: "Basant Khadka",
    initial: "B",
    color: "#34A853",
    university: "Weber State University",
    originFlag: "NP",
    destFlag: "US",
    route: "Nepal → USA",
    text: "The journey to college can be overwhelming, but Admizz Education made applying to Weber State University effortless. Thanks to their guidance.",
  },
  {
    name: "Satyam Jaiswal",
    initial: "S",
    color: "#7C3AED",
    university: "University of Greenwich",
    originFlag: "NP",
    destFlag: "GB",
    route: "Nepal → UK",
    text: "Admizz Education made my dream of studying in the UK a reality with their expert guidance and seamless support. Their team ensured every step of my application visa process was smooth and stress-free.",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Which countries can Nepali students study abroad?",
    answer:
      "Nepali students can study abroad in Australia, Canada, UK, USA, New Zealand, France, India, and South Korea for undergraduate, postgraduate, and professional courses.",
  },
  {
    question: "What are the requirements to study abroad from Nepal?",
    answer:
      "You need academic transcripts, English proficiency scores (IELTS, TOEFL, or PTE), passport, admission offer, and proof of funds for visa approval.",
  },
  {
    question: "How can study abroad consultants in Kathmandu help me?",
    answer:
      "Consultants guide students with career counselling, university selection, application assistance, scholarship guidance, test preparation, and visa processing.",
  },
  {
    question: "Do I need IELTS or TOEFL to study abroad?",
    answer:
      "Most universities require IELTS, TOEFL, or PTE scores. We provide expert test preparation coaching to help you meet admission requirements.",
  },
  {
    question: "What is the best country to study abroad from Nepal?",
    answer:
      "The top destinations are Australia, Canada, UK, and USA, offering high-quality education, scholarships, and post-study work opportunities.",
  },
  {
    question: "Can I study abroad without a high IELTS score?",
    answer:
      "Some universities offer conditional admission or English preparatory courses. Consultants help you select programs that match your language proficiency.",
  },
  {
    question: "How do I apply for scholarships to study abroad?",
    answer:
      "We help identify merit-based, need-based, and university-specific scholarships, assist in documentation, and guide you through the application process.",
  },
  {
    question: "How long does it take to get a student visa from Nepal?",
    answer:
      "Visa processing usually takes 2-12 weeks, depending on the country, documentation completeness, and interview schedules.",
  },
  {
    question: "Do study abroad consultants provide pre-departure support?",
    answer:
      "Yes, they offer pre-departure orientation, travel guidance, accommodation assistance, and tips for adjusting to the new country.",
  },
  {
    question: "Is it expensive to study abroad from Nepal?",
    answer:
      "Costs vary by destination and university. Many countries offer scholarships, part-time work options, and financial aid, making international education more affordable.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function StudyAbroadConsultantsKathmanduPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "nepal" });

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-navy via-blue-dark to-blue-royal text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-3 text-yellow">
                Study Abroad Consultants in Kathmandu
              </p>
              <h1 className="text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight">
                Achieve Your Dream to Study Abroad from Nepal with Professional
                Guidance
              </h1>
              <p className="mt-4 text-[15px] md:text-base text-white/80 leading-relaxed">
                Are you planning to study abroad from Nepal? We are one of the most
                trusted and result-oriented study abroad consultants in Kathmandu,
                helping students achieve their dreams of studying in world-class
                universities.
              </p>
              <Link
                href="/register"
                className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                Book Free Counseling
              </Link>
            </div>
            <div className="hidden md:block lg:w-[472px] ml-auto">
              <CTAForm title="Book Your Free Consultation" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-14 border-b border-border-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-4"
              >
                <p className="text-3xl md:text-4xl font-bold text-navy">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-gray-dark">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Comprehensive Study Abroad Solutions
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            From career counselling to post-arrival support, we provide
            end-to-end services to make your study abroad journey smooth and
            successful.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-border-light rounded-[10px] p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Top Study Abroad Destinations for Nepali Students
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Explore the most popular countries where Nepali students pursue
            higher education with world-class universities and career
            opportunities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} name={dest.name} image={dest.image} href={dest.href} description={dest.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-6">
            Leading Overseas Education Consultants in Kathmandu
          </h2>
          <div className="space-y-4 text-[15px] text-gray-dark leading-relaxed">
            <p>
              We are one of the most experienced and result-oriented study
              abroad consultancies in Kathmandu, committed to guiding students
              through every stage of their study abroad journey.
            </p>
            <p>
              Our mission is to make global education accessible, affordable,
              and transparent for every Nepali student. With a team of certified
              counsellors, experienced trainers, and visa professionals, we
              ensure you receive reliable advice and top-notch service.
            </p>
            <p>
              Over the years, we have successfully placed thousands of students
              in leading universities across Australia, Canada, the UK, the USA,
              and Europe. Our approach focuses on personalized counselling,
              ethical practices, and complete transparency.
            </p>
            <p>
              We believe in more than sending you abroad -- we empower you to
              build a successful global career.
            </p>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/register"
              className="inline-block bg-blue-royal text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
            >
              Start Your Application with Admizz
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Why Choose Admizz Education
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Thousands of students trust us because we deliver results with
            integrity, expertise, and personalized care at every step.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-border-light rounded-[10px] p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-navy/10 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQ
        items={faqItems}
        sidebar
      />

      <TestimonialsBento
        testimonials={testimonialData}
        videoId="AW3Zmubc-tU"
        featuredStudent={{ name: "Ashok Upreti", subtitle: "Bachelor in Computer Science" }}
      />

      <StudyAbroadInsights posts={blogPosts} countryName="Study Abroad" categorySlug="nepal" />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-navy text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[32px] font-bold leading-tight">
            Let&apos;s Begin Your Global Journey Today!
          </h2>
          <p className="mt-4 text-[15px] text-white/90 leading-relaxed max-w-xl mx-auto">
            Talk to our study abroad experts and take the first step toward your
            dream university. Free counselling, expert guidance, and complete
            support from Kathmandu to your destination.
          </p>
          <Link
            href="/register"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-10 py-3.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Book Free Counseling
          </Link>
        </div>
      </section>
    
{/* SEOAI:EXPANDEDCONTENT:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \"<div class=\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\\\">\\n  <section class=\\\"gap-2.5\\\">\\n    <h2 class=\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\">Choosing the Right Student Visa Consultancy in Kathmandu</h2>\\n    <div class=\\\"text-sm md:text-base mb-3 opacity-90\\\"><p class=\\\"text-sm md:text-base mb-3 opacity-90\\\">When selecting a student visa consultancy in Kathmandu, it's crucial to consider how well they align with your study abroad aspirations. Admizz Education stands out with a high student visa approval rate and comprehensive services tailored to each student's needs, particularly in comparison to local competitors.</p><div class=\\\"overflow-x-auto\\\"><table class=\\\"w-full border-collapse\\\"><thead><tr><th class=\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\">Feature</th><th class=\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\">Alternative</th><th class=\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\">This Option</th></tr></thead><tbody><tr><td class=\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\">Student Visa Approval Rate</td><td class=\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\">Variable, often lower rates.</td><td class=\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\">95%</td></tr><tr><td class=\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\">Comprehensive Support</td><td class=\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\">Limited support, typically focused only on visa application.</td><td class=\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\">End-to-end services including pre-departure and post-arrival support.</td></tr></tbody></table></div></div>\\n  </section>\\n</div>\" }} />\n<div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\">\n  <section class=\"gap-2.5\">\n    <h2 class=\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\">Last Updated</h2>\n    <div class=\"text-sm md:text-base mb-3 opacity-90\"><p class=\"text-sm md:text-base mb-3 opacity-90\">This page was last updated on 2026-09-19.</p></div>\n  </section>\n</div>" }} />{/* SEOAI:EXPANDEDCONTENT:END */}
</main>
  );
}
