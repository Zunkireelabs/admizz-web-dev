import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ServiceCard from "@/components/ui/ServiceCard";

export const metadata: Metadata = {
  title: "Study Abroad Consultancy in Nepal - Admizz Education",
  description:
    "Top education consultancy in Nepal offering expert guidance for studying abroad. Trusted by students for global admissions success.",
  alternates: {
    canonical: "https://admizzeducation.com/study-abroad-consultancy-in-nepal/",
  },
  openGraph: {
    title: "Study Abroad Consultancy in Nepal - Admizz Education",
    description:
      "Top education consultancy in Nepal offering expert guidance for studying abroad. Trusted by students for global admissions success.",
    url: "https://admizzeducation.com/study-abroad-consultancy-in-nepal/",
    siteName: "Admizz Education",
    type: "website",
  },
};

const stats = [
  {
    icon: "/images/icons/user.png",
    value: "1500+",
    label: "Students Successfully Enrolled Worldwide",
  },
  {
    icon: "/images/icons/online-learning.png",
    value: "100+",
    label: "Prestigious Institutions in Our Global Network",
  },
  {
    icon: "/images/icons/excellence.png",
    value: "95%",
    label: "Student Visa Approval Rate with Expert Guidance",
  },
  {
    icon: "/images/icons/scholarship-108.png",
    value: "$2M+",
    label: "In Scholarships Awarded to Our Students",
  },
];

const services = [
  {
    icon: "/images/icons/consult-108.png",
    title: "Consult, Search, Find & Apply",
    description:
      "Browse programs from leading institutions worldwide. Get personalized guidance to identify the right course and university for your goals.",
  },
  {
    icon: "/images/icons/scholarship-108.png",
    title: "Scholarship Assistance",
    description:
      "Discover funding opportunities to lower costs. Our experts help you identify and apply for scholarships tailored to your profile.",
  },
  {
    icon: "/images/icons/visa-108.png",
    title: "Visa & Immigration Guidance",
    description:
      "Get expert support for smooth transitions. Navigate the student visa application process with step-by-step documentation support.",
  },
  {
    icon: "/images/icons/accomodation-108.png",
    title: "Accommodation & Post-Arrival Support",
    description:
      "Find housing and local resources easily. Settle into your new country with confidence from accommodation to local orientation.",
  },
];

const destinations = [
  { name: "Study in Australia", href: "/study-in-australia/" },
  { name: "Study in Canada", href: "/study-in-canada/" },
  { name: "Study in Denmark", href: "/study-in-denmark/" },
  { name: "Study in Dubai", href: "/study-in-dubai/" },
  { name: "Study in France", href: "/study-in-france/" },
  { name: "Study in India", href: "/study-in-india/" },
  { name: "Study in New Zealand", href: "/study-in-newzealand/" },
  { name: "Study in South Korea", href: "/study-in-south-korea/" },
  { name: "Study in the UK", href: "/study-in-the-uk/" },
  { name: "Study in the USA", href: "/study-in-the-usa/" },
];

const testimonials = [
  {
    name: "Niraj Bhattarai",
    university: "University of West of Scotland",
    route: "Nepal to UK",
    text: "From university selection to visa approval, Admizz Education provided exceptional support and made my journey to the UK effortless. I highly recommend them to anyone looking for a trustworthy study abroad partner.",
  },
  {
    name: "Yousuf Abdirahman Mohamed",
    university: "Kalinga Institute of Industrial Technology",
    route: "Somalia to India",
    text: "I appreciated your unlimited help for my MBA career. It was very tough but I gained a very solid educational background. Thanks Admizz!",
  },
  {
    name: "Ashok Upreti",
    university: null,
    route: null,
    text: "Admizz Education's dedicated team guided me through every challenge, ensuring I secured admission to my dream university. Their professional and personalized approach made the entire process smooth and hassle-free.",
  },
  {
    name: "Basant Khadka",
    university: "Weber State University",
    route: "Nepal to USA",
    text: "The journey to college can be overwhelming, but Admizz Education made applying to Weber State University effortless. Thanks to their guidance.",
  },
  {
    name: "Satyam Jaiswal",
    university: "University of Greenwich",
    route: "Nepal to UK",
    text: "Admizz Education made my dream of studying in the UK a reality with their expert guidance and seamless support. Their team ensured every step of my application visa process was smooth and stress-free.",
  },
];

