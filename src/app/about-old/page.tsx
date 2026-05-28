import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us (Old) | Admizz Education",
  description:
    "Top education consultancy providing expert study abroad guidance, visa assistance, and career counselling for a brighter future.",
  robots: { index: false, follow: false },
};

const achievements = [
  {
    icon: "/images/about/about-achievement-1.webp",
    value: "1500+",
    label: "Students Successfully Enrolled Worldwide",
    gradient: "linear-gradient(135deg, #F857A6 0%, #FF5858 100%)",
  },
  {
    icon: "/images/about/about-achievement-2.webp",
    value: "100+",
    label: "Prestigious Institutions In Our Global Network",
    gradient: "linear-gradient(135deg, #A855F7 0%, #C084FC 100%)",
  },
  {
    icon: "/images/about/about-achievement-3.webp",
    value: "95%",
    label: "Student Visa Approval Rate With Expert Guidance",
    gradient: "linear-gradient(135deg, #38BDF8 0%, #7DD3FC 100%)",
  },
  {
    icon: "/images/about/about-achievement-4.webp",
    value: "$2M+",
    label: "In Scholarships Awarded To Our Students",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
  },
];

const ecosystemCards = [
  {
    title: "Students",
    description:
      "Providing access to top colleges with expert admissions counselors.",
    bg: "#e8f1fb",
  },
  {
    title: "Colleges & Universities",
    description:
      "Offering scalable solutions to enhance international enrollments.",
    bg: "#FFFBEA",
  },
  {
    title: "Recruitment Partners",
    description:
      "Empowering education consultants with a powerful platform to match students with the right institutions.",
    bg: "#ede6fb",
  },
];

const milestones = [
  {
    year: "2025",
    title: "Today: Expanding Our Reach",
    description:
      "Strengthening our network with top universities and recruitment partners worldwide. Enhancing student support services to provide personalized admissions guidance at a larger scale.",
  },
  {
    year: "2024",
    title: "Transforming Lives",
    description:
      "Launched Admizz Workforce Solutions in the USA, assisting individuals with disabilities and others in pursuing education and training. Working with the state department.",
  },
  {
    year: "2023",
    title: "Strengthening Partnerships",
    description:
      "Formed strategic alliances with leading institutions and universities, expanding opportunities for students.",
  },
  {
    year: "2022",
    title: "Expanding Our Impact",
    description:
      "Expanded services across Bangladesh, helping students secure college admissions across borders.",
  },
  {
    year: "2021",
    title: "Scaling Globally",
    description:
      "Surpassed 1,000 students supported through personalized consulting a major growth milestone.",
  },
  {
    year: "2020",
    title: "Breaking Borders",
    description:
      "Successfully guided students in navigating cross-border college admissions, strengthening our global footprint.",
  },
  {
    year: "2019",
    title: "Expanding Reach",
    description:
      "Increased student success rates and expanded operations in Nepal to serve a larger student base.",
  },
  {
    year: "2018",
    title: "Building Trust",
    description:
      "Achieved a 95% satisfaction rate among students, parents, and associates. Established strong partnerships with institutions across multiple countries.",
  },
  {
    year: "2017",
    title: "Strengthening Our Network",
    description:
      "Broadened our partnerships with universities and educational institutions across India.",
  },
  {
    year: "2016",
    title: "First Student Success",
    description:
      "Helped our first batch of students secure admissions to top universities in India.",
  },
  {
    year: "2015",
    title: "Founded with Purpose",
    description:
      "Admizz Education was founded as a platform for college admissions, helping students pursue higher education within their country or across borders.",
  },
];

const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };
const interFont = { fontFamily: "var(--font-inter), sans-serif" };

