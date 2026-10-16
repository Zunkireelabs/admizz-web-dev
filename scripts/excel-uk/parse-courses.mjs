// Turns a "UG Courses" / "PG Courses" cell from the UK partner sheet into a flat course list.
//
// The cells are free text: optional heading lines ("International Year Zero – Business:"),
// bullet lines, semicolon lists that inherit the first item's degree prefix, and
// "(also X; Y)" variants. See parseCourses() for the rules.

// Study routes a course can be entered through. `months` is the total programme length,
// which the sheet doesn't state — it follows the usual shape of each route.
export const ROUTES = {
  ug: { suffix: "", level: "undergraduate", months: 36 },
  pg: { suffix: "", level: "postgraduate", months: 12 },
  foundation: { suffix: "with International Foundation Year", level: "foundation", months: 48 },
  y0: { suffix: "with International Year Zero", level: "foundation", months: 48 },
  y1: { suffix: "with International Year One", level: "foundation", months: 36 },
  y2: { suffix: "with International Year Two", level: "undergraduate", months: 24 },
  s1: { suffix: "with International Stage One", level: "foundation", months: 48 },
  s2: { suffix: "with International Stage Two", level: "undergraduate", months: 36 },
  pre: { suffix: "with Pre-Master's", level: "postgraduate", months: 18 },
};

const DEGREE_PREFIX =
  /^(?:BSc\s*\/\s*BEng|BEng\s*\/\s*MEng|BSc|BA|BEng|MEng|MSc|MA|MBA|MFin|LLB|LLM|MPH|MPharm|MPhysio|MOptom|MPhys|MRes|BN)\b(?:\s*\(Hons\))?/;

export function routesIn(text) {
  const t = text.toLowerCase();
  const found = [];
  if (/foundation/.test(t)) found.push("foundation");
  if (/year zero/.test(t)) found.push("y0");
  if (/year one|\biy1\b/.test(t)) found.push("y1");
  if (/year two/.test(t)) found.push("y2");
  if (/stage (1|one)\b/.test(t)) found.push("s1");
  if (/stage (2|two)\b/.test(t)) found.push("s2");
  if (/pre-master/.test(t)) found.push("pre");
  return found;
}

// Split on `sep` outside parentheses.
function splitTop(text, sep) {
  const parts = [];
  let depth = 0;
  let cur = "";
  for (const ch of text) {
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === sep && depth === 0) {
      parts.push(cur);
      cur = "";
    } else cur += ch;
  }
  parts.push(cur);
  return parts;
}

// Editorial notes the sheet author left inside course names.
const NOTE = /\s*\((?:flyer says[^)]*|from Jan-27|[^)]*typo[^)]*)\)/gi;

const joinVariant = (base, v) => (/^(with|for|and|&)\b/i.test(v) ? `${base} ${v}` : `${base} (${v})`);

// "Computer Science (also AI; Cyber Security)" -> three names. A variant list that starts
// with "with" keeps that word for the rest ("also with Clinical Psychology; Forensic Psychology").
function expandVariants(name) {
  const m = name.match(/^(.*?)\s*\(also\s+([^)]*)\)\s*$/);
  if (!m) return [name];
  const base = m[1];
  const variants = splitTop(m[2], ";").map((v) => v.trim()).filter(Boolean);
  const lead = /^(with|for)\b/i.exec(variants[0] ?? "")?.[1];
  return [
    base,
    ...variants.map((v) => joinVariant(base, lead && !/^(with|for|and|&)\b/i.test(v) ? `${lead.toLowerCase()} ${v}` : v)),
  ];
}

function expandList(list, inheritedPrefix) {
  const names = [];
  let prefix = inheritedPrefix;
  let lastBase = "";
  for (const raw of splitTop(list, ";")) {
    let p = raw.replace(NOTE, "").trim();
    if (!p) continue;
    let name;
    const m = p.match(DEGREE_PREFIX);
    if (m) {
      prefix = m[0].replace(/\s+/g, " ").trim();
      name = p;
    } else if (/^with\b/i.test(p) && lastBase) {
      name = `${lastBase} ${p}`;
    } else if (prefix) {
      // A bare "Law ..." item inheriting a BSc/BA prefix is a law degree.
      const eff = /^Law\b/.test(p) && /^(BSc|BA)\b/.test(prefix) ? "LLB (Hons)" : prefix;
      name = `${eff} ${p}`;
    } else name = p;
    lastBase = name.replace(/(\s*\([^)]*\))+\s*$/, "").trim();
    names.push(...expandVariants(name));
  }
  return names;
}

