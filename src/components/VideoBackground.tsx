'use client';
import { useCallback } from 'react';
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from 'tsparticles';

export default function VideoBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine as any);
  }, []);

  const backgroundConfig = {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 1000 } },
      color: { value: '#0ea5e9' },
      shape: { type: 'circle' },
      opacity: { 
        value: 0.3,
        random: true,
        anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 4,
        random: true,
        anim: { enable: true, speed: 1, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#0ea5e9',
        opacity: 0.1,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: true, rotateX: 600, rotateY: 1200 }
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "bubble" },
        resize: true
      },
      modes: {
        bubble: {
          distance: 200,
          size: 6,
          duration: 2,
          opacity: 0.4,
          speed: 2
        }
      }
    },
    retina_detect: true
  };

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="background-particles"
        init={particlesInit}
        options={backgroundConfig}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D1117]/50 to-[#0D1117]" />
    </div>
  );
} 