"use client";

import Image from "next/image";
import Link from "next/link";
import CTAForm from "@/components/ui/CTAForm";
import type { CTAFormProps } from "@/components/ui/CTAForm";

export interface HeroProps {
  /** Main heading text */
  heading: string;
  /** Optional highlighted word/phrase (rendered in yellow on light bg, kept white on gradient) */
  headingHighlight?: string;
  /** Subheading / description text */
  subheading?: string;
  /** Longer description below subheading */
  description?: string;
  /** CTA button text — omit to hide button */
  ctaText?: string;
  /** CTA button link */
  ctaHref?: string;
  /** Visual variant */
  variant?: "light" | "gradient";
  /** Background image URL for gradient variant */
  backgroundImage?: string;
  /** Right-side content: image or form */
  rightContent?:
    | { type: "image"; src: string; alt: string; width?: number; height?: number }
    | { type: "form"; formProps?: Partial<CTAFormProps> };
}

export default function Hero({
  heading,
  headingHighlight,
  subheading,
  description,
  ctaText,
  ctaHref = "/register/",
  variant = "light",
  backgroundImage,
  rightContent,
}: HeroProps) {
  const isGradient = variant === "gradient";

  // Split heading around the highlight
  let headingBefore = heading;
  let headingAfter = "";
  if (headingHighlight) {
    const idx = heading.indexOf(headingHighlight);
    if (idx !== -1) {
      headingBefore = heading.slice(0, idx);
      headingAfter = heading.slice(idx + headingHighlight.length);
    }
  }

  return (
    <section
      className={
        isGradient
          ? `relative text-white py-10 md:py-16 overflow-hidden ${backgroundImage ? "md:min-h-[450px]" : ""}`
          : "bg-white"
      }
    >
      {/* Background image + overlay for gradient variant */}
      {isGradient && backgroundImage && (
        <>
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: "top center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(84deg, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.2) 75%, transparent 100%)",
            }}
          />
        </>
      )}

      {/* Fallback solid gradient when no background image */}
      {isGradient && !backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, #0D1282 0%, #1e3a8a 100%)",
          }}
        />
      )}

      <div
        className={
          isGradient
            ? "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20"
        }
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Left: Text */}
          <div>
            {subheading && isGradient && (
              <p className="text-sm md:text-base mb-3 opacity-90">
                {subheading}
              </p>
            )}

            <h1
              className={`text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight ${
                isGradient ? "uppercase" : "text-navy"
              }`}
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              {headingHighlight ? (
                <>
                  {headingBefore}
                  <span className={isGradient ? "" : "text-yellow"}>
                    {headingHighlight}
                  </span>
                  {headingAfter}
                </>
              ) : (
                heading
              )}
            </h1>

            {subheading && !isGradient && (
              <p className="mt-4 text-[15px] leading-relaxed text-gray-dark">
                {subheading}
              </p>
            )}

            {description && (
              <p
                className={`mt-4 text-[15px] md:text-base leading-relaxed ${
                  isGradient ? "opacity-85 max-w-lg" : "text-gray-dark"
                }`}
              >
                {description}
              </p>
            )}

            {ctaText && ctaHref.startsWith("#") ? (
              <a
                href={ctaHref}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(ctaHref);
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className={
                  isGradient
                    ? "inline-flex items-center gap-2 mt-6 font-semibold text-[15px] px-8 py-3 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
                    : "inline-block mt-6 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors cursor-pointer"
                }
                style={
                  isGradient
                    ? { background: "#fcb730", color: "#000" }
                    : undefined
                }
              >
                {ctaText}
              </a>
            ) : ctaText ? (
              <Link
                href={ctaHref}
                className={
                  isGradient
                    ? "inline-flex items-center gap-2 mt-6 font-semibold text-[15px] px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                    : "inline-block mt-6 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
                }
                style={
                  isGradient
                    ? { background: "#fcb730", color: "#000" }
                    : undefined
                }
              >
                {ctaText}
              </Link>
            ) : null}
          </div>

          {/* Right: Image or Form */}
          {rightContent?.type === "image" && (
            <div className="flex justify-center">
              <Image
                src={rightContent.src}
                alt={rightContent.alt}
                width={rightContent.width ?? 550}
                height={rightContent.height ?? 506}
                priority
                className="w-full max-w-[550px] h-auto"
              />
            </div>
          )}

          {rightContent?.type === "form" && (
            <div className="w-full lg:w-[472px] ml-auto">
              <CTAForm {...rightContent.formProps} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
