import { useEffect, useRef } from 'react';

export function useMagneticEffect(strength: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      const deltaX = (x - centerX) * strength;
      const deltaY = (y - centerY) * strength;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
} 