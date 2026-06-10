"use client";

import { ArrowRightIcon } from "../shared/Icons";

const STORY_BG =
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=2400&q=80";

export default function AdmizzStory() {
  return (
    <section className="wc-admizz" id="admizz">
      <div className="wc-admizz-bg" style={{ backgroundImage: `url(${STORY_BG})` }} aria-hidden="true" />
      <div className="wc-admizz-scrim" aria-hidden="true" />

      <div className="wc-admizz-inner">
        <div className="wc-admizz-eyebrow">Why Admizz built this</div>
        <h2 className="wc-admizz-title">
          Every great team starts with one decision.<br />
          <span className="wc-admizz-title-accent">So does every great career.</span>
        </h2>
        <p className="wc-admizz-text">
          We built this hub because football and education share something: the people who go further are the ones who plan further. Predict the tournament with us — and when you&apos;re ready to plan your next chapter, the same team that brought you live World Cup data will help you find the right university, the right country, and the right future.
        </p>

        <div className="wc-admizz-stats">
          <div className="wc-admizz-stat">
            <div className="wc-admizz-stat-num">2,000+</div>
            <div className="wc-admizz-stat-label">Students Placed</div>
          </div>
          <div className="wc-admizz-stat">
            <div className="wc-admizz-stat-num">11</div>
            <div className="wc-admizz-stat-label">Countries</div>
          </div>
          <div className="wc-admizz-stat">
            <div className="wc-admizz-stat-num">95%</div>
            <div className="wc-admizz-stat-label">Visa Success</div>
          </div>
        </div>

        <a href="/register" className="wc-btn-primary" style={{ marginTop: 16 }}>
          Book Your Free Consultation
          <ArrowRightIcon size={16} strokeWidth={2.2} />
        </a>
      </div>
    </section>
  );
}
