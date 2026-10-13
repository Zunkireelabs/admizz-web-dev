import type { CSSProperties } from "react";

// Typography of blog post bodies. It matches the long-standing raw-HTML posts (for example
// /study-in-france-guide-for-nepali-students) so Sanity posts, repo-written posts and
// hand-written HTML all read the same. Change the values here, not in each renderer.
const font = "var(--font-rubik), 'Rubik', sans-serif";

export const blogH2: { className: string; style: CSSProperties } = {
  className: "mt-8 mb-3.5 pb-2.5 border-b-2",
  style: { fontFamily: font, fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 700, lineHeight: 1.25, color: "#0d1b2a", borderColor: "#f5e8c0" },
};

export const blogH3: { className: string; style: CSSProperties } = {
  className: "mt-8 mb-3",
  style: { fontFamily: font, fontSize: 18, fontWeight: 600, lineHeight: 1.4, color: "#1a1a18" },
};

export const blogFaqQuestion: { className: string; style: CSSProperties } = {
  className: "mt-6 mb-2.5",
  style: { fontFamily: font, fontSize: 16.5, fontWeight: 600, lineHeight: 1.4, color: "#0d1b2a" },
};

export const blogP: { className: string; style: CSSProperties } = {
  className: "mb-[18px]",
  style: { fontFamily: font, fontSize: 17, lineHeight: 1.85, color: "#1a1a18" },
};

export const blogLi: { className: string; style: CSSProperties } = {
  className: "",
  style: { fontFamily: font, fontSize: 17, lineHeight: 1.75, color: "#1a1a18" },
};
