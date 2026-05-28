import type { Metadata } from 'next';
import EventsInit from './EventsInit';

export const metadata: Metadata = {
  title: 'Admizz Events | Admizz Education',
  description: 'Admizz Education Events — Study Abroad Guidance & Opportunities. Discover upcoming and past events to support your study-abroad journey.',
};

export default function EventsPage() {
  return (
    <>
      <link rel="stylesheet" href="/events/css/events-listing.css" />
      <EventsInit />

      {/* Hero */}
      <section className="events-hero">
        <div className="container">
          <h1 className="events-hero-title">Admizz Events</h1>
          <p className="events-hero-subtitle">Discover upcoming events for your study abroad journey</p>
        </div>
      </section>

      {/* Listing */}
      <section className="events-listing-section">
        <div className="container">
          <h2 className="events-section-title">More Events to Explore</h2>
          <p className="events-section-subtitle">Sessions that support your study-abroad success</p>

          {/* Tab Toggle */}
          <div className="events-tab-container">
            <button className="events-tab active" data-tab="upcoming">Upcoming</button>
            <button className="events-tab" data-tab="past">Past</button>
          </div>

          {/* Upcoming Grid — Spin & Win still listed; client JS moves past events to Past tab */}
          <div className="events-grid" id="upcoming-events">
            {/* Spin & Win */}
            <a href="/events/spin-and-win" className="event-card" data-event-end="2026-12-31T23:59:59">
              <div className="event-card-image" style={{ background: 'linear-gradient(135deg, #FFD93D 0%, #FF6B35 100%)' }}>
                <div className="event-card-overlay">
                  <span className="event-card-eyebrow">Limited Time Offer</span>
                  <h3 className="event-card-banner-title">SPIN &amp; WIN</h3>
                  <p className="event-card-banner-subtitle">Prizes Worth Lakhs — Up for Grabs!</p>
                </div>
                <span className="event-mode-badge event-mode-online">
                  <span className="mode-dot"></span>
                  Online
                </span>
              </div>
              <div className="event-card-content">
                <p className="event-card-date">Register &amp; Spin — Win Amazing Prizes!</p>
                <h3 className="event-card-title">Spin &amp; Win — Prizes Worth Lakhs!</h3>
                <p className="event-card-description">
                  Register for a FREE consultation and spin the wheel for a chance to win laptops, tablets, flight tickets, smart watches, and more.
                </p>
                <span className="event-card-cta">Try Now →</span>
              </div>
            </a>
          </div>

          {/* Upcoming Empty State */}
          <div className="events-empty" id="upcoming-empty" style={{ display: 'none' }}>
            <div className="events-empty-icon">📅</div>
            <h3>No upcoming events</h3>
            <p>Check back soon for new events!</p>
          </div>

          {/* Past Grid */}
          <div className="events-grid" id="past-events" style={{ display: 'none' }}>
            {/* UK Admissions Day */}
            <a href="/uk-admissions-day/" className="event-card event-card-past" data-event-end="2026-03-17T17:00:00">
              <div className="event-card-image" style={{ background: 'linear-gradient(135deg, #012169 0%, #C8102E 100%)' }}>
                <div className="event-card-overlay event-card-overlay--light">
                  <span className="event-card-eyebrow">Admizz Education Presents</span>
                  <h3 className="event-card-banner-title">UK ADMISSION DAY 2026</h3>
                  <p className="event-card-banner-subtitle">Your Direct Pathway to Top UK Universities</p>
                </div>
                <span className="event-mode-badge event-mode-inperson">
                  <span className="mode-dot"></span>
                  In-Person
                </span>
                <span className="event-past-badge">Past Event</span>
              </div>
              <div className="event-card-content">
                <p className="event-card-date">March 17, 2026 • 10:00 AM</p>
                <h3 className="event-card-title">UK Admission Day — Putalisadak, Kathmandu</h3>
                <p className="event-card-description">
                  On-the-spot assessment, scholarship guidance, and expert counselling for UK universities — all in one day.
                </p>
                <span className="event-card-cta">View Details →</span>
              </div>
            </a>

            {/* Admizzion Week */}
            <a href="/admizzion-week/" className="event-card event-card-past" data-event-end="2026-02-20T17:00:00">
              <div className="event-card-image" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="event-card-overlay event-card-overlay--light">
                  <span className="event-card-eyebrow">Admizz Education Presents</span>
                  <h3 className="event-card-banner-title">ADMIZZION WEEK 2026</h3>
                  <p className="event-card-banner-subtitle">Visa Rejected or Stuck Mid-Journey?</p>
                </div>
                <span className="event-mode-badge event-mode-inperson">
                  <span className="mode-dot"></span>
                  In-Person
                </span>
                <span className="event-past-badge">Past Event</span>
              </div>
              <div className="event-card-content">
                <p className="event-card-date">Feb 12 – 20, 2026 • 10:00 AM</p>
                <h3 className="event-card-title">Admizzion Week — Kathmandu &amp; Birgunj</h3>
                <p className="event-card-description">
                  Confused or facing delays? Get a FREE second opinion from our multi-destination experts for UK, USA, Australia and more.
                </p>
                <span className="event-card-cta">View Details →</span>
              </div>
            </a>
          </div>

          {/* Past Empty State */}
          <div className="events-empty" id="past-empty" style={{ display: 'none' }}>
            <div className="events-empty-icon">📅</div>
            <h3>No past events</h3>
            <p>Events you&apos;ve attended will appear here.</p>
          </div>
        </div>
      </section>
    </>
  );
}
