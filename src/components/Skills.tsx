'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { BeakerIcon, CpuChipIcon, CodeBracketIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

type Proficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
type Category = 'ai' | 'iot' | 'web' | 'mobile';

interface Skill {
  name: string;
  icon: string;
  proficiency: Proficiency;
  category: Category;
  tags: string[];
  details: string;
}

const skills: Skill[] = [
  // Web Development Skills
  { 
    name: 'React', 
    icon: '⚛️', 
    proficiency: 'Expert',
    category: 'web',
    tags: ['#Hooks', '#Redux', '#NextJS'],
    details: 'Built 20+ production applications'
  },
  // ... add more skills for each category

  // AI/ML Skills
  {
    name: 'LangChain',
    icon: '🔗',
    proficiency: 'Advanced',
    category: 'ai',
    tags: ['#RAG', '#Agents', '#LLM'],
    details: 'Developed custom AI agents for enterprise'
  },
  
  // IoT Skills
  {
    name: 'ESP32',
    icon: '⚡',
    proficiency: 'Expert',
    category: 'iot',
    tags: ['#MQTT', '#BLE', '#WiFi'],
    details: 'Deployed in 15+ IoT projects'
  },
];

const tabs = [
  { id: 'web', label: 'Web Development', icon: CodeBracketIcon, color: 'var(--accent-web)' },
  { id: 'ai', label: 'AI & ML', icon: BeakerIcon, color: 'var(--accent-ai)' },
  { id: 'iot', label: 'IoT', icon: CpuChipIcon, color: 'var(--accent-iot)' },
  { id: 'mobile', label: 'Mobile', icon: DevicePhoneMobileIcon, color: 'var(--accent-mobile)' }
];

// Move these utility functions outside of the Skills component
const getProficiencyColor = (proficiency: Proficiency) => {
  switch (proficiency) {
    case 'Expert': return '#16A34A';
    case 'Advanced': return '#2563EB';
    case 'Intermediate': return '#9333EA';
    case 'Beginner': return '#DB2777';
    default: return '#DB2777';
  }
};

const getProgressWidth = (proficiency: Proficiency) => {
  switch (proficiency) {
    case 'Expert': return '100%';
    case 'Advanced': return '80%';
    case 'Intermediate': return '60%';
    case 'Beginner': return '40%';
    default: return '40%';
  }
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Category>('web');
  const [showMore, setShowMore] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const swiperRef = useRef<any>(null);

  const filteredSkills = skills.filter(skill => skill.category === activeTab);
  const mainSkills = filteredSkills.slice(0, 6);
  const extraSkills = filteredSkills.slice(6);

  const handleTabChange = (tab: Category) => {
    setActiveTab(tab);
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(0);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-[#E5E7EB]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </motion.h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as Category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                       ${activeTab === tab.id ? 'bg-[#161B22] text-[#E5E7EB]' : 'text-github-text'}
                       hover:text-[#E5E7EB] whitespace-nowrap`}
              style={{
                boxShadow: activeTab === tab.id ? `0 0 12px ${tab.color}` : 'none',
                border: `2px solid ${activeTab === tab.id ? tab.color : '#30363D'}`
              }}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative"
             onMouseEnter={() => setIsAutoplayPaused(true)}
             onMouseLeave={() => setIsAutoplayPaused(false)}>
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{ clickable: true }}
            navigation
            className="skill-carousel"
          >
            {mainSkills.map((skill) => (
              <SwiperSlide key={skill.name}>
                <SkillCard skill={skill} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Show More Section */}
        {extraSkills.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-4 py-2 rounded-lg border-2 border-[#30363D] hover:border-[var(--accent-web)]
                       text-[#E5E7EB] transition-all duration-300"
            >
              {showMore ? 'Show Less' : `Show ${extraSkills.length} More`}
            </button>
          </div>
        )}

        {/* Extra Skills Grid */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
            >
              {extraSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SkillCard skill={skill} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      className="bg-[var(--bg-secondary)] p-6 rounded-lg border border-[var(--border-primary)] group
                hover:border-[var(--accent-web)] transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{skill.icon}</span>
        <h3 className="text-[var(--text-primary)] font-medium text-lg">{skill.name}</h3>
      </div>

      <div className="h-2 bg-[var(--border-primary)] rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: getProficiencyColor(skill.proficiency),
            width: getProgressWidth(skill.proficiency)
          }}
          initial={{ width: 0 }}
          animate={{ width: getProgressWidth(skill.proficiency) }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-md bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1
                    bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm rounded-lg 
                    border border-[var(--border-primary)] whitespace-nowrap">
        {skill.details}
      </div>
    </motion.div>
  );
} 