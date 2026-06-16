export const tokens = {
  color: {
    // Energy (unchanged)
    red: "#C8102E",
    redDeep: "#A50C24",
    redGlow: "rgba(200, 16, 46, 0.4)",
    accent: "#FFCC00",
    accentDeep: "#D4A800",
    live: "#FF1744",
    canada: "#D80021",
    usa: "#0A3161",
    mexico: "#006847",
    green: "#22C55E",

    // Canvas — light editorial
    bg: "#FFFFFF",
    bgAlt: "#F8F8F8",
    surface1: "#FFFFFF",
    surface2: "#F8F8F8",
    surface3: "#F1F2F7",
    surface4: "#E7E9F1",

    // Ink — Admizz voice
    text: "#001353",
    textBody: "#292E3E",
    textSoft: "rgba(0, 19, 83, 0.72)",
    textDim: "rgba(0, 19, 83, 0.5)",
    textFaint: "rgba(0, 19, 83, 0.32)",
    textOnDark: "#FAFAFA",
    textOnDarkSoft: "rgba(250, 250, 250, 0.72)",

    // Borders — navy-tinted
    border: "rgba(0, 19, 83, 0.10)",
    borderStrong: "rgba(0, 19, 83, 0.18)",

    // Admizz signature
    admizzNavy: "#001353",
    admizzBlue: "#31429C",
    admizzYellow: "#FDED22",
    admizzYellowBright: "#FAE445",
  },
  font: {
    display: "var(--font-bebas), 'Bebas Neue', system-ui, sans-serif",
    ui: "var(--font-inter), Inter, system-ui, sans-serif",
    mono: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "24px",
    pill: "999px",
  },
  shadow: {
    card: "0 2px 8px rgba(0, 19, 83, 0.06), 0 1px 0 rgba(0, 19, 83, 0.04)",
    lift: "0 8px 24px rgba(0, 19, 83, 0.08), 0 2px 6px rgba(0, 19, 83, 0.05)",
    deep: "0 24px 60px -20px rgba(0, 19, 83, 0.20)",
    glow: "0 0 40px rgba(200, 16, 46, 0.25)",
  },
  motion: {
    smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
    snap: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

export const HOST_NATIONS = [
  { code: "CAN", name: "Canada", flag: "🇨🇦", color: tokens.color.canada },
  { code: "USA", name: "USA", flag: "🇺🇸", color: tokens.color.usa },
  { code: "MEX", name: "Mexico", flag: "🇲🇽", color: tokens.color.mexico },
];

export const TOURNAMENT = {
  startISO: "2026-06-11T20:00:00-06:00",
  endISO: "2026-07-19T17:00:00-04:00",
  totalMatches: 104,
  groups: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
  hostCities: 16,
};
