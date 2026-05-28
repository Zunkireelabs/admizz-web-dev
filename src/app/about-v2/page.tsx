import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AboutTimeline from "./AboutTimeline";

export const metadata: Metadata = {
  title: "About Us | Admizz Education",
  description:
    "Top education consultancy providing expert study abroad guidance, visa assistance, and career counselling for a brighter future.",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const milestones = [
  {
    year: "2025",
    title: "Today: Expanding Our Reach",
    description:
      "Strengthening our network with top universities and recruitment partners worldwide. Enhancing student support services to provide personalized admissions guidance at a larger scale.",
    accent: "#1E6DEB",
  },
  {
    year: "2024",
    title: "Transforming Lives",
    description:
      "Launched Admizz Workforce Solutions in the USA, assisting individuals with disabilities and others in pursuing education and training. Working with the state department.",
    accent: "#3FB5A0",
  },
  {
    year: "2023",
    title: "Strengthening Partnerships",
    description:
      "Formed strategic alliances with leading institutions and universities, expanding opportunities for students.",
    accent: "#E86F3C",
  },
  {
    year: "2022",
    title: "Expanding Our Impact",
    description:
      "Expanded services across Bangladesh, helping students secure college admissions across borders.",
    accent: "#BB5FEC",
  },
  {
    year: "2021",
    title: "Scaling Globally",
    description:
      "Surpassed 1,000 students supported through personalized consulting — a major growth milestone.",
    accent: "#1E6DEB",
  },
  {
    year: "2020",
    title: "Breaking Borders",
    description:
      "Successfully guided students in navigating cross-border college admissions, strengthening our global footprint.",
    accent: "#3FB5A0",
  },
  {
    year: "2019",
    title: "Expanding Reach",
    description:
      "Increased student success rates and expanded operations in Nepal to serve a larger student base.",
    accent: "#E86F3C",
  },
  {
    year: "2018",
    title: "Building Trust",
    description:
      "Achieved a 95% satisfaction rate among students, parents, and associates. Established strong partnerships with institutions across multiple countries.",
    accent: "#BB5FEC",
  },
  {
    year: "2017",
    title: "Strengthening Our Network",
    description:
      "Broadened our partnerships with universities and educational institutions across India.",
    accent: "#1E6DEB",
  },
  {
    year: "2016",
    title: "First Student Success",
    description:
      "Helped our first batch of students secure admissions to top universities in India.",
    accent: "#3FB5A0",
  },
  {
    year: "2015",
    title: "Founded with Purpose",
    description:
      "Admizz Education was founded as a platform for college admissions, helping students pursue higher education within their country or across borders.",
    accent: "#E86F3C",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function AboutV2Page() {
  return (
    <main
      style={{ fontFamily: "'Open Sans', var(--font-opensans), sans-serif" }}
    >
      <style>{`
        main h1, main h2, main h3 {
          font-family: 'Montserrat', var(--font-montserrat), sans-serif;
        }
      `}</style>

      {/* ===== 1. HERO ===== */}
      <section className="py-6 md:py-10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-[32px] px-6 sm:px-10 lg:px-12 py-14 md:py-20 overflow-hidden"
            style={{ background: "#EEF2FF" }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left — Text */}
            <div className="relative z-10">
              <p
                className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-5"
                style={{ color: "#1E6DEB" }}
              >
                About Us
              </p>
              <h1
                className="text-[36px] md:text-[50px] font-bold leading-[1.1] mb-6"
                style={{ color: "#0D1282" }}
              >
                Empowering Students{" "}
                <span style={{ color: "#1E6DEB" }}>
                  to Study Abroad with Admizz!
                </span>
              </h1>
              <p
                className="text-[16px] leading-[1.75] mb-10 max-w-[460px]"
                style={{ color: "#5a6275" }}
              >
                Helping you amplify your Global Reach. We connect students
                worldwide, making college admissions seamless — whether within
                their own country or to a destination across the globe.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 font-semibold text-[16px] px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "#FCB730", color: "#0D1282" }}
              >
                Start Your Journey
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Right — Hero image */}
            <div className="flex items-center justify-center">
              <Image
                src="/images/about/2main-image-1024x773.webp"
                alt="Study abroad consultancy — Admizz Education"
                width={1024}
                height={773}
                priority
                className="w-full max-w-[520px] h-auto"
              />
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. WHO WE ARE ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3"
            style={{ color: "#1E6DEB" }}
          >
            Who We Are
          </p>
          <h2
            className="text-[28px] md:text-[36px] font-bold text-center mb-4"
            style={{ color: "#0D1282" }}
          >
            A Global Platform for Study Abroad
          </h2>
          <p
            className="text-center text-[15px] leading-relaxed max-w-3xl mx-auto mb-14"
            style={{ color: "#5a6275" }}
          >
            Admizz Education is a global platform for Study Abroad. We help
            international students secure admission worldwide, offering test
            prep, expert guidance, scholarship support, and a seamless
            application process. We also support Recruitment Partners (Education
            Consultants) in placing their students in our partnered institutions.
          </p>

          {/* 4 photo cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {[
              {
                src: "/images/about/2-1-763x1024.webp",
                alt: "Students getting guidance",
                accent: "#1E6DEB",
              },
              {
                src: "/images/about/2-2-763x1024.webp",
                alt: "Recruitment Partners",
                accent: "#3FB5A0",
              },
              {
                src: "/images/about/2-3-763x1024.webp",
                alt: "Colleges & Universities",
                accent: "#E86F3C",
              },
              {
                src: "/images/about/2-4-763x1024.webp",
                alt: "Global Network",
                accent: "#BB5FEC",
              },
            ].map((card) => (
              <div
                key={card.alt}
                className="rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
                style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
              >
                <div className="h-[4px]" style={{ background: card.accent }} />
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={763}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. ACHIEVEMENTS / STATS ===== */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a0f5c 0%, #0D1282 40%, #1a3aad 100%)",
        }}
      >
        {/* Decorative orbs */}
        <div
          className="hidden sm:block absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #1E6DEB, transparent 70%)",
          }}
        />
        <div
          className="hidden sm:block absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #3FB5A0, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.14em] text-center mb-3"
            style={{ color: "#FCB730" }}
          >
            Our Achievements
          </p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-center text-white mb-4">
            Numbers That Speak for Themselves
          </h2>
          <p className="text-center text-[15px] text-white/50 max-w-xl mx-auto mb-12">
            Our proven results reflect the trust families and students place in
            us every year.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                value: "2,000+",
                label: "Students Successfully Enrolled Worldwide",
                icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5",
                accent: "#1E6DEB",
              },
              {
                value: "100+",
                label: "Prestigious Institutions In Our Global Network",
                icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z",
                accent: "#3FB5A0",
              },
              {
                value: "95%",
                label: "Student Visa Approval Rate",
                icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                accent: "#E86F3C",
              },
              {
                value: "$2M+",
                label: "In Scholarships Awarded To Our Students",
                icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                accent: "#BB5FEC",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center rounded-2xl px-4 py-8 md:py-10 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: `${stat.accent}20` }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke={stat.accent}
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={stat.icon}
                    />
                  </svg>
                </div>
                <p className="text-[34px] md:text-[42px] font-bold text-white mb-2 leading-none">
                  {stat.value}
                </p>
                <p className="text-[12px] md:text-[13px] font-medium text-white/50 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. MEET OUR FOUNDER ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3"
            style={{ color: "#1E6DEB" }}
          >
            Leadership
          </p>
          <h2
            className="text-[28px] md:text-[36px] font-bold text-center mb-12"
            style={{ color: "#0D1282" }}
          >
            Meet Our Founder
          </h2>

          <div
            className="max-w-5xl mx-auto rounded-[24px] overflow-hidden"
            style={{ background: "#EEF2FF" }}
          >
            <div className="grid md:grid-cols-[0.9fr_1.1fr] items-stretch">
              {/* Left — Founder Image */}
              <div className="relative bg-gradient-to-br from-[#0D1282] to-[#1E6DEB] flex items-end justify-center min-h-[320px] md:min-h-[420px]">
                {/* Decorative circle */}
                <div
                  className="absolute top-[10%] right-[-20%] w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full opacity-20"
                  style={{ background: "#1E6DEB" }}
                />
                <Image
                  src="/images/about/founder-image-box-1024x928.webp"
                  alt="Manish K Sah — Founder & CEO"
                  width={1024}
                  height={928}
                  className="relative z-10 w-full max-w-[380px] h-auto object-contain"
                />
              </div>

              {/* Right — Quote & Info */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {/* Name & Title */}
                <div className="mb-6">
                  <h3
                    className="text-[24px] md:text-[28px] font-bold mb-1"
                    style={{ color: "#0D1282" }}
                  >
                    Manish K Sah
                  </h3>
                  <p
                    className="text-[14px] font-semibold"
                    style={{ color: "#1E6DEB" }}
                  >
                    Founder &amp; CEO, Admizz Group
                  </p>
                </div>

                {/* Quote */}
                <div
                  className="relative pl-6 mb-8"
                  style={{ borderLeft: "4px solid #1E6DEB" }}
                >
                  {/* Quote icon */}
                  <svg
                    className="absolute -top-2 -left-1 opacity-10"
                    width={48}
                    height={48}
                    viewBox="0 0 24 24"
                    fill="#1E6DEB"
                  >
                    <path d="M9.135 5.002C5.678 6.548 3.5 9.575 3.5 13.412c0 2.863 1.875 5.088 4.281 5.088 2.156 0 3.969-1.688 3.969-3.862 0-2.088-1.5-3.638-3.344-3.638-.375 0-.844.075-1.031.15.375-2.175 2.25-4.425 4.406-5.475L9.135 5.002Zm9.75 0c-3.469 1.546-5.634 4.573-5.634 8.41 0 2.863 1.875 5.088 4.281 5.088 2.156 0 3.969-1.688 3.969-3.862 0-2.088-1.5-3.638-3.344-3.638-.375 0-.844.075-1.031.15.375-2.175 2.25-4.425 4.406-5.475L18.885 5.002Z" />
                  </svg>
                  <p
                    className="text-[15px] md:text-[16px] leading-[1.8] italic"
                    style={{ color: "#3d4663" }}
                  >
                    &quot;Every Student Deserves A Chance To Shine. From Asia To
                    Africa And Beyond, We Open Doors To World-Class Universities
                    In The USA, UK, Europe, And More, Turning Dreams Into
                    Reality.&quot;
                  </p>
                </div>

                {/* Gold accent card */}
                <div
                  className="rounded-xl px-6 py-4 inline-flex items-center gap-3 self-start"
                  style={{ background: "#FCB730" }}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="#0D1282"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                  <p
                    className="text-[13px] font-bold"
                    style={{ color: "#0D1282" }}
                  >
                    Building the future of international student recruitment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. ECOSYSTEM ===== */}
      <section className="py-16 md:py-20" style={{ background: "#F8F9FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3"
            style={{ color: "#1E6DEB" }}
          >
            Our Ecosystem
          </p>
          <h2
            className="text-[28px] md:text-[36px] font-bold text-center mb-4"
            style={{ color: "#0D1282" }}
          >
            Turning Study Abroad Dreams Into Reality
          </h2>
          <p
            className="text-center text-[15px] leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: "#5a6275" }}
          >
            With innovative tech-powered admission solutions, Admizz Education
            is reshaping how students, colleges, and recruitment partners connect
            for smarter outcomes.
          </p>

          {/* 3 Ecosystem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Students */}
            <div
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
              style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
            >
              <div className="h-[4px]" style={{ background: "#1E6DEB" }} />
              <div className="p-8">
                <div
                  className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                  style={{ background: "#1E6DEB12" }}
                >
                  <svg
                    className="w-7 h-7"
                    style={{ color: "#1E6DEB" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                </div>
                <h3
                  className="text-[20px] font-bold mb-3"
                  style={{ color: "#0D1282" }}
                >
                  Students
                </h3>
                <p
                  className="text-[14px] leading-[1.7] mb-6"
                  style={{ color: "#5a6275" }}
                >
                  Get personalized guidance from experienced counselors at Admizz
                  Education for hassle-free university admissions abroad. From
                  course selection to visa processing — we&apos;re with you at
                  every step.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 font-semibold text-[14px] transition-colors duration-200 hover:opacity-80"
                  style={{ color: "#1E6DEB" }}
                >
                  Get Started
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Colleges & Universities */}
            <div
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
              style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
            >
              <div className="h-[4px]" style={{ background: "#3FB5A0" }} />
              <div className="p-8">
                <div
                  className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                  style={{ background: "#3FB5A012" }}
                >
                  <svg
                    className="w-7 h-7"
                    style={{ color: "#3FB5A0" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-[20px] font-bold mb-3"
                  style={{ color: "#0D1282" }}
                >
                  Colleges &amp; Universities
                </h3>
                <p
                  className="text-[14px] leading-[1.7] mb-6"
                  style={{ color: "#5a6275" }}
                >
                  We bring the right people together to challenge conventional
                  thinking and drive transformation in international education
                  recruitment and enrollment.
                </p>
                <Link
                  href="/universities"
                  className="inline-flex items-center gap-2 font-semibold text-[14px] transition-colors duration-200 hover:opacity-80"
                  style={{ color: "#3FB5A0" }}
                >
                  Explore Institutions
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Recruitment Partners */}
            <div
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
              style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
            >
              <div className="h-[4px]" style={{ background: "#E86F3C" }} />
              <div className="p-8">
                <div
                  className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                  style={{ background: "#E86F3C12" }}
                >
                  <svg
                    className="w-7 h-7"
                    style={{ color: "#E86F3C" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-[20px] font-bold mb-3"
                  style={{ color: "#0D1282" }}
                >
                  Recruitment Partners
                </h3>
                <p
                  className="text-[14px] leading-[1.7] mb-6"
                  style={{ color: "#5a6275" }}
                >
                  With powerful platforms for education consultants, Admizz
                  Education ensures students find the right institutions easily
                  and partners grow their network.
                </p>
                <Link
                  href="/recruitment-partners"
                  className="inline-flex items-center gap-2 font-semibold text-[14px] transition-colors duration-200 hover:opacity-80"
                  style={{ color: "#E86F3C" }}
                >
                  Partner With Us
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Video + Accent Banner */}
          <div className="mt-12 grid md:grid-cols-[1.1fr_0.9fr] gap-7 items-stretch">
            {/* Left — Video */}
            <div
              className="rounded-2xl overflow-hidden aspect-video"
              style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
            >
              <iframe
                src="https://www.youtube.com/embed/VrIVEimhnFs"
                title="Welcome to Admizz Education"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Right — Accent card */}
            <div
              className="rounded-2xl px-8 py-8 md:py-10 flex flex-col justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #1E6DEB 0%, #0D1282 100%)",
              }}
            >
              <p
                className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-4"
                style={{ color: "#FCB730" }}
              >
                Why Admizz?
              </p>
              <h3 className="text-white font-bold text-[22px] md:text-[26px] leading-tight mb-4">
                We Are Not Just An Education Consultancy
              </h3>
              <p className="text-white/80 text-[15px] leading-[1.7] mb-8">
                We Are the Future of International Student Recruitment.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 font-bold text-[15px] px-7 py-3.5 rounded-lg self-start transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "#FCB730", color: "#0D1282" }}
              >
                Start Your Journey
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. VISION & MISSION ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3"
            style={{ color: "#1E6DEB" }}
          >
            What Drives Us
          </p>
          <h2
            className="text-[28px] md:text-[36px] font-bold text-center mb-12"
            style={{ color: "#0D1282" }}
          >
            Our Vision &amp; Mission
          </h2>

          <div className="grid md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {/* Vision */}
            <div
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
              style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
            >
              <div className="h-[4px]" style={{ background: "#1E6DEB" }} />
              <div className="p-8 text-center">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ background: "#1E6DEB14" }}
                >
                  <svg
                    className="w-8 h-8"
                    style={{ color: "#1E6DEB" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-[20px] font-bold mb-3"
                  style={{ color: "#0D1282" }}
                >
                  Our Vision
                </h3>
                <p
                  className="text-[14px] leading-[1.7]"
                  style={{ color: "#5a6275" }}
                >
                  To connect students worldwide, making college admissions
                  seamless — whether within their own country, to a neighboring
                  country, or to a destination across the globe.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
              style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
            >
              <div className="h-[4px]" style={{ background: "#3FB5A0" }} />
              <div className="p-8 text-center">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ background: "#3FB5A014" }}
                >
                  <svg
                    className="w-8 h-8"
                    style={{ color: "#3FB5A0" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-[20px] font-bold mb-3"
                  style={{ color: "#0D1282" }}
                >
                  Our Mission
                </h3>
                <p
                  className="text-[14px] leading-[1.7]"
                  style={{ color: "#5a6275" }}
                >
                  To simplify the college admissions process, empowering students
                  to access top institutions worldwide through personalized
                  guidance and global partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. MILESTONES TIMELINE ===== */}
      <section
        className="py-16 md:py-20"
        style={{ background: "#F8F9FF" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3"
            style={{ color: "#1E6DEB" }}
          >
            Our Journey
          </p>
          <h2
            className="text-[28px] md:text-[36px] font-bold text-center mb-4"
            style={{ color: "#0D1282" }}
          >
            Milestones That Define Us
          </h2>
          <p
            className="text-center text-[15px] leading-relaxed max-w-2xl mx-auto mb-14"
            style={{ color: "#5a6275" }}
          >
            From our founding in 2015 to today, every year has been a step
            toward transforming international education access.
          </p>

          <AboutTimeline milestones={milestones} />
        </div>
      </section>

      {/* ===== 8. CTA BANNER ===== */}
      <section
        className="py-10 md:py-14"
        style={{
          background:
            "linear-gradient(135deg, #0a0f5c 0%, #0D1282 40%, #1a3aad 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] md:text-[32px] font-bold text-white leading-tight mb-3">
            Ready to Start Your Journey?
          </h2>
          <p className="text-[15px] text-white/85 leading-relaxed max-w-xl mx-auto mb-7">
            Take the first step towards your dream education. Our expert
            counselors are ready to guide you through every step.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 font-bold text-[16px] px-10 py-4 rounded-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: "#FCB730", color: "#0D1282" }}
          >
            Register as a Student
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
