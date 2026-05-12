import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Preparation - IELTS, GRE, TOEFL, PTE, SAT | Admizz Education",
  description:
    "Ace your IELTS, TOEFL, GRE, PTE, SAT and Duolingo exams with expert-led coaching, practice tests, and personalized study plans at Admizz Education.",
  alternates: {
    canonical: "https://admizzeducation.com/test-prep",
  },
  openGraph: {
    title: "Test Preparation - IELTS, GRE, TOEFL, PTE, SAT | Admizz Education",
    description:
      "Ace your IELTS, TOEFL, GRE, PTE, SAT and Duolingo exams with expert-led coaching, practice tests, and personalized study plans at Admizz Education.",
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
