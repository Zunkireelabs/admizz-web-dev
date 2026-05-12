"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

/** Convert 2-letter country code → emoji flag (e.g. "us" → "🇺🇸") */
function toEmoji(code: string) {
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397)).join("");
}

const studyDestinations = [
  { name: "Study in the USA", href: "/study-in-the-usa", flag: "us" },
  { name: "Study in the UK", href: "/study-in-the-uk", flag: "gb" },
  { name: "Study in Australia", href: "/study-in-australia", flag: "au" },
  { name: "Study in Canada", href: "/study-in-canada", flag: "ca" },
  { name: "Study in New Zealand", href: "/study-in-newzealand", flag: "nz" },
  { name: "Study in Nepal", href: "/study-in-nepal", flag: "np" },
  { name: "Study in India", href: "/study-in-india", flag: "in" },
  { name: "Study in France", href: "/study-in-france", flag: "fr" },
  { name: "Study in Denmark", href: "/study-in-denmark", flag: "dk" },
  { name: "Study in UAE", href: "/study-in-dubai", flag: "ae" },
  { name: "Study in Germany", href: "/study-in-germany", flag: "de" },
  { name: "Study in Finland", href: "/study-in-finland", flag: "fi" },
];

const navLinks = [
  { name: "Test Prep", href: "/test-prep" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything on route change
  useEffect(() => {
    setDestOpen(false);
    setMobileOpen(false);
    setMobileDestOpen(false);
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = useCallback(() => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    setDestOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    leaveTimeout.current = setTimeout(() => setDestOpen(false), 150);
  }, []);

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logos/Admizz-Education-New-Logo-For-Light-Background.webp"
              alt="Admizz Education"
              width={179}
              height={58}
              quality={100}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden tablet:flex items-center gap-1">
            {/* Study Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="px-4 py-2 text-[15px] font-medium text-slate hover:text-navy transition-colors flex items-center gap-1">
                Study Destinations
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${destOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 12 8"
                >
                  <path d="M1 1L6 6L11 1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                className={`absolute top-full left-0 z-50 transition-all duration-200 ${
                  destOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="mt-2 bg-white rounded-lg shadow-lg border border-border-light p-3 w-[440px] max-w-[calc(100vw-2rem)] grid grid-cols-2">
                  {studyDestinations.map((dest) => (
                    <Link
                      key={dest.href}
                      href={dest.href}
                      onClick={() => setDestOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] text-slate hover:bg-off-white hover:text-blue-dark rounded-md transition-colors"
                    >
                      <span className="text-base leading-none shrink-0">{toEmoji(dest.flag)}</span>
                      {dest.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[15px] font-medium text-slate hover:text-navy transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Register CTA */}
            <Link
              href="/register"
              className="ml-4 bg-yellow text-black font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
            >
              Register
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="tablet:hidden p-3 -mr-3"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg
                className="w-6 h-6 text-navy"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-navy"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="tablet:hidden bg-white border-t border-border-light max-h-[calc(100dvh-70px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {/* Study Destinations Accordion */}
            <button
              className="w-full flex items-center justify-between px-3 py-3 text-[15px] font-medium text-slate"
              onClick={() => setMobileDestOpen(!mobileDestOpen)}
            >
              Study Destinations
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${mobileDestOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 12 8"
              >
                <path d="M1 1L6 6L11 1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {mobileDestOpen && (
              <div className="pl-4 space-y-1">
                {studyDestinations.map((dest) => (
                  <Link
                    key={dest.href}
                    href={dest.href}
                    className="flex items-center gap-3 px-3 py-3 text-[15px] text-gray-dark hover:text-blue-dark"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-lg leading-none shrink-0">{toEmoji(dest.flag)}</span>
                    {dest.name}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-3 text-[15px] font-medium text-slate hover:text-navy"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/register"
              className="block text-center bg-yellow text-black font-semibold text-[15px] px-6 py-3.5 rounded-[10px] mt-3"
              onClick={() => setMobileOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
