'use client';
import { motion } from 'framer-motion';
import { FiCpu, FiCode, FiCloud, FiZap } from 'react-icons/fi';

type Experience = {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
  tags: string[];
  type: 'ai' | 'iot' | 'web' | 'mobile';
};

const experiences: Experience[] = [
  {
    title: 'AI Solutions Architect',
    company: 'TechCorp AI',
    location: 'San Francisco, CA',
    date: '2023 - Present',
    description: [
      'Led development of enterprise GPT-4 customer service platform',
      'Architected RAG pipeline processing 50k+ documents',
      'Reduced response latency by 60% through model optimization'
    ],
    tags: ['GPT-4', 'LangChain', 'AWS', 'Python', 'RAG'],
    type: 'ai'
  },
  {
    title: 'IoT Systems Engineer',
    company: 'SmartTech Solutions',
    location: 'Boston, MA',
    date: '2021 - 2023',
    description: [
      'Designed IoT architecture for 1000+ node smart building system',
      'Implemented MQTT/CoAP hybrid network with 99.9% uptime',
      'Developed edge computing pipeline reducing cloud costs by 40%'
    ],
    tags: ['ESP32', 'MQTT', 'Kubernetes', 'TimescaleDB', 'LoRaWAN'],
    type: 'iot'
  },
  {
    title: 'Full Stack Developer',
    company: 'WebDev Inc',
    location: 'New York, NY',
    date: '2019 - 2021',
    description: [
      'Built high-traffic web apps handling 10k+ daily users',
      'Implemented CI/CD pipelines reducing deployment time by 70%',
      'Optimized PostgreSQL queries achieving 200ms response times'
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript'],
    type: 'web'
  }
];

export default function Experience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-[#58A6FF] to-[#3B82F6] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Career Roadmap
        </motion.h2>

        <div className="relative pl-8 sm:pl-16 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b from-[#58A6FF] via-[#3B82F6] to-[#10B981]">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative mb-12 group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-56px] top-1 w-10 h-10 rounded-full bg-[#161B22] border-2 border-[#58A6FF] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#58A6FF] animate-pulse" />
              </div>

              {/* Content Card */}
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6 relative overflow-hidden 
                            transition-all hover:border-[#58A6FF] hover:shadow-lg hover:shadow-[#58A6FF]/10">
                {/* Gradient Decoration */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-[#58A6FF]/20 to-transparent" />
                
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-[#58A6FF]/10 text-[#58A6FF]">
                    {exp.type === 'ai' && <FiZap className="w-6 h-6" />}
                    {exp.type === 'iot' && <FiCpu className="w-6 h-6" />}
                    {exp.type === 'web' && <FiCode className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#C9D1D9]">{exp.title}</h3>
                    <p className="text-[#8B949E]">
                      {exp.company} • {exp.location}
                      <span className="mx-2">•</span>
                      <span className="text-[#58A6FF]">{exp.date}</span>
                    </p>
                  </div>
                </div>

                {/* Description */}
                <ul className="space-y-2 mb-6">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#8B949E]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#58A6FF] mt-2" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-[#0D1117] border border-[#30363D]
                               text-[#58A6FF] font-mono hover:bg-[#58A6FF]/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Connector Line */}
                {index < experiences.length - 1 && (
                  <div className="absolute bottom-[-48px] left-1/2 w-1 h-12 bg-gradient-to-b from-[#58A6FF] to-[#3B82F6]" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}