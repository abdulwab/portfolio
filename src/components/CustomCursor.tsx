'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Optimize spring configuration for better responsiveness
  const springConfig = { 
    damping: 15, // Reduced from 25
    stiffness: 150, // Reduced from 700 for smoother movement
    mass: 0.1 // Added mass for better physics
  };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let rafId: number;
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e: MouseEvent) => {
      // Cancel any pending animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Use RequestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        const targetX = e.clientX - 16;
        const targetY = e.clientY - 16;

        // Interpolate position for smoother movement
        const x = lastX + (targetX - lastX) * 0.5;
        const y = lastY + (targetY - lastY) * 0.5;

        cursorX.set(x);
        cursorY.set(y);

        lastX = x;
        lastY = y;
      });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.body.style.cursor = 'none'; // Hide default cursor
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.style.cursor = 'auto'; // Show default cursor
    };

    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto'; // Reset cursor on cleanup
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        backfaceVisibility: 'hidden', // Prevent flickering
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      <motion.div
        className="w-full h-full rounded-full bg-white"
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          duration: 0.15,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
} 