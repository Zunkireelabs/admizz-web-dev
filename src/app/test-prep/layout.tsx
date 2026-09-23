import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Preparation Services in Nepal - IELTS, GRE, TOEFL, PTE, SAT | Admizz Education",
  description:
    "Test preparation services in Nepal for IELTS, TOEFL, GRE, PTE, SAT and Duolingo — expert-led coaching, practice tests, and personalized study plans. Real test preparation help for study abroad from Admizz Education.",
  alternates: {
    canonical: "https://admizzeducation.com/test-prep",
  },
  openGraph: {
    title: "Test Preparation Services in Nepal - IELTS, GRE, TOEFL, PTE, SAT | Admizz Education",
    description:
      "Test preparation services in Nepal for IELTS, TOEFL, GRE, PTE, SAT and Duolingo — expert-led coaching, practice tests, and personalized study plans. Real test preparation help for study abroad from Admizz Education.",
    url: "https://admizzeducation.com/test-prep",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

export default function TestPrepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
