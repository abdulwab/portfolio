import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects'
import IoTSolutions from '@/components/IoTSolutions';
import Experience from '@/components/Experience';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import WebDevelopment from '@/components/WebDevelopment';
import { AIAgent } from '@/components/AIAgent';
export default function Home() {
  return (
    <main>
      <Navigation />
      <section id="home">
        <Hero />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="web">
        <WebDevelopment />
      </section>
      <section id="ai">
        <AIAgent />
      </section>
      <section id="iot">
        <IoTSolutions />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
