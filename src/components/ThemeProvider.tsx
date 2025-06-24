'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0D1117]">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen transition-colors duration-300">
        {children}
        
        {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 p-4 rounded-full border-2 z-50 shadow-lg
                   bg-[var(--card-bg)] border-[var(--border-primary)] 
                   hover:border-[var(--accent-ai)] transition-all duration-300
                   hover:shadow-xl hover:shadow-[var(--accent-ai)]/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ y: -20, opacity: 0, rotate: -180 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-2xl"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 