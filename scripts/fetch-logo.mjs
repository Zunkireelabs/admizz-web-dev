// Saves a university logo from a pasted Route2Uni `previewUrl`.
// The signed link expires 15 minutes after it was generated, so run this
// right after copying the university's response.
//
// Usage: node scripts/fetch-logo.mjs <slug> "<previewUrl>"
// Then:  node scripts/import-route2uni.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { trimLogo } from "./trim-logos.mjs";

const [slug, url] = process.argv.slice(2);
if (!slug || !url) {
  console.error('Usage: node scripts/fetch-logo.mjs <slug> "<previewUrl>"');
  process.exit(1);
}

const res = await fetch(url);
if (!res.ok) {
  console.error(`Download failed (HTTP ${res.status}). The link may have expired — copy the response again and retry.`);
  process.exit(1);
}

const type = res.headers.get("content-type") || "";
const ext = type.includes("jpeg") ? "jpg" : type.includes("webp") ? "webp" : type.includes("svg") ? "svg" : "png";
const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public/images/universities/imported", `${slug}.${ext}`);
const raw = Buffer.from(await res.arrayBuffer());
writeFileSync(out, ext === "svg" ? raw : await trimLogo(raw));
console.log(`Saved ${out}`);
