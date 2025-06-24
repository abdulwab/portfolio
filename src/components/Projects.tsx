'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiGithub, FiExternalLink, FiStar, FiZap } from 'react-icons/fi';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'ai' | 'iot' | 'web' | 'mobile';
  github?: string;
  demo?: string;
  metrics?: {
    performance?: string;
    complexity?: number;
    deployment?: string;
  };
};

const projects: Project[] = [
  {
    id: 'mobile-app',
    title: 'Mobile App for Smart Home Automation',
    description: 'Distributed IoT system managing 50+ devices with real-time control and energy optimization',
    image: '/projects/smart-home2.png',
    tags: ['ESP32', 'MQTT', 'React', 'Node.js', 'TimescaleDB'],
    category: 'mobile',
    github: '#',
    demo: '#',
    metrics: {
      performance: '98.7% uptime',
      complexity: 4,
      deployment: 'Kubernetes Cluster'
    }
  },
  {
    id: 'smart-home',
    title: 'Smart Home Automation Hub',
    description: 'Distributed IoT system managing 50+ devices with real-time control and energy optimization',
    image: '/projects/smart-home.png',
    tags: ['ESP32', 'MQTT', 'React', 'Node.js', 'MongoDB', 'Arduino', 'AWS', 'IOT', 'Websocket'],
    category: 'mobile',
    github: '#',
    demo: '#',
    metrics: {
      performance: '98.7% uptime',
      complexity: 4,
      deployment: 'Kubernetes Cluster'
    }
  },
  {
    id: 'gpt-research',
    title: 'Enterprise Research Assistant',
    description: 'RAG-powered knowledge management system processing 10k+ documents',
    image: '/projects/ai-assistant.png',
    tags: ['GPT-4', 'LangChain', 'Python', 'Firebase', 'Vue.js', 'TailwindCSS', 'javascript'],
    category: 'ai',
    github: 'https://teacheasy.ai/',
    demo: 'https://teacheasy.ai/',
    metrics: {
      performance: '2.3s avg response',
      complexity: 5,
      deployment: 'AWS ECS Fargate'
    }
  },
  // Add more projects...
];

const categories = [
  { id: 'all', label: 'All Projects', icon: <FiZap /> },
  { id: 'ai', label: 'AI Systems', color: '#10B981' },
  { id: 'iot', label: 'IoT Solutions', color: '#3B82F6' },
  { id: 'web', label: 'Web Platforms', color: '#EC4899' },
  { id: 'mobile', label: 'Mobile Apps', color: '#8B5CF6' }
];

const ProjectCard = ({ project }: { project: Project }) => {
  const magneticRef = useMagneticEffect(0.15);
  
  return (
    <motion.div
      key={project.id}
      ref={magneticRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, type: 'spring' }}
      className="group relative"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative overflow-hidden rounded-xl bg-[#161B22] border border-[#30363D]
                    hover:border-[#58A6FF] transition-all duration-300 h-full flex flex-col">
        {/* Image Section */}
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={225}
            className="object-cover transform transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-[#C9D1D9]">{project.title}</h3>
            {project.metrics?.complexity && (
              <div className="flex items-center gap-1 text-[#8B949E]">
                <FiStar className="text-[#FFD700]" />
                <span>{project.metrics.complexity}/5</span>
              </div>
            )}
          </div>
          
          <p className="text-[#8B949E] mb-4 flex-1">{project.description}</p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-[#0D1117] border border-[#30363D]
                         text-[#58A6FF] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="mt-auto pt-4 border-t border-[#30363D]">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#58A6FF]" />
                  <span className="text-[#8B949E]">{project.metrics.performance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#58A6FF]" />
                  <span className="text-[#8B949E]">{project.metrics.deployment}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0D1117] hover:bg-[#58A6FF] text-[#C9D1D9] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <FiGithub className="w-5 h-5" />
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0D1117] hover:bg-[#58A6FF] text-[#C9D1D9] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <FiExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredProjects = projects.filter(
    project => activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <section className="section-spacing bg-[var(--background)]">
      <div className="container-center">
        <motion.h2 
          className="text-5xl font-bold mb-12 text-center gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Technical Projects
        </motion.h2>

        {/* Animated Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-4 py-2 rounded-full text-sm flex items-center gap-2
                ${activeCategory === category.id 
                  ? 'text-white' 
                  : 'text-[#8B949E] hover:text-[#C9D1D9]'}`}
              whileHover={{ scale: 1.05 }}
              style={{
                background: activeCategory === category.id ? 
                  `linear-gradient(45deg, ${category.color} 0%, ${category.color}88 100%)` : '#161B22'
              }}
            >
              {category.id === 'all' && category.icon}
              {category.label}
              {activeCategory === category.id && (
                <motion.div 
                  className="absolute inset-0 border border-[#58A6FF] rounded-full"
                  layoutId="filter-active"
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="sync">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}