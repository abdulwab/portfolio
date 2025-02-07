'use client';
import { useEffect } from "react";
import dynamic from 'next/dynamic';
import AOS from "aos";

// Dynamically import CustomCursor with no SSR
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
      <CustomCursor />
      {children}
    </body>
  );
} 