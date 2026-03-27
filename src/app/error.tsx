"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);

    // Auto-reload once on chunk loading / navigation errors (stale cache after deploy)
    const isChunkError =
      error.message?.includes("Loading chunk") ||
      error.message?.includes("Failed to fetch") ||
      error.message?.includes("Unexpected token") ||
      error.message?.includes("dynamically imported module") ||
      error.name === "ChunkLoadError";

    if (isChunkError) {
      const reloadKey = "error_auto_reload";
      const alreadyReloaded = sessionStorage.getItem(reloadKey);

      if (!alreadyReloaded) {
        sessionStorage.setItem(reloadKey, "1");
        window.location.reload();
        return;
      }

      // Clear the flag so future navigations can auto-reload again
      sessionStorage.removeItem(reloadKey);
    }
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-sm text-gray-500 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </main>
  );
}
