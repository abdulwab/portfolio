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

  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://abdulwahab.live"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Agents",
        "item": "https://abdulwahab.live#ai-agents"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Skills",
        "item": "https://abdulwahab.live#skills"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "IoT Solutions",
        "item": "https://abdulwahab.live#iot"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Projects",
        "item": "https://abdulwahab.live#projects"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Contact",
        "item": "https://abdulwahab.live#contact"
      }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <main className="min-h-screen" role="main" itemScope itemType="https://schema.org/WebPage">
        <Navigation onOpenAssistant={() => setShowAssistantModal(true)} />
        
        <article itemScope itemType="https://schema.org/Person">
          <section id="home" className="pt-16" itemProp="description">
            <header>
              <Hero />
            </header>
          </section>
         
          <section id="ai-agents" aria-labelledby="ai-agents-heading" itemProp="knowsAbout">
            <h2 id="ai-agents-heading" className="sr-only">AI Agent Development Services</h2>
            <AIAgent />
          </section>
          
          <section id="skills" aria-labelledby="skills-heading" itemProp="hasOccupation">
            <h2 id="skills-heading" className="sr-only">Technical Skills and Expertise</h2>
            <Skills />
          </section>
          
          <section id="iot" aria-labelledby="iot-heading" itemProp="knowsAbout">
            <h2 id="iot-heading" className="sr-only">IoT Solutions and Smart Automation</h2>
            <IoTSolutions />
          </section>
          
          <section id="projects" aria-labelledby="projects-heading" itemProp="hasCredential">
            <h2 id="projects-heading" className="sr-only">Portfolio Projects and Case Studies</h2>
            <Projects />
          </section>
          
          <section id="contact" aria-labelledby="contact-heading" itemProp="contactPoint">
            <h2 id="contact-heading" className="sr-only">Contact Information and Get in Touch</h2>
            <Contact />
          </section>
        </article>

        {/* AI Assistant Modal that can be reopened */}
        <AIAssistantModal 
          isOpen={showAssistantModal} 
          onClose={() => setShowAssistantModal(false)} 
        />
      </main>
    </>
  );
}
