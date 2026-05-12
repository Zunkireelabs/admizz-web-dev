"use client";

import { useState, useCallback } from "react";
import { useSwipe } from "@/lib/useSwipe";

export interface GoogleReview {
  name: string;
  initial: string;
  color: string;
  text: string;
}

interface Props {
  reviews: GoogleReview[];
}

function StarRow() {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-[18px] h-[18px] text-[#f4b400]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <svg className="w-[16px] h-[16px] text-[#4285F4] ml-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    </span>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function GoogleReviews({ reviews }: Props) {
  const visibleCount = 3;
  const [startIndex, setStartIndex] = useState(0);

  const maxStart = Math.max(0, reviews.length - visibleCount);
  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < reviews.length;
  const totalDots = maxStart + 1;

  const handleSwipeLeft = useCallback(() => {
    if (canNext) setStartIndex((i) => Math.min(i + 1, maxStart));
  }, [canNext, maxStart]);
  const handleSwipeRight = useCallback(() => {
    if (canPrev) setStartIndex((i) => Math.max(i - 1, 0));
  }, [canPrev]);
  const swipeHandlers = useSwipe({ onSwipeLeft: handleSwipeLeft, onSwipeRight: handleSwipeRight });

  return (
    <section className="py-16 md:py-20 bg-white">
      <style>{`
        :root {
          --gr-card-width: 100%;
          --gr-slide-offset: calc(100% + 16px);
        }
        @media (min-width: 768px) {
          :root {
            --gr-card-width: calc(33.333% - 10.667px);
            --gr-slide-offset: calc(33.333% + 5.333px);
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-[36px] font-bold text-navy text-center mb-4" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>
          What Our Students Say
        </h2>
        <p className="text-[15px] text-gray-dark text-center leading-relaxed max-w-4xl mx-auto mb-10">
          Discover the experiences of our satisfied students and partners who, through expert guidance, personalized support, and comprehensive services, have successfully navigated their academic and career goals.
        </p>

        <div className="flex items-center gap-6">
          {/* Google Rating Summary */}
          <div className="hidden md:flex flex-col items-center flex-shrink-0 w-[200px]">
            <p className="text-lg font-bold text-slate tracking-wide mb-1">EXCELLENT</p>
            <span className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-[#f4b400]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </span>
            <p className="text-sm text-gray-dark mb-2">
              Based on <strong>94 reviews</strong>
            </p>
            <svg className="w-[80px] h-[28px]" viewBox="0 0 272 92">
              <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
              <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
              <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
              <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
              <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
              <path d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.01z" fill="#4285F4" />
            </svg>
          </div>

          {/* Prev Arrow */}
          <button
            onClick={() => canPrev && setStartIndex(startIndex - 1)}
            className={`hidden md:flex items-center justify-center w-11 h-11 rounded-full border border-border-light flex-shrink-0 transition-colors ${canPrev ? "hover:bg-gray-lightest text-slate cursor-pointer" : "text-border-light cursor-default"}`}
            disabled={!canPrev}
            aria-label="Previous reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Review Cards — sliding container */}
          <div className="flex-1 min-w-0 overflow-hidden" {...swipeHandlers}>
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${startIndex} * var(--gr-slide-offset)))` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="flex-shrink-0 border border-border-light rounded-xl p-5 bg-white flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#d0d5dd] cursor-default"
                  style={{ width: "var(--gr-card-width)" }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                      style={{ background: review.color }}
                    >
                      {review.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-slate truncate">{review.name}</p>
                      <p className="text-[13px] text-gray-medium">a while ago</p>
                    </div>
                    <GoogleIcon />
                  </div>

                  {/* Stars + Verified */}
                  <div className="mb-3">
                    <StarRow />
                  </div>

                  {/* Review Text */}
                  <p className="text-[14px] text-gray-dark leading-relaxed line-clamp-5 whitespace-pre-line">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={() => canNext && setStartIndex(startIndex + 1)}
            className={`hidden md:flex items-center justify-center w-11 h-11 rounded-full border border-border-light flex-shrink-0 transition-colors ${canNext ? "hover:bg-gray-lightest text-slate cursor-pointer" : "text-border-light cursor-default"}`}
            disabled={!canNext}
            aria-label="Next reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators (mobile) */}
        <div className="flex items-center justify-center gap-1.5 mt-8 md:hidden">
          {[...Array(totalDots)].map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className="cursor-pointer flex items-center justify-center"
              style={{ minWidth: 44, minHeight: 44 }}
              aria-label={`Go to page ${i + 1}`}
            >
              <span
                className="rounded-full block"
                style={{
                  width: startIndex === i ? 28 : 8,
                  height: 8,
                  background: startIndex === i ? "#0D1282" : "#c7cdd8",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
