import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You - Register | Admizz Education",
  description:
    "Thank you for registering! Our expert will reach out to you shortly.",
  alternates: {
    canonical: "https://admizzeducation.com/thank-you",
  },
  openGraph: {
    title: "Thank You - Register | Admizz Education",
    description:
      "Thank you for registering! Our expert will reach out to you shortly.",
    url: "https://admizzeducation.com/thank-you",
    siteName: "Admizz Education",
    type: "website",
  },
};

const nextSteps = [
  {
    icon: "📞",
    title: "Expert calls you within 24 hours",
    desc: "A dedicated counsellor will contact you to understand your goals.",
  },
  {
    icon: "🎓",
    title: "Free counselling session",
    desc: "Get a personalised session covering courses, countries & eligibility.",
  },
  {
    icon: "🗺️",
    title: "University shortlist created for you",
    desc: "Receive a curated list of universities that match your profile.",
  },
];

export default function ThankYouPage() {
  return (
    <main>
      {/* Yellow top accent bar */}
      <div className="h-1.5 w-full bg-yellow" />

      <section className="bg-white py-16 sm:py-24 min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6">

          {/* Checkmark */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg className="w-10 h-10 text-green-500" viewBox="0 0 40 40" fill="none">
              <path
                d="M8 21L16 29L32 13"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Headline */}
          <h1
            className="text-[28px] sm:text-[40px] font-bold leading-tight text-blue-dark"
            style={{ fontFamily: "'Montserrat', var(--font-montserrat), sans-serif" }}
          >
            You are now steps away from reaching your{" "}
            <span className="text-yellow-600">dream university.</span>
          </h1>

          <p className="mt-4 text-[16px] text-gray-500 leading-relaxed">
            Sit back, relax! An <strong className="text-blue-dark">expert</strong> will reach out to you shortly.
          </p>

          {/* What happens next */}
          <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8 text-left shadow-sm">
            <p className="text-[13px] font-bold uppercase tracking-widest text-blue-dark mb-5">
              What happens next?
            </p>
            <div className="flex flex-col gap-5">
              {nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[20px] shadow-sm">
                    {step.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[15px] text-blue-dark">{step.title}</p>
                    <p className="text-[13px] text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Go Back to Home
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
