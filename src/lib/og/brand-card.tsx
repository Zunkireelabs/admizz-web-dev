// Shared 1200x630 share-preview card (WhatsApp, Facebook, LinkedIn, X) used by the
// opengraph-image routes. Static export pre-renders each one at build time.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const assets = (file: string) => readFile(path.join(process.cwd(), "src/assets/og", file));

interface BrandCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
}

// Long course names shrink so they stay within two lines.
const titleSize = (title: string) => (title.length > 60 ? 44 : title.length > 36 ? 56 : 68);

export async function renderBrandCard({ eyebrow, title, subtitle, footer }: BrandCardProps) {
  const [logo, bold, medium] = await Promise.all([
    assets("admizz-logo-dark.png"),
    assets("montserrat-latin-700-normal.woff"),
    assets("montserrat-latin-500-normal.woff"),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "60px 70px",
          background: "linear-gradient(135deg, #31429C 0%, #001353 100%)",
          fontFamily: "Montserrat",
        }}
      >
        <div style={{ position: "absolute", top: -180, right: -120, width: 520, height: 520, borderRadius: 260, background: "rgba(255,255,255,0.06)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -200, right: -60, width: 400, height: 400, borderRadius: 200, background: "rgba(253,237,34,0.10)", display: "flex" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={97} alt="" />
        <div style={{ display: "flex", flexDirection: "column", marginTop: 56 }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#FDED22", letterSpacing: 3 }}>{eyebrow}</div>
          <div style={{ display: "flex", marginTop: 18, maxWidth: 940, fontSize: titleSize(title), fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15 }}>{title}</div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 30, fontWeight: 500, color: "#D7DAE8" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ display: "flex", width: 420, height: 5, borderRadius: 3, background: "#FDED22" }} />
          <div style={{ display: "flex", marginTop: 22, fontSize: 24, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{footer}</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Montserrat", data: bold, weight: 700, style: "normal" },
        { name: "Montserrat", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
