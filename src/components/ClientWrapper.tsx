'use client';
import { useEffect } from "react";
import dynamic from 'next/dynamic';
import AOS from "aos";

const CustomCursor = dynamic(() => import('./CustomCursor'), {
  ssr: false,
});

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
      <CustomCursor />
      {children}
    </>
  );
} 