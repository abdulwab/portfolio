'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillGroup } from './skillsData';

interface SkillCardProps {
  group: SkillGroup;
  isExpanded: boolean;
  onToggle: () => void;
  searchTerm: string;
}

export default function SkillCard({ group, isExpanded, onToggle, searchTerm }: SkillCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const hasMatchingSkills = searchTerm 
    ? group.skills.some(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: hasMatchingSkills ? 1 : 0.5,
        y: 0,
        scale: hasMatchingSkills ? 1 : 0.95
      }}
      className="relative perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className={`w-full h-full cursor-pointer transition-all duration-500
                   ${isExpanded ? 'scale-105' : 'hover:scale-102'}`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => !isExpanded && setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className={`absolute inset-0 backface-hidden
                      bg-[#161B22] rounded-lg border-2 border-[#30363D] p-6
                      ${isFlipped ? 'opacity-0' : 'opacity-100'}
                      hover:border-[${group.color}] transition-colors duration-300
                      hover:shadow-lg hover:shadow-[${group.color}]/10`}
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">{group.icon}</span>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{group.title}</h3>
          </div>
          <p className="mt-4 text-[var(--text-secondary)]">
            {group.skills.length} skills
          </p>
        </div>

        {/* Back of card */}
        <div className={`absolute inset-0 backface-hidden [transform:rotateY(180deg)]
                      bg-[#161B22] rounded-lg border-2 border-[#30363D] p-6
                      ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="space-y-3">
            {group.skills.slice(0, 3).map(skill => (
              <div key={skill.name} className="flex justify-between items-center">
                <span className="text-[var(--text-primary)]">{skill.name}</span>
                <span className="text-sm text-[var(--text-secondary)]">
                  {skill.projectCount} projects
                </span>
              </div>
            ))}
            {group.skills.length > 3 && (
              <p className="text-sm text-[var(--text-secondary)] text-center mt-2">
                +{group.skills.length - 3} more...
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-10 bg-[#161B22] rounded-lg border-2 border-[${group.color}]
                     p-6 overflow-hidden"
          >
            <div className="space-y-4">
              {group.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-primary)] font-medium">{skill.name}</span>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {skill.projectCount} projects
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-[#0D1117] text-[#58A6FF]
                                border border-[#30363D]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 