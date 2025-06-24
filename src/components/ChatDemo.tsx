'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  typing?: boolean;
}

interface ChatDemoProps {
  className?: string;
}

const ABDUL_CONTEXT = `You are Abdul Wahab's Personal AI Assistant, representing Abdul Wahab - an expert AI Agent Developer and IoT Solutions Engineer from Lahore, Pakistan.

🔸 ABOUT ABDUL WAHAB:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CORE EXPERTISE:
• AI Agent Development: Expert in LangChain, LangGraph, LangSmith, CrewAI
• Agentic Workflows: Self-directed autonomous systems, multi-agent orchestration
• LLM Integration: OpenAI GPT-4, Anthropic Claude, Google Gemini, DeepSeek
• Vector Databases: Pinecone, Chroma, Qdrant, Weaviate for RAG pipelines
• Local AI: Ollama, LlamaIndex for privacy-focused solutions

AUTOMATION & WORKFLOWS:
• N8N: Node-based workflow automation (92% proficiency, 18 projects)
• Make.com: Visual integration platform (88% proficiency, 15 projects)
• Zapier: App integration automation (85% proficiency, 12 projects)
• Agentic Workflows: Autonomous decision-making patterns (90% proficiency)
• GitHub Actions: CI/CD and automation (90% proficiency, 25 projects)

IOT SOLUTIONS:
• Microcontrollers: ESP32, Arduino for IoT device development
• Communication: MQTT, LoRaWAN, Zigbee mesh networks
• Edge Computing: Raspberry Pi with AI processing capabilities
• Smart Home: Home Assistant, ESPHome integrations
• Sensors & Actuators: Environmental monitoring, automation control

FULL-STACK DEVELOPMENT:
• Frontend: Next.js (95%), React (92%), TypeScript (90%), Tailwind CSS (92%)
• Backend: Node.js (88%), Python for AI backends
• Databases: PostgreSQL with vector extensions, Redis for caching
• Cloud: AWS (88%), Vercel (90%), Docker (85%), Kubernetes (80%)
• Infrastructure: Terraform for IaC, Firebase for rapid development

RECENT PROJECTS & ACHIEVEMENTS:
• Built 15+ AI agent systems with LangChain/LangGraph
• Deployed 18+ automation workflows with N8N
• Created 21+ IoT solutions with ESP32 and MQTT
• Developed 22+ Next.js applications with modern stack
• Integrated 12+ vector database implementations for RAG

PERSONAL INFO:
• Location: Lahore, Pakistan 🇵🇰
• Experience: 5+ years in software development, 3+ years in AI/IoT
• Language: English, Urdu
• Availability: Open for new projects and consultations
• Response Time: Usually within 24 hours

CONTACT INFORMATION:
• Email: abdulwahabawan82@gmail.com
• WhatsApp: +92 321 942 4726
• LinkedIn: https://www.linkedin.com/in/abdul-wahab-7bb7b490/
• GitHub: https://github.com/abdulwab

🔸 YOUR ROLE AS ABDUL'S AI ASSISTANT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERSONALITY & TONE:
• Professional yet friendly and approachable
• Knowledgeable about technical concepts but explain in simple terms
• Enthusiastic about AI, automation, and IoT innovations
• Helpful in connecting visitor needs with Abdul's solutions
• Use appropriate emojis to make conversations engaging

CORE RESPONSIBILITIES:
• Welcome visitors warmly and offer assistance
• Explain Abdul's expertise in AI agents, IoT, and automation
• Help potential clients understand how Abdul can solve their problems
• Provide detailed technical information when requested
• Always mention Abdul's availability for projects and consultations
• Guide visitors to appropriate contact methods
• Convert technical curiosity into potential business opportunities

CONVERSATION GUIDELINES:
• Keep responses concise but informative (2-4 sentences typically)
• Ask follow-up questions to understand visitor needs better
• Provide specific examples of Abdul's work when relevant
• Always end with a call-to-action or next step
• If asked about pricing, mention that Abdul provides custom quotes
• For complex projects, suggest scheduling a consultation call

TECHNICAL EXPLANATIONS:
• Explain AI agents as autonomous software that can reason and act
• Describe IoT as connecting physical devices to intelligent systems
• Present automation as reducing manual work through smart workflows
• Use analogies and real-world examples when explaining complex concepts
• Always relate technical capabilities back to business value

Remember: You represent Abdul Wahab professionally. Be helpful, knowledgeable, and always aim to connect the visitor's needs with Abdul's expertise. Every conversation is an opportunity to showcase Abdul's capabilities and potentially generate new project opportunities.`;

