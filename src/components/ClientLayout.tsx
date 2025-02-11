'use client';
import { useEffect } from "react";
import dynamic from 'next/dynamic';
import AOS from "aos";
import Navigation from './Navigation';

// Keep the import but comment out the CustomCursor component
const CustomCursor = dynamic(() => import('./CustomCursor'), {
  ssr: false,
});

export default function ClientLayout({
  children,
  geistSans,
  geistMono,
}: {
  children: React.ReactNode;
  geistSans: { variable: string };
  geistMono: { variable: string };
}) {
  useEffect(() => {
    import('aos/dist/aos.css');
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* Temporarily comment out CustomCursor */}
      {/* <CustomCursor /> */}
      <Navigation />
      {children}
    </body>
  );
} 