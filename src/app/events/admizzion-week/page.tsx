import type { Metadata } from "next";
import AdmizzionInit from "./AdmizzionInit";

export const metadata: Metadata = {
  title: "Admizzion Week - Feb 12-20, 2026 | Admizz Education",
  description:
    "Stuck with another consultancy? Get a FREE second opinion at Admizzion Week. UK & USA Mid-2026 intakes. Profile re-evaluation, destination switching & more!",
};

export default function AdmizzionWeekPage() {
  return (
    <>
      {/* Flag Icons CDN */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
        precedence="default"
      />
      {/* Admission Page CSS */}
      <link rel="stylesheet" href="/events/css/admission-page.css" precedence="default" />

      {/* Hero Section */}
      <section className="admission-hero">
        <div className="container">
          <p className="hero-eyebrow">Admizz Education Presents</p>
          <h1 className="hero-main-title">ADMIZZION WEEK 2026</h1>
          <p className="hero-subtitle">
            Visa Rejected or Stuck Mid-Journey in Your Study Abroad Plan?
          </p>
          <p className="hero-description">
            Confused or facing delays? If your plan feels stuck, get a FREE
            second opinion from our multi-destination experts.
          </p>

          {/* Location Badges */}
          <div className="hero-locations">
            <a
              href="https://share.google/XR8Cf300eyTHNsKwB"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-location-badge"
            >
              <span className="location-icon">📍</span>
              <span className="location-dates">12–18 Feb</span>
              <span className="location-divider">|</span>
              <span className="location-place">Putalisadak, Kathmandu</span>
              <span className="location-map-badge">Map</span>
            </a>
            <a
              href="https://share.google/I6hteRtXKiBXoiL8j"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-location-badge"
            >
              <span className="location-icon">📍</span>
              <span className="location-dates">19–20 Feb</span>
              <span className="location-divider">|</span>
              <span className="location-place">Link Road, Birgunj</span>
              <span className="location-map-badge">Map</span>
            </a>
          </div>

          {/* Countdown Timer */}
          <div className="countdown-container">
            <p className="countdown-label">Event Starts In</p>
            <div
              className="countdown-timer"
              id="countdown-timer"
              data-target="2026-02-12T10:00:00"
            >
              <div className="countdown-item">
                <div className="countdown-number" id="countdown-days">
                  00
                </div>
                <div className="countdown-unit">Days</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number" id="countdown-hours">
                  00
                </div>
                <div className="countdown-unit">Hours</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number" id="countdown-minutes">
                  00
                </div>
                <div className="countdown-unit">Mins</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number" id="countdown-seconds">
                  00
                </div>
                <div className="countdown-unit">Secs</div>
              </div>
            </div>
          </div>

          {/* CTA */}
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
              <span className="trust-text">
                <strong>2,000+</strong> Students Enrolled
              </span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-badge">
              <span className="trust-icon">🌍</span>
              <span className="trust-text">
                <strong>11+</strong> Countries
              </span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-badge">
              <span className="trust-icon">✅</span>
              <span className="trust-text">
                <strong>100%</strong> FREE
              </span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-badge">
              <span className="trust-icon">🏆</span>
              <span className="trust-text">
                <strong>ICEF</strong> Accredited
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Is This For You? */}
      <section className="target-section">
        <div className="container">
          <h2 className="section-title">Is This Event For You?</h2>
          <div className="target-cards">
            <div className="target-card target-card-red">
              <div className="target-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
              <h3 className="target-card-title">
                Stuck with Another Consultancy?
              </h3>
              <ul className="target-card-list">
                <li>Slow response from your agent?</li>
                <li>Unclear guidance on process?</li>
                <li>Limited university options?</li>
              </ul>
              <p className="target-card-cta">Get a FREE second opinion</p>
              <button type="button" className="btn-target-register">
                Register Now
              </button>
            </div>

            <div className="target-card target-card-teal">
              <div className="target-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
                </svg>
              </div>
              <h3 className="target-card-title">Want to Switch Destination?</h3>
              <ul className="target-card-list">
                <li>Australia → UK pathway</li>
                <li>USA → UK alternative</li>
                <li>Canada → UK option</li>
                <li>Facing visa concerns?</li>
              </ul>
              <p className="target-card-cta">We find you alternatives</p>
              <button type="button" className="btn-target-register">
                Register Now
              </button>
            </div>

            <div className="target-card target-card-purple">
              <div className="target-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                </svg>
              </div>
              <h3 className="target-card-title">Planning for Mid-2026?</h3>
              <ul className="target-card-list">
                <li>UK: March - May intake</li>
                <li>USA: May intake</li>
                <li>Australia: June - July</li>
              </ul>
              <p className="target-card-cta">Start early, succeed faster</p>
              <button type="button" className="btn-target-register">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Destinations */}
      <section className="priority-destinations-section">
        <div className="container">
          <h2 className="section-title">Priority Destinations &amp; Intakes</h2>

          <div className="priority-box priority-high">
            <div className="priority-label">HIGH PRIORITY</div>
            <div className="priority-destinations">
              <div className="priority-dest-card">
                <span className="fi fi-gb priority-flag"></span>
                <div className="priority-dest-info">
                  <h4>UK</h4>
                  <p>March - May 2026</p>
                  <span className="priority-tag">Intakes Open!</span>
                </div>
              </div>
              <div className="priority-dest-card">
                <span className="fi fi-us priority-flag"></span>
                <div className="priority-dest-info">
                  <h4>USA</h4>
                  <p>May 2026</p>
                  <span className="priority-tag tag-urgent">
                    Limited Seats!
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="other-destinations">
            <p className="other-dest-label">Also Available:</p>
            <div className="other-dest-pills">
              <div className="dest-pill dest-pill-secondary">
                <span className="fi fi-au"></span>
                <span>Australia</span>
                <small>Jun-Jul &apos;26</small>
              </div>
              <div className="dest-pill">
                <span className="fi fi-nz"></span>
                <span>New Zealand</span>
              </div>
              <div className="dest-pill">
                <span className="fi fi-eu"></span>
                <span>Europe</span>
                <small>Sep &apos;26</small>
              </div>
              <div className="dest-pill">
                <span className="fi fi-ca"></span>
                <span>Canada</span>
              </div>
              <div className="dest-pill">
                <span className="fi fi-in"></span>
                <span>India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Marquee */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-heading-sm">
            Visit or Join Virtually — Here&apos;s What You Get
          </h2>
        </div>
        <div className="benefits-marquee-wrapper">
          <div className="benefits-marquee">
            {/* First set */}
            <div className="benefit-card-new benefit-blue">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Profile Re-evaluation</h3>
                <p>FREE assessment</p>
              </div>
            </div>
            <div className="benefit-card-new benefit-green">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Destination Switch</h3>
                <p>Change without delay</p>
              </div>
            </div>
            <div className="benefit-card-new benefit-orange">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33 .26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83L11.17 17zM17.65 14.81c-.26.66-.47 1.34-.55 1.81l-.26 1.33 4.05 4.05-1.55-3.62c.31-.13 3.6-1.53 5.89-3.57l-7.58 0zM14 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>UK/USA Fast-Track</h3>
                <p>Mid-2026 planning</p>
              </div>
            </div>
            <div className="benefit-card-new benefit-pink">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Visa Assessment</h3>
                <p>Honest guidance</p>
              </div>
            </div>
            <div className="benefit-card-new benefit-teal">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Alternative Pathways</h3>
                <p>Backup options</p>
              </div>
            </div>
            <div className="benefit-card-new benefit-gold">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>No Processing Fee</h3>
                <p>Save up to 25K</p>
              </div>
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="benefit-card-new benefit-blue">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Profile Re-evaluation</h3>
                <p>FREE assessment</p>
              </div>
            </div>
            <div className="benefit-card-new benefit-green">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Destination Switch</h3>
                <p>Change without delay</p>
              </div>
            </div>
            <div className="benefit-card-new benefit-orange">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33 .26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83L11.17 17zM17.65 14.81c-.26.66-.47 1.34-.55 1.81l-.26 1.33 4.05 4.05-1.55-3.62c.31-.13 3.6-1.53 5.89-3.57l-7.58 0zM14 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>UK/USA Fast-Track</h3>
                <p>Mid-2026 planning</p>
              </div>
            </div>
            <div className="benefit-card-new benefit-pink">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Visa Assessment</h3>
                <p>Honest guidance</p>
              </div>
            </div>
            <div className="benefit-card-new benefit-teal">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Alternative Pathways</h3>
                <p>Backup options</p>
              </div>
            </div>
            <div className="benefit-card-new benefit-gold">
              <div className="benefit-icon-new">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h3>No Processing Fee</h3>
                <p>Save up to 25K</p>
              </div>
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

      {/* Prizes / Spin Wheel Section */}
      <section className="prizes-section" id="spinWheelSection">
        <div className="container">
          <h2 className="prizes-heading">
            Every Registration = A Chance to Win Amazing Prizes!
          </h2>

          <div className="spin-wheel-layout">
            {/* Left: Wheel Canvas */}
            <div className="spin-wheel-left">
              <div className="wheel-container">
                <div className="wheel-pointer"></div>
                <canvas id="wheelCanvas" width="340" height="340"></canvas>
              </div>
            </div>

            {/* Right: Content Panel */}
            <div className="spin-wheel-right">
              {/* Initial prizes panel */}
              <div className="spin-content-panel" id="spinContentPanel">
                <div className="spin-content-header">
                  <span className="spin-gift-icon">🎁</span>
                  <h3>Spin to Win!</h3>
                </div>
                <p className="spin-content-desc">
                  Register for ADMIZZION WEEK and get a chance to win these
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
                <button
                  type="button"
                  className="spin-register-btn"
                  id="showSpinFormBtn"
                >
                  Register &amp; Spin to Win!
                </button>
              </div>

              {/* Spin form panel (hidden initially) */}
              <div
                className="spin-form-panel"
                id="spinFormPanel"
                style={{ display: "none" }}
              >
                <h3>Quick Registration</h3>
                <form id="spinWheelForm">
                  <div className="spin-form-row">
                    <input
                      type="text"
                      id="spinFirstName"
                      name="Name"
                      placeholder="First Name"
                      required
                    />
                    <input
                      type="text"
                      id="spinLastName"
                      name="Last Name"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    id="spinEmail"
                    name="Email"
                    placeholder="Email Address"
                    required
                  />
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
                    <input
                      type="tel"
                      id="spinPhone"
                      name="PhoneNo"
                      placeholder="+977"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    id="spinCity"
                    name="City"
                    placeholder="Enter your city name"
                    required
                  />
                  <select id="spinDestination" name="preferedDestination" required>
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
                  {/* Hidden fields */}
                  <input type="hidden" name="Src" value="AdmizzEdu-Admission-week-spin-form" />
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
                  <button
                    type="submit"
                    className="spin-submit-btn"
                    id="spinSubmitBtn"
                  >
                    Submit &amp; Spin!
                  </button>
                </form>
                <button type="button" className="spin-back-btn" id="spinBackBtn">
                  ← Back
                </button>
              </div>

              {/* Spinning state */}
              <div
                className="spin-spinning-panel"
                id="spinSpinningPanel"
                style={{ display: "none" }}
              >
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
          <div className="spin-result-prize" id="spinResultPrize">
            Laptop
          </div>
          <p className="spin-result-note">
            We&apos;ll contact you if you&apos;re selected as a winner!
          </p>
          <button
            type="button"
            className="spin-result-btn"
            id="spinResultClose"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Slide-in Registration Panel */}
      <div className="register-panel-overlay" id="registerOverlay"></div>
      <div className="register-panel" id="registerPanel">
        <div className="register-panel-header">
          <button
            type="button"
            className="register-panel-back"
            id="backRegisterPanel"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            <span>Back</span>
          </button>
          <h2>Book FREE Consultation</h2>
          <button
            type="button"
            className="register-panel-close"
            id="closeRegisterPanel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <div className="register-panel-body">
          <div className="mobile-back-bar" id="mobileBackBar">
            <button
              type="button"
              className="mobile-back-btn"
              id="mobileBackBtn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
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
            {/* Personal Details */}
            <div className="form-section">
              <div className="form-section-header">
                <span className="form-section-icon">👤</span>
                <span className="form-section-title">Personal Details</span>
              </div>

              <div className="panel-form-row">
                <div className="panel-form-group">
                  <input
                    type="text"
                    name="Name"
                    id="firstName"
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="panel-form-group">
                  <input
                    type="text"
                    name="Last Name"
                    id="lastName"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div className="panel-form-group">
                <input
                  type="email"
                  name="Email"
                  id="email"
                  placeholder="Email address"
                  required
                />
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
                  <input
                    type="tel"
                    name="PhoneNo"
                    id="phoneNumber"
                    placeholder="+977"
                    required
                  />
                </div>
              </div>

              <div className="panel-form-group">
                <input
                  type="text"
                  name="City"
                  id="cityName"
                  placeholder="Enter your city name"
                  required
                />
              </div>
            </div>

            {/* Study Preferences */}
            <div className="form-section">
              <div className="form-section-header">
                <span className="form-section-icon">🎓</span>
                <span className="form-section-title">Study Preferences</span>
              </div>

              <div className="panel-form-group">
                <select name="preferedDestination" id="studyDestination" required>
                  <option value="">Select preferred study destination</option>
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

            {/* Hidden Fields */}
            <input type="hidden" name="Date" id="date-input" />
            <input type="hidden" name="Time" id="time-input" />
            <input type="hidden" name="Id" value="1" />
            <input type="hidden" name="Src" value="AdmizzEdu-Admizzion-Week" />
            <input type="hidden" name="utm_source" id="utm_source" />
            <input type="hidden" name="utm_medium" id="utm_medium" />
            <input type="hidden" name="utm_campaign" id="utm_campaign" />
            <input type="hidden" name="utm_term" id="utm_term" />
            <input type="hidden" name="utm_content" id="utm_content" />
            <input type="hidden" name="referrer_url" id="referrer_url" />
            <input type="hidden" name="landing_page" id="landing_page" />

            {/* Submit */}
            <div className="form-section form-section-submit">
              <div className="panel-form-checkbox">
                <input
                  type="checkbox"
                  name="consent"
                  id="termsConditions"
                  required
                />
                <label htmlFor="termsConditions">
                  I have read and agreed to{" "}
                  <a
                    href="https://admizzeducation.com/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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

      <AdmizzionInit />
    </>
  );
}
