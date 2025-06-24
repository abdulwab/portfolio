'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatDemo from '@/components/ChatDemo';

const workflowTypes = [
  {
    id: 'rag',
    title: 'RAG Pipeline',
    description: 'Retrieval-Augmented Generation with vector databases',
    steps: ['Document Ingestion', 'Embedding Generation', 'Vector Storage', 'Similarity Search', 'Context Injection', 'Response Generation'],
    color: '#10B981'
  },
  {
    id: 'agent',
    title: 'Multi-Agent System',
    description: 'Collaborative agents with specialized roles',
    steps: ['Task Planning', 'Agent Assignment', 'Tool Selection', 'Execution', 'Result Synthesis', 'Quality Check'],
    color: '#58A6FF'
  },
  {
    id: 'workflow',
    title: 'Agentic Workflow',
    description: 'Self-directed autonomous decision making',
    steps: ['Goal Analysis', 'Strategy Planning', 'Resource Allocation', 'Dynamic Execution', 'Self-Correction', 'Outcome Optimization'],
    color: '#F59E0B'
  }
];

export function AIAgent() {
  const [activeWorkflow, setActiveWorkflow] = useState('rag');

  const currentWorkflow = workflowTypes.find(w => w.id === activeWorkflow);

  return (
    <section className="section-spacing bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
      <div className="container-center">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">
              AI Agent Development
            </span>
          </motion.h2>
          <motion.p
            className="text-theme-secondary text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Building intelligent autonomous systems that combine cutting-edge AI models with sophisticated 
            orchestration frameworks to create powerful, self-directed solutions.
          </motion.p>
        </motion.div>

        {/* Workflow Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Workflow Types */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-theme-primary mb-6">Agent Workflows</h3>
            
            <div className="flex flex-col gap-4 mb-8">
              {workflowTypes.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => setActiveWorkflow(type.id)}
                  className={`text-left p-4 rounded-xl transition-all border-2 ${
                    activeWorkflow === type.id
                      ? 'bg-theme-card border-[var(--accent-ai)] shadow-lg shadow-[var(--accent-ai)]/20'
                      : 'bg-theme-card/50 border-[var(--card-border)] hover:border-[var(--accent-ai)]/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="text-lg font-semibold text-theme-primary mb-2">{type.title}</h4>
                  <p className="text-theme-secondary text-sm">{type.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Workflow Steps */}
            <AnimatePresence mode="wait">
              {currentWorkflow && (
                <motion.div
                  key={currentWorkflow.id}
                  className="bg-theme-card rounded-xl p-6 border border-[var(--card-border)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h4 className="text-xl font-semibold text-theme-primary mb-4">
                    {currentWorkflow.title} Steps
                  </h4>
                  <div className="space-y-3">
                    {currentWorkflow.steps.map((step, index) => (
                      <motion.div
                        key={step}
                        className="flex items-center gap-4 p-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)]"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: currentWorkflow.color }}
                        >
                          {index + 1}
                        </div>
                        <span className="text-theme-primary font-medium">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Chat Demo */}
          <motion.div
            className="bg-theme-card rounded-2xl border border-[var(--card-border)] p-6 shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27CA3F]"></div>
              <span className="ml-4 text-theme-secondary text-sm font-medium">
                {currentWorkflow?.title} Demo
              </span>
            </div>
            <ChatDemo />
            
            {/* Live Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Response Time', value: '1.2s', color: 'var(--accent-ai)' },
                { label: 'Accuracy', value: '98.5%', color: 'var(--accent-iot)' },
                { label: 'Tokens Used', value: '1,247', color: 'var(--accent-web)' },
              ].map((metric) => (
                <div key={metric.label} className="text-center p-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)]">
                  <div className="text-lg font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-theme-secondary">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}