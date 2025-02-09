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
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory and payments',
    image: '/projects/ecommerce.jpg',
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL'],
    demo: 'https://demo.store',
    github: 'https://github.com/yourusername/ecommerce'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard with dark mode',
    image: '/projects/dashboard.jpg',
    techStack: ['React', 'D3.js', 'TailwindCSS', 'Node.js', 'MongoDB'],
    demo: 'https://dashboard.demo',
    github: 'https://github.com/yourusername/dashboard'
  },
  {
    title: 'SaaS Platform',
    description: 'Multi-tenant SaaS application with subscription management',
    image: '/projects/saas.jpg',
    techStack: ['Next.js', 'tRPC', 'Prisma', 'Auth.js', 'PostgreSQL'],
    demo: 'https://saas.demo',
    github: 'https://github.com/yourusername/saas'
  }
];

const codeSnippet = `// pages/api/products/[id].ts
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  
  try {
    const product = await prisma.product.findUnique({
      where: { id: String(id) },
      include: { 
        category: true,
        reviews: true 
      }
    })
    
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}`;

export default function WebDevelopment() {
  return (
    <section id="web" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Web Development
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {webProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  className="relative group rounded-lg border-2 border-[#30363D] overflow-hidden
                           bg-[#161B22] hover:border-accent-web transition-all duration-300"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="aspect-video relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100
                                  transition-opacity duration-300 p-4">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="text-xs bg-[#58A6FF]/20 text-[#58A6FF] 
                                                    px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-github-text mb-4">{project.description}</p>
                    <div className="flex gap-4">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#58A6FF] hover:text-white hover:bg-[#58A6FF]/20
                                   px-3 py-1 rounded transition-all duration-300"
                        >
                          Live Demo →
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-github-text hover:text-white hover:bg-[#30363D]
                                   px-3 py-1 rounded transition-all duration-300"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-6">Core Web Expertise</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-github-text">Frameworks & Libraries</h4>
                  <ul className="space-y-2">
                    {['React', 'Next.js', 'Angular', 'Vue.js'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-web" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-github-text">Tools & Performance</h4>
                  <ul className="space-y-2">
                    {[
                      'Webpack & Vite',
                      'Jest & Testing Library',
                      'CI/CD Pipelines',
                      '95+ Lighthouse Score'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-web" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="lg:sticky lg:top-24 h-fit"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg border-2 border-[#30363D] overflow-hidden">
              <div className="bg-[#161B22] p-2 border-b border-[#30363D] flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-sm text-github-text">products/[id].ts</span>
              </div>
              <SyntaxHighlighter
                language="typescript"
                style={atomDark}
                customStyle={{
                  background: '#0D1117',
                  padding: '1rem',
                  margin: 0,
                  borderRadius: 0,
                }}
              >
                {codeSnippet}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 