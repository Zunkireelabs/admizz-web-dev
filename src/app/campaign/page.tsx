"use client";

import { useState, type FormEvent } from "react";

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

const destinations = [
  "Australia",
  "Canada",
  "Denmark",
  "Dubai",
  "France",
  "India",
  "New Zealand",
  "South Korea",
  "UK",
  "USA",
];

const studyLevels = ["Certificate", "Diploma", "Bachelors", "Masters"];

const studyPrograms = [
  "Engineering & Technology",
  "Allied Health Sciences",
  "Humanities & Social Sciences",
  "Business & Management",
  "Law & Legal Studies",
  "Architecture & Design",
  "Applied Sciences",
  "Medical & Pharmacy",
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Brunei", "Bulgaria",
  "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Finland", "France",
  "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan",
  "Latvia", "Lebanon", "Libya", "Lithuania", "Luxembourg", "Malaysia", "Maldives",
  "Mexico", "Moldova", "Mongolia", "Morocco", "Myanmar", "Nepal", "Netherlands",
  "New Zealand", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palestine", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore",
  "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "Spain",
  "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Tunisia", "Turkey", "Turkmenistan", "UAE",
  "Uganda", "Ukraine", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

/* ------------------------------------------------------------------ */
/*  Shared CSS class strings                                           */
/* ------------------------------------------------------------------ */

const inputClass =
  "w-full h-[40px] px-3 border border-border-input rounded-[10px] text-xs font-montserrat text-black placeholder:text-[#888888] focus:outline-none focus:ring-1 focus:ring-blue-dark";

const selectClass =
  "w-full h-[40px] px-3 border border-border-input rounded-[10px] text-xs font-montserrat text-gray-medium focus:outline-none focus:ring-1 focus:ring-blue-dark";

/* ------------------------------------------------------------------ */
/*  Form data interface                                                */
/* ------------------------------------------------------------------ */

interface CampaignFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  destination: string;
  city: string;
  studyLevel: string;
  studyProgram: string;
  terms: boolean;
}

const initialFormData: CampaignFormData = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  phone: "",
  destination: "",
  city: "",
  studyLevel: "",
  studyProgram: "",
  terms: false,
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CampaignPage() {
  const [formData, setFormData] = useState<CampaignFormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof CampaignFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend / API
    setSubmitted(true);
  };

  return (
    <main>
      {/* ===== 1. HERO SECTION ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
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
      <section className="py-16 px-4 bg-off-white">
        <div className="max-w-7xl mx-auto">
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

          <p className="text-center mt-10 text-[15px] font-semibold text-golden">
            <svg
              className="inline-block w-5 h-5 mr-2 -mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            Winner will be announced every Friday
          </p>
        </div>
      </section>

      {/* ===== 3. REGISTRATION FORM ===== */}
      <section id="register" className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Register Now
          </h2>

          {submitted ? (
            <div className="bg-white border border-border-light rounded-[10px] p-10 text-center">
              <svg
                className="w-16 h-16 mx-auto text-golden mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-bold text-navy mb-2">
                Thank You for Registering!
              </h3>
              <p className="text-[15px] text-gray-dark leading-relaxed">
                Your entry has been received. Winners are announced every
                Friday. Stay tuned and good luck!
              </p>
            </div>
          ) : (
            <div className="bg-white border border-border-light rounded-[10px] p-8">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Row: First Name / Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={formData.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Last Name *"
                    required
                    value={formData.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                />

                {/* Country */}
                <select
                  value={formData.country}
                  onChange={(e) => update("country", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {/* Phone */}
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  minLength={13}
                  value={formData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClass}
                />

                {/* Preferred Study Destination */}
                <select
                  required
                  value={formData.destination}
                  onChange={(e) => update("destination", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Preferred Study Destination *</option>
                  {destinations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                {/* City */}
                <input
                  type="text"
                  placeholder="City *"
                  required
                  minLength={2}
                  value={formData.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={inputClass}
                />

                {/* Row: Level of Study / Study Program */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    required
                    value={formData.studyLevel}
                    onChange={(e) => update("studyLevel", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Level of Study *</option>
                    {studyLevels.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  <select
                    required
                    value={formData.studyProgram}
                    onChange={(e) => update("studyProgram", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Preferred Study Program *</option>
                    {studyPrograms.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Terms & Conditions */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.terms}
                    onChange={(e) => update("terms", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border-input text-blue-dark focus:ring-blue-dark"
                  />
                  <span className="text-xs text-gray-dark leading-relaxed">
                    I agree to the{" "}
                    <span className="text-blue-dark font-medium underline">
                      Terms &amp; Conditions
                    </span>{" "}
                    and consent to Admizz Education contacting me regarding study
                    abroad opportunities and campaign updates.
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-yellow text-black font-semibold text-[15px] py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
                >
                  Register
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
