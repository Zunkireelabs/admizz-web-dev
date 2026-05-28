import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Preview - Admizz Education",
  description: "Internal preview of the enhanced register page.",
  robots: { index: false, follow: false },
};

export default function RegisterPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
