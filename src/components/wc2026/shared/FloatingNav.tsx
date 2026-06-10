const LINKS = [
  { href: "#match", label: "Match" },
  { href: "#schedule", label: "Schedule" },
  { href: "#bracket", label: "Bracket" },
  { href: "#standings", label: "Standings" },
  { href: "#scorers", label: "Scorers" },
];

export default function FloatingNav() {
  return (
    <div className="wc-nav">
      <div className="wc-nav-inner">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="wc-nav-link">
            {l.label}
          </a>
        ))}
        <a href="#match" className="wc-nav-link wc-nav-link--predict">
          Predict
        </a>
      </div>
    </div>
  );
}
