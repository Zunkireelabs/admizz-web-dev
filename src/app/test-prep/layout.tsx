import type { Metadata } from "next";
import ServiceSchema from "@/components/ui/ServiceSchema";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Test Preparation in Nepal: IELTS, GRE, TOEFL, PTE, SAT",
  description:
    "IELTS, TOEFL, GRE, PTE, SAT and Duolingo test preparation in Nepal: expert-led coaching, practice tests and personalized study plans from Admizz Education.",
  alternates: {
    canonical: "https://admizzeducation.com/test-prep",
  },
  openGraph: {
    title: "Test Preparation in Nepal: IELTS, GRE, TOEFL, PTE, SAT",
    description:
      "IELTS, TOEFL, GRE, PTE, SAT and Duolingo test preparation in Nepal: expert-led coaching, practice tests and personalized study plans from Admizz Education.",
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
  return (
    <>
      <ServiceSchema
        name="Test Preparation Services in Nepal"
        description={metadata.description as string}
        url="https://admizzeducation.com/test-prep"
        serviceType="Test preparation (IELTS, TOEFL, GRE, PTE, SAT, Duolingo)"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://admizzeducation.com/" },
          { name: "Test Preparation", url: "https://admizzeducation.com/test-prep" },
        ]}
      />
      {children}
    </>
  );
}
