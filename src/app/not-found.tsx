import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Admizz Education",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-7xl sm:text-8xl font-bold text-blue-royal mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
        Page Not Found
      </h2>
      <p className="text-gray-500 max-w-md mb-8">
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-block bg-blue-royal text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          href="/contact"
          className="inline-block border-2 border-blue-royal text-blue-royal font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-royal hover:text-white transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
