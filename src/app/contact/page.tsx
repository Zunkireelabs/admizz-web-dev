import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Admizz Education",
  description:
    "Connect with top overseas education consultants. Get expert guidance on study abroad options, admissions, and visa support.",
  alternates: {
    canonical: "https://admizzeducation.com/contact/",
  },
  openGraph: {
    title: "Contact Us | Admizz Education",
    description:
      "Connect with top overseas education consultants. Get expert guidance on study abroad options, admissions, and visa support.",
    url: "https://admizzeducation.com/contact/",
    siteName: "Admizz Education",
    images: ["/images/og/contact-us.png"],
    type: "website",
  },
};

const offices = [
  {
    city: "Denver, Colorado",
    country: "USA",
    address: "",
    phone: "+1 720-505-3611",
    email: "info@admizz.com",
  },
  {
    city: "Kathmandu",
    country: "Nepal",
    address: "4th Floor, Sita Ram Square, Putalisadak, Kathmandu",
    phone: "+977-01-5328444 | +977-9802728444",
    email: "support@admizz.com",
  },
  {
    city: "Birgunj",
    country: "Nepal",
    address: "3rd Floor, Link Road, Birgunj, Parsa, Nepal",
    phone: "+977-051-592226",
    email: "support@admizz.com",
  },
  {
    city: "Bengaluru",
    country: "India",
    address:
      "2nd Floor, Jayaram Building, Kanakapura Main Rd, Gubbalala, Bengaluru, Karnataka 560062",
    phone: "+91-8050259693",
    email: "support@admizz.com",
  },
  {
    city: "Bogra",
    country: "Bangladesh",
    address: "Rajagalli, Bogra, Bangladesh",
    phone: "+91-7411231329",
    email: "support@admizz.com",
  },
  {
    city: "Lusaka",
    country: "Zambia",
    address: "Plot number 12A, Lusaka, Zambia",
    phone: "+26096517909",
    email: "support@admizz.com",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-[42px] font-bold">Contact Us</h1>
          <p className="mt-3 text-lg">
            Start your journey with a helping hand from Admizz Education!
          </p>
        </div>
      </section>

      {/* ===== WRITE TO US ===== */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                Write to us
              </h2>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full h-[40px] px-4 bg-white border border-border-input rounded-[10px] text-xs font-montserrat text-black placeholder:text-gray-medium"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-[40px] px-4 bg-white border border-border-input rounded-[10px] text-xs font-montserrat text-black placeholder:text-gray-medium"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-border-input rounded-[10px] text-xs font-montserrat text-black placeholder:text-gray-medium resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-dark text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-royal transition-colors"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-dark mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-dark">
                      <strong>Support:</strong> support@admizz.com
                    </p>
                    <p className="text-sm text-gray-dark">
                      <strong>Administration:</strong> admin@admizz.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-dark mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <p className="text-sm text-gray-dark">
                    <strong>Phone:</strong> +977-01-5328444
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GLOBAL PRESENCE ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Our Global Presence
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div
                key={office.city}
                className="bg-white border border-border-light rounded-[10px] p-6"
              >
                <h3 className="text-lg font-bold text-navy">
                  {office.city}, {office.country}
                </h3>
                {office.address && (
                  <p className="mt-2 text-sm text-gray-dark">
                    {office.address}
                  </p>
                )}
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-dark">
                    <span className="font-medium text-navy">Phone:</span>{" "}
                    {office.phone}
                  </p>
                  <p className="text-sm text-gray-dark">
                    <span className="font-medium text-navy">Email:</span>{" "}
                    {office.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW CAN WE HELP ===== */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-6">
            How Can We Help?
          </h2>
          <form className="space-y-4 text-left">
            <input
              type="text"
              placeholder="Name"
              className="w-full h-[40px] px-4 bg-white border border-border-input rounded-[10px] text-xs font-montserrat text-black placeholder:text-gray-medium"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[40px] px-4 bg-white border border-border-input rounded-[10px] text-xs font-montserrat text-black placeholder:text-gray-medium"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 bg-white border border-border-input rounded-[10px] text-xs font-montserrat text-black placeholder:text-gray-medium resize-none"
            />
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-dark text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-royal transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
