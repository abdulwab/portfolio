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
    color: { value: '#0ea5e9' },
    shape: { type: 'circle' },
    opacity: { 
      value: 0.5, 
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: { 
      value: 3, 
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#0ea5e9',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none" as const,
      random: true,
      straight: false,
      out_mode: "out" as const,
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      }
    }
  },
  retina_detect: true
};

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm an AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

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
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm a demo chatbot. In the real implementation, this would be connected to OpenAI's API.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine as any);
  }, []);

  return (
    <div className="relative z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0 -z-10"
      />
      <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-secondary)] h-[600px] flex flex-col relative">
        <div className="p-4 border-b border-[var(--border-primary)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">AI Assistant Demo</h3>
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
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[var(--accent-ai)] text-white'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)]'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] p-3 rounded-lg border border-[var(--border-primary)]">
                  <span className="animate-pulse">...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border-primary)]">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg px-4 py-2
                       border border-[var(--border-primary)] focus:outline-none focus:border-[var(--accent-ai)]
                       placeholder:text-[var(--text-secondary)]"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[var(--accent-ai)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-ai)]/90
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 