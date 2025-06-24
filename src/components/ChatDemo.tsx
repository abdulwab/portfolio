'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
};

const particlesConfig = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#58A6FF' },
    shape: { type: 'circle' },
    opacity: { 
      value: 0.3,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1 }
    },
    size: { 
      value: 2,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.1 }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#58A6FF',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none" as const,
      out_mode: "out" as const,
      attract: { enable: true, rotateX: 600, rotateY: 1200 }
    },
  },
  interactivity: {
    detect_on: "canvas" as const,
    events: {
      onhover: { enable: true, mode: "repulse" as const },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  retina_detect: true
} as const;

const aiResponses = {
  greetings: {
    patterns: [/^(hello|hi|hey|greetings)/i],
    responses: [
      "Hello! I'm an AI agent built with LangChain and GPT-4. I can help you with complex workflows, data analysis, and autonomous task execution. What would you like to explore?",
      "Hi there! I'm powered by advanced AI technologies including LangGraph for multi-agent orchestration. How can I assist you today?",
      "Greetings! I'm an agentic AI system that can reason, plan, and execute complex tasks. What challenge shall we tackle together?"
    ]
  },
  aiQuestions: {
    patterns: [/(ai|artificial intelligence|agent|langchain|gpt)/i],
    responses: [
      "I'm built using LangChain for orchestration, GPT-4 for reasoning, and vector databases for knowledge retrieval. I can demonstrate RAG pipelines, multi-agent workflows, and autonomous decision-making.",
      "As an AI agent, I combine multiple AI technologies: LangGraph for state management, CrewAI for collaboration, and advanced reasoning models like Claude and GPT-4. Want to see a specific workflow?",
      "I leverage agentic patterns including tool use, memory, and planning. I can show you how I process complex queries through retrieval-augmented generation and multi-step reasoning."
    ]
  },
  technical: {
    patterns: [/(code|programming|development|tech|stack)/i],
    responses: [
      "I work with modern tech stacks: Next.js, TypeScript, Python for AI backends, and cloud infrastructure. I can help with everything from API design to AI model deployment.",
      "My technical expertise spans full-stack development, AI/ML pipelines, IoT solutions, and cloud architecture. I use technologies like Docker, Kubernetes, and serverless functions.",
      "I'm experienced with automation tools like N8N, Make.com, and GitHub Actions. I can create end-to-end workflows that integrate AI with existing systems."
    ]
  },
  iot: {
    patterns: [/(iot|internet of things|sensor|device|mqtt|esp32)/i],
    responses: [
      "I work extensively with IoT: ESP32 microcontrollers, MQTT messaging, LoRaWAN networks, and edge AI processing. I can demonstrate sensor data processing and device orchestration.",
      "My IoT expertise includes Raspberry Pi edge computing, Zigbee mesh networks, and real-time data streaming. I bridge the gap between physical devices and AI systems.",
      "I create intelligent IoT solutions that combine sensor data with AI analysis, enabling predictive maintenance, smart automation, and real-time decision making."
    ]
  },
  projects: {
    patterns: [/(project|work|portfolio|example|demo)/i],
    responses: [
      "I've built AI-powered dashboards, autonomous agent systems, and intelligent IoT networks. Each project demonstrates different aspects of modern AI development.",
      "My recent work includes multi-agent systems for data analysis, RAG implementations for knowledge retrieval, and IoT platforms with AI-driven insights.",
      "I specialize in creating production-ready AI solutions: from chatbots and virtual assistants to complex automation workflows and intelligent monitoring systems."
    ]
  },
  automation: {
    patterns: [/(automation|workflow|n8n|make|zapier)/i],
    responses: [
      "I excel at creating intelligent automation with N8N, Make.com, and custom solutions. I can design workflows that adapt and learn from data patterns.",
      "My automation expertise includes agentic workflows that can make decisions, handle exceptions, and optimize themselves based on performance metrics.",
      "I build end-to-end automation pipelines that integrate AI reasoning with business processes, creating truly intelligent and adaptive systems."
    ]
  },
  default: {
    patterns: [/.*/],
    responses: [
      "That's an interesting question! As an AI agent, I can help with complex reasoning, data analysis, and task automation. Could you be more specific about what you'd like to explore?",
      "I'm designed to handle multifaceted challenges. Whether it's AI development, IoT solutions, or workflow automation, I can provide detailed insights and practical solutions.",
      "I'd be happy to dive deeper into that topic. My capabilities span AI development, system architecture, and intelligent automation. What specific aspect interests you most?"
    ]
  }
};

const quickActions = [
  { text: "Show AI workflow demo", icon: "🤖" },
  { text: "Explain RAG pipeline", icon: "🔍" },
  { text: "IoT project examples", icon: "📡" },
  { text: "Automation solutions", icon: "⚙️" }
];

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hello! I'm an AI agent powered by LangChain, GPT-4, and modern automation tools. I can demonstrate agentic workflows, RAG pipelines, and intelligent IoT solutions. What would you like to explore?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    // Find the best matching response category
    const responseCategory = Object.entries(aiResponses).find(([_, { patterns }]) => 
      patterns.some(pattern => pattern.test(lowerInput))
    );

    if (responseCategory) {
      const responses = responseCategory[1].responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }

    return aiResponses.default.responses[Math.floor(Math.random() * aiResponses.default.responses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage(input);
  };

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate realistic AI response time
    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages(prev => prev.filter(m => m.id !== 'typing'));
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1200 + Math.random() * 800); // 1.2-2s response time
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };



  return (
    <div className="flex flex-col h-[500px] bg-gradient-to-br from-[#0D1117] to-[#161B22] rounded-2xl border border-[#30363D] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#30363D] bg-[#161B22]/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#10B981] animate-ping opacity-30" />
            </div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-[#58A6FF] to-[#10B981] bg-clip-text text-transparent">
              AI Agent Assistant
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8B949E]">
            <span className="px-2 py-1 rounded-full bg-[#58A6FF]/20 text-[#58A6FF]">GPT-4</span>
            <span className="px-2 py-1 rounded-full bg-[#10B981]/20 text-[#10B981]">LangChain</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#30363D] scrollbar-track-transparent">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-[#58A6FF] to-[#3B82F6]' 
                    : 'bg-gradient-to-r from-[#10B981] to-[#059669]'
                }`}>
                  {message.sender === 'user' ? '👤' : '🤖'}
                </div>
                
                {/* Message */}
                <motion.div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#58A6FF] to-[#3B82F6] text-white rounded-tr-sm'
                      : 'bg-[#161B22] text-[#E5E7EB] border border-[#30363D] rounded-tl-sm'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {message.typing ? (
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-[#58A6FF] animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-[#58A6FF] animate-bounce delay-100" />
                        <div className="w-2 h-2 rounded-full bg-[#58A6FF] animate-bounce delay-200" />
                      </div>
                      <span className="text-[#8B949E]">AI thinking...</span>
                    </div>
                  ) : (
                    message.text
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-[#30363D]/50">
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.text}
              onClick={() => handleQuickAction(action.text)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#161B22]/50 border border-[#30363D] 
                       text-xs text-[#8B949E] hover:text-[#58A6FF] hover:border-[#58A6FF]/50 
                       transition-all duration-200 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              <span>{action.icon}</span>
              <span>{action.text}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#30363D] bg-[#161B22]/30 backdrop-blur-sm">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI agents, automation, or IoT solutions..."
              className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] 
                       text-[#E5E7EB] placeholder-[#8B949E] focus:border-[#58A6FF] 
                       focus:outline-none transition-colors"
              disabled={isLoading}
            />
          </div>
          <motion.button
            type="submit"
            className="p-3 rounded-xl bg-gradient-to-r from-[#58A6FF] to-[#10B981] 
                     text-white hover:shadow-lg hover:shadow-[#58A6FF]/30 
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!input.trim() || isLoading}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.button>
        </div>
      </form>
    </div>
  );
}