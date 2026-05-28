import type { Metadata } from "next";
import CityLandingTemplate from "@/components/city-landing/CityLandingTemplate";
import { janakpurData } from "@/data/cities/janakpur";

export const metadata: Metadata = {
  title: janakpurData.meta.title,
  description: janakpurData.meta.description,
  alternates: { canonical: janakpurData.meta.canonical },
  openGraph: {
    title: janakpurData.meta.title,
    description: janakpurData.meta.description,
    url: janakpurData.meta.canonical,
    siteName: "Admizz Education",
    images: [janakpurData.meta.ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: janakpurData.meta.title,
    description: janakpurData.meta.description,
    images: [janakpurData.meta.ogImage],
  },
};

export default function JanakpurPage() {
  return <CityLandingTemplate data={janakpurData} />;
}
