// Converts manual Route2Uni "Copy response" JSON drops into student-facing
// UniversityProfile .ts files. Read-only: reads scripts/route2uni-raw/*.json,
// writes src/lib/university-kb/universities/imported/*.ts + index.ts.
//
// Run: node scripts/import-route2uni.mjs
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW_DIR = join(ROOT, "scripts/route2uni-raw");
const OUT_DIR = join(ROOT, "src/lib/university-kb/universities/imported");

const COUNTRY_SLUG = {
  "united kingdom": "uk", "united states": "usa", "usa": "usa", "canada": "canada",
  "australia": "australia", "new zealand": "new-zealand", "germany": "germany",
  "france": "france", "finland": "finland", "india": "india",
};

// Agent-only entries we never publish to students.
const AGENT_FEE = /cas\s*deposit|enrol|^deposit$|additional fee/i;
const AGENT_DOC = /consent form/i;

// Standard application flow by country (stage names aren't in the export).
const STAGES = {
  uk: [
    { title: "Application initiated" },
    { title: "Application submitted", document: "Acknowledgement / reference number" },
    { title: "Conditional offer received", document: "Conditional offer letter" },
    { title: "Unconditional offer received", document: "Unconditional offer letter" },
    { title: "Deposit paid", document: "Payment receipt" },
    { title: "CAS issued", document: "CAS letter" },
    { title: "Visa applied", document: "Visa application confirmation" },
  ],
};

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const titleCase = (s) =>
  s.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .replace(/\b(Of|The|And|In|For|With|A|An|To)\b/g, (m) => m.toLowerCase())
    .replace(/^([a-z])/, (m) => m.toUpperCase());

function levelOf(name = "") {
  const n = name.toLowerCase();
  if (/(doctor|phd|research)/.test(n)) return "research";
  if (/(postgrad|master|^m[a-z]{1,3}\b|pg)/.test(n)) return "postgraduate";
  if (/(foundation|pre-?master|diploma)/.test(n)) return "foundation";
  return "undergraduate";
}

function courseLevel(levelName = "") {
  const n = levelName.toLowerCase();
  if (n.includes("foundation") || n.includes("year one")) return "foundation";
  if (/(research|phd|doctor|mphil)/.test(n)) return "research";
  if (n.includes("postgraduate") || n.includes("master") || n.includes("mres") || n === "pg") return "postgraduate";
  if (n.includes("undergraduate") || n.includes("ug") || n.includes("nursing")) return "undergraduate";
  return "undergraduate";
}

const SUBJECTS = [
  [/mba|business|management(?!.*project)|hrm|human resource/, "Business & Management"],
  [/comput|software|cyber|^it\b|information tech/, "Computer Science"],
  [/data scien|analytic|machine learning|\bai\b/, "Data Science"],
  [/market/, "Marketing"],
  [/health|public health|nursing|medic|pharma|biomed/, "Health & Medicine"],
  [/engineer/, "Engineering"],
  [/\blaw\b|legal/, "Law"],
  [/design|graphic|media|music|film|art|creative|writing|publish/, "Creative & Media"],
  [/educat|teach|tesol/, "Education"],
  [/psycholog/, "Psychology"],
  [/hospitality|tourism/, "Hospitality & Tourism"],
  [/finance|account|economic/, "Finance & Economics"],
  [/project management/, "Project Management"],
  [/politic|internationa relations|security|histor|literature|religion|social|environment/, "Arts & Humanities"],
];
function subjectOf(name = "") {
  const n = name.toLowerCase();
  for (const [re, label] of SUBJECTS) if (re.test(n)) return label;
  return "General";
}

const hasPlacement = (name = "") =>
  /(placement|year in industry|professional experience|with professional|2 ?years?|2 yrs)/i.test(name);

