'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
  const [position, setPosition] = useState({ x: 32, y: window.innerHeight / 2 });
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

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

  return (
    <>
      {/* Drag Constraints */}
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none"
      />

      {/* Desktop Navigation - Now Draggable */}
      <motion.nav
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragElastic={0}
        initial={false}
        animate={{
          x: position.x,
          y: position.y,
        }}
        onDragEnd={(event, info) => {
          setPosition({ x: info.point.x, y: info.point.y });
        }}
        className="hidden lg:flex fixed flex-col gap-6 z-50
                  bg-[#0D1117]/95 backdrop-blur-sm p-5 rounded-2xl cursor-move
                  border-2 border-[#30363D] hover:border-accent-web transition-all duration-300
                  shadow-xl shadow-black/20"
        style={{
          touchAction: 'none',
          transform: `translate(-50%, -50%)`,
        }}
      >
        {/* Drag Handle */}
        <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center
                      border-b border-[#30363D] cursor-move rounded-t-2xl">
          <div className="w-16 h-1 bg-[#30363D] rounded-full" />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.href);
              }}
              className={`group flex items-center gap-3 p-3 rounded-xl hover:bg-[#161B22] 
                transition-all duration-300 cursor-pointer
                ${activeSection === item.href.slice(1) 
                  ? 'text-white translate-x-2 bg-[#161B22]/80' 
                  : 'text-[#8b949e] hover:text-white'}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                           bg-[#161B22] border-2 transition-all duration-300
                           ${activeSection === item.href.slice(1)
                             ? 'border-accent-web bg-accent-web/10 shadow-lg shadow-accent-web/20'
                             : 'border-[#30363D] group-hover:border-accent-web'}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={`font-medium transition-all duration-300 ${
                activeSection === item.href.slice(1) 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
              }`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Menu Button - Enhanced styling */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 w-12 h-12 rounded-lg
                 bg-[#161B22] border-2 border-[#30363D] flex items-center justify-center
                 shadow-xl shadow-black/20 hover:border-accent-web transition-all duration-300"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#8b949e]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu - Enhanced styling */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with stronger blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu with enhanced styling */}
            <motion.nav
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
              className="lg:hidden fixed inset-y-0 right-0 w-72 bg-[#0D1117]/95 backdrop-blur-sm
                       border-l-2 border-[#30363D] z-40 flex flex-col p-6 gap-4
                       shadow-2xl shadow-black/20"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300
                    ${activeSection === item.href.slice(1) 
                      ? 'text-white bg-[#161B22]/80 translate-x-2' 
                      : 'text-[#8b949e] hover:text-white hover:bg-[#161B22] hover:translate-x-2'}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                               bg-[#161B22] border-2 transition-all duration-300
                               ${activeSection === item.href.slice(1) 
                                 ? 'border-accent-web bg-accent-web/10 shadow-lg shadow-accent-web/20' 
                                 : 'border-[#30363D]'}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  {item.label}
                </Link>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 