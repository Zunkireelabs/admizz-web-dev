import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register — Free Study Abroad Counseling | Admizz Education",
  description:
    "Register for a free study abroad counseling session with Admizz Education. Expert guidance, university admissions support, and visa assistance.",
  alternates: {
    canonical: "https://admizzeducation.com/register",
  },
  openGraph: {
    title: "Register — Free Study Abroad Counseling | Admizz Education",
    description:
      "Register for a free study abroad counseling session with Admizz Education. Expert guidance, university admissions support, and visa assistance.",
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
