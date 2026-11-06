// "Recognized in Nepal" showcase. Server component: plain HTML, no JS needed.
// Claims were supplied by the client by chat and are NOT independently verified yet,
// so the footnote stays and there are deliberately no links or badges implying proof.

const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };

const ITEMS: { name: string; description: string }[] = [
  { name: "MOES", description: "Licensed by the Ministry of Education and Sports, Nepal" },
  {
    name: "TITI",
    description: "Counselors trained and certified by the Technical Instructors Training Institute",
  },
  { name: "ECAN", description: "Member, Education Consultancy Association of Nepal" },
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
                className={`md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l md:border-border-light"}`}
              >
                <p className="flex items-baseline gap-2.5">
                  <span className="text-xs tabular-nums text-gray-dark">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xl font-semibold text-navy" style={rubikFont}>
                    {item.name}
                  </span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-dark">{item.description}</p>
              </li>
            ))}
          </ol>

          <p className="mt-5 text-xs text-gray-dark">As stated by Admizz Education · unverified</p>
        </div>
      </div>
    </section>
  );
}
