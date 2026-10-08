import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { normalizeSanityResult } from "./sanity-text";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-10",
  useCdn: false,
});

// Every Sanity read goes through the style normalizer (src/lib/sanity-text.ts), so
// old posts follow the site-wide spelling, "Nepali" and month-first date rules.
const originalFetch = client.fetch.bind(client);
client.fetch = (async (...args: Parameters<typeof originalFetch>) =>
  normalizeSanityResult(await originalFetch(...args))) as typeof client.fetch;

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
