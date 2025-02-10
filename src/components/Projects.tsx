'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'ai' | 'iot' | 'web' | 'mobile';
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    id: 'smart-home',
    title: 'Smart Home Hub',
    description: 'IoT-based home automation system using ESP32 and MQTT',
    image: '/projects/smart-home.jpg',
    tags: ['ESP32', 'MQTT', 'React', 'Node.js'],
    category: 'iot',
    github: 'https://github.com/yourusername/smart-home',
    demo: 'https://smart-home.demo.com'
  },
  {
    id: 'gpt-assistant',
    title: 'AI Research Assistant',
    description: 'Custom GPT-4 powered research assistant with RAG',
    image: '/projects/ai-assistant.jpg',
    tags: ['GPT-4', 'LangChain', 'Python'],
    category: 'ai',
    github: 'https://github.com/yourusername/ai-assistant'
  },
  // Add more projects...
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'iot', label: 'IoT' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = projects.filter(
    project => activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all
                ${activeCategory === category.id 
                  ? 'bg-accent-web text-white' 
                  : 'text-github-text hover:text-white hover:bg-accent-web/10'}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="sync">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="relative overflow-hidden rounded-lg bg-[#0D1117] border border-[#30363D]
                              transition-all duration-300 hover:border-accent-web
                              hover:shadow-lg hover:shadow-accent-web/10">
                  {/* Project Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transform transition-transform duration-500
                               group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-github-text mb-4">{project.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`tag tag-${project.category} text-xs`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Links */}
                  <div className="absolute inset-0 bg-[#0D1117]/80 opacity-0 group-hover:opacity-100
                                transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-[#161B22] hover:bg-accent-web transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-[#161B22] hover:bg-accent-web transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
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