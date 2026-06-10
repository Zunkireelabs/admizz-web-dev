export const tokens = {
  color: {
    red: "#C8102E",
    redDeep: "#A50C24",
    redGlow: "rgba(200, 16, 46, 0.4)",
    bg: "#0A0A0A",
    surface1: "#111111",
    surface2: "#181818",
    surface3: "#202020",
    surface4: "#2A2A2A",
    text: "#FAFAFA",
    textSoft: "rgba(250, 250, 250, 0.72)",
    textDim: "rgba(250, 250, 250, 0.5)",
    textFaint: "rgba(250, 250, 250, 0.32)",
    accent: "#FFCC00",
    accentDeep: "#D4A800",
    canada: "#D80021",
    usa: "#0A3161",
    mexico: "#006847",
    live: "#FF1744",
    green: "#22C55E",
    border: "rgba(250, 250, 250, 0.08)",
    borderStrong: "rgba(250, 250, 250, 0.16)",
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
    glass: "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 0 rgba(0,0,0,0.4)",
    glow: "0 0 40px rgba(200, 16, 46, 0.25)",
    deep: "0 24px 60px -20px rgba(0,0,0,0.6)",
    card: "0 1px 0 rgba(255,255,255,0.04), 0 16px 40px -20px rgba(0,0,0,0.5)",
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
