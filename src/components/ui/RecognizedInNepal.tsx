// "Recognized in Nepal" showcase. Server component: plain HTML, no JS needed.
// Claims confirmed by the client. No licence or membership numbers are held, so there are
// deliberately no links or badges implying proof.

import Image from "next/image";

const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };

const ITEMS: { name: string; description: string; logo?: string; logoAlt?: string }[] = [
  {
    name: "MOES",
    description: "Licensed by the Ministry of Education and Sports, Government of Nepal",
    logo: "/images/logos/recognition/moes.webp",
    logoAlt: "Government of Nepal, Ministry of Education logo",
  },
  {
    name: "TITI",
    description: "Counselors trained and certified by the Training Institute for Technical Instruction (TITI)",
    logo: "/images/logos/recognition/titi.webp",
    logoAlt: "TITI logo",
  },
  // Text only: the British Council restricts use of its logo, so this uses a neutral check icon.
  {
    name: "British Council",
    description: "Our counselors are British Council certified",
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
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.logoAlt ?? ""}
                    width={56}
                    height={56}
                    className="h-12 w-12 md:h-14 md:w-14 shrink-0 object-contain"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full bg-[#F4F6FF] text-blue-royal"
                  >
                    <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                  </span>
                )}
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