export default function StudyAbroadConsultancyNepalPage() {
  return (
    <main>
      {/* ===== 1. HERO ===== */}
      <section className="bg-gradient-to-r from-navy to-blue-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-wider mb-3 text-yellow">
            Nepal&apos;s Trusted Study Abroad Partner
          </p>
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight max-w-3xl mx-auto">
            Study Abroad Consultancy in Nepal
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Expert guidance for Nepali students to secure admissions at top
            universities in the USA, UK, Australia, Canada, and beyond.
          </p>
          <Link
            href="/register/"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Start Your Journey Now
          </Link>
        </div>
      </section>

      {/* ===== 2. STATS ===== */}
      <section className="bg-off-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
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
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
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
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
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
                src="/images/about/2-1-763x1024.png"
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
                href="/register/"
                className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors"
              >
                Register Now
              </Link>
            </div>

            {/* Recruitment Partners */}
            <div className="bg-white border border-border-light rounded-[10px] p-8 text-center">
              <Image
                src="/images/about/2-2-763x1024.png"
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
                href="/recruitment-partners/"
                className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors"
              >
                Learn More
              </Link>
            </div>

            {/* Colleges & Universities */}
            <div className="bg-white border border-border-light rounded-[10px] p-8 text-center">
              <Image
                src="/images/about/2-3-763x1024.png"
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
                href="/universities/"
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Top Study Abroad Destinations
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-10">
            Explore world-class education opportunities across 10 popular study
            destinations. Choose the country that best fits your academic goals
            and career aspirations.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                href={dest.href}
                className="group bg-white border border-border-light rounded-[10px] p-5 text-center hover:shadow-md hover:border-blue-royal/30 transition-all"
              >
                <span className="text-2xl mb-2 block" aria-hidden="true">
                  {dest.name.includes("Australia") && "🇦🇺"}
                  {dest.name.includes("Canada") && "🇨🇦"}
                  {dest.name.includes("Denmark") && "🇩🇰"}
                  {dest.name.includes("Dubai") && "🇦🇪"}
                  {dest.name.includes("France") && "🇫🇷"}
                  {dest.name.includes("India") && "🇮🇳"}
                  {dest.name.includes("New Zealand") && "🇳🇿"}
                  {dest.name.includes("South Korea") && "🇰🇷"}
                  {dest.name.includes("UK") && "🇬🇧"}
                  {dest.name.includes("USA") && "🇺🇸"}
                </span>
                <h3 className="text-sm font-semibold text-navy group-hover:text-blue-royal transition-colors">
                  {dest.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. TESTIMONIALS ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Our Success Stories &amp; Testimonials
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Hear from students who turned their study abroad dreams into reality
            with Admizz Education.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-border-light rounded-[10px] p-6 flex flex-col"
              >
                {/* Star Rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-golden"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-sm text-gray-dark leading-relaxed italic flex-1">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <div className="mt-4 pt-4 border-t border-border-light">
                  <p className="font-semibold text-navy text-[15px]">
                    {t.name}
                  </p>
                  {t.university && (
                    <p className="text-sm text-gray-dark mt-0.5">
                      {t.university}
                    </p>
                  )}
                  {t.route && (
                    <p className="text-xs text-blue-royal font-medium mt-1">
                      {t.route}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-[32px] font-bold text-white mb-4">
            Talk to an Expert Counsellor for FREE
          </h2>
          <p className="text-white/90 text-[15px] leading-relaxed mb-8 max-w-xl mx-auto">
            Ready to take the first step toward your study abroad dream? Our
            experienced counsellors are here to guide you through every stage of
            the process -- from university selection to visa approval.
          </p>
          <Link
            href="/register/"
            className="inline-block bg-yellow text-black font-semibold text-[15px] px-10 py-3.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Register for Free Counselling
          </Link>
        </div>
      </section>
    </main>
  );
}
