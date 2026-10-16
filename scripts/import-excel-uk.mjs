// Builds UniversityProfile .ts files for the new UK partner universities (Jan 2027 intake)
// from the partner workbook. ADD-ONLY: it never touches the Route2Uni profiles in
// universities/imported/ — output goes to universities/excel/ with its own index.ts.
//
// Run:
//   python3 scripts/extract-excel-uk.py "<path to .xlsx>"   # writes scripts/excel-raw/uk-jan2027.json
//   node scripts/import-excel-uk.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, parseCourses, subjectOf } from "./excel-uk/parse-courses.mjs";
import { UNIVERSITIES } from "./excel-uk/universities.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(ROOT, "scripts/excel-raw/uk-jan2027.json");
const OUT_DIR = join(ROOT, "src/lib/university-kb/universities/excel");
const LAST_VERIFIED = "2026-10-12"; // "last updated" date on the sheet's Home tab

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Standard UK flow + document checklist (same as defaults/uk.ts; inlined so profiles stay self-contained).
const UK_STAGES = [
  { title: "Application initiated" },
  { title: "Application submitted", document: "Acknowledgement / reference number" },
  { title: "Conditional offer received", document: "Conditional offer letter" },
  { title: "Unconditional offer received", document: "Unconditional offer letter" },
  { title: "Deposit paid", document: "Payment receipt" },
  { title: "CAS issued", document: "CAS letter" },
  { title: "Visa applied", document: "Visa application confirmation" },
];
const UK_DOCUMENTS = [
  { name: "All academic documents" },
  { name: "CV" },
  { name: "Letters of recommendation (LOR)" },
  { name: "Passport" },
  { name: "Statement of purpose" },
  { name: "English language certificate", optional: true },
  { name: "Medium of instruction (MOI) letter", optional: true },
];

const raw = JSON.parse(readFileSync(RAW, "utf8"));

// Process Maps tab: "1 Application Submission → 2 Conditional Offer Letter → ..." -> stages.
const PROCESS_ROW = {
  shared: (n) => n.startsWith("HSU, Winchester"),
  uwe: (n) => n === "UWE Bristol",
  bpp: (n) => n === "BPP University – Onshore Students",
};
function stagesFor(key) {
  if (!key) return UK_STAGES;
  const row = raw.processMaps.find((r) => PROCESS_ROW[key](r.University));
  if (!row) throw new Error(`No process map for "${key}"`);
  return row["Process / Checklist"]
    .split("→")
    .map((s) => s.trim().replace(/^\d+\s+/, ""))
    .filter(Boolean)
    .map((title) => ({ title }));
}

function logoFor(cfg) {
  if (cfg.logoOverride) return cfg.logoOverride;
  const ext = ["webp", "png", "jpg", "svg"].find((e) => existsSync(join(ROOT, `public/images/universities/imported/${cfg.slug}.${e}`)));
  return ext ? `/images/universities/imported/${cfg.slug}.${ext}` : "/images/universities/imported/_placeholder.svg";
}

function build(cfg) {
  const row = raw.jan2027.find((r) => r.University === cfg.match);
  if (!row) throw new Error(`"${cfg.match}" not found in the Jan 2027 Intake tab`);

  const parsed = [...parseCourses(row["UG Courses"], "ug"), ...parseCourses(row["PG Courses"], "pg")];
  const usedSlugs = new Set();
  const courses = parsed.map((c) => {
    const route = ROUTES[c.route];
    const name = route.suffix ? `${c.name} ${route.suffix}` : c.name;
    let slug = slugify(name);
    for (let i = 2; usedSlugs.has(slug); i++) slug = `${slugify(name)}-${i}`;
    usedSlugs.add(slug);
    return {
      slug,
      name,
      level: route.level,
      subject: subjectOf(c.name),
      durationMonths: c.months ?? route.months,
      fees: cfg.fee(c),
      intakes: ["January"],
    };
  });

  const intake = { month: "January", year: 2027, ...(cfg.intakeNote ? { note: cfg.intakeNote } : {}) };
  return {
    slug: cfg.slug,
    name: cfg.name,
    country: "uk",
    logo: logoFor(cfg),
    cities: cfg.cities,
    website: cfg.website,
    overview: cfg.overview,
    highlights: cfg.highlights,
    courses,
    scholarships: cfg.scholarships,
    english: cfg.english,
    entryRequirements: cfg.entryRequirements,
    languageTests: cfg.languageTests,
    requiredDocuments: cfg.requiredDocuments ?? UK_DOCUMENTS,
    applicationStages: stagesFor(cfg.stages),
    intakes: [intake],
    deposits: cfg.deposits,
    lastVerified: LAST_VERIFIED,
  };
}

function toTs(p) {
  const varName = p.slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const json = JSON.stringify(p, null, 2).replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, "$1:");
  return {
    varName,
    text: `import type { UniversityProfile } from "../../types";\n\n// Generated from the Admizz UK partner sheet (Jan 2027 intake). Edit via scripts/import-excel-uk.mjs.\nexport const ${varName}: UniversityProfile = ${json};\n`,
  };
}

mkdirSync(OUT_DIR, { recursive: true });
const emitted = [];
for (const cfg of UNIVERSITIES) {
  const profile = build(cfg);
  const { varName, text } = toTs(profile);
  writeFileSync(join(OUT_DIR, `${profile.slug}.ts`), text);
  emitted.push({ varName, slug: profile.slug });
  const placeholder = profile.logo.includes("_placeholder") ? "  [logo: placeholder]" : "";
  console.log(`✓ ${profile.name}: ${profile.courses.length} courses${placeholder}`);
}

const index =
  emitted.map((e) => `import { ${e.varName} } from "./${e.slug}";`).join("\n") +
  `\n\nimport type { UniversityProfile } from "../../types";\n\n// Add-only profiles from the Admizz UK partner sheet. Kept apart from ../imported so the\n// Route2Uni importer (which rewrites that folder's index) can never drop them.\nexport const excelProfiles: UniversityProfile[] = [\n` +
  emitted.map((e) => `  ${e.varName},`).join("\n") +
  `\n];\n`;
writeFileSync(join(OUT_DIR, "index.ts"), index);
console.log(`\nWrote ${emitted.length} profile(s) to ${OUT_DIR}`);
