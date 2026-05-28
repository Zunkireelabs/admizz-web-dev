"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import type { SanityPost } from "@/types";

const POSTS_PER_PAGE = 12;

export default function MoreArticles({ posts }: { posts: SanityPost[] }) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section className="bg-off-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
          More Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <PostCard key={post.slug.current} post={post} />
          ))}
        </div>
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 20)}
              className="bg-blue-royal text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-dark transition-colors cursor-pointer"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
