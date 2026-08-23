"use client";

import { motion, useScroll } from "motion/react";

export function ScrollProgressRail() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden
      className="hidden sm:block fixed left-0 top-0 bottom-0 w-[3px] z-40 pointer-events-none"
    >
      <motion.div
        className="w-full h-full bg-charcoal mix-blend-difference"
        style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
        initial={false}
      />
    </div>
  );
}
