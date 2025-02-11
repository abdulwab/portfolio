'use client';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';
import Image from 'next/image';
import ChatDemo from '@/components/ChatDemo';
import ImageWithFallback from './ImageWithFallback';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm create @abdulwahab/project');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-h-screen w-full object-cover"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        {/* Overlay with blur and gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/80 to-[#0D1117] 
                      backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text and Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mb-8 inline-block">
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-accent-web
                            shadow-lg shadow-accent-web/20">
                <ImageWithFallback
                  src="/images/profile.jpeg"
                  fallbackSrc="/images/profile.jpeg"
                  alt="Abdul Wahab"
                  width={180}
                  height={180}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-accent-web text-white p-2 rounded-full
                            shadow-lg shadow-accent-web/20">
                <span className="text-xl">👋</span>
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-6 text-white">
              Hi, I'm Abdul Wahab
              <br />
              <span className="text-accent-web">
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'AI Engineer',
                    2000,
                    'IoT Specialist',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </h1>

            <p className="text-gray-200 text-lg mb-8 max-w-lg">
              I specialize in building intelligent web applications with modern technologies.
              Let's create something amazing together!
            </p>

            <motion.div 
              className="flex gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { level: 4, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
                { level: 8, href: 'mailto:your@email.com', label: 'Email' },
                { level: 12, href: 'tel:+1234567890', label: 'Phone' },
              ].map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`w-12 h-12 rounded-sm flex items-center justify-center transition-all
                    bg-[#0D1117] hover:scale-110 hover:shadow-lg
                    ${getContributionColor(link.level)}`}
                  aria-label={link.label}
                >
                  {getIconForLink(link.label)}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: AI Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -top-6 left-4 bg-[#161B22]/80 backdrop-blur-sm px-4 py-2 
                          rounded-full border border-[#808080] text-sm text-blue-500 font-bold">
              Ask me anything! 🤖
            </div>
            <ChatDemo />
          </motion.div>

          {/* Terminal Command */}
          <motion.div
            className="fixed bottom-8 right-8 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={handleCopy}
          >
            <div className="bg-[#0D1117] rounded-lg p-4 shadow-xl border border-[#30363D] hover:border-accent-web transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-sm text-github-text">terminal</div>
              </div>
              <div className="font-mono text-sm">
                <span className="text-accent-iot">$ </span>
                <span className="text-github-text">
                  {copied ? 'Copied! 📋' : 'npm create @abdulwahab/project'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function getContributionColor(level: number): string {
  const colors = {
    4: 'bg-[#0e4429] hover:bg-[#006d32]',
    8: 'bg-[#006d32] hover:bg-[#26a641]',
    12: 'bg-[#26a641] hover:bg-[#39d353]',
  };
  return colors[level as keyof typeof colors];
}

function getIconForLink(type: string) {
  switch (type) {
    case 'LinkedIn':
      return (
        <svg className="w-6 h-6 text-github-text" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'Email':
      return (
        <svg className="w-6 h-6 text-github-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'Phone':
      return (
        <svg className="w-6 h-6 text-github-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    default:
      return null;
  }
} 