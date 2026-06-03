import type { Metadata } from "next";
import AffiliateLoginBanner from "@/components/affiliate/AffiliateLoginBanner";
import AffiliateHero from "@/components/affiliate/AffiliateHero";
import WhoIsThisFor from "@/components/affiliate/WhoIsThisFor";
import BenefitsBento from "@/components/affiliate/BenefitsBento";
import HowItWorks from "@/components/affiliate/HowItWorks";
import CommissionTable from "@/components/affiliate/CommissionTable";
import AffiliateTiers from "@/components/affiliate/AffiliateTiers";
import ResourcesSection from "@/components/affiliate/ResourcesSection";
import SocialProofBar from "@/components/affiliate/SocialProofBar";
import AffiliateFAQ from "@/components/affiliate/AffiliateFAQ";
import ApplicationForm from "@/components/affiliate/ApplicationForm";
import AffiliateTestimonials from "@/components/affiliate/AffiliateTestimonials";
import FinalCTA from "@/components/affiliate/FinalCTA";

export const metadata: Metadata = {
  title: "Affiliate Program — Admizz Education",
  description:
    "Join the Admizz Affiliate Program. Earn competitive commissions per student referral. Campus ambassadors, content creators, and education professionals welcome. Apply free in 5 minutes.",
  alternates: {
    canonical: "https://admizzeducation.com/affiliate-program",
  },
  openGraph: {
    title: "Admizz Affiliate Program — Earn While Helping Students",
    description:
      "Nepal's most rewarding student affiliate program. Earn commissions, build your brand, and unlock tiers as you grow.",
    url: "https://admizzeducation.com/affiliate-program",
    siteName: "Admizz Education",
    images: ["/images/og/affiliate-program.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admizz Affiliate Program — Earn While Helping Students",
    description:
      "Nepal's most rewarding student affiliate program. Earn commissions, build your brand, and unlock tiers.",
    images: ["/images/og/affiliate-program.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Admizz Affiliate Program",
  description:
    "Join the Admizz Affiliate Program. Earn competitive commissions per student referral. Campus ambassadors, content creators, and education professionals welcome.",
  url: "https://admizzeducation.com/affiliate-program",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://admizzeducation.com" },
      { "@type": "ListItem", position: 2, name: "Affiliate Program", item: "https://admizzeducation.com/affiliate-program" },
    ],
  },
};

export default function AffiliateProgramPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ backgroundColor: "#020818" }}>
        <AffiliateLoginBanner />
        <AffiliateHero />
        <WhoIsThisFor />
        <BenefitsBento />
        <HowItWorks />
        <ResourcesSection />
        <CommissionTable />
        <AffiliateTiers />
        <SocialProofBar />
        <AffiliateTestimonials />
        <AffiliateFAQ />
        <ApplicationForm />
        <FinalCTA />
      </main>
    </>
  );
}
