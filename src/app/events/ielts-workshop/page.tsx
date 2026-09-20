import type { Metadata } from "next";
import { event } from "@/components/ielts-workshop/content";
import { RegistrationModalProvider } from "@/components/ielts-workshop/RegistrationModal";
import Hero from "@/components/ielts-workshop/sections/Hero";
import ProblemSection from "@/components/ielts-workshop/sections/ProblemSection";
import WorkshopIntro from "@/components/ielts-workshop/sections/WorkshopIntro";
import SkillsSection from "@/components/ielts-workshop/sections/SkillsSection";
import BenefitsSection from "@/components/ielts-workshop/sections/BenefitsSection";
import BeyondSkills from "@/components/ielts-workshop/sections/BeyondSkills";
import Transformation from "@/components/ielts-workshop/sections/Transformation";
import EventDetails from "@/components/ielts-workshop/sections/EventDetails";
// FinalCTA temporarily hidden — re-add the import when it comes back
// import FinalCTA from "@/components/ielts-workshop/sections/FinalCTA";

const CANONICAL = "https://admizzeducation.com/events/ielts-workshop";

export const metadata: Metadata = {
  title: `${event.sessionTitle} | Admizz Education`,
  description: event.intro,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `${event.sessionTitle} | Admizz Education`,
    description: event.intro,
    url: CANONICAL,
    siteName: "Admizz Education",
    type: "website",
  },
};

const EVENT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: event.sessionTitle,
  startDate: event.startISO,
  endDate: event.endISO,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  description: event.intro,
  organizer: {
    "@type": "Organization",
    name: "Admizz Education",
    url: "https://admizzeducation.com",
  },
  location: { "@type": "VirtualLocation", url: CANONICAL },
  maximumAttendeeCapacity: event.capacity,
  url: CANONICAL,
};

export default function IeltsWorkshopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_JSON_LD) }}
      />
      <RegistrationModalProvider>
        <Hero />
        <SkillsSection />
        <BenefitsSection />
        <ProblemSection />
        <WorkshopIntro />
        <BeyondSkills />
        <Transformation />
        <EventDetails />
        {/* <FinalCTA /> — temporarily hidden */}
      </RegistrationModalProvider>
    
{/* SEOAI:EXPANDEDCONTENT:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \"<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \\\"<div class=\\\\\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\\\\\\\">\\\\n  <section class=\\\\\\\"gap-2.5\\\\\\\">\\\\n    <h2 class=\\\\\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\\\\\">Admizz Education vs Alternative IELTS Preparation Workshops</h2>\\\\n    <div class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\"><p class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\">When considering IELTS preparation, it's essential to evaluate the structure and effectiveness of the available workshops. Admizz Education distinguishes itself with a focused approach in its 2-Hour IELTS Strategy Workshop, which not only teaches key strategies but also emphasizes understanding the scoring system. This contrasts with other workshops, such as those offered by specific competitors, which may broadly cover all skills without the same depth of strategic insight.</p><div class=\\\\\\\"overflow-x-auto\\\\\\\"><table class=\\\\\\\"w-full border-collapse\\\\\\\"><thead><tr><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">Feature</th><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">Alternative</th><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">This Option</th></tr></thead><tbody><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Focus on Scoring Strategy</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">General overview of test structure with less emphasis on scoring specifics.</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Detailed explanation of how the exam is scored and common pitfalls.</td></tr><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Interactive Q&amp;A</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Limited or no interactive sessions to ask questions.</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Live Q&amp;A to address individual student queries.</td></tr></tbody></table></div></div>\\\\n  </section>\\\\n  <section class=\\\\\\\"gap-2.5\\\\\\\">\\\\n    <h2 class=\\\\\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\\\\\">Comparing Prep Time Efficiency</h2>\\\\n    <div class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\"><p class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\">Efficiency in preparation time is a crucial factor for IELTS candidates. Admizz Education’s workshop is designed to maximize learning in a concise two-hour format, offering concentrated sessions on each skill. This contrasts with competitor offerings that may stretch over longer periods without the same targeted analysis or structured takeaway for effective practice.</p><div class=\\\\\\\"overflow-x-auto\\\\\\\"><table class=\\\\\\\"w-full border-collapse\\\\\\\"><thead><tr><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">Feature</th><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">Alternative</th><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">This Option</th></tr></thead><tbody><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Duration of Workshop</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Longer workshops that may dilute focus or contain less essential information.</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">2-hour focused session concentrated on strategies and techniques.</td></tr><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Personalized Preparation Plan</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Generic study advice with no specific actionable takeaways.</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Provides a take-home study plan tailored for individual preparation.</td></tr></tbody></table></div></div>\\\\n  </section>\\\\n</div>\\\" }} />\\n<div class=\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\\\">\\n  <section class=\\\"gap-2.5\\\">\\n    <h2 class=\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\">Last Updated</h2>\\n    <div class=\\\"text-sm md:text-base mb-3 opacity-90\\\"><p class=\\\"text-sm md:text-base mb-3 opacity-90\\\">This page was last updated on 2026-09-20.</p></div>\\n  </section>\\n</div>\" }} />\n<div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\">\n  <section class=\"gap-2.5\">\n    <h2 class=\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\">About the Author</h2>\n    <div class=\"text-sm md:text-base mb-3 opacity-90\"><p class=\"text-sm md:text-base mb-3 opacity-90\">By the Admizz Education Team</p></div>\n  </section>\n</div>" }} />{/* SEOAI:EXPANDEDCONTENT:END */}
</>
  );
}
