'use client';
import { useEffect, useRef } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow down the video slightly
    }
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   min-h-full min-w-full object-cover opacity-90"
          style={{
            maxWidth: '100%',
            maxHeight: '100vh'
          }}
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent 
                   via-[#0D1117]/10 to-[#0D1117]/30 backdrop-blur-[0.5px]"
        />
      </div>
    </div>
  );
} 