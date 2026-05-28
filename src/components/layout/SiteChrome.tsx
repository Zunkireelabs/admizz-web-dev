"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

const PORTAL_ROUTES = ["/affiliate-dashboard", "/affiliate-admin"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = PORTAL_ROUTES.some(r => pathname.startsWith(r));

  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div className="h-[70px]" />
      {children}
      <ErrorBoundary
        fallback={
          <footer
            className="text-white py-8 text-center text-sm text-white/70"
            style={{ background: "linear-gradient(135deg, #0a0f5c 0%, #0D1282 40%, #1a3aad 100%)" }}
          >
            &copy; {new Date().getFullYear()} Admizz Education. All rights reserved.
          </footer>
        }
      >
        <div className="cv-auto">
          <Footer />
        </div>
      </ErrorBoundary>
    </>
  );
}
