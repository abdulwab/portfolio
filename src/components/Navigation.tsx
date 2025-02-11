'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

type NavItem = {
  label: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

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
    label: 'Skills',
    href: '#skills',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    label: 'Experience',
    href: '#experience',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hasScrolled, setHasScrolled] = useState(false);
  const [position, setPosition] = useState({ x: 32, y: window.innerHeight / 2 });
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);
  const pathname = usePathname();
  const { theme } = useTheme();

  // Get active section from pathname
  const activeSectionFromPath = pathname?.split('#')[1] || 'home';

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bgColor = theme === 'dark' 
    ? 'bg-white/95' 
    : 'bg-[#0D1117]/95';

  const textColor = theme === 'dark'
    ? 'text-[#0D1117]'
    : 'text-white';

  const hoverBgColor = theme === 'dark'
    ? 'hover:bg-gray-100'
    : 'hover:bg-[#161B22]';

  const activeBgColor = theme === 'dark'
    ? 'bg-accent-web/10'
    : 'bg-accent-web/20';

  const activeTextColor = theme === 'dark'
    ? 'text-accent-web'
    : 'text-accent-web';

  const inactiveTextColor = theme === 'dark'
    ? 'text-gray-600 hover:text-accent-web'
    : 'text-gray-400 hover:text-accent-web';

  const borderColor = theme === 'dark'
    ? 'border-gray-200'
    : 'border-[#30363D]';

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${hasScrolled ? `${bgColor} backdrop-blur-sm border-b ${borderColor} h-16` : 'h-20 bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="#home" className={`text-xl font-bold ${activeTextColor}`}>
          AW
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleClick(item.href)}
              className={`px-4 py-2 rounded-lg transition-all duration-300
                ${activeSection === item.href.slice(1)
                  ? `${activeTextColor} ${activeBgColor} font-medium border border-accent-web/30`
                  : `${inactiveTextColor} ${hoverBgColor}`
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-lg ${hoverBgColor} ${activeTextColor}`}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              <motion.nav
                className={`fixed right-0 top-0 bottom-0 w-64 ${bgColor} border-l ${borderColor}
                         p-6 flex flex-col gap-4`}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      handleClick(item.href);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300
                      ${activeSection === item.href.slice(1)
                        ? `${activeTextColor} ${activeBgColor} font-medium border border-accent-web/30`
                        : `${inactiveTextColor} ${hoverBgColor}`
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
} 