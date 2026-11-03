import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Terms of Service | Admizz Education",
  description:
    "The terms for using admizzeducation.com and Admizz Education's counseling, guides and registration forms, including accuracy of information and limits of liability.",
  alternates: {
    canonical: "https://admizzeducation.com/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Admizz Education",
    description:
      "The terms for using admizzeducation.com and Admizz Education's counseling, guides and registration forms, including accuracy of information and limits of liability.",
    url: "https://admizzeducation.com/terms-of-service",
    siteName: "Admizz Education",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://admizzeducation.com/" },
          { name: "Terms of Service", url: "https://admizzeducation.com/terms-of-service" },
        ]}
      />
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">Terms of Service</h1>
          <p className="mt-3 text-sm opacity-80">Last updated: October 12, 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Agreeing to these terms</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">By using admizzeducation.com or submitting a form on it, you agree to these Terms of Service together with our <Link href="/privacy-policy" className="text-blue-link underline">Privacy Policy &amp; Terms of Use</Link>. If you do not agree, please do not use the site. &ldquo;We&rdquo; and &ldquo;us&rdquo; mean Admizz Education; &ldquo;you&rdquo; means the person using the site.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">What we provide</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">Admizz Education is a study abroad consultancy. The site provides guides, tools and forms, and lets you register for counseling on university selection, applications, visas, scholarships and test preparation. Counseling is free for students: we earn from university partners and not from students.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">No guarantee of outcomes</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">Admission, a visa, a scholarship or a job offer is decided by the university, government or funder, not by Admizz. We give guidance and support but cannot promise any decision. A success rate we publish describes past results and is not a promise for your application.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Accuracy of information</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">Our guides cite official sources and show when they were last checked. Fees, funds, deadlines and visa rules change often, so confirm every figure on the official government or university website before you act. We try to keep the site accurate but do not warrant that it is complete or current.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Your responsibilities</h2>
            <div className="space-y-3">
              <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                <li>Give accurate and complete information in any form you submit.</li>
                <li>Apply to a scheme that requires direct applications yourself. For example, the Embassy of India accepts COMPEX applications only from the applicant.</li>
                <li>Do not misuse the site, attempt to disrupt it or access it by automated means that harm its operation.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Intellectual property</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">The content on this site, including text, graphics, logos and layout, belongs to Admizz Education or its licensors. You may use it for personal, non-commercial purposes. You may not copy, distribute or modify it without our written permission.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Third-party links and content</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">The site links to government, university and other third-party sites and embeds content from them. We do not control those sites and are not responsible for their content or policies.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Limitation of liability</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">To the extent the law allows, Admizz Education is not liable for losses that result from relying on the site, from decisions made by universities, governments or funders, or from third-party services. Nothing in these terms limits liability that cannot be limited by law.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Changes to these terms</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">We may update these terms from time to time. The date at the top shows the latest version, and continuing to use the site after a change means you accept it.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Governing law</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">Governing law and jurisdiction are as stated in our <Link href="/privacy-policy" className="text-blue-link underline">Privacy Policy &amp; Terms of Use</Link>.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Contact us</h2>
            <div className="space-y-3">
              <p className="text-[15px] text-gray-dark leading-relaxed">Questions about these terms can be sent to <a href="mailto:hello@admizz.com" className="text-blue-link underline">hello@admizz.com</a>.</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
