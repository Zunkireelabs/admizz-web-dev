import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-[28px] font-bold text-navy mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold text-navy mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold text-navy mt-5 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base text-gray-dark leading-relaxed mb-4">{children}</p>
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
      <li className="text-base leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
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
      return (
        <div
          className="my-6 overflow-x-auto blog-table"
          dangerouslySetInnerHTML={{ __html: value.html }}
        />
      );
    },
  },
};

interface PortableTextRendererProps {
  content: any[];
}

export default function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content) return null;
  return (
    <div className="prose-admizz">
      <PortableText value={content} components={components} />
    </div>
  );
}
