'use client';
import { useEffect } from "react";
import AOS from "aos";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import('aos/dist/aos.css');
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      {children}
    </>
  );
} 