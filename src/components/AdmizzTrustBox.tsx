import Link from "next/link";

// Short "about the publisher" box shown under agent-authored and moved posts.
// Facts are the ones the site already states on /about and in the footer
// (helping students since 2015, ICEF-accredited agency, 2,000+ students
// enrolled, 100+ partner institutions across 12+ countries). It names the
// team, never individual counselors.
export default function AdmizzTrustBox() {
  const facts = [
    { value: "Since 2015", label: "helping students apply abroad" },
    { value: "ICEF", label: "accredited agency" },
    { value: "2,000+", label: "students enrolled worldwide" },
    { value: "100+", label: "partner institutions, 12+ countries" },
  ];
  return (
    <aside
      aria-label="About Admizz Education"
      className="mt-10 rounded-xl border border-[#e3e8f4] bg-[#F8F9FF] px-5 py-5"
    >
      <p className="text-[13px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
        About this guide
      </p>
      <p className="text-[15px] leading-relaxed text-[#001353] mb-4">
        Written and reviewed by the Admizz Education counseling team in Nepal. Rules and figures are checked
        against official government sources and dated, and we update posts when rules change.{" "}
        <Link href="/about" className="text-blue-royal underline hover:text-blue-dark">
          About Admizz Education
        </Link>
      </p>
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {facts.map((f) => (
          <div key={f.label} className="rounded-lg bg-white px-3 py-3 border border-[#eef1f6]">
            <dt className="text-[18px] font-bold text-[#0D1282] leading-tight">{f.value}</dt>
            <dd className="text-[12.5px] text-gray-600 mt-0.5 leading-snug">{f.label}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[13.5px] text-gray-600">
        Learn more:{" "}
        <Link href="/top-education-consultancy-in-nepal" className="text-blue-royal underline hover:text-blue-dark">
          Top education consultancy in Nepal
        </Link>
        {" · "}
        <Link href="/education-consultancy-in-kathmandu" className="text-blue-royal underline hover:text-blue-dark">
          Education consultancy in Kathmandu
        </Link>
        {" · "}
        <Link href="/accreditation-and-results" className="text-blue-royal underline hover:text-blue-dark">
          Accreditation and results
        </Link>
      </p>
    </aside>
  );
}
