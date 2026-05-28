"use client";

import { useState } from "react";

export interface GoogleReview {
  name: string;
  initial: string;
  color: string;
  text: string;
}

interface Props {
  reviews: GoogleReview[];
}

function StarIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#f4b400">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg className="w-[72px] h-[24px]" viewBox="0 0 272 92">
      <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
      <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
      <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
      <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
      <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
      <path d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.01z" fill="#4285F4" />
    </svg>
  );
}

function GoogleGIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <path
        d="M9.135 5.002C5.678 6.548 3.5 9.575 3.5 13.412c0 2.863 1.875 5.088 4.281 5.088 2.156 0 3.969-1.688 3.969-3.862 0-2.088-1.5-3.638-3.344-3.638-.375 0-.844.075-1.031.15.375-2.175 2.25-4.425 4.406-5.475L9.135 5.002Zm9.75 0c-3.469 1.546-5.634 4.573-5.634 8.41 0 2.863 1.875 5.088 4.281 5.088 2.156 0 3.969-1.688 3.969-3.862 0-2.088-1.5-3.638-3.344-3.638-.375 0-.844.075-1.031.15.375-2.175 2.25-4.425 4.406-5.475L18.885 5.002Z"
        fill="#1E6DEB"
        opacity={0.12}
      />
    </svg>
  );
}

export default function HomepageReviews({ reviews }: Props) {
  const visibleCount = 3;
  const maxStart = Math.max(0, reviews.length - visibleCount);
  const [startIndex, setStartIndex] = useState(0);

  const canPrev = startIndex > 0;
  const canNext = startIndex < maxStart;

  const totalDots = maxStart + 1;

  return (
    <section className="py-16 md:py-24" style={{ background: "#F8F9FF" }}>
      <style>{`
        .review-card {
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .review-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(30, 109, 235, 0.10) !important;
        }
        .arrow-btn {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .arrow-btn:not(:disabled):hover {
          transform: scale(1.08);
        }
        .arrow-btn:not(:disabled):active {
          transform: scale(0.95);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <p
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3"
          style={{ color: "#1E6DEB" }}
        >
          Student Reviews
        </p>
        <h2
          className="text-[28px] md:text-[38px] font-bold text-center mb-4 leading-tight"
          style={{ color: "#0D1282" }}
        >
          What Our Students Say
        </h2>
        <p
          className="text-center text-[15px] max-w-2xl mx-auto mb-10"
          style={{ color: "#5a6275", lineHeight: 1.7 }}
        >
          Discover the experiences of our satisfied students who have successfully
          navigated their academic goals with expert guidance.
        </p>

        {/* Google Summary Bar */}
        <div
          className="flex items-center justify-center gap-5 md:gap-7 mb-14 mx-auto px-8 py-5 rounded-2xl max-w-xl"
          style={{
            background: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <GoogleLogo />
          <div className="w-px h-9" style={{ background: "#e5e7eb" }} />
          <div className="flex items-center gap-2.5">
            <span className="text-[28px] font-bold leading-none" style={{ color: "#0D1282" }}>4.9</span>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={15} />
                ))}
              </div>
              <p className="text-[11px] font-medium" style={{ color: "#9ca3af" }}>out of 5</p>
            </div>
          </div>
          <div className="w-px h-9 hidden sm:block" style={{ background: "#e5e7eb" }} />
          <div className="hidden sm:block text-center">
            <p className="text-[18px] font-bold leading-none mb-0.5" style={{ color: "#0D1282" }}>94</p>
            <p className="text-[11px] font-medium" style={{ color: "#9ca3af" }}>reviews</p>
          </div>
        </div>

        {/* Slider */}
        <div className="flex items-center gap-5 md:gap-7">
          {/* Prev Arrow */}
          <button
            onClick={() => canPrev && setStartIndex(startIndex - 1)}
            className="arrow-btn hidden md:flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 cursor-pointer"
            style={
              canPrev
                ? { background: "#1E6DEB", color: "#fff", boxShadow: "0 4px 16px rgba(30,109,235,0.35)" }
                : { background: "#FFFFFF", color: "#b0b8c9", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "default" }
            }
            disabled={!canPrev}
            aria-label="Previous reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${startIndex} * (33.333% + 8px)))` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="review-card w-[calc(33.333%-16px)] flex-shrink-0 rounded-2xl bg-white flex flex-col overflow-hidden"
                  style={{
                    boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Card content */}
                  <div className="p-7 flex-1 flex flex-col">
                    {/* Quote + Stars row */}
                    <div className="flex items-start justify-between mb-4">
                      <QuoteIcon />
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} size={16} />
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p
                      className="text-[14px] leading-[1.75] flex-1 line-clamp-5 whitespace-pre-line"
                      style={{ color: "#3d4663" }}
                    >
                      {review.text}
                    </p>
                  </div>

                  {/* Reviewer footer */}
                  <div
                    className="flex items-center gap-3 px-7 py-5"
                    style={{ background: "#FAFBFD", borderTop: "1px solid #f0f2f5" }}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-[14px] flex-shrink-0"
                      style={{ background: review.color }}
                    >
                      {review.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold truncate" style={{ color: "#0D1282" }}>
                        {review.name}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="#34A853" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <p className="text-[11px] font-medium" style={{ color: "#6b7280" }}>
                          Verified Review
                        </p>
                      </div>
                    </div>
                    <GoogleGIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={() => canNext && setStartIndex(startIndex + 1)}
            className="arrow-btn hidden md:flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 cursor-pointer"
            style={
              canNext
                ? { background: "#1E6DEB", color: "#fff", boxShadow: "0 4px 16px rgba(30,109,235,0.35)" }
                : { background: "#FFFFFF", color: "#b0b8c9", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "default" }
            }
            disabled={!canNext}
            aria-label="Next reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {[...Array(totalDots)].map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className="rounded-full cursor-pointer"
              style={{
                width: startIndex === i ? 28 : 8,
                height: 8,
                background: startIndex === i ? "#1E6DEB" : "#c7cdd8",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
