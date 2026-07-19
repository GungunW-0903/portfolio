import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin glowing progress bar fixed to the very top of the viewport,
 * filling left → right as the page scrolls.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[100001] origin-left bg-gradient-to-r from-red-700 via-red-500 to-red-400 shadow-[0_0_12px_rgba(239,68,68,0.8)] pointer-events-none"
    />
  );
};

export default ScrollProgress;
