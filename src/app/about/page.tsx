import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Admizz Education",
  description:
    "Top education consultancy providing expert study abroad guidance, visa assistance, and career counselling for a brighter future.",
  alternates: {
    canonical: "https://admizzeducation.com/about/",
  },
  openGraph: {
    title: "About Us | Admizz Education",
    description:
      "Top education consultancy providing expert study abroad guidance, visa assistance, and career counselling for a brighter future.",
    url: "https://admizzeducation.com/about/",
    siteName: "Admizz Education",
    type: "website",
  },
};

const achievements = [
  { value: "1500+", label: "students successfully enrolled worldwide" },
  { value: "100+", label: "Prestigious Institutions in Our Global Network" },
  { value: "95%", label: "Student Visa Approval Rate with Expert Guidance" },
  { value: "$2M+", label: "in Scholarships Awarded to Our Students" },
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

export default function AboutPage() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-wider mb-2">
            About
          </p>
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
            Helping you amplify your Global Reach
          </h1>
          <p className="mt-2 text-lg font-medium">Admizz Education</p>
          <Link
            href="/register/"
            className="inline-block mt-6 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Start your journey now
          </Link>
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Image
                src="/images/about/2main-image-1024x773.webp"
                alt="Admizz Education Team"
                width={500}
                height={377}
                className="rounded-[10px] w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-blue-dark uppercase tracking-wider mb-2">
                Who We Are?
              </h2>
              <p className="text-[15px] text-gray-dark leading-relaxed">
                Admizz Education is a global platform for Study Abroad. We help
                international students secure admission worldwide, offering test
                prep, expert guidance, scholarship support, and a seamless
                application process. We also support Recruitment Partners
                (Education Consultants) in placing their students in our
                partnered institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-6"
              >
                <p className="text-3xl font-bold text-navy">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-dark">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            What drives us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-border-light rounded-[10px] p-8 text-center">
              <Image
                src="/images/about/vision.png"
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
            <div className="bg-white border border-border-light rounded-[10px] p-8 text-center">
              <Image
                src="/images/about/target.png"
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

      {/* ===== FOUNDER ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Meet our Founder
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <Image
                src="/images/about/founder-image-box-1024x928.png"
                alt="Manish K Sah - Founder & CEO"
                width={400}
                height={362}
                className="rounded-[10px] w-full max-w-[400px] h-auto"
              />
            </div>
            <div>
              <blockquote className="text-[15px] text-gray-dark leading-relaxed italic border-l-4 border-golden pl-6">
                &ldquo;Every student deserves a chance to shine. From Asia to
                Africa and beyond, we open doors to world-class universities in
                the USA, UK, Europe, and more, turning dreams into
                reality.&rdquo;
              </blockquote>
              <p className="mt-6 text-xl font-bold text-navy">Manish K Sah</p>
              <p className="text-sm text-gray-dark">
                Founder &amp; CEO Admizz Group
              </p>
              <p className="mt-4 text-[15px] text-gray-dark leading-relaxed">
                Here is the vision leading the way in creating the perfect
                platform to find and apply to your dream study abroad
                destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ECOSYSTEM ===== */}
      <section className="py-16 px-4">
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
                counselors.
              </p>
            </div>

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
                Offering scalable solutions to enhance international
                enrollments.
              </p>
            </div>

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
                match students with the right institutions.
              </p>
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

      {/* ===== MILESTONE TIMELINE ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-12">
            Our Milestone
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border-light" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-16">
                  {/* Year badge */}
                  <div className="absolute left-0 w-12 h-12 bg-blue-dark text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
                    {milestone.year}
                  </div>
                  <div className="bg-white border border-border-light rounded-[10px] p-6">
                    <h3 className="font-bold text-navy">{milestone.title}</h3>
                    <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
