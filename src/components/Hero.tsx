'use client';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import ChatDemo from './ChatDemo';

// Hero Component
export default function Hero() {
  return (
    <section className="section-spacing bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
      <div className="container-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Column */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Image */}
            <motion.div
              className="mb-8 relative mx-auto lg:mx-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-r 
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
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="block mb-2 text-theme-primary">Hi, I&apos;m</span>
              <span className="gradient-text">
                Abdul Wahab
              </span>
              <div className="min-h-[1.5em] mt-4 text-theme-secondary text-2xl md:text-3xl">
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
              className="text-theme-secondary text-lg mb-8 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Crafting intelligent autonomous systems with <span className="text-[var(--accent-ai)] font-semibold">LangChain</span>, 
              <span className="text-[var(--accent-iot)] font-semibold"> CrewAI</span>, and cutting-edge AI technologies. 
              Specializing in agentic workflows that bridge AI innovation with real-world IoT solutions.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { href: 'https://www.linkedin.com/in/abdul-wahab-7bb7b490/', label: 'LinkedIn', icon: '💼', color: 'from-[#0077B5] to-[#0077B5]', external: true },
                { href: 'mailto:abdulwahabawan82@gmail.com', label: 'Email', icon: '📧', color: 'from-[#EA4335] to-[#FBBC04]', external: true },
                { href: 'https://github.com/abdulwab', label: 'GitHub', icon: '🐙', color: 'from-[#333] to-[#666]', external: true },
                { href: 'https://wa.me/923219424726', label: 'WhatsApp', icon: '💬', color: 'from-[#25D366] to-[#128C7E]', external: true },
                { href: 'https://discord.com/users/abdulwahab726', label: 'Discord', icon: '🎮', color: 'from-[#5865F2] to-[#7289DA]', external: true },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group p-4 rounded-xl bg-theme-card border border-[var(--card-border)] 
                           hover:border-[var(--accent-ai)] transition-all duration-300 flex items-center gap-3 
                           text-theme-primary hover:text-[var(--accent-ai)]
                           hover:shadow-lg hover:shadow-[var(--accent-ai)]/20 hover:scale-105"
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
              {['LangChain', 'CrewAI', 'MCP Protocol', 'OpenAI Agent SDK', 'A2A Protocols', 'Google Agentic', 'AutoGen', 'LangGraph', 'N8N'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 text-sm bg-gradient-to-r from-[var(--accent-ai)]/20 to-[var(--accent-iot)]/20 
                           border border-[var(--accent-ai)]/30 rounded-full text-[var(--accent-ai)] font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
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
            className="relative bg-theme-card rounded-2xl border border-[var(--card-border)] p-6 shadow-2xl"
          >
            <div className="absolute -top-3 left-4 bg-gradient-to-r from-[var(--accent-ai)] to-[var(--accent-iot)] 
                          px-4 py-1 rounded-full text-sm font-medium text-white">
              🤖 AI Assistant v3.0
            </div>
            <ChatDemo />
          </motion.div>

          {/* Terminal */}
          <motion.div
            className="lg:col-span-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-theme-card rounded-xl border border-[var(--card-border)] p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27CA3F]"></div>
                <span className="ml-4 text-theme-secondary text-sm">bash</span>
              </div>
              <div className="font-mono text-sm">
                <div className="flex items-center gap-2 mb-2">
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
        </div>
      </div>
    </section>
  );
}

