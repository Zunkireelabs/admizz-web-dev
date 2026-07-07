import type { Metadata } from "next";
import UKEducationExpoInit from "./UKEducationExpoInit";
import UniversityPartners from "../../UniversityPartners";
import AlumniSection from "@/components/ui/AlumniSection";
import { allUniversities } from "@/lib/universities";

export const metadata: Metadata = {
  title: "UK Education Expo 2026 | Admizz Education",
  description:
    "Your Direct Pathway to Top Modern UK Universities. On-the-spot assessment, scholarship guidance, credential evaluation & PSW briefing.",
  alternates: {
    canonical: "https://admizzeducation.com/events/uk-education-expo-2026",
  },
  openGraph: {
    title: "UK Education Expo 2026 | Admizz Education",
    description:
      "Your Direct Pathway to Top Modern UK Universities. On-the-spot assessment, scholarship guidance, credential evaluation & PSW briefing.",
    url: "https://admizzeducation.com/events/uk-education-expo-2026",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

export default function UKEducationExpoPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
        precedence="default"
      />
      <link rel="stylesheet" href="/events/css/admission-page.css" precedence="default" />

      {/* Hero */}
      <section className="admission-hero">
        <div className="container">
          <p className="hero-eyebrow">Admizz Education Presents</p>
          <h1 className="hero-main-title">UK EDUCATION EXPO 2026</h1>
          <p className="hero-subtitle">
            Meet university representatives directly
          </p>
          <p className="hero-description">
            Explore study destinations and course options, understand scholarship
            opportunities, and gain expert admission and visa guidance —
            everything you need to make informed academic decisions, all in one
            place.
          </p>

          <div className="hero-locations">
            <a
              href="https://share.google/XR8Cf300eyTHNsKwB"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-location-badge"
            >
              <span className="location-icon">📍</span>
              <span className="location-dates">Friday, 5th June, 2026 | 11AM–3PM NST</span>
              <span className="location-divider">|</span>
              <span className="location-place">Putalisadak, Kathmandu</span>
              <span className="location-map-badge">Map</span>
            </a>
          </div>

          <div className="countdown-container">
            <p className="countdown-label">Event Starts In</p>
            <div
              className="countdown-timer"
              id="countdown-timer"
              data-target="2026-06-05T10:00:00"
            >
              <div className="countdown-item">
                <div className="countdown-number" id="countdown-days">00</div>
                <div className="countdown-unit">Days</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number" id="countdown-hours">00</div>
                <div className="countdown-unit">Hours</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number" id="countdown-minutes">00</div>
                <div className="countdown-unit">Mins</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number" id="countdown-seconds">00</div>
                <div className="countdown-unit">Secs</div>
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <button type="button" className="btn-hero" id="openRegisterPanel">
              Register Now
            </button>
          </div>
          <p className="hero-trust-text">
            No charges. No obligation. Just honest guidance.
          </p>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white border-b border-[#F0F0F0] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Mobile: 2×2 grid */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {[
              { icon: "📋", bold: "Free 1-on-1,", text: "Counselling" },
              { icon: "🎓", bold: "2,000+", text: "Students Admitted" },
              { icon: "🎯", bold: "95%", text: "Visa Approval Rate" },
              { icon: "🏆", bold: "ICEF", text: "Accredited Agency" },
            ].map((item) => (
              <div key={item.bold} className="flex items-center gap-2.5 bg-[#F8F9FF] rounded-xl px-3 py-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div className="text-[13px] font-semibold text-[#001353] leading-snug">
                  <strong>{item.bold}</strong><br />{item.text}
                </div>
              </div>
            ))}
          </div>
          {/* Desktop: single row */}
          <div className="hidden sm:flex flex-nowrap items-center justify-center gap-x-4 sm:gap-x-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { icon: "📋", bold: "Free 1-on-1,", text: "Counselling" },
              { icon: "🎓", bold: "2,000+", text: "Students Admitted" },
              { icon: "🎯", bold: "95%", text: "Visa Approval Rate" },
              { icon: "🏆", bold: "ICEF", text: "Accredited Agency" },
            ].map((item, i, arr) => (
              <div key={item.bold} className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-semibold text-[#001353] whitespace-nowrap">
                  <span className="text-sm">{item.icon}</span>
                  <span><strong>{item.bold}</strong> {item.text}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-5 bg-[#D0D5E0] flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="uk-what-section">
        <div className="container">
          <h2 className="section-title">
            What to Expect at UK Education Expo
          </h2>
          <p className="uk-what-subtitle">
            Intake openings and on-the-day benefits — all in one place.
          </p>

          {/* Intake Status Dashboard */}
          <div className="uk-intake-card">
            <p className="uk-section-label">UK Intake Status</p>
            <div className="uk-intake-grid">
              <div className="uk-intake-col">
                <div className="uk-status-row">
                  <span className="uk-status-dot pulse uk-status-dot--red"></span>
                  <span className="uk-status-label uk-status-label--red">Last Call</span>
                </div>
                <h4 className="uk-intake-name">July/August 2026</h4>
                <p className="uk-intake-rec">
                  Limited courses available; apply today for CAS processing.
                </p>
              </div>
              <div className="uk-intake-col">
                <div className="uk-status-row">
                  <span className="uk-status-dot uk-status-dot--green"></span>
                  <span className="uk-status-label uk-status-label--green">Open</span>
                </div>
                <h4 className="uk-intake-name">September 2026</h4>
                <p className="uk-intake-rec">
                  Best time to apply for popular Business, Data Science, and Engineering programs.
                </p>
              </div>
              <div className="uk-intake-col">
                <div className="uk-status-row">
                  <span className="uk-status-dot uk-status-dot--blue"></span>
                  <span className="uk-status-label uk-status-label--blue">Pre-Registration</span>
                </div>
                <h4 className="uk-intake-name">January 2027</h4>
                <p className="uk-intake-rec">
                  Early bird applications for competitive healthcare and law programs.
                </p>
              </div>
            </div>
          </div>

          {/* Event Highlights */}
          <p className="uk-section-label">Event Highlights</p>
          <div className="uk-highlights-grid">
            <div className="uk-highlight-card uk-highlight-card--red">
              <span className="uk-card-num">01</span>
              <div className="uk-card-icon uk-card-icon--red">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#e04562">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <h3 className="uk-card-title">On-the-Spot Assessment</h3>
              <p className="uk-card-desc">
                Bring your academic documents for an immediate eligibility check.
              </p>
            </div>

            <div className="uk-highlight-card uk-highlight-card--green">
              <span className="uk-card-num">02</span>
              <div className="uk-card-icon uk-card-icon--green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#4caf50">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                </svg>
              </div>
              <h3 className="uk-card-title">Scholarship Guidance</h3>
              <p className="uk-card-desc">
                Discover internal university scholarships ranging from £2,000 to £5,000.
              </p>
            </div>

            <div className="uk-highlight-card uk-highlight-card--blue">
              <span className="uk-card-num">03</span>
              <div className="uk-card-icon uk-card-icon--blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#667eea">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </div>
              <h3 className="uk-card-title">Credential Evaluation</h3>
              <p className="uk-card-desc">
                Guidance on MOI (Medium of Instruction) waivers for IELTS/PTE.
              </p>
            </div>

            <div className="uk-highlight-card uk-highlight-card--amber">
              <span className="uk-card-num">04</span>
              <div className="uk-card-icon uk-card-icon--amber">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFA726">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                </svg>
              </div>
              <h3 className="uk-card-title">Post-Study Work (PSW)</h3>
              <p className="uk-card-desc">
                Detailed briefing on Graduate Route Visa opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni */}
      <AlumniSection />

      {/* Participating Universities */}
      <section className="py-12 overflow-hidden" style={{ background: "#F8F9FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1E6DEB] mb-3">
            Participating Universities
          </p>
          <h2 className="text-[26px] sm:text-[32px] font-bold leading-tight mb-3" style={{ color: "#0D1282" }}>
            Top Universities Attending
          </h2>
          <p className="text-[15px] max-w-xl mx-auto" style={{ color: "#5a6275", lineHeight: 1.7 }}>
            Meet the top UK universities joining us at UK Education Expo 2026
          </p>
        </div>

        {(() => {
          const expoUnis = [
            { name: "University of East London", logo: "/images/universities/uk/University-of-East-London.webp" },
            { name: "University of Roehampton", logo: "/images/universities/uk/University-of-Roehampton.webp" },
            { name: "Arden University", logo: null },
            { name: "University of Sunderland", logo: "/images/universities/uk/University-of-Sunderland.webp" },
            { name: "Ulster University", logo: "/images/universities/uk/Ulster-University.webp" },
            { name: "BPP University", logo: "/images/universities/uk/BPP-University.webp" },
            { name: "York St John University", logo: "/images/universities/uk/York-St-John-University.webp" },
            { name: "University of Worcester", logo: "/images/universities/uk/University-of-Worcester.webp" },
            { name: "University of Law", logo: "/images/universities/uk/The-University-of-Law.webp" },
            { name: "London Metropolitan University", logo: null },
            { name: "University College Birmingham", logo: null },
          ];
          const doubled = [...expoUnis, ...expoUnis];
          return (
            <div className="expo-marquee-row relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 z-10" style={{ background: "linear-gradient(to right, #F8F9FF, transparent)" }} />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 z-10" style={{ background: "linear-gradient(to left, #F8F9FF, transparent)" }} />
              <div className="expo-marquee-track flex w-max gap-5 px-5" style={{ animation: "expo-marquee-left 30s linear infinite" }}>
                {doubled.map((uni, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl px-5 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 border border-[#eef1f6]"
                    style={{ width: 160, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  >
                    <div className="w-full flex items-center justify-center" style={{ height: 52 }}>
                      {uni.logo ? (
                        <img
                          src={uni.logo}
                          alt={uni.name}
                          width={130}
                          height={48}
                          decoding="async"
                          loading="lazy"
                          style={{ maxHeight: 48, objectFit: "contain" }}
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-[15px] font-bold flex-shrink-0"
                          style={{ background: "#EBF2FF", color: "#1E6DEB" }}
                        >
                          {uni.name.split(" ").filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join("")}
                        </div>
                      )}
                    </div>
                    <p className="text-[12px] font-medium text-center leading-snug" style={{ color: "#6b7280" }}>
                      {uni.name}
                    </p>
                  </div>
                ))}
              </div>
              <style>{`
                @keyframes expo-marquee-left {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .expo-marquee-row:hover .expo-marquee-track {
                  animation-play-state: paused;
                }
              `}</style>
            </div>
          );
        })()}
        <p className="text-center text-[13px] mt-6" style={{ color: "#9ca3af" }}>
          and many more universities attending
        </p>
      </section>

      {/* Why Admizz */}
      <section className="why-admizz-section">
        <div className="container">
          <h2 className="section-title">Why Choose Admizz?</h2>
          <p className="section-subtitle">
            Unlike single-country consultancies, we offer:
          </p>
          <div className="why-cards">
            <div className="why-card">
              <div className="why-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <h3>Multi-Destination Expertise</h3>
              <p>11+ countries, one consultancy. Not limited to single-country advice.</p>
            </div>
            <div className="why-card">
              <div className="why-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <h3>Switch Without Losing Time</h3>
              <p>Change your destination and keep your intake timeline intact.</p>
            </div>
            <div className="why-card">
              <div className="why-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
              <h3>Transparent Guidance</h3>
              <p>Real talk on visa strength, finances &amp; realistic backup options.</p>
            </div>
          </div>
          <div className="why-trust-bar">
            <span>🏆 ICEF Accredited</span>
            <span>•</span>
            <span>🎓 2,000+ Students Enrolled</span>
            <span>•</span>
            <span>🌍 50+ Partner Universities</span>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <UniversityPartners universities={allUniversities} />

      {/* Banking Partner */}
      <section className="py-10 px-4 bg-white border-t border-b border-[#F0F0F0]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#31429C] mb-5">
            Official Banking Partner
          </p>

          {/* Logo card */}
          <div className="flex justify-center mb-6">
            <div
              className="bg-white rounded-2xl px-10 py-6 flex items-center justify-center border border-[#eef1f6]"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", width: 300, height: 120 }}
            >
              <img
                src="/images/partners/kumari-bank.png"
                alt="Kumari Bank Limited"
                width={240}
                height={90}
                className="object-contain"
                style={{ maxHeight: 90 }}
              />
            </div>
          </div>

          {/* Feature pills */}
          {(() => {
            const bankingItems = [
              {
                label: "Education Loans",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E6DEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                ),
              },
              {
                label: "Fast Approval",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E6DEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    <path d="M8 12l3 3 5-5"/>
                  </svg>
                ),
              },
              {
                label: "Competitive Rates",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E6DEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="6" y1="18" x2="18" y2="6"/>
                    <circle cx="7" cy="7" r="2"/>
                    <circle cx="17" cy="17" r="2"/>
                  </svg>
                ),
              },
            ];
            return (
              <>
                {/* Mobile: 2 on first row, 1 centered on second row */}
                <div className="flex flex-col items-center gap-3 sm:hidden">
                  <div className="flex items-center justify-center gap-5">
                    {bankingItems.slice(0, 2).map((item, i) => (
                      <>
                        <div key={item.label} className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EBF2FF" }}>
                            {item.icon}
                          </div>
                          <span className="text-[13px] font-semibold" style={{ color: "#3d4663" }}>{item.label}</span>
                        </div>
                        {i === 0 && <div key="divider-mobile" className="w-px flex-shrink-0" style={{ height: "20px", background: "#D0D5E0" }} />}
                      </>
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    {bankingItems.slice(2).map((item) => (
                      <div key={item.label} className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EBF2FF" }}>
                          {item.icon}
                        </div>
                        <span className="text-[13px] font-semibold" style={{ color: "#3d4663" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Desktop: single row with dividers */}
                <div className="hidden sm:flex items-center justify-center" style={{ gap: "0" }}>
                  {bankingItems.map((item, i, arr) => (
                    <>
                      <div key={item.label} className="flex items-center gap-2.5" style={{ padding: "0 28px" }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EBF2FF" }}>
                          {item.icon}
                        </div>
                        <span className="text-[13px] font-semibold whitespace-nowrap" style={{ color: "#3d4663" }}>{item.label}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div key={`divider-${i}`} className="w-px flex-shrink-0" style={{ height: "20px", background: "#D0D5E0" }} />
                      )}
                    </>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>


      {/* Slide-in Registration Panel */}
      <div className="register-panel-overlay" id="registerOverlay"></div>
      <div className="register-panel" id="registerPanel">
        <div className="register-panel-header">
          <button type="button" className="register-panel-back" id="backRegisterPanel">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            <span>Back</span>
          </button>
          <h2>Book FREE Consultation</h2>
          <button type="button" className="register-panel-close" id="closeRegisterPanel">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <div className="register-panel-body">
          <div className="mobile-back-bar" id="mobileBackBar">
            <button type="button" className="mobile-back-btn" id="mobileBackBtn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              <span>Back to Event</span>
            </button>
          </div>

          <form
            id="admissionForm"
            className="register-panel-form"
            data-thank-you="https://admizzeducation.com/thank-you/"
          >
            <div className="form-section">
              <div className="form-section-header">
                <span className="form-section-icon">👤</span>
                <span className="form-section-title">Personal Details</span>
              </div>
              <div className="panel-form-row">
                <div className="panel-form-group">
                  <input type="text" name="Name" id="firstName" placeholder="First name" required />
                </div>
                <div className="panel-form-group">
                  <input type="text" name="Last Name" id="lastName" placeholder="Last name" required />
                </div>
              </div>
              <div className="panel-form-group">
                <input type="email" name="Email" id="email" placeholder="Email address" required />
              </div>
              <div className="panel-form-row">
                <div className="panel-form-group panel-form-country">
                  <select name="Country" id="countryCode">
                    <option value="NP" data-code="+977">Nepal (NP)</option>
                    <option value="IN" data-code="+91">India (IN)</option>
                    <option value="GB" data-code="+44">United Kingdom (GB)</option>
                    <option value="US" data-code="+1">United States (US)</option>
                    <option value="AU" data-code="+61">Australia (AU)</option>
                    <option value="CA" data-code="+1">Canada (CA)</option>
                  </select>
                </div>
                <div className="panel-form-group panel-form-phone">
                  <input type="tel" name="PhoneNo" id="phoneNumber" placeholder="+977" required />
                </div>
              </div>
              <div className="panel-form-group">
                <input type="text" name="City" id="cityName" placeholder="Enter your city name" required />
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-header">
                <span className="form-section-icon">🎓</span>
                <span className="form-section-title">Study Preferences</span>
              </div>
              <div className="panel-form-group">
                <select name="preferedDestination" id="studyDestination" defaultValue="UK" required>
                  <option value="">Select preferred study destination</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="India">India</option>
                  <option value="France">France</option>
                  <option value="Denmark">Denmark</option>
                  <option value="UAE">UAE</option>
                  <option value="Germany">Germany</option>
                  <option value="Finland">Finland</option>
                </select>
              </div>
              <div className="panel-form-row">
                <div className="panel-form-group">
                  <select name="studyLevel" id="studyLevel" required>
                    <option value="">Level of study</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Doctorate">Doctorate / PhD</option>
                    <option value="Diploma">Diploma / Certificate</option>
                    <option value="Foundation">Foundation Year</option>
                  </select>
                </div>
                <div className="panel-form-group">
                  <select name="studyProgram" id="studyProgram" required>
                    <option value="">Study program</option>
                    <option value="Engineering & Technology">Engineering &amp; Technology</option>
                    <option value="Allied Health Sciences">Allied Health Sciences</option>
                    <option value="Humanities & Social Sciences">Humanities &amp; Social Sciences</option>
                    <option value="Business & Management">Business &amp; Management</option>
                    <option value="Law & Legal Studies">Law &amp; Legal Studies</option>
                    <option value="Architecture & Design">Architecture &amp; Design</option>
                    <option value="Applied Sciences">Applied Sciences</option>
                    <option value="Medical & Pharmacy">Medical &amp; Pharmacy</option>
                  </select>
                </div>
              </div>
            </div>

            <input type="hidden" name="Date" id="date-input" />
            <input type="hidden" name="Time" id="time-input" />
            <input type="hidden" name="Id" value="1" />
            <input type="hidden" name="Src" value="AdmizzEdu-UK-Education-Expo" />
            <input type="hidden" name="utm_source" id="utm_source" />
            <input type="hidden" name="utm_medium" id="utm_medium" />
            <input type="hidden" name="utm_campaign" id="utm_campaign" />
            <input type="hidden" name="utm_term" id="utm_term" />
            <input type="hidden" name="utm_content" id="utm_content" />
            <input type="hidden" name="referrer_url" id="referrer_url" />
            <input type="hidden" name="landing_page" id="landing_page" />

            <div className="form-section form-section-submit">
              <div className="panel-form-checkbox">
                <input type="checkbox" name="consent" id="termsConditions" required />
                <label htmlFor="termsConditions">
                  I have read and agreed to{" "}
                  <a href="https://admizzeducation.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
                    terms &amp; conditions
                  </a>
                </label>
              </div>
              <button type="submit" className="btn-panel-submit" id="submit">
                Book My Slot
              </button>
            </div>
          </form>
        </div>
      </div>

      <UKEducationExpoInit />
    </>
  );
}
