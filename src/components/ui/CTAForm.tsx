import CRMFormEmbed from "./CRMFormEmbed";

export interface CTAFormProps {
  /** Card title */
  title?: string;
  /** Submit button label (unused with iframe, kept for API compat) */
  submitLabel?: string;
  /** Pre-select a study destination (unused with iframe, kept for API compat) */
  defaultDestination?: string;
  /** Visual variant */
  variant?: "card" | "inline";
  /** Color scheme: default (purple) or light (white with shadow) */
  colorScheme?: "default" | "light";
  /** Identifies which page/context this form is embedded on (sent to CRM for attribution) */
  formSource?: string;
}

export default function CTAForm({
  title = "Book Your Free Consultation",
  colorScheme = "default",
  formSource = "consultation",
}: CTAFormProps) {
  return (
    <div
      className={`rounded-[24px] overflow-hidden p-1 sm:px-2 sm:pt-3 sm:pb-1 ${colorScheme === "light" ? "shadow-lg" : ""}`}
      style={{
        border: "1px solid #D4955A",
        background: "linear-gradient(to bottom, #F0ECF9, #FFFFFF)",
      }}
    >
      {title && colorScheme === "light" && (
        <p
          className="text-base font-bold mb-3 text-center"
          style={{ color: "#001353", fontFamily: "var(--font-rubik), sans-serif" }}
        >
          {title}
        </p>
      )}
      <CRMFormEmbed formSource={formSource} />
    </div>
  );
}
