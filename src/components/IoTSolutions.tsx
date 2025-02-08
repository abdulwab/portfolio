'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DeviceMockup from './DeviceMockup';
import MQTTDashboard from './MQTTDashboard';

type Panel = {
  id: string;
  title: string;
  content: string;
  icon: string;
};

const technicalPanels: Panel[] = [
  {
    id: 'protocols',
    title: 'Communication Protocols',
    icon: '📡',
    content: `
      • MQTT: Lightweight pub/sub messaging protocol
      • CoAP: HTTP-like protocol for constrained devices
      • WebSocket: Real-time bidirectional communication
      • BLE: Low-energy device connectivity
    `
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    icon: '🏗️',
    content: `
      • Edge Computing: Local data processing
      • Cloud Integration: AWS IoT Core / Azure IoT Hub
      • Message Brokers: MQTT Broker (Mosquitto)
      • Security: TLS, OAuth2, Device Certificates
    `
  },
  {
    id: 'hardware',
    title: 'Hardware Stack',
    icon: '🔌',
    content: `
      • Microcontrollers: ESP32, Arduino
      • SBCs: Raspberry Pi, Jetson Nano
      • Sensors: Temperature, Humidity, Motion
      • Actuators: Relays, Motors, LEDs
    `
  }
];

export default function IoTSolutions() {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-accent-web to-accent-iot 
                     bg-clip-text text-transparent animate-pulse"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          IoT Solutions
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column: 3D Device Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D1117] p-6 rounded-lg border border-[#30363D]"
          >
            <DeviceMockup />
          </motion.div>

          {/* Right Column: MQTT Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D1117] p-6 rounded-lg border border-[#30363D]"
          >
            <MQTTDashboard />
          </motion.div>
        </div>

        {/* Technical Details Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {technicalPanels.map((panel) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0D1117] rounded-lg border border-[#30363D] overflow-hidden"
            >
              <button
                onClick={() => setExpandedPanel(expandedPanel === panel.id ? null : panel.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#161B22] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{panel.icon}</span>
                  <h3 className="font-semibold">{panel.title}</h3>
                </div>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedPanel === panel.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {expandedPanel === panel.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-[#30363D]"
                  >
                    <div className="p-4 whitespace-pre-line text-github-text">
                      {panel.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 