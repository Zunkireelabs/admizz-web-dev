// WebPage JSON-LD that names the destination this page is ABOUT as a real
// entity (linked to its Wikipedia page via sameAs) and ties the page to the
// site-wide WebSite and EducationalOrganization @ids from app/layout.tsx.
// Schema-only: no visible markup. The destination name comes from the page's
// own data.countryName; the Wikipedia URL is a fixed map of well-known
// entities, so nothing here is guessed from page content.
const WIKI_TITLE: Record<string, string> = {
  USA: "United_States",
  UK: "United_Kingdom",
  UAE: "United_Arab_Emirates",
};

// Official government / national-agency study portals, each fetched live and
// confirmed reachable (HTTP 200) before being listed. Emitted as schema
// `citation` — invisible to visitors, readable by AI engines as the page's
// authoritative sources. Destinations with no entry (Canada's canada.ca did
// not respond when checked; Nepal; Dubai) simply emit no citation.
const OFFICIAL_SOURCES: Record<string, string> = {
  UK: "https://www.gov.uk/student-visa",
  USA: "https://studyinthestates.dhs.gov/",
  Australia: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
  Germany: "https://www.daad.de/en/",
  "New Zealand": "https://www.immigration.govt.nz/",
  "South Korea": "https://www.studyinkorea.go.kr/",
  Denmark: "https://www.nyidanmark.dk/en-GB",
  Finland: "https://www.studyinfinland.fi/",
  France: "https://www.campusfrance.org/en",
  India: "https://studyinindia.gov.in/",
  UAE: "https://u.ae/en/information-and-services/education",
};

function normalize(countryName: string): string {
  return countryName.replace(/^the\s+/i, "").trim();
}

export default function DestinationEntitySchema({
  countryName,
  url,
  name,
  description,
}: {
  countryName: string;
  url: string;
  name?: string;
  description?: string;
}) {
  const clean = normalize(countryName);
  const wiki = WIKI_TITLE[clean] ?? clean.replace(/\s+/g, "_");
  const canonicalName = WIKI_TITLE[clean] ? WIKI_TITLE[clean].replace(/_/g, " ") : clean;

  const source = OFFICIAL_SOURCES[clean];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          ...(name ? { name } : {}),
          ...(description ? { description } : {}),
          isPartOf: { "@id": "https://admizzeducation.com/#website" },
          publisher: { "@id": "https://admizzeducation.com/#organization" },
          ...(source ? { citation: source } : {}),
          about: {
            "@type": clean === "Dubai" ? "Place" : "Country",
            name: canonicalName,
            sameAs: `https://en.wikipedia.org/wiki/${wiki}`,
          },
        }),
      }}
    />
  );
}
