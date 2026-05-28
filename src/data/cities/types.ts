import type { ReactNode } from "react";

export type LandmarkKey = "ghantaghar" | "janaki-mandir";

export interface InlineTrustBadge {
  iconKey: string;
  value: string;
  label: string;
}

export interface ActivityFeedEntry {
  name: string;
  area: string;
  action: string;
  ago: string;
}

export interface LivePresenceConfig {
  onlineLabel: string;
  offlineLabel: string;
  timezone: string;
  workingHours: { startHour: number; endHour: number; days: number[] };
}

export interface PartnerLogoStripItem {
  name: string;
  logo: string;
}

export interface FormStepIndicator {
  label: string;
}

export interface CityHeroData {
  eyebrow: string;
  heading: string;
  /** When set, the heading splits around this word and the rotator (or gradient) replaces it. */
  highlightedWord?: string;
  subheading: string;
  trustBadge: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  backgroundImage?: string;
  floatingStats?: { value: string; label: string }[];

  // v2 additive fields — all optional, fall back to v1 hero if omitted
  destinationRotator?: string[];
  livePresence?: LivePresenceConfig;
  inlineTrustBadges?: InlineTrustBadge[];
  activityFeed?: ActivityFeedEntry[];
  microTrustLine?: string;
  partnerLogosStrip?: PartnerLogoStripItem[];
  landmarkKey?: LandmarkKey;
  formSteps?: FormStepIndicator[];
}

export interface WhyChoosePoint {
  iconKey: string;
  title: string;
  description: string;
  proofPoint?: string;
}

export interface ComparisonRow {
  us: string;
  them: string;
}

export interface ComparisonBand {
  title: string;
  subtitle?: string;
  usLabel: string;
  themLabel: string;
  rows: ComparisonRow[];
}

export interface DestinationCard {
  country: string;
  flagEmoji: string;
  image: string;
  studentsPlaced: string;
  topUniversity: string;
  href: string;
  scholarship?: string;
  intakes?: string;
  avgVisaTime?: string;
  accentColor?: string;
  featured?: boolean;
  topPrograms?: string[];
}

export interface DestinationsHighlightStat {
  value: string;
  label: string;
}

export interface SuccessStory {
  name: string;
  photo: string;
  schoolInCity: string;
  quote: string;
  university: string;
  country: string;
  countryFlag: string;
  intake: string;
  ieltsScore?: string;
  scholarship?: string;
}

export interface OfficeData {
  name: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
  directionsUrl: string;
  nearbyLandmarks: string[];
  photos: string[];
  isVirtual?: boolean;
}

export interface ProcessStep {
  num: number;
  title: string;
  description: string;
  iconKey: string;
  duration: string;
}

export interface TrustMetric {
  value: string;
  numericValue?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
}

export interface PartnerLogo {
  name: string;
  logo: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PromoBanner {
  id: string;
  variant: "campaign" | "event" | "urgent";
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  startsAt?: string;
  endsAt?: string;
  cta?: { text: string; href: string };
  dismissible?: boolean;
}

export interface EventItem {
  id: string;
  type: "event" | "campaign" | "workshop" | "fair";
  title: string;
  description: string;
  startsAt: string;
  endsAt?: string;
  venue: string;
  seatsLeft?: number;
  totalSeats?: number;
  highlights?: string[];
  cta: { text: string; href: string };
  badge?: string;
}

export interface EventsSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: EventItem[];
  emptyState?: { heading: string; subheading: string; cta?: { text: string; href: string } };
}

export interface CityIdentityFact {
  icon: string;
  text: string;
  statValue?: string;
  statSuffix?: string;
  statLabel?: string;
  numericValue?: number;
}

export interface CityIdentityData {
  eyebrow: string;
  heading: string;
  subheading: string;
  landmarkImage: string;
  landmarkImageAlt: string;
  landmarkLabel: string;
  facts: CityIdentityFact[];
  cta: { text: string; href: string };
  accentPhotos?: { src: string; alt: string }[];
}

export interface CityLandingData {
  city: string;
  citySlug: string;
  meta: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
  };
  hero: CityHeroData;
  whyChoose: {
    eyebrow: string;
    heading: string;
    subheading?: string;
    points: WhyChoosePoint[];
    comparison?: ComparisonBand;
  };
  destinations: {
    eyebrow: string;
    heading: string;
    subheading: string;
    highlightStats?: DestinationsHighlightStat[];
    items: DestinationCard[];
    compareCta?: { text: string; href: string };
  };
  successStories: {
    eyebrow: string;
    heading: string;
    subheading: string;
    stories: SuccessStory[];
  };
  office: OfficeData;
  process: {
    eyebrow: string;
    heading: string;
    subheading: string;
    steps: ProcessStep[];
  };
  trustMetrics?: {
    eyebrow: string;
    heading: string;
    metrics: TrustMetric[];
    partnerUniLogos: PartnerLogo[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: FaqItem[];
  };
  finalCta?: {
    eyebrow: string;
    heading: string;
    subheading: string;
    primaryCta: { text: string; href: string };
    whatsappCta: { number: string; message: string; display: string };
  };
  topBanner?: PromoBanner;
  events?: EventsSection;
  cityIdentity?: CityIdentityData;
}
