// Service JSON-LD only — no visible markup. Ties a service page to the
// site-wide EducationalOrganization (@id set in app/layout.tsx) so AI engines
// resolve "who provides this service" to one entity. name/description/url are
// passed in from each page's own existing metadata, never invented here.
export interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}

export default function ServiceSchema({ name, description, url, serviceType }: ServiceSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name,
          description,
          url,
          serviceType,
          provider: { "@id": "https://admizzeducation.com/#organization" },
          areaServed: { "@type": "Country", name: "Nepal" },
        }),
      }}
    />
  );
}
