'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DeviceMockup from './DeviceMockup';
import MQTTDashboard from './MQTTDashboard';
import { CpuChipIcon, WifiIcon, ServerIcon, BeakerIcon } from '@heroicons/react/24/outline';

type Panel = {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  projects: number;
};

const technicalPanels: Panel[] = [
  {
    id: 'protocols',
    title: 'Communication Protocols',
    icon: <WifiIcon className="w-6 h-6 text-[#58A6FF]" />,
    projects: 18,
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[#58A6FF] font-mono">MQTT</span>
          <div className="flex-1 h-px bg-[#30363D]" />
          <span className="text-[#8B949E] text-sm">Lightweight pub/sub protocol</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#58A6FF] font-mono">CoAP</span>
          <div className="flex-1 h-px bg-[#30363D]" />
          <span className="text-[#8B949E] text-sm">HTTP-like for low-power devices</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#58A6FF] font-mono">LoRaWAN</span>
          <div className="flex-1 h-px bg-[#30363D]" />
          <span className="text-[#8B949E] text-sm">Long-range wireless</span>
        </div>
      </div>
    )
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    icon: <ServerIcon className="w-6 h-6 text-[#58A6FF]" />,
    projects: 12,
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#58A6FF]" />
          <span className="flex-1">Edge Computing (ESP32)</span>
          <span className="text-[#8B949E] text-sm">15ms latency</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#58A6FF]" />
          <span className="flex-1">Cloud Integration (AWS IoT)</span>
          <span className="text-[#8B949E] text-sm">99.9% uptime</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#58A6FF]" />
          <span className="flex-1">Security (TLS 1.3)</span>
          <span className="text-[#8B949E] text-sm">AES-256</span>
        </div>
      </div>
    )
  },
  {
    id: 'hardware',
    title: 'Hardware Stack',
    icon: <CpuChipIcon className="w-6 h-6 text-[#58A6FF]" />,
    projects: 24,
    content: (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 p-2 border border-[#30363D] rounded-lg">
          <BeakerIcon className="w-4 h-4 text-[#58A6FF]" />
          <span className="text-sm">ESP32</span>
          <div className="flex-1" />
          <span className="text-xs text-[#8B949E]">15+ projects</span>
        </div>
        <div className="flex items-center gap-2 p-2 border border-[#30363D] rounded-lg">
          <BeakerIcon className="w-4 h-4 text-[#58A6FF]" />
          <span className="text-sm">Raspberry Pi</span>
          <div className="flex-1" />
          <span className="text-xs text-[#8B949E]">8+ deployments</span>
        </div>
        <div className="flex items-center gap-2 p-2 border border-[#30363D] rounded-lg">
          <BeakerIcon className="w-4 h-4 text-[#58A6FF]" />
          <span className="text-sm">Sensors</span>
          <div className="flex-1" />
          <span className="text-xs text-[#8B949E]">20+ types</span>
        </div>
        <div className="flex items-center gap-2 p-2 border border-[#30363D] rounded-lg">
          <BeakerIcon className="w-4 h-4 text-[#58A6FF]" />
          <span className="text-sm">Actuators</span>
          <div className="flex-1" />
          <span className="text-xs text-[#8B949E]">Relays/Motors</span>
        </div>
      </div>
    )
  }
];

export default function IoTSolutions() {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [sensorValue, setSensorValue] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Only set the value after component is mounted on client
    setSensorValue("41");
  }, []);

  // Don't render dynamic content until mounted
  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-[#58A6FF] to-[#3B82F6] bg-clip-text text-transparent">
            IoT Solutions
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden"
          >
            <div className="absolute top-4 left-4 z-10 bg-[#58A6FF]/10 text-[#58A6FF] px-3 py-1 rounded-full text-sm">
              Device Preview
            </div>
            <DeviceMockup />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#161B22] rounded-xl border border-[#30363D] p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#C9D1D9]">Live Sensor Data</h3>
              <div className="flex items-center gap-2 text-[#8B949E] text-sm">
                <div className="w-2 h-2 rounded-full bg-[#58A6FF] animate-pulse" />
                Connected
              </div>
            </div>
            <MQTTDashboard />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {technicalPanels.map((panel) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden"
            >
              <button
                onClick={() => setExpandedPanel(expandedPanel === panel.id ? null : panel.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-[#161B22]/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#58A6FF]/10">
                    {panel.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-[#C9D1D9]">{panel.title}</h3>
                    <p className="text-sm text-[#8B949E]">{panel.projects}+ projects</p>
                  </div>
                </div>
                <div className={`transform transition-transform ${expandedPanel === panel.id ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-[#8B949E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {expandedPanel === panel.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-[#30363D]"
                  >
                    <div className="p-4 text-[#8B949E] text-sm">
                      {panel.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        {sensorValue && <span>{sensorValue}</span>}
      </div>
    </section>
  );
}