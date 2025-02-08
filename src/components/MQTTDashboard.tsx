'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SensorData = {
  id: string;
  type: string;
  value: number;
  unit: string;
  timestamp: Date;
};

// Simulated sensor data
const generateMockData = (): SensorData[] => [
  {
    id: 'temp-1',
    type: 'Temperature',
    value: 22 + Math.random() * 2,
    unit: '°C',
    timestamp: new Date(),
  },
  {
    id: 'humid-1',
    type: 'Humidity',
    value: 45 + Math.random() * 5,
    unit: '%',
    timestamp: new Date(),
  },
  {
    id: 'light-1',
    type: 'Light',
    value: 500 + Math.random() * 100,
    unit: 'lux',
    timestamp: new Date(),
  },
];

export default function MQTTDashboard() {
  const [sensorData, setSensorData] = useState<SensorData[]>(generateMockData());

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(generateMockData());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Sensor Dashboard</h3>
      
      <div className="grid gap-4">
        <AnimatePresence mode="wait">
          {sensorData.map((sensor) => (
            <motion.div
              key={sensor.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-github-text">{sensor.type}</span>
                <span className="text-xs text-github-text opacity-60">
                  {sensor.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-mono">
                  {sensor.value.toFixed(1)}
                </span>
                <span className="text-github-text">{sensor.unit}</span>
              </div>
              <div className="mt-2 bg-[#0D1117] rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-accent-iot"
                  initial={{ width: 0 }}
                  animate={{ width: `${(sensor.value / getMaxValue(sensor.type)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function getMaxValue(type: string): number {
  switch (type) {
    case 'Temperature':
      return 30;
    case 'Humidity':
      return 100;
    case 'Light':
      return 1000;
    default:
      return 100;
  }
} 