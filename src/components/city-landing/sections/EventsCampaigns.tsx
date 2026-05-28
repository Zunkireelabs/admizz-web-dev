"use client";

import { motion } from "framer-motion";
import CountdownTimer from "../components/CountdownTimer";
import type { EventItem, EventsSection } from "@/data/cities/types";

interface EventsCampaignsProps {
  city: string;
  data: EventsSection;
}

const TYPE_STYLES: Record<
  EventItem["type"],
  { label: string; gradient: string; chipBg: string; chipColor: string }
> = {
  event: {
    label: "Event",
    gradient: "linear-gradient(135deg, #001353 0%, #0D1282 100%)",
    chipBg: "rgba(13, 18, 130, 0.08)",
    chipColor: "#0D1282",
  },
  campaign: {
    label: "Campaign",
    gradient: "linear-gradient(135deg, #FCB730 0%, #FDED22 100%)",
    chipBg: "rgba(252, 183, 48, 0.18)",
    chipColor: "#7C5710",
  },
  workshop: {
    label: "Workshop",
    gradient: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)",
    chipBg: "rgba(22, 163, 74, 0.12)",
    chipColor: "#15803D",
  },
  fair: {
    label: "Fair",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
    chipBg: "rgba(124, 58, 237, 0.12)",
    chipColor: "#6D28D9",
  },
};

function formatDate(iso: string): { day: string; month: string; full: string } {
  const d = new Date(iso);
  const day = d.getDate().toString();
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const full = d.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return { day, month, full };
}

export default function EventsCampaigns({ city, data }: EventsCampaignsProps) {
  const upcoming = data.items.filter((item) => {
    const start = new Date(item.startsAt).getTime();
    const end = item.endsAt ? new Date(item.endsAt).getTime() : start;
    // eslint-disable-next-line react-hooks/purity -- intentional: filter past events at render
    return end >= Date.now();
  });

  if (upcoming.length === 0 && !data.emptyState) return null;

  // Pick featured: first "Most popular" badge, else earliest by startsAt
  const featuredIdx = (() => {
    const popularIdx = upcoming.findIndex((e) =>
      e.badge?.toLowerCase().includes("popular")
    );
    if (popularIdx >= 0) return popularIdx;
    return 0;
  })();
  const featured = upcoming[featuredIdx];
  const rest = upcoming.filter((_, i) => i !== featuredIdx);

  return (
    <section
      className="relative py-20 tablet:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 60%, #FFFFFF 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(252,183,48,0.4) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col tablet:flex-row tablet:items-end tablet:justify-between gap-4"
        >
          <div className="max-w-2xl">
            <p
              className="text-[12px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "#1E6DEB" }}
            >
              {data.eyebrow}
            </p>
            <h2
              className="mt-3 text-navy font-bold"
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.1,
              }}
            >
              {data.heading}
            </h2>
            <p className="mt-4 text-[15px] text-gray-dark leading-relaxed">
              {data.subheading}
            </p>
          </div>

          {upcoming.length > 0 && (
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold self-start tablet:self-end"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.06) 100%)",
                color: "#15803D",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {upcoming.length} happening soon at {city}
            </span>
          )}
        </motion.div>

        {upcoming.length > 0 ? (
          <div className="mt-10 tablet:mt-12 space-y-6 tablet:space-y-8">
            {/* Featured spotlight */}
            {featured && <FeaturedEvent event={featured} />}

            {/* Compact list of remaining */}
            {rest.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08 } },
                }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-medium mb-4">
                  Also coming up
                </p>
                <div className="grid gap-4 sm:grid-cols-2 tablet:grid-cols-3">
                  {rest.map((event) => (
                    <CompactEventCard key={event.id} event={event} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          data.emptyState && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 text-center rounded-[20px] px-6 py-12"
              style={{
                background: "white",
                border: "1px dashed rgba(13, 18, 130, 0.15)",
              }}
            >
              <h3 className="text-[18px] font-bold text-navy">
                {data.emptyState.heading}
              </h3>
              <p className="mt-2 text-[14px] text-gray-dark">
                {data.emptyState.subheading}
              </p>
              {data.emptyState.cta && (
                <a
                  href={data.emptyState.cta.href}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-[10px] px-5 py-2.5 text-[13px] font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, #FCB730 0%, #FDED22 100%)",
                    color: "#001353",
                  }}
                >
                  {data.emptyState.cta.text}
                </a>
              )}
            </motion.div>
          )
        )}
      </div>
    </section>
  );
}

