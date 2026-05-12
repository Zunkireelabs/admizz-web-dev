"use client";

const DEFAULT_ROW1 = [
  { img: "Dipesh_Kalwar_2024_UK.jpg",              name: "Dipesh Kalwar",              uni: "",                      batch: "2024", destination: "🇬🇧 UK" },
  { img: "Dipesh_Yadav_2024_UK.jpg",               name: "Dipesh Yadav",               uni: "",                      batch: "2024", destination: "🇬🇧 UK" },
  { img: "Pankaj_Kumar_Yadav_2024_UK.jpg",         name: "Pankaj Kumar Yadav",         uni: "",                      batch: "2024", destination: "🇬🇧 UK" },
  { img: "Pujeet_Patel_2024_UK.jpg",               name: "Pujeet Patel",               uni: "",                      batch: "2024", destination: "🇬🇧 UK" },
  { img: "Rakesh_Ray_2024_UK.jpg",                 name: "Rakesh Ray",                 uni: "",                      batch: "2024", destination: "🇬🇧 UK" },
  { img: "Ravi_Kumar_Yadav_2024_UK.jpg",           name: "Ravi Kumar Yadav",           uni: "",                      batch: "2024", destination: "🇬🇧 UK" },
  { img: "Rohit_Rauniyar_2024_UK.jpg",             name: "Rohit Rauniyar",             uni: "",                      batch: "2024", destination: "🇬🇧 UK" },
  { img: "Rupesh_Kumar_Singh_2024_UK.jpg",         name: "Rupesh Kumar Singh",         uni: "",                      batch: "2024", destination: "🇬🇧 UK" },
  { img: "Satyam_Jaiswal_2024_UK.jpg",             name: "Satyam Jaiswal",             uni: "",                      batch: "2024", destination: "🇬🇧 UK" },
  { img: "AadityaPrasadYadav_2025_UK.jpg",         name: "Aaditya Prasad Yadav",       uni: "",                      batch: "2025", destination: "🇬🇧 UK" },
  { img: "AnshuKumariMahato_2025_UK.jpg",          name: "Anshu Kumari Mahato",        uni: "",                      batch: "2025", destination: "🇬🇧 UK" },
  { img: "Ashish_Kumar_2025_UK.jpg",               name: "Ashish Kumar",               uni: "",                      batch: "2025", destination: "🇬🇧 UK" },
  { img: "Ashok_Upreti_2025_USA.jpg",              name: "Ashok Upreti",               uni: "",                      batch: "2025", destination: "🇺🇸 USA" },
  { img: "Bibek_Kandel_2025_UK.jpg",               name: "Bibek Kandel",               uni: "",                      batch: "2025", destination: "🇬🇧 UK" },
  { img: "Neharika-UKGurung_2025.jpg",             name: "Neharika Gurung",            uni: "",                      batch: "2025", destination: "🇬🇧 UK" },
  { img: "Niraj_Bhattarai_2025_UK.jpg",            name: "Niraj Bhattarai",            uni: "",                      batch: "2025", destination: "🇬🇧 UK" },
];

