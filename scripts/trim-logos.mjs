// Crops the empty margins off every imported logo so they all fill their card box evenly.
// Safe to re-run. Usage: node scripts/trim-logos.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

export async function trimLogo(buf) {
  try {
    // Trim empty margins, and cap the size (some portal logos are 5000-12000px wide).
    const out = await sharp(buf)
      .trim({ threshold: 25 })
      .resize({ width: 640, height: 320, fit: "inside", withoutEnlargement: true })
      .toBuffer({ resolveWithObject: true });
    // Keep the original if trimming removed (almost) everything.
    return out.info.width >= 24 && out.info.height >= 24 ? out.data : buf;
  } catch {
    return buf;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public/images/universities/imported");
  for (const f of readdirSync(dir).filter((n) => /\.(png|jpe?g|webp)$/i.test(n))) {
    const before = readFileSync(join(dir, f));
    const after = await trimLogo(before);
    const a = await sharp(before).metadata();
    const b = await sharp(after).metadata();
    if (after !== before) writeFileSync(join(dir, f), after);
    console.log(`${f}: ${a.width}x${a.height} -> ${b.width}x${b.height}`);
  }
}
