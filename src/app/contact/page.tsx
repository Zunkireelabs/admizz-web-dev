import Image from "next/image";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";
import type { Metadata } from "next";
import GlobalPresence from "@/components/ui/GlobalPresence";
import FAQ from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "Contact Admizz Education | Free Study Abroad Counseling",
  description:
    "Have questions about studying abroad? Talk to Admizz Education's expert counselors for free guidance on admissions, scholarships, and visas.",
  alternates: {
    canonical: "https://admizzeducation.com/contact",
  },
  openGraph: {
    title: "Contact Admizz Education | Free Study Abroad Counseling",
    description:
      "Have questions about studying abroad? Talk to Admizz Education's expert counselors for free guidance on admissions, scholarships, and visas.",
    url: "https://admizzeducation.com/contact",
    siteName: "Admizz Education",
    images: ["/images/contact/contact-us.webp"],
    type: "website",
  },
};


const contactFaqs = [
  {
    question: "How can I contact Admizz Education?",
    answer:
      "Fill in the contact form on this page, email hello@admizz.com, or visit an office. Admizz has offices in Kathmandu (Putalisadak) and Birgunj, plus partner offices in India, Bangladesh, the US and Zambia.",
  },
  {
    question: "Is counseling at Admizz Education free?",
    answer:
      "Yes. Counseling is free for students. Admizz earns from its university partners, not from students, so there are no fees or deposits to start a conversation about your study abroad plans.",
  },
  {
    question: "Can I visit an Admizz office instead of calling?",
    answer:
      "Yes. You can walk into the Kathmandu (Putalisadak) or Birgunj office during business hours without an appointment, and a counselor will go through your options with you.",
  },
  {
    question: "Which countries can Admizz help me study in?",
    answer:
      "Admizz Education supports students applying to more than 12 countries, including the UK, the US, Australia, Canada, New Zealand, South Korea, Germany, France, Finland, Denmark, Dubai and India.",
  },
];

export default function ContactPage() {
  return (
    <main style={{ fontFamily: "'Montserrat', var(--font-montserrat), sans-serif" }}>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://admizzeducation.com/" },
          { name: "Contact Us", url: "https://admizzeducation.com/contact" },
        ]}
      />
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

      <FAQ items={contactFaqs} />
    </main>
  );
}