export default function AboutOldPage() {
  return (
    <main>
      {/* ===== 1. HERO SECTION ===== */}
      <section style={{ background: "#f5f9ff", marginTop: "-1px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left — Text */}
            <div className="pt-8 md:pt-12">
              <p className="text-[15px] text-gray-dark mb-4" style={rubikFont}>
                Helping you amplify your Global Reach
              </p>
              <h1
                className="text-4xl md:text-[52px] font-bold text-navy leading-tight"
                style={rubikFont}
              >
                About
                <br />
                <span style={{ color: "#0D1282" }}>Admizz Education</span>
              </h1>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 mt-8 text-white font-semibold text-[15px] px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                style={{ background: "#0D1282" }}
              >
                Start your journey now
                <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z" />
                </svg>
              </Link>
            </div>
            {/* Right — Hero image */}
            <div className="flex justify-center">
              <Image
                src="/images/about/2main-image-1024x773.webp"
                alt="Study Abroad Consultancy"
                width={1024}
                height={773}
                priority
                className="w-full max-w-[550px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. WHO WE ARE ===== */}
      <section className="bg-white pb-10">
        <div className="max-w-6xl mx-auto bg-white rounded-[40px] px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <h5
            className="text-[28px] font-semibold text-black mb-4"
            style={rubikFont}
          >
            Who We Are?
          </h5>
          <p
            className="text-[16px] text-gray-dark leading-[24px] max-w-3xl mb-10"
            style={interFont}
          >
            Admizz Education is a global platform for Study Abroad. We help
            international students secure admission worldwide, offering test
            prep, expert guidance, scholarship support, and a seamless
            application process. We also support Recruitment Partners (Education
            Consultants) in placing their students in our partnered
            institutions.
          </p>

          {/* 4 card images — 2x2 on mobile, 4-col on large */}
          <div className="relative px-4 md:px-14">
            {/* Blue pill shape behind cards */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full hidden lg:block"
              style={{ height: "60%", zIndex: 0 }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: "#2E3C8C",
                  borderRadius: "9999px",
                }}
              />
            </div>
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { src: "/images/about/2-1-763x1024.webp", alt: "Students" },
              { src: "/images/about/2-2-763x1024.webp", alt: "Recruitment Partners" },
              { src: "/images/about/2-3-763x1024.webp", alt: "Colleges & Universities" },
              { src: "/images/about/2-4-763x1024.webp", alt: "Global Network" },
            ].map((card) => (
              <div
                key={card.alt}
                className="rounded-[20px] overflow-hidden"
                style={{ backgroundColor: "#FFFBEA" }}
              >
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
        </div>
      </section>

      {/* ===== 3. OUR ACHIEVEMENTS ===== */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[32px] font-bold text-navy mb-10"
            style={rubikFont}
          >
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[20px] p-6 md:p-8 flex flex-col justify-between min-h-[200px]"
                style={{ background: stat.gradient }}
              >
                {/* Top row: icon left, stat right */}
                <div className="flex items-start justify-between mb-4">
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain brightness-0 invert"
                  />
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
                {/* Bottom: description */}
                <p className="text-sm md:text-[15px] text-white/90 leading-relaxed text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. MEET OUR FOUNDER ===== */}
      <section className="py-16">
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded-[40px] relative overflow-hidden"
          style={{ background: "#e8f1fb", minHeight: "420px" }}
        >
          {/* Right — Founder image with blue circle (desktop) */}
          <div className="absolute right-0 top-0 bottom-0 w-[340px] lg:w-[420px] hidden md:block">
            {/* Blue decorative circle */}
            <div
              className="absolute right-[-30px] top-[5%] w-[350px] h-[350px] lg:w-[420px] lg:h-[420px] rounded-full"
              style={{ background: "#1e3a8a" }}
            />
            <Image
              src="/images/about/founder-image-box-1024x928.webp"
              alt="Manish K Sah - Founder & CEO"
              width={1024}
              height={928}
              className="absolute bottom-0 right-0 z-10 w-full h-auto object-contain"
            />
          </div>

          {/* Content overlay */}
          <div className="relative z-20 p-8 md:p-12 lg:p-14">
            <h2
              className="text-2xl md:text-[32px] font-bold text-navy mb-4"
              style={rubikFont}
            >
              Meet our Founder
            </h2>
            <p
              className="text-[15px] text-gray-dark leading-relaxed max-w-xl mb-8"
              style={interFont}
            >
              Here is the vision leading the way in creating the perfect
              platform to find and apply to your dream study abroad
              destination.
            </p>

            {/* Quote + Name cards — name card overlaps into image area */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              {/* Navy quote card */}
              <div
                className="rounded-[20px] p-6 flex-1"
                style={{ background: "#1e3a8a" }}
              >
                <p className="text-white text-[15px] leading-relaxed">
                  &quot;Every Student Deserves A Chance To Shine. From Asia To
                  Africa And Beyond, We Open Doors To World-Class Universities
                  In The USA, UK, Europe, And More, Turning Dreams Into
                  Reality.&quot;
                </p>
              </div>
              {/* Yellow name card — overlaps the founder image */}
              <div
                className="rounded-[20px] p-6 sm:w-[220px] flex-shrink-0 flex flex-col justify-center"
                style={{ background: "#F4C430" }}
              >
                <p className="text-lg font-bold text-navy">Manish K Sah</p>
                <p className="text-white text-sm mt-1">
                  Founder &amp; CEO Admizz Group
                </p>
              </div>
            </div>

            {/* Mobile — Founder image */}
            <div className="md:hidden mt-8">
              <Image
                src="/images/about/founder-image-box-1024x928.webp"
                alt="Manish K Sah - Founder & CEO"
                width={1024}
                height={928}
                className="w-full max-w-[300px] mx-auto h-auto rounded-[20px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. THE ADMIZZ EDUCATION ECOSYSTEM ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading area — full width centered */}
          <p className="text-sm font-semibold text-blue-dark uppercase tracking-wider text-center mb-2">
            Our 3 Keys
          </p>
          <h2
            className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3"
            style={rubikFont}
          >
            The Admizz Education Ecosystem
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Admizz Education is recognized for its tech-powered admissions
            solutions, revolutionizing how students, recruitment partners, and
            colleges connect.
          </p>

          {/* Desktop: 3-column layout (cards | video | cards) */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_2fr_1fr] gap-6 items-start">
            {/* Left column — Students + Colleges */}
            <div className="flex flex-col gap-5">
              {[ecosystemCards[0], ecosystemCards[1]].map((card) => (
                <div
                  key={card.title}
                  className="rounded-[16px] p-6 text-left hover:shadow-lg transition-shadow"
                  style={{ background: card.bg }}
                >
                  <h3 className="text-xl font-bold text-navy" style={rubikFont}>{card.title}</h3>
                  <p className="mt-3 text-sm text-gray-dark leading-relaxed">
                    {card.description}
                  </p>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 mt-5 font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                    style={{ background: "#F4C430", color: "#0D1282" }}
                  >
                    Learn more
                    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            {/* Center column — YouTube video */}
            <div className="flex items-center">
              <div className="relative w-full overflow-hidden rounded-[10px] shadow-md" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/VrIVEimhnFs"
                  title="Admizz Education Ecosystem"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right column — Recruitment Partners + statement */}
            <div className="flex flex-col gap-5">
              <div
                className="rounded-[16px] p-6 text-left hover:shadow-lg transition-shadow"
                style={{ background: ecosystemCards[2].bg }}
              >
                <h3 className="text-xl font-bold text-navy" style={rubikFont}>{ecosystemCards[2].title}</h3>
                <p className="mt-3 text-sm text-gray-dark leading-relaxed">
                  {ecosystemCards[2].description}
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 mt-5 font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                  style={{ background: "#0D1282", color: "#ffffff" }}
                >
                  Learn more
                  <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z" />
                  </svg>
                </Link>
              </div>
              <div
                className="rounded-[16px] p-6 text-center"
                style={{ background: "#F4C430" }}
              >
                <p className="text-[15px] text-navy font-bold uppercase leading-snug">
                  WE ARE NOT JUST AN EDUCATION CONSULTANCY
                </p>
                <p className="text-[15px] text-navy mt-2 leading-relaxed">
                  We Are the Future of International Student Recruitment.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: stacked layout */}
          <div className="lg:hidden">
            {/* YouTube video */}
            <div className="mb-8">
              <div className="relative w-full overflow-hidden rounded-[10px] shadow-md" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/VrIVEimhnFs"
                  title="Admizz Education Ecosystem"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            {/* 3 cards */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {ecosystemCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[16px] p-6 text-left hover:shadow-lg transition-shadow"
                  style={{ background: card.bg }}
                >
                  <h3 className="text-xl font-bold text-navy" style={rubikFont}>{card.title}</h3>
                  <p className="mt-3 text-sm text-gray-dark leading-relaxed">
                    {card.description}
                  </p>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 mt-5 font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                    style={{ background: "#F4C430", color: "#0D1282" }}
                  >
                    Learn more
                    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
            {/* Bottom statement */}
            <div
              className="rounded-[16px] p-6 text-center"
              style={{ background: "#F4C430" }}
            >
              <p className="text-[15px] text-navy font-bold uppercase leading-snug">
                WE ARE NOT JUST AN EDUCATION CONSULTANCY
              </p>
              <p className="text-[15px] text-navy mt-2 leading-relaxed">
                We Are the Future of International Student Recruitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. WHAT DRIVES US ===== */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[28px] font-bold text-navy text-center mb-12"
            style={rubikFont}
          >
            What drives us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white border border-border-light rounded-[10px] p-8 text-center">
              <Image
                src="/images/about/vision.webp"
                alt="Our Vision"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-bold text-navy">Our Vision</h3>
              <p className="mt-3 text-sm text-gray-dark leading-relaxed">
                To connect students worldwide, making college admissions
                seamless — whether within their own country, to a neighboring
                country, or to a destination across the globe.
              </p>
            </div>
            {/* Mission */}
            <div className="bg-white border border-border-light rounded-[10px] p-8 text-center">
              <Image
                src="/images/about/target.webp"
                alt="Our Mission"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-bold text-navy">Our Mission</h3>
              <p className="mt-3 text-sm text-gray-dark leading-relaxed">
                To simplify the college admissions process, empowering students
                to access top institutions worldwide through personalized
                guidance and global partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. OUR MILESTONE TIMELINE ===== */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[32px] font-bold text-navy text-center mb-16"
            style={rubikFont}
          >
            Our Milestone
          </h2>

          {/* Desktop: centered alternating timeline */}
          <div className="hidden md:block relative">
            {/* Center vertical line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
              style={{ background: "linear-gradient(to bottom, #e2e8f0, #cbd5e1, #e2e8f0)" }}
            />

            <div className="space-y-16">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                const bracketColors = ["#FEF3C7", "#EDE9FE", "#DBEAFE", "#FCE7F3", "#D1FAE5", "#FEF3C7", "#EDE9FE", "#DBEAFE", "#FCE7F3", "#D1FAE5", "#FEF3C7"];
                return (
                  <div key={index} className="relative flex items-center">
                    {/* Purple dot on center line */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                      style={{ background: "#7C3AED" }}
                    />

                    {isLeft ? (
                      <>
                        {/* Year on left */}
                        <div className="w-1/2 pr-12 text-right">
                          <p className="text-[48px] font-bold text-navy leading-none" style={rubikFont}>
                            {milestone.year}
                          </p>
                        </div>
                        {/* Content on right */}
                        <div className="w-1/2 pl-12 relative">
                          <div
                            className="absolute left-8 top-0 bottom-0 w-[4px] rounded-full"
                            style={{ background: bracketColors[index % bracketColors.length] }}
                          />
                          <h3 className="font-bold text-navy text-[16px]" style={rubikFont}>
                            {milestone.title}
                          </h3>
                          <p className="mt-1 text-[15px] text-gray-dark leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Content on left */}
                        <div className="w-1/2 pr-12 text-right relative">
                          <div
                            className="absolute right-8 top-0 bottom-0 w-[4px] rounded-full"
                            style={{ background: bracketColors[index % bracketColors.length] }}
                          />
                          <h3 className="font-bold text-navy text-[16px]" style={rubikFont}>
                            {milestone.title}
                          </h3>
                          <p className="mt-1 text-[15px] text-gray-dark leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                        {/* Year on right */}
                        <div className="w-1/2 pl-12">
                          <p className="text-[48px] font-bold text-navy leading-none" style={rubikFont}>
                            {milestone.year}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: simple left-aligned timeline */}
          <div className="md:hidden relative">
            <div
              className="absolute left-4 top-0 bottom-0 w-[2px]"
              style={{ background: "linear-gradient(to bottom, #e2e8f0, #cbd5e1, #e2e8f0)" }}
            />
            <div className="space-y-10">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-12">
                  <div
                    className="absolute left-[11px] top-2 w-3 h-3 rounded-full z-10"
                    style={{ background: "#7C3AED" }}
                  />
                  <p className="text-[28px] font-bold text-navy leading-none mb-2" style={rubikFont}>
                    {milestone.year}
                  </p>
                  <h3 className="font-bold text-navy text-[15px]" style={rubikFont}>
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-dark leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
