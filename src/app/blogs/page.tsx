import Link from "next/link";
import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";
import type { SanityPost, BlogListItem, GeneratedPostManifestEntry } from "@/types";
import PostCard from "./PostCard";
import MoreArticles from "./MoreArticles";
import { fromSanityPost, fromGeneratedPost } from "./lib/normalize";
import generatedPostsData from "@/data/generated-posts.json";

export const metadata: Metadata = {
  title: "Blogs | Admizz Education",
  description:
    "Get expert study abroad guidance, from choosing the right university to visa support. Make your global education dream a reality today!",
  alternates: {
    canonical: "https://admizzeducation.com/blogs",
  },
  openGraph: {
    title: "Blogs | Admizz Education",
    description:
      "Get expert study abroad guidance, from choosing the right university to visa support. Make your global education dream a reality today!",
    url: "https://admizzeducation.com/blogs",
    siteName: "Admizz Education",
    images: ["/images/og/blog.webp"],
    type: "website",
  },
};

export default async function BlogsPage() {
  const sanityPosts: SanityPost[] = await client.fetch(allPostsQuery);
  const localPosts = (generatedPostsData as GeneratedPostManifestEntry[]).map(fromGeneratedPost);

  // Newest first, Sanity and locally-generated posts interleaved by real
  // publish date — neither source gets special placement.
  const posts: BlogListItem[] = [...sanityPosts.map(fromSanityPost), ...localPosts].sort((a, b) => {
    const at = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bt = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bt - at;
  });

  // Split into latest (first 6) and rest
  const latestPosts = posts.slice(0, 6);
  const remainingPosts = posts.slice(6);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
            Explore. Learn. Succeed
          </h1>
          <p className="mt-2 text-lg font-medium">Admizz Education Blogs</p>
          <p className="mt-3 text-[15px] text-white/80 max-w-2xl mx-auto">
            Explore our latest blog posts and get one step closer to your dream
            destination.
          </p>
        </div>
      </section>

      {/* ===== LATEST INSIGHTS ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Latest Insights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post, index) => (
              <PostCard key={post.key} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ALL POSTS WITH LOAD MORE ===== */}
      {remainingPosts.length > 0 && <MoreArticles posts={remainingPosts} />}

      {/* ===== CTA BANNER ===== */}
      <section className="relative py-14 md:py-20 overflow-hidden" style={{ background: "#FFFAED" }}>
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%)", backdropFilter: "blur(2px)" }} />
        <div className="hidden sm:block absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-40 z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)" }} />
        <div className="hidden sm:block absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-30 z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(13,18,130,0.1)", border: "1px solid rgba(13,18,130,0.2)" }}>
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                <span className="text-[13px] font-semibold tracking-wide" style={{ color: "#0D1282" }}>Accepting Applications</span>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-rubik), sans-serif", color: "#0D1282" }}>
                Ready to Build Your <span style={{ color: "#E8430C" }}>Global Career?</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-md mb-8" style={{ color: "rgba(13,18,130,0.7)" }}>
                Let our expert counselors guide you through university selection, applications, visas, and everything in between.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>24hr Response</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>Average reply time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Free Consultation</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>No commitment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Expert Team</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>10+ years experience</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/register" className="group block bg-white rounded-2xl p-6 md:p-7 transition-shadow hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#EEF2FF" }}>
                    <svg className="w-6 h-6" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  </div>
                  <svg className="w-5 h-5 text-[#0D1282] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>Schedule a Free Consultation</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">Book a free 30-minute call to discuss your study abroad goals and get expert recommendations.</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: "#0D1282" }}>
                  Book your slot
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
              <a href="mailto:hello@admizz.com" className="flex items-center justify-center gap-3 rounded-2xl px-5 py-3 w-full transition-colors hover:opacity-90" style={{ background: "rgba(13,18,130,0.1)", border: "1px solid rgba(13,18,130,0.2)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(13,18,130,0.1)" }}>
                  <svg className="w-4 h-4" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Email Us</p>
                  <p className="text-[13px] sm:text-[11px] truncate" style={{ color: "rgba(13,18,130,0.5)" }}>hello@admizz.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    
{/* SEOAI:FAQ:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<dl class=\"px-4 sm:px-6 lg:px-8\">\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">What changes are occurring for F-1 students regarding Duration of Status?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">As of July 22, 2026, the Department of Homeland Security ended Duration of Status for F-1 students. Starting September 2026, most international students will need to complete their US programs within 4 years or less.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">How many hours are international students allowed to work in different countries?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">In the UK, international students can work 20 hours per week, in Australia it's 48 hours per fortnight, New Zealand allows 25 hours, and Canada permits 24 hours. The page provides confirmed work hour limits for major study destinations.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">What should F-1 and J-1 students know about new visa rules?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">F-1 and J-1 students are urged to be aware of new visa rules that will take effect from September 15, 2026, and it is recommended to understand the changes and necessary actions to take now.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">What preparations are needed for a UK student visa interview?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">According to the UK Student Visa Interview Guide, UKVI cannot refuse a visa on genuineness grounds without an interview. There are 7 specific areas that caseworkers check during this interview.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">What should prospective international students consider beyond university rankings?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">The page suggests that global university rankings often focus on research output rather than job opportunities, visa eligibility, or pathways to permanent residency. It emphasizes checking 6 critical factors that matter when choosing a university abroad.</dd>\n  <dt class=\"text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6\">What is the new Short-Term Graduate Work Visa in New Zealand?</dt>\n  <dd class=\"mt-3 text-sm opacity-80 gap-2.5\">New Zealand has introduced a Short-Term Graduate Work Visa that offers graduates 6 months of open work rights for those who do not qualify for the Post Study Work Visa. Detailed eligibility and conditions are explained in the article.</dd>\n</dl>\n<script type=\"application/ld+json\">{\"@type\":\"FAQPage\",\"@context\":\"https://schema.org\",\"mainEntity\":[{\"name\":\"What changes are occurring for F-1 students regarding Duration of Status?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"As of July 22, 2026, the Department of Homeland Security ended Duration of Status for F-1 students. Starting September 2026, most international students will need to complete their US programs within 4 years or less.\",\"@type\":\"Answer\"}},{\"name\":\"How many hours are international students allowed to work in different countries?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"In the UK, international students can work 20 hours per week, in Australia it's 48 hours per fortnight, New Zealand allows 25 hours, and Canada permits 24 hours. The page provides confirmed work hour limits for major study destinations.\",\"@type\":\"Answer\"}},{\"name\":\"What should F-1 and J-1 students know about new visa rules?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"F-1 and J-1 students are urged to be aware of new visa rules that will take effect from September 15, 2026, and it is recommended to understand the changes and necessary actions to take now.\",\"@type\":\"Answer\"}},{\"name\":\"What preparations are needed for a UK student visa interview?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"According to the UK Student Visa Interview Guide, UKVI cannot refuse a visa on genuineness grounds without an interview. There are 7 specific areas that caseworkers check during this interview.\",\"@type\":\"Answer\"}},{\"name\":\"What should prospective international students consider beyond university rankings?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"The page suggests that global university rankings often focus on research output rather than job opportunities, visa eligibility, or pathways to permanent residency. It emphasizes checking 6 critical factors that matter when choosing a university abroad.\",\"@type\":\"Answer\"}},{\"name\":\"What is the new Short-Term Graduate Work Visa in New Zealand?\",\"@type\":\"Question\",\"acceptedAnswer\":{\"text\":\"New Zealand has introduced a Short-Term Graduate Work Visa that offers graduates 6 months of open work rights for those who do not qualify for the Post Study Work Visa. Detailed eligibility and conditions are explained in the article.\",\"@type\":\"Answer\"}}]}</script>" }} />{/* SEOAI:FAQ:END */}
</main>
  );
}
