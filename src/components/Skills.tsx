'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Proficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

type Skill = {
  name: string;
  icon: string;
  proficiency: Proficiency;
  category: 'ai' | 'iot' | 'web' | 'mobile';
};

const skills: Skill[] = [
  // Web Skills (showing first as default tab)
  { name: 'React', icon: '⚛️', proficiency: 'Expert', category: 'web' },
  { name: 'Next.js', icon: '▲', proficiency: 'Expert', category: 'web' },
  { name: 'TypeScript', icon: '📘', proficiency: 'Expert', category: 'web' },
  { name: 'Node.js', icon: '💚', proficiency: 'Advanced', category: 'web' },
  { name: 'TailwindCSS', icon: '🎨', proficiency: 'Expert', category: 'web' },
  { name: 'GraphQL', icon: '📊', proficiency: 'Advanced', category: 'web' },
  { name: 'PostgreSQL', icon: '🐘', proficiency: 'Advanced', category: 'web' },
  { name: 'MongoDB', icon: '🍃', proficiency: 'Advanced', category: 'web' },
  { name: 'Redis', icon: '⚡', proficiency: 'Intermediate', category: 'web' },
  { name: 'Docker', icon: '🐳', proficiency: 'Advanced', category: 'web' },

  // AI/ML Skills
  { name: 'GPT-4', icon: '🤖', proficiency: 'Advanced', category: 'ai' },
  { name: 'LangChain', icon: '🔗', proficiency: 'Advanced', category: 'ai' },
  { name: 'PyTorch', icon: '🔥', proficiency: 'Intermediate', category: 'ai' },
  { name: 'TensorFlow', icon: '📊', proficiency: 'Intermediate', category: 'ai' },
  { name: 'Scikit-learn', icon: '🧮', proficiency: 'Advanced', category: 'ai' },
  { name: 'Hugging Face', icon: '🤗', proficiency: 'Advanced', category: 'ai' },
  { name: 'RAG', icon: '📚', proficiency: 'Expert', category: 'ai' },
  { name: 'Vector DBs', icon: '🎯', proficiency: 'Advanced', category: 'ai' },

  // IoT Skills
  { name: 'ESP32', icon: '📡', proficiency: 'Expert', category: 'iot' },
  { name: 'MQTT', icon: '📨', proficiency: 'Expert', category: 'iot' },
  { name: 'Arduino', icon: '⚡', proficiency: 'Advanced', category: 'iot' },
  { name: 'Raspberry Pi', icon: '🥧', proficiency: 'Expert', category: 'iot' },
  { name: 'Sensors', icon: '🔌', proficiency: 'Advanced', category: 'iot' },
  { name: 'LoRaWAN', icon: '📶', proficiency: 'Intermediate', category: 'iot' },

  // Mobile Skills
  { name: 'React Native', icon: '📱', proficiency: 'Advanced', category: 'mobile' },
  { name: 'Flutter', icon: '🎯', proficiency: 'Intermediate', category: 'mobile' },
  { name: 'iOS', icon: '🍎', proficiency: 'Intermediate', category: 'mobile' },
  { name: 'Android', icon: '🤖', proficiency: 'Intermediate', category: 'mobile' }
];

const tabs = [
  { id: 'web', label: 'Web', color: 'var(--accent-web)' },
  { id: 'ai', label: 'AI & ML', color: 'var(--accent-ai)' },
  { id: 'iot', label: 'IoT', color: 'var(--accent-iot)' },
  { id: 'mobile', label: 'Mobile', color: 'var(--accent-mobile)' },
] as const;

export default function Skills() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['id']>('web');
  const [showAll, setShowAll] = useState(false);

  const filteredSkills = skills.filter(skill => skill.category === activeTab);
  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 8);

  const getProficiencyColor = (proficiency: Proficiency) => {
    switch (proficiency) {
      case 'Expert': return '#22C55E';
      case 'Advanced': return '#3B82F6';
      case 'Intermediate': return '#A855F7';
      case 'Beginner': return '#EC4899';
    }
  };

  const getProgressWidth = (proficiency: Proficiency) => {
    switch (proficiency) {
      case 'Expert': return '100%';
      case 'Advanced': return '80%';
      case 'Intermediate': return '60%';
      case 'Beginner': return '40%';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-[#E5E7EB]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </motion.h2>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap
                       ${activeTab === tab.id 
                         ? 'bg-[#161B22] text-[#E5E7EB]' 
                         : 'text-github-text hover:text-[#E5E7EB]'}`}
              style={{
                boxShadow: activeTab === tab.id ? `0 0 12px ${tab.color}` : 'none',
                border: `2px solid ${activeTab === tab.id ? tab.color : '#30363D'}`
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {displayedSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-[#161B22] p-4 rounded-lg border-2 border-[#30363D]
                       hover:border-[var(--accent-web)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{skill.icon}</span>
                <h3 className="text-[#E5E7EB] font-medium">{skill.name}</h3>
              </div>
              <div className="h-2 bg-[#30363D] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    backgroundColor: getProficiencyColor(skill.proficiency),
                    width: getProgressWidth(skill.proficiency)
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: getProgressWidth(skill.proficiency) }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              </div>
              <div className="mt-2 text-sm text-github-text">
                {skill.proficiency}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredSkills.length > 8 && (
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="mt-8 px-4 py-2 rounded-lg border-2 border-[#30363D] 
                     hover:border-[var(--accent-web)] bg-[#161B22] 
                     text-[#E5E7EB] transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {showAll ? 'Show Less' : `Show ${filteredSkills.length - 8} More`}
          </motion.button>
        )}
      </div>
    </section>
  );
} 