import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <ClientLayout geistSans={inter} geistMono={inter}>
        {children}
      </ClientLayout>
    </html>
  );
}
