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
const AGENT_DOC = /^(consent form|optional)$/i;

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


// Collapse stray whitespace and exact-duplicate parentheticals the portal sometimes repeats.
function tidy(str = "") {
  return str
    .replace(/\s+/g, " ")
    .replace(/([A-Za-z])\(/g, "$1 (")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\boveralln\b/gi, "overall")
    .replace(/(\([^)]*\))(?:\s*\1)+/g, "$1")
    .trim();
}

// Course names typed in ALL CAPS get sentence-style casing; degree prefixes are restored.
const DEGREE_CASE = { bsc: "BSc", msc: "MSc", beng: "BEng", meng: "MEng", llb: "LLB", llm: "LLM", mres: "MRes", mph: "MPH" };
function courseName(raw = "") {
  const name = tidy(raw)
    .replace(/\bManagemen\b/g, "Management")
    .replace(/\b(bsc|msc|beng|meng|llb|llm|mres|mph)\b/gi, (m) => DEGREE_CASE[m.toLowerCase()])
    .replace(/(\(Hons\)\s+)([a-z])/g, (_, a, b) => a + b.toUpperCase());
  const letters = name.replace(/[^A-Za-z]/g, "");
  const upper = letters.replace(/[^A-Z]/g, "").length;
  if (letters.length < 8 || upper / letters.length < 0.6) return name;
  return titleCase(name).replace(
    /\b(Bsc|Msc|Ba|Ma|Mba|Llm|Llb|Beng|Meng|Mres|Mph|Hons)\b/g,
    (m) => ({ Bsc: "BSc", Msc: "MSc", Ba: "BA", Ma: "MA", Mba: "MBA", Llm: "LLM", Llb: "LLB", Beng: "BEng", Meng: "MEng", Mres: "MRes", Mph: "MPH", Hons: "Hons" }[m]),
  );
}

// Keep exam acronyms upper-case and fix the portal's spelling slips.
const ACRONYMS = new Set(["IELTS", "PTE", "TOEFL", "SELT", "ESOL", "OIETC", "MOI", "UKVI"]);
const DOC_ACRONYMS = new Set(["CV", "LOR", "MOI", "SOP", "NOC", "IELTS", "PTE"]);
function docName(raw = "") {
  const t = raw.trim();
  return DOC_ACRONYMS.has(t.toUpperCase()) ? t.toUpperCase() : titleCase(t);
}
function testName(raw = "") {
  const t = raw.trim();
  if (/^d[ou]{1,2}lingo$/i.test(t)) return "Duolingo";
  if (ACRONYMS.has(t.toUpperCase())) return t.toUpperCase();
  if (/[a-z]/.test(t) && /[A-Z]/.test(t)) return t.replace(/\bibt\b/gi, "iBT"); // already well-cased, e.g. "MSc AI and Data Science - IELTS"
  return titleCase(t).replace(/\b(ielts|pte|toefl|selt|esol|oietc|moi)\b/gi, (m) => m.toUpperCase()).replace(/\bibt\b/gi, "iBT");
}

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
  /(placement|year in industry|industry year|professional experience|with professional)/i.test(name);

// Course length written in the name, e.g. "(24 months)", "- 2 years duration", "(1 yr Top-Up)".
// "12-month placement year" is deliberately not matched (hyphenated = a component, not the total).
function durationFromName(name = "") {
  const m = name.match(/\b(\d{1,2})\s*(months?|years?|yrs?)\b/i);
  if (!m) return undefined;
  const n = parseInt(m[1], 10);
  const months = /^m/i.test(m[2]) ? n : n * 12;
  return months >= 6 && months <= 60 ? months : undefined;
}

// Pick the representative tuition for a level, excluding agent-only line items.
// Portal description like "3 years" / "1 year" gives the programme length.
function durationFromDescription(desc = "") {
  const m = (desc || "").trim().match(/^(\d+)\s*years?$/i);
  return m ? Number(m[1]) * 12 : undefined;
}

