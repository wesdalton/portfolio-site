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
      company: 'TRAK',
      title: 'Full Stack & ML Engineering Intern',
      date: 'May 2025 - Present',
      location: 'New York, NY',
      description: [
        'Contributed to multi-tenancy support, CCC & QuickBooks integrations, and the ongoing migration of core services to GCP (Cloud SQL, BigQuery); additionally maintained Terraform infrastructure-as-code, Docker images, and GitHub Actions pipelines.',
        'Led the "Calibration Mapping" initiative: scraped and OCR-processed over 10,000 OEM manuals and repair estimates, built an ETL pipeline into Postgres and Pinecone, and trained BERT-style models that predict required ADAS calibrations with 93% F1.',
        'Designed and launched a marketing site (Next.js, Tailwind, Vercel, Supabase) from blank repo, with Largest Contentful Paint of 0.6s'
      ],
      skills: ['Next.js', 'GCP', 'BigQuery', 'Terraform', 'Docker', 'BERT', 'ETL', 'Postgres', 'Pinecone', 'OCR']
    },
    {
      company: 'FLORA',
      title: 'Software Engineering Intern',
      date: 'Jun 2024 - Aug 2024',
      location: 'New York, NY',
      description: [
        'Developed and integrated key features on Flora\'s AI-powered infinite canvas by leveraging advanced generative models and real-time data processing, streamlining creative workflows using React Flow, Fal AI, among other full stack technologies.',
        'Collaborated on executing a high-impact go-to-market strategy for Flora by designing a real-time AI streaming landing page and coordinating a promotional sculpture gallery event, which drove a 20% uptick in early user engagement and expanded market reach.'
      ],
      skills: ['React', 'AI', 'Product Development', 'User Experience', 'React Flow', 'Fal AI']
    },
    {
      company: 'AI Business Club at Penn (AIBC)',
      title: 'Project Lead / Data Scientist',
      date: 'Aug 2024 - Present',
      location: 'Philadelphia, PA',
      description: [
        'Automated CRM lead-scoring workflow for Prognos Health by scraping Trello activity data, merging with client KPIs, and training an XGBoost model deployed as a production-ready API, resulting in a 15% improvement in forecasted sales conversion rates.',
        'Won McKinsey-style data-ops case simulation as team data scientist; built end-to-end ETL → model → dashboard in 48 hours.',
        'Consult with various companies looking to enhance workflows or product features by integrating AI solutions.',
        'Research and implement advanced AI technologies such as RAG, fine-tuning LLMs, and creating custom AI-driven applications.'
      ],
      skills: ['AI/ML', 'XGBoost', 'ETL', 'API Development', 'Data Science', 'Team Leadership']
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
      company: 'Civic',
      title: 'Machine-Learning Engineer (Consultant)',
      date: 'Sep 2024 - Dec 2024',
      location: 'Philadelphia, PA',
      description: [
        'Designed a multi-stage LLM profile-generation pipeline to synthesize training data for congressional inbox ingest models.',
        'Prototyped topic-classification and sentiment modules (SpaCy, SBERT, scikit-learn) that now anchor the platform\'s beta.'
      ],
      skills: ['LLM', 'Data Pipeline', 'SpaCy', 'SBERT', 'scikit-learn', 'NLP']
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