'use client';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

interface FooterProps {
  showTerminal?: boolean;
}

export default function Footer({ showTerminal = false }: FooterProps) {
  return (
    <footer className="bg-[var(--background-secondary)] border-t border-[var(--border-primary)]">
      <div className="container-center py-12">
        {/* Terminal Section */}
        {showTerminal && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-theme-card rounded-lg border border-[var(--card-border)] p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27CA3F]"></div>
                  <span className="ml-4 text-theme-secondary text-sm">Terminal</span>
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
            </div>
          </motion.div>
        )}

        {/* Footer Content */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">Abdul Wahab</h3>
            <p className="text-theme-secondary">
              AI Agent Developer • IoT Solutions Engineer • Automation Expert
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a href="#home" className="text-theme-secondary hover:text-[var(--accent-ai)] transition-colors">
              Home
            </a>
            <a href="#ai-agents" className="text-theme-secondary hover:text-[var(--accent-ai)] transition-colors">
              AI Agents
            </a>
            <a href="#skills" className="text-theme-secondary hover:text-[var(--accent-ai)] transition-colors">
              Skills
            </a>
            <a href="#iot" className="text-theme-secondary hover:text-[var(--accent-ai)] transition-colors">
              IoT Solutions
            </a>
            <a href="#projects" className="text-theme-secondary hover:text-[var(--accent-ai)] transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-theme-secondary hover:text-[var(--accent-ai)] transition-colors">
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { href: 'https://www.linkedin.com/in/abdul-wahab-7bb7b490/', icon: '💼', label: 'LinkedIn' },
              { href: 'https://github.com/abdulwab', icon: '🐙', label: 'GitHub' },
              { href: 'mailto:abdulwahabawan82@gmail.com', icon: '📧', label: 'Email' },
              { href: 'https://wa.me/923219424726', icon: '💬', label: 'WhatsApp' },
              { href: 'https://discord.com/users/abdulwahab726', icon: '🎮', label: 'Discord' },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-theme-card border border-[var(--card-border)]
                         flex items-center justify-center text-theme-secondary hover:text-[var(--accent-ai)]
                         hover:border-[var(--accent-ai)] transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{link.icon}</span>
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-[var(--border-primary)]">
            <p className="text-theme-secondary text-sm">
              © {new Date().getFullYear()} Abdul Wahab. Crafted with passion for AI innovation and automation excellence.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 