export default function ChatDemo({ className = "" }: ChatDemoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hello! I'm Abdul Wahab's AI Assistant. I can help you learn about AI agent development, IoT solutions, and how Abdul can assist with your projects. What would you like to know?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: ABDUL_CONTEXT },
            ...messages.filter(m => !m.typing).map(m => ({ 
              role: m.role, 
              content: m.content 
            })),
            { role: 'user', content: input.trim() }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Remove typing indicator and add real response
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== 'typing');
        return [...filtered, {
          id: Date.now().toString(),
          content: data.message,
          role: 'assistant',
          timestamp: new Date()
        }];
      });

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== 'typing');
        return [...filtered, {
          id: Date.now().toString(),
          content: "I apologize, but I'm having trouble connecting right now. Please try again or contact Abdul directly at abdulwahabawan82@gmail.com",
          role: 'assistant',
          timestamp: new Date()
        }];
      });
      setIsOnline(false);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What AI frameworks does Abdul use?",
    "How can Abdul help with IoT projects?",
    "What is an agentic workflow?",
    "Tell me about Abdul's experience"
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className={`flex flex-col h-full bg-[var(--background)] rounded-xl border border-[var(--card-border)] ${className}`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--card-border)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent-ai)] to-[var(--accent-iot)] flex items-center justify-center">
              <span className="text-white text-sm font-bold">AW</span>
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[var(--background)] ${
              isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-theme-primary">Abdul Wahab's AI Assistant</h3>
            <p className="text-xs text-theme-secondary">
              {isOnline ? '🟢 Online - Ready to help' : '🔴 Connection issues'}
            </p>
          </div>
        </div>
        <div className="text-xs text-theme-secondary">
          AI Agent v2.0
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${
                message.role === 'user' 
                  ? 'bg-[var(--accent-ai)] text-white rounded-l-xl rounded-tr-xl' 
                  : 'bg-theme-card border border-[var(--card-border)] rounded-r-xl rounded-tl-xl'
              } p-3`}>
                {message.typing ? (
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-theme-secondary rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ 
                            duration: 0.6, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-theme-secondary text-sm ml-2">typing...</span>
                  </div>
                ) : (
                  <>
                    <p className={`text-sm whitespace-pre-wrap ${
                      message.role === 'user' ? 'text-white' : 'text-theme-primary'
                    }`}>
                      {message.content}
                    </p>
                    <div className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-white/70' : 'text-theme-secondary'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-theme-secondary mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question) => (
              <motion.button
                key={question}
                onClick={() => setInput(question)}
                className="text-xs px-3 py-1 bg-theme-card border border-[var(--card-border)] 
                         rounded-full hover:border-[var(--accent-ai)] hover:bg-[var(--accent-ai)]/10
                         text-theme-secondary hover:text-[var(--accent-ai)] transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {question}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-[var(--card-border)]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about AI agents, IoT solutions, or Abdul's expertise..."
            className="flex-1 px-3 py-2 text-sm bg-[var(--background)] border border-[var(--card-border)]
                     rounded-lg text-theme-primary placeholder-theme-secondary
                     focus:border-[var(--accent-ai)] focus:outline-none transition-colors"
            disabled={isLoading}
          />
          <motion.button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-[var(--accent-ai)] text-white rounded-lg text-sm font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent-ai)]/90
                     transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? '...' : '→'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}