const DEFAULT_ROW2 = [
  { img: "Niranjan_Kumar_Sah_Haluwai_2025_UK.jpg", name: "Niranjan Kumar Sah",         uni: "",                      batch: "2025", destination: "🇬🇧 UK" },
  { img: "Pratik_Adhikari_2025_UK.jpg",            name: "Pratik Adhikari",            uni: "",                      batch: "2025", destination: "🇬🇧 UK" },
  { img: "Rajesh_Kumar_Sah_2025_UK.jpg",           name: "Rajesh Kumar Sah",           uni: "",                      batch: "2025", destination: "🇬🇧 UK" },
  { img: "SnehaBhandari_2025_UK.jpg",              name: "Sneha Bhandari",             uni: "",                      batch: "2025", destination: "🇬🇧 UK" },
  { img: "Aashis_Kuswar_2026_UK.jpeg",             name: "Aashis Kuswar",              uni: "York St John",          batch: "2026", destination: "🇬🇧 UK" },
  { img: "Abhishek_Kumar_Patel_2026_UK.jpeg",      name: "Abhishek Kumar Patel",       uni: "Roehampton",            batch: "2026", destination: "🇬🇧 UK" },
  { img: "Bhisan_Prasad_Sah_2026_UK.jpeg",         name: "Bhisan Prasad Sah",          uni: "BPP University",        batch: "2026", destination: "🇬🇧 UK" },
  { img: "Bikash_Sah_Teli_2026_UK.jpeg",           name: "Bikash Sah Teli",            uni: "BPP University",        batch: "2026", destination: "🇬🇧 UK" },
  { img: "Biky_Sah_Teli_2026_UK.jpeg",             name: "Biky Sah Teli",              uni: "Roehampton",            batch: "2026", destination: "🇬🇧 UK" },
  { img: "Bishnu_Sahi_2026_UK.jpeg",               name: "Bishnu Sahi",                uni: "York St John",          batch: "2026", destination: "🇬🇧 UK" },
  { img: "Gyanu_Lama_2026_UK.jpeg",                name: "Gyanu Lama",                 uni: "Univ. of East London",  batch: "2026", destination: "🇬🇧 UK" },
  { img: "Nabin_Thaguna_2026_UK.jpeg",             name: "Nabin Thaguna",              uni: "York St John",          batch: "2026", destination: "🇬🇧 UK" },
  { img: "Rajan_Sah_2026_UK.jpeg",                 name: "Rajan Sah",                  uni: "Univ. of Greenwich",    batch: "2026", destination: "🇬🇧 UK" },
  { img: "Sandeep_Thapa_Chhetri_2026_UK.jpeg",     name: "Sandeep Thapa Chhetri",      uni: "Univ. of East London",  batch: "2026", destination: "🇬🇧 UK" },
  { img: "Shiv_Raj_Patel_2026_UK.jpeg",            name: "Shiv Raj Patel",             uni: "BPP University",        batch: "2026", destination: "🇬🇧 UK" },
  { img: "Twinkle_Kumari_Gupta_2026_UK.jpeg",      name: "Twinkle Kumari Gupta",       uni: "York St John",          batch: "2026", destination: "🇬🇧 UK" },
];

export type AlumniCard = { img: string; name: string; uni: string; batch: string; destination?: string };

interface AlumniSectionProps {
  alumni?: AlumniCard[][];
  eyebrow?: string;
  title?: string;
  description?: string;
  stats?: Array<{ label: string; value: string }>;
  imagePath?: string;
}