const ROUTE_PREFIX = /^(Foundation|Year Zero|Year One|Year Two|Stage 1|Stage 2)\s*:\s*/i;

/**
 * @param text cell text
 * @param defaultRoute route used when no heading/prefix names one ("ug" | "pg")
 * @returns {{ name: string, route: string, months?: number, headingFee?: number }[]}
 */
export function parseCourses(text, defaultRoute) {
  if (!text) return [];
  const out = [];
  let heading = { routes: null, fee: undefined, degree: "", months: undefined };

  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t) continue;

    if (!t.startsWith("•")) {
      // Heading line.
      const h = t.replace(/:\s*$/, "").replace(/\s*\([^)]*(earlier message|also standalone)[^)]*\)/gi, "");
      const routes = routesIn(h);
      const fee = h.match(/£\s?([\d,]+)/)?.[1];
      const years = h.match(/\((\d)-year degrees\)/)?.[1];
      heading = {
        routes: routes.length ? routes : null,
        fee: fee ? parseInt(fee.replace(/,/g, ""), 10) : undefined,
        degree: h.match(/^(MBA|MSc|MA|LLM)\b/)?.[1] ?? "",
        months: years ? parseInt(years, 10) * 12 : undefined,
      };
      continue;
    }

    let body = t.slice(1).trim();
    let routes = heading.routes ?? [defaultRoute];
    const pm = body.match(ROUTE_PREFIX);
    if (pm) {
      routes = routesIn(pm[1]);
      body = body.slice(pm[0].length);
    }
    for (const name of expandList(body, heading.degree)) {
      for (const route of routes) {
        out.push({ name, route, months: heading.months, headingFee: heading.fee });
      }
    }
  }

  // Same course listed twice for the same route: keep the first.
  const seen = new Set();
  return out.filter((c) => {
    const k = `${c.name}|${c.route}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

// Subject areas for the course filter/chips (free-form labels, "General" is hidden by the UI).
const SUBJECTS = [
  [/\bllb\b|\bllm\b|\blaw\b|legal/, "Law"],
  [/psycholog/, "Psychology"],
  [/nursing|health|medic|pharma|biomed|physio|occupational|optom|clinical|sport|exercise/, "Health & Medicine"],
  [/comput|software|cyber|information tech|information systems|games|\bit\b/, "Computer Science"],
  [/artificial intelligence|machine learning|data science|analytics/, "Data Science"],
  [/engineer|broadband/, "Engineering"],
  [/architect|construction|surveying|building/, "Architecture & Construction"],
  [/market|advertising|brand/, "Marketing"],
  [/hospitality|tourism|events?\b/, "Hospitality & Tourism"],
  [/\bmba\b|business|management|\bhrm\b|human resource|supply chain|logistics|entrepreneur|enterprise|project/, "Business & Management"],
  [/finance|financ|accounting|accountancy|banking|economic|fintech|investment/, "Finance & Economics"],
  [/educat|teach/, "Education"],
  [/\bdesign\b|graphic|media|music|\bfilm\b|\barts?\b|creative|writing|publish|spatial/, "Creative & Media"],
  [/biolog|chemi|physic|zoolog|forensic|geograph|environment|mathemat|archaeolog|science|sustainab|energy|wildlife|conservation|marine|animal|neuroscience|anatom|mineral|oil and gas|food/, "Science"],
  [/politic|international relations|security|histor|literature|english|religion|social|sociolog|crim|philosoph|heritage|policy|children|human rights/, "Arts & Humanities"],
];

export function subjectOf(name) {
  const n = name.toLowerCase();
  for (const [re, label] of SUBJECTS) if (re.test(n)) return label;
  return "General";
}
