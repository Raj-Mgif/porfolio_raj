import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    
    let mouse = { x: 0, y: 0 };
    let ringPos = { x: 0, y: 0 };
    
    // Set up cursor
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Instantly move dot
      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const render = () => {
      // Lerp ring
      ringPos.x += (mouse.x - ringPos.x) * 0.12;
      ringPos.y += (mouse.y - ringPos.y) * 0.12;
      
      gsap.set(ring, {
        x: ringPos.x,
        y: ringPos.y
      });
      
      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const rafId = requestAnimationFrame(render);

    // Add hover effect
    const addHoverEffect = () => {
      const interactiveElements = document.querySelectorAll('a, button');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(dot, { scale: 0, duration: 0.2 });
          gsap.to(ring, { scale: 2.5, backgroundColor: 'rgba(200, 169, 110, 0.1)', duration: 0.3 });
        });
        
        el.addEventListener('mouseleave', () => {
          gsap.to(dot, { scale: 1, duration: 0.2 });
          gsap.to(ring, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
        });
      });
    };

    // Need a timeout to let react render elements first
    setTimeout(addHoverEffect, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      />
      <div 
        ref={ringRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: '1.5px solid var(--accent)',
          borderRadius: '50%',
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'background-color 0.3s ease'
        }}
      />
    </>
  );
}
