import Image from "next/image";
import type { Metadata } from "next";
import GlobalPresence from "@/components/ui/GlobalPresence";

export const metadata: Metadata = {
  title: "Contact Admizz Education | Free Study Abroad Counselling",
  description:
    "Have questions about studying abroad? Talk to Admizz Education's expert counsellors for free guidance on admissions, scholarships, and visas.",
  alternates: {
    canonical: "https://admizzeducation.com/contact",
  },
  openGraph: {
    title: "Contact Admizz Education | Free Study Abroad Counselling",
    description:
      "Have questions about studying abroad? Talk to Admizz Education's expert counsellors for free guidance on admissions, scholarships, and visas.",
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

    
{/* SEOAI:BREADCRUMBSCHEMA:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<script type=\"application/ld+json\">{\"@type\":\"BreadcrumbList\",\"@context\":\"https://schema.org\",\"itemListElement\":[{\"item\":\"https://admizzeducation.com/\",\"name\":\"Admizz Education\",\"@type\":\"ListItem\",\"position\":1},{\"item\":\"https://admizzeducation.com/contact\",\"name\":\"Contact\",\"@type\":\"ListItem\",\"position\":2}]}</script>" }} />{/* SEOAI:BREADCRUMBSCHEMA:END */}

{/* SEOAI:FAQ:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<dl class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-0\">\n  <dt>What services does Admizz Education offer?</dt>\n  <dd class=\"text-sm md:text-base mb-3 opacity-90 gap-2.5\">Admizz Education provides support and opportunities for students on a global scale, including guidance on choosing the right country and getting visa assistance.</dd>\n  <dt>Where can I find Admizz Education offices?</dt>\n  <dd class=\"text-sm md:text-base mb-3 opacity-90 gap-2.5\">Admizz Education has offices in several locations, including the USA (Denver, Colorado), India (Bengaluru), Zambia (Lusaka), Bangladesh (Bogra), and Nepal (Kathmandu and Birgunj).</dd>\n  <dt>How can I contact Admizz Education?</dt>\n  <dd class=\"text-sm md:text-base mb-3 opacity-90 gap-2.5\">You can contact Admizz Education via email at hello@admizz.com for inquiries. For local services, WhatsApp options are available for specific locations in Nepal.</dd>\n  <dt>Do you have local guidance for students in Nepal?</dt>\n  <dd class=\"text-sm md:text-base mb-3 opacity-90 gap-2.5\">Yes, Admizz Education provides local counsellors in Birgunj and Janakpur, who are ready to assist students with their educational journey and visa processes.</dd>\n  <dt>Where is the office in India located?</dt>\n  <dd class=\"text-sm md:text-base mb-3 opacity-90 gap-2.5\">The office in India is located on the 2nd Floor, Jayaram Building, Kanakapura Main Road, Bengaluru, Karnataka 560062.</dd>\n</dl>\n<script type=\"application/ld+json\">{\"@type\":\"FAQPage\",\"@context\":\"https://schema.org\",\"mainEntity\":[{\"name\":\"What services does Admizz Education offer?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Admizz Education provides support and opportunities for students on a global scale, including guidance on choosing the right country and getting visa assistance.\",\"@type\":\"Answer\"}},{\"name\":\"Where can I find Admizz Education offices?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Admizz Education has offices in several locations, including the USA (Denver, Colorado), India (Bengaluru), Zambia (Lusaka), Bangladesh (Bogra), and Nepal (Kathmandu and Birgunj).\",\"@type\":\"Answer\"}},{\"name\":\"How can I contact Admizz Education?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"You can contact Admizz Education via email at hello@admizz.com for inquiries. For local services, WhatsApp options are available for specific locations in Nepal.\",\"@type\":\"Answer\"}},{\"name\":\"Do you have local guidance for students in Nepal?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Yes, Admizz Education provides local counsellors in Birgunj and Janakpur, who are ready to assist students with their educational journey and visa processes.\",\"@type\":\"Answer\"}},{\"name\":\"Where is the office in India located?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"The office in India is located on the 2nd Floor, Jayaram Building, Kanakapura Main Road, Bengaluru, Karnataka 560062.\",\"@type\":\"Answer\"}}]}</script>" }} />{/* SEOAI:FAQ:END */}
</main>
  );
}
