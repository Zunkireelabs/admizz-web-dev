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

    
{/* SEOAI:FAQ:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<dl class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px]\">\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">What international locations does Admizz Education operate in?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Admizz Education has a strong international presence with offices in the USA, India, Zambia, Bangladesh, and Nepal.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">How can I contact Admizz Education in the USA?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">You can contact Admizz Education in the USA by emailing hello@admizz.com or visiting their office in Denver, Colorado.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">Where is the Admizz Education office located in India?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">In India, Admizz Education is located at 2nd Floor, Jayaram Building, Kanakapura Main Road, Bengaluru, Karnataka 560062.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">What support does Admizz provide for students in Birgunj, Nepal?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Admizz provides local counsellors in Birgunj to guide students in choosing the right country and assisting with visa processes.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">Is there local support for students in Janakpur?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Yes, students in Janakpur can also receive guidance from local counsellors at Admizz Education.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">What email address should I use to reach Admizz Education?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">You can reach Admizz Education by emailing hello@admizz.com.</dd>\n</dl>\n<script type=\"application/ld+json\">{\"@type\":\"FAQPage\",\"@context\":\"https://schema.org\",\"mainEntity\":[{\"name\":\"What international locations does Admizz Education operate in?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Admizz Education has a strong international presence with offices in the USA, India, Zambia, Bangladesh, and Nepal.\",\"@type\":\"Answer\"}},{\"name\":\"How can I contact Admizz Education in the USA?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"You can contact Admizz Education in the USA by emailing hello@admizz.com or visiting their office in Denver, Colorado.\",\"@type\":\"Answer\"}},{\"name\":\"Where is the Admizz Education office located in India?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"In India, Admizz Education is located at 2nd Floor, Jayaram Building, Kanakapura Main Road, Bengaluru, Karnataka 560062.\",\"@type\":\"Answer\"}},{\"name\":\"What support does Admizz provide for students in Birgunj, Nepal?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Admizz provides local counsellors in Birgunj to guide students in choosing the right country and assisting with visa processes.\",\"@type\":\"Answer\"}},{\"name\":\"Is there local support for students in Janakpur?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Yes, students in Janakpur can also receive guidance from local counsellors at Admizz Education.\",\"@type\":\"Answer\"}},{\"name\":\"What email address should I use to reach Admizz Education?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"You can reach Admizz Education by emailing hello@admizz.com.\",\"@type\":\"Answer\"}}]}</script>" }} />{/* SEOAI:FAQ:END */}
</main>
  );
}
