import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Cookie Policy | Admizz Education",
  description:
    "How Admizz Education uses cookies and similar technologies on admizzeducation.com, which third parties set them, and how you can control them.",
  alternates: {
    canonical: "https://admizzeducation.com/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | Admizz Education",
    description:
      "How Admizz Education uses cookies and similar technologies on admizzeducation.com, which third parties set them, and how you can control them.",
    url: "https://admizzeducation.com/cookie-policy",
    siteName: "Admizz Education",
    type: "website",
  },
};

export default function CookiePolicyPage() {
  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://admizzeducation.com/" },
          { name: "Cookie Policy", url: "https://admizzeducation.com/cookie-policy" },
        ]}
      />
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">Cookie Policy</h1>
          <p className="mt-3 text-sm opacity-80">Last updated: October 12, 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-xl font-bold text-navy mb-4">What this policy covers</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">This Cookie Policy explains how Admizz Education (&ldquo;we&rdquo;, &ldquo;us&rdquo;) uses cookies and similar technologies on admizzeducation.com. It should be read with our <Link href="/privacy-policy" className="text-blue-link underline">Privacy Policy &amp; Terms of Use</Link>, which explains how we handle personal data.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">What cookies are</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">Cookies are small text files that a website stores on your device. Similar technologies, such as browser local storage and session storage, work in the same way. They help a site function, remember your choices and measure how it is used.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">The cookies and similar technologies we use</h2>
            <div className="space-y-3">
              <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                <li><strong>Essential site functions:</strong> small amounts of data kept in your browser, such as a session reference so that forms and page reloads work correctly. Visitors who sign in to our affiliate or student areas also have a sign-in session stored in your browser&apos;s local storage.</li>
                <li><strong>Affiliate referral reference:</strong> if you arrive through an affiliate link, the referral code is kept in your browser&apos;s session storage only. It is cleared when you close the browser and is not stored as a cookie.</li>
                <li><strong>Analytics (Google Analytics 4):</strong> we use Google Analytics to understand which pages are visited and how people reach us. It sets cookies, such as ones beginning with <code>_ga</code>, and collects usage data like pages viewed and approximate location.</li>
                <li><strong>Advertising measurement (Meta Pixel):</strong> we use the Meta (Facebook) Pixel to measure the results of our advertising and to show relevant ads. It can set cookies and receive information about your visit.</li>
                <li><strong>Embedded content:</strong> some pages include videos, maps or social posts from YouTube, Google Maps, Instagram or TikTok, and a partner accreditation badge from ICEF. These providers may set their own cookies when the content loads.</li>
              </ul>
              <p className="text-[15px] text-gray-dark leading-relaxed">The third parties above run their own services and set their own cookies under their own policies. We do not control those cookies.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">How long they last</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">Session storage and temporary session data are removed when you close your browser. Analytics and advertising cookies stay for the period set by the provider, which can be up to about two years. Saved preferences may last up to one year, as described in our <Link href="/privacy-policy" className="text-blue-link underline">Privacy Policy &amp; Terms of Use</Link>.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">How to control cookies</h2>
            <div className="space-y-3">
              <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                <li>Change your browser settings to block or delete cookies. Each browser explains how in its help pages.</li>
                <li>Use Google&apos;s opt-out tools for analytics, and the ad settings in your Facebook account to limit advertising use.</li>
                <li>Clear your browser&apos;s site data to remove local and session storage.</li>
              </ul>
              <p className="text-[15px] text-gray-dark leading-relaxed">If you block cookies, parts of the site, such as forms and sign-in, may not work as expected.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Changes to this policy</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">We may update this Cookie Policy when we change the tools we use or when the law requires. The date at the top shows when it was last updated.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Contact us</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">Questions about cookies can be sent to <a href="mailto:hello@admizz.com" className="text-blue-link underline">hello@admizz.com</a>.</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
