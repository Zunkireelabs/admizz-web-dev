import type { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
  style?: CSSProperties;
}

export default function GlassCard({
  children,
  className = "",
  variant = "light",
  style,
}: GlassCardProps) {
  const base =
    variant === "light"
      ? "bg-white/70 border-white/40 shadow-[0_8px_32px_rgba(13,18,130,0.08)]"
      : "bg-white/[0.06] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]";
  return (
    <div
      className={`relative rounded-[20px] border backdrop-blur-xl ${base} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
