import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects'
import IoTSolutions from '@/components/IoTSolutions';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';

import { AIAgent } from '@/components/AIAgent';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section id="home" className="pt-20">
        <Hero />
      </section>
     
      <section id="ai-agents" className="py-20">
        <AIAgent />
      </section>
      
      <section id="skills" className="py-20">
        <Skills />
      </section>
      
      <section id="iot" className="py-20">
        <IoTSolutions />
      </section>
      
      <section id="projects" className="py-20">
        <Projects />
      </section>
      
      <section id="contact" className="py-20">
        <Contact />
      </section>
    </main>
  );
}
