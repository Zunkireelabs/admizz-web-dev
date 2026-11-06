// "Recognized in Nepal" showcase. Server component: plain HTML, no JS needed.
// Claims confirmed by the client. No licence or membership numbers are held, so there are
// deliberately no links or badges implying proof.

import Image from "next/image";

const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };

const ITEMS: { name: string; description: string; logo: string; logoAlt: string }[] = [
  {
    name: "MOES",
    description: "Licensed by the Ministry of Education and Sports, Nepal",
    logo: "/images/logos/recognition/moes.webp",
    logoAlt: "Government of Nepal, Ministry of Education logo",
  },
  {
    name: "TITI",
    description: "Counselors trained and certified by the Technical Instructors Training Institute",
    logo: "/images/logos/recognition/titi.webp",
    logoAlt: "TITI logo",
  },
  {
    name: "ECAN",
    description: "Member, Education Consultancy Association of Nepal",
    logo: "/images/logos/recognition/ecan.webp",
    logoAlt: "ECAN logo",
  },
];

export default function RecognizedInNepal() {
  return (
    <section aria-labelledby="recognized-in-nepal" className="-mt-10 md:-mt-14 pb-14 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border-light pt-6 md:pt-8">
          <h2
            id="recognized-in-nepal"
            className="text-xs font-bold tracking-[0.16em] uppercase text-blue-royal"
          >
            Recognized in Nepal
          </h2>

          <ol className="mt-4 md:mt-5 grid gap-5 md:grid-cols-3 md:gap-0">
            {ITEMS.map((item, i) => (
              <li
                key={item.name}
                className={`flex items-start gap-4 md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l md:border-border-light"}`}
              >
                <Image
                  src={item.logo}
                  alt={item.logoAlt}
                  width={56}
                  height={56}
                  className="h-12 w-12 md:h-14 md:w-14 shrink-0 object-contain"
                />
                <div>
                  <p className="text-xl font-semibold text-navy" style={rubikFont}>
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-dark">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