function feeForLevel(feeStructures, levelName, placement, courseName = "", cities = [], courseCity = "") {
  const fs = feeStructures.find((f) => f.courseLevelName === levelName);
  if (!fs) return undefined;
  let real = (fs.tuitionRange || []).filter((t) => !AGENT_FEE.test(t.description || ""));
  if (real.length === 0) return undefined;

  // A fee line named after one specific course (e.g. "MSc AI and Data Science") applies only to it.
  const norm = (x) =>
    x.toLowerCase().replace(/\bai\b/g, "artificial intelligence").replace(/&/g, " and ").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  const courseNorm = norm(courseName);
  const specific = real.find((t) => {
    const d = norm(t.description || "");
    return d.length >= 12 && courseNorm.includes(d) && !/^(other|ranges? from|gross fee|tuition)/.test(d);
  });
  if (specific) {
    const label = (specific.description || "").replace(/[:\s]+$/, "").trim() || "Tuition fee";
    return { label, amount: specific.amount, per: "total" };
  }

  // "Tuition Fee for Nursing" applies only to courses of that subject.
  const forSubject = (t) => (t.description || "").match(/\bfor\s+([a-z]+)\s*:?\s*$/i)?.[1]?.toLowerCase();
  const others = real.filter((t) => { const sub = forSubject(t); return !sub || courseNorm.includes(sub); });
  if (others.length && others.length < real.length) real = others;

  // Fee lines named after a campus apply only to courses taught there.
  if (courseCity) {
    const here = real.filter((t) => (t.description || "").toLowerCase().includes(courseCity.toLowerCase()));
    if (here.length && here.length < real.length) real = here;
  }

  // MBAs often have their own price; other courses must not pick up the MBA price.
  const isMba = /\bMBA\b|master of business administration/i.test(courseName);
  const mbaItems = real.filter((t) => /mba/i.test(t.description || "") && !/includ/i.test(t.description || ""));
  if (isMba && mbaItems.length) real = mbaItems;
  else if (!isMba && mbaItems.length && mbaItems.length < real.length) real = real.filter((t) => !mbaItems.includes(t));

  const isPlacementFee = (t) => /placement|2-? ?year|industry|professional/i.test(t.description || "");
  const toFee = (t, fallback) => {
    let label = (t.description || "").replace(/[:\s]+$/, "").trim();
    const rangeFrom = /ranges?\s*from|^from$/i.test(label);
    if (rangeFrom) label = "Tuition from";
    // Campus-specific price: keep the campus part as a note and flag it as a "from" price.
    const part = label.split(":").map((x) => x.trim()).find((x) => cities.some((c) => x.toLowerCase().includes(c.toLowerCase())));
    const priced = real.some((o) => o !== t && o.amount !== t.amount);
    const fee = { label: label || fallback, amount: t.amount, per: /per\s*year/i.test(label) ? "year" : "total" };
    if (rangeFrom) fee.from = true;
    if (part && priced) { fee.from = true; const hit = cities.filter((c) => part.toLowerCase().includes(c.toLowerCase())); fee.note = `${hit.join(" & ")} campus${hit.length > 1 ? "es" : ""}`; }
    return fee;
  };

  if (placement) {
    const p = real.find(isPlacementFee);
    if (p) return toFee(p, "Tuition (with placement)");
  }
  // Base = lowest remaining that isn't a placement add-on.
  const sorted = [...real].sort((a, b) => a.amount - b.amount);
  const base = sorted.find((t) => !isPlacementFee(t)) || sorted[0];
  return toFee(base, "Tuition fee");
}


