"use client";

import { useState } from "react";

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

interface TestimonialsProps {
  title?: string;
  testimonials: Testimonial[];
}

export default function Testimonials({
  title = "What Our Students Say",
  testimonials,
}: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const prev = () => {
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  if (testimonials.length === 0) return null;

  const item = testimonials[current];

  return (
    <section className="py-16 px-4 bg-off-white">
      <div className="max-w-3xl mx-auto text-center">
        {title && (
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-10">
            {title}
          </h2>
        )}

        <div className="bg-white rounded-[10px] p-8 shadow-sm">
          {/* Star Rating */}
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < item.rating ? "text-golden-rating" : "text-gray-medium"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <blockquote className="text-gray-dark text-[15px] leading-relaxed italic">
            &ldquo;{item.text}&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold text-navy">{item.name}</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === current ? "bg-blue-dark" : "bg-gray-medium"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
