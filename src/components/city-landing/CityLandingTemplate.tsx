import type { CityLandingData } from "@/data/cities/types";
import CityHero from "./sections/CityHero";
import TopPromoBanner from "./sections/TopPromoBanner";
import CityIdentity from "./sections/CityIdentity";
import WhyChooseLocal from "./sections/WhyChooseLocal";
import PopularDestinations from "./sections/PopularDestinations";
import SuccessStories from "./sections/SuccessStories";
import ProcessTimeline from "./sections/ProcessTimeline";
import TrustMetrics from "./sections/TrustMetrics";
import EventsCampaigns from "./sections/EventsCampaigns";
import CityFAQ from "./sections/CityFAQ";
import LocalOffice from "./sections/LocalOffice";
import FinalCta from "./sections/FinalCta";
import MobileStickyActions from "./components/MobileStickyActions";

interface CityLandingTemplateProps {
  data: CityLandingData;
}

export default function CityLandingTemplate({ data }: CityLandingTemplateProps) {
  return (
    <main>
      {/* FAQPage schema for the SAME faq.items CityFAQ below already
          renders visibly — no second, duplicate FAQ block, just the
          structured-data counterpart of the one that's already on the
          page. Every city page (birgunj, janakpur, ...) gets this the
          same way, since none of them emit it today. */}
      {data.faq.items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: data.faq.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}

      {data.topBanner && <TopPromoBanner banner={data.topBanner} />}

      <CityHero city={data.city} data={data.hero} />

      {data.cityIdentity && (
        <CityIdentity city={data.city} data={data.cityIdentity} />
      )}

      <WhyChooseLocal
        city={data.city}
        eyebrow={data.whyChoose.eyebrow}
        heading={data.whyChoose.heading}
        subheading={data.whyChoose.subheading}
        points={data.whyChoose.points}
        comparison={data.whyChoose.comparison}
      />

      <PopularDestinations
        eyebrow={data.destinations.eyebrow}
        heading={data.destinations.heading}
        subheading={data.destinations.subheading}
        items={data.destinations.items}
        highlightStats={data.destinations.highlightStats}
        compareCta={data.destinations.compareCta}
      />

      <SuccessStories
        city={data.city}
        eyebrow={data.successStories.eyebrow}
        heading={data.successStories.heading}
        subheading={data.successStories.subheading}
        stories={data.successStories.stories}
      />

      <ProcessTimeline
        eyebrow={data.process.eyebrow}
        heading={data.process.heading}
        subheading={data.process.subheading}
        steps={data.process.steps}
      />

      {data.trustMetrics && (
        <TrustMetrics
          eyebrow={data.trustMetrics.eyebrow}
          heading={data.trustMetrics.heading}
          metrics={data.trustMetrics.metrics}
          partnerUniLogos={data.trustMetrics.partnerUniLogos}
        />
      )}

      {data.events && <EventsCampaigns city={data.city} data={data.events} />}

      <LocalOffice city={data.city} office={data.office} />

      <CityFAQ
        eyebrow={data.faq.eyebrow}
        heading={data.faq.heading}
        subheading={data.faq.subheading}
        items={data.faq.items}
      />

      <MobileStickyActions
        phone={data.office.phone}
        phoneDisplay={data.office.phoneDisplay}
        whatsappNumber={data.office.whatsapp}
        whatsappMessage={data.office.whatsappMessage}
      />
    </main>
  );
}
