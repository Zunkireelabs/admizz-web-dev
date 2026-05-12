import SpinWheel from "@/components/ui/SpinWheel";
import TrustedPartners from "@/components/ui/TrustedPartners";
import WhyChooseAdmizz from "@/components/ui/WhyChooseAdmizz";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const prizes = [
  {
    name: "Free Test Prep",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <rect x="6" y="8" width="36" height="28" rx="3" />
        <path d="M6 16h36" />
        <path d="M18 28l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Internet Recharge",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="24" cy="24" r="18" />
        <ellipse cx="24" cy="24" rx="9" ry="18" />
        <path d="M6 24h36" />
        <path d="M8 14h32" />
        <path d="M8 34h32" />
      </svg>
    ),
  },
  {
    name: "Laptop",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <rect x="8" y="8" width="32" height="22" rx="2" />
        <path d="M4 34h40" strokeLinecap="round" />
        <path d="M18 34l-2 4h16l-2-4" />
      </svg>
    ),
  },
  {
    name: "Free Flight Ticket",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 28l8-4 6 4 14-10 8 2-4 8-14 4-6-2-8 4z" strokeLinejoin="round" />
        <path d="M20 18l4-10 4 2-2 10" strokeLinejoin="round" />
        <path d="M8 38h32" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Movie Ticket",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <rect x="6" y="10" width="36" height="28" rx="3" />
        <path d="M6 18a4 4 0 010-8" />
        <path d="M6 38a4 4 0 000-8" />
        <path d="M42 18a4 4 0 000-8" />
        <path d="M42 38a4 4 0 010-8" />
        <circle cx="24" cy="24" r="6" />
        <path d="M22 22l5 2-5 2z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Tablet",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <rect x="10" y="4" width="28" height="40" rx="3" />
        <path d="M10 36h28" />
        <circle cx="24" cy="40" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Smart Phone",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <rect x="12" y="4" width="24" height="40" rx="3" />
        <path d="M12 36h24" />
        <path d="M12 10h24" />
        <circle cx="24" cy="40" r="1.5" fill="currentColor" />
        <path d="M20 7h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Ear Buds",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="16" cy="30" r="6" />
        <circle cx="32" cy="30" r="6" />
        <path d="M16 24V14a8 8 0 018-8v0a8 8 0 018 8v10" />
        <circle cx="16" cy="30" r="2" fill="currentColor" />
        <circle cx="32" cy="30" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Smart Watch",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <rect x="14" y="12" width="20" height="24" rx="6" />
        <path d="M18 12V6h12v6" />
        <path d="M18 36v6h12v-6" />
        <circle cx="24" cy="24" r="6" />
        <path d="M24 20v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CampaignPage() {
  return (
    <main>
      {/* ===== 1. HERO SECTION ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
            Planning to Study Abroad This Year?
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-semibold text-yellow">
            Register Now and Win Big!
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed opacity-90">
            Dreaming of studying abroad? Register now &amp; win amazing weekly
            gifts &mdash; only with Admizz Education! Expert guidance, exciting
            prizes, and your future starts here. Hurry, time is ticking!
          </p>
          <a
            href="#register"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Register Now
          </a>
        </div>
      </section>

      {/* ===== 2. PRIZE SECTION ===== */}
      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Win Big with Admizz Education!
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12 leading-relaxed">
            Admizz Education is a trusted global platform for college
            admissions, helping students secure seats at top colleges and
            universities for abroad studies.
          </p>

          {/* Prize Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {prizes.map((prize) => (
              <div
                key={prize.name}
                className="bg-white border border-border-light rounded-[10px] p-6 text-center flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
              >
                <div className="text-blue-dark">{prize.icon}</div>
                <p className="text-sm font-semibold text-navy">{prize.name}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== 3. WHY CHOOSE ADMIZZ ===== */}
      <WhyChooseAdmizz />

      {/* ===== 4. TRUSTED PARTNERS ===== */}
      <TrustedPartners />

      {/* ===== 4. SPIN & WIN ===== */}
      <SpinWheel />
    </main>
  );
}
