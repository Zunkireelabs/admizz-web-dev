import type { Metadata } from "next";
import SpinWheelInit from "./SpinWheelInit";
import AlumniSection from "@/components/ui/AlumniSection";
import FAQ from "@/components/ui/FAQ";
import type { AlumniCard } from "@/components/ui/AlumniSection";

export const metadata: Metadata = {
  title: "Study Abroad Rewards Event | Admizz Education",
  description: "Unlock exclusive rewards on your study abroad journey. Discover laptops, flight tickets & more — plus free expert counselling from Admizz Education's ICEF-accredited agency.",
};

const SPIN_AND_WIN_ALUMNI_ROW1 = [
  { img: "Dipesh_Kalwar_2024_UK.jpg", name: "Dipesh Kalwar", uni: "", batch: "2024", destination: "🇬🇧 UK" },
  { img: "Dipesh_Yadav_2024_UK.jpg", name: "Dipesh Yadav", uni: "", batch: "2024", destination: "🇬🇧 UK" },
  { img: "Pankaj_Kumar_Yadav_2024_UK.jpg", name: "Pankaj Kumar Yadav", uni: "", batch: "2024", destination: "🇬🇧 UK" },
  { img: "Pujeet_Patel_2024_UK.jpg", name: "Pujeet Patel", uni: "", batch: "2024", destination: "🇬🇧 UK" },
  { img: "Rakesh_Ray_2024_UK.jpg", name: "Rakesh Ray", uni: "", batch: "2024", destination: "🇬🇧 UK" },
  { img: "Ravi_Kumar_Yadav_2024_UK.jpg", name: "Ravi Kumar Yadav", uni: "", batch: "2024", destination: "🇬🇧 UK" },
  { img: "Rohit_Rauniyar_2024_UK.jpg", name: "Rohit Rauniyar", uni: "", batch: "2024", destination: "🇬🇧 UK" },
  { img: "Rupesh_Kumar_Singh_2024_UK.jpg", name: "Rupesh Kumar Singh", uni: "", batch: "2024", destination: "🇬🇧 UK" },
  { img: "Satyam_Jaiswal_2024_UK.jpg", name: "Satyam Jaiswal", uni: "", batch: "2024", destination: "🇬🇧 UK" },
  { img: "AadityaPrasadYadav_2025_UK.jpg", name: "Aaditya Prasad Yadav", uni: "", batch: "2025", destination: "🇬🇧 UK" },
  { img: "AnshuKumariMahato_2025_UK.jpg", name: "Anshu Kumari Mahato", uni: "", batch: "2025", destination: "🇬🇧 UK" },
  { img: "Ashish_Kumar_2025_UK.jpg", name: "Ashish Kumar", uni: "", batch: "2025", destination: "🇬🇧 UK" },
  { img: "Ashok_Upreti_2025_USA.jpg", name: "Ashok Upreti", uni: "", batch: "2025", destination: "🇺🇸 USA" },
  { img: "Bibek_Kandel_2025_UK.jpg", name: "Bibek Kandel", uni: "", batch: "2025", destination: "🇬🇧 UK" },
  { img: "Neharika-UKGurung_2025.jpg", name: "Neharika Gurung", uni: "", batch: "2025", destination: "🇬🇧 UK" },
  { img: "Niraj_Bhattarai_2025_UK.jpg", name: "Niraj Bhattarai", uni: "", batch: "2025", destination: "🇬🇧 UK" },
];

