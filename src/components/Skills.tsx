'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBracketIcon, CpuChipIcon, BeakerIcon, CloudIcon, CommandLineIcon } from '@heroicons/react/24/outline';

type Category = 'ai' | 'web' | 'iot' | 'cloud' | 'automation';

interface Skill {
  name: string;
  icon: string;
  category: Category;
  tags: string[];
  details: string;
  projects: number;
  proficiency: number;
}

interface CategoryType {
  id: Category;
  label: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const categories: CategoryType[] = [
  { id: 'ai', label: 'AI & Agents', icon: BeakerIcon, color: '#10B981' },
  { id: 'web', label: 'Web Stack', icon: CodeBracketIcon, color: '#58A6FF' },
  { id: 'iot', label: 'IoT Solutions', icon: CpuChipIcon, color: '#3B82F6' },
  { id: 'cloud', label: 'Cloud & Infrastructure', icon: CloudIcon, color: '#F59E0B' },
  { id: 'automation', label: 'Automation & Workflows', icon: CommandLineIcon, color: '#8B5CF6' },
];

const skills: Skill[] = [
  // AI & Agents (Priority Section)
  { name: 'LangChain', icon: '⛓️', category: 'ai', tags: ['RAG', 'Agents', 'Tools', 'LCEL'], details: 'Advanced LLM application framework', projects: 15, proficiency: 95 },
  { name: 'LangGraph', icon: '🕸️', category: 'ai', tags: ['State Management', 'Workflows', 'Multi-Agent'], details: 'Graph-based agent orchestration', projects: 12, proficiency: 90 },
  { name: 'LangSmith', icon: '🔍', category: 'ai', tags: ['Observability', 'Debugging', 'Monitoring'], details: 'LLM application monitoring', projects: 8, proficiency: 85 },
  { name: 'CrewAI', icon: '🤝', category: 'ai', tags: ['Multi-Agent', 'Collaboration', 'Roles'], details: 'Collaborative AI agent framework', projects: 10, proficiency: 88 },
  { name: 'OpenAI GPT-4', icon: '🧠', category: 'ai', tags: ['API', 'Function Calling', 'Vision', 'o1'], details: 'Advanced reasoning models', projects: 20, proficiency: 92 },
  { name: 'Anthropic Claude', icon: '🔮', category: 'ai', tags: ['Constitutional AI', 'Sonnet', 'Haiku'], details: 'Safe and helpful AI assistant', projects: 14, proficiency: 90 },
  { name: 'Google Gemini', icon: '💎', category: 'ai', tags: ['Multimodal', 'Code', 'Pro'], details: 'Google advanced AI model', projects: 8, proficiency: 82 },
  { name: 'DeepSeek', icon: '🔬', category: 'ai', tags: ['Reasoning', 'Math', 'Code'], details: 'Advanced reasoning capabilities', projects: 6, proficiency: 78 },
  { name: 'Vector Databases', icon: '📊', category: 'ai', tags: ['Pinecone', 'Chroma', 'Qdrant', 'Weaviate'], details: 'Semantic search and retrieval', projects: 12, proficiency: 88 },
  { name: 'HuggingFace', icon: '🤗', category: 'ai', tags: ['Transformers', 'Datasets', 'Inference'], details: 'Open-source ML platform', projects: 10, proficiency: 85 },

  // Automation & Workflows
  { name: 'N8N', icon: '🔄', category: 'automation', tags: ['Workflows', 'Self-hosted', 'Integrations'], details: 'Node-based automation platform', projects: 18, proficiency: 92 },
  { name: 'Make.com', icon: '🔧', category: 'automation', tags: ['Visual', 'Integrations', 'SaaS'], details: 'Visual automation platform', projects: 15, proficiency: 88 },
  { name: 'Zapier', icon: '⚡', category: 'automation', tags: ['Triggers', 'Actions', 'Multi-step'], details: 'App integration automation', projects: 12, proficiency: 85 },
  { name: 'Agentic Workflows', icon: '🤖', category: 'automation', tags: ['Self-directed', 'Autonomous', 'Planning'], details: 'Autonomous decision-making patterns', projects: 8, proficiency: 90 },
  { name: 'GitHub Actions', icon: '⚙️', category: 'automation', tags: ['CI/CD', 'Workflows', 'Automation'], details: 'DevOps automation platform', projects: 25, proficiency: 90 },

  // Web Development
  { name: 'Next.js', icon: '🌐', category: 'web', tags: ['React', 'SSR', 'App Router', 'RSC'], details: 'Full-stack React framework', projects: 22, proficiency: 95 },
  { name: 'React', icon: '⚛️', category: 'web', tags: ['Hooks', 'Context', 'Suspense', 'Server Components'], details: 'Modern UI development', projects: 28, proficiency: 92 },
  { name: 'TypeScript', icon: '📘', category: 'web', tags: ['Type Safety', 'Generics', 'Strict Mode'], details: 'Type-safe development', projects: 25, proficiency: 90 },
  { name: 'Node.js', icon: '🟢', category: 'web', tags: ['Express', 'API', 'Microservices'], details: 'Server-side JavaScript', projects: 18, proficiency: 88 },
  { name: 'PostgreSQL', icon: '🐘', category: 'web', tags: ['JSONB', 'Vector Ext', 'Performance'], details: 'Advanced relational database', projects: 15, proficiency: 85 },
  { name: 'Redis', icon: '🔴', category: 'web', tags: ['Caching', 'Pub/Sub', 'Sessions'], details: 'In-memory data structure', projects: 12, proficiency: 82 },

  // IoT Solutions  
  { name: 'ESP32', icon: '⚡', category: 'iot', tags: ['WiFi', 'Bluetooth', 'FreeRTOS'], details: 'IoT microcontroller platform', projects: 21, proficiency: 90 },
  { name: 'LoRaWAN', icon: '📡', category: 'iot', tags: ['Long Range', 'LPWAN', 'TTN'], details: 'Long-range IoT communication', projects: 8, proficiency: 85 },
  { name: 'MQTT', icon: '🔌', category: 'iot', tags: ['Pub/Sub', 'QoS', 'Broker'], details: 'IoT messaging protocol', projects: 17, proficiency: 88 },
  { name: 'Raspberry Pi', icon: '🍓', category: 'iot', tags: ['Linux', 'GPIO', 'Edge AI'], details: 'Edge computing platform', projects: 14, proficiency: 86 },
  { name: 'Arduino', icon: '🔄', category: 'iot', tags: ['Prototyping', 'Sensors', 'Actuators'], details: 'Rapid prototyping platform', projects: 16, proficiency: 88 },
  { name: 'Zigbee', icon: '🐝', category: 'iot', tags: ['Mesh', 'Home Assistant', 'Low Power'], details: 'Smart home mesh network', projects: 12, proficiency: 82 },

  // Cloud & Infrastructure
  { name: 'AWS', icon: '☁️', category: 'cloud', tags: ['Lambda', 'S3', 'EC2', 'Bedrock'], details: 'Cloud infrastructure platform', projects: 15, proficiency: 88 },
  { name: 'Vercel', icon: '▲', category: 'cloud', tags: ['Edge', 'Serverless', 'AI SDK'], details: 'Frontend deployment platform', projects: 20, proficiency: 90 },
  { name: 'Docker', icon: '🐳', category: 'cloud', tags: ['Containers', 'Compose', 'Multi-stage'], details: 'Containerization platform', projects: 18, proficiency: 85 },
  { name: 'Kubernetes', icon: '⚓', category: 'cloud', tags: ['Orchestration', 'Scaling', 'Services'], details: 'Container orchestration', projects: 10, proficiency: 80 },
  { name: 'Terraform', icon: '🏗️', category: 'cloud', tags: ['IaC', 'Modules', 'State'], details: 'Infrastructure as code', projects: 9, proficiency: 82 },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Category>('ai');
  const [flippedSkill, setFlippedSkill] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => skill.category === activeTab);
  }, [activeTab]);

  const handleTabChange = useCallback((newCategory: Category) => {
    setActiveTab(newCategory);
    setFlippedSkill(null);
  }, []);

  const handleSkillClick = useCallback((skillName: string) => {
    setFlippedSkill(prev => prev === skillName ? null : skillName);
  }, []);

  return (
    <section className="section-spacing bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--background-secondary)]" id="skills">
      <div className="container-center">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="gradient-text">
              Technical Expertise
            </span>
          </h2>
          <p className="text-theme-secondary text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive technology stack spanning AI agents, modern web development, 
            IoT solutions, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              type="button"
              onClick={() => handleTabChange(category.id as Category)}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium
                transition-all duration-300 border-2 backdrop-blur-sm
                ${activeTab === category.id 
                  ? 'bg-[#161B22] shadow-lg transform scale-105' 
                  : 'text-[#8B949E] hover:bg-[#161B22]/50 border-transparent hover:scale-102'
                }
              `}
              style={{
                boxShadow: activeTab === category.id ? `0 8px 32px ${category.color}40` : 'none',
                borderColor: activeTab === category.id ? category.color : 'transparent',
                color: activeTab === category.id ? category.color : 'var(--text-secondary)'
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon 
                className="w-5 h-5"
                style={{ color: activeTab === category.id ? category.color : 'var(--text-secondary)' }} 
              />
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={`${activeTab}-${skill.name}`}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative h-48 cursor-pointer group"
                onClick={() => handleSkillClick(skill.name)}
              >
                {/* Front Side */}
                <motion.div
                  className={`
                    absolute w-full h-full rounded-2xl bg-gradient-to-br from-[#161B22] to-[#0D1117] p-6
                    border-2 transition-all duration-500 backdrop-blur-sm
                    ${flippedSkill === skill.name 
                      ? 'opacity-0 rotate-y-180 pointer-events-none' 
                      : 'opacity-100 rotate-y-0'
                    }
                    border-[#30363D] group-hover:border-[#58A6FF] 
                    group-hover:shadow-2xl group-hover:shadow-[#58A6FF]/20
                    group-hover:scale-105 group-hover:-translate-y-2
                  `}
                  whileHover={{ rotateX: 5, rotateY: 5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl filter drop-shadow-lg">{skill.icon}</span>
                    <h3 className="text-lg font-semibold text-[#E5E7EB] leading-tight">
                      {skill.name}
                    </h3>
                  </div>
                  
                  {/* Proficiency Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-[#8B949E] mb-1">
                      <span>Proficiency</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-[#30363D] rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#58A6FF] to-[#10B981] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {skill.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-[#0D1117] text-[#58A6FF]
                                 border border-[#30363D] backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-[#8B949E] flex items-center gap-2">
                    <span>💼 {skill.projects} projects</span>
                  </div>
                </motion.div>

                {/* Back Side */}
                <motion.div
                  className={`
                    absolute w-full h-full rounded-2xl bg-gradient-to-br from-[#161B22] to-[#0D1117] p-6
                    border-2 border-[#58A6FF] transition-all duration-500 backdrop-blur-sm
                    ${flippedSkill === skill.name 
                      ? 'opacity-100 rotate-y-0' 
                      : 'opacity-0 rotate-y-180 pointer-events-none'
                    }
                    shadow-2xl shadow-[#58A6FF]/30
                  `}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{skill.icon}</span>
                    <h3 className="text-lg font-semibold text-[#E5E7EB]">
                      {skill.name}
                    </h3>
                  </div>
                  
                  <p className="text-[#8B949E] text-sm leading-relaxed mb-4">
                    {skill.details}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-[#58A6FF] font-medium">Technologies:</div>
                    <div className="flex flex-wrap gap-1">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md bg-[#58A6FF]/20 text-[#58A6FF]
                                   border border-[#58A6FF]/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'AI Technologies', value: '10+', color: '#10B981' },
            { label: 'Total Projects', value: '50+', color: '#58A6FF' },
            { label: 'Years Experience', value: '5+', color: '#F59E0B' },
            { label: 'Automation Tools', value: '8+', color: '#8B5CF6' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-[#161B22] border border-[#30363D]
                       hover:border-[#58A6FF] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-[#8B949E] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}