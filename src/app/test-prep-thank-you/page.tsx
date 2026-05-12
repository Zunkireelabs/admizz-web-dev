import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Admizz Education - Test Preparation",
  description:
    "Thank you for your interest in test preparation! Our expert will reach out to you shortly.",
  alternates: {
    canonical: "https://admizzeducation.com/test-prep-thank-you",
  },
  openGraph: {
    title: "Thank You | Admizz Education - Test Preparation",
    description:
      "Thank you for your interest in test preparation! Our expert will reach out to you shortly.",
    url: "https://admizzeducation.com/test-prep-thank-you",
    siteName: "Admizz Education",
    type: "website",
  },
};

export default function TestPrepThankYouPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <svg
            className="w-20 h-20 mx-auto mb-6"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="40" fill="#22C55E" />
            <path
              d="M24 41L34 51L56 29"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
            You are now steps away from reaching your dream university.
          </h1>

          <p className="mt-4 text-lg opacity-90">
            Sit back, relax! An <strong>expert</strong> will reach out to you
            shortly.
          </p>

          <Link
            href="/"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Go Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
