'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
];

const categories = [
  { id: 'web', label: 'Web Stack', icon: CodeBracketIcon, color: '#58A6FF' },
  { id: 'ai', label: 'AI Agents', icon: BeakerIcon, color: '#10B981' },
  { id: 'iot', label: 'IoT', icon: CpuChipIcon, color: '#3B82F6' },
  { id: 'cloud', label: 'Cloud', icon: CloudIcon, color: '#F59E0B' },
  { id: 'tools', label: 'Tools', icon: CommandLineIcon, color: '#8B5CF6' },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Category>('web');
  const [flippedSkill, setFlippedSkill] = useState<string | null>(null);

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
              onClick={() => setActiveTab(category.id as Category)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors
                ${activeTab === category.id ? 'bg-[#161B22] text-[#E5E7EB]' : 'text-[#8B949E] hover:bg-[#161B22]/50'}
                border ${activeTab === category.id ? 'border-[#58A6FF]' : 'border-transparent'}`}
              style={{ boxShadow: activeTab === category.id ? `0 0 8px ${category.color}` : 'none' }}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {skills.filter(s => s.category === activeTab).map((skill) => (
            <motion.div
              key={skill.name}
              className="relative h-40 cursor-pointer group"
              onClick={() => setFlippedSkill(skill.name === flippedSkill ? null : skill.name)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Front Side */}
              <motion.div
                className="absolute w-full h-full bg-[#161B22] p-3 rounded-lg border border-[#30363D]
                          flex flex-col justify-between backface-hidden"
                animate={{ rotateY: flippedSkill === skill.name ? 180 : 0 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="text-lg font-medium text-[#E5E7EB]">{skill.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-md bg-[#0D1117] text-[#58A6FF]
                               border border-[#30363D]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[#8B949E] text-xs mt-auto">
                  Applied in {skill.projects}+ projects
                </div>
              </motion.div>

              {/* Back Side */}
              <motion.div
                className="absolute w-full h-full bg-[#161B22] p-3 rounded-lg border border-[#58A6FF]
                          flex flex-col justify-center items-center text-center backface-hidden"
                initial={{ rotateY: 180 }}
                animate={{ rotateY: flippedSkill === skill.name ? 0 : 180 }}
              >
                <p className="text-sm text-[#E5E7EB] mb-2 px-2 leading-tight">
                  {skill.details}
                </p>
                <div className="text-[#58A6FF] text-xs mb-2">
                  {skill.tags.slice(0, 3).join(' • ')}
                </div>
                <div className="text-xs text-[#8B949E]">
                  {skill.projects}+ successful implementations
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}