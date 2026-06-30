import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

// Returns true when the user has asked the OS to reduce motion.
// Used to freeze 3D animations and disable tilt/magnetic effects.
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mql = window.matchMedia(QUERY);
    const onChange = (e) => setPrefersReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
};

export default usePrefersReducedMotion;
