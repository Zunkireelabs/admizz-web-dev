import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Counseling | Admizz Education",
  description:
    "Register with Admizz Education to get personalized guidance for studying abroad. Expert counseling, university admissions support, and visa assistance.",
  alternates: {
    canonical: "https://admizzeducation.com/register",
  },
  openGraph: {
    title: "Book a Free Counseling | Admizz Education",
    description:
      "Register with Admizz Education to get personalized guidance for studying abroad. Expert counseling, university admissions support, and visa assistance.",
    url: "https://admizzeducation.com/register",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
