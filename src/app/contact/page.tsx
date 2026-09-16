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

    
{/* SEOAI:FAQ:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<script type=\"application/ld+json\">{\"@type\":\"FAQPage\",\"@context\":\"https://schema.org\",\"mainEntity\":[{\"name\":\"What countries does Admizz Education operate in?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Admizz Education has a strong international presence with offices in the USA, India, Zambia, Bangladesh, and Nepal.\",\"@type\":\"Answer\"}},{\"name\":\"How can I contact Admizz Education?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"You can contact Admizz Education via email at hello@admizz.com. For specific countries, you can also reach out to the respective offices listed.\",\"@type\":\"Answer\"}},{\"name\":\"Is there local support available for students in Nepal?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Yes, Admizz Education offers local counseling support in Nepal, with offices in Kathmandu and Birgunj, as well as Janakpur.\",\"@type\":\"Answer\"}},{\"name\":\"What services does Admizz Education provide to students?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Admizz Education provides guidance to students from choosing the right country to getting their visa sorted, step by step.\",\"@type\":\"Answer\"}},{\"name\":\"Where is the Admizz Education office in the USA located?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"The Admizz Education office in the USA is located in Denver, Colorado.\",\"@type\":\"Answer\"}},{\"name\":\"Can I visit an office in my local area?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"Yes, you can visit your nearest Admizz Education office for help, depending on your location.\",\"@type\":\"Answer\"}}]}</script>" }} />{/* SEOAI:FAQ:END */}
</main>
  );
}