const SPIN_AND_WIN_ALUMNI_ROW2 = [
  { img: "Niranjan_Kumar_Sah_Haluwai_2025_UK.jpg", name: "Niranjan Kumar Sah", uni: "", batch: "2025", destination: "🇬🇧 UK" },
  { img: "Pratik_Adhikari_2025_UK.jpg", name: "Pratik Adhikari", uni: "", batch: "2025", destination: "🇬🇧 UK" },
  { img: "Rajesh_Kumar_Sah_2025_UK.jpg", name: "Rajesh Kumar Sah", uni: "", batch: "2025", destination: "🇬🇧 UK" },
  { img: "SnehaBhandari_2025_UK.jpg", name: "Sneha Bhandari", uni: "", batch: "2025", destination: "🇬🇧 UK" },
  { img: "Aashis_Kuswar_2026_UK.jpeg", name: "Aashis Kuswar", uni: "York St John", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Abhishek_Kumar_Patel_2026_UK.jpeg", name: "Abhishek Kumar Patel", uni: "Roehampton", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Bhisan_Prasad_Sah_2026_UK.jpeg", name: "Bhisan Prasad Sah", uni: "BPP University", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Bikash_Sah_Teli_2026_UK.jpeg", name: "Bikash Sah Teli", uni: "BPP University", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Biky_Sah_Teli_2026_UK.jpeg", name: "Biky Sah Teli", uni: "Roehampton", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Bishnu_Sahi_2026_UK.jpeg", name: "Bishnu Sahi", uni: "York St John", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Gyanu_Lama_2026_UK.jpeg", name: "Gyanu Lama", uni: "Univ. of East London", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Nabin_Thaguna_2026_UK.jpeg", name: "Nabin Thaguna", uni: "York St John", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Rajan_Sah_2026_UK.jpeg", name: "Rajan Sah", uni: "Univ. of Greenwich", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Sandeep_Thapa_Chhetri_2026_UK.jpeg", name: "Sandeep Thapa Chhetri", uni: "Univ. of East London", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Shiv_Raj_Patel_2026_UK.jpeg", name: "Shiv Raj Patel", uni: "BPP University", batch: "2026", destination: "🇬🇧 UK" },
  { img: "Twinkle_Kumari_Gupta_2026_UK.jpeg", name: "Twinkle Kumari Gupta", uni: "York St John", batch: "2026", destination: "🇬🇧 UK" },
];

const faqItems = [
  {
    question: "What is Admizz Education and how does it help students study abroad?",
    answer: "Admizz Education is a global study-abroad platform that helps students find, apply, and secure admissions to top universities worldwide. From course shortlisting to application guidance, scholarships, SOP support, and visa processing, Admizz simplifies every step of the international education journey.",
  },
  {
    question: "Which countries can I apply to through Admizz Education?",
    answer: "You can apply to leading study-abroad destinations such as the USA, UK, Canada, Australia, New Zealand, India, Dubai, and other top European countries. Admizz provides end-to-end admission support for undergraduate, postgraduate, diploma, and pathway programs.",
  },
  {
    question: "Does Admizz Education help with university shortlisting?",
    answer: "Yes. Admizz uses expert counsellors and AI-assisted tools to shortlist universities that match your academic profile, preferred country, career goals, and budget. You receive a personalized list of universities with high acceptance chances.",
  },
  {
    question: "Can Admizz assist with SOP, LOR, and application documents?",
    answer: "Absolutely. Admizz provides professional guidance for SOPs, LORs, resumes, essays, and application forms. The team ensures your documents meet global university standards and increase your chances of admission.",
  },
  {
    question: "Does Admizz help students with scholarships and fee waivers?",
    answer: "Yes. Admizz identifies eligible scholarship opportunities based on your academic performance, program selection, and country preferences. You also receive support for university fee waivers and financial documentation for visa applications.",
  },
  {
    question: "What is the process to apply for a study-abroad program through Admizz Education?",
    answer: "The process includes: 1. Profile evaluation 2. Course and country selection 3. University shortlisting 4. Application submission 5. Document preparation 6. Offer letter guidance 7. Visa application support 8. Pre-departure assistance. Admizz makes the entire process fast, transparent, and stress-free.",
  },
  {
    question: "Does Admizz provide visa guidance for international students?",
    answer: "Yes. Admizz offers end-to-end visa support including document preparation, financial planning, interview training, and step-by-step guidance to ensure a smooth and successful student visa application.",
  },
  {
    question: "Is Admizz Education free for students?",
    answer: "Admizz offers free counselling and guidance for many services. Some specialized services—like premium documentation, fast-track applications, and certain country-specific processing—may involve additional charges. Students are always informed upfront.",
  },
  {
    question: "How long does it take to get admission through Admizz Education?",
    answer: "The timeline depends on the country, intake, university, and program. Typically, the entire admission cycle—shortlisting, application submission, and receiving an offer—takes 2 to 12 weeks. Early applicants usually receive faster decisions.",
  },
  {
    question: "Why should I choose Admizz Education over other study-abroad consultancies?",
    answer: "Admizz combines expert counsellors with advanced technology to offer accurate university matches, faster processing, transparent workflows, and a higher visa success rate. Students benefit from personalized support, global partner universities, and a seamless digital platform.",
  },
];