function Card({ img, name, uni, batch, destination, imagePath = "/images/alumni/" }: AlumniCard & { imagePath?: string }) {
  return (
    <div
      data-batch={batch}
      onMouseEnter={(e) => {
        const imgEl = e.currentTarget.querySelector("img") as HTMLImageElement | null;
        if (imgEl) imgEl.style.transform = "scale(1.08)";
      }}
      onMouseLeave={(e) => {
        const imgEl = e.currentTarget.querySelector("img") as HTMLImageElement | null;
        if (imgEl) imgEl.style.transform = "scale(1)";
      }}
      style={{
        position: "relative",
        width: 158,
        height: 215,
        borderRadius: 16,
        overflow: "hidden",
        flexShrink: 0,
        cursor: "default",
        boxShadow:
          batch === "2024"
            ? "0 8px 28px rgba(0,0,0,0.45), inset 0 3px 0 0 rgba(253,237,34,0.85)"
            : batch === "2025"
            ? "0 8px 28px rgba(0,0,0,0.45), inset 0 3px 0 0 rgba(144,194,255,0.85)"
            : "0 8px 28px rgba(0,0,0,0.45), inset 0 3px 0 0 rgba(126,245,226,0.85)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${imagePath}${img}`}
        alt={name}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transition: "transform 0.35s ease" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,5,30,0.55) 58%, rgba(0,5,30,0.95) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px 10px 12px",
        }}
      >
        <div>
          <span
            style={{
              width: 20, height: 20, borderRadius: "50%",
              background: "rgba(76,175,80,0.92)", color: "#fff",
              fontSize: 10, fontWeight: 900,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
            aria-label="Verified Alumni"
          >✓</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: "#fff", lineHeight: 1.25, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>{name}</p>
          {uni && <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>{uni}</p>}
          {destination && <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#fded22", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>{destination}</p>}
        </div>
      </div>
    </div>
  );
}

export default function AlumniSection({
  alumni = [DEFAULT_ROW1, DEFAULT_ROW2],
  eyebrow = "Our Alumni",
  title = "Students Who Made It",
  description = "2,000+ students placed in top universities across the world — and counting.",
  stats = [],
  imagePath = "/images/alumni/",
}: AlumniSectionProps) {
  const [row1, row2] = alumni;

  return (
    <section style={{ padding: "72px 0 64px", background: "linear-gradient(180deg, #050d2d 0%, #0c1c50 100%)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px", textAlign: "center", marginBottom: 48, position: "relative" }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#fded22", margin: "0 0 12px" }}>
          {eyebrow}
        </p>
        <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", margin: "0 0 10px", lineHeight: 1.2 }}>
          {title}
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>
          {description}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 22 }}>
          {stats.map((stat) => (
            <span key={stat.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 18px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", letterSpacing: 0.3 }}>
              {stat.value} {stat.label}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
          <div style={{ display: "inline-block", padding: "10px 28px", borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, color: "#fdd230", background: "transparent", border: "2px solid rgba(253,200,48,0.75)", boxShadow: "0 0 18px rgba(253,200,48,0.35)", backdropFilter: "blur(8px)", transition: "all 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 32px rgba(253,200,48,0.65)"; e.currentTarget.style.transform = "translateY(-2px) scale(1.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 18px rgba(253,200,48,0.35)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; }}>
            🏆 10th Year of Excellent Service
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, color: "#2ecc71", background: "transparent", border: "2px solid rgba(46,204,113,0.75)", boxShadow: "0 0 18px rgba(46,204,113,0.3)", backdropFilter: "blur(8px)", transition: "all 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 32px rgba(46,204,113,0.55)"; e.currentTarget.style.transform = "translateY(-2px) scale(1.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 18px rgba(46,204,113,0.3)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="10" cy="10" r="10" fill="#2ecc71"/>
              <path d="M6 10.5l3 3 5-5.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Visa Granted
          </div>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div style={{ position: "relative", marginBottom: 16, overflow: "hidden" }} onMouseEnter={(e) => { const div = e.currentTarget.querySelector('div:nth-child(3)') as HTMLElement; if (div) div.style.animationPlayState = 'paused'; }} onMouseLeave={(e) => { const div = e.currentTarget.querySelector('div:nth-child(3)') as HTMLElement; if (div) div.style.animationPlayState = 'running'; }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 100, background: "linear-gradient(to right, #050d2d, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 100, background: "linear-gradient(to left, #050d2d, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ display: "flex", gap: 14, width: "max-content", padding: "10px 0", animation: "alumni-left 55s linear infinite" }}>
          {[...row1, ...row1].map((c, i) => <Card key={i} {...c} imagePath={imagePath} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div style={{ position: "relative", overflow: "hidden" }} onMouseEnter={(e) => { const div = e.currentTarget.querySelector('div:nth-child(3)') as HTMLElement; if (div) div.style.animationPlayState = 'paused'; }} onMouseLeave={(e) => { const div = e.currentTarget.querySelector('div:nth-child(3)') as HTMLElement; if (div) div.style.animationPlayState = 'running'; }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 100, background: "linear-gradient(to right, #050d2d, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 100, background: "linear-gradient(to left, #050d2d, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ display: "flex", gap: 14, width: "max-content", padding: "10px 0", animation: "alumni-right 55s linear infinite" }}>
          {[...row2, ...row2].map((c, i) => <Card key={i} {...c} imagePath={imagePath} />)}
        </div>
      </div>
    </section>
  );
}
