"use client";

export interface TestimonialItem {
  name: string;
  initial: string;
  color: string;
  university: string;
  originFlag: string;
  destFlag: string;
  route: string;
  text: string;
}

interface TestimonialsBentoProps {
  testimonials: TestimonialItem[];
  videoId: string;
  featuredStudent: {
    name: string;
    subtitle: string;
  };
  heading?: string;
  subheading?: string;
}

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="#f4b400">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function toEmoji(code: string) {
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join("");
}

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <div
      className="bg-white rounded-2xl p-5 flex flex-col h-full"
      style={{ border: "1px solid #eef1f6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
    >
      <StarRow />
      <blockquote
        className="text-[13px] leading-[1.7] flex-1 mb-4"
        style={{ color: "#3d4663" }}
      >
        &ldquo;{t.text}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid #f0f2f5" }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0"
          style={{ background: t.color }}
        >
          {t.initial}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold truncate" style={{ color: "#0D1282" }}>
            {t.name}
          </p>
          <p className="text-[12px] truncate" style={{ color: "#6b7280" }}>
            {t.university}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-xs leading-none">{toEmoji(t.originFlag)}</span>
            <span className="text-[11px]" style={{ color: "#9ca3af" }}>
              {t.route}
            </span>
            <span className="text-xs leading-none">{toEmoji(t.destFlag)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsBento({
  testimonials,
  videoId,
  featuredStudent,
  heading = "Our Success Stories & Testimonials",
  subheading = "Hear from our satisfied students and partners who have achieved great success through our expert guidance, personalized support, and comprehensive services in navigating their academic and career goals.",
}: TestimonialsBentoProps) {
  const left = testimonials.slice(0, 2);
  const right = testimonials.slice(2, 4);

  return (
    <section className="py-16 md:py-20" style={{ background: "#F8F9FF" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2
          className="text-[26px] md:text-[34px] font-bold text-center mb-3"
          style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}
        >
          {heading}
        </h2>
        <p
          className="text-center text-[15px] max-w-3xl mx-auto mb-12"
          style={{ color: "#5a6275", lineHeight: 1.7 }}
        >
          {subheading}
        </p>

        {/* Bento Grid: 2 cards | Video | 2 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-5 items-stretch">
          {/* Left Column - 2 cards */}
          <div className="flex flex-col gap-5">
            {left.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>

          {/* Center - Video */}
          <div className="flex flex-col">
            {/* Student tab */}
            <div className="flex justify-center mb-3">
              <span
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-semibold"
                style={{
                  background: "#FFFFFF",
                  color: "#0D1282",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
                </svg>
                Student
              </span>
            </div>

            {/* Video embed */}
            <div
              className="relative w-full rounded-2xl overflow-hidden flex-1"
              style={{
                aspectRatio: "16/10",
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                border: "1px solid #eef1f6",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title={`${featuredStudent.name} - Student Testimonial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Featured student name */}
            <div className="text-center mt-4">
              <p className="text-[15px] font-bold" style={{ color: "#0D1282" }}>
                {featuredStudent.name}
              </p>
              <p className="text-[13px]" style={{ color: "#6b7280" }}>
                {featuredStudent.subtitle}
              </p>
            </div>
          </div>

          {/* Right Column - 2 cards */}
          <div className="flex flex-col gap-5">
            {right.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
