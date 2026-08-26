"use client";

import { motion, type Variants } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Words matched exactly (case-sensitive) get the highlight color instead of inheriting text color. */
  highlightWords?: string[];
  highlightClassName?: string;
}

const container: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Splits text into words and reveals them one by one, rising up as they fade in.
export default function WordReveal({
  text,
  className = "",
  delay = 0,
  highlightWords = [],
  highlightClassName = "text-yellow",
}: WordRevealProps) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className={`inline-block mr-[0.25em] will-change-transform ${
            highlightWords.includes(w) ? highlightClassName : ""
          }`}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
