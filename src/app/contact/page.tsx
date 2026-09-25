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

{/* SEOAI:EXPANDEDCONTENT:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<!-- SEOAI:FOCUS:author-byline --><div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0 seoai-content-section--compact\">\n  <section class=\"gap-2.5\">\n    <h2 class=\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\">About the Author</h2>\n    <div class=\"text-sm md:text-base mb-3 opacity-90\"><p class=\"text-sm md:text-base mb-3 opacity-90\">By the Admizz Education Team</p></div>\n  </section>\n</div>" }} />{/* SEOAI:EXPANDEDCONTENT:END */}
</main>
  );
}
