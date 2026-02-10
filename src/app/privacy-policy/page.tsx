import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Admizz Education",
  description:
    "Explore Admizz Education's Privacy Policy & Terms of Use. Learn how we handle your data, use cookies, and protect your rights at Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/privacy-policy/",
  },
  openGraph: {
    title: "Privacy Policy | Admizz Education",
    description:
      "Explore Admizz Education's Privacy Policy & Terms of Use. Learn how we handle your data, use cookies, and protect your rights at Admizz.",
    url: "https://admizzeducation.com/privacy-policy/",
    siteName: "Admizz Education",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
            Admizz Education Privacy Policy &amp; Terms of Use
          </h1>
          <p className="mt-3 text-sm opacity-80">
            Effective Date: March 31, 2025 &middot; Last Modified: October 23,
            2025
          </p>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* --- Who We Are --- */}
          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Who We Are</h2>
            <p className="text-[15px] text-gray-dark leading-relaxed">
              Admizz Education (&ldquo;We,&rdquo; &ldquo;Us,&rdquo;
              &ldquo;Our,&rdquo; or &ldquo;The Company&rdquo;) dedicates itself
              to providing educational services and resources to users. These
              terms apply to website usage and services, governed by prevailing
              Colorado, USA laws.
            </p>
          </div>

          {/* --- Terms of Use --- */}
          <div>
            <h2 className="text-xl font-bold text-navy mb-6">Terms of Use</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  Acceptance of Terms
                </h3>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  Accessing the website constitutes agreement to comply with the
                  Terms and Conditions, Privacy Policy, and any additional
                  agreements. The terms &ldquo;Party,&rdquo;
                  &ldquo;Parties,&rdquo; or &ldquo;Us&rdquo; refer to both the
                  user and Admizz Education. All terminology used
                  (singular/plural pronouns) is interchangeable.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  License to Use
                </h3>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  Admizz Education and/or its licensors own intellectual property
                  rights to all content on the website. Users may access content
                  for personal, non-commercial use only, subject to stated
                  restrictions. Users may not reproduce, distribute, or modify
                  content without prior written permission. All intellectual
                  property rights remain reserved.
                </p>
              </div>
            </div>
          </div>

          {/* --- Privacy Policy --- */}
          <div>
            <h2 className="text-xl font-bold text-navy mb-6">
              Privacy Policy
            </h2>

            <div className="space-y-8">
              {/* Cookies */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-3">Cookies</h3>
                <p className="text-[15px] text-gray-dark leading-relaxed mb-3">
                  The organization uses cookies to enhance website experience.
                  Users consent to cookie usage by accessing the site.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>
                    <span className="font-semibold">Purpose:</span> Cookies
                    retrieve user details for convenience, enable site
                    functionality, and improve browsing experience.
                  </li>
                  <li>
                    <span className="font-semibold">Duration:</span> Cookies may
                    last up to one year for saved preferences (name or email if
                    opted-in). Temporary cookies for login detection expire when
                    users close their browser.
                  </li>
                  <li>
                    <span className="font-semibold">Third Parties:</span>{" "}
                    Affiliate or advertising partners may use cookies. Users can
                    manage cookie preferences via browser settings.
                  </li>
                </ul>
              </div>

              {/* Comments */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-3">Comments</h3>
                <p className="text-[15px] text-gray-dark leading-relaxed mb-3">
                  When leaving comments, the website collects:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>Data entered in the comment form</li>
                  <li>
                    IP address and browser user agent string (for spam detection)
                  </li>
                </ul>
              </div>

              {/* Media */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-3">Media</h3>
                <p className="text-[15px] text-gray-dark leading-relaxed mb-3">
                  When uploading images or media:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>
                    Avoid including embedded location data (EXIF GPS), as
                    visitors can extract this information
                  </li>
                  <li>
                    Uploaded content may be publicly accessible depending on
                    context
                  </li>
                </ul>
              </div>

              {/* Embedded Content */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  Embedded Content from Other Websites
                </h3>
                <p className="text-[15px] text-gray-dark leading-relaxed mb-3">
                  The website may include embedded content (videos, images,
                  articles) from third-party sites. These may:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>Collect data about users</li>
                  <li>Use cookies or third-party tracking</li>
                  <li>
                    Monitor interactions, especially if logged into those sites
                  </li>
                </ul>
              </div>

              {/* Data Sharing */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  Who We Share Your Data With
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>
                    <span className="font-semibold">Service Providers:</span>{" "}
                    Data shared with automated services (spam detection) or
                    partners facilitating website functionality
                  </li>
                  <li>
                    <span className="font-semibold">Password Resets:</span> IP
                    addresses included in reset emails when requested
                  </li>
                </ul>
              </div>

              {/* Data Retention */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  How Long We Retain Your Data
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>
                    <span className="font-semibold">Comments:</span> Retained
                    indefinitely unless deletion requested
                  </li>
                  <li>
                    <span className="font-semibold">Registered Users:</span>{" "}
                    Personal information in user profiles stored while account is
                    active. Users can edit or delete information (except
                    username) anytime
                  </li>
                  <li>
                    <span className="font-semibold">Legal Obligations:</span>{" "}
                    Data retained when required for administrative, legal, or
                    security purposes
                  </li>
                </ul>
              </div>

              {/* User Rights */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  Your Rights Over Your Data
                </h3>
                <p className="text-[15px] text-gray-dark leading-relaxed mb-3">
                  Users with accounts or who left comments can:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>Request an exported file of personal data</li>
                  <li>
                    Request deletion of data, excluding information retained for
                    legal or security reasons
                  </li>
                  <li>
                    Contact{" "}
                    <a
                      href="mailto:support@admizz.com"
                      className="text-blue-royal underline hover:text-blue-dark transition-colors"
                    >
                      support@admizz.com
                    </a>{" "}
                    to exercise these rights
                  </li>
                </ul>
              </div>

              {/* Data Transfer */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  Where Your Data Is Sent
                </h3>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  Visitor comments may be processed by automated spam detection
                  services. Data is stored and processed in compliance with
                  Indian law and may be transferred to secure servers as needed.
                </p>
              </div>
            </div>
          </div>

          {/* --- General Provisions --- */}
          <div>
            <h2 className="text-xl font-bold text-navy mb-6">
              General Provisions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  Changes to This Policy
                </h3>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  The organization may update these Terms and Privacy Policy
                  periodically. Continued website use after changes implies
                  acceptance of revised terms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  Governing Law
                </h3>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  These terms are governed by Indian law. Any disputes will be
                  resolved in accordance with Indian jurisdiction.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  Contact Us
                </h3>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  If you have any questions about this Privacy Policy or Terms of
                  Use, please contact us at{" "}
                  <a
                    href="mailto:support@admizz.com"
                    className="text-blue-royal underline hover:text-blue-dark transition-colors"
                  >
                    support@admizz.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
