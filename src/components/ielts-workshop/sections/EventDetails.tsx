"use client";

import { event } from "../content";
import Reveal from "../Reveal";
import { useRegistrationModal } from "../RegistrationModal";

const rows = [
  { label: "Date", value: event.dateLabel },
  { label: "Time", value: event.timeLabel },
  { label: "Duration", value: event.durationLabel },
  { label: "Venue", value: event.venue },
  { label: "Capacity", value: `Limited to ${event.capacity} students` },
];

export default function EventDetails() {
  const { open } = useRegistrationModal();

  return (
    <section className="bg-white border-t border-border-light py-20 md:py-24">
      <div className="max-w-xl mx-auto px-4">
        <Reveal>
          <h2
            className="text-3xl sm:text-4xl font-bold text-navy mb-10 text-center"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Workshop Details
          </h2>

          <div className="rounded-[10px] border border-border-light divide-y divide-border-light">
            {rows.map((row) => (
              <div key={row.label} className="flex justify-between px-5 py-4">
                <span className="text-sm font-semibold text-gray-medium">{row.label}</span>
                <span className="text-sm font-semibold text-navy text-right">{row.value}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-gray-medium mt-4 text-center">{event.accessNote}</p>

          <div className="text-center mt-8">
            <button
              type="button"
              onClick={open}
              className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px]"
            >
              {event.ctaText.toUpperCase()}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
