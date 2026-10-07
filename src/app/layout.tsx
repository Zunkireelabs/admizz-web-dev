import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AffiliateRefCapture from "@/components/AffiliateRefCapture";
import UtmAttributionCapture from "@/components/UtmAttributionCapture";
import AuthTokenCatcher from "@/components/AuthTokenCatcher";

const montserrat = localFont({
  src: "../../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2",
  variable: "--font-montserrat",
  display: "swap",
});

const rubik = localFont({
  src: "../../node_modules/@fontsource-variable/rubik/files/rubik-latin-wght-normal.woff2",
  variable: "--font-rubik",
  display: "swap",
  preload: false,
});

const openSans = localFont({
  src: "../../node_modules/@fontsource-variable/open-sans/files/open-sans-latin-wght-normal.woff2",
  variable: "--font-opensans",
  display: "swap",
});

const playfair = localFont({
  src: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2",
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://admizzeducation.com"),
  title: "Admizz Education",
  description:
    "Dreaming of studying abroad? Admizz Education helps you explore top destinations, apply to global universities, and prepare for success.",
  icons: {
    icon: [
      { url: "/icon-32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/icon-192.webp", sizes: "192x192", type: "image/webp" },
    ],
    apple: [
      { url: "/icon-192.webp", sizes: "192x192", type: "image/webp" },
    ],
  },
  openGraph: {
    title: "Admizz Education",
    description:
      "Dreaming of studying abroad? Admizz Education helps you explore top destinations, apply to global universities, and prepare for success.",
    url: "https://admizzeducation.com",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admizz Education",
    description:
      "Dreaming of studying abroad? Admizz Education helps you explore top destinations, apply to global universities, and prepare for success.",
    images: ["/images/og/stuyabroad.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${rubik.variable} ${openSans.variable} ${playfair.variable}`}>
      <head>
        {/* SEOAI:HEAD:START */}{/* SEOAI:HEAD:END */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://edgex.zunkireelabs.com" />
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": "https://admizzeducation.com/#organization",
              name: "Admizz Education",
              url: "https://admizzeducation.com",
              logo: "https://admizzeducation.com/icon-192.webp",
              description:
                "Admizz Education helps students explore top study abroad destinations, apply to global universities, and prepare for success.",
              foundingDate: "2015",
              founder: {
                "@type": "Person",
                "@id": "https://admizzeducation.com/about#founder",
                name: "Manish K Sah",
                jobTitle: "Founder & CEO, Admizz Group",
                url: "https://admizzeducation.com/about",
              },
              knowsAbout: [
                "Study abroad counselling",
                "University admissions",
                "Student visa assistance",
                "Scholarship assistance",
                "IELTS, PTE and TOEFL preparation",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+977-9802728444",
                  contactType: "customer service",
                  areaServed: "NP",
                  availableLanguage: ["English", "Nepali"],
                },
                {
                  "@type": "ContactPoint",
                  email: "hello@admizz.com",
                  contactType: "customer service",
                },
              ],
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress: "Sita Ram Square (4th Floor), Putalisadak",
                  addressLocality: "Kathmandu",
                  addressCountry: "NP",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "2nd Floor, Jayaram Building, Kanakapura Main Road",
                  addressLocality: "Bengaluru",
                  addressRegion: "Karnataka",
                  postalCode: "560062",
                  addressCountry: "IN",
                },
              ],
              sameAs: [
                "https://www.facebook.com/admizz",
                "https://www.instagram.com/admizz_official/",
                "https://youtube.com/c/Admizz_official",
                "https://www.tiktok.com/@admizz_official",
                "https://www.linkedin.com/company/admizzofficial/",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://admizzeducation.com/#website",
              name: "Admizz Education",
              url: "https://admizzeducation.com",
              publisher: { "@id": "https://admizzeducation.com/#organization" },
            }),
          }}
        />
        {/* Office entities — same real addresses/contacts as the Organization
            above, linked back to it so AI engines resolve both branches to
            one brand. Schema-only, no visible change. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://admizzeducation.com/#office-kathmandu",
                  name: "Admizz Education — Kathmandu",
                  url: "https://admizzeducation.com/education-consultancy-in-kathmandu",
                  telephone: "+977-9802728444",
                  email: "hello@admizz.com",
                  parentOrganization: { "@id": "https://admizzeducation.com/#organization" },
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Sita Ram Square (4th Floor), Putalisadak",
                    addressLocality: "Kathmandu",
                    addressCountry: "NP",
                  },
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://admizzeducation.com/#office-bengaluru",
                  name: "Admizz Education — Bengaluru",
                  url: "https://admizzeducation.com",
                  email: "hello@admizz.com",
                  parentOrganization: { "@id": "https://admizzeducation.com/#organization" },
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "2nd Floor, Jayaram Building, Kanakapura Main Road",
                    addressLocality: "Bengaluru",
                    addressRegion: "Karnataka",
                    postalCode: "560062",
                    addressCountry: "IN",
                  },
                },
              ],
            }),
          }}
        />
        <AuthTokenCatcher />
        <ScrollToTop />
        <AffiliateRefCapture />
        <UtmAttributionCapture />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-blue-dark focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <SiteChrome>
          <div id="main-content" className="min-h-[80vh] overflow-x-clip">
            {children}
          </div>
        </SiteChrome>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <Script id="fb-pixel" strategy="lazyOnload">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
        <Script
          src="https://www-cdn.icef.com/scripts/iasbadgeid.js"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        {/* Zunkiree Search widget — hidden
        <Script
          src="https://zunkiree-search-v1.vercel.app/zunkiree-widget.iife.js"
          data-site-id="admizz"
          data-api-url="https://api.zunkireelabs.com"
          strategy="lazyOnload"
        />
        */}
      </body>
    </html>
  );
}
