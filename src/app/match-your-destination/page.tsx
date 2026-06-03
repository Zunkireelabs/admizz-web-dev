import type { Metadata } from "next";
import Image from "next/image";
import DestinationQuiz from "./DestinationQuiz";

const PAGE_URL = "https://admizzeducation.com/match-your-destination";

export const metadata: Metadata = {
  title: "Match Your Destination — Free 60-Second Quiz | Admizz Education",
  description:
    "Take Admizz Education's free 60-second quiz and discover your perfect study-abroad destination. Personalised country, top universities, scholarship picks, and visa guidance — all free.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Match Your Destination — Free 60-Second Quiz",
    description:
      "Answer 3 quick questions and we'll match you to the country that fits your study field, lifestyle, and budget.",
    url: PAGE_URL,
    siteName: "Admizz Education",
    type: "website",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": PAGE_URL,
      url: PAGE_URL,
      name: "Match Your Destination — Free 60-Second Quiz",
      description: "Take Admizz Education's free 60-second quiz.",
      datePublished: "2026-05-25",
      dateModified: "2026-05-25",
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "Admizz Education", url: "https://admizzeducation.com" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://admizzeducation.com" },
        { "@type": "ListItem", position: 2, name: "Match Your Destination", item: PAGE_URL },
      ],
    },
  ],
};


export default function MatchYourDestinationPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════════════════════════════════
          HERO + QUIZ
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-20 pb-16">
        {/* Background image */}
        <Image
          src="/images/world-landmarks.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
          aria-hidden="true"
        />
        {/* Dark navy overlay */}
        <div className="absolute inset-0 bg-navy/65" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white bg-white/15 border border-white/30 px-4 py-1.5 rounded-full mb-3">
              🎯 Free · Personalised · 60 seconds
            </div>
            <h1 className="text-[28px] sm:text-[36px] md:text-[40px] font-bold text-white leading-[1.1] tracking-tight mb-2">
              Which country should<br className="hidden sm:block" /> you study in?
            </h1>
          </div>

          {/* Quiz card */}
          <div className="max-w-[860px] mx-auto">
            <DestinationQuiz />
          </div>
        </div>
      </section>
    </main>
  );
}
