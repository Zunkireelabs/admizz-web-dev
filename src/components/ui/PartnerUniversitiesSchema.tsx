import { allUniversities } from "@/lib/universities";

// ItemList JSON-LD of the partner universities, built from the same
// allUniversities data the /universities page already uses for its
// per-country partner chart — so the structured data can never list a
// university the page's own data doesn't. Schema-only, no visible markup.
// Each entry is a named CollegeOrUniversity with its country; nothing
// beyond name/country is asserted because that is all the source data holds.
const ISO_COUNTRY: Record<string, string> = {
  UK: "GB",
  USA: "US",
  Australia: "AU",
  Canada: "CA",
  Finland: "FI",
  France: "FR",
  Germany: "DE",
  India: "IN",
  "New Zealand": "NZ",
};

export default function PartnerUniversitiesSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": "https://admizzeducation.com/universities#partners",
          name: "Admizz Education partner universities",
          itemListElement: allUniversities.map((u, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "CollegeOrUniversity",
              name: u.name,
              address: { "@type": "PostalAddress", addressCountry: ISO_COUNTRY[u.country] ?? u.country },
            },
          })),
        }),
      }}
    />
  );
}
