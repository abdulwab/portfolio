'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBracketIcon, CpuChipIcon, BeakerIcon, CloudIcon, CommandLineIcon } from '@heroicons/react/24/outline';

type Category = 'web' | 'ai' | 'iot' | 'cloud' | 'tools';

interface Skill {
  name: string;
  icon: string;
  category: Category;
  tags: string[];
  details: string;
  projects: number;
}

interface CategoryType {
  id: Category;
  label: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const categories: CategoryType[] = [
  { id: 'web', label: 'Web Stack', icon: CodeBracketIcon, color: '#58A6FF' },
  { id: 'ai', label: 'AI & ML', icon: BeakerIcon, color: '#10B981' },
  { id: 'iot', label: 'IoT', icon: CpuChipIcon, color: '#3B82F6' },
  { id: 'cloud', label: 'Cloud', icon: CloudIcon, color: '#F59E0B' },
  { id: 'tools', label: 'DevOps', icon: CommandLineIcon, color: '#8B5CF6' },
];

const skills: Skill[] = [
  // Web Development (10 skills)
  { name: 'Next.js', icon: '🌐', category: 'web', tags: ['SSR', 'API Routes', 'ISR'], details: 'Enterprise-scale applications', projects: 22 },
  { name: 'React', icon: '⚛️', category: 'web', tags: ['Hooks', 'Context', 'Suspense'], details: '20+ production apps', projects: 28 },
  { name: 'Node.js', icon: '🟢', category: 'web', tags: ['Express', 'GraphQL', 'WebSocket'], details: 'High-performance APIs', projects: 18 },
  { name: 'TypeScript', icon: '📘', category: 'web', tags: ['Type Safety', 'Generics', 'Decorators'], details: 'Type-first development', projects: 25 },
  { name: 'Firebase', icon: '🔥', category: 'web', tags: ['Auth', 'Firestore', 'Functions'], details: 'Realtime systems', projects: 14 },
  { name: 'PostgreSQL', icon: '🐘', category: 'web', tags: ['JSONB', 'Indexing', 'Partitioning'], details: 'Database architecture', projects: 15 },
  { name: 'Redis', icon: '🔴', category: 'web', tags: ['Caching', 'Pub/Sub', 'Streams'], details: 'Real-time systems', projects: 12 },
  { name: 'Docker', icon: '🐳', category: 'web', tags: ['Containers', 'Swarm', 'Compose'], details: 'CI/CD pipelines', projects: 17 },
  { name: 'AWS', icon: '☁️', category: 'web', tags: ['Lambda', 'S3', 'EC2'], details: 'Cloud infrastructure', projects: 14 },
  { name: 'Jest', icon: '🃏', category: 'web', tags: ['Unit Testing', 'Mocks', 'Coverage'], details: 'Test-driven development', projects: 19 },

  // AI & Agents (10 skills)
  { name: 'GPT-4', icon: '🧠', category: 'ai', tags: ['Fine-tuning', 'Function Calling', 'Vision'], details: 'Multimodal solutions', projects: 9 },
  { name: 'LangChain', icon: '⛓️', category: 'ai', tags: ['RAG', 'Agents', 'Tools'], details: 'AI workflows', projects: 11 },
  { name: 'LlamaIndex', icon: '🦙', category: 'ai', tags: ['Data Loaders', 'Query Engine', 'Chat'], details: 'Data augmentation', projects: 7 },
  { name: 'HuggingFace', icon: '🤗', category: 'ai', tags: ['Transformers', 'Pipelines', 'Inference'], details: 'Model deployment', projects: 8 },
  { name: 'Vector DBs', icon: '📊', category: 'ai', tags: ['Pinecone', 'Chroma', 'Qdrant'], details: 'Semantic search', projects: 6 },
  { name: 'OpenAI', icon: '🔓', category: 'ai', tags: ['API', 'Embeddings', 'Moderation'], details: 'Enterprise integrations', projects: 12 },
  { name: 'LangSmith', icon: '🔍', category: 'ai', tags: ['Tracing', 'Monitoring', 'Testing'], details: 'LLM observability', projects: 5 },
  { name: 'AutoGPT', icon: '🤖', category: 'ai', tags: ['Agents', 'Memory', 'Planning'], details: 'Autonomous systems', projects: 4 },
  { name: 'TensorFlow', icon: '📈', category: 'ai', tags: ['Keras', 'Layers', 'Models'], details: 'Neural networks', projects: 6 },
  { name: 'PyTorch', icon: '🔥', category: 'ai', tags: ['Tensors', 'Autograd', 'NN'], details: 'Deep learning', projects: 5 },

  // IoT (10 skills)
  { name: 'ESP32', icon: '⚡', category: 'iot', tags: ['BLE', 'WiFi', 'FreeRTOS'], details: '15+ deployments', projects: 21 },
  { name: 'LoRaWAN', icon: '📡', category: 'iot', tags: ['Long Range', 'Mesh', 'LPWAN'], details: 'Industrial IoT', projects: 8 },
  { name: 'Zigbee', icon: '🐝', category: 'iot', tags: ['Mesh', 'Low Power', 'HA'], details: 'Smart home systems', projects: 12 },
  { name: 'MQTT', icon: '🔌', category: 'iot', tags: ['Pub/Sub', 'Broker', 'QoS'], details: 'Message streaming', projects: 17 },
  { name: 'Raspberry Pi', icon: '🍓', category: 'iot', tags: ['Python', 'GPIO', 'Linux'], details: 'Edge computing', projects: 14 },
  { name: 'Arduino', icon: '🔄', category: 'iot', tags: ['Sensors', 'Actuators', 'Shields'], details: 'Rapid prototyping', projects: 16 },
  { name: 'RTOS', icon: '⏱️', category: 'iot', tags: ['FreeRTOS', 'Zephyr', 'ThreadX'], details: 'Real-time systems', projects: 9 },
  { name: 'OPC UA', icon: '🏭', category: 'iot', tags: ['IIoT', 'Security', 'PubSub'], details: 'Industrial automation', projects: 7 },
  { name: 'Modbus', icon: '🔧', category: 'iot', tags: ['TCP', 'RTU', 'ASCII'], details: 'Industrial protocol', projects: 6 },
  { name: 'CoAP', icon: '🌐', category: 'iot', tags: ['RESTful', 'DTLS', 'Observe'], details: 'Constrained devices', projects: 5 },

  // Cloud Skills (10 skills)
  { name: 'AWS', icon: '☁️', category: 'cloud', tags: ['EC2', 'Lambda', 'S3'], details: 'Cloud architecture', projects: 15 },
  { name: 'Azure', icon: '🌩️', category: 'cloud', tags: ['Functions', 'Cosmos DB', 'AKS'], details: 'Enterprise cloud', projects: 12 },
  { name: 'GCP', icon: '🌐', category: 'cloud', tags: ['Compute', 'BigQuery', 'GKE'], details: 'Cloud platform', projects: 8 },
  { name: 'Kubernetes', icon: '⚓', category: 'cloud', tags: ['Containers', 'Pods', 'Services'], details: 'Container orchestration', projects: 10 },
  { name: 'Terraform', icon: '🏗️', category: 'cloud', tags: ['IaC', 'Modules', 'State'], details: 'Infrastructure as code', projects: 9 },
  { name: 'CloudFlare', icon: '🛡️', category: 'cloud', tags: ['CDN', 'Workers', 'DNS'], details: 'Edge computing', projects: 11 },
  { name: 'Vercel', icon: '▲', category: 'cloud', tags: ['Deployment', 'Edge', 'Analytics'], details: 'Frontend deployment', projects: 14 },
  { name: 'Netlify', icon: '🌐', category: 'cloud', tags: ['JAMstack', 'Functions', 'Forms'], details: 'Static hosting', projects: 13 },
  { name: 'Heroku', icon: '💜', category: 'cloud', tags: ['PaaS', 'Dynos', 'Add-ons'], details: 'App platform', projects: 16 },
  { name: 'DigitalOcean', icon: '🌊', category: 'cloud', tags: ['Droplets', 'Spaces', 'Apps'], details: 'Cloud infrastructure', projects: 7 },

  // Tools & DevOps (10 skills)
  { name: 'Git', icon: '📝', category: 'tools', tags: ['Version Control', 'Branching', 'CI/CD'], details: 'Source control', projects: 30 },
  { name: 'Docker', icon: '🐳', category: 'tools', tags: ['Containers', 'Compose', 'Swarm'], details: 'Containerization', projects: 18 },
  { name: 'Jenkins', icon: '🤖', category: 'tools', tags: ['CI/CD', 'Pipelines', 'Automation'], details: 'Build automation', projects: 12 },
  { name: 'GitHub Actions', icon: '⚡', category: 'tools', tags: ['Workflows', 'CI/CD', 'Automation'], details: 'CI/CD pipelines', projects: 15 },
  { name: 'Ansible', icon: '🎮', category: 'tools', tags: ['Automation', 'Playbooks', 'IaC'], details: 'Configuration management', projects: 8 },
  { name: 'Prometheus', icon: '📊', category: 'tools', tags: ['Monitoring', 'Metrics', 'Alerts'], details: 'System monitoring', projects: 7 },
  { name: 'Grafana', icon: '📈', category: 'tools', tags: ['Dashboards', 'Visualization', 'Alerts'], details: 'Data visualization', projects: 9 },
  { name: 'VS Code', icon: '💻', category: 'tools', tags: ['IDE', 'Extensions', 'Debugging'], details: 'Development environment', projects: 25 },
  { name: 'Postman', icon: '✉️', category: 'tools', tags: ['API Testing', 'Collections', 'Automation'], details: 'API development', projects: 20 },
  { name: 'Linux', icon: '🐧', category: 'tools', tags: ['Shell', 'Services', 'Security'], details: 'System administration', projects: 22 },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Category>('web');
  const [flippedSkill, setFlippedSkill] = useState<string | null>(null);

  // Move the filtering to a useMemo hook to prevent unnecessary recalculations
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => skill.category === activeTab);
  }, [activeTab]); // Only recalculate when activeTab changes

  // Simplify the handleTabChange function
  const handleTabChange = useCallback((newCategory: Category) => {
    console.log('Previous tab:', activeTab);
    console.log('Clicked tab:', newCategory);
    setActiveTab(newCategory);
    setFlippedSkill(null);
  }, [activeTab]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0D1117]" id="skills">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-8 text-[#E5E7EB] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Technical Expertise
        </motion.h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleTabChange(category.id as Category)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200 ease-in-out border-2
                ${activeTab === category.id 
                  ? 'bg-[#161B22]' 
                  : 'text-[#8B949E] hover:bg-[#161B22]/50 border-transparent'
                }
                cursor-pointer
              `}
              style={{
                boxShadow: activeTab === category.id ? `0 0 10px ${category.color}40` : 'none',
                borderColor: activeTab === category.id ? category.color : 'transparent',
                color: activeTab === category.id ? category.color : '#8B949E'
              }}
            >
              <category.icon 
                className="w-5 h-5"
                style={{ color: activeTab === category.id ? category.color : '#8B949E' }} 
              />
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="sync">
            {filteredSkills.map((skill) => (
              <motion.div
                key={`${activeTab}-${skill.name}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative h-40 perspective-1000 transform-style-3d"
                onClick={() => setFlippedSkill(
                  skill.name === flippedSkill ? null : skill.name
                )}
              >
                {/* Front Side */}
                <div
                  className={`
                    absolute w-full h-full rounded-xl bg-[#161B22] p-4
                    border-2 transition-all duration-500 backface-hidden
                    ${flippedSkill === skill.name 
                      ? 'opacity-0 rotate-y-180' 
                      : 'opacity-100 rotate-y-0'
                    }
                    border-[#30363D]
                    hover:border-[#58A6FF] hover:shadow-lg
                    cursor-pointer
                  `}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <h3 className="text-lg font-medium text-[#E5E7EB]">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-md 
                                 bg-[#0D1117] text-[#58A6FF]
                                 border border-[#30363D]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className={`
                    absolute w-full h-full rounded-xl bg-[#161B22] p-4
                    border-2 border-[#58A6FF] transition-all duration-500
                    flex flex-col justify-center items-center backface-hidden
                    ${flippedSkill === skill.name 
                      ? 'opacity-100 rotate-y-0' 
                      : 'opacity-0 rotate-y-180'
                    }
                  `}
                >
                  <p className="text-sm text-[#E5E7EB] text-center mb-2">
                    {skill.details}
                  </p>
                  <div className="text-[#58A6FF] text-xs mb-2">
                    {skill.projects}+ projects
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}