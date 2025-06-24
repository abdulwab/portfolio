'use client';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import ChatDemo from './ChatDemo';

// Hero Component
export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)] pt-16">
      <div className="container-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-screen max-h-screen overflow-hidden py-8">
          {/* Left Column - Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center h-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Image */}
            <motion.div
              className="mb-6 relative mx-auto lg:mx-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full p-1 bg-gradient-to-r 
                            from-[var(--accent-ai)] via-[var(--accent-iot)] to-[var(--accent-web)]">
                <div className="w-full h-full bg-[var(--background)] rounded-full p-1">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Abdul Wahab"
                    width={128}
                    height={128}
                    className="w-full h-full rounded-full object-cover shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="block mb-2 text-theme-primary">Hi, I&apos;m</span>
              <span className="gradient-text">
                Abdul Wahab
              </span>
              <div className="min-h-[1.2em] mt-3 text-theme-secondary text-xl md:text-2xl lg:text-3xl">
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
              className="text-theme-secondary text-base lg:text-lg mb-6 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Crafting intelligent autonomous systems with <span className="text-[var(--accent-ai)] font-semibold">LangChain</span>, 
              <span className="text-[var(--accent-iot)] font-semibold"> CrewAI</span>, and cutting-edge AI technologies. 
              Specializing in agentic workflows that bridge AI innovation with real-world IoT solutions.
            </motion.p>

            {/* Social Links - Horizontal compact layout */}
            <motion.div 
              className="flex flex-wrap gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { href: 'https://www.linkedin.com/in/abdul-wahab-7bb7b490/', label: 'LinkedIn', icon: '💼', external: true },
                { href: 'mailto:abdulwahabawan82@gmail.com', label: 'Email', icon: '📧', external: true },
                { href: 'https://github.com/abdulwab', label: 'GitHub', icon: '🐙', external: true },
                { href: 'https://wa.me/923219424726', label: 'WhatsApp', icon: '💬', external: true },
                { href: 'https://discord.com/users/abdulwahab726', label: 'Discord', icon: '🎮', external: true },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group p-3 rounded-lg bg-theme-card border border-[var(--card-border)] 
                           hover:border-[var(--accent-ai)] transition-all duration-300 flex items-center gap-2 
                           text-theme-primary hover:text-[var(--accent-ai)]
                           hover:shadow-lg hover:shadow-[var(--accent-ai)]/20 hover:scale-105"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span className="font-medium text-sm">{link.label}</span>
                </a>
              ))}
            </motion.div>

            {/* Tech Stack Pills - Compact */}
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {['LangChain', 'CrewAI', 'MCP Protocol', 'OpenAI Agent SDK', 'A2A Protocols', 'Google Agentic', 'AutoGen', 'LangGraph', 'N8N'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 text-xs bg-gradient-to-r from-[var(--accent-ai)]/20 to-[var(--accent-iot)]/20 
                           border border-[var(--accent-ai)]/30 rounded-full text-[var(--accent-ai)] font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Terminal - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-theme-card rounded-lg border border-[var(--card-border)] p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#27CA3F]"></div>
                  <span className="ml-3 text-theme-secondary text-xs">bash</span>
                </div>
                <div className="font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--accent-ai)]">$</span>
                    <TypeAnimation
                      sequence={[
                        'npm create @abdulwahab/ai-agent',
                        1000,
                        'npm create @abdulwahab/ai-agent\n✨ Setting up your AI agent...',
                        1000,
                        'npm create @abdulwahab/ai-agent\n✨ Setting up your AI agent...\n🚀 Ready to revolutionize automation!',
                        2000,
                      ]}
                      wrapper="span"
                      speed={75}
                      repeat={Infinity}
                      className="text-theme-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Chat Interface + CTA */}
          <motion.div
            className="lg:col-span-5 flex flex-col h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Chat Interface */}
            <motion.div
              className="relative bg-theme-card rounded-2xl border border-[var(--card-border)] shadow-2xl mb-6 flex-1 min-h-[400px] max-h-[500px]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute -top-3 left-4 bg-gradient-to-r from-[var(--accent-ai)] to-[var(--accent-iot)] 
                            px-4 py-1 rounded-full text-sm font-medium text-white">
                🤖 AI Assistant v3.0
              </div>
              <div className="p-4 h-full">
                <ChatDemo className="h-full" />
              </div>
            </motion.div>

            {/* CTA Consultation Button */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.a
                href="https://zcal.co/abdul-wahab/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-4 bg-gradient-to-r 
                         from-[var(--accent-ai)] to-[var(--accent-iot)] rounded-xl text-white 
                         font-semibold text-lg hover:shadow-xl hover:shadow-[var(--accent-ai)]/40
                         transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Book Free Consultation</span>
                  <div className="px-2 py-1 bg-white/20 rounded-full text-sm">
                    30 min
                  </div>
                </div>
              </motion.a>
              
              <motion.p 
                className="text-theme-secondary text-sm text-center max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                🚀 Let&apos;s discuss your AI agent project and explore how we can transform your ideas into reality
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

