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
  /** CTA button text — omit to hide button */
  ctaText?: string;
  /** CTA button link */
  ctaHref?: string;
  /** Visual variant */
  variant?: "light" | "gradient";
  /** Right-side content: image or form */
  rightContent?:
    | { type: "image"; src: string; alt: string; width?: number; height?: number }
    | { type: "form"; formProps?: Partial<CTAFormProps> };
}

export default function Hero({
  heading,
  headingHighlight,
  subheading,
  ctaText,
  ctaHref = "/register/",
  variant = "light",
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
          ? "bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16 px-4"
          : "bg-white"
      }
    >
      <div
        className={
          isGradient
            ? "max-w-7xl mx-auto"
            : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
        }
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div>
            <h1
              className={`text-3xl md:text-[42px] font-bold leading-tight ${
                isGradient ? "uppercase" : "text-navy"
              }`}
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

            {subheading && (
              <p
                className={`mt-4 text-[15px] leading-relaxed ${
                  isGradient ? "text-lg" : "text-gray-dark"
                }`}
              >
                {subheading}
              </p>
            )}

            {ctaText && (
              <Link
                href={ctaHref}
                className="inline-block mt-6 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                {ctaText}
              </Link>
            )}
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
            <CTAForm {...rightContent.formProps} />
          )}
        </div>
      </div>
    </section>
  );
}
