'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(target.matches('a, button, [role="button"]'));
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  // Don't render anything on the server side
  if (!mounted) return null;

  return (
    <div
      className={`cursor-dot ${isHovering ? 'scale-150' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s ease-out, scale 0.3s ease',
      }}
    />
  );
} 