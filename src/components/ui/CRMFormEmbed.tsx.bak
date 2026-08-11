const DEFAULT_FORM_URL = "https://dev-lead-crm.zunkireelabs.com/form/admizz?bg=F0ECF9";

interface CRMFormEmbedProps {
  height?: number;
  mobileHeight?: number;
  title?: string;
  src?: string;
}

export default function CRMFormEmbed({
  height = 550,
  mobileHeight = 450,
  title = "Admizz Enquiry Form",
  src = DEFAULT_FORM_URL,
}: CRMFormEmbedProps) {
  const mobileSrc = src + (src.includes("?") ? "&" : "?") + "compact=1";

  return (
    <>
      {/* Desktop */}
      <div className="relative hidden sm:block" style={{ height, width: "100%" }}>
        <iframe
          src={src}
          width="100%"
          height={height}
          frameBorder={0}
          scrolling="no"
          loading="eager"
          // @ts-expect-error -- fetchPriority is valid HTML but not yet in React types
          fetchPriority="high"
          style={{ border: "none", overflow: "hidden" }}
          title={title}
        />
      </div>
      {/* Mobile */}
      <div className="relative block sm:hidden" style={{ height: mobileHeight, width: "100%" }}>
        <iframe
          src={mobileSrc}
          width="100%"
          height={mobileHeight}
          frameBorder={0}
          scrolling="no"
          loading="eager"
          // @ts-expect-error -- fetchPriority is valid HTML but not yet in React types
          fetchPriority="high"
          style={{ border: "none", overflow: "hidden" }}
          title={title}
        />
      </div>
    </>
  );
}
