import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';
import { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Abdul Wahab - AI Agent Developer & IoT Solutions Engineer',
  description: 'Expert in AI Agents, LangChain, CrewAI, and IoT solutions. Crafting intelligent autonomous systems with cutting-edge AI technologies.',
  keywords: 'AI Agent Developer, LangChain, CrewAI, IoT Solutions, Automation, Abdul Wahab',
  authors: [{ name: 'Abdul Wahab' }],
  creator: 'Abdul Wahab',
  publisher: 'Abdul Wahab',
  robots: 'index, follow',
  openGraph: {
    title: 'Abdul Wahab - AI Agent Developer & IoT Solutions Engineer',
    description: 'Expert in AI Agents, LangChain, CrewAI, and IoT solutions. Crafting intelligent autonomous systems with cutting-edge AI technologies.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Wahab - AI Agent Developer & IoT Solutions Engineer',
    description: 'Expert in AI Agents, LangChain, CrewAI, and IoT solutions. Crafting intelligent autonomous systems with cutting-edge AI technologies.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: { url: '/favicon.svg', type: 'image/svg+xml' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
