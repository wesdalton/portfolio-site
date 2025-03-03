import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiFolder } from 'react-icons/fi';
import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  imageSrc?: string;
};

export default function Projects() {
  const featuredProjects: Project[] = [
    {
      title: 'AI-Driven Predictive Analytics Pipeline',
      description: 'Led the development of an AI system for Prognos Health that optimizes CRM workflows by automating lead qualification, outreach, and sales intelligence, significantly reducing manual effort and accelerating the sales cycle.',
      technologies: ['Python', 'PyTorch', 'Machine Learning', 'CRM Integration'],
      featured: true,
      imageSrc: '/images/prognos_project.png'
    },
    {
      title: 'FLORA Real-time AI Streaming Landing Page',
      description: 'Assisted in development of a dynamic landing page featuring real-time AI content streaming and interactive elements for the beta launch of FLORA\'s platform, showcasing cutting-edge web technology and design.',
      technologies: ['React', 'Node.js', 'WebSockets', 'AI Integration'],
      featured: true,
      imageSrc: '/images/flora_project.png'
    },
    {
      title: 'Synthetic Data Generation System',
      description: 'Designed and implemented a robust system to generate high-quality synthetic data for training AI models used in a civic engagement platform, overcoming challenges related to data quality and model accuracy.',
      technologies: ['Python', 'GANs', 'Data Engineering', 'Statistical Analysis'],
      featured: true,
      imageSrc: '/images/civic_project.png'
    },
  ];

  const otherProjects: Project[] = [
    {
      title: 'CLI Monitoring Tool',
      description: 'Developed a command-line interface tool for monitoring product releases and inventory changes across multiple retailers, using reverse engineering techniques to access public endpoints.',
      technologies: ['Python', 'API Integration', 'CLI Design', 'Real-time Monitoring']
    },
    {
      title: 'Documentary Film Project',
      description: 'Produced "Dreaming of Jerusalem," a documentary film about Ethiopian Jews that premiered on Discovery+, handling audio, video, aerial, and post-production aspects.',
      technologies: ['Video Production', 'Audio Engineering', 'Post-production', 'Project Management'],
      link: 'https://www.discovery.com/'
    },
    {
      title: 'Blockchain Tech Minicourse',
      description: 'Founded and developed curriculum for a comprehensive blockchain technology minicourse, teaching fundamental concepts and practical applications to high school students.',
      technologies: ['Blockchain', 'Educational Content', 'Smart Contracts', 'Cryptography']
    },
    {
      title: 'COVID Resource Finder',
      description: 'Built a platform providing free monitoring services for COVID-related resources, including vaccine and at-home test availability trackers to help communities during the pandemic.',
      technologies: ['Web Development', 'Data Aggregation', 'Public Health', 'Real-time Updates']
    },
    {
      title: 'Investment Analysis Dashboard',
      description: 'Created an analytical dashboard for evaluating startup investment opportunities, featuring market trend analysis, comparative metrics, and financial projections.',
      technologies: ['Financial Modeling', 'Data Visualization', 'Market Analysis', 'JavaScript']
    },
    {
      title: 'Custom LLM Application',
      description: 'Developed a specialized application leveraging large language models with retrieval augmented generation (RAG) for domain-specific knowledge processing and insights.',
      technologies: ['NLP', 'RAG', 'LLMs', 'Python']
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Some Things I've Built
        </motion.h2>

        {/* Featured Projects */}
        <div className="space-y-12 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-12 gap-4 md:gap-6 relative mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Project Content */}
              <div className="col-span-12 md:col-span-7 z-10 order-2 md:order-1">
                <p className="text-secondary font-mono text-sm mb-1">Featured Project</p>
                <h3 className="text-xl md:text-2xl font-bold text-textPrimary mb-3">{project.title}</h3>
                
                <div className="p-4 rounded-lg bg-tertiary text-textSecondary shadow-md mb-3">
                  <p className="text-sm md:text-base">{project.description}</p>
                </div>
                
                <ul className="flex flex-wrap text-xs md:text-sm font-mono mb-3">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="mb-1 mr-3 text-textSecondary">
                      {tech}
                    </li>
                  ))}
                </ul>
                
                <div className="flex text-textPrimary">
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-4 hover:text-secondary transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <FiGithub size={20} />
                    </a>
                  )}
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-secondary transition-colors"
                      aria-label="External Link"
                    >
                      <FiExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Image - Side by side with content on desktop */}
              <div className="col-span-12 md:col-span-5 flex items-center justify-center order-1 md:order-2 mb-4 md:mb-0">
                <div className="relative inline-block">
                  {/* Green glow directly around the image */}
                  <div className="absolute -inset-2 bg-secondary/20 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Fixed-size image container - same for all projects */}
                  <div className="relative bg-tertiary rounded-lg shadow-md p-4 overflow-hidden" style={{ width: 320, height: 180 }}>
                    {project.imageSrc ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image 
                          src={project.imageSrc}
                          alt={`${project.title} preview`}
                          width={280}
                          height={140}
                          style={{ 
                            objectFit: project.title.includes("FLORA") ? "contain" : "cover",
                            backgroundColor: project.title.includes("FLORA") ? "#111827" : "transparent",
                            maxWidth: "100%",
                            maxHeight: "100%"
                          }}
                          className="transition-transform duration-300 group-hover:scale-105 rounded"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-secondary font-mono text-sm">Project Preview</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.h3 
          className="text-2xl font-semibold text-textPrimary text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Other Noteworthy Projects
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-tertiary rounded-lg p-6 h-full flex flex-col hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * (index % 3) }}
            >
              <div className="flex justify-between items-center mb-4">
                <FiFolder className="text-secondary" size={36} />
                <div className="flex space-x-4">
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textSecondary hover:text-secondary transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <FiGithub size={18} />
                    </a>
                  )}
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textSecondary hover:text-secondary transition-colors"
                      aria-label="External Link"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-textPrimary mb-2">{project.title}</h4>
              <p className="text-textSecondary mb-4 flex-grow">{project.description}</p>
              
              <ul className="flex flex-wrap text-xs font-mono text-textSecondary mt-auto">
                {project.technologies.map((tech) => (
                  <li key={tech} className="mr-3 mb-1">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}