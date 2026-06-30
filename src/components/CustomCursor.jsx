import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly position the small dot
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    // Smooth lerp animation for the outer ring
    const render = () => {
      const lerpFactor = 0.15; // Smooth factor
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      requestAnimationFrame(render);
    };

    // Hover scale effects on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.classList.contains('clickable') ||
        target.closest('input') ||
        target.closest('textarea');

      if (isClickable) {
        ring.style.width = '65px';
        ring.style.height = '65px';
        ring.style.borderColor = '#ef4444';
        ring.style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
        dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      }
    };

    const handleMouseOut = (e) => {
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(239, 68, 68, 0.45)';
      ring.style.backgroundColor = 'transparent';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    
    const animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="custom-cursor hidden md:block" />
      <div ref={cursorRingRef} className="custom-cursor-ring hidden md:block" />
    </>
  );
};

export default CustomCursor;
