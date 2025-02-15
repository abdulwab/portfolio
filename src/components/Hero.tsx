'use client';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import ChatDemo from '@/components/ChatDemo';
import { useState } from 'react';

// Hero Component
export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm create @abdulwahab/project');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="min-h-screen relative pt-20 pb-12 bg-[#0D1117]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative mb-8 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#58A6FF] relative">
                <Image
                  src="/images/profile.jpeg"
                  alt="Abdul Wahab"
                  width={144}
                  height={144}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[#58A6FF]/10" />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 bg-[#58A6FF] p-2 rounded-full shadow-lg"
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-xl">👋</span>
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="block mb-2 text-[#C9D1D9]">Hi, I&apos;m</span>
              <span className="bg-gradient-to-r from-[#58A6FF] to-[#10B981] bg-clip-text text-transparent">
                Abdul Wahab
              </span>
              <div className="min-h-[1.5em] mt-4 text-[#8B949E] text-2xl md:text-3xl">
                <TypeAnimation
                  sequence={[
                    'Full-Stack Engineer',
                    2000,
                    'AI Agent Developer',
                    2000,
                    'IoT Solutions Architect',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
            </motion.h1>

            <motion.p
              className="text-[#8B949E] text-lg mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Building intelligent systems at the intersection of AI, IoT, and modern web development.
            </motion.p>

            <motion.div 
              className="flex gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { href: 'https://linkedin.com', label: 'LinkedIn', icon: '👔' },
                { href: 'mailto:email', label: 'Email', icon: '📧' },
                { href: 'tel:+1234567890', label: 'Phone', icon: '📱' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="p-3 rounded-lg bg-[#161B22] border border-[#30363D] hover:border-[#58A6FF]
                           transition-all flex items-center gap-2 text-[#C9D1D9] hover:text-[#58A6FF]"
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative bg-[#161B22] rounded-xl border border-[#30363D] p-6 shadow-2xl"
          >
            <div className="absolute -top-3 left-4 bg-[#58A6FF] px-4 py-1 rounded-full text-sm font-medium">
              AI Assistant v2.3
            </div>
            <ChatDemo />
          </motion.div>

          {/* Terminal */}
          <motion.div
            className="fixed bottom-8 right-8 cursor-pointer z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleCopy}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-[#161B22] rounded-lg p-4 border border-[#30363D] hover:border-[#58A6FF]
                        transition-colors font-mono text-sm flex items-center gap-3">
              <span className="text-[#58A6FF]">$</span>
              <span className="text-[#8B949E]">
                {copied ? (
                  <span className="text-[#10B981] flex items-center gap-2">
                    <span>✅ Copied!</span>
                  </span>
                ) : (
                  'npm create @abdulwahab/project'
                )}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
