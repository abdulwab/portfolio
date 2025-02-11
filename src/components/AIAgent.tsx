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

export function AIAgent() {
  const [activeWorkflow, setActiveWorkflow] = useState('rag');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-[#58A6FF] to-[#10B981] bg-clip-text text-transparent">
            AI Agent Development
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Workflow Diagrams */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-4 mb-8">
              {['rag', 'agent'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveWorkflow(type)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeWorkflow === type
                      ? 'bg-[#58A6FF] text-white'
                      : 'text-[#8B949E] hover:bg-[#58A6FF]/10'
                  }`}
                >
                  {type === 'rag' ? 'RAG Pipeline' : 'Agent Workflow'}
                </button>
              ))}
            </div>

            <motion.div
              className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]"
              whileHover={{ scale: 1.02 }}
            >
              {/* Mermaid diagram placeholder */}
              <div className="aspect-video bg-[#0D1117] rounded-lg flex items-center justify-center text-[#8B949E]">
                Workflow Diagram
              </div>
            </motion.div>
          </motion.div>

          {/* Chat Demo */}
          <motion.div
            className="bg-[#161B22] rounded-xl border border-[#30363D] p-6"
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