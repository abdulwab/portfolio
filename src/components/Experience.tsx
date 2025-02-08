'use client';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

type Experience = {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
  tags: string[];
  type: 'ai' | 'iot' | 'web' | 'mobile';
  icon: string;
};

const experiences: Experience[] = [
  {
    title: 'AI Solutions Architect',
    company: 'TechCorp AI',
    location: 'San Francisco, CA',
    date: '2023 - Present',
    description: [
      'Led development of GPT-4 powered customer service platform',
      'Implemented RAG pipeline for enterprise knowledge base',
      'Reduced response time by 60% using AI automation'
    ],
    tags: ['GPT-4', 'LangChain', 'RAG', 'Python', 'AWS'],
    type: 'ai',
    icon: '🤖'
  },
  {
    title: 'IoT Systems Engineer',
    company: 'SmartTech Solutions',
    location: 'Boston, MA',
    date: '2021 - 2023',
    description: [
      'Designed IoT architecture for smart building system',
      'Developed MQTT-based sensor network with 1000+ nodes',
      'Implemented edge computing for real-time analytics'
    ],
    tags: ['ESP32', 'MQTT', 'Docker', 'Node.js', 'MongoDB'],
    type: 'iot',
    icon: '🔌'
  },
  {
    title: 'Full Stack Developer',
    company: 'WebDev Inc',
    location: 'New York, NY',
    date: '2019 - 2021',
    description: [
      'Built scalable web applications using React and Node.js',
      'Implemented CI/CD pipelines and automated testing',
      'Optimized database performance and API response times'
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    type: 'web',
    icon: '💻'
  }
];

export default function Experience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Work Experience
        </motion.h2>

        <VerticalTimeline lineColor="#30363d">
          {experiences.map((experience, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element"
              contentStyle={{
                background: '#0D1117',
                border: '1px solid #30363d',
                borderRadius: '0.5rem',
                boxShadow: 'none',
              }}
              contentArrowStyle={{ borderRight: '7px solid #30363d' }}
              date={experience.date}
              dateClassName="text-github-text"
              iconStyle={{
                background: '#161B22',
                border: '1px solid #30363d',
                color: getAccentColor(experience.type),
                fontSize: '1.5rem',
              }}
              icon={<span>{experience.icon}</span>}
            >
              <div className="vertical-timeline-element-title-wrapper mb-4">
                <h3 className="text-lg font-semibold">{experience.title}</h3>
                <h4 className="text-github-text">
                  {experience.company} • {experience.location}
                </h4>
              </div>

              <ul className="list-disc list-inside mb-4 text-github-text space-y-1">
                {experience.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`tag tag-${experience.type} text-xs`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}

function getAccentColor(type: Experience['type']): string {
  switch (type) {
    case 'ai':
      return 'var(--accent-ai)';
    case 'iot':
      return 'var(--accent-iot)';
    case 'web':
      return 'var(--accent-web)';
    case 'mobile':
      return 'var(--accent-mobile)';
  }
} 