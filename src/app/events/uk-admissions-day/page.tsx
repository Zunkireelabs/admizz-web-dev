import type { Metadata } from "next";
import UKAdmissionsInit from "./UKAdmissionsInit";
import UniversityPartners from "../../UniversityPartners";
import { allUniversities } from "@/lib/universities";

export const metadata: Metadata = {
  title: "UK Admission Day - March 17, 2026 | Admizz Education",
  description:
    "Your Direct Pathway to Top Modern UK Universities. On-the-spot assessment, scholarship guidance, credential evaluation & PSW briefing. March 17, Putalisadak.",
};

export default function UKAdmissionsDayPage() {
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
          <h1 className="hero-main-title">UK ADMISSION DAY 2026</h1>
          <p className="hero-subtitle">
            Your Direct Pathway to Top Modern Universities
          </p>
          <p className="hero-description">
            Get on-the-spot assessment, scholarship guidance, and expert
            counselling for UK universities — all in one day.
          </p>

          <div className="hero-locations">
            <a
              href="https://share.google/XR8Cf300eyTHNsKwB"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-location-badge"
            >
              <span className="location-icon">📍</span>
              <span className="location-dates">17 March</span>
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
              data-target="2026-03-17T10:00:00"
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

      {/* Trust Badges */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-inline">
            <div className="trust-badge">
              <span className="trust-icon">🎓</span>
              <span className="trust-text"><strong>2,000+</strong> Students Enrolled</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-badge">
              <span className="trust-icon">🌍</span>
              <span className="trust-text"><strong>11+</strong> Countries</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-badge">
              <span className="trust-icon">✅</span>
              <span className="trust-text"><strong>100%</strong> FREE</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-badge">
              <span className="trust-icon">🏆</span>
              <span className="trust-text"><strong>ICEF</strong> Accredited</span>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="uk-what-section">
        <div className="container">
          <h2 className="section-title">
            What to Expect at UK Admission Day
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
                <h4 className="uk-intake-name">May/June 2026</h4>
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

      {/* Prizes / Spin Wheel */}
      <section className="prizes-section prizes-section--white" id="spinWheelSection">
        <div className="container">
          <h2 className="prizes-heading">
            Every Registration = A Chance to Win Amazing Prizes!
          </h2>

          <div className="spin-wheel-layout">
            <div className="spin-wheel-left">
              <div className="wheel-container">
                <div className="wheel-pointer"></div>
                <canvas id="wheelCanvas" width="340" height="340"></canvas>
              </div>
            </div>

            <div className="spin-wheel-right">
              <div className="spin-content-panel" id="spinContentPanel">
                <div className="spin-content-header">
                  <span className="spin-gift-icon">🎁</span>
                  <h3>Spin to Win!</h3>
                </div>
                <p className="spin-content-desc">
                  Register for UK ADMISSION DAY and get a chance to win these
                  amazing prizes!
                </p>
                <div className="spin-prizes-grid">
                  <div className="spin-prize-item"><span>💻</span> Laptop</div>
                  <div className="spin-prize-item"><span>📱</span> Smart Phone</div>
                  <div className="spin-prize-item"><span>📱</span> Tablet</div>
                  <div className="spin-prize-item"><span>⌚</span> Smart Watch</div>
                  <div className="spin-prize-item"><span>🎧</span> Ear Buds</div>
                  <div className="spin-prize-item"><span>✈️</span> Flight Ticket</div>
                  <div className="spin-prize-item"><span>🎬</span> Movie Ticket</div>
                  <div className="spin-prize-item"><span>📶</span> Recharge</div>
                  <div className="spin-prize-item"><span>📚</span> Test Prep</div>
                </div>
                <button type="button" className="spin-register-btn" id="showSpinFormBtn">
                  Register &amp; Spin to Win!
                </button>
              </div>

              <div className="spin-form-panel" id="spinFormPanel" style={{ display: "none" }}>
                <h3>Quick Registration</h3>
                <form id="spinWheelForm">
                  <div className="spin-form-row">
                    <input type="text" id="spinFirstName" name="Name" placeholder="First Name" required />
                    <input type="text" id="spinLastName" name="Last Name" placeholder="Last Name" required />
                  </div>
                  <input type="email" id="spinEmail" name="Email" placeholder="Email Address" required />
                  <div className="spin-form-row">
                    <select id="spinCountryCode" name="Country" defaultValue="NP" required>
                      <option value="">Country</option>
                      <option value="NP" data-code="+977">Nepal (NP)</option>
                      <option value="IN" data-code="+91">India (IN)</option>
                      <option value="GB" data-code="+44">United Kingdom (GB)</option>
                      <option value="US" data-code="+1">United States (US)</option>
                      <option value="AU" data-code="+61">Australia (AU)</option>
                      <option value="CA" data-code="+1">Canada (CA)</option>
                    </select>
                    <input type="tel" id="spinPhone" name="PhoneNo" placeholder="+977" required />
                  </div>
                  <input type="text" id="spinCity" name="City" placeholder="Enter your city name" required />
                  <select id="spinDestination" name="preferedDestination" defaultValue="UK" required>
                    <option value="">Preferred Study Destination</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="India">India</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Finland">Finland</option>
                  </select>
                  <div className="spin-form-row">
                    <select id="spinStudyLevel" name="studyLevel" required>
                      <option value="">Level of study</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="Doctorate">Doctorate / PhD</option>
                      <option value="Diploma">Diploma / Certificate</option>
                      <option value="Foundation">Foundation Year</option>
                    </select>
                    <select id="spinStudyProgram" name="studyProgram" required>
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
                  <label className="spin-checkbox">
                    <input type="checkbox" id="spinTerms" required />
                    <span>I agree to the Terms &amp; Conditions</span>
                  </label>
                  <input type="hidden" name="Src" value="AdmizzEdu-UK-Admissions-Day-spin-form" />
                  <input type="hidden" id="spin-prize-input" name="Prize" />
                  <input type="hidden" id="spin-date-input" name="date" />
                  <input type="hidden" id="spin-time-input" name="time" />
                  <input type="hidden" id="spin-utm-source" name="utm_source" />
                  <input type="hidden" id="spin-utm-medium" name="utm_medium" />
                  <input type="hidden" id="spin-utm-campaign" name="utm_campaign" />
                  <input type="hidden" id="spin-utm-term" name="utm_term" />
                  <input type="hidden" id="spin-utm-content" name="utm_content" />
                  <input type="hidden" id="spin-referrer" name="referrer_url" />
                  <input type="hidden" id="spin-landing" name="landing_page" />
                  <button type="submit" className="spin-submit-btn" id="spinSubmitBtn">
                    Submit &amp; Spin!
                  </button>
                </form>
                <button type="button" className="spin-back-btn" id="spinBackBtn">
                  ← Back
                </button>
              </div>

              <div className="spin-spinning-panel" id="spinSpinningPanel" style={{ display: "none" }}>
                <div className="spinning-text">
                  <span className="spinning-icon">🍀</span>
                  <h3>Spinning...</h3>
                  <p>Good luck!</p>
                </div>
              </div>

              <p className="spin-terms-note">*Terms &amp; Conditions apply</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spin Result Modal */}
      <div className="spin-result-overlay" id="spinResultOverlay"></div>
      <div className="spin-result-modal" id="spinResultModal">
        <div className="spin-result-content">
          <div className="spin-result-confetti">🎉</div>
          <h2>Congratulations!</h2>
          <p>You&apos;ve won a chance to win:</p>
          <div className="spin-result-prize" id="spinResultPrize">Laptop</div>
          <p className="spin-result-note">
            We&apos;ll contact you if you&apos;re selected as a winner!
          </p>
          <button type="button" className="spin-result-btn" id="spinResultClose">
            Continue
          </button>
        </div>
      </div>

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
            <input type="hidden" name="Src" value="AdmizzEdu-UK-Admissions-Day" />
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

      <UKAdmissionsInit />
    </>
  );
}
