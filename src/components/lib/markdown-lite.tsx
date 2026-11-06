import { blogP, blogLi } from "./blog-typography";
import type { ReactNode } from "react";

// Minimal, dependency-free Markdown-lite renderer for agent-generated blog
// body text. Deliberately supports only what server/generators/
// blog-outline.js actually produces and validates: **bold**, *italic*,
// \`code\`, [text](url) links (already stripped back to plain text upstream
// if the url wasn't a real candidate — see that generator's own
// sanitizeInlineLinks), "- item"/"* item" unordered lists, and "1. item"
// ordered lists. No raw HTML injection anywhere — every node here is a real
// React element built from parsed text, never dangerouslySetInnerHTML, so
// there is no XSS surface regardless of what the model writes.

// Tokenize in this order — code spans, links, bold, italic — same
// precedence server/generators/lib/markdown-prose-render.js already uses on
// the Markdown/Eleventy side, so ** inside a link label or a code span is
// never misread as emphasis.
const INLINE_TOKEN = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*\n]+)\*/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let key = 0;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  INLINE_TOKEN.lastIndex = 0;
  while ((match = INLINE_TOKEN.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, code, linkLabel, linkHref, bold, italic] = match;
    if (code !== undefined) {
      nodes.push(<code key={`${keyPrefix}-${key++}`}>{code}</code>);
    } else if (linkLabel !== undefined) {
      nodes.push(
        <a key={`${keyPrefix}-${key++}`} href={linkHref} className="text-blue-royal hover:text-blue-dark underline transition-colors">
          {linkLabel}
        </a>,
      );
    } else if (bold !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-${key++}`}>{bold}</strong>);
    } else if (italic !== undefined) {
      nodes.push(<em key={`${keyPrefix}-${key++}`}>{italic}</em>);
    }
    lastIndex = INLINE_TOKEN.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

type Block =
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "table"; header: string[]; rows: string[][] };

const UNORDERED_ITEM = /^\s*[-*+]\s+(.*)$/;
const ORDERED_ITEM = /^\s*\d+\.\s+(.*)$/;

const TABLE_ROW = /^\|.*\|$/;
const TABLE_SEPARATOR = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/;

function splitCells(line: string): string[] {
  return line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

function parseBlocks(body: string): Block[] {
  const lines = (body || "").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listType: "unordered-list" | "ordered-list" | null = null;

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) blocks.push({ type: "paragraph", text });
    paragraph = [];
  };
  const flushList = () => {
    if (listType && listItems.length) blocks.push({ type: listType, items: listItems });
    listItems = [];
    listType = null;
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx].trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    // Table: a "| a | b |" row followed by a "|---|---|" separator row.
    if (TABLE_ROW.test(line) && idx + 1 < lines.length && TABLE_SEPARATOR.test(lines[idx + 1].trim())) {
      flushParagraph();
      flushList();
      const header = splitCells(line);
      const rows: string[][] = [];
      idx += 2;
      while (idx < lines.length && TABLE_ROW.test(lines[idx].trim())) {
        rows.push(splitCells(lines[idx].trim()));
        idx++;
      }
      idx--;
      blocks.push({ type: "table", header, rows });
      continue;
    }

    const unordered = line.match(UNORDERED_ITEM);
    const ordered = !unordered ? line.match(ORDERED_ITEM) : null;
    if (unordered || ordered) {
      flushParagraph();
      const kind = unordered ? "unordered-list" : "ordered-list";
      if (listType && listType !== kind) flushList();
      listType = kind;
      listItems.push((unordered || ordered)![1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  return blocks;
}

export function renderMarkdownLite(body: string, keyPrefix: string, variant?: "blog"): ReactNode[] {
  const blog = variant === "blog";
  return parseBlocks(body).map((block, i) => {
    const blockKey = `${keyPrefix}-block-${i}`;
    if (block.type === "paragraph") {
      return (
        <p
          key={blockKey}
          className={blog ? blogP.className : "text-base text-gray-dark leading-relaxed mb-4"}
          style={blog ? blogP.style : undefined}
        >
          {renderInline(block.text, blockKey)}
        </p>
      );
    }
    if (block.type === "table") {
      return (
        <div key={blockKey} className="w-full overflow-x-auto my-6 rounded-lg shadow-[0_0_0_1px_#D7DAE8]">
          <table className="w-full min-w-[500px] border-collapse text-[15px]">
            <thead>
              <tr>
                {block.header.map((cell, c) => (
                  <th key={`${blockKey}-h-${c}`} className="bg-[#001353] text-white px-4 py-[11px] text-left font-medium text-[13px] tracking-wide">
                    {renderInline(cell, `${blockKey}-h-${c}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={`${blockKey}-r-${r}`} className={r % 2 === 1 ? "bg-[#F8F8F8]" : undefined}>
                  {row.map((cell, c) => (
                    <td key={`${blockKey}-r-${r}-${c}`} className={`px-4 py-3 border-b border-[#e0dbd0] align-top leading-relaxed text-[#1a1a18]${c === 0 ? " font-semibold text-[#001353]" : ""}`}>
                      {renderInline(cell, `${blockKey}-r-${r}-${c}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    const ListTag = block.type === "unordered-list" ? "ul" : "ol";
    const listClass = block.type === "unordered-list"
      ? "list-disc list-inside space-y-2 mb-4 text-gray-dark ml-4"
      : "list-decimal list-inside space-y-2 mb-4 text-gray-dark ml-4";
    return (
      <ListTag key={blockKey} className={listClass}>
        {block.items.map((item, j) => (
          <li
            key={`${blockKey}-item-${j}`}
            className={blog ? blogLi.className : "text-base leading-relaxed"}
            style={blog ? blogLi.style : undefined}
          >
            {renderInline(item.replace(/^\[ \]\s+/, "\u2610 ").replace(/^\[[xX]\]\s+/, "\u2611 "), `${blockKey}-item-${j}`)}
          </li>
        ))}
      </ListTag>
    );
  });
}
