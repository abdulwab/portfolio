'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatDemo from './ChatDemo';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistantModal({ isOpen, onClose }: AIAssistantModalProps) {
  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef<{ sendMessage: (message: string) => void }>(null);

  useEffect(() => {
    if (isOpen) {
      // Show chat after a brief delay for better UX
      const timer = setTimeout(() => setShowChat(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowChat(false);
    }
  }, [isOpen]);

  const quickActions = [
    {
      title: "🤖 AI Agent Development",
      description: "Learn about LangChain, CrewAI & modern agent frameworks",
      action: "Tell me about Abdul's AI agent expertise and experience with LangChain, CrewAI, and modern agent frameworks"
    },
    {
      title: "📅 Book Consultation", 
      description: "Schedule a free 30-minute strategy session",
      action: "I want to book a consultation meeting with Abdul. How can I schedule a 30-minute strategy session?"
    },
    {
      title: "🚀 View Projects",
      description: "Explore Abdul's portfolio and case studies",
      action: "Show me Abdul's recent AI agent projects and case studies. What kind of solutions has he built?"
    },
    {
      title: "🔧 IoT Solutions",
      description: "Discover smart home and automation projects",
      action: "What IoT solutions and smart home automation projects has Abdul developed? Tell me about his IoT expertise."
    }
  ];

  const handleQuickAction = (actionText: string) => {
    // Send message directly to chat
    if (chatRef.current && chatRef.current.sendMessage) {
      chatRef.current.sendMessage(actionText);
    } else {
      // Fallback: try to find input and trigger it
      setTimeout(() => {
        const chatInput = document.querySelector('input[placeholder*="Ask about"]') as HTMLInputElement;
        const sendButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
        
        if (chatInput && sendButton) {
          chatInput.value = actionText;
          chatInput.dispatchEvent(new Event('input', { bubbles: true }));
          sendButton.click();
        }
      }, 100);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-6xl max-h-[95vh] bg-theme-card rounded-3xl 
                         border border-[var(--card-border)] shadow-2xl overflow-hidden flex flex-col"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--background)]/80 
                         border border-[var(--border-primary)] flex items-center justify-center
                         text-theme-secondary hover:text-theme-primary transition-all duration-300
                         hover:bg-[var(--background)] z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
                  {/* Left Side - Welcome & Actions */}
                  <div className="p-8 flex flex-col justify-center bg-gradient-to-br 
                                from-[var(--accent-ai)]/10 via-transparent to-[var(--accent-iot)]/10 
                                min-h-[600px]">
                    {/* Avatar & Greeting */}
                    <motion.div
                      className="text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="relative mx-auto mb-6 w-20 h-20">
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-[var(--accent-ai)] 
                                      to-[var(--accent-iot)] p-1">
                          <div className="w-full h-full bg-[var(--background)] rounded-full flex items-center 
                                        justify-center text-2xl font-bold text-theme-primary">
                            AW
                          </div>
                        </div>
                        {/* Online Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full 
                                      border-3 border-[var(--background)] flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      </div>

                      <motion.h2 
                        className="text-3xl font-bold text-theme-primary mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        👋 Hi there! I&apos;m Abdul&apos;s AI Assistant
                      </motion.h2>
                      
                      <motion.p 
                        className="text-theme-secondary text-lg leading-relaxed max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        I&apos;m here to help you explore Abdul&apos;s expertise in{' '}
                        <span className="text-[var(--accent-ai)] font-semibold">AI Agents</span>,{' '}
                        <span className="text-[var(--accent-iot)] font-semibold">IoT Solutions</span>, and{' '}
                        <span className="text-[var(--accent-web)] font-semibold">Automation</span>.
                        What can I help you with today?
                      </motion.p>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                      className="space-y-3 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      {quickActions.map((action, index) => (
                        <motion.button
                          key={action.title}
                          className="w-full p-4 rounded-xl bg-theme-card border border-[var(--border-primary)]
                                   hover:border-[var(--accent-ai)] hover:bg-[var(--accent-ai)]/5
                                   transition-all duration-300 text-left group cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuickAction(action.action)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{action.title.split(' ')[0]}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-theme-primary group-hover:text-[var(--accent-ai)] 
                                           transition-colors">
                                {action.title.substring(2)}
                              </h3>
                              <p className="text-sm text-theme-secondary mt-1">{action.description}</p>
                            </div>
                            <svg className="w-5 h-5 text-theme-secondary group-hover:text-[var(--accent-ai)] 
                                         group-hover:translate-x-1 transition-all" 
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      <p className="text-sm text-theme-secondary mb-4">
                        Ready to transform your ideas with AI? 🚀
                      </p>
                      <a
                        href="https://zcal.co/abdul-wahab/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r 
                                 from-[var(--accent-ai)] to-[var(--accent-iot)] rounded-xl text-white 
                                 font-semibold hover:shadow-lg hover:shadow-[var(--accent-ai)]/30
                                 transition-all duration-300 hover:scale-105"
                      >
                        <span>📅</span>
                        Book Free Consultation
                      </a>
                    </motion.div>
                  </div>

                  {/* Right Side - Chat Interface */}
                  <div className="p-6 flex flex-col min-h-[600px]">
                    <motion.div
                      className="flex-1 flex flex-col"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: showChat ? 1 : 0, x: showChat ? 0 : 20 }}
                      transition={{ delay: 1.0 }}
                    >
                      {showChat && (
                        <div className="h-full flex flex-col">
                          <div className="mb-4 text-center flex-shrink-0">
                            <h3 className="text-xl font-semibold text-theme-primary mb-2">
                              💬 Chat with Abdul&apos;s AI Assistant
                            </h3>
                            <p className="text-sm text-theme-secondary">
                              Ask me anything about AI agents, IoT projects, or Abdul&apos;s expertise
                            </p>
                          </div>
                          
                          <div className="flex-1 min-h-[500px]">
                            <ChatDemo ref={chatRef} className="h-full" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 