export default function SpinAndWinPage() {
  return (
    <>
      {/* Event-specific CSS */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="/events/css/admission-page.css" />
      <link rel="stylesheet" href="/events/css/spin-demo.css" />
      {/* Critical inline CSS — prevents white FOUC before external stylesheets load */}
      <style>{`html,body{background:#050d2d}.spin-demo{background:#050d2d;min-height:100vh}.spin-demo .sd-hero{background:linear-gradient(135deg,#001353 0%,#0066cc 100%)}.spin-demo .trust-section{background:#fff}`}</style>

      <div className="spin-demo">

        {/* Hero */}
        <section className="sd-hero" id="spinWheelSection">
          <div className="sd-hero-inner">
            <div className="sd-hero-text">
              <p className="sd-eyebrow">🎓 Exclusive Rewards Event</p>
              <h1>Unlock Your Study Abroad Reward</h1>
              <p className="sd-hero-sub">3 complimentary chances to unlock an exclusive reward. Discover yours and take the first step toward your study abroad journey.</p>
              <div className="sd-spin-counter" id="sdSpinCounter" data-state="ok">3 chances remaining</div>
            </div>
            <div className="sd-wheel-stage">
              <div className="sd-wheel-frame">
                <div className="wheel-pointer"></div>
                <canvas id="wheelCanvas" width="340" height="340"></canvas>
              </div>
              <button type="button" id="sdSpinBtn" className="sd-spin-btn is-ready">Discover</button>
              <p style={{ marginTop: "14px", fontSize: "13px", color: "rgba(255,255,255,0.75)", textAlign: "center", lineHeight: 1.5 }}>
                By spinning, you agree to our{" "}
                <a
                  href="/events/spin-and-win-terms-and-conditions"
                  style={{ color: "rgba(255,255,255,0.95)", textDecoration: "underline" }}
                >
                  Terms &amp; Conditions
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="trust-section">
          <div className="container">
            <div className="trust-inline">
              <div className="trust-badge"><span className="trust-icon">🎁</span><span className="trust-text"><strong>Real Rewards,</strong> Real Students</span></div>
              <div className="trust-divider"></div>
              <div className="trust-badge"><span className="trust-icon">🎓</span><span className="trust-text"><strong>2,000+</strong> Students Admitted</span></div>
              <div className="trust-divider"></div>
              <div className="trust-badge"><span className="trust-icon">🎯</span><span className="trust-text"><strong>95%</strong> Visa Approval Rate</span></div>
              <div className="trust-divider"></div>
              <div className="trust-badge"><span className="trust-icon">🏆</span><span className="trust-text"><strong>ICEF</strong> Accredited Agency</span></div>
            </div>
          </div>
        </section>

        {/* Result Modal */}
        <div className="sd-modal sd-result-modal" id="sdResultModal" aria-hidden="true" role="dialog">
          <div className="sd-modal-card">
            <div className="sd-confetti">🎉</div>
            <h2>You&apos;ve Unlocked a Reward!</h2>
            <p>Your exclusive reward:</p>
            <div className="sd-prize" id="sdResultPrize">—</div>
            <button type="button" className="sd-btn-primary" id="sdClaimBtn">Claim Your Reward</button>
            <button type="button" className="sd-btn-secondary" id="sdTryAgainBtn">
              Try Again (<span id="sdSpinsLeft">2</span> chances left)
            </button>
          </div>
        </div>

        {/* Form Modal */}
        <div className="sd-modal sd-form-modal" id="sdFormModal" aria-hidden="true" role="dialog" aria-label="Claim your prize">
          <div className="sd-form-shell">
            <header>
              <button type="button" id="sdFormBack" aria-label="Back">←</button>
              <button type="button" id="sdFormClose" aria-label="Close">×</button>
            </header>
            <div className="sd-form-body" id="sdFormBody"></div>
            <footer>
              <button type="button" className="sd-btn-primary" id="sdFormNext">Next →</button>
            </footer>
          </div>
        </div>

        {/* Alumni Section */}
        <AlumniSection
          alumni={[SPIN_AND_WIN_ALUMNI_ROW1, SPIN_AND_WIN_ALUMNI_ROW2]}
          title="Students Who Made It"
          imagePath="/events/assets/alumni/"
        />

        {/* Services */}
        <section className="services-section">
          <div className="container">
            <p className="services-eyebrow">Our Services</p>
            <h2 className="section-title">Plan Your Study Abroad Journey</h2>
            <p className="services-subtitle">End-to-end support from career counselling to post-arrival — we guide you through every step.</p>
            <div className="services-grid">
              {[
                { color: "#1E6DEB", bg: "#EBF3FF", label: "Test Preparation", desc: "Ace your IELTS, TOEFL, GRE, PTE, SAT and other exams with expert-led coaching, practice tests, and personalized study plans designed to maximize your score.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" },
                { color: "#3FB5A0", bg: "#EDFAF7", label: "Career Counseling", desc: "Get personalized guidance from experienced counselors who understand global education opportunities and can help align your academic path with your career goals.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                { color: "#E86F3C", bg: "#FFF4EE", label: "Scholarships Support", desc: "Unlock financial aid opportunities with expert support in identifying and applying for scholarships, grants, and fee waivers tailored to your profile.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" },
                { color: "#BB5FEC", bg: "#F8F0FF", label: "Visa Assistance", desc: "Navigate the student visa application process with confidence through step-by-step guidance, documentation support, and interview preparation.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
              ].map((s) => (
                <div key={s.label} className="service-card" style={{ borderTop: `3px solid ${s.color}` }}>
                  <div className="service-card-icon" style={{ background: s.bg }}>
                    <svg width="20" height="20" fill="none" stroke={s.color} strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
                  </div>
                  <h3 className="service-card-title" style={{ color: s.color }}>{s.label}</h3>
                  <p className="service-card-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Admizz */}
        <section className="why-admizz-section">
          <div className="container">
            <h2 className="section-title">Why Choose Admizz?</h2>
            <p className="section-subtitle">Unlike single-country consultancies, we offer:</p>
            <div className="why-cards">
              {[
                { icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z", title: "Multi-Destination Expertise", desc: "11+ countries, one consultancy. Not limited to single-country advice." },
                { icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z", title: "Switch Without Losing Time", desc: "Change your destination and keep your intake timeline intact." },
                { icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z", title: "Transparent Guidance", desc: "Real talk on visa strength, finances & realistic backup options." },
              ].map((w) => (
                <div key={w.title} className="why-card">
                  <div className="why-card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d={w.icon} /></svg></div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
            <div className="why-trust-bar">
              <span>🏆 ICEF Accredited Agency</span><span>•</span>
              <span>🪃 2,000+ Students Enrolled</span><span>•</span>
              <span>🌍 100+ Partner Universities</span><span>•</span>
              <span>🎯 95% Visa Approval Rate</span>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="partners-section">
          <div className="container">
            <p className="partners-eyebrow">TRUSTED PARTNERS</p>
            <h2 className="partners-heading">Trusted by 100+ Universities, Colleges &amp; Schools Worldwide</h2>
            <p className="partners-subtext">We partner with leading institutions worldwide to provide our students with the best opportunities.</p>
            <div className="partners-trust-badges">
              <div className="partners-trust-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#001353"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" /></svg>
                <span>100+ Institutions</span>
              </div>
              <div className="partners-trust-divider"></div>
              <div className="partners-trust-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#001353"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
                <span>Verified Partners</span>
              </div>
            </div>
            <div className="partners-filters">
              {["all", "USA", "UK", "Australia", "Canada", "India", "New Zealand", "Finland", "Germany", "France"].map((c) => (
                <button key={c} className={`partners-filter-btn${c === "UK" ? " active" : ""}`} data-country={c}>
                  {c === "all" ? "All" : c === "USA" ? "🇺🇸 USA" : c === "UK" ? "🇬🇧 UK" : c === "Australia" ? "🇦🇺 Australia" : c === "Canada" ? "🇨🇦 Canada" : c === "India" ? "🇮🇳 India" : c === "New Zealand" ? "🇳🇿 New Zealand" : c === "Finland" ? "🇫🇮 Finland" : c === "Germany" ? "🇩🇪 Germany" : "🇫🇷 France"}
                </button>
              ))}
            </div>
          </div>
          <div className="partners-marquee-wrap">
            <div className="partners-fade partners-fade-left"></div>
            <div className="partners-fade partners-fade-right"></div>
            <div className="partners-marquee partners-marquee-row1" id="partnersRow1"></div>
          </div>
          <div className="partners-marquee-wrap">
            <div className="partners-fade partners-fade-left"></div>
            <div className="partners-fade partners-fade-right"></div>
            <div className="partners-marquee partners-marquee-row2" id="partnersRow2"></div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ
          items={faqItems}
          sidebar={true}
          sidebarSubtitle="Still unsure about studying abroad, how Admizz can get you there? Read these answers to our most commonly asked questions."
        />

      </div>{/* /.spin-demo */}

      <SpinWheelInit />
    </>
  );
}
