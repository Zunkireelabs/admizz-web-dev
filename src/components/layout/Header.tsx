"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const studyDestinations = [
  { name: "Study in the USA", href: "/study-in-the-usa/" },
  { name: "Study in the UK", href: "/study-in-the-uk/" },
  { name: "Study in Australia", href: "/study-in-australia/" },
  { name: "Study in Canada", href: "/study-in-canada/" },
  { name: "Study in New Zealand", href: "/study-in-newzealand/" },
  { name: "Study in South Korea", href: "/study-in-south-korea/" },
  { name: "Study in India", href: "/study-in-india/" },
  { name: "Study in France", href: "/study-in-france/" },
  { name: "Study in Denmark", href: "/study-in-denmark/" },
  { name: "Study in Dubai", href: "/study-in-dubai/" },
];

const navLinks = [
  { name: "Test Prep", href: "/test-prep/" },
  { name: "About", href: "/about/" },
  { name: "Blogs", href: "/blogs/" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logos/Admizz-Education-New-Logo-For-Light-Background-179x58.webp"
              alt="Admizz Education"
              width={179}
              height={58}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden tablet:flex items-center gap-1">
            {/* Study Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDestOpen(true)}
              onMouseLeave={() => setDestOpen(false)}
            >
              <button className="px-4 py-2 text-[15px] font-medium text-slate hover:text-navy transition-colors flex items-center gap-1">
                Study Destinations
                <svg
                  className={`w-4 h-4 transition-transform ${destOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {destOpen && (
                <div className="absolute top-full left-0 bg-white rounded-lg shadow-lg border border-border-light py-2 min-w-[240px] z-50">
                  {studyDestinations.map((dest) => (
                    <Link
                      key={dest.href}
                      href={dest.href}
                      className="block px-4 py-2.5 text-[14px] text-slate hover:bg-off-white hover:text-blue-dark transition-colors"
                    >
                      {dest.name}
                    </Link>
                  ))}
                </div>
              )}
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
              href="/register/"
              className="ml-4 bg-yellow text-black font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
            >
              Register
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="tablet:hidden p-2"
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
        <div className="tablet:hidden bg-white border-t border-border-light">
          <div className="px-4 py-4 space-y-1">
            {/* Study Destinations Accordion */}
            <button
              className="w-full flex items-center justify-between px-3 py-3 text-[15px] font-medium text-slate"
              onClick={() => setMobileDestOpen(!mobileDestOpen)}
            >
              Study Destinations
              <svg
                className={`w-4 h-4 transition-transform ${mobileDestOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {mobileDestOpen && (
              <div className="pl-4 space-y-1">
                {studyDestinations.map((dest) => (
                  <Link
                    key={dest.href}
                    href={dest.href}
                    className="block px-3 py-2 text-[14px] text-gray-dark hover:text-blue-dark"
                    onClick={() => setMobileOpen(false)}
                  >
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
              href="/register/"
              className="block text-center bg-yellow text-black font-semibold text-[15px] px-6 py-2.5 rounded-[10px] mt-3"
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
