#!/usr/bin/env node
// Adds the missing CAS / deposit details from the Admizz UK partner sheet
// ("Copy of UK-January-2027.xlsx", Jan 2027 Intake tab, Fees column) to existing profiles.
//
// ADD-ONLY: a profile that already has `deposits` is never touched. Only values the sheet
// states outright are used; ambiguous ones are left out and listed in the report.
// Run: node scripts/fill-uk-deposits.mjs [--dry]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "src/lib/university-kb/universities");
const DRY = process.argv.includes("--dry");

const half = "50% of tuition fee"; // the sheet says only "CAS deposit 50%" — see report, assumption A1

// profile file (folder/slug) → deposits, quoted from the sheet's Fees → "Deposit:" line.
const FILL = {
  "imported/arden-university": [{ label: "CAS deposit", amount: 7000 }],
  "imported/aston-university": [
    { label: "CAS deposit", amount: 5350 },
    { label: "At enrolment", value: "50% of net tuition" },
  ],
  "excel/bangor-university": [{ label: "CAS deposit", value: half }],
  "imported/birmingham-city-university": [
    { label: "Initial payment", amount: 1000 },
    { label: "CAS deposit", value: half },
  ],
  "imported/cardiff-metropolitan-university": [{ label: "CAS deposit", value: "50% of fee" }],
  "imported/harper-adams-university": [{ label: "CAS deposit", value: half }],
  "imported/health-science-university": [
    { label: "Pre-CAS deposit", amount: 6250, note: "50% of net fee. Remaining fee before enrolment." },
  ],
  "imported/leeds-trinity-university": [{ label: "CAS deposit", value: "50% of total fees" }],
  "imported/middlesex-university": [{ label: "CAS deposit", value: "50% of gross tuition" }],
  "imported/ravensbourne-university": [{ label: "CAS deposit", value: "60% of tuition" }],
  "imported/regent-college-london": [{ label: "CAS deposit", amount: 13500 }],
  "imported/university-of-staffordshire": [{ label: "CAS deposit", amount: 8000 }],
  "imported/ulster-university": [{ label: "PCI deposit", amount: 6500, note: "London, Birmingham & Manchester campuses" }],
  "imported/university-of-bedfordshire": [{ label: "CAS deposit", value: "65% of total fee" }],
  "imported/university-of-bradford": [{ label: "CAS deposit", amount: 5000 }],
  "imported/university-of-brighton": [{ label: "CAS deposit", amount: 5000 }],
  "imported/university-of-chester": [
    { label: "Deposit", amount: 1500 },
    { label: "CAS deposit", amount: 3500, note: "£5,000 in total to secure your CAS. £3,000+ or the remaining tuition at enrolment." },
  ],
  "imported/university-of-east-london": [{ label: "CAS deposit", value: "50%", note: "60% to be paid before enrolment" }],
  "imported/university-of-hertfordshire": [{ label: "CAS deposit", amount: 5000 }],
  "imported/university-of-hull": [
    { label: "CAS deposit", amount: 6350 },
    { label: "At enrolment", value: "50% of net tuition" },
  ],
  "imported/university-of-lancashire": [{ label: "CAS deposit", value: "50%", note: "Instalments available" }],
  "imported/university-of-law": [{ label: "CAS & enrolment deposit", amount: 8000, note: "Balance paid in 3 instalments" }],
  "imported/roehampton-university": [
    { label: "CAS deposit (UG & Adult Nursing)", amount: 10500 },
    { label: "CAS deposit (PG)", amount: 8500, note: "Remaining fee before enrolment" },
  ],
  "imported/university-of-sunderland": [{ label: "CAS deposit", value: half }],
  "imported/university-of-the-west-of-scotland": [
    { label: "CAS deposit", value: "75%", note: "Paid after PCI. The remaining 25% is due before the start of the 2nd term." },
  ],
  "imported/university-of-wales-trinity-saint-david": [
    { label: "CAS deposit", value: "50% of total fees", note: "DBA: full fee payment" },
  ],
  "imported/university-of-west-london": [
    { label: "PCI deposit", amount: 1000 },
    { label: "CAS deposit", amount: 10000, note: "£12,000 for Enhanced Extended" },
  ],
  "imported/university-of-winchester":[{ label: "CAS deposit", amount: 7000 }],
  "imported/university-of-wolverhampton": [{ label: "CAS deposit", amount: 8000 }],
  "imported/university-of-worcester": [{ label: "CAS deposit", value: "50% of total fees" }],
  "imported/york-st-john-university": [{ label: "CAS deposit", value: half }],
};

const fmt = (d) => {
  const keys = ["label", "amount", "value", "note"].filter((k) => d[k] !== undefined);
  return `    {\n${keys.map((k) => `      ${k}: ${JSON.stringify(d[k])}`).join(",\n")}\n    }`;
};

let changed = 0;
for (const [key, deposits] of Object.entries(FILL)) {
  const file = join(DIR, `${key}.ts`);
  if (!existsSync(file)) { console.log(`✗ ${key}: file not found`); continue; }
  const src = readFileSync(file, "utf8");
  if (/^  deposits:/m.test(src)) { console.log(`– ${key}: already has deposits, skipped`); continue; }
  if (!/^  lastVerified:/m.test(src)) { console.log(`✗ ${key}: no lastVerified anchor`); continue; }
  const block = `  deposits: [\n${deposits.map(fmt).join(",\n")}\n  ],\n`;
  if (!DRY) writeFileSync(file, src.replace(/^  lastVerified:/m, `${block}  lastVerified:`));
  changed++;
  console.log(`✓ ${key}: ${deposits.length} deposit item(s)`);
}
console.log(`\n${DRY ? "[dry run] would update" : "Updated"} ${changed} profile(s)`);
