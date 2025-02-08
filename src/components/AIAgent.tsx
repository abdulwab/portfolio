'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Mermaid from '@/components/Mermaid';
import ChatDemo from '@/components/ChatDemo';

const workflows = {
  rag: `
    graph TD
      A[User Query] --> B[Query Analysis]
      B --> C[Document Retrieval]
      C --> D[Context Integration]
      D --> E[LLM Response]
      E --> F[User Interface]
  `,
  agent: `
    graph TD
      A[User Input] --> B[Task Planning]
      B --> C[Tool Selection]
      C --> D[Action Execution]
      D --> E[Result Synthesis]
      E --> F[Response Generation]
  `
};

export default function AIAgent() {
  const [activeWorkflow, setActiveWorkflow] = useState('rag');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-accent-web to-accent-ai 
                     bg-clip-text text-transparent animate-pulse"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          AI Agent Development
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Workflow Diagrams */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-4 mb-6">
              {['rag', 'agent'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveWorkflow(type)}
                  className={`px-4 py-2 rounded-full transition-all
                    ${activeWorkflow === type 
                      ? 'bg-accent-ai text-white' 
                      : 'text-github-text hover:text-white hover:bg-accent-ai/10'}`}
                >
                  {type === 'rag' ? 'RAG Pipeline' : 'Agent Workflow'}
                </button>
              ))}
            </div>

            <div className="bg-[#0D1117] p-6 rounded-lg border border-[#30363D]">
              <Mermaid chart={workflows[activeWorkflow as keyof typeof workflows]} />
            </div>
          </motion.div>

          {/* Right Column: Chat Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ChatDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 