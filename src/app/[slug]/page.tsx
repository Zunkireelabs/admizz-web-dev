import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { allPostSlugsQuery, postBySlugQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { SanityPost } from "@/types";
import PortableTextRenderer from "@/components/PortableTextRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allPostSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) return {};

  const seo = post.seo;
  const title = seo?.metaTitle || post.title;
  const description = seo?.metaDescription || post.excerpt || "";
  const canonical =
    seo?.canonicalUrl || `https://admizzeducation.com/${post.slug.current}/`;

  const ogImage = seo?.ogImage
    ? urlFor(seo.ogImage).width(1200).height(630).url()
    : post.featuredImage
      ? urlFor(post.featuredImage).width(1200).height(630).url()
      : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Admizz Education",
      type: "article",
      ...(ogImage ? { images: [ogImage] } : {}),
      ...(post.publishedAt
        ? { publishedTime: post.publishedAt }
        : {}),
    },
    ...(seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const featuredImageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(630).auto("format").url()
    : null;

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <Link
                  key={cat.slug.current}
                  href={`/category/${cat.slug.current}/`}
                  className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-2xl md:text-[36px] font-bold leading-tight">
            {post.title}
          </h1>

          {formattedDate && (
            <p className="mt-3 text-white/70 text-sm">{formattedDate}</p>
          )}
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <article className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Featured Image */}
          {featuredImageUrl && (
            <img
              src={featuredImageUrl}
              alt={post.featuredImage?.alt || post.title}
              className="w-full rounded-lg mb-8"
            />
          )}

          {/* Body */}
          {post.content && <PortableTextRenderer content={post.content} />}
        </div>
      </article>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-bold">
            Ready to start your study abroad journey?
          </p>
          <p className="mt-2 text-white/80 text-sm">
            Get expert guidance from Admizz Education.
          </p>
          <Link
            href="/contact/"
            className="inline-block mt-6 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
