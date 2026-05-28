"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { OfficeData } from "@/data/cities/types";

interface LocalOfficeProps {
  city: string;
  office: OfficeData;
}

export default function LocalOffice({ city, office }: LocalOfficeProps) {
  const waHref = `https://wa.me/${office.whatsapp}?text=${encodeURIComponent(
    office.whatsappMessage
  )}`;

  return (
    <section
      id="visit-office"
      className="relative py-20 tablet:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 60%, #EEF1FF 100%)",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#1E6DEB" }}>
            LOCAL GUIDANCE
          </p>
          <h2
            className="mt-3 text-navy font-bold"
            style={{
              fontFamily: "var(--font-rubik), sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
            }}
          >
            Your {city} counsellors are ready
          </h2>
          <p className="mt-4 text-[15px] text-gray-dark leading-relaxed">
            Local experts who speak your language, understand your goals, and guide you step by step — from country selection to visa approval.
          </p>
        </motion.div>

        <div className="mt-14 grid tablet:grid-cols-[1.1fr_1fr] gap-10 items-center">

          {/* ── Photo collage (unchanged) ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="group relative h-[440px] tablet:h-[520px]"
          >
            {/* Yellow accent square behind */}
            <motion.div
              aria-hidden
              variants={{
                hidden: { opacity: 0, scale: 0.9, rotate: -10 },
                show: { opacity: 1, scale: 1, rotate: -8 },
              }}
              transition={{ duration: 0.7 }}
              className="absolute top-[6%] left-[4%] w-[60%] h-[72%] rounded-[20px] z-0"
              style={{
                background: "linear-gradient(135deg, #FDED22 0%, #FCB730 100%)",
                boxShadow: "0 20px 50px rgba(252, 183, 48, 0.3)",
              }}
            />

            {/* Back photo (top right) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -30, rotate: 0 },
                show: { opacity: 1, y: 0, rotate: 6 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-0 right-0 w-[58%] h-[60%] z-10 transition-transform duration-500 group-hover:rotate-[8deg]"
              style={{
                background: "white",
                padding: "10px 10px 36px",
                boxShadow: "0 20px 40px rgba(13,18,130,0.18), 0 4px 12px rgba(0,0,0,0.08)",
                borderRadius: "6px",
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-[3px]">
                <Image
                  src={office.photos[1] ?? office.photos[0]}
                  alt={`${office.name} interior`}
                  fill
                  sizes="(max-width: 921px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 opacity-80"
                style={{
                  background: "linear-gradient(135deg, rgba(252,183,48,0.5) 0%, rgba(253,237,34,0.5) 100%)",
                  transform: "translateX(-50%) rotate(-4deg)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                }}
              />
            </motion.div>

            {/* Side photo (bottom right) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, rotate: 0 },
                show: { opacity: 1, y: 0, rotate: -8 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-0 right-[12%] w-[52%] h-[55%] z-10 transition-transform duration-500 group-hover:rotate-[-12deg]"
              style={{
                background: "white",
                padding: "10px 10px 32px",
                boxShadow: "0 18px 40px rgba(13,18,130,0.18), 0 4px 12px rgba(0,0,0,0.08)",
                borderRadius: "6px",
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-[3px]">
                <Image
                  src={office.photos[2] ?? office.photos[0]}
                  alt={`${office.name} session`}
                  fill
                  sizes="(max-width: 921px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Main photo */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -40, rotate: 0 },
                show: { opacity: 1, x: 0, rotate: -5 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute top-[8%] left-0 w-[64%] h-[80%] z-20 transition-transform duration-500 group-hover:rotate-[-2deg] group-hover:scale-[1.02]"
              style={{
                background: "white",
                padding: "12px 12px 48px",
                boxShadow: "0 28px 60px rgba(13,18,130,0.28), 0 8px 16px rgba(0,0,0,0.1)",
                borderRadius: "8px",
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-[4px]">
                <Image
                  src={office.photos[0]}
                  alt={office.name}
                  fill
                  sizes="(max-width: 921px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <p
                className="absolute bottom-3 left-0 right-0 text-center text-[11px] font-semibold text-navy/70"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                {office.name.replace("Admizz Education — ", "").replace("Admizz Education - ", "")}
              </p>
            </motion.div>

            {/* Floating "open now" pill */}
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-1 left-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold z-30"
              style={{
                background: "rgba(255,255,255,0.96)",
                boxShadow: "0 12px 28px rgba(13,18,130,0.18), 0 2px 6px rgba(0,0,0,0.06)",
                color: "#0D1282",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {office.hours.split("·")[0]?.trim() ?? "Open today"}
            </motion.div>

            {/* Floating star rating chip */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9, rotate: 0 },
                show: { opacity: 1, scale: 1, rotate: 6 },
              }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-2 left-[42%] z-30 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold"
              style={{
                background: "linear-gradient(135deg, #001353 0%, #0D1282 100%)",
                color: "white",
                boxShadow: "0 12px 28px rgba(0, 19, 83, 0.35)",
              }}
            >
              <svg className="w-3.5 h-3.5" fill="#FCB730" viewBox="0 0 24 24">
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              4.9
              <span className="text-white/60 font-medium">/ 89 reviews</span>
            </motion.div>

            {/* Free walk-in sticker */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.6, rotate: 0 },
                show: { opacity: 1, scale: 1, rotate: 12 },
              }}
              transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
              className="absolute -right-2 top-[42%] z-30 w-20 h-20 rounded-full flex flex-col items-center justify-center text-center text-white"
              style={{
                background: "linear-gradient(135deg, #FCB730 0%, #FDED22 100%)",
                boxShadow: "0 14px 30px rgba(252, 183, 48, 0.4), 0 4px 10px rgba(0,0,0,0.1)",
                border: "3px dashed rgba(0, 19, 83, 0.25)",
              }}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-[0.06em] leading-tight"
                style={{ color: "#001353", fontFamily: "var(--font-rubik), sans-serif" }}
              >
                Free<br />walk-in
              </span>
            </motion.div>
          </motion.div>

          {/* ── CTA card (replaces contact card) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-[24px] overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 8px 32px rgba(13,18,130,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <div className="h-[3px]" style={{ background: "#1E6DEB" }} />
            <div className="p-7 tablet:p-9">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] mb-5"
                style={{ background: "#EBF3FF", color: "#1E6DEB" }}
              >
                📍 {city}
              </span>

              <h3
                className="font-bold leading-snug mb-4"
                style={{
                  fontFamily: "var(--font-rubik), sans-serif",
                  fontSize: "clamp(22px, 3vw, 30px)",
                  color: "#0D1282",
                }}
              >
                Are you a student<br />from {city}?
              </h3>

              <p className="text-[14px] leading-relaxed mb-8" style={{ color: "#5C7189" }}>
                Our local counsellors are ready to guide you — from choosing the right country to getting your visa sorted, step by step.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-[14px] px-5 py-4 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "#25D366", boxShadow: "0 4px 12px rgba(37,211,102,0.25)" }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  WhatsApp Us
                </a>

                <a
                  href="#hero-form"
                  className="flex items-center justify-center gap-1.5 rounded-[14px] px-5 py-4 text-[14px] font-semibold transition-all hover:-translate-y-0.5"
                  style={{
                    background: "#EBF3FF",
                    color: "#1E6DEB",
                    border: "1px solid rgba(30,109,235,0.2)",
                  }}
                >
                  Book Free Consultation
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
