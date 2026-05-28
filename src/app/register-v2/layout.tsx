import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register as a Student - Admizz Education",
  description:
    "Register with Admizz Education to get personalized guidance for studying abroad. Expert counseling, university admissions support, and visa assistance.",
  alternates: {
    canonical: "https://admizzeducation.com/register-v2",
  },
  openGraph: {
    title: "Register as a Student - Admizz Education",
    description:
      "Register with Admizz Education to get personalized guidance for studying abroad. Expert counseling, university admissions support, and visa assistance.",
    url: "https://admizzeducation.com/register-v2",
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
