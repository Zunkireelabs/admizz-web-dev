import Link from "next/link";
import type { Metadata } from "next";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import CTAForm from "@/components/ui/CTAForm";
import CountryCard from "@/components/ui/CountryCard";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
import TestimonialsBento from "@/components/ui/TestimonialsBento";

export const metadata: Metadata = {
  title: "Career Counseling for International Students - Admizz Education",
  description:
    "Admizz Education's career counseling helps you choose the right country, course, and university based on your real academic goals and career plans.",
  alternates: {
    canonical: "https://admizzeducation.com/career-counseling-for-international-students",
  },
  openGraph: {
    title: "Career Counseling for International Students - Admizz Education",
    description:
      "Admizz Education's career counseling helps you choose the right country, course, and university based on your real academic goals and career plans.",
    url: "https://admizzeducation.com/career-counseling-for-international-students",
    siteName: "Admizz Education",
    images: ["/images/og/admizzn.webp"],
    type: "website",
  },
};

const stats = [
  { value: "1500+", label: "Students Successfully Enrolled Worldwide" },
  { value: "100+", label: "Prestigious Institutions in Our Global Network" },
  { value: "95%", label: "Student Visa Approval Rate with Expert Guidance" },
  { value: "$2M+", label: "in Scholarships Awarded to Our Students" },
];

const benefits = [
  {
    title: "One-on-One Profile Evaluation",
    description:
      "We start with your real academic background, budget, and career goals — not a generic checklist — to figure out which countries and courses actually fit you.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Course & University Shortlisting",
    description:
      "We narrow down universities and courses based on your eligibility, budget, and long-term career direction — not just brand-name recognition.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    title: "Post-Study Career Path Guidance",
    description:
      "We factor in each destination's post-study work rights and job market when helping you choose a country and course, not just admission chances.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "SOP & Career Goal Statement Support",
    description:
      "Your Statement of Purpose needs to connect your background to a clear career direction. Our counselors help you articulate that honestly and clearly.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Ongoing Guidance, Not a One-Time Session",
    description:
      "Career counseling continues through your application and admission decisions — as new offers come in, we help you weigh them against your goals.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Free Initial Counseling",
    description:
      "Your first career counseling session — profile evaluation, country options, and course suggestions — is free, with no obligation.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
    question: "What is career counseling for international students?",
    answer:
      "It's guidance that connects your academic background and long-term career goals to a specific country, course, and university choice — rather than just processing a generic study abroad application.",
  },
  {
    question: "Is career counseling for students in Nepal free?",
    answer:
      "Yes, Admizz Education offers free initial career counseling, including profile evaluation, country options, and course suggestions.",
  },
  {
    question: "How is career counseling different from general study abroad counseling?",
    answer:
      "Study abroad counseling covers the application process itself. Career counseling focuses specifically on which country, course, and university actually align with your long-term career goals and the post-study job market.",
  },
  {
    question: "Do you help me choose a course, or just a country?",
    answer:
      "Both. We look at your academic background and career goals to shortlist courses and universities together, since the right course matters as much as the right country.",
  },
  {
    question: "Do you consider job opportunities after graduation, not just admission?",
    answer:
      "Yes — post-study work rights and job market conditions in your target country are part of how we help you choose where and what to study.",
  },
  {
    question: "Can career counseling help with my Statement of Purpose?",
    answer:
      "Yes, our counselors help you connect your academic background and career goals into a clear, honest Statement of Purpose as part of your application.",
  },
  {
    question: "Do I need to know what I want to study before booking a session?",
    answer:
      "No — many students come to us undecided. That's exactly what the initial profile evaluation is for.",
  },
  {
    question: "How can I book a free career counseling session with Admizz Education?",
    answer:
      "You can reach out through our website, visit our office in Kathmandu or Birgunj, or call +977-9802728444 to book a free counseling session.",
  },
];

export default async function CareerCounselingForInternationalStudentsPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "career-planning" });

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-navy via-blue-dark to-blue-royal text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-3 text-yellow">
                Career Counseling
              </p>
              <h1 className="text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight">
                Career Counseling for International Students
              </h1>
              <p className="mt-4 text-[15px] md:text-base leading-relaxed opacity-85">
                Choose the right country, course, and university based on your
                real goals — with free guidance from Admizz Education
              </p>
              <Link
                href="/register"
                className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-10 py-3.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-6"
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

      {/* ===== BENEFITS ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3">
            Career-First Study Abroad Counseling
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Choosing where and what to study abroad is a career decision, not
            just an admissions process. Admizz Education's counselors start
            with your goals, not a generic country list.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white border border-border-light rounded-[10px] p-7 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-royal/10 rounded-[10px] flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-dark leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3">
            Explore Career Paths by Destination
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-3xl mx-auto mb-12">
            Job markets and post-study work rights differ by country. Explore
            your options for each of the destinations Admizz Education
            supports.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} name={dest.name} image={dest.image} href={dest.href} description={dest.description} />
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

      <StudyAbroadInsights posts={blogPosts} countryName="Career Planning" categorySlug="career-planning" />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-navy via-blue-dark to-blue-royal text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[32px] font-bold leading-tight">
            Ready to Plan Your Career Abroad?
          </h2>
          <p className="mt-4 text-[15px] text-white/90 leading-relaxed">
            Our expert consultants are here to guide you every step of the way.
          </p>
          <Link
            href="/register"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-10 py-3.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Book Free Counseling
          </Link>
        </div>
      </section>
    </main>
  );
}
