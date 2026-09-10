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

    
{/* SEOAI:FAQ:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<dl class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">What services does Admizz Education provide?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Admizz Education offers support and opportunities for students looking to study abroad, including guidance on choosing the right country and assistance with visa processes.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">Where are Admizz Education's offices located?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Admizz Education has offices in the USA (Denver, Colorado), India (Bengaluru), Zambia (Lusaka), Bangladesh (Bogra), and Nepal (Kathmandu and Birgunj).</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">How can I contact Admizz Education?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">You can contact Admizz Education via email at hello@admizz.com or by visiting one of their local offices for assistance.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">Is there local support for students in Nepal?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Yes, local counsellors are available in Birgunj and Janakpur, ready to guide students through the process of studying abroad, including visa assistance.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">Can I reach Admizz Education through WhatsApp?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">Yes, you can WhatsApp Admizz Education for support, particularly if you are a student from Birgunj or Janakpur.</dd>\n</dl>\n<script type=\"application/ld+json\">{\"@type\":\"FAQPage\",\"@context\":\"https://schema.org\",\"mainEntity\":[{\"name\":\"What services does Admizz Education provide?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Admizz Education offers support and opportunities for students looking to study abroad, including guidance on choosing the right country and assistance with visa processes.\",\"@type\":\"Answer\"}},{\"name\":\"Where are Admizz Education's offices located?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Admizz Education has offices in the USA (Denver, Colorado), India (Bengaluru), Zambia (Lusaka), Bangladesh (Bogra), and Nepal (Kathmandu and Birgunj).\",\"@type\":\"Answer\"}},{\"name\":\"How can I contact Admizz Education?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"You can contact Admizz Education via email at hello@admizz.com or by visiting one of their local offices for assistance.\",\"@type\":\"Answer\"}},{\"name\":\"Is there local support for students in Nepal?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Yes, local counsellors are available in Birgunj and Janakpur, ready to guide students through the process of studying abroad, including visa assistance.\",\"@type\":\"Answer\"}},{\"name\":\"Can I reach Admizz Education through WhatsApp?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Yes, you can WhatsApp Admizz Education for support, particularly if you are a student from Birgunj or Janakpur.\",\"@type\":\"Answer\"}}]}</script>" }} />{/* SEOAI:FAQ:END */}
</main>
  );
}
