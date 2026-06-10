"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scoped animation runner for the India "from Nepal" page.
 *
 * Looks up elements by `data-anim` attribute and wires GSAP ScrollTriggers.
 * Honors prefers-reduced-motion. Each animation fires once.
 *
 * Supported data-anim values:
 *   - hero-stagger          : staggered entrance on mount (no scroll trigger)
 *   - hero-image            : slow ken-burns zoom on the hero background
 *   - count-up              : numbers count from 0 to data-anim-value
 *   - fade-up               : single element fade + lift on enter
 *   - stagger-fade-up       : children stagger fade + lift on enter
 *   - row-slide             : children slide in from left on enter
 *   - rotate-on-scroll      : continuous rotation tied to scroll position
 *   - word-reveal           : split heading reveals word-by-word
 */
export default function IndiaAnimations() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero entrance — children stagger in on mount
      document.querySelectorAll<HTMLElement>("[data-anim='hero-stagger']").forEach((root) => {
        const items = root.querySelectorAll<HTMLElement>("[data-anim-child]");
        gsap.from(items, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.15,
        });
      });

      // Hero image slow zoom
      document.querySelectorAll<HTMLElement>("[data-anim='hero-image']").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.08 },
          { scale: 1, duration: 12, ease: "power1.out" }
        );
      });

      // Count-up numbers
      document.querySelectorAll<HTMLElement>("[data-anim='count-up']").forEach((el) => {
        const raw = el.getAttribute("data-anim-value") || el.textContent || "0";
        const match = raw.match(/([\d,.]+)/);
        if (!match) return;
        const target = parseFloat(match[1].replace(/,/g, ""));
        const prefix = raw.substring(0, raw.indexOf(match[1]));
        const suffix = raw.substring(raw.indexOf(match[1]) + match[1].length);
        const isInt = Number.isInteger(target);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            const val = isInt
              ? Math.round(obj.v).toLocaleString()
              : obj.v.toFixed(1);
            el.textContent = `${prefix}${val}${suffix}`;
          },
        });
      });

      // Single fade-up
      document.querySelectorAll<HTMLElement>("[data-anim='fade-up']").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Stagger fade-up on children
      document.querySelectorAll<HTMLElement>("[data-anim='stagger-fade-up']").forEach((root) => {
        const items = root.querySelectorAll<HTMLElement>("[data-anim-child]");
        const targets = items.length ? items : root.children;
        gsap.from(targets, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        });
      });

      // Row slide-in
      document.querySelectorAll<HTMLElement>("[data-anim='row-slide']").forEach((root) => {
        const items = root.querySelectorAll<HTMLElement>("tr, [data-anim-child]");
        gsap.from(items, {
          x: -28,
          opacity: 0,
          duration: 0.55,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        });
      });

      // Rotate-on-scroll (chakra dividers)
      document.querySelectorAll<HTMLElement>("[data-anim='rotate-on-scroll']").forEach((el) => {
        gsap.to(el, {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      // Word reveal — splits textContent by spaces, wraps each in span, animates
      document.querySelectorAll<HTMLElement>("[data-anim='word-reveal']").forEach((el) => {
        const text = el.textContent || "";
        const words = text.split(/\s+/).filter(Boolean);
        el.innerHTML = words
          .map((w) => `<span class="inline-block" style="will-change:transform,opacity">${w}</span>`)
          .join(" ");
        gsap.from(el.querySelectorAll("span"), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Refresh after fonts/images load so positions are accurate
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return null;
}
