// Applies text corrections (src/data/post-content-patches.ts) to a Sanity post's
// body at render time, so an out-of-date fact can be fixed in this repo (and
// reviewed in a PR) without editing the post in Sanity.
//
// Works on both body shapes the site uses:
//   - rawHtml blocks: plain string replace on the HTML
//   - Portable Text blocks: the phrase is matched across the block's joined
//     text (so formatting that splits a sentence into spans does not matter),
//     and the replacement keeps the formatting of the first span it touches.
//
// A patch that matches nothing logs a warning instead of failing the build, so
// an edit made to the post in Sanity can never break the site.

export interface ContentPatch {
  find: string;
  replace: string;
}

export interface PostPatchSet {
  /** ISO date the facts were last checked; used as the post's dateModified. */
  updated?: string;
  patches: ContentPatch[];
}

interface Span {
  text?: string;
  [key: string]: unknown;
}

interface Block {
  _type?: string;
  html?: string;
  children?: Span[];
  [key: string]: unknown;
}

function replaceInChildren(children: Span[], find: string, replace: string): { children: Span[]; changed: boolean } {
  let spans = children.map((c) => ({ ...c }));
  let changed = false;
  for (let guard = 0; guard < 20; guard++) {
    const texts = spans.map((s) => s.text || "");
    const joined = texts.join("");
    const s = joined.indexOf(find);
    if (s === -1) break;
    const e = s + find.length;
    const starts: number[] = [];
    let pos = 0;
    for (const t of texts) {
      starts.push(pos);
      pos += t.length;
    }
    let a = -1;
    let b = -1;
    for (let i = 0; i < texts.length; i++) {
      if (a === -1 && starts[i] + texts[i].length > s) a = i;
      if (starts[i] < e) b = i;
    }
    if (a === -1 || b === -1) break;
    if (a === b) {
      spans[a].text = texts[a].slice(0, s - starts[a]) + replace + texts[a].slice(e - starts[a]);
    } else {
      spans[a].text = texts[a].slice(0, s - starts[a]) + replace;
      for (let i = a + 1; i < b; i++) spans[i].text = "";
      spans[b].text = texts[b].slice(e - starts[b]);
    }
    changed = true;
  }
  return { children: spans, changed };
}

export function applyContentPatches<T>(content: T, set: PostPatchSet | undefined, slug = ""): T {
  if (!set || !Array.isArray(content)) return content;
  let blocks = (content as unknown as Block[]).map((b) => ({ ...b }));
  for (const { find, replace } of set.patches) {
    let hit = false;
    blocks = blocks.map((b) => {
      if (b._type === "rawHtml" && typeof b.html === "string" && b.html.includes(find)) {
        hit = true;
        return { ...b, html: b.html.split(find).join(replace) };
      }
      if (Array.isArray(b.children)) {
        const r = replaceInChildren(b.children, find, replace);
        if (r.changed) {
          hit = true;
          return { ...b, children: r.children };
        }
      }
      return b;
    });
    if (!hit && process.env.NODE_ENV !== "production") {
      console.warn(`[content-patches] "${slug}": patch not applied, text not found: ${find.slice(0, 70)}`);
    }
  }
  return blocks as unknown as T;
}
