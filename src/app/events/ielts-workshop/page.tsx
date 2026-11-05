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
  description: "A live 2-hour IELTS workshop on how the test is scored, where students lose marks, and how to prepare with a plan, not guesswork.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `${event.sessionTitle} | Admizz Education`,
    description: "A live 2-hour IELTS workshop on how the test is scored, where students lose marks, and how to prepare with a plan, not guesswork.",
    url: CANONICAL,
    siteName: "Admizz Education",
    images: [{ url: "/images/og/stuyabroad.webp", alt: "Admizz Education" }],
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
  description: "A live 2-hour IELTS workshop on how the test is scored, where students lose marks, and how to prepare with a plan, not guesswork.",
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
    </>
  );
}
