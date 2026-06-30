import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const detectTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

/**
 * Standardized 3D tilt wrapper for cards (Projects, Skills).
 * Falls back to a plain div on touch devices and when reduced-motion is set,
 * so behaviour and click targets stay intact everywhere.
 */
const TiltCard = ({ children, className = '', onClick, ...rest }) => {
  const reducedMotion = usePrefersReducedMotion();
  const [isTouch] = useState(detectTouch);

  if (reducedMotion || isTouch) {
    return (
      <div className={className} onClick={onClick} {...rest}>
        {children}
      </div>
    );
  }

  // NOTE: react-parallax-tilt only forwards `className` and `style` to the DOM —
  // it drops `onClick`, `data-*`, etc. So the styled card (with its click handler
  // and AOS attribute) lives on an inner element; <Tilt> just provides the 3D wrapper.
  return (
    <Tilt
      className="h-full w-full"
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.02}
      transitionSpeed={1200}
      glareEnable
      glareMaxOpacity={0.18}
      glareColor="#ff5a5a"
      glarePosition="all"
      glareBorderRadius="1.5rem"
      gyroscope={false}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`h-full w-full ${className}`} onClick={onClick} {...rest}>
        {children}
      </div>
    </Tilt>
  );
};

export default TiltCard;
