import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ServiceCard from "@/components/ui/ServiceCard";
import CTAForm from "@/components/ui/CTAForm";
import CountryCard from "@/components/ui/CountryCard";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
import TestimonialsBento from "@/components/ui/TestimonialsBento";

export const metadata: Metadata = {
  title: "Study Abroad Consultancy in Nepal - Admizz Education",
  description:
    "Top education consultancy in Nepal offering expert guidance for studying abroad. Trusted by students for global admissions success.",
  alternates: {
    canonical: "https://admizzeducation.com/study-abroad-consultancy-in-nepal",
  },
  openGraph: {
    title: "Study Abroad Consultancy in Nepal - Admizz Education",
    description:
      "Top education consultancy in Nepal offering expert guidance for studying abroad. Trusted by students for global admissions success.",
    url: "https://admizzeducation.com/study-abroad-consultancy-in-nepal",
    siteName: "Admizz Education",
    type: "website",
  },
};

const stats = [
  {
    icon: "/images/icons/user.webp",
    value: "1500+",
    label: "Students Successfully Enrolled Worldwide",
  },
  {
    icon: "/images/icons/online-learning.webp",
    value: "100+",
    label: "Prestigious Institutions in Our Global Network",
  },
  {
    icon: "/images/icons/excellence.webp",
    value: "95%",
    label: "Student Visa Approval Rate with Expert Guidance",
  },
  {
    icon: "/images/icons/scholarship-108.webp",
    value: "$2M+",
    label: "In Scholarships Awarded to Our Students",
  },
];

