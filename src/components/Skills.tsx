'use client';
import { motion } from 'framer-motion';

type Skill = {
  icon: string;
  title: string;
  tags: string[];
  description: string;
  category: 'web' | 'mobile' | 'iot' | 'ai';
};

const skills: Record<string, Skill[]> = {
  web: [
    { icon: '🌐', title: 'Next.js', tags: ['#React', '#SSR'], description: 'Full-stack React framework with SSR/SSG capabilities', category: 'web' },
    { icon: '🎨', title: 'Tailwind', tags: ['#CSS', '#Utility'], description: 'Utility-first CSS framework for rapid UI development', category: 'web' },
    { icon: '⚡', title: 'tRPC', tags: ['#API', '#TypeSafe'], description: 'End-to-end typesafe APIs for modern web apps', category: 'web' },
  ],
  mobile: [
    { icon: '📱', title: 'React Native', tags: ['#Mobile', '#Cross'], description: 'Cross-platform mobile app development', category: 'mobile' },
    { icon: '🔄', title: 'Expo', tags: ['#DevTools', '#Deploy'], description: 'Tools and services for React Native development', category: 'mobile' },
    { icon: '📊', title: 'Native APIs', tags: ['#Device', '#Platform'], description: 'Native device capabilities integration', category: 'mobile' },
  ],
  iot: [
    { icon: '🔌', title: 'Arduino', tags: ['#C++', '#Hardware'], description: 'Microcontroller programming and prototyping', category: 'iot' },
    { icon: '🤖', title: 'RaspberryPi', tags: ['#Linux', '#Python'], description: 'Single-board computer for IoT projects', category: 'iot' },
    { icon: '📡', title: 'MQTT', tags: ['#Protocol', '#IoT'], description: 'Lightweight messaging protocol for IoT devices', category: 'iot' },
  ],
  ai: [
    { icon: '🧠', title: 'GPT-4', tags: ['#LLM', '#RAG'], description: 'OpenAI\'s multimodal language model', category: 'ai' },
    { icon: '🔍', title: 'LangChain', tags: ['#AI', '#Chain'], description: 'Framework for developing LLM applications', category: 'ai' },
    { icon: '🤖', title: 'TensorFlow', tags: ['#ML', '#DL'], description: 'Machine learning and deep learning framework', category: 'ai' },
  ],
};

const categories = [
  { id: 'web', icon: '🌐', title: 'Web Development' },
  { id: 'mobile', icon: '📱', title: 'Mobile Development' },
  { id: 'iot', icon: '🔌', title: 'IoT Solutions' },
  { id: 'ai', icon: '🤖', title: 'AI & Chatbots' },
];

export default function Skills() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-12 text-center">Technical Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span>{category.icon}</span>
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {skills[category.id].map((skill) => (
                  <motion.div
                    key={skill.title}
                    className="group relative bg-[#0D1117] p-4 rounded-lg border border-[#30363D] 
                             hover:border-accent-web transition-all duration-300
                             hover:shadow-lg hover:shadow-accent-web/10"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Tooltip */}
                    <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100
                                  transition-opacity duration-300 bottom-full left-1/2 -translate-x-1/2 mb-2
                                  bg-[#161B22] text-sm p-2 rounded shadow-lg border border-[#30363D]
                                  w-48 text-center z-10">
                      {skill.description}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                                    border-4 border-transparent border-t-[#161B22]" />
                    </div>
                    
                    {/* Skill Content */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{skill.icon}</span>
                          <h4 className="font-medium">{skill.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skill.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`tag tag-${skill.category} text-xs px-2 py-1`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 