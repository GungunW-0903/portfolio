import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const detectTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

/**
 * Magnetic hover wrapper — gently pulls its child toward the cursor and
 * springs back on leave. No-op on touch devices / reduced-motion.
 * Renders an inline-block span so it can wrap buttons and links seamlessly.
 */
const Magnetic = ({ children, strength = 0.35, className = '' }) => {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [isTouch] = useState(detectTouch);

  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.5 });

  const handleMove = (e) => {
    if (reducedMotion || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reducedMotion || isTouch) {
    return <span className={`inline-block ${className}`}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

export default Magnetic;
