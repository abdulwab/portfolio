'use client';
import { motion } from 'framer-motion';

type ContactLink = {
  label: string;
  href: string;
  icon: JSX.Element;
  level: number; // 1-4 for contribution level colors
};

const contactLinks: ContactLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    level: 4
  },
  {
    label: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    level: 3
  },
  {
    label: 'Email',
    href: 'mailto:your@email.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    level: 2
  },
];

export default function Contact() {
  const getContributionColor = (level: number) => {
    switch (level) {
      case 1:
        return 'hover:bg-accent-web/20 border-accent-web/20';
      case 2:
        return 'hover:bg-accent-web/40 border-accent-web/40';
      case 3:
        return 'hover:bg-accent-web/60 border-accent-web/60';
      case 4:
        return 'hover:bg-accent-web/80 border-accent-web/80';
      default:
        return 'hover:bg-accent-web/20 border-accent-web/20';
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`aspect-square rounded-lg border-2 flex items-center justify-center
                       transition-all duration-300 group relative
                       ${getContributionColor(link.level)}`}
            >
              <div className="text-github-text group-hover:text-white transition-colors">
                {link.icon}
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-github-text
                           opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {link.label}
              </span>
            </a>
          ))}
        </motion.div>

        <motion.footer
          className="flex flex-col sm:flex-row items-center justify-between gap-4 
                   border-t border-[var(--border-primary)] pt-8 text-[var(--text-secondary)] text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>
            Built with{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" 
               className="text-accent-web hover:underline">
              Next.js
            </a>
            {' + '}
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer"
               className="text-accent-web hover:underline">
              Tailwind CSS
            </a>
          </p>
          
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border-2 border-[#30363D] hover:border-accent-web
                     bg-[#0D1117] transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>
        </motion.footer>
      </div>
    </section>
  );
} 