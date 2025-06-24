'use client';
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects'
import IoTSolutions from '@/components/IoTSolutions';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import AIAssistantModal from '@/components/AIAssistantModal';
import { AIAgent } from '@/components/AIAgent';

export default function Home() {
  const [showAssistantModal, setShowAssistantModal] = useState(false);

  useEffect(() => {
    // Show AI Assistant Modal for first-time visitors
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowAssistantModal(true);
        localStorage.setItem('hasVisited', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Navigation onOpenAssistant={() => setShowAssistantModal(true)} />
      <section id="home" className="pt-16">
        <Hero />
      </section>
     
      <section id="ai-agents">
        <AIAgent />
      </section>
      
      <section id="skills">
        <Skills />
      </section>
      
      <section id="iot">
        <IoTSolutions />
      </section>
      
      <section id="projects">
        <Projects />
      </section>
      
      <section id="contact">
        <Contact />
      </section>

      {/* AI Assistant Modal that can be reopened */}
      <AIAssistantModal 
        isOpen={showAssistantModal} 
        onClose={() => setShowAssistantModal(false)} 
      />
    </main>
  );
}
