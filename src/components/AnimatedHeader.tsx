import { motion } from 'framer-motion';

interface AnimatedHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedHeader({ children, className = '' }: AnimatedHeaderProps) {
  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={className}>{children}</h2>
      <motion.div
        className="absolute -bottom-2 left-0 w-full h-1 bg-accent-web rounded-full"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />
    </motion.div>
  );
} 