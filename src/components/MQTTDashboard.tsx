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
  const [data, setData] = useState<SensorData[]>(generateMockData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence mode="sync">
        {data.map((sensor) => (
          <motion.div
            key={sensor.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{sensor.type}</h3>
              <span className="text-sm text-github-text">
                {new Date(sensor.timestamp).toLocaleTimeString()}
              </span>
            </div>
            
            <div className="relative h-2 bg-[#30363D] rounded-full mb-2">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full bg-accent-iot"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(sensor.value / getMaxValue(sensor.type)) * 100}%` 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {sensor.value}
                <span className="text-sm ml-1 text-github-text">
                  {sensor.unit}
                </span>
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
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