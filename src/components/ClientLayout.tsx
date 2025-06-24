'use client';
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import { ThemeProvider } from './ThemeProvider';
import CustomCursor from './CustomCursor';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    // Ensure page loads at the top
    window.scrollTo(0, 0);
    
    // Add loaded class to enable scrolling
    document.body.classList.add('loaded');
    
    // Handle hash navigation after page load
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#home') {
        // Clear the hash temporarily to prevent immediate scroll
        const originalHash = hash;
        window.history.replaceState(null, '', window.location.pathname);
        
        // After a brief delay, restore hash and scroll smoothly
        setTimeout(() => {
          window.history.replaceState(null, '', window.location.pathname + originalHash);
          const element = document.querySelector(originalHash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Handle initial load
    if (document.readyState === 'complete') {
      handleHashNavigation();
    } else {
      window.addEventListener('load', handleHashNavigation);
    }

    return () => {
      window.removeEventListener('load', handleHashNavigation);
      document.body.classList.remove('loaded');
    };
  }, []);

  return (
    <ThemeProvider>
      <CustomCursor />
      {children}
    </ThemeProvider>
  );
} 