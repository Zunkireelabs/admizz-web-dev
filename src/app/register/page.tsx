import CRMFormEmbed from "@/components/ui/CRMFormEmbed";
import UniversityPartners from "@/app/UniversityPartners";
import { allUniversities } from "@/lib/universities";
import GlobalPresence from "@/components/ui/GlobalPresence";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const offices = [
  {
    country: "USA",
    flag: "us",
    bg: "#EEF6FF",
    city: "Denver, Colorado, USA",
    address: "",
    phone: "",
    email: "info@admizz.com",
  },
  {
    country: "India",
    flag: "in",
    bg: "#F5F2FF",
    city: "",
    address: "2nd Floor, Jayaram Building, Kanakapura Main Road, Bengaluru, Karnataka 560062, India",
    phone: "",
    email: "support@admizz.com",
  },
  {
    country: "Zambia",
    flag: "zm",
    bg: "#FFFBEA",
    city: "",
    address: "Plot number 12A, Lusaka, Zambia",
    phone: "",
    email: "support@admizz.com",
  },
  {
    country: "Nepal",
    flag: "np",
    bg: "#FFFBEA",
    cities: [
      {
        name: "Kathmandu",
        address: "4th Floor, Sita Ram Square, Putalisadak, Kathmandu",
        phone: "+977-01-5328444, +977-9856100444",
      },
      {
        name: "Birgunj",
        address: "4th Floor, Link Road, Birgunj, Parsa, Nepal",
        phone: "+977-051-592226",
      },
    ],
    email: "support@admizz.com",
  },
  {
    country: "Bangladesh",
    flag: "bd",
    bg: "#EEF6FF",
    city: "",
    address: "Rajagalli, Bogra, Bangladesh",
    phone: "",
    email: "support@admizz.com",
  },
];

