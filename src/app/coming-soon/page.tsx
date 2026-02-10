import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon | Admizz Education",
  description:
    "Something exciting is on the way! Stay tuned for new features from Admizz Education.",
  alternates: {
    canonical: "https://admizzeducation.com/coming-soon/",
  },
  openGraph: {
    title: "Coming Soon | Admizz Education",
    description:
      "Something exciting is on the way! Stay tuned for new features from Admizz Education.",
    url: "https://admizzeducation.com/coming-soon/",
    siteName: "Admizz Education",
    type: "website",
  },
};

export default function ComingSoonPage() {
  return (
    <main>
      {/* ===== COMING SOON HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Decorative Rocket SVG */}
          <div className="flex justify-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              className="w-36 h-36 md:w-44 md:h-44"
              fill="none"
              aria-hidden="true"
            >
              {/* Rocket body */}
              <path
                d="M100 20C100 20 70 60 70 120C70 140 80 155 100 165C120 155 130 140 130 120C130 60 100 20 100 20Z"
                fill="white"
                fillOpacity="0.95"
                stroke="white"
                strokeWidth="2"
              />
              {/* Rocket nose cone accent */}
              <path
                d="M100 20C100 20 88 50 85 80L100 70L115 80C112 50 100 20 100 20Z"
                fill="#FFC837"
                fillOpacity="0.9"
              />
              {/* Rocket window */}
              <circle cx="100" cy="100" r="12" fill="#1B3A6B" stroke="white" strokeWidth="2" />
              <circle cx="100" cy="100" r="7" fill="#2956A8" />
              <circle cx="97" cy="97" r="2.5" fill="white" fillOpacity="0.7" />
              {/* Left fin */}
              <path
                d="M70 120C70 120 45 135 40 155L70 145Z"
                fill="#FFC837"
                fillOpacity="0.9"
                stroke="#FFC837"
                strokeWidth="1"
              />
              {/* Right fin */}
              <path
                d="M130 120C130 120 155 135 160 155L130 145Z"
                fill="#FFC837"
                fillOpacity="0.9"
                stroke="#FFC837"
                strokeWidth="1"
              />
              {/* Exhaust flames */}
              <path
                d="M90 165C90 165 95 185 100 195C105 185 110 165 110 165"
                fill="#FFC837"
                fillOpacity="0.8"
              />
              <path
                d="M93 165C93 165 97 178 100 185C103 178 107 165 107 165"
                fill="white"
                fillOpacity="0.5"
              />
              {/* Stars / sparkle decorations */}
              <circle cx="35" cy="50" r="2" fill="white" fillOpacity="0.6" />
              <circle cx="165" cy="45" r="2.5" fill="white" fillOpacity="0.5" />
              <circle cx="25" cy="100" r="1.5" fill="white" fillOpacity="0.4" />
              <circle cx="175" cy="95" r="2" fill="white" fillOpacity="0.5" />
              <circle cx="45" cy="160" r="1.5" fill="white" fillOpacity="0.3" />
              <circle cx="155" cy="165" r="2" fill="white" fillOpacity="0.4" />
              <circle cx="50" cy="30" r="1" fill="white" fillOpacity="0.5" />
              <circle cx="150" cy="25" r="1.5" fill="white" fillOpacity="0.6" />
              {/* Four-point star left */}
              <path
                d="M30 75L32 70L34 75L32 80Z"
                fill="white"
                fillOpacity="0.5"
              />
              {/* Four-point star right */}
              <path
                d="M170 130L172 125L174 130L172 135Z"
                fill="white"
                fillOpacity="0.4"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight mb-4">
            Coming Soon
          </h1>

          {/* Tagline */}
          <p className="text-[15px] md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 text-white/90">
            Something exciting is on the way! We&apos;re working behind the
            scenes to bring you something amazing. Stay tuned!
          </p>

          {/* CTA Button */}
          <Link
            href="/"
            className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Go Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
