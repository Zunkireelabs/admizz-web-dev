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
      <section className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-3 sm:pt-4 pb-10">
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
          <div className="text-center max-w-2xl mx-auto mb-3">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white bg-white/15 border border-white/30 px-4 py-1.5 rounded-full mb-2">
              🎯 Free · Personalised · 60 seconds
            </div>
            <h1 className="text-[28px] sm:text-[36px] md:text-[40px] font-bold text-white leading-[1.1] tracking-tight mb-1">
              Which country should<br className="hidden sm:block" /> you study in?
            </h1>
          </div>

          {/* Quiz card */}
          <div className="max-w-[860px] mx-auto">
            <DestinationQuiz />
          </div>
        </div>
      </section>
    
{/* SEOAI:EXPANDEDCONTENT:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\">\n  <section class=\"gap-2.5\">\n    <h2 class=\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\">Admizz Education vs. Competitors in Study Destination Matching</h2>\n    <div class=\"text-sm md:text-base mb-3 opacity-90\"><p class=\"text-sm md:text-base mb-3 opacity-90\">When considering platforms for matching students with suitable study destinations, Admizz Education offers a quick and personalized approach. Compared to other options, Admizz Education excels with a streamlined 60-second quiz that easily directs students to their ideal country and university options based on their goals.</p><div class=\"overflow-x-auto\"><table class=\"w-full border-collapse\"><thead><tr><th class=\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\">Feature</th><th class=\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\">Alternative</th><th class=\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\">This Option</th></tr></thead><tbody><tr><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Quiz Duration</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Varies by competitor, usually longer</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">60 seconds</td></tr><tr><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Personalization</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Less personalized; often relies on general suggestions</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Highly personalized based on individual goals</td></tr><tr><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Destinations Offered</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Might offer fewer country options</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Multiple countries including UK, USA, Canada, Australia, India, Germany</td></tr></tbody></table></div></div>\n  </section>\n</div>" }} />{/* SEOAI:EXPANDEDCONTENT:END */}
</main>
  );
}
