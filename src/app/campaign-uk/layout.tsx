import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fly to UK with Free Laptop | Admizz Education",
  description:
    "Apply to top UK universities with Admizz Education: expert counseling, university and course selection, visa and scholarship support.",
  alternates: {
    canonical: "https://admizzeducation.com/campaign-uk",
  },
  openGraph: {
    title: "Fly to UK with Free Laptop | Admizz Education",
    description:
      "Apply to top UK universities with Admizz Education: expert counseling, university and course selection, visa and scholarship support.",
    url: "https://admizzeducation.com/campaign-uk",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

export default function CampaignUKLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
