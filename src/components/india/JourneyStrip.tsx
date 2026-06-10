interface Stat {
  value: string;
  label: string;
}

interface City {
  name: string;
  landmark: string;
  image: string;
}

interface Props {
  stats: Stat[];
  cities?: City[];
  eyebrow?: string;
  accentColor?: string;
  accentSoftColor?: string;
  ringColor?: string;
  bgGradient?: string;
  labelColor?: string;
  subLabelColor?: string;
}

const defaultCities: City[] = [
  {
    name: "Delhi",
    landmark: "India Gate",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Mumbai",
    landmark: "Gateway of India",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Jaipur",
    landmark: "Hawa Mahal",
    image: "https://images.unsplash.com/photo-1617516202907-ff75846e6667?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Hyderabad",
    landmark: "Charminar",
    image: "https://images.unsplash.com/photo-1696941515998-d83f24967aca?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Kolkata",
    landmark: "Victoria Memorial",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=400&q=80",
  },
];

export default function JourneyStrip({
  stats,
  cities = defaultCities,
  eyebrow = "Study Across India",
  accentColor = "#FF6B1A",
  accentSoftColor = "#FFB870",
  ringColor = "#C9A961",
  bgGradient = "linear-gradient(180deg, #FFF8F1 0%, #FFFFFF 100%)",
  labelColor = "#0B3D2E",
  subLabelColor = "#5A4A3A",
}: Props) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: bgGradient,
        borderTop: `1px solid ${ringColor}44`,
        borderBottom: `1px solid ${ringColor}44`,
      }}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p
                className="text-3xl md:text-4xl font-bold"
                style={{ color: accentColor, fontFamily: "var(--font-rubik), sans-serif" }}
                data-anim="count-up"
                data-anim-value={s.value}
              >
                {s.value}
              </p>
              <div className="mx-auto mt-1 h-[2px] w-10" style={{ background: accentSoftColor }} />
              <p className="mt-2 text-[13px]" style={{ color: subLabelColor }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Eyebrow */}
        <div className="mt-10 mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-12" style={{ background: ringColor }} />
          <span
            className="text-[11px] uppercase tracking-[0.2em] font-semibold"
            style={{ color: labelColor }}
          >
            {eyebrow}
          </span>
          <span className="h-px w-12" style={{ background: ringColor }} />
        </div>

        {/* City medallions */}
        <div className="flex items-start justify-between gap-3 sm:gap-6 overflow-x-auto scrollbar-hide px-2">
          {cities.map((c) => (
            <div
              key={c.name}
              className="flex flex-col items-center gap-2 flex-shrink-0"
              style={{ minWidth: 80 }}
            >
              <div
                className="relative rounded-full overflow-hidden transition-transform hover:scale-105"
                style={{
                  width: 72,
                  height: 72,
                  border: `2px solid ${ringColor}`,
                  boxShadow: `0 4px 16px ${labelColor}30`,
                  background: "#F8EFE0",
                }}
              >
                <img
                  src={c.image}
                  alt={`${c.landmark}, ${c.name}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg, ${accentColor}0D 0%, ${labelColor}2E 100%)`,
                  }}
                />
              </div>
              <div className="text-center">
                <p
                  className="text-[12px] sm:text-[13px] font-bold leading-tight"
                  style={{ color: labelColor }}
                >
                  {c.name}
                </p>
                <p
                  className="text-[10px] sm:text-[11px] leading-tight mt-0.5"
                  style={{ color: subLabelColor }}
                >
                  {c.landmark}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
