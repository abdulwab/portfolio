'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDebounce } from '@/hooks/useDebounce';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import SkillCard from './SkillCard';
import { skillsData } from './skillsData';

export default function Skills() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </motion.h2>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search skills (e.g., 'React' or 'Machine Learning')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-[#161B22] border-2 border-[#30363D]
                     text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]
                     focus:outline-none focus:border-[var(--accent-web)]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillCard
                group={group}
                isExpanded={expandedId === group.id}
                onToggle={() => setExpandedId(expandedId === group.id ? null : group.id)}
                searchTerm={debouncedSearch}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 