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
        <a key={`${keyPrefix}-${key++}`} href={linkHref} className="text-blue-royal underline hover:no-underline">
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
  | { type: "ordered-list"; items: string[] };

const UNORDERED_ITEM = /^\s*[-*+]\s+(.*)$/;
const ORDERED_ITEM = /^\s*\d+\.\s+(.*)$/;

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

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
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

export function renderMarkdownLite(body: string, keyPrefix: string): ReactNode[] {
  return parseBlocks(body).map((block, i) => {
    const blockKey = `${keyPrefix}-block-${i}`;
    if (block.type === "paragraph") {
      return (
        <p key={blockKey} className="text-gray-700 leading-relaxed mb-4">
          {renderInline(block.text, blockKey)}
        </p>
      );
    }
    const ListTag = block.type === "unordered-list" ? "ul" : "ol";
    const listClass = block.type === "unordered-list"
      ? "list-disc pl-6 mb-4 space-y-1 text-gray-700"
      : "list-decimal pl-6 mb-4 space-y-1 text-gray-700";
    return (
      <ListTag key={blockKey} className={listClass}>
        {block.items.map((item, j) => (
          <li key={`${blockKey}-item-${j}`} className="leading-relaxed">
            {renderInline(item, `${blockKey}-item-${j}`)}
          </li>
        ))}
      </ListTag>
    );
  });
}
