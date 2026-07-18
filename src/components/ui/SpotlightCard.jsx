import React, { useRef } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/**
 * Premium card surface with a soft radial glow that follows the cursor,
 * plus a border that lights up on hover. Composes with any card className.
 * Updates the overlay via a ref (no React re-render on mouse move).
 */
const SpotlightCard = ({
  children,
  className = '',
  onClick,
  spotlightColor = 'rgba(239,68,68,0.16)',
  ...rest
}) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const handleMove = (e) => {
    if (reducedMotion || !cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(560px circle at ${x}px ${y}px, ${spotlightColor}, transparent 42%)`;
  };

  const setGlow = (visible) => {
    if (glowRef.current) glowRef.current.style.opacity = visible ? '1' : '0';
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setGlow(true)}
      onMouseLeave={() => setGlow(false)}
      className={`relative ${className}`}
      {...rest}
    >
      {/* Cursor-tracking glow layer (clipped to the card's radius). */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
