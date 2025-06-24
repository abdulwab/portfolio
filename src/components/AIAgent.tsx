'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatDemo from '@/components/ChatDemo';

const aiTechnologies = [
  {
    category: 'AI Frameworks',
    technologies: [
      { name: 'LangChain', icon: '⛓️', description: 'Advanced LLM application framework for complex workflows', color: '#10B981' },
      { name: 'LangGraph', icon: '🕸️', description: 'Graph-based agent orchestration and state management', color: '#3B82F6' },
      { name: 'LangSmith', icon: '🔍', description: 'LLM observability and debugging platform', color: '#8B5CF6' },
      { name: 'CrewAI', icon: '🤝', description: 'Multi-agent collaboration framework', color: '#F59E0B' },
    ]
  },
  {
    category: 'AI Models',
    technologies: [
      { name: 'OpenAI GPT-4', icon: '🧠', description: 'Advanced reasoning and multimodal capabilities', color: '#10B981' },
      { name: 'Anthropic Claude', icon: '🔮', description: 'Constitutional AI for safe and helpful responses', color: '#8B5CF6' },
      { name: 'Google Gemini', icon: '💎', description: 'Multimodal AI with native code understanding', color: '#3B82F6' },
      { name: 'DeepSeek', icon: '🔬', description: 'Advanced reasoning and mathematical capabilities', color: '#F59E0B' },
    ]
  },
  {
    category: 'Automation & Workflows',
    technologies: [
      { name: 'N8N', icon: '🔄', description: 'Node-based workflow automation platform', color: '#10B981' },
      { name: 'Make.com', icon: '🔧', description: 'Visual integration and automation platform', color: '#58A6FF' },
      { name: 'Zapier', icon: '⚡', description: 'App integration and workflow automation', color: '#F59E0B' },
      { name: 'Agentic Workflows', icon: '🤖', description: 'Self-directed autonomous agent patterns', color: '#8B5CF6' },
    ]
  }
];

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
  const [activeCategory, setActiveCategory] = useState(0);

  const currentWorkflow = workflowTypes.find(w => w.id === activeWorkflow);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117]">
      <div className="max-w-7xl mx-auto">
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
            <span className="bg-gradient-to-r from-[#58A6FF] via-[#10B981] to-[#F59E0B] bg-clip-text text-transparent">
              AI Agent Development
            </span>
          </motion.h2>
          <motion.p
            className="text-[#8B949E] text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Building intelligent autonomous systems that combine cutting-edge AI models with sophisticated 
            orchestration frameworks to create powerful, self-directed solutions.
          </motion.p>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-[#C9D1D9]">Technology Stack</h3>
          
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 bg-[#161B22] p-2 rounded-xl border border-[#30363D]">
              {aiTechnologies.map((category, index) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(index)}
                  className={`px-4 py-2 rounded-lg transition-all font-medium ${
                    activeCategory === index
                      ? 'bg-[#58A6FF] text-white shadow-lg'
                      : 'text-[#8B949E] hover:bg-[#58A6FF]/10 hover:text-[#58A6FF]'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {aiTechnologies[activeCategory].technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="bg-[#161B22] rounded-xl p-6 border border-[#30363D] hover:border-[#58A6FF] 
                           transition-all duration-300 hover:shadow-lg hover:shadow-[#58A6FF]/20 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{tech.icon}</span>
                    <h4 className="text-lg font-semibold text-[#C9D1D9]">{tech.name}</h4>
                  </div>
                  <p className="text-[#8B949E] text-sm leading-relaxed">{tech.description}</p>
                  <div 
                    className="w-full h-1 rounded-full mt-4"
                    style={{ backgroundColor: `${tech.color}40` }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: tech.color }}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
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
            <h3 className="text-2xl font-bold text-[#C9D1D9] mb-6">Agent Workflows</h3>
            
            <div className="flex flex-col gap-4 mb-8">
              {workflowTypes.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => setActiveWorkflow(type.id)}
                  className={`text-left p-4 rounded-xl transition-all border-2 ${
                    activeWorkflow === type.id
                      ? 'bg-[#161B22] border-[#58A6FF] shadow-lg shadow-[#58A6FF]/20'
                      : 'bg-[#161B22]/50 border-[#30363D] hover:border-[#58A6FF]/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="text-lg font-semibold text-[#C9D1D9] mb-2">{type.title}</h4>
                  <p className="text-[#8B949E] text-sm">{type.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Workflow Steps */}
            <AnimatePresence mode="wait">
              {currentWorkflow && (
                <motion.div
                  key={currentWorkflow.id}
                  className="bg-[#161B22] rounded-xl p-6 border border-[#30363D]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h4 className="text-xl font-semibold text-[#C9D1D9] mb-4">
                    {currentWorkflow.title} Steps
                  </h4>
                  <div className="space-y-3">
                    {currentWorkflow.steps.map((step, index) => (
                      <motion.div
                        key={step}
                        className="flex items-center gap-4 p-3 rounded-lg bg-[#0D1117] border border-[#30363D]"
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
                        <span className="text-[#C9D1D9] font-medium">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Chat Demo */}
          <motion.div
            className="bg-[#161B22] rounded-2xl border border-[#30363D] p-6 shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27CA3F]"></div>
              <span className="ml-4 text-[#8B949E] text-sm font-medium">
                {currentWorkflow?.title} Demo
              </span>
            </div>
            <ChatDemo />
            
            {/* Live Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Response Time', value: '1.2s', color: '#10B981' },
                { label: 'Accuracy', value: '98.5%', color: '#58A6FF' },
                { label: 'Tokens Used', value: '1,247', color: '#F59E0B' },
              ].map((metric) => (
                <div key={metric.label} className="text-center p-3 rounded-lg bg-[#0D1117] border border-[#30363D]">
                  <div className="text-lg font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-[#8B949E]">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-[#58A6FF] to-[#10B981] rounded-xl 
                     text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#58A6FF]/30
                     transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore AI Agent Solutions
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}