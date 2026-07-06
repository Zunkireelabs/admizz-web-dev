"use client";

import { useState } from "react";
import CRMFormEmbed from "@/components/ui/CRMFormEmbed";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "95%", label: "Visa Success Rate" },
  { value: "100+", label: "Prestigious Institutions" },
  { value: "1500+", label: "Students Enrolled" },
  { value: "$2M+", label: "Scholarships Awarded" },
];

const services = [
  {
    title: "UK Study Visa",
    description:
      "Expert guidance for your UK student visa application with 95% success rate.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-royal mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Career & Employment Support",
    description:
      "Advisory on part-time work, post-study options, and job placement assistance.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-royal mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2"
        />
      </svg>
    ),
  },
  {
    title: "University & Course Selection",
    description:
      "Matching students with appropriate institutions and programs for the best fit.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-royal mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0121 12.75c0 2.278-.636 4.408-1.74 6.228M12 14l-6.16-3.422A12.083 12.083 0 003 12.75c0 2.278.636 4.408 1.74 6.228M12 14v7.25"
        />
      </svg>
    ),
  },
  {
    title: "Expert Counseling",
    description:
      "Tailored guidance throughout the admission and planning process.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-royal mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Accommodation & Travel",
    description:
      "Housing arrangements and coordinated travel assistance for a smooth transition.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-royal mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
        />
      </svg>
    ),
  },
  {
    title: "Scholarship & Visa Support",
    description:
      "Scholarship assistance and comprehensive visa process guidance.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-royal mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: "Satyam Jaiswal",
    university: "University of Greenwich",
    text: "Admizz Education made my dream of studying in the UK a reality with their expert guidance and seamless support.",
    rating: 5,
  },
  {
    name: "Niraj Bhattarai",
    university: "University of West of Scotland",
    text: "From university selection to visa approval, Admizz Education provided exceptional support.",
    rating: 5,
  },
  {
    name: "Dipesh Kumar Kalwar",
    university: "University of Roehampton",
    text: "The entire process was seamless from start to finish. Admizz Education handled everything with great care and professionalism.",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CampaignUKPage() {
  /* ---- testimonial carousel ---- */
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const prevTestimonial = () =>
    setCurrentTestimonial((c) =>
      c === 0 ? testimonials.length - 1 : c - 1
    );
  const nextTestimonial = () =>
    setCurrentTestimonial((c) =>
      c === testimonials.length - 1 ? 0 : c + 1
    );
  const activeTestimonial = testimonials[currentTestimonial];

  /* ---- scroll-to-form helper ---- */
  const scrollToForm = () => {
    document
      .getElementById("registration-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO                                                      */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left text */}
            <div>
              <h1 className="text-3xl md:text-[42px] font-bold leading-tight uppercase">
                Study in the United Kingdom
              </h1>
              <p className="mt-4 text-lg leading-relaxed max-w-xl">
                Transform your future with world-class education. Get expert
                visa guidance and receive a{" "}
                <span className="text-yellow font-bold">FREE laptop</span> upon
                successful visa approval!
              </p>
              <button
                onClick={scrollToForm}
                className="inline-block mt-6 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                Apply Now
              </button>
            </div>

            {/* Right decorative graphic */}
            <div className="hidden md:flex justify-center">
              <div className="relative w-72 h-72">
                {/* UK flag abstract */}
                <div className="absolute inset-0 rounded-full border-4 border-white/20 flex items-center justify-center">
                  <svg
                    className="w-40 h-40 text-white/90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0121 12.75c0 2.278-.636 4.408-1.74 6.228M12 14l-6.16-3.422A12.083 12.083 0 003 12.75c0 2.278.636 4.408 1.74 6.228M12 14v7.25"
                    />
                  </svg>
                </div>
                {/* Laptop icon overlay */}
                <div className="absolute -bottom-2 -right-2 bg-yellow rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-10 h-10 text-navy"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. STATS BAR                                                 */}
      {/* ============================================================ */}
      <section className="bg-navy py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-yellow">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. CAMPAIGN HIGHLIGHT                                        */}
      {/* ============================================================ */}
      <section className="py-16 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white border-2 border-golden rounded-[10px] p-8 md:p-12 text-center overflow-hidden">
            {/* Yellow accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow to-golden" />

            {/* Laptop icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow/20 mb-6">
              <svg
                className="w-10 h-10 text-golden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-3">
              Free Laptop Reward!
            </h2>
            <p className="text-[15px] text-gray-dark leading-relaxed max-w-lg mx-auto">
              Every successful UK visa gets a brand new laptop. Apply through
              Admizz Education and receive your reward upon visa approval.
            </p>

            <button
              onClick={scrollToForm}
              className="mt-6 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
            >
              Claim Your Free Laptop
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. SERVICES GRID                                             */}
      {/* ============================================================ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Our Services
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-border-light rounded-[10px] p-8 text-center hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-[15px] text-gray-dark leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. WHY STUDY IN UK                                           */}
      {/* ============================================================ */}
      <section className="py-16 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-10">
            Why Study in the UK?
          </h2>
          <p className="text-[15px] text-gray-dark leading-relaxed">
            Gain a world-class education, boost your career, and experience life
            in a diverse, vibrant culture. UK degrees are globally recognized and
            offer great value with shorter course durations.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              {
                title: "Global Recognition",
                desc: "UK degrees are valued by employers worldwide.",
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-royal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Shorter Durations",
                desc: "1-year Masters and 3-year Bachelors programs.",
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-royal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Post-Study Work",
                desc: "Graduate Route visa for 2-3 years of work.",
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-royal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2"
                    />
                  </svg>
                ),
              },
              {
                title: "Diverse Culture",
                desc: "600,000+ international students from 180+ countries.",
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-royal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-border-light rounded-[10px] p-6 text-center"
              >
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="font-semibold text-navy text-sm">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] text-gray-dark leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. SUCCESS STORIES                                           */}
      {/* ============================================================ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-10">
            Success Stories
          </h2>

          <div className="bg-white border border-border-light rounded-[10px] p-8 shadow-sm">
            {/* Star Rating */}
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < activeTestimonial.rating
                      ? "text-golden-rating"
                      : "text-gray-medium"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-gray-dark text-[15px] leading-relaxed italic">
              &ldquo;{activeTestimonial.text}&rdquo;
            </blockquote>
            <p className="mt-4 font-semibold text-navy">
              {activeTestimonial.name}
            </p>
            <p className="text-sm text-gray-medium">
              {activeTestimonial.university}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="w-11 h-11 rounded-full border border-border-light flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-4 h-4 text-navy"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className="flex items-center justify-center"
                  style={{ minWidth: 44, minHeight: 44 }}
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full block transition-colors ${
                    i === currentTestimonial
                      ? "bg-blue-dark"
                      : "bg-gray-medium"
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-11 h-11 rounded-full border border-border-light flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Next testimonial"
            >
              <svg
                className="w-4 h-4 text-navy"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. REGISTRATION FORM                                         */}
      {/* ============================================================ */}
      <section id="registration-form" className="py-16 bg-off-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Register Now
          </h2>

          <div
            className="p-3 sm:p-5"
            style={{
              border: "1px solid #D4955A",
              borderRadius: 24,
              background: "linear-gradient(to bottom, #F0ECF9, #FFFFFF)",
            }}
          >
            <CRMFormEmbed formSource="campaign-uk" />
          </div>
        </div>
      </section>
    </>
  );
}
