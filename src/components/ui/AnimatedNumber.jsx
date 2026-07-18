import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/**
 * Counts a numeric value up from 0 when it scrolls into view.
 * Accepts strings like "250+", "1480+", "240+ Commits", "2 Merged".
 * Non-numeric values (e.g. "C++, Java") render unchanged.
 */
const AnimatedNumber = ({ value, className = '', duration = 1300 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  const match = String(value).match(/^(\D*)(\d[\d,]*)(.*)$/);
  const target = match ? parseInt(match[2].replace(/,/g, ''), 10) : null;

  useEffect(() => {
    if (target === null || !inView || reducedMotion) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reducedMotion, duration]);

  if (target === null) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  // Reduced motion: render the final value directly, no count-up.
  const shown = reducedMotion ? target : display;

  return (
    <span ref={ref} className={className}>
      {match[1]}{shown.toLocaleString()}{match[3]}
    </span>
  );
};

export default AnimatedNumber;
