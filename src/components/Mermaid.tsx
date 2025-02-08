'use client';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#0D1117',
    primaryTextColor: '#c9d1d9',
    primaryBorderColor: '#30363d',
    lineColor: '#8b949e',
    secondaryColor: '#161b22',
    tertiaryColor: '#21262d',
  },
});

export default function Mermaid({ chart }: { chart: string }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      mermaid.render('mermaid', chart).then(({ svg }) => {
        if (elementRef.current) {
          elementRef.current.innerHTML = svg;
        }
      });
    }
  }, [chart]);

  return <div ref={elementRef} className="mermaid" />;
} 