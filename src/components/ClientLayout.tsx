'use client';
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import { ThemeProvider } from './ThemeProvider';

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
      offset: 100,
    });
  }, []);

  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </body>
  );
} 