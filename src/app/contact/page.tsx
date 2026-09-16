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

    
{/* SEOAI:INTERNALLINKS:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<ul class=\"px-4 sm:px-6 lg:px-8 space-y-0\">\n  <li class=\"gap-2.5\"><a href=\"https://admizzeducation.com/study-in-nepal\" class=\"flex-shrink-0\">students from Nepal</a></li>\n</ul>" }} />{/* SEOAI:INTERNALLINKS:END */}
</main>
  );
}