// Downloads the logo from the response's signed `previewUrl` (valid ~15 min)
// when we don't already have one on disk. Returns true if a logo was saved.
async function fetchLogoIfNeeded(raw) {
  const b = raw.data.basicInfo;
  const slug = slugify(b.name);
  const has = ["webp", "png", "jpg", "svg"].some((ext) =>
    existsSync(join(ROOT, `public/images/universities/imported/${slug}.${ext}`)),
  );
  if (has || !b.previewUrl) return false;
  try {
    const res = await fetch(b.previewUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status} (link expired?)`);
    const type = res.headers.get("content-type") || "";
    const ext = type.includes("jpeg") ? "jpg" : type.includes("webp") ? "webp" : type.includes("svg") ? "svg" : "png";
    writeFileSync(join(ROOT, `public/images/universities/imported/${slug}.${ext}`), Buffer.from(await res.arrayBuffer()));
    console.log(`  ↳ logo downloaded for ${b.name}`);
    return true;
  } catch (e) {
    console.log(`  ⚠ logo not fetched for ${b.name}: ${e.message}. Using placeholder; re-copy the response and re-run to retry.`);
    return false;
  }
}

// Tuition by level (min–max), ignoring agent-only line items. Shown when no course list exists.
function feeSummaryOf(feeStructures) {
  const out = [];
  for (const fs of feeStructures) {
    const amounts = (fs.tuitionRange || [])
      .filter((t) => !AGENT_FEE.test(t.description || "") && t.amount > 0)
      .map((t) => t.amount);
    if (!amounts.length) continue;
    out.push({ level: tidy(fs.courseLevelName), min: Math.min(...amounts), max: Math.max(...amounts) });
  }
  return out.length ? out : undefined;
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
    // "…(two-year option with placement available)" means the placement is optional,
    // so price and length stay at the standard programme.
    const placementOptional = placement && /\b(option|available)\b/i.test(c.name);
    const placementIncluded = placement && !placementOptional;
    const fee = feeForLevel(d.feeStructures || [], c.courseLevelName, placementIncluded, c.name, cities, c.cityName || "");
    let displayName = courseName(c.name);
    if (/international foundation year/i.test(c.courseLevelName) && !/foundation/i.test(displayName)) displayName += " with International Foundation Year";
    else if (/international year one/i.test(c.courseLevelName) && !/year one/i.test(displayName)) displayName += " with International Year One";
    byId.set(c.id, {
      slug: `${slugify(c.name)}-${c.id}`,
      name: displayName,
      level,
      subject: subjectOf(c.name),
      durationMonths:
        durationFromName(c.name) ??
        durationFromDescription(c.description) ??
        (/top[- ]?up/i.test(c.name) || /top[- ]?up/i.test(c.courseLevelName) ? 12 : level === "research" ? 36 :
        level !== "postgraduate" && /\bwith\s+(international\s+)?(foundation year|year one)\b/i.test(displayName) ? 48 : placementIncluded ? 24 : level === "undergraduate" ? 36 : 12),
      fees: fee ? [fee] : [],
      intakes: month ? [month] : [],
      withPlacement: placement || undefined,
      placementOptional: placementOptional || undefined,
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
    const bare = full.match(/^(.*?)(?:\s+of)?\s+(\d{3,5})\s*$/i); // e.g. "Early Bird Discount of 3000" (no currency sign)
    if (nums.length === 0 && bare) value = `${bare[1].trim()} ${d.basicInfo.currency?.symbol ?? "£"}${Number(bare[2]).toLocaleString("en-GB")}`;
    else if (nums.length === 0) value = full.length <= 40 ? full : "Scholarship available";
    else if (nums.length === 1 || new Set(nums).size === 1)
      value = `${/up\s*-?\s*to/i.test(full) ? "Up to " : ""}£${nums[0].toLocaleString("en-GB")}`;
    else value = `Up to £${Math.max(...nums).toLocaleString("en-GB")}`;
    scholarships.push({ name: `${s.courseLevelName} scholarship`, value, eligibility: full !== value ? full : undefined });
  }

  const requiredDocuments = [
    ...(d.requiredDocuments || []).filter((x) => !AGENT_DOC.test(x.name)).map((x) => ({ name: docName(x.name) })),
    ...(d.optionalDocuments || []).filter((x) => !AGENT_DOC.test(x.name)).map((x) => ({ name: docName(x.name), optional: true })),
  ];

  const entryRequirements = (d.entryRequirements || []).map((e) => ({
    level: tidy(e.courseLevelName),
    gapAccepted: e.gapAccepted ?? undefined,
    gapYearsAllowed: (e.gapYearsAllowed || "").trim() || undefined,
    criteria: (e.criteria || []).map((c) => tidy(c).replace(/^[•·\-–—*]+\s*/, "")).filter(Boolean),
  })).filter((e) => e.criteria.length);

  const waiverByLevel = {};
  for (const w of d.englishProficiency || [])
    if (w.hasWaiver && (w.criteria || []).length) waiverByLevel[tidy(w.courseLevelName)] = w.criteria.map(tidy);
  const testsByLevel = {};
  for (const t of (d.languageTests || []).filter((x) => !/internal/i.test(x.languageTestName))) {
    const score = tidy(t.requiredScore || "");
    if (!score || /^[.\-_\s]+$/.test(score)) continue; // placeholder like ".." — nothing to show
    let test = testName(t.languageTestName);
    let shown = score;
    const named = /^other$/i.test(t.languageTestName.trim()) && score.match(/^([A-Za-z][A-Za-z0-9 ]{2,30}):\s*(.+)$/);
    if (named) { test = named[1].trim(); shown = named[2].trim(); }
    (testsByLevel[tidy(t.courseLevelName)] ||= []).push({ test, score: shown });
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
    // 1999 is the portal's default placeholder, not a real founding year — never publish it.
    established: b.establishedYear && b.establishedYear > 1000 && b.establishedYear !== 1999 ? b.establishedYear : undefined,
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
    feeSummary: feeSummaryOf(d.feeStructures || []),
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
  await fetchLogoIfNeeded(raw);
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