// Pick the representative tuition for a level, excluding agent-only line items.
function feeForLevel(feeStructures, levelName, placement) {
  const fs = feeStructures.find((f) => f.courseLevelName === levelName);
  if (!fs) return undefined;
  const real = (fs.tuitionRange || []).filter((t) => !AGENT_FEE.test(t.description || ""));
  if (real.length === 0) return undefined;
  if (placement) {
    const p = real.find((t) => /placement|2-? ?year|industry|professional/i.test(t.description || ""));
    if (p) return { label: (p.description || "").trim() || "Tuition (with placement)", amount: p.amount, per: "total" };
  }
  // Base = lowest remaining that isn't a placement add-on.
  const base = real
    .filter((t) => !/placement|2-? ?year|industry|professional/i.test(t.description || ""))
    .sort((a, b) => a.amount - b.amount)[0] || real.sort((a, b) => a.amount - b.amount)[0];
  return { label: (base.description || "").trim() || "Tuition fee", amount: base.amount, per: "total" };
}

function convert(raw) {
  const d = raw.data;
  const b = d.basicInfo;
  const country = COUNTRY_SLUG[(b.countryName || "").toLowerCase()];
  if (!country) throw new Error(`Unknown country: ${b.countryName}`);

  const name = titleCase(b.name);
  const slug = slugify(b.name);
  const cities = (b.cities || []).map((c) => c.name);

  // Dedupe courses by id; merge the intake months of duplicate rows.
  const byId = new Map();
  for (const c of d.courses || []) {
    const month = monthOf(c.intakeName);
    if (byId.has(c.id)) {
      const ex = byId.get(c.id);
      if (month && !ex.intakes.includes(month)) ex.intakes.push(month);
      continue;
    }
    const level = courseLevel(c.courseLevelName);
    const placement = hasPlacement(c.name);
    const fee = feeForLevel(d.feeStructures || [], c.courseLevelName, placement);
    byId.set(c.id, {
      slug: `${slugify(c.name)}-${c.id}`,
      name: c.name,
      level,
      subject: subjectOf(c.name),
      durationMonths: placement ? 24 : level === "undergraduate" ? 36 : level === "foundation" ? 12 : 12,
      fees: fee ? [fee] : [],
      intakes: month ? [month] : [],
      withPlacement: placement || undefined,
    });
  }
  const courses = [...byId.values()];

  // One scholarship entry per level: concise "Up to £X" headline + full detail.
  const scholarships = [];
  for (const s of d.scholarships || []) {
    const full = (s.amounts || []).map(cleanAmount).filter(Boolean).join("; ");
    if (!full) continue;
    const nums = [...full.matchAll(/£\s?([\d,]+)/g)].map((m) => parseInt(m[1].replace(/,/g, ""), 10)).filter((n) => !isNaN(n));
    let value;
    if (nums.length === 0) value = full.length <= 40 ? full : "Scholarship available";
    else if (nums.length === 1 || new Set(nums).size === 1) value = `£${nums[0].toLocaleString("en-GB")}`;
    else value = `Up to £${Math.max(...nums).toLocaleString("en-GB")}`;
    scholarships.push({ name: `${s.courseLevelName} scholarship`, value, eligibility: full !== value ? full : undefined });
  }

  const requiredDocuments = [
    ...(d.requiredDocuments || []).filter((x) => !AGENT_DOC.test(x.name)).map((x) => ({ name: titleCase(x.name) })),
    ...(d.optionalDocuments || []).filter((x) => !AGENT_DOC.test(x.name)).map((x) => ({ name: titleCase(x.name), optional: true })),
  ];

  const entryRequirements = (d.entryRequirements || []).map((e) => ({
    level: e.courseLevelName,
    gapAccepted: e.gapAccepted ?? undefined,
    gapYearsAllowed: (e.gapYearsAllowed || "").trim() || undefined,
    criteria: (e.criteria || []).map((s) => s.trim()).filter(Boolean),
  })).filter((e) => e.criteria.length);

  const waiverByLevel = {};
  for (const w of d.englishProficiency || [])
    if (w.hasWaiver && (w.criteria || []).length) waiverByLevel[w.courseLevelName] = w.criteria.map((s) => s.trim());
  const testsByLevel = {};
  for (const t of d.languageTests || []) {
    (testsByLevel[t.courseLevelName] ||= []).push({ test: titleCase(t.languageTestName), score: (t.requiredScore || "").trim() });
  }
  const languageTests = Object.keys(testsByLevel).map((level) => ({
    level, tests: testsByLevel[level], waiver: waiverByLevel[level],
  }));

  // Summary IELTS for the card/sidebar (lowest listed).
  const ielts = Math.min(
    ...(d.languageTests || []).filter((t) => /ielts/i.test(t.languageTestName)).map((t) => parseFloat(t.requiredScore)).filter((n) => !isNaN(n)),
  );
  const moi = Object.keys(waiverByLevel).length > 0;

  const intakes = (d.intakePeriods || []).map((i) => {
    const [month, year] = i.intakeName.split(" ");
    return { month, year: Number(year), ...(i.deadlineInfo ? { applicationDeadline: i.deadlineInfo } : {}) };
  });

  // Use a real logo if we have one on disk, else a neutral placeholder.
  const logoExt = ["webp", "png", "jpg", "svg"].find((ext) =>
    existsSync(join(ROOT, `public/images/universities/imported/${slug}.${ext}`)),
  );
  const logo = logoExt
    ? `/images/universities/imported/${slug}.${logoExt}`
    : "/images/universities/imported/_placeholder.svg";

  return {
    slug, name, country,
    logo,
    established: b.establishedYear && b.establishedYear > 1000 ? b.establishedYear : undefined,
    cities,
    website: b.websiteUrl || undefined,
    overview: (b.description && b.description !== "undefined" ? b.description : "") ||
      `${name} is a partner university in ${b.countryName}. Talk to an Admizz counsellor for full course and admission details.`,
    courses,
    scholarships,
    english: { ...(isFinite(ielts) ? { ielts } : {}), ...(moi ? { note: "MOI accepted for some programmes" } : {}) },
    entryRequirements: entryRequirements.length ? entryRequirements : undefined,
    languageTests: languageTests.length ? languageTests : undefined,
    requiredDocuments,
    applicationStages: STAGES[country] || STAGES.uk,
    intakes,
    rawId: b.id,
  };
}

