"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const LINKS = [
  { href: "#schedule", label: "Schedule" },
  { href: "#bracket", label: "Bracket" },
  { href: "#standings", label: "Standings" },
  { href: "#scorers", label: "Scorers" },
];

function NavLinks() {
  return (
    <>
      <a href="#match" className="wc-nav-link wc-nav-link--predict">
        Predict
      </a>
      {LINKS.map((l) => (
        <a key={l.href} href={l.href} className="wc-nav-link">
          {l.label}
        </a>
      ))}
    </>
  );
}

export default function FloatingNav() {
  const [stuck, setStuck] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Use the actual hero element's height as the threshold — sticky only appears
    // once the hero has fully scrolled past the viewport top. No overlap with inline nav.
    let threshold = window.innerHeight;
    const recalcThreshold = () => {
      const hero = document.querySelector(".wc-hero") as HTMLElement | null;
      threshold = hero ? hero.offsetHeight : window.innerHeight;
    };
    const onScroll = () => {
      setStuck(window.scrollY > threshold);
    };
    const onResize = () => {
      recalcThreshold();
      onScroll();
    };
    recalcThreshold();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Inline nav stays in the hero (in the React tree)
  // Sticky nav is portal'd to document.body — escapes the hero's transform/parallax
  // so position: fixed actually works relative to the viewport.
  const stickyEl = (
    <div
      className={`wc-nav-sticky${stuck ? " wc-nav-sticky--shown" : ""}`}
      aria-hidden={!stuck}
    >
      <div className="wc-nav-inner">
        <NavLinks />
      </div>
    </div>
  );

  return (
    <>
      <div className="wc-nav">
        <div className="wc-nav-inner">
          <NavLinks />
        </div>
      </div>
      {mounted && typeof document !== "undefined"
        ? createPortal(stickyEl, document.body)
        : null}
    </>
  );
}