const services = [
  {
    icon: "/images/icons/consult-108.webp",
    title: "Consult, Search, Find & Apply",
    description:
      "Browse programs from leading institutions worldwide. Get personalized guidance to identify the right course and university for your goals.",
  },
  {
    icon: "/images/icons/scholarship-108.webp",
    title: "Scholarship Assistance",
    description:
      "Discover funding opportunities to lower costs. Our experts help you identify and apply for scholarships tailored to your profile.",
  },
  {
    icon: "/images/icons/visa-108.webp",
    title: "Visa & Immigration Guidance",
    description:
      "Get expert support for smooth transitions. Navigate the student visa application process with step-by-step documentation support.",
  },
  {
    icon: "/images/icons/accomodation-108.webp",
    title: "Accommodation & Post-Arrival Support",
    description:
      "Find housing and local resources easily. Settle into your new country with confidence from accommodation to local orientation.",
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

export default async function StudyAbroadConsultancyNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "study-abroad" });

  return (
    <main>
      {/* ===== 1. HERO ===== */}
      <section className="bg-gradient-to-r from-navy to-blue-dark text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-3 text-yellow">
                Nepal&apos;s Trusted Study Abroad Partner
              </p>
              <h1 className="text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight">
                Study Abroad Consultancy in Nepal
              </h1>
              <p className="mt-4 text-[15px] md:text-base text-white/90 leading-relaxed">
                Expert guidance for Nepali students to secure admissions at top
                universities in the USA, UK, Australia, Canada, and beyond.
              </p>
              <Link
                href="/register"
                className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                Start Your Journey Now
              </Link>
            </div>
            <div className="hidden md:block lg:w-[472px] ml-auto">
              <CTAForm title="Book Your Free Consultation" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. STATS ===== */}
      <section className="bg-off-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-6"
              >
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  width={64}
                  height={64}
                />
                <p className="mt-4 text-3xl font-bold text-navy">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-gray-dark">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. INTRO - STUDY ABROAD WITH CONFIDENCE ===== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Image
                src="/images/about/2main-image-1024x773.webp"
                alt="Admizz Education - Study Abroad Consultancy in Nepal"
                width={500}
                height={377}
                className="rounded-[10px] w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
                Study Abroad with Confidence
              </h2>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-4">
                At Admizz Education, we are proud to be recognized as a trusted
                study abroad consultancy in Nepal, dedicated to turning academic
                dreams into global success stories. With a decade of proven
                experience, we&apos;ve helped thousands of Nepali students unlock
                world-class education opportunities in the USA, UK, Australia,
                Canada, and other top destinations.
              </p>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-4">
                Our personalized approach ensures every student receives expert
                guidance -- from selecting the ideal course and university to
                securing scholarships and hassle-free visa approvals.
              </p>
              <p className="text-[15px] text-gray-dark leading-relaxed">
                As a trusted education consultancy in Nepal, our strong global
                partnerships and commitment to ethical, transparent practices
                make us the preferred choice for aspiring international students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. SERVICES ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Comprehensive Study Abroad Solutions
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-10">
            From your first consultation to post-arrival support, we provide
            end-to-end assistance tailored for Nepali students.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. ECOSYSTEM ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            The Admizz Education Ecosystem
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Admizz Education is recognized for its tech-powered admissions
            solutions, revolutionizing how students, recruitment partners, and
            colleges connect.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Students */}
            <div className="bg-white border border-border-light rounded-[10px] p-8 text-center">
              <Image
                src="/images/about/2-1-763x1024.webp"
                alt="Students"
                width={160}
                height={214}
                className="mx-auto h-40 w-auto object-contain"
              />
              <h3 className="mt-4 text-lg font-bold text-navy">Students</h3>
              <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                Providing access to top colleges with expert admissions
                counselors. Get personalized guidance from experienced
                professionals who understand your goals.
              </p>
              <Link
                href="/register"
                className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors"
              >
                Register Now
              </Link>
            </div>

            {/* Recruitment Partners */}
            <div className="bg-white border border-border-light rounded-[10px] p-8 text-center">
              <Image
                src="/images/about/2-2-763x1024.webp"
                alt="Recruitment Partners"
                width={160}
                height={214}
                className="mx-auto h-40 w-auto object-contain"
              />
              <h3 className="mt-4 text-lg font-bold text-navy">
                Recruitment Partners
              </h3>
              <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                Empowering education consultants with a powerful platform to
                match students with the right institutions worldwide.
              </p>
              <Link
                href="/recruitment-partners"
                className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors"
              >
                Learn More
              </Link>
            </div>

            {/* Colleges & Universities */}
            <div className="bg-white border border-border-light rounded-[10px] p-8 text-center">
              <Image
                src="/images/about/2-3-763x1024.webp"
                alt="Colleges & Universities"
                width={160}
                height={214}
                className="mx-auto h-40 w-auto object-contain"
              />
              <h3 className="mt-4 text-lg font-bold text-navy">
                Colleges &amp; Universities
              </h3>
              <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                Offering scalable solutions to enhance international enrollments
                and reach qualified students globally.
              </p>
              <Link
                href="/universities"
                className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          <p className="text-center text-[15px] text-navy font-semibold mt-10">
            We are not just an education consultancy.{" "}
            <span className="text-blue-dark">
              We Are the Future of International Student Recruitment.
            </span>
          </p>
        </div>
      </section>

      {/* ===== 6. DESTINATIONS GRID ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3">
            Top Study Abroad Destinations
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Explore world-class education opportunities across 10 popular study
            destinations. Choose the country that best fits your academic goals
            and career aspirations.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} name={dest.name} image={dest.image} href={dest.href} description={dest.description} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsBento
        testimonials={testimonialData}
        videoId="AW3Zmubc-tU"
        featuredStudent={{ name: "Ashok Upreti", subtitle: "Bachelor in Computer Science" }}
      />

      <StudyAbroadInsights posts={blogPosts} countryName="Study Abroad" categorySlug="study-abroad" />

      {/* ===== 8. FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[32px] font-bold leading-tight">
            Talk to an Expert Counsellor for FREE
          </h2>
          <p className="mt-4 text-[15px] text-white/90 leading-relaxed">
            Ready to take the first step toward your study abroad dream? Our
            experienced counsellors are here to guide you through every stage of
            the process -- from university selection to visa approval.
          </p>
          <Link
            href="/register"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-10 py-3.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Book Free Counseling
          </Link>
        </div>
      </section>
    
{/* SEOAI:EXPANDEDCONTENT:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \"<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \\\"<div class=\\\\\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\\\\\\\">\\\\n  <section class=\\\\\\\"gap-2.5\\\\\\\">\\\\n    <h2 class=\\\\\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\\\\\">Admizz Education vs. Competitors</h2>\\\\n    <div class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\"><p class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\">When selecting a study abroad consultancy, it's important to weigh the differences between options such as Admizz Education and its competitors. Admizz sets itself apart with its comprehensive approach, tailored services, and impressive track record of success for Nepali students pursuing international education.</p></div>\\\\n  </section>\\\\n  <section class=\\\\\\\"gap-2.5\\\\\\\">\\\\n    <h2 class=\\\\\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\\\\\">Success Rates and Personalized Support</h2>\\\\n    <div class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\"><p class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\">Admizz Education boasts a remarkable 95% student visa approval rate, demonstrating its commitment to providing expert guidance throughout the application process, which is crucial for aspiring students. While some competitors may offer similar services, they often lack the personalized touch that Admizz provides, ensuring each student's unique needs are met.</p></div>\\\\n  </section>\\\\n  <section class=\\\\\\\"gap-2.5\\\\\\\">\\\\n    <h2 class=\\\\\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\\\\\">Scholarship Opportunities and Network</h2>\\\\n    <div class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\"><p class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\">Admizz has successfully awarded over $2 million in scholarships to its students, reflecting its extensive network and the ability to connect students with funding opportunities. In contrast, competitors may not have the same level of access to scholarship resources, and often offer a more transactional approach rather than the comprehensive support provided by Admizz.</p></div>\\\\n  </section>\\\\n</div>\\\" }} />\\n<div class=\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\\\">\\n  <section class=\\\"gap-2.5\\\">\\n    <h2 class=\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\">Last Updated</h2>\\n    <div class=\\\"text-sm md:text-base mb-3 opacity-90\\\"><p class=\\\"text-sm md:text-base mb-3 opacity-90\\\">This page was last updated on 2026-09-19.</p></div>\\n  </section>\\n</div>\" }} />\n<div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\">\n  <section class=\"gap-2.5\">\n    <h2 class=\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\">About the Author</h2>\n    <div class=\"text-sm md:text-base mb-3 opacity-90\"><p class=\"text-sm md:text-base mb-3 opacity-90\">By the Admizz Education Team</p></div>\n  </section>\n</div>" }} />{/* SEOAI:EXPANDEDCONTENT:END */}
</main>
  );
}
