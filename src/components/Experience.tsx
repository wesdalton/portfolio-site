import { useState } from 'react';
import { motion } from 'framer-motion';

type ExperienceItem = {
  company: string;
  title: string;
  date: string;
  location: string;
  description: string[];
  skills: string[];
};

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      company: 'FLORA',
      title: 'Software Engineering Intern',
      date: 'Jun 2024 - Aug 2024',
      location: 'New York, NY',
      description: [
        'Implemented features, pushed bug fixes, interviewed designers for user feedback, and discussed internal development infrastructure.',
        'Assisted in go-to-market strategy for beta launch, including a realtime AI streaming landing page and sculpture gallery launch event.'
      ],
      skills: ['React', 'AI', 'Product Development', 'User Experience']
    },
    {
      company: 'AI Business Club at Penn (AIBC)',
      title: 'Project Leader',
      date: 'Aug 2024 - Present',
      location: 'Philadelphia, PA',
      description: [
        'Led a team of 10 Computer Science and Finance students to develop an AI-driven predictive analytics pipeline for Prognos Health, optimizing CRM workflows by automating lead qualification, outreach, and sales intelligence.',
        'Enhanced targeting of pharmaceutical buyers, reducing manual effort and accelerating the sales cycle increasing productivity.',
        'Consult with various companies looking to enhance workflows or product features by integrating AI solutions.',
        'Research and implement advanced AI technologies such as RAG, fine-tuning LLMs, and creating custom AI-driven applications.'
      ],
      skills: ['AI/ML', 'Project Management', 'LLMs', 'RAG', 'Team Leadership']
    },
    {
      company: 'Menlo Ventures',
      title: 'Investment Analyst',
      date: 'Feb 2023 - Present',
      location: 'Philadelphia, PA',
      description: [
        'Experiential venture program with $21B AUM and collaborates with 5 student analysts, offering sourcing analysis to VC funds.',
        'Conduct investment analysis to identify startups for potential funding; participate in weekly meetings on market trends.'
      ],
      skills: ['Market Analysis', 'Investment Research', 'Financial Modeling', 'Startup Evaluation']
    },
    {
      company: 'DiversaTech Penn',
      title: 'Engineering Consultant',
      date: 'Aug 2024 - Present',
      location: 'Philadelphia, PA',
      description: [
        'Designed and implemented a system for generating high-quality synthetic data to train AI models for a civic engagement platform.',
        'Collaborated with experts to overcome data quality and model accuracy challenges, creating a robust and scalable solution.'
      ],
      skills: ['Data Engineering', 'Synthetic Data Generation', 'AI/ML', 'Consulting']
    },
    {
      company: 'Gamma Technologies',
      title: 'Founder',
      date: '2021 - 2022',
      location: 'New York, NY',
      description: [
        'Developed private CLI-based software focused on reverse engineering mobile applications to obtain limited clothing and footwear; identified and utilized public mobile endpoints from various retailers to monitor stock and release information.',
        'Built and designed platform providing free monitoring services including COVID-related tools like vaccine and at-home test finders.'
      ],
      skills: ['CLI Development', 'API Integration', 'Reverse Engineering', 'Software Architecture']
    }
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Where I've Worked
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Tabs - Mobile Dropdown */}
          <div className="md:hidden mb-6">
            <select 
              className="w-full bg-tertiary border-none text-textPrimary py-2 px-4 rounded-md"
              value={activeTab}
              onChange={(e) => setActiveTab(parseInt(e.target.value))}
            >
              {experiences.map((exp, index) => (
                <option key={index} value={index}>
                  {exp.company}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs - Desktop */}
          <motion.div 
            className="hidden md:flex md:flex-col border-l border-tertiary"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {experiences.map((exp, index) => (
              <button
                key={index}
                className={`text-left py-3 px-4 font-mono text-sm transition-all ${
                  activeTab === index
                    ? 'text-secondary border-l-2 border-secondary bg-tertiary/30 -ml-[2px]'
                    : 'text-textSecondary hover:text-secondary hover:bg-tertiary/20'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {exp.company}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={activeTab}
          >
            <h3 className="text-xl text-textPrimary font-semibold">
              {experiences[activeTab].title}
              <span className="text-secondary"> @ {experiences[activeTab].company}</span>
            </h3>
            
            <p className="text-textSecondary font-mono text-sm mt-1 mb-4">
              {experiences[activeTab].date} | {experiences[activeTab].location}
            </p>
            
            <ul className="space-y-4">
              {experiences[activeTab].description.map((point, i) => (
                <li key={i} className="flex">
                  <span className="text-secondary mr-2 mt-1">›</span>
                  <span className="text-textSecondary">{point}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex flex-wrap">
              {experiences[activeTab].skills.map((skill) => (
                <span key={skill} className="tech-tag">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}