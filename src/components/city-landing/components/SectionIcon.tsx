import type { ReactNode } from "react";

interface SectionIconProps {
  iconKey: string;
  className?: string;
}

const PATHS: Record<string, ReactNode> = {
  pin: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" strokeWidth={1.6} />
    </>
  ),
  language: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 5h12m-6 0v14m-3-7h6m6-7h-3l-3 8m0 0L9 19m6-6 3 8" />
  ),
  shield: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 3 4 6v6c0 4.5 3.5 8.4 8 9 4.5-.6 8-4.5 8-9V6l-8-3zm-3 9 2 2 4-4" />
  ),
  visa: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" strokeWidth={1.6} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 10h18M7 15h4" />
    </>
  ),
  chat: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 12a8 8 0 1 1-3.5-6.6L21 5l-1 4 .5.5A8 8 0 0 1 21 12zM8 11h.01M12 11h.01M16 11h.01" />
  ),
  chart: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 19V5m0 14h16M8 15v-4m4 4V9m4 6v-7" />
  ),
  list: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 6h16M4 12h16M4 18h10" />
  ),
  document: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 3h6l4 4v14H5V3zm0 0v4h4M9 13h6M9 17h6" />
  ),
  plane: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M2 16l8-3 4-9 2 1-3 8 7 2-1 2-7-1-3 5h-2l1-5-5 1z" />
  ),
};

export default function SectionIcon({ iconKey, className = "w-6 h-6" }: SectionIconProps) {
  const node = PATHS[iconKey];
  if (!node) return null;
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {node}
    </svg>
  );
}
