'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from 'tsparticles';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
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
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  retina_detect: true
};

const predefinedResponses = {
  greetings: {
    patterns: [/^hello/i, /^hi/i, /^hey/i],
    answers: [
      "Hello! How can I assist you today?",
      "Hi there! What can I do for you?",
      "Greetings! How may I help you?"
    ]
  },
  thanks: {
    patterns: [/thank you/i, /thanks/i],
    answers: [
      "You're welcome! Let me know if you need anything else.",
      "My pleasure! Feel free to ask if you have more questions.",
      "Glad to help! Don't hesitate to reach out again."
    ]
  },
  farewell: {
    patterns: [/bye/i, /goodbye/i],
    answers: [
      "Goodbye! Have a great day!",
      "Farewell! Come back anytime you need help.",
      "See you later! 👋"
    ]
  }
};

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    // Check for matching patterns
    const responseType = Object.entries(predefinedResponses).find(([_, { patterns }]) => 
      patterns.some(pattern => pattern.test(lowerInput))
    );

    if (responseType) {
      const responses = responseType[1].answers;
      return responses[Math.floor(Math.random() * responses.length)];
    }

    return "I'm a demo chatbot. In a real implementation, this would connect to an AI API like OpenAI.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const botResponse = getResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative h-full">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0 opacity-30 pointer-events-none"
      />
      
      <div className="flex flex-col h-full bg-[#0D1117] rounded-xl border border-[#30363D] shadow-xl relative z-10">
        <div className="p-4 border-b border-[#30363D]">
          <h3 className="text-lg font-semibold text-[#E5E7EB] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#58A6FF] animate-pulse" />
            AI Assistant
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-[#58A6FF] text-white'
                      : 'bg-[#161B22] text-[#E5E7EB] border border-[#30363D]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {message.text}
                </motion.div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-[#161B22] text-[#8B949E] p-3 rounded-lg border border-[#30363D] flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#58A6FF] animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#58A6FF] animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#58A6FF] animate-bounce delay-200" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="p-4 border-t border-[#30363D] relative z-20"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-[#161B22] text-[#E5E7EB] rounded-lg px-4 py-2
                       border border-[#30363D] focus:outline-none focus:border-[#58A6FF]
                       placeholder:text-[#6E7681] text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#58A6FF] text-white px-4 py-2 rounded-lg hover:bg-[#58A6FF]/90
                       disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors
                       flex items-center gap-2"
            >
              Send
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}