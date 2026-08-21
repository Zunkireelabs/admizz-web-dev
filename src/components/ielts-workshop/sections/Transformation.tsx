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

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Before */}
          <Reveal>
            <div className="group rounded-[16px] overflow-hidden border border-border-light bg-white h-full">
              <div className="relative h-40">
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: "url(/images/events/transformation/before.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{ background: "linear-gradient(to top, rgba(30,41,59,0.35) 0%, rgba(30,41,59,0.1) 100%)" }}
                />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(220,38,38,0.3) 0%, rgba(220,38,38,0.08) 100%)" }} />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-medium mb-4 transition-colors duration-300 group-hover:text-red-500">
                  Before
                </p>
                <motion.ul
                  className="space-y-3"
                  variants={listContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  {transformation.before.map((item) => (
                    <motion.li key={item} variants={listItem} className="text-gray-dark text-[15px]">
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </Reveal>

          {/* After */}
          <Reveal delay={0.1}>
            <div className="group rounded-[16px] overflow-hidden border border-border-light bg-white h-full">
              <div className="relative h-40">
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: "url(/images/events/transformation/after.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{ background: "linear-gradient(to top, rgba(0,19,83,0.35) 0%, rgba(0,19,83,0.1) 100%)" }}
                />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(253,237,34,0.28) 0%, rgba(253,237,34,0.06) 100%)" }} />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-navy mb-4">
                  After
                </p>
                <motion.ul
                  className="space-y-3"
                  variants={listContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  {transformation.after.map((item) => (
                    <motion.li key={item} variants={listItem} className="text-gray-dark text-[15px] font-medium">
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
