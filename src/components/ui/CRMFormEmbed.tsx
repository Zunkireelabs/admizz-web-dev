"use client";

import { useEffect, useState } from "react";
import { readAffiliateRefCookie } from "@/lib/affiliate/refCookie";

const DEFAULT_FORM_URL = "https://edgex.zunkireelabs.com/form/admizz?bg=F0ECF9";

interface CRMFormEmbedProps {
  height?: number;
  mobileHeight?: number;
  title?: string;
  src?: string;
  formSource?: string;
}

// Append ref_code (from ?ref= or first-touch cookie), form_source, and UTM params to
// the iframe URL so the CRM form can capture attribution. CRM ignores unknown params
// if not yet wired up — safe no-op until the CRM side reads them.
function withAttribution(baseSrc: string, formSource?: string): string {
  if (typeof window === "undefined") return baseSrc;
  try {
    const parentParams = new URLSearchParams(window.location.search);
    const urlRef = parentParams.get("ref");
    const cookieRef = readAffiliateRefCookie();
    const refCode = urlRef || cookieRef;

    const utmSource   = parentParams.get("utm_source");
    const utmMedium   = parentParams.get("utm_medium");
    const utmCampaign = parentParams.get("utm_campaign");

    if (!refCode && !utmSource && !utmMedium && !utmCampaign && !formSource) return baseSrc;

    const url = new URL(baseSrc);
    if (formSource)  url.searchParams.set("form_source",  formSource);
    if (refCode)     url.searchParams.set("ref_code",     refCode);
    // Auto-tag utm_source=affiliate when ref present but no explicit utm_source in URL
    const effectiveUtmSource = utmSource || (refCode ? "affiliate" : null);
    if (effectiveUtmSource) url.searchParams.set("utm_source", effectiveUtmSource);
    if (utmMedium)   url.searchParams.set("utm_medium",   utmMedium);
    if (utmCampaign) url.searchParams.set("utm_campaign", utmCampaign);
    return url.toString();
  } catch {
    return baseSrc;
  }
}

export default function CRMFormEmbed({
  height = 550,
  mobileHeight = 450,
  title = "Admizz Enquiry Form",
  src = DEFAULT_FORM_URL,
  formSource,
}: CRMFormEmbedProps) {
  // Start with the bare src so SSR/build-time HTML and first client render match,
  // then enrich on the client after hydration. Avoids hydration mismatch.
  const [resolvedSrc, setResolvedSrc] = useState(src);

  useEffect(() => {
    setResolvedSrc(withAttribution(src, formSource));
  }, [src, formSource]);

  const mobileSrc = resolvedSrc + (resolvedSrc.includes("?") ? "&" : "?") + "compact=1";

  return (
    <>
      {/* Desktop */}
      <div className="relative hidden sm:block" style={{ height, width: "100%" }}>
        <iframe
          src={resolvedSrc}
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
