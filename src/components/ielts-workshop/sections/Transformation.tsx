"use client";

import { motion, type Variants } from "framer-motion";
import { transformation } from "../content";
import Reveal from "../Reveal";

const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Transformation() {
  return (
    <section className="bg-off-white border-t border-border-light py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal>
          <h2
            className="text-3xl sm:text-4xl font-bold text-navy mb-12 text-center"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            The Transformation
          </h2>
        </Reveal>

        {/* One unified split panel — dull/dark vs vibrant/bright, photos underneath the color */}
        <Reveal>
          <div className="rounded-[20px] overflow-hidden shadow-lg grid sm:grid-cols-2">
            {/* Before — muted, dim */}
            <div className="relative p-8 sm:p-10">
              <div
                className="absolute inset-0 grayscale"
                style={{ backgroundImage: "url(/images/events/transformation/before.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-slate-900/75" aria-hidden="true" />
              <p className="relative text-3xl sm:text-4xl font-extrabold text-slate-400 mb-6">BEFORE</p>
              <motion.ul
                className="relative space-y-4"
                variants={listContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                {transformation.before.map((item) => (
                  <motion.li key={item} variants={listItem} className="text-slate-400 text-base sm:text-lg">
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* After — vibrant, bright */}
            <div className="relative p-8 sm:p-10">
              <div
                className="absolute inset-0"
                style={{ backgroundImage: "url(/images/events/transformation/after.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(0,19,83,0.85) 0%, rgba(13,18,130,0.8) 55%, rgba(49,66,156,0.75) 100%)" }}
                aria-hidden="true"
              />
              <p className="relative text-3xl sm:text-4xl font-extrabold text-yellow mb-6">AFTER</p>
              <motion.ul
                className="relative space-y-4"
                variants={listContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                {transformation.after.map((item) => (
                  <motion.li key={item} variants={listItem} className="text-white font-semibold text-base sm:text-lg">
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
