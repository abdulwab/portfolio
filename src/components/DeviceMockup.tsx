'use client';
import { motion } from 'framer-motion';

export default function DeviceMockup() {
  return (
    <div className="relative aspect-square">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Device Base */}
        <motion.rect
          x="40"
          y="60"
          width="120"
          height="80"
          rx="4"
          fill="#161B22"
          stroke="#30363D"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Screen */}
        <motion.rect
          x="50"
          y="70"
          width="100"
          height="40"
          rx="2"
          fill="#0D1117"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />

        {/* LED Indicators */}
        <motion.circle
          cx="60"
          cy="120"
          r="3"
          fill="#27c93f"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1.5 }}
        />
        <motion.circle
          cx="75"
          cy="120"
          r="3"
          fill="#ffbd2e"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1.7 }}
        />

        {/* Antenna */}
        <motion.path
          d="M150 60 L150 40 L160 30"
          stroke="#30363D"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        />

        {/* Wireless Signals */}
        {[1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M160 30 Q${170 + i * 10} ${25 - i * 5} ${180 + i * 10} 30`}
            stroke="#30363D"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 2 + i * 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 1,
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
} 