import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import EventsInit from './EventsInit';

export const metadata: Metadata = {
  title: 'Admizz Events | Admizz Education',
  description: 'Admizz Education Events — Study Abroad Guidance & Opportunities. Discover upcoming and past events to support your study-abroad journey.',
};

interface EventMeta {
  title: string;
  eyebrow: string;
  bannerTitle: string;
  subtitle: string;
  description: string;
  dateLabel: string;
  ctaText: string;
  endDate: string;
  gradient: string;
  mode: 'online' | 'in-person';
  overlayLight?: boolean;
  href: string;
}

function getEvents(): EventMeta[] {
  const eventsDir = path.join(process.cwd(), 'src/app/events');
  const entries = fs.readdirSync(eventsDir, { withFileTypes: true });

  const events: EventMeta[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const metaPath = path.join(eventsDir, entry.name, 'meta.json');
    if (!fs.existsSync(metaPath)) continue;
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) as EventMeta;
    events.push(meta);
  }

  // Sort by endDate descending so newest events appear first
  return events.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
}

export default function EventsPage() {
  const events = getEvents();

  return (
    <>
      <link rel="stylesheet" href="/events/css/events-listing.css" precedence="default" />
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

          {/* All events start here — EventsInit moves past ones to the past grid automatically */}
          <div className="events-grid" id="upcoming-events">
            {/* Spin & Win — hardcoded (folder permission prevents meta.json) */}
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
            {events.map((event) => (
              <a
                key={event.href}
                href={event.href}
                className="event-card"
                data-event-end={event.endDate}
              >
                <div className="event-card-image" style={{ background: event.gradient }}>
                  <div className={`event-card-overlay${event.overlayLight ? ' event-card-overlay--light' : ''}`}>
                    <span className="event-card-eyebrow">{event.eyebrow}</span>
                    {event.bannerTitle && <h3 className="event-card-banner-title">{event.bannerTitle}</h3>}
                    <p className="event-card-banner-subtitle">{event.subtitle}</p>
                  </div>
                  <span className={`event-mode-badge event-mode-${event.mode === 'online' ? 'online' : 'inperson'}`}>
                    <span className="mode-dot"></span>
                    {event.mode === 'online' ? 'Online' : 'In-Person'}
                  </span>
                </div>
                <div className="event-card-content">
                  <p className="event-card-date">{event.dateLabel}</p>
                  <h3 className="event-card-title">{event.title}</h3>
                  <p className="event-card-description">{event.description}</p>
                  <span className="event-card-cta">{event.ctaText}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Upcoming Empty State */}
          <div className="events-empty" id="upcoming-empty" style={{ display: 'none' }}>
            <div className="events-empty-icon">📅</div>
            <h3>No upcoming events</h3>
            <p>Check back soon for new events!</p>
          </div>

          {/* Past Grid — populated by EventsInit at runtime */}
          <div className="events-grid" id="past-events" style={{ display: 'none' }}></div>

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
