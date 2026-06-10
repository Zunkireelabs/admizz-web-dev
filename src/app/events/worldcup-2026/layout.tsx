import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function WorldCupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bebas.variable} ${inter.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
