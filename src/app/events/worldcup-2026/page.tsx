import type { Metadata } from "next";
import { LiveProvider } from "@/lib/wc2026/LiveProvider";
import { TimezoneProvider } from "@/lib/wc2026/TimezoneProvider";
import HeroCinematic from "@/components/wc2026/sections/HeroCinematic";
import TournamentPulse from "@/components/wc2026/sections/TournamentPulse";
import MatchOfTheDay from "@/components/wc2026/sections/MatchOfTheDay";
import TodaySchedule from "@/components/wc2026/sections/TodaySchedule";
import BracketViz from "@/components/wc2026/sections/BracketViz";
import GroupStandings from "@/components/wc2026/sections/GroupStandings";
import GoldenBoot from "@/components/wc2026/sections/GoldenBoot";
import PredictionCenter from "@/components/wc2026/sections/PredictionCenter";
import Leaderboard from "@/components/wc2026/sections/Leaderboard";
import PredictorsCircle from "@/components/wc2026/sections/PredictorsCircle";
import AdmizzStory from "@/components/wc2026/sections/AdmizzStory";

const CANONICAL = "https://admizzeducation.com/events/worldcup-2026";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 — Live Hub & Predict to Win | Admizz Education",
  description:
    "The premium World Cup 2026 hub. Live scores, full bracket, group standings, top scorers — predict the next match and win prizes plus free study-abroad counselling with Admizz.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "FIFA World Cup 2026 — Live Hub & Predict to Win | Admizz Education",
    description:
      "The premium World Cup 2026 hub. Live scores, full bracket, group standings, top scorers — predict the next match and win prizes plus free study-abroad counselling with Admizz.",
    url: CANONICAL,
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

const EVENT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "FIFA World Cup 2026 — Admizz Tournament Hub",
  startDate: "2026-06-11T20:00:00-06:00",
  endDate: "2026-07-19T23:59:59-04:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  description:
    "Live FIFA World Cup 2026 hub — bracket, standings, top scorers, and a Predict & Win campaign from Admizz Education.",
  organizer: {
    "@type": "Organization",
    name: "Admizz Education",
    url: "https://admizzeducation.com",
  },
  location: { "@type": "VirtualLocation", url: CANONICAL },
  url: CANONICAL,
};

export default function WorldCup2026Page() {
  return (
    <div className="wc-root">
      <link rel="stylesheet" href="/events/css/worldcup-2026.css?v=20260723-c" precedence="default" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_JSON_LD) }}
      />

      <TimezoneProvider>
        <LiveProvider>
          <HeroCinematic />
          <TournamentPulse />
          <MatchOfTheDay />
          <TodaySchedule />
          <BracketViz />
          {/* <PredictorsCircle /> */}
          <GroupStandings />
          {/* <GoldenBoot /> */}
          {/* <Leaderboard /> */}
          {/* <PredictionCenter /> */}
          <AdmizzStory />
        </LiveProvider>
      </TimezoneProvider>
    </div>
  );
}
