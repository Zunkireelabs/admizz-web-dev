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

    
{/* SEOAI:EXPANDEDCONTENT:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\">\n  <section class=\"gap-2.5\">\n    <h2 class=\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\">Admizz Education vs. Competitors</h2>\n    <div class=\"text-sm md:text-base mb-3 opacity-90\"><p class=\"text-sm md:text-base mb-3 opacity-90\">When comparing Admizz Education to its competitors, such as Indembkathmandu.gov.in and Merouni.com, several key differences emerge that highlight Admizz's strengths. Admizz Education offers a strong international presence with multiple offices in various countries, providing personalized support for students navigating the complexities of studying abroad. This is a contrast to some competitors, which might not have the same level of localized service or global reach. Furthermore, Admizz's focus on step-by-step guidance for students in specific regions like Birgunj and Janakpur showcases its commitment to tailored services, enhancing the overall student experience and making it the better choice for those seeking comprehensive assistance in their educational journeys.</p><div class=\"overflow-x-auto\"><table class=\"w-full border-collapse\"><thead><tr><th class=\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\">Feature</th><th class=\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\">Alternative</th><th class=\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\">This Option</th></tr></thead><tbody><tr><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">International Presence</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Limited or regional focus.</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Multiple offices worldwide</td></tr><tr><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Personalized Student Support</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Generic support without local expertise.</td><td class=\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\">Local counsellors available in various cities</td></tr></tbody></table></div></div>\n  </section>\n</div>" }} />{/* SEOAI:EXPANDEDCONTENT:END */}
</main>
  );
}
