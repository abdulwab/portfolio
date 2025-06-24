import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';
import { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = 'https://abdulwahab.live';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Abdul Wahab - AI Agent Developer & IoT Solutions Engineer',
    template: '%s | Abdul Wahab'
  },
  description: 'Expert AI Agent Developer specializing in LangChain, CrewAI, and IoT solutions. Building intelligent autonomous systems and smart automation solutions. 5+ years experience in AI/ML, Python, and embedded systems.',
  keywords: [
    'AI Agent Developer',
    'LangChain Developer',
    'CrewAI Expert',
    'IoT Solutions Engineer',
    'AI Automation',
    'Machine Learning Engineer',
    'Python Developer',
    'Smart Home Automation',
    'AI Chatbot Development',
    'Multi-Agent Systems',
    'Abdul Wahab',
    'AI Consultant',
    'Embedded Systems',
    'MQTT Developer',
    'AI Integration'
  ],
  authors: [{ name: 'Abdul Wahab', url: siteUrl }],
  creator: 'Abdul Wahab',
  publisher: 'Abdul Wahab',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Abdul Wahab Portfolio',
    title: 'Abdul Wahab - AI Agent Developer & IoT Solutions Engineer',
    description: 'Expert AI Agent Developer specializing in LangChain, CrewAI, and IoT solutions. Building intelligent autonomous systems and smart automation solutions.',
    images: [
      {
        url: `${siteUrl}/images/profile.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Abdul Wahab - AI Agent Developer',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Wahab - AI Agent Developer & IoT Solutions Engineer',
    description: 'Expert AI Agent Developer specializing in LangChain, CrewAI, and IoT solutions. Building intelligent autonomous systems.',
    images: [`${siteUrl}/images/profile.jpeg`],
    creator: '@abdulwahab', // Add your Twitter handle if you have one
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: { url: '/favicon.svg', type: 'image/svg+xml' },
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'Technology',
  classification: 'AI Development, IoT Solutions, Software Engineering',
  other: {
    'geo.region': 'PK', // Pakistan country code
    'geo.placename': 'Pakistan',
    'ICBM': '30.3753,69.3451', // Approximate coordinates for Pakistan
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abdul Wahab',
    jobTitle: 'AI Agent Developer & IoT Solutions Engineer',
    description: 'Expert AI Agent Developer specializing in LangChain, CrewAI, and IoT solutions.',
    url: siteUrl,
    image: `${siteUrl}/images/profile.jpeg`,
    sameAs: [
      'https://linkedin.com/in/abdul-wahab-awan',
      'https://github.com/abdul-wahab-awan',
      // Add your social media profiles
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance AI Developer'
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'LangChain',
      'CrewAI',
      'IoT Solutions',
      'Python Development',
      'AI Agents',
      'Automation',
      'Smart Home Systems',
      'MQTT',
      'Embedded Systems'
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Your University Name' // Add your educational background
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK'
    },
    email: 'abdulwahabawan82@gmail.com',
    telephone: '+92-XXX-XXXXXXX' // Add your phone if you want
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="canonical" href={siteUrl} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#10b981" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