const services = [
  {
    title: "Test Preparation",
    description:
      "Ace your IELTS, TOEFL, GRE, PTE, SAT and other exams with expert-led coaching, practice tests, and personalized study plans designed to maximize your score.",
    accent: "#1E6DEB",
    bg: "#EBF3FF",
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6m3-3v6",
  },
  {
    title: "Career Counseling",
    description:
      "Get personalized guidance from experienced counselors who understand global education opportunities and can help align your academic path with your career goals.",
    accent: "#3FB5A0",
    bg: "#EDFAF7",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
  {
    title: "Scholarships Support",
    description:
      "Unlock financial aid opportunities with expert support in identifying and applying for scholarships, grants, and fee waivers tailored to your profile.",
    accent: "#E86F3C",
    bg: "#FFF4EE",
    icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
  },
  {
    title: "Visa Assistance",
    description:
      "Navigate the student visa application process with confidence through step-by-step guidance, documentation support, and interview preparation.",
    accent: "#BB5FEC",
    bg: "#F8F0FF",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
];

const stats = [
  { value: "2,000+", label: "Students Successfully Enrolled", icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5", accent: "#1E6DEB" },
  { value: "100+", label: "Partner Universities & Colleges", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z", accent: "#3FB5A0" },
  { value: "95%", label: "Visa Approval Rate", icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", accent: "#E86F3C" },
  { value: "$2M+", label: "Scholarships Awarded", icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", accent: "#BB5FEC" },
];

const testimonials = [
  {
    name: "Niraj Bhattarai",
    university: "University of West of Scotland",
    originFlag: "np",
    destFlag: "gb",
    route: "Nepal -> UK",
    text: "From university selection to visa approval, Admizz Education provided exceptional support and made my journey to the UK effortless. I highly recommend them to anyone looking for a trustworthy study abroad partner.",
    rating: 5,
  },
  {
    name: "Yousuf Abdirahman Mohamed",
    university: "Kalinga Institute of Industrial Technology",
    originFlag: "so",
    destFlag: "in",
    route: "Somalia -> India",
    text: "I appreciated your unlimited help for my MBA career. It was very tough but I gained a very solid educational background. Thanks Admizz!",
    rating: 5,
  },
  {
    name: "Basant Khadka",
    university: "Weber State University",
    originFlag: "np",
    destFlag: "us",
    route: "Nepal -> USA",
    text: "The journey to college can be overwhelming, but Admizz Education made applying to Weber State University effortless. Thanks to their guidance.",
    rating: 5,
  },
  {
    name: "Satyam Jaiswal",
    university: "University of Greenwich",
    originFlag: "np",
    destFlag: "gb",
    route: "Nepal -> UK",
    text: "Admizz Education made my dream of studying in the UK a reality with their expert guidance and seamless support. Their team ensured every step of my application visa process was smooth and stress-free.",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toEmoji(code: string) {
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397)).join("");
}

/* ------------------------------------------------------------------ */
/*  Stars component                                                    */
/* ------------------------------------------------------------------ */

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function RegisterPage() {
  return (
    <main>
      {/* ===== FORM + GLOBAL PRESENCE (side by side) ===== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* --- LEFT: Enquiry Form (iframe) --- */}
          <div>
            <h2
              className="text-xl md:text-[26px] font-semibold text-[#0D1282] mb-2"
              style={{ fontFamily: 'var(--font-rubik), sans-serif' }}
            >
              Enquiry Form
            </h2>
            <p className="text-sm text-gray-dark mb-6 leading-relaxed">
              Share your details and our expert team will guide you step-by-step
              toward your dream university abroad.
            </p>

            <div
              className="p-3 sm:p-5"
              style={{
                border: "1px solid #D4955A",
                borderRadius: 24,
                background: "linear-gradient(to bottom, #F0ECF9, #FFFFFF)",
                maxWidth: 600,
              }}
            >
              <CRMFormEmbed />
            </div>
          </div>

          {/* --- RIGHT: Our Services --- */}
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#1E6DEB] mb-2">
              Our Services
            </p>
            <h2
              className="text-xl md:text-[26px] font-semibold text-[#0D1282] mb-2"
              style={{ fontFamily: 'var(--font-rubik), sans-serif' }}
            >
              Plan Your Study Abroad Journey
            </h2>
            <p className="text-sm text-gray-dark mb-6 leading-relaxed">
              End-to-end support from career counselling to post-arrival — we
              guide you through every step.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{ border: "1px solid #F0F0F0" }}
                >
                  <div className="h-[3px]" style={{ backgroundColor: service.accent }} />
                  <div className="p-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: service.bg }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke={service.accent}
                        strokeWidth={1.8}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                      </svg>
                    </div>
                    <h3
                      className="text-[15px] font-bold mb-2"
                      style={{ color: service.accent }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-[13px] text-gray-dark leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. STATS — Trust banner ===== */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0f5c 0%, #0D1282 40%, #1a3aad 100%)" }}>
        <div className="hidden sm:block absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #1E6DEB, transparent 70%)" }} />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #3FB5A0, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-center mb-3" style={{ color: "#FCB730" }}>Why Choose Us</p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-center text-white mb-4">Trusted by Students Worldwide</h2>
          <p className="text-center text-[15px] text-white/50 max-w-xl mx-auto mb-12">Our numbers speak for themselves — proven results that families and students trust.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center rounded-2xl px-3 py-6 md:px-4 md:py-10 transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center" style={{ background: `${stat.accent}20` }}>
                  <svg className="w-5 h-5" fill="none" stroke={stat.accent} strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} /></svg>
                </div>
                <p className="text-[26px] sm:text-[34px] md:text-[42px] font-bold text-white mb-2 leading-none">{stat.value}</p>
                <p className="text-[13px] font-medium text-white/50 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUSTED PARTNERS ===== */}
      <UniversityPartners universities={allUniversities} />

      {/* ===== 4. TESTIMONIALS (grid layout) ===== */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[30px] font-bold text-[#0D1282] mb-3"
            style={{ fontFamily: 'var(--font-rubik), sans-serif' }}
          >
            Our Success Stories &amp; Testimonials
          </h2>
          <p className="text-sm md:text-base text-gray-dark mb-10 leading-relaxed">
            Hear from our satisfied students and partners who have achieved great
            success through our expert guidance, personalized support, and
            comprehensive services in navigating their academic and career goals.
          </p>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Left column — 2 cards stacked */}
            <div className="flex flex-col gap-6">
              {testimonials.slice(0, 2).map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </div>

            {/* Center — YouTube video + quote */}
            <div className="flex flex-col items-center gap-5">
              <span className="inline-flex items-center gap-2 border border-[#949494] rounded-full py-3 px-7 text-base font-medium text-black">
                <span className="w-2 h-2 rounded-full bg-black" />
                Student
              </span>
              <div className="bg-white rounded-[30px] p-2 w-full">
                <div className="bg-[#F8F8F8] rounded-[30px] overflow-hidden">
                  <div className="relative w-full" style={{ paddingBottom: '130%' }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/AW3Zmubc-tU"
                      title="Ashok Upreti - Student Testimonial"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
              <div className="text-center px-2">
                <p className="text-base font-bold text-[#0D1282]">Ashok Upreti</p>
                <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                  &ldquo;Admizz Education&apos;s dedicated team guided me through
                  every challenge, ensuring I secured admission to my dream
                  university. Their professional and personalized approach made the
                  entire process smooth and hassle-free.&rdquo;
                </p>
              </div>
            </div>

            {/* Right column — 2 cards stacked */}
            <div className="flex flex-col gap-6">
              {testimonials.slice(2, 4).map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. GLOBAL PRESENCE (Tab-based) ===== */}
      <GlobalPresence />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonial Card                                                   */
/* ------------------------------------------------------------------ */

function TestimonialCard({
  name,
  text,
  rating,
  university,
  originFlag,
  destFlag,
  route,
}: {
  name: string;
  text: string;
  rating: number;
  university?: string;
  originFlag?: string;
  destFlag?: string;
  route?: string;
}) {
  return (
    <div className="bg-white rounded-[30px] p-2 shadow-sm">
      <div className="bg-[#F8F8F8] rounded-[30px] p-6">
        <Stars count={rating} />
        <p className="mt-3 text-sm text-gray-dark leading-relaxed">
          &ldquo;{text}&rdquo;
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-royal/10 flex items-center justify-center text-sm font-bold text-blue-royal shrink-0">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-[15px] font-bold text-[#0D1282]">{name}</p>
            {university && (
              <p className="text-[13px] text-gray-dark leading-snug">{university}</p>
            )}
            {route && (
              <div className="flex items-center gap-1.5 mt-0.5">
                {originFlag && (
                  <span className="text-sm leading-none">{toEmoji(originFlag)}</span>
                )}
                <span className="text-[13px] text-gray-dark">{route}</span>
                {destFlag && (
                  <span className="text-sm leading-none">{toEmoji(destFlag)}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
