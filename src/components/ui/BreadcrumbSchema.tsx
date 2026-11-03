// BreadcrumbList JSON-LD only — no visible breadcrumb trail is added or
// changed, this is purely the structured-data counterpart of the page's
// existing position in the site (Home > page). Schema-only, so it can never
// duplicate or conflict with any visible UI.
export interface BreadcrumbSchemaItem {
  name: string;
  url: string;
}

export default function BreadcrumbSchema({ items }: { items: BreadcrumbSchemaItem[] }) {
  if (!items || items.length < 2) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.url,
          })),
        }),
      }}
    />
  );
}
