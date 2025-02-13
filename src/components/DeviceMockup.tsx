// DeviceMockup.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiWifi, FiZap } from 'react-icons/fi';

export default function DeviceMockup() {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setValue("41"); // Set the consistent value after mounting
  }, []);

  if (!mounted) {
    return <div className="h-full bg-[#161B22]" />; // Loading state
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <motion.div 
        className="bg-[#161B22] rounded-2xl border-2 border-[#30363D] p-6 w-64 h-64 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Screen Content */}
        <div className="bg-[#0D1117] rounded-lg h-full p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <motion.div
              animate={{ opacity: [0.6, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FiZap className="text-[#58A6FF] w-5 h-5" />
            </motion.div>
            <div className="flex items-center gap-1">
              <FiWifi className="text-[#8B949E] w-4 h-4" />
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-[#58A6FF] rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Live Data Display */}
          <div className="text-center space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-4xl font-bold text-[#C9D1D9]">
                {Math.floor(Math.random() * 30 + 20)}
              </span>
              <span className="text-[#8B949E] ml-1">°C</span>
            </motion.div>
            <motion.div
              className="text-sm text-[#8B949E]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Connected Devices: 4
            </motion.div>
          </div>

          {/* Status LED */}
          <motion.div
            className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#16a34a]"
            animate={{ scale: [1, 1.2] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>

        {/* Ports */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 mb-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-6 h-2 rounded-sm bg-[#30363D]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
      {value && <span>{value}</span>}
    </div>
  );
}