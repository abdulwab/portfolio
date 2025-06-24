'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NodeType = 'input' | 'output' | 'process' | 'ai';

interface WorkflowNode {
  id: string;
  x: number;
  y: number;
  type: NodeType;
  label: string;
  icon: string;
}

interface WorkflowConnection {
  from: string;
  to: string;
}

interface WorkflowType {
  id: string;
  title: string;
  description: string;
  steps: string[];
  color: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

const workflowTypes: WorkflowType[] = [
  {
    id: 'rag',
    title: 'RAG Pipeline',
    description: 'Retrieval-Augmented Generation with vector databases',
    steps: ['Document Ingestion', 'Embedding Generation', 'Vector Storage', 'Similarity Search', 'Context Injection', 'Response Generation'],
    color: '#10B981',
    nodes: [
      { id: 'input', x: 50, y: 100, type: 'input', label: 'User Query', icon: '🗣️' },
      { id: 'embed', x: 200, y: 100, type: 'process', label: 'Embed Query', icon: '🔢' },
      { id: 'search', x: 350, y: 100, type: 'process', label: 'Vector Search', icon: '🔍' },
      { id: 'context', x: 500, y: 100, type: 'process', label: 'Context Retrieval', icon: '📚' },
      { id: 'llm', x: 350, y: 200, type: 'ai', label: 'LLM Generation', icon: '🧠' },
      { id: 'output', x: 500, y: 200, type: 'output', label: 'Response', icon: '💬' },
    ],
    connections: [
      { from: 'input', to: 'embed' },
      { from: 'embed', to: 'search' },
      { from: 'search', to: 'context' },
      { from: 'context', to: 'llm' },
      { from: 'llm', to: 'output' },
    ]
  },
  {
    id: 'agent',
    title: 'Multi-Agent System',
    description: 'Collaborative agents with specialized roles',
    steps: ['Task Planning', 'Agent Assignment', 'Tool Selection', 'Execution', 'Result Synthesis', 'Quality Check'],
    color: '#58A6FF',
    nodes: [
      { id: 'coordinator', x: 275, y: 50, type: 'ai', label: 'Coordinator Agent', icon: '👑' },
      { id: 'researcher', x: 100, y: 150, type: 'ai', label: 'Research Agent', icon: '🔬' },
      { id: 'analyst', x: 275, y: 150, type: 'ai', label: 'Analysis Agent', icon: '📊' },
      { id: 'writer', x: 450, y: 150, type: 'ai', label: 'Writer Agent', icon: '✍️' },
      { id: 'tools', x: 100, y: 250, type: 'process', label: 'Search Tools', icon: '🛠️' },
      { id: 'data', x: 275, y: 250, type: 'process', label: 'Data Analysis', icon: '📈' },
      { id: 'output', x: 450, y: 250, type: 'output', label: 'Final Report', icon: '📄' },
    ],
    connections: [
      { from: 'coordinator', to: 'researcher' },
      { from: 'coordinator', to: 'analyst' },
      { from: 'coordinator', to: 'writer' },
      { from: 'researcher', to: 'tools' },
      { from: 'analyst', to: 'data' },
      { from: 'writer', to: 'output' },
      { from: 'tools', to: 'analyst' },
      { from: 'data', to: 'writer' },
    ]
  },
  {
    id: 'workflow',
    title: 'Agentic Workflow',
    description: 'Self-directed autonomous decision making',
    steps: ['Goal Analysis', 'Strategy Planning', 'Resource Allocation', 'Dynamic Execution', 'Self-Correction', 'Outcome Optimization'],
    color: '#F59E0B',
    nodes: [
      { id: 'goal', x: 50, y: 100, type: 'input', label: 'Goal Definition', icon: '🎯' },
      { id: 'planner', x: 200, y: 100, type: 'ai', label: 'Planning Agent', icon: '📋' },
      { id: 'executor', x: 350, y: 100, type: 'ai', label: 'Execution Agent', icon: '⚡' },
      { id: 'monitor', x: 500, y: 100, type: 'process', label: 'Monitor', icon: '👁️' },
      { id: 'feedback', x: 350, y: 200, type: 'process', label: 'Feedback Loop', icon: '🔄' },
      { id: 'optimizer', x: 200, y: 200, type: 'ai', label: 'Optimizer', icon: '🎛️' },
      { id: 'result', x: 500, y: 200, type: 'output', label: 'Optimized Result', icon: '✨' },
    ],
    connections: [
      { from: 'goal', to: 'planner' },
      { from: 'planner', to: 'executor' },
      { from: 'executor', to: 'monitor' },
      { from: 'monitor', to: 'feedback' },
      { from: 'feedback', to: 'optimizer' },
      { from: 'optimizer', to: 'planner' },
      { from: 'monitor', to: 'result' },
    ]
  }
];

const NodeComponent = ({ node, isActive, color }: { node: WorkflowNode, isActive: boolean, color: string }) => {
  const nodeStyles: Record<NodeType, string> = {
    input: 'bg-gradient-to-r from-blue-500 to-blue-600',
    output: 'bg-gradient-to-r from-green-500 to-green-600',
    process: 'bg-gradient-to-r from-purple-500 to-purple-600',
    ai: 'bg-gradient-to-r from-orange-500 to-orange-600',
  };

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <motion.circle
        cx={node.x}
        cy={node.y}
        r="25"
        className={`${nodeStyles[node.type]} drop-shadow-lg`}
        fill={isActive ? color : '#4B5563'}
        stroke={isActive ? '#FFFFFF' : '#6B7280'}
        strokeWidth="2"
        whileHover={{ scale: 1.1 }}
        style={{
          filter: isActive ? 'drop-shadow(0 0 10px rgba(88, 166, 255, 0.5))' : 'none'
        }}
      />
      <text
        x={node.x}
        y={node.y - 35}
        textAnchor="middle"
        className="text-xs font-medium fill-current text-theme-primary"
        style={{ fontSize: '10px' }}
      >
        {node.label}
      </text>
      <text
        x={node.x}
        y={node.y + 5}
        textAnchor="middle"
        className="text-lg"
      >
        {node.icon}
      </text>
    </motion.g>
  );
};

const ConnectionComponent = ({ from, to, nodes, isActive, color }: { 
  from: string, 
  to: string, 
  nodes: WorkflowNode[], 
  isActive: boolean, 
  color: string 
}) => {
  const fromNode = nodes.find(n => n.id === from);
  const toNode = nodes.find(n => n.id === to);
  
  if (!fromNode || !toNode) return null;

  return (
    <motion.line
      x1={fromNode.x}
      y1={fromNode.y}
      x2={toNode.x}
      y2={toNode.y}
      stroke={isActive ? color : '#4B5563'}
      strokeWidth="2"
      markerEnd="url(#arrowhead)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        filter: isActive ? 'drop-shadow(0 0 5px rgba(88, 166, 255, 0.3))' : 'none'
      }}
    />
  );
};

export function AIAgent() {
  const [activeWorkflow, setActiveWorkflow] = useState('rag');
  const [animationPhase, setAnimationPhase] = useState(0);

  const currentWorkflow = workflowTypes.find(w => w.id === activeWorkflow);

  // Auto-animate workflow phases
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % (currentWorkflow?.nodes.length || 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [currentWorkflow]);

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

          {/* Interactive Workflow Diagram */}
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
                {currentWorkflow?.title} Visualization
              </span>
            </div>

            {/* SVG Workflow Diagram */}
            <div className="bg-[var(--background)] rounded-xl p-4 border border-[var(--card-border)] h-80 overflow-hidden">
              <AnimatePresence mode="wait">
                {currentWorkflow && (
                  <motion.svg
                    key={currentWorkflow.id}
                    viewBox="0 0 600 300"
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Arrow marker definition */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3.5, 0 7"
                          fill={currentWorkflow.color}
                        />
                      </marker>
                    </defs>

                    {/* Connections */}
                    <g>
                      {currentWorkflow.connections.map((conn, index) => (
                        <ConnectionComponent
                          key={`${conn.from}-${conn.to}`}
                          from={conn.from}
                          to={conn.to}
                          nodes={currentWorkflow.nodes}
                          isActive={index <= animationPhase}
                          color={currentWorkflow.color}
                        />
                      ))}
                    </g>

                    {/* Nodes */}
                    <g>
                      {currentWorkflow.nodes.map((node, index) => (
                        <NodeComponent
                          key={node.id}
                          node={node}
                          isActive={index <= animationPhase}
                          color={currentWorkflow.color}
                        />
                      ))}
                    </g>
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>
            
            {/* Live Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Active Nodes', value: currentWorkflow?.nodes.length || 0, color: 'var(--accent-ai)' },
                { label: 'Connections', value: currentWorkflow?.connections.length || 0, color: 'var(--accent-iot)' },
                { label: 'Efficiency', value: '94.2%', color: 'var(--accent-web)' },
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