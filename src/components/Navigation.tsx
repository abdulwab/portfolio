'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '#home',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    label: 'AI Agents',
    href: '#ai-agents',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    label: 'Skills',
    href: '#skills',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    label: 'IoT Solutions',
    href: '#iot',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function Navigation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Update URL without triggering scroll
    window.history.pushState(null, '', href);
    
    // Smooth scroll to target
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 bg-[var(--background)]/95 backdrop-blur-md 
                 border-b border-[var(--border-primary)]/50 transition-colors duration-300"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <a 
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-ai)] to-[var(--accent-iot)] 
                       bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              AW
            </a>
            
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group relative px-4 py-2 rounded-xl text-theme-secondary 
                           hover:text-theme-primary transition-all duration-300 
                           hover:bg-[var(--hover-bg)]"
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {hoveredItem === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 
                               bg-gradient-to-r from-[var(--accent-ai)] to-[var(--accent-iot)] rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden lg:flex items-center gap-2 px-6 py-2 bg-gradient-to-r 
                       from-[var(--accent-ai)] to-[var(--accent-iot)] rounded-xl text-white 
                       font-medium hover:shadow-lg hover:shadow-[var(--accent-ai)]/30
                       transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🤖</span>
              <span>Let&apos;s Build AI</span>
            </motion.a>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-[var(--background)]/95 
                 backdrop-blur-md border-t border-[var(--border-primary)]/50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex flex-col items-center p-2 text-theme-secondary 
                       hover:text-[var(--accent-ai)] transition-colors duration-300"
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  );
}