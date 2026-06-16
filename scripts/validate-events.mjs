#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const EVENTS_DIR = join(process.cwd(), 'src/app/events');
const PLACEHOLDER_LABELS = ['coming soon', 'tba', 'tbd', 'stay tuned'];
const PLACEHOLDER_END = /-12-31T23:59:59/;

const errors = [];

for (const slug of readdirSync(EVENTS_DIR)) {
  const dir = join(EVENTS_DIR, slug);
  if (!statSync(dir).isDirectory()) continue;

  const metaPath = join(dir, 'meta.json');
  let meta;
  try {
    meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  } catch {
    continue;
  }

  const file = `src/app/events/${slug}/meta.json`;

  const end = meta.endDate;
  if (!end || Number.isNaN(new Date(end).getTime())) {
    errors.push(`${file}: "endDate" is missing or not a valid ISO datetime`);
  } else if (PLACEHOLDER_END.test(end)) {
    errors.push(`${file}: "endDate" looks like a placeholder (${end}) — set the real event end datetime`);
  }

  const label = (meta.dateLabel || '').toLowerCase();
  for (const word of PLACEHOLDER_LABELS) {
    if (label.includes(word)) {
      errors.push(`${file}: "dateLabel" contains placeholder text "${word}" — set the real event date label before shipping`);
      break;
    }
  }
}

if (errors.length) {
  console.error('\nEvent meta.json validation failed:\n');
  for (const e of errors) console.error('  - ' + e);
  console.error('\nFix the offending meta.json files and rebuild.\n');
  process.exit(1);
}

console.log('events: meta.json validation passed');