function FeaturedEvent({ event }: { event: EventItem }) {
  const styles = TYPE_STYLES[event.type];
  const date = formatDate(event.startsAt);
  const seatsLow =
    event.seatsLeft !== undefined &&
    event.totalSeats !== undefined &&
    event.seatsLeft / event.totalSeats < 0.3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="relative rounded-[24px] overflow-hidden bg-white"
      style={{
        boxShadow: "0 20px 60px rgba(13, 18, 130, 0.12)",
        border: "1px solid rgba(13, 18, 130, 0.06)",
      }}
    >
      {/* Gradient header band */}
      <div
        className="relative px-6 tablet:px-9 py-7 tablet:py-8 text-white overflow-hidden"
        style={{ background: styles.gradient }}
      >
        <span
          aria-hidden
          className="absolute -top-16 -right-10 w-56 h-56 rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative flex flex-col tablet:flex-row tablet:items-start gap-5 tablet:gap-7">
          {/* Date pill */}
          <div className="flex-shrink-0 rounded-[16px] w-[80px] py-3 text-center bg-white/15 backdrop-blur-sm self-start">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.12em] opacity-95"
              style={{
                color: event.type === "campaign" ? "#001353" : "white",
              }}
            >
              {date.month}
            </p>
            <p
              className="text-[32px] font-bold leading-none mt-1"
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                color: event.type === "campaign" ? "#001353" : "white",
              }}
            >
              {date.day}
            </p>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em] bg-white/20 backdrop-blur-sm"
                style={{
                  color: event.type === "campaign" ? "#001353" : "white",
                }}
              >
                Featured · {styles.label}
              </span>
              {event.badge && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold bg-white/95 text-navy"
                >
                  ★ {event.badge}
                </span>
              )}
            </div>

            <h3
              className="mt-3 font-bold leading-tight"
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
                fontSize: "clamp(22px, 2.6vw, 30px)",
                color: event.type === "campaign" ? "#001353" : "white",
              }}
            >
              {event.title}
            </h3>

            <div
              className="mt-2 flex items-center gap-3 text-[12.5px] flex-wrap"
              style={{
                color: event.type === "campaign" ? "rgba(0,19,83,0.75)" : "rgba(255,255,255,0.85)",
              }}
            >
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                  />
                </svg>
                {date.full}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z"
                  />
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" fill="none" />
                </svg>
                {event.venue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid tablet:grid-cols-[1fr_auto] gap-6 tablet:gap-8 p-6 tablet:p-8">
        <div>
          <p className="text-[14px] leading-relaxed text-gray-dark">
            {event.description}
          </p>

          {event.highlights && event.highlights.length > 0 && (
            <ul className="mt-5 grid sm:grid-cols-2 gap-2">
              {event.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-[13px] text-navy"
                >
                  <span
                    className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(34,197,94,0.14)" }}
                  >
                    <svg
                      className="w-2.5 h-2.5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="tablet:w-[240px] flex flex-col gap-3">
          {event.seatsLeft !== undefined && (
            <div
              className="rounded-[14px] p-4"
              style={{
                background: seatsLow
                  ? "rgba(196, 30, 58, 0.06)"
                  : "rgba(34, 197, 94, 0.06)",
                border: `1px solid ${
                  seatsLow ? "rgba(196,30,58,0.18)" : "rgba(34,197,94,0.18)"
                }`,
              }}
            >
              <p
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                style={{ color: seatsLow ? "#c41e3a" : "#15803D" }}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    seatsLow ? "animate-pulse" : ""
                  }`}
                  style={{ background: seatsLow ? "#c41e3a" : "#22C55E" }}
                />
                {seatsLow ? "Filling fast" : "Seats open"}
              </p>
              <p className="mt-1 text-[20px] font-bold text-navy leading-none">
                {event.seatsLeft}
                <span className="text-[12px] text-gray-medium font-medium ml-1">
                  / {event.totalSeats ?? event.seatsLeft} left
                </span>
              </p>
            </div>
          )}

          <a
            href={event.cta.href}
            className="group/cta inline-flex items-center justify-center gap-1.5 rounded-[12px] px-4 py-3 text-[14px] font-bold transition-all hover:-translate-y-0.5"
            style={{
              background: styles.gradient,
              color: event.type === "campaign" ? "#001353" : "white",
              boxShadow: "0 10px 24px rgba(0, 19, 83, 0.18)",
            }}
          >
            {event.cta.text}
            <svg
              className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-7-7 7 7-7 7"
              />
            </svg>
          </a>

          <span
            className="inline-flex items-center justify-center gap-1.5 rounded-[10px] px-3 py-2 text-[11.5px] font-bold tabular-nums"
            style={{
              background: "rgba(13, 18, 130, 0.06)",
              color: "#0D1282",
            }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              />
            </svg>
            Starts in <CountdownTimer target={event.startsAt} expiredLabel="Live" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CompactEventCard({ event }: { event: EventItem }) {
  const styles = TYPE_STYLES[event.type];
  const date = formatDate(event.startsAt);
  const seatsLow =
    event.seatsLeft !== undefined &&
    event.totalSeats !== undefined &&
    event.seatsLeft / event.totalSeats < 0.3;

  return (
    <motion.a
      href={event.cta.href}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-[18px] overflow-hidden bg-white p-5 transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{
        boxShadow: "0 6px 20px rgba(13, 18, 130, 0.06)",
        border: "1px solid rgba(13, 18, 130, 0.06)",
      }}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: styles.gradient }}
      />

      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 rounded-[12px] w-[56px] py-2 text-center text-white"
          style={{ background: styles.gradient }}
        >
          <p
            className="text-[9px] font-bold uppercase tracking-[0.1em] opacity-90"
            style={{
              color: event.type === "campaign" ? "#001353" : "white",
            }}
          >
            {date.month}
          </p>
          <p
            className="text-[20px] font-bold leading-none mt-0.5"
            style={{
              fontFamily: "var(--font-rubik), sans-serif",
              color: event.type === "campaign" ? "#001353" : "white",
            }}
          >
            {date.day}
          </p>
        </div>

        <div className="flex-1 min-w-0">
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em]"
            style={{
              background: styles.chipBg,
              color: styles.chipColor,
            }}
          >
            {styles.label}
          </span>
          <h3
            className="mt-1.5 text-[14.5px] font-bold text-navy leading-tight line-clamp-2"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            {event.title}
          </h3>
          <p className="mt-1 text-[11.5px] text-gray-medium">{date.full}</p>
        </div>
      </div>

      <div
        className="mt-3 pt-3 flex items-center justify-between gap-2 text-[11.5px] mt-auto"
        style={{ borderTop: "1px dashed rgba(13, 18, 130, 0.08)" }}
      >
        <span className="inline-flex items-center gap-1 text-gray-dark min-w-0 truncate">
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z"
            />
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" fill="none" />
          </svg>
          <span className="truncate">{event.venue}</span>
        </span>
        {event.seatsLeft !== undefined && (
          <span
            className="inline-flex items-center gap-1 font-semibold whitespace-nowrap"
            style={{ color: seatsLow ? "#c41e3a" : "#15803D" }}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${seatsLow ? "animate-pulse" : ""}`}
              style={{ background: seatsLow ? "#c41e3a" : "#22C55E" }}
            />
            {event.seatsLeft} left
          </span>
        )}
      </div>

      <span
        className="mt-3 inline-flex items-center justify-between gap-1.5 text-[12.5px] font-bold text-blue-dark"
        style={{ fontFamily: "var(--font-rubik), sans-serif" }}
      >
        {event.cta.text}
        <svg
          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14m-7-7 7 7-7 7"
          />
        </svg>
      </span>
    </motion.a>
  );
}
