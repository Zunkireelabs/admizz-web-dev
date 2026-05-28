import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Destinations - Admizz Education",
  description:
    "Explore top study abroad destinations with expert guidance on universities, courses, visas, costs, and student life to help you choose the right country.",
  alternates: {
    canonical: "https://admizzeducation.com/study-destinations",
  },
  openGraph: {
    title: "Study Destinations - Admizz Education",
    description:
      "Explore top study abroad destinations with expert guidance on universities, courses, visas, costs, and student life to help you choose the right country.",
    url: "https://admizzeducation.com/study-destinations",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

const stats = [
  { value: "1500+", label: "Students" },
  { value: "95%", label: "Visa Approval Rate" },
  { value: "$2M+", label: "Scholarships" },
];

const destinations = [
  {
    name: "Study in Australia",
    description:
      "Globally ranked universities, excellent research facilities, and post-study work opportunities.",
    href: "/study-in-australia/",
  },
  {
    name: "Study in Canada",
    description:
      "Affordable education, multicultural communities, and permanent residency pathways.",
    href: "/study-in-canada/",
  },
  {
    name: "Study in Finland",
    description:
      "Top-ranked education, affordable tuition, and strong post-study work opportunities in the happiest country.",
    href: "/study-in-finland/",
  },
  {
    name: "Study in France",
    description:
      "Famous for arts, fashion, business, and technology programs.",
    href: "/study-in-france/",
  },
  {
    name: "Study in India",
    description:
      "Affordable education options in a culturally diverse environment for international students.",
    href: "/study-in-india/",
  },
  {
    name: "Study in Nepal",
    description:
      "Affordable, English-medium programs at recognised universities — with the Himalayas as your campus backdrop.",
    href: "/study-in-nepal/",
  },
  {
    name: "Study in New Zealand",
    description:
      "Safe, welcoming, and focused on hands-on, career-oriented education.",
    href: "/study-in-newzealand/",
  },
  {
    name: "Study in South Korea",
    description:
      "Advanced technology-driven education paired with cultural richness.",
    href: "/study-in-south-korea/",
  },
  {
    name: "Study in the UK",
    description:
      "Home to prestigious, centuries-old institutions and globally recognized degrees.",
    href: "/study-in-the-uk/",
  },
  {
    name: "Study in the USA",
    description:
      "The top destination for research, innovation, and global careers.",
    href: "/study-in-the-usa/",
  },
];

export default function StudyDestinationsPage() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
            Study Destinations
          </h1>
          <p className="mt-3 text-lg md:text-xl font-medium">
            Choose the Right Country. Build a Global Career.
          </p>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-6">
            Your Global Education Journey Starts Here
          </h2>
          <p className="text-[15px] text-gray-dark leading-relaxed">
            Admizz Education helps you discover the best study abroad
            destinations aligned with your academic goals and budget. Get
            personalised counselling, university admissions support, and
            complete visa assistance&mdash;all under one roof.
          </p>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-off-white rounded-[10px] p-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <p className="text-2xl md:text-3xl font-bold text-navy">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-dark">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESTINATION CARDS ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Study Abroad Destinations with Admizz Education
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-3xl mx-auto mb-12">
            Choosing the right study abroad destination is one of the most
            important decisions in a student&rsquo;s academic journey. Each
            country offers unique advantages in terms of education quality,
            career opportunities, lifestyle, and long-term prospects. At Admizz
            Education, we help students explore and select the best study abroad
            destinations based on their academic goals, budget, and future
            aspirations. With expert counselling and end-to-end support, we make
            your international education journey simple, transparent, and
            successful.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="bg-white border border-border-light rounded-[10px] p-6 flex flex-col"
              >
                <h3 className="text-lg font-bold text-navy">{dest.name}</h3>
                <p className="mt-3 text-[15px] text-gray-dark leading-relaxed flex-1">
                  {dest.description}
                </p>
                <Link
                  href={dest.href}
                  className="mt-4 inline-flex items-center text-blue-royal font-semibold text-[15px] hover:underline"
                >
                  Read More
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-6">
            Still deciding? Talk to Our Study Abroad Experts
          </h2>
          <p className="text-[15px] text-gray-dark mb-8">
            Choose your ideal destination with personalised guidance from our
            experienced counsellors.
          </p>
          <Link
            href="/register"
            className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Talk to Our Study Abroad Experts
          </Link>
        </div>
      </section>
    </main>
  );
}
