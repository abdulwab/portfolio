export type SkillCategory = 'ai' | 'iot' | 'web' | 'mobile' | 'cloud' | 'languages';

export interface Skill {
  name: string;
  projectCount: number;
  description?: string;
  tags: string[];
}

export interface SkillGroup {
  id: SkillCategory;
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export const skillsData: SkillGroup[] = [
  {
    id: 'ai',
    title: 'AI & ML',
    icon: '🤖',
    color: '#10B981', // Emerald
    skills: [
      { 
        name: 'OpenAI GPT-4', 
        projectCount: 8, 
        tags: ['LLM', 'NLP', 'API'],
        description: 'Built custom AI agents and chatbots'
      },
      { 
        name: 'LangChain', 
        projectCount: 5, 
        tags: ['RAG', 'Agents', 'Embeddings'],
        description: 'Developed enterprise knowledge bases'
      },
      { 
        name: 'TensorFlow', 
        projectCount: 3, 
        tags: ['ML', 'Neural Networks', 'Computer Vision'],
        description: 'Image classification systems'
      },
      { 
        name: 'NLP', 
        projectCount: 4, 
        tags: ['BERT', 'Transformers', 'Text Analysis'],
        description: 'Text processing pipelines'
      }
    ]
  },
  {
    id: 'iot',
    title: 'IoT & Embedded',
    icon: '⚡',
    color: '#F59E0B', // Amber
    skills: [
      { 
        name: 'ESP32', 
        projectCount: 12, 
        tags: ['WiFi', 'BLE', 'MQTT'],
        description: 'Smart home automation systems'
      },
      { 
        name: 'Raspberry Pi', 
        projectCount: 6, 
        tags: ['Linux', 'GPIO', 'Python'],
        description: 'Edge computing devices'
      },
      { 
        name: 'MQTT', 
        projectCount: 8, 
        tags: ['Mosquitto', 'PubSub', 'IoT Protocol'],
        description: 'Real-time sensor networks'
      },
      { 
        name: 'Zigbee', 
        projectCount: 4, 
        tags: ['Mesh Network', 'Low Power', 'Home Assistant'],
        description: 'Smart device networks'
      }
    ]
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: '💻',
    color: '#3B82F6', // Blue
    skills: [
      { 
        name: 'React', 
        projectCount: 15, 
        tags: ['Next.js', 'Redux', 'Hooks'],
        description: 'Enterprise web applications'
      },
      { 
        name: 'Node.js', 
        projectCount: 10, 
        tags: ['Express', 'REST APIs', 'GraphQL'],
        description: 'Scalable backend services'
      },
      { 
        name: 'MongoDB', 
        projectCount: 8, 
        tags: ['Mongoose', 'Atlas', 'Aggregation'],
        description: 'Database architecture'
      },
      { 
        name: 'WebSocket', 
        projectCount: 6, 
        tags: ['Socket.io', 'Real-time', 'Events'],
        description: 'Live collaboration features'
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile & Tools',
    icon: '📱',
    color: '#EC4899', // Pink
    skills: [
      { 
        name: 'React Native', 
        projectCount: 5, 
        tags: ['iOS', 'Android', 'Expo'],
        description: 'Cross-platform mobile apps'
      },
      { 
        name: 'Flutter', 
        projectCount: 3, 
        tags: ['Dart', 'Material', 'Cupertino'],
        description: 'Native performance apps'
      },
      { 
        name: 'Git', 
        projectCount: 20, 
        tags: ['GitHub', 'GitFlow', 'CI/CD'],
        description: 'Version control & collaboration'
      },
      { 
        name: 'Postman', 
        projectCount: 15, 
        tags: ['API Testing', 'Documentation', 'Automation'],
        description: 'API development & testing'
      }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: '☁️',
    color: '#6366F1', // Indigo
    skills: [
      { 
        name: 'AWS', 
        projectCount: 7, 
        tags: ['Lambda', 'S3', 'EC2'],
        description: 'Serverless architectures'
      },
      { 
        name: 'Docker', 
        projectCount: 9, 
        tags: ['Kubernetes', 'CI/CD', 'Jenkins'],
        description: 'Container orchestration'
      },
      { 
        name: 'Google Cloud', 
        projectCount: 5, 
        tags: ['Firebase', 'Cloud Run', 'BigQuery'],
        description: 'Cloud-native solutions'
      },
      { 
        name: 'Azure', 
        projectCount: 4, 
        tags: ['Functions', 'DevOps', 'CosmosDB'],
        description: 'Enterprise cloud systems'
      }
    ]
  },
  {
    id: 'languages',
    title: 'Languages',
    icon: '🔤',
    color: '#8B5CF6', // Violet
    skills: [
      { 
        name: 'TypeScript', 
        projectCount: 20, 
        tags: ['ES6+', 'OOP', 'Generics'],
        description: 'Type-safe applications'
      },
      { 
        name: 'Python', 
        projectCount: 15, 
        tags: ['Django', 'FastAPI', 'NumPy'],
        description: 'Backend & ML development'
      },
      { 
        name: 'Java', 
        projectCount: 5, 
        tags: ['Spring', 'Maven', 'JUnit'],
        description: 'Enterprise applications'
      },
      { 
        name: 'C++', 
        projectCount: 3, 
        tags: ['STL', 'Embedded', 'Performance'],
        description: 'System programming'
      }
    ]
  }
]; 