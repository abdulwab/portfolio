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
    navigator.clipboard.writeText('npm create @abdulwahab/ai-agent');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="min-h-screen relative pt-20 pb-12 bg-gradient-to-br from-[#0D1117] via-[#0D1117] to-[#161B22]">
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
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-gradient-to-r from-[#58A6FF] to-[#10B981] relative">
                <Image
                  src="/images/profile.jpeg"
                  alt="Abdul Wahab"
                  width={144}
                  height={144}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#58A6FF]/10 to-[#10B981]/10" />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#58A6FF] to-[#10B981] p-2 rounded-full shadow-lg"
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-xl">🤖</span>
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="block mb-2 text-[#C9D1D9]">Hi, I&apos;m</span>
              <span className="bg-gradient-to-r from-[#58A6FF] via-[#10B981] to-[#F59E0B] bg-clip-text text-transparent">
                Abdul Wahab
              </span>
              <div className="min-h-[1.5em] mt-4 text-[#8B949E] text-2xl md:text-3xl">
                <TypeAnimation
                  sequence={[
                    'AI Agent Developer',
                    2000,
                    'LangChain Expert',
                    2000,
                    'Agentic Workflow Architect',
                    2000,
                    'IoT Solutions Engineer',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
            </motion.h1>

            <motion.p
              className="text-[#8B949E] text-lg mb-8 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Crafting intelligent autonomous systems with <span className="text-[#58A6FF] font-semibold">LangChain</span>, 
              <span className="text-[#10B981] font-semibold"> CrewAI</span>, and cutting-edge AI technologies. 
              Specializing in agentic workflows that bridge AI innovation with real-world IoT solutions.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { href: 'https://linkedin.com/in/abdul-wahab', label: 'LinkedIn', icon: '💼', color: 'from-[#0077B5] to-[#0077B5]' },
                { href: 'mailto:hello@abdulwahab.dev', label: 'Email', icon: '📧', color: 'from-[#EA4335] to-[#FBBC04]' },
                { href: 'https://github.com/abdul-wahab-dev', label: 'GitHub', icon: '🐙', color: 'from-[#333] to-[#666]' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group p-4 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#58A6FF]
                           transition-all duration-300 flex items-center gap-3 text-[#C9D1D9] hover:text-[#58A6FF]
                           hover:shadow-lg hover:shadow-[#58A6FF]/20 hover:scale-105"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {['LangChain', 'CrewAI', 'OpenAI', 'LangGraph', 'N8N'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 text-sm bg-gradient-to-r from-[#58A6FF]/20 to-[#10B981]/20 
                           border border-[#58A6FF]/30 rounded-full text-[#58A6FF] font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(88, 166, 255, 0.1)' }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative bg-[#161B22] rounded-2xl border border-[#30363D] p-6 shadow-2xl"
          >
            <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#58A6FF] to-[#10B981] px-4 py-1 rounded-full text-sm font-medium">
              🤖 AI Assistant v3.0
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
                        transition-colors font-mono text-sm flex items-center gap-3 shadow-lg">
              <span className="text-[#58A6FF]">$</span>
              <span className="text-[#8B949E]">
                {copied ? (
                  <span className="text-[#10B981] flex items-center gap-2">
                    <span>✅ Copied!</span>
                  </span>
                ) : (
                  'npm create @abdulwahab/ai-agent'
                )}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

