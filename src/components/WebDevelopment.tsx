'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type WebProject = {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  demo?: string;
  github?: string;
};

const webProjects: WebProject[] = [
  {
    title: 'AI-Powered E-commerce Platform',
    description: 'Next.js marketplace with GPT-4 product recommendations & real-time analytics',
    image: '/images/project1.jpg',
    techStack: ['Next.js 14', 'TypeScript', 'Stripe', 'LangChain', 'Redis'],
    demo: '#',
    github: '#'
  },
  {
    title: 'Real-time Collaboration Suite',
    description: 'Google Docs clone with multiplayer editing and version history',
    image: '/images/project2.jpg',
    techStack: ['React', 'WebSocket', 'CRDT', 'Node.js', 'PostgreSQL'],
    demo: '#',
    github: '#'
  },
  {
    title: 'DevOps Dashboard',
    description: 'Kubernetes monitoring with real-time cluster visualization',
    image: '/images/project3.jpg',
    techStack: ['Next.js', 'Go', 'Prometheus', 'Grafana', 'AWS EKS'],
    demo: '#',
    github: '#'
  },
  {
    title: 'AI Content Platform',
    description: 'Headless CMS with GPT-4 content generation and workflow automation',
    image: '/images/project4.jpg',
    techStack: ['Next.js', 'NestJS', 'OpenAI', 'Tiptap', 'MongoDB'],
    demo: '#',
    github: '#'
  }
];

const codeSnippet = `// lib/ai.ts - GPT-4 Content Generator
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function generateContent(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{
      role: 'user',
      content: \`Generate SEO-friendly content about: \${prompt}\`
    }],
    temperature: 0.7,
    max_tokens: 2000
  });

  return completion.choices[0].message.content;
}`;

export default function WebDevelopment() {
  return (
    <section id="web" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-8 text-[#E5E7EB]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Web Development & AI Integration
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {webProjects.map((project, i) => (
              <motion.div
                key={project.title}
                className="group relative rounded-xl border border-[#30363D] bg-[#161B22] overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <div className="aspect-video relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
                  
                  {/* Tech Stack Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 text-xs bg-[#58A6FF]/10 text-[#58A6FF] rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-[#E5E7EB]">{project.title}</h3>
                  <p className="text-sm text-[#8B949E] mb-4">{project.description}</p>
                  <div className="flex gap-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#58A6FF]/10 text-[#58A6FF] 
                                 hover:bg-[#58A6FF]/20 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#30363D] text-[#E5E7EB]
                                 hover:bg-[#30363D]/80 transition-colors"
                      >
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Code Preview & Expertise */}
          <div className="space-y-8 lg:sticky lg:top-24 lg:h-fit">
            {/* AI Integration Section */}
            <motion.div
              className="rounded-xl border border-[#30363D] bg-[#161B22] overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-4 border-b border-[#30363D] flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-sm text-[#8B949E]">lib/ai.ts</span>
              </div>
              <SyntaxHighlighter
                language="typescript"
                style={atomDark}
                customStyle={{
                  background: '#0D1117',
                  padding: '1rem',
                  margin: 0,
                  fontSize: '0.875rem',
                }}
              >
                {codeSnippet}
              </SyntaxHighlighter>
            </motion.div>

            {/* Core Expertise */}
            <motion.div
              className="p-6 rounded-xl border border-[#30363D] bg-[#161B22]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-[#E5E7EB]">Web Development Stack</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm text-[#8B949E]">Frameworks</h4>
                  <ul className="space-y-2">
                    {['Next.js 14', 'React 18', 'Node.js 20', 'Express', 'NestJS'].map((item) => (
                      <li key={item} className="text-sm text-[#E5E7EB] flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#58A6FF]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm text-[#8B949E]">Tooling</h4>
                  <ul className="space-y-2">
                    {['TypeScript', 'Webpack 5', 'Jest', 'Cypress', 'Docker'].map((item) => (
                      <li key={item} className="text-sm text-[#E5E7EB] flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#58A6FF]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}