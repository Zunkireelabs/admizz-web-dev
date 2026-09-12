import Image from "next/image";
import type { Metadata } from "next";
import GlobalPresence from "@/components/ui/GlobalPresence";

export const metadata: Metadata = {
  title: "Contact Us | Admizz Education",
  description:
    "Connect with top overseas education consultants. Get expert guidance on study abroad options, admissions, and visa support.",
  alternates: {
    canonical: "https://admizzeducation.com/contact",
  },
  openGraph: {
    title: "Contact Us | Admizz Education",
    description:
      "Connect with top overseas education consultants. Get expert guidance on study abroad options, admissions, and visa support.",
    url: "https://admizzeducation.com/contact",
    siteName: "Admizz Education",
    images: ["/images/contact/contact-us.webp"],
    type: "website",
  },
};


export default function ContactPage() {
  return (
    <main style={{ fontFamily: "'Montserrat', var(--font-montserrat), sans-serif" }}>
      {/* ===== HERO ===== */}
      <section className="py-16 md:py-20" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1
              className="text-3xl md:text-[42px] font-bold leading-tight mb-4"
              style={{ color: "#0D1282" }}
            >
              Contact Us
            </h1>
            <p className="text-[15px] leading-relaxed" style={{ color: "#5a6275" }}>
              Start your journey with a helping hand from{" "}
              <span className="font-bold" style={{ color: "#0D1282" }}>Admizz Education!</span>
            </p>
          </div>
          <div>
            <Image
              src="/images/contact/contact-us.webp"
              alt="Contact Admizz Education"
              width={1024}
              height={746}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* ===== GLOBAL PRESENCE ===== */}
      <GlobalPresence />

    
{/* SEOAI:FAQ:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<dl class=\"px-4 sm:px-6 lg:px-8\">\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">How can I contact Admizz Education?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">You can contact Admizz Education by reaching out to one of their offices globally or by sending an email to hello@admizz.com.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">Where is Admizz Education located in the USA?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Admizz Education has an office in Denver, Colorado, USA.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">Does Admizz Education have an office in India?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Yes, Admizz Education has an office located on the 2nd Floor of Jayaram Building, Kanakapura Main Road, Bengaluru, Karnataka, India.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">What services does Admizz Education offer to students?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Admizz Education provides support and guidance to students, including assistance with choosing the right country and getting their visa sorted, step by step.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">Is there local guidance available for students in Birgunj and Janakpur?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Yes, local counsellors are available in both Birgunj and Janakpur to guide students.</dd>\n</dl>\n<script type=\"application/ld+json\">{\"@type\":\"FAQPage\",\"@context\":\"https://schema.org\",\"mainEntity\":[{\"name\":\"How can I contact Admizz Education?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"You can contact Admizz Education by reaching out to one of their offices globally or by sending an email to hello@admizz.com.\",\"@type\":\"Answer\"}},{\"name\":\"Where is Admizz Education located in the USA?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Admizz Education has an office in Denver, Colorado, USA.\",\"@type\":\"Answer\"}},{\"name\":\"Does Admizz Education have an office in India?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Yes, Admizz Education has an office located on the 2nd Floor of Jayaram Building, Kanakapura Main Road, Bengaluru, Karnataka, India.\",\"@type\":\"Answer\"}},{\"name\":\"What services does Admizz Education offer to students?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Admizz Education provides support and guidance to students, including assistance with choosing the right country and getting their visa sorted, step by step.\",\"@type\":\"Answer\"}},{\"name\":\"Is there local guidance available for students in Birgunj and Janakpur?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Yes, local counsellors are available in both Birgunj and Janakpur to guide students.\",\"@type\":\"Answer\"}}]}</script>" }} />{/* SEOAI:FAQ:END */}
</main>
  );
}