function monthOf(intakeName = "") {
  return (intakeName.split(" ")[0] || "").trim() || null;
}
function cleanAmount(s = "") {
  return s.replace(/\s+/g, " ").trim();
}

// ---- Emit TS ----
function toTs(p) {
  const varName = p.slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^(\d)/, "_$1");
  const body = { ...p };
  delete body.rawId;
  const json = JSON.stringify(body, null, 2).replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, "$1:");
  return { varName, text: `import type { UniversityProfile } from "../../types";\n\n// Generated from Route2Uni export (id ${p.rawId}). Edit via scripts/import-route2uni.mjs.\nexport const ${varName}: UniversityProfile = ${json};\n` };
}

mkdirSync(OUT_DIR, { recursive: true });
const files = readdirSync(RAW_DIR).filter((f) => f.endsWith(".json"));
const emitted = [];
for (const f of files) {
  const raw = JSON.parse(readFileSync(join(RAW_DIR, f), "utf8"));
  const profile = convert(raw);
  profile.lastVerified = new Date().toISOString().slice(0, 10);
  const { varName, text } = toTs(profile);
  writeFileSync(join(OUT_DIR, `${profile.slug}.ts`), text);
  emitted.push({ varName, slug: profile.slug, name: profile.name, courses: profile.courses.length });
  console.log(`✓ ${profile.name}: ${profile.courses.length} courses, ${profile.scholarships.length} scholarships`);
}

const index =
  emitted.map((e) => `import { ${e.varName} } from "./${e.slug}";`).join("\n") +
  `\n\nimport type { UniversityProfile } from "../../types";\nexport const importedProfiles: UniversityProfile[] = [\n` +
  emitted.map((e) => `  ${e.varName},`).join("\n") +
  `\n];\n`;
writeFileSync(join(OUT_DIR, "index.ts"), index);
console.log(`\nWrote ${emitted.length} profile(s) to ${OUT_DIR}`);
