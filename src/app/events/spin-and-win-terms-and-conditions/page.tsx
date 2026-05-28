import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";

const PAGE_URL =
  "https://admizzeducation.com/events/spin-and-win-terms-and-conditions";

export const metadata: Metadata = {
  title: "Spin & Win Terms & Conditions | Admizz Education",
  description:
    "Official Spin & Win Terms & Conditions: one spin per person, 30-day claim window, prizes redeemable only as a discount on paid Admizz Education services. Read full rules.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Spin & Win Terms & Conditions | Admizz Education",
    description:
      "Read the official rules for the Admizz Education Spin & Win campaign — eligibility, prize claim process, and the 30-day redemption window.",
    url: PAGE_URL,
    siteName: "Admizz Education",
    type: "website",
  },
};

const faqItems: FAQItem[] = [
  {
    question: "Can I get cash instead of my prize?",
    answer:
      "No. All prizes are non-transferable and have no cash alternative. Your prize is applied as a discount or credit toward a paid Admizz Education service.",
  },
  {
    question: "What counts as a 'paid Admizz Education service'?",
    answer:
      "Counselling and university shortlisting, application processing, visa support, test preparation programmes (IELTS, PTE, SAT, and similar), and any other paid service we offer during the Campaign period.",
  },
  {
    question: "What if I already enrolled in a service — can I still use my prize?",
    answer:
      "Prizes are intended to apply at the point of enrolment or payment. If you have already paid in full for a service, contact us at hello@admizz.com and we will review your case individually.",
  },
  {
    question: "Can I give my prize to a friend or family member?",
    answer:
      "No. Prizes are strictly non-transferable and tied to the contact details submitted at the time of spinning.",
  },
  {
    question: "What happens if I miss the 30-day claim window?",
    answer:
      "Prizes not claimed within 30 days from the date of the spin are forfeited automatically. Admizz Education is under no obligation to honour expired prizes.",
  },
  {
    question: "Can I spin again from a different email or device?",
    answer:
      "No. Only one spin is permitted per person, phone number, email address, and device. Multiple or automated entries result in disqualification.",
  },
  {
    question: "Who do I contact to claim my prize?",
    answer:
      "Email us at hello@admizz.com with your name, the phone number you used to spin, and the prize you won. Our team will guide you through the next steps.",
  },
  {
    question: "Can Admizz change the prizes or end the Campaign?",
    answer:
      "Yes. Admizz Education reserves the right to modify prizes, suspend, or end the Campaign at any time without prior notice, especially in case of technical errors or fraud.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": PAGE_URL,
      url: PAGE_URL,
      name: "Spin & Win Terms & Conditions | Admizz Education",
      description:
        "Official Terms & Conditions for the Admizz Education Spin & Win campaign.",
      datePublished: "2026-05-25",
      dateModified: "2026-05-25",
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: "Admizz Education",
        url: "https://admizzeducation.com",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://admizzeducation.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Spin & Win",
          item: "https://admizzeducation.com/events/spin-and-win",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Terms & Conditions",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function SpinAndWinTermsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs opacity-80 mb-5 flex items-center gap-2 flex-wrap"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/events/spin-and-win" className="hover:underline">
              Spin &amp; Win
            </Link>
            <span aria-hidden>/</span>
            <span className="opacity-90">Terms &amp; Conditions</span>
          </nav>

          <div className="text-center">
            <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
              Spin &amp; Win — Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-sm opacity-80">
              Effective Date: May 25, 2026 &middot; Last Modified: May 25, 2026
            </p>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="space-y-12">
              {/* === A. Quick Summary === */}
              <div id="summary" className="scroll-mt-24">
                <div className="rounded-[10px] border border-border-light bg-off-white p-6 md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-royal mb-3">
                    The 30-Second Version
                  </p>
                  <h2 className="text-xl font-bold text-navy mb-4">
                    What You Need to Know
                  </h2>
                  <ul className="space-y-2.5 text-[15px] text-navy">
                    <li className="flex gap-3">
                      <span aria-hidden className="text-blue-royal font-bold">
                        ✓
                      </span>
                      <span>
                        <span className="font-semibold">One spin per person</span>{" "}
                        — per phone, email, and device.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span aria-hidden className="text-blue-royal font-bold">
                        ✓
                      </span>
                      <span>
                        Your prize is a{" "}
                        <span className="font-semibold">
                          discount or credit on a paid Admizz Education service
                        </span>{" "}
                        — not a standalone reward.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span aria-hidden className="text-blue-royal font-bold">
                        ✓
                      </span>
                      <span>
                        You have{" "}
                        <span className="font-semibold">30 days</span> from
                        spinning to contact us and start your enrolment.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span aria-hidden className="text-blue-royal font-bold">
                        ✓
                      </span>
                      <span>
                        Prizes are{" "}
                        <span className="font-semibold">non-transferable</span>,
                        with no cash alternative.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* === C. Quick Reference Table === */}
              <div id="quick-reference" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-4">
                  Quick Reference
                </h2>
                <div className="rounded-[10px] border border-border-light overflow-hidden">
                  <table className="w-full text-[14px]">
                    <tbody className="divide-y divide-border-light">
                      <tr className="bg-off-white">
                        <th
                          scope="row"
                          className="text-left font-semibold text-navy px-4 py-3 w-[40%]"
                        >
                          Spins allowed
                        </th>
                        <td className="text-gray-dark px-4 py-3">
                          1 per person / email / device
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="text-left font-semibold text-navy px-4 py-3"
                        >
                          Claim window
                        </th>
                        <td className="text-gray-dark px-4 py-3">
                          30 days from the spin date
                        </td>
                      </tr>
                      <tr className="bg-off-white">
                        <th
                          scope="row"
                          className="text-left font-semibold text-navy px-4 py-3"
                        >
                          Prize form
                        </th>
                        <td className="text-gray-dark px-4 py-3">
                          Discount or credit on a paid Admizz service
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="text-left font-semibold text-navy px-4 py-3"
                        >
                          Cash alternative
                        </th>
                        <td className="text-gray-dark px-4 py-3">No</td>
                      </tr>
                      <tr className="bg-off-white">
                        <th
                          scope="row"
                          className="text-left font-semibold text-navy px-4 py-3"
                        >
                          Transferable
                        </th>
                        <td className="text-gray-dark px-4 py-3">No</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="text-left font-semibold text-navy px-4 py-3"
                        >
                          Contact
                        </th>
                        <td className="text-gray-dark px-4 py-3">
                          <a
                            href="mailto:hello@admizz.com"
                            className="text-blue-royal underline hover:text-blue-dark"
                          >
                            hello@admizz.com
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* === B. How to Claim — 3 Steps === */}
              <div id="how-to-claim" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-5">
                  How to Claim Your Prize — 3 Steps
                </h2>
                <ol className="space-y-4">
                  <li className="rounded-[10px] border border-border-light bg-white p-5 flex gap-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-royal text-white font-bold flex items-center justify-center text-[15px]">
                      1
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-navy mb-1">
                        Spin &amp; note your prize
                      </h3>
                      <p className="text-[14px] text-gray-dark leading-relaxed">
                        After the wheel stops, take a screenshot or save the
                        confirmation message. The submission form will also
                        record your prize automatically.
                      </p>
                    </div>
                  </li>
                  <li className="rounded-[10px] border border-border-light bg-white p-5 flex gap-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-royal text-white font-bold flex items-center justify-center text-[15px]">
                      2
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-navy mb-1">
                        Contact Admizz within 30 days
                      </h3>
                      <p className="text-[14px] text-gray-dark leading-relaxed">
                        Email{" "}
                        <a
                          href="mailto:hello@admizz.com"
                          className="text-blue-royal underline"
                        >
                          hello@admizz.com
                        </a>{" "}
                        or call our office. Include the phone number you used
                        when spinning so we can match your entry to your prize.
                      </p>
                    </div>
                  </li>
                  <li className="rounded-[10px] border border-border-light bg-white p-5 flex gap-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-royal text-white font-bold flex items-center justify-center text-[15px]">
                      3
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-navy mb-1">
                        Enrol in any paid Admizz service
                      </h3>
                      <p className="text-[14px] text-gray-dark leading-relaxed">
                        Your prize is applied as a discount, waiver, or credit
                        at the time of enrolment — counselling, application
                        processing, visa support, or test prep.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* === About === */}
              <div id="about" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">
                  1. About the Campaign
                </h2>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  The Spin &amp; Win Campaign (&ldquo;Campaign&rdquo;) is a
                  promotional activity run by Admizz Education
                  (&ldquo;Admizz,&rdquo; &ldquo;We,&rdquo; &ldquo;Us&rdquo;).
                  Participants spin a virtual wheel for a chance to receive a
                  reward redeemable against our paid services. By spinning and
                  submitting your details, you confirm that you have read and
                  agreed to these Terms.
                </p>
              </div>

              {/* === Eligibility === */}
              <div id="eligibility" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">
                  2. Eligibility
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>
                    The Campaign is open to individuals interested in studying
                    abroad through Admizz Education.
                  </li>
                  <li>
                    Employees of Admizz Education, their immediate family
                    members, and affiliated partners are not eligible to claim
                    prizes.
                  </li>
                  <li>
                    You must provide accurate and verifiable contact details to
                    be eligible.
                  </li>
                </ul>
              </div>

              {/* === How to Play === */}
              <div id="how-to-play" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">
                  3. How to Play
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>
                    Visit the Spin &amp; Win page, click spin, and wait for the
                    wheel to stop. The segment the pointer lands on is your
                    prize.
                  </li>
                  <li>
                    <span className="font-semibold">One spin only.</span> One
                    entry per person, phone number, email address, and device.
                  </li>
                  <li>
                    Multiple, automated, or manipulated entries result in
                    immediate disqualification.
                  </li>
                  <li>
                    Submit the prize-claim form with your name, phone, and
                    email to lock in your reward.
                  </li>
                </ul>
              </div>

              {/* === Prizes === */}
              <div id="prizes" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">4. Prizes</h2>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>
                    Prizes available are as displayed on the wheel at the time
                    of play and may be updated by Admizz at any time.
                  </li>
                  <li>
                    All prizes are{" "}
                    <span className="font-semibold">non-transferable</span> and
                    cannot be exchanged, sold, or assigned.
                  </li>
                  <li>
                    No <span className="font-semibold">cash alternative</span>{" "}
                    is offered, in whole or in part.
                  </li>
                  <li>
                    Prizes have no monetary value independent of an Admizz
                    Education service enrolment.
                  </li>
                </ul>
              </div>

              {/* === Prize Claim Rule (CORE) === */}
              <div id="prize-claim" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">
                  5. Prize Claim — How Rewards Are Redeemed
                </h2>
                <div className="rounded-[10px] border-l-4 border-blue-royal bg-off-white p-5 mb-4">
                  <p className="text-[15px] text-navy font-semibold leading-relaxed">
                    Prizes can be claimed only by availing paid services
                    through Admizz Education. The value of the prize is applied
                    as a discount, credit, or waiver against the service of
                    your choice — and cannot be claimed independently of that
                    enrolment.
                  </p>
                </div>
                <p className="text-[15px] text-gray-dark leading-relaxed mb-3">
                  Qualifying Admizz Education services include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-dark leading-relaxed">
                  <li>Study-abroad counselling and university shortlisting</li>
                  <li>University application processing</li>
                  <li>Visa application support</li>
                  <li>
                    Test preparation programmes (IELTS, PTE, SAT, and similar)
                  </li>
                  <li>Any other paid service offered during the Campaign</li>
                </ul>
              </div>

              {/* === Claim Window === */}
              <div id="claim-window" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">
                  6. Prize Claim Window
                </h2>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  Winners must contact Admizz Education and begin their service
                  enrolment within{" "}
                  <span className="font-semibold">thirty (30) days</span> from
                  the date of the spin. Prizes not claimed within this window
                  are forfeited and Admizz is under no obligation to honour
                  them.
                </p>
              </div>

              {/* === Verification === */}
              <div id="verification" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">
                  7. Verification of Winners
                </h2>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  We reserve the right to verify your identity, eligibility,
                  and contact details before honouring a prize. Failure to
                  provide satisfactory verification will result in
                  disqualification.
                </p>
              </div>

              {/* === Modification === */}
              <div id="modification" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">
                  8. Modification, Suspension &amp; Cancellation
                </h2>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  Admizz Education may, at its sole discretion and without
                  prior notice, modify these Terms, change the prize pool,
                  suspend, or terminate the Campaign — including in cases of
                  technical error, fraud, or circumstances beyond reasonable
                  control.
                </p>
              </div>

              {/* === Liability === */}
              <div id="liability" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">
                  9. Limitation of Liability
                </h2>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  Participation is voluntary. Admizz Education is not liable
                  for any loss, damage, or injury arising from participation,
                  acceptance, or redemption of a prize, except where such
                  liability cannot be excluded by applicable law.
                </p>
              </div>

              {/* === Data === */}
              <div id="data" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">
                  10. Use of Personal Information
                </h2>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  Information you submit through the prize-claim form — name,
                  phone, email, and the prize you won — is used to contact you
                  about claiming and to enrol you in our services. Your data is
                  handled according to our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-royal underline hover:text-blue-dark"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {/* === Disputes === */}
              <div id="disputes" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-navy mb-3">
                  11. Disputes &amp; Governing Law
                </h2>
                <p className="text-[15px] text-gray-dark leading-relaxed">
                  Admizz Education&rsquo;s decisions on eligibility, prizes,
                  and disqualifications are final and binding. These Terms are
                  governed by the laws of Nepal, and disputes are subject to
                  the exclusive jurisdiction of competent courts in Nepal.
                </p>
              </div>
          </article>
        </div>
      </section>

      {/* === D. FAQ Section === */}
      <div id="faq" className="scroll-mt-24 bg-off-white">
        <FAQ
          title="Frequently Asked Questions"
          items={faqItems}
        />
      </div>

      {/* === F. Bottom CTA === */}
      <section id="contact" className="scroll-mt-24 py-14 bg-gradient-to-r from-blue-royal to-blue-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-[32px] font-bold mb-3">
            Ready to Claim Your Prize?
          </h2>
          <p className="text-[15px] opacity-90 max-w-2xl mx-auto mb-6">
            Get in touch within 30 days of your spin and our team will guide
            you through enrolling in the Admizz service of your choice.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:hello@admizz.com"
              className="bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:opacity-90 transition-opacity"
            >
              Email hello@admizz.com
            </a>
            <Link
              href="/events/spin-and-win"
              className="border border-white/40 text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-white/10 transition-colors"
            >
              Back to Spin &amp; Win
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
