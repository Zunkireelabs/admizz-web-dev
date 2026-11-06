import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

// A post body is Portable Text blocks, plus raw-HTML blocks that carry an `html` string.
export type BodyBlock = PortableTextBlock | { _type: string; _key?: string; html?: string; [key: string]: unknown };
import { BLOG_SHARED_OVERRIDES, RICH_POST_CSS, RICH_POST_FONT_LINK, RICH_POST_MARKERS } from "@/components/lib/blog-rich-styles";
import { urlFor } from "@/lib/image";
import { blogH2, blogH3, blogP, blogLi } from "./lib/blog-typography";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className={blogH2.className} style={blogH2.style}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={blogH3.className} style={blogH3.style}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold text-navy mt-6 mb-3">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base md:text-lg font-semibold text-navy mt-5 mb-2">
        {children}
      </h5>
    ),
    normal: ({ children }) => (
      <p className={blogP.className} style={blogP.style}>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-royal pl-4 py-2 my-6 text-gray-dark italic bg-off-white rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const blank = value?.blank;
      return (
        <a
          href={href}
          className="text-blue-royal hover:text-blue-dark underline transition-colors"
          {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-dark ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-dark ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className={blogLi.className} style={blogLi.style}>{children}</li>
    ),
    number: ({ children }) => (
      <li className={blogLi.className} style={blogLi.style}>{children}</li>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value.asset).width(800).auto("format").url();
      return (
        <figure className="my-6">
          <img
            src={imageUrl}
            alt={value.alt || ""}
            className="rounded-lg w-full"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="text-sm text-gray-dark mt-2 text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    rawHtml: ({ value }) => {
      if (!value?.html) return null;

      // Extract <style> blocks and scope their rules to .blog-raw-content
      // to prevent global style leaks (e.g. body { padding: ... })
      let html = value.html;
      let scopedStyles = "";

      const scopeCss = (css: string) =>
        css.replace(
          /([^{}]+)\{([^{}]*)\}/g,
          (ruleMatch: string, selector: string, body: string) => {
            const trimmed = selector.trim();
            // Strip body/html rules entirely — page layout handles these
            if (/^(body|html)\b/i.test(trimmed)) {
              return "";
            }
            // Already scoped or @-rules — leave as-is
            if (trimmed.startsWith("@") || trimmed.startsWith(".blog-raw-content")) {
              return ruleMatch;
            }
            return `.blog-raw-content ${trimmed} {${body}}`;
          }
        );

      html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_match: string, css: string) => {
        scopedStyles += scopeCss(css);
        return ""; // remove original <style> from HTML
      });

      // Fallback: a post that uses the standard rich layout markup but was published without
      // any <style> block would show as plain text. Apply the standard stylesheet in that case only.
      if (!scopedStyles && RICH_POST_MARKERS.test(html)) {
        scopedStyles = scopeCss(RICH_POST_CSS);
        html = RICH_POST_FONT_LINK + html;
      }

      // Appended last so every post gets the same shared look (see blog-rich-styles.ts).
      if (scopedStyles) scopedStyles += BLOG_SHARED_OVERRIDES;

      return (
        <div className="my-6 overflow-x-auto blog-table blog-raw-content">
          {scopedStyles && (
            <style dangerouslySetInnerHTML={{ __html: scopedStyles }} />
          )}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      );
    },
  },
};

// Plain (non raw-HTML) posts are drawn with the same markup and stylesheet as the rich posts
// (key-facts layout, checklist bullets, step cards, callouts, CTA banner), so every blog shares one look.
const richComponents: PortableTextComponents = {
  ...components,
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => (
      <div className="callout tip">
        <span className="callout-icon">💡</span>
        <div className="callout-body">{children}</div>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="checklist">{children}</ul>,
    number: ({ children }) => <ol className="steps">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    ...components.marks,
    strong: ({ children }) => <strong>{children}</strong>,
  },
};

const PLAIN_POST_EXTRA_CSS = `
.blog-raw-content h2{margin-top:44px}
.blog-raw-content h2:first-child{margin-top:0}
.blog-raw-content h3{font-size:18px;font-weight:600;color:#1a1a18;margin:32px 0 12px;line-height:1.4}
.blog-raw-content h4{font-size:16.5px;font-weight:600;color:#0d1b2a;margin:24px 0 10px}
.blog-raw-content a{color:#31429C;text-decoration:underline}
.blog-raw-content .callout-body p{margin-bottom:0}
.blog-raw-content ol.steps li{padding-left:64px}
`;

function PlainRichPost({ content }: { content: BodyBlock[] }) {
  const css = scopeRichCss(RICH_POST_CSS) + BLOG_SHARED_OVERRIDES + PLAIN_POST_EXTRA_CSS;
  return (
    <div className="my-6 overflow-x-auto blog-table blog-raw-content">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="container">
        <PortableText value={content as PortableTextBlock[]} components={richComponents} />
        <div className="cta-banner">
          <h2>Plan Your Study Abroad Journey</h2>
          <p>Admizz Education guides you from university choice to visa and what comes after graduation.</p>
          <div className="cta-btns">
            <a href="https://admizzeducation.com/register" className="btn-primary" rel="noopener">Book Free Consultation →</a>
            <a href="https://admizzeducation.com/blogs" className="btn-secondary" rel="noopener">More Guides</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function scopeRichCss(css: string) {
  return css.replace(/([^{}]+)\{([^{}]*)\}/g, (m: string, selector: string, body: string) => {
    const s = selector.trim();
    if (/^(body|html)\b/i.test(s)) return "";
    if (s.startsWith("@") || s.startsWith(".blog-raw-content")) return m;
    return `.blog-raw-content ${s} {${body}}`;
  });
}

export interface PostFact { label: string; value: string }

// The "At a Glance" card every post opens with (same markup as the key-facts card in the approved template).
// Posts that do not write their own card get one built from data the post already has.
export function FactsCard({ title, facts }: { title: string; facts: PostFact[] }) {
  return (
    <div className="blog-raw-content">
      <style dangerouslySetInnerHTML={{ __html: scopeRichCss(RICH_POST_CSS) + BLOG_SHARED_OVERRIDES }} />
      <div className="container">
        <div className="quick-facts">
          <div className="quick-facts-title">{title}</div>
          <div className="facts-grid">
            {facts.map((f) => (
              <div className="fact-item" key={f.label}>
                <span className="fact-label">{f.label}</span>
                <span className="fact-value">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface PortableTextRendererProps {
  content: BodyBlock[];
  facts?: PostFact[];
  factsTitle?: string;
}

export default function PortableTextRenderer({ content, facts, factsTitle }: PortableTextRendererProps) {
  if (!content) return null;
  const hasOwnCard = content.some((b) => b?._type === "rawHtml" && /class="quick-facts/.test(String((b as { html?: string }).html || "")));
  const card = !hasOwnCard && facts && facts.length > 0 ? <FactsCard title={factsTitle || "At a Glance"} facts={facts} /> : null;
  return (
    <div className="prose-admizz">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#001353]">
          Introduction
        </span>
        <span className="flex-1 h-px bg-[#001353]/20" />
      </div>
      {card}
      {content.some((b) => b?._type === "rawHtml") ? (
        <PortableText value={content as PortableTextBlock[]} components={components} />
      ) : (
        <PlainRichPost content={content} />
      )}
    </div>
  );
}
