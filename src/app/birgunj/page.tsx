import type { Metadata } from "next";
import CityLandingTemplate from "@/components/city-landing/CityLandingTemplate";
import { birgunjData } from "@/data/cities/birgunj";

export const metadata: Metadata = {
  title: birgunjData.meta.title,
  description: birgunjData.meta.description,
  alternates: { canonical: birgunjData.meta.canonical },
  openGraph: {
    title: birgunjData.meta.title,
    description: birgunjData.meta.description,
    url: birgunjData.meta.canonical,
    siteName: "Admizz Education",
    images: [birgunjData.meta.ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: birgunjData.meta.title,
    description: birgunjData.meta.description,
    images: [birgunjData.meta.ogImage],
  },
};

export default function BirgunjPage() {
  return <CityLandingTemplate data={birgunjData} />;
}
