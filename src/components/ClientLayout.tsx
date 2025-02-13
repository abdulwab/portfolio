'use client';
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

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
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
      {children}
    </body>
  );
} 