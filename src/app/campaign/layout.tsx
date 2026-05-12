import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Win Big Campaign | Admizz Education",
  description:
    "Join the Win Big Campaign and stand a chance to win exciting prizes!",
  alternates: {
    canonical: "https://admizzeducation.com/campaign",
  },
  openGraph: {
    title: "Win Big Campaign | Admizz Education",
    description:
      "Join the Win Big Campaign and stand a chance to win exciting prizes!",
    url: "https://admizzeducation.com/campaign",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
