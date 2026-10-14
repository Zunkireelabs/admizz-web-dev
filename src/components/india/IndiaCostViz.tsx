interface ScholarshipRow {
  name: string;
  provider?: string;
  details: string;
}

interface CostVizProps {
  scholarshipsTitle?: string;
  scholarshipsIntro?: string;
  scholarships?: ScholarshipRow[];
}

/**
 * Costs and scholarships block. Tuition comparison figures were removed
 * because they could not be checked against an official source. Only
 * facts published by the Embassy of India, Kathmandu appear here.
 */
export default function IndiaCostViz({ scholarshipsTitle, scholarshipsIntro, scholarships }: CostVizProps) {
  return (
    <section
      id="cost"
      className="py-20 scroll-mt-32 relative overflow-hidden"
      style={{ background: "#FFF8F1" }}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-8" style={{ background: "#C9A961" }} />
          <span
            className="text-[11px] uppercase tracking-[0.28em] font-semibold"
            style={{ color: "#0B3D2E" }}
          >
            Costs &amp; Fees
          </span>
        </div>

        <h2
          className="text-3xl md:text-5xl font-bold leading-tight mb-3"
          style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#0B3D2E" }}
        >
          What it costs to apply.
        </h2>
        <p className="text-[15px] md:text-base text-gray-700 mb-8 max-w-2xl leading-relaxed">
          Tuition differs by institution and course, so check the fee page of the college you are applying to.
          These are the fees the Embassy of India in Kathmandu publishes for its schemes.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "COMPEX application fee", value: "NPR 400", note: "Deposited at Nepal SBI Bank, 2026 notification" },
            { label: "Law Scholarship Scheme", value: "Up to NPR 6.4 lakh a year", note: "Reimbursement of tuition, admission and hostel fees" },
            { label: "Self-Financing Scheme (MBBS, BDS, BE/B.Tech, B.Arch, B.Pharmacy)", value: "No financial aid", note: "Seats are self-financed; the Embassy gives no scholarship" },
          ].map((f) => (
            <div
              key={f.label}
              className="bg-white rounded-xl p-5 border"
              style={{ borderColor: "rgba(201,169,97,0.4)", boxShadow: "0 2px 14px rgba(11,61,46,0.04)" }}
            >
              <p className="text-[12px] uppercase tracking-wider text-gray-500 mb-1">{f.label}</p>
              <p className="text-xl font-bold" style={{ color: "#1C5D3F" }}>{f.value}</p>
              <p className="text-[13px] text-gray-700 mt-1">{f.note}</p>
            </div>
          ))}
        </div>

        {/* Scholarships block */}
        {scholarships && scholarships.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8" style={{ background: "#C9A961" }} />
              <span
                className="text-[11px] uppercase tracking-[0.28em] font-semibold"
                style={{ color: "#0B3D2E" }}
              >
                Scholarships
              </span>
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#0B3D2E" }}
            >
              {scholarshipsTitle || "Scholarships Available to Nepali Students"}
            </h3>
            {scholarshipsIntro && (
              <p className="text-[15px] text-gray-700 mb-6 max-w-2xl">{scholarshipsIntro}</p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {scholarships.map((s) => (
                <div
                  key={s.name}
                  className="bg-white rounded-xl p-5 border"
                  style={{ borderColor: "rgba(201,169,97,0.4)", boxShadow: "0 2px 14px rgba(11,61,46,0.04)" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,107,26,0.12)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6B1A" aria-hidden="true">
                        <path d="M12 2 L14 9 L21 10 L15.5 14.5 L17 21 L12 17.5 L7 21 L8.5 14.5 L3 10 L10 9 Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[15px] mb-1" style={{ color: "#0B3D2E" }}>
                        {s.name}
                      </h4>
                      <p className="text-[13px] text-gray-700 leading-relaxed">{s.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
