// MQTTDashboard.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiThermometer, FiDroplet, FiSun } from 'react-icons/fi';
import { Sparklines, SparklinesLine } from 'react-sparklines';

type SensorData = {
  id: string;
  type: string;
  value: number;
  unit: string;
  timestamp: Date;
  history: number[];
};

const generateMockData = (): SensorData[] => [
  {
    id: 'temp-1',
    type: 'Temperature',
    value: 22 + Math.random() * 5,
    unit: '°C',
    timestamp: new Date(),
    history: Array.from({ length: 10 }, () => 20 + Math.random() * 8)
  },
  {
    id: 'humid-1',
    type: 'Humidity',
    value: 45 + Math.random() * 10,
    unit: '%',
    timestamp: new Date(),
    history: Array.from({ length: 10 }, () => 40 + Math.random() * 15)
  },
  {
    id: 'light-1',
    type: 'Light',
    value: 500 + Math.random() * 200,
    unit: 'lux',
    timestamp: new Date(),
    history: Array.from({ length: 10 }, () => 300 + Math.random() * 400)
  },
];

export default function MQTTDashboard() {
  const [mounted, setMounted] = useState(false);
  const [sensors, setSensors] = useState<SensorData[]>([]);

  useEffect(() => {
    setMounted(true);
    setSensors(generateMockData());
  }, []);

  const getStatusColor = (type: string, value: number) => {
    const thresholds = {
      Temperature: { warn: 25, critical: 28 },
      Humidity: { warn: 60, critical: 75 },
      Light: { warn: 800, critical: 1000 }
    }[type];

    return value > thresholds.critical ? '#dc2626' :
           value > thresholds.warn ? '#f59e0b' :
           '#16a34a';
  };

  if (!mounted) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="sync">
          {sensors.map((sensor) => (
            <motion.div
              key={sensor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#58A6FF]/10 text-[#58A6FF]">
                    {sensor.type === 'Temperature' && <FiThermometer className="w-5 h-5" />}
                    {sensor.type === 'Humidity' && <FiDroplet className="w-5 h-5" />}
                    {sensor.type === 'Light' && <FiSun className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#C9D1D9]">{sensor.type}</h3>
                    <p className="text-sm text-[#8B949E]">
                      Updated {Math.floor((new Date().getTime() - sensor.timestamp.getTime()) / 1000)}s ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <Sparklines data={sensor.history} width={200} height={40}>
                  <SparklinesLine color={getStatusColor(sensor.type, sensor.value)} />
                </Sparklines>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-[#C9D1D9]">
                  {sensor.value.toFixed(1)}
                  <span className="text-sm ml-1 text-[#8B949E]">{sensor.unit}</span>
                </span>
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: getStatusColor(sensor.type, sensor.value) }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}