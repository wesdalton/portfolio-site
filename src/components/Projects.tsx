import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiFolder, FiArrowUpRight } from 'react-icons/fi';
import Image from 'next/image';

type Project = {
  title: string;
  blurb: string;
  description: string;
  technologies: string[];
  link?: string;
  linkLabel?: string;
  github?: string;
  imageSrc?: string;
  accent?: string; // gradient fallback when no image
};

const featuredProjects: Project[] = [
  {
    title: 'Respire',
    blurb: 'Burnout prevention, 7 days early',
    description:
      'A full-stack wellness app that fuses WHOOP biometrics — HRV, sleep, and strain — into a multi-signal ML model, flagging burnout risk roughly a week before clinical benchmarks.',
    technologies: ['Flask', 'Supabase', 'ML', 'WHOOP API', 'Plotly'],
    link: 'https://try.respire.cloud',
    linkLabel: 'Live',
    imageSrc: '/images/respire_project.png',
  },
  {
    title: 'InstaLite',
    blurb: 'A social network that scales',
    description:
      'A production-grade social platform with PageRank feed ranking (Spark), facial recognition (TensorFlow), and real-time chat (Kafka) — scaled to 10,000+ concurrent users on AWS at sub-second latency.',
    technologies: ['Node.js', 'Spark', 'TensorFlow', 'Kafka', 'AWS', 'DynamoDB'],
    accent: 'from-secondary/30 to-accent/20',
  },
];

const otherProjects: Project[] = [
  {
    title: 'Headline Classifier',
    blurb: 'Applied ML · CIS 5190',
    description:
      'An NLP model classifying news headlines by topic and source, with a full experimental writeup from Penn’s Applied Machine Learning course.',
    technologies: ['PyTorch', 'NLP', 'scikit-learn'],
    link: '/headline-classifier',
    linkLabel: 'Report',
  },
  {
    title: 'This Website',
    blurb: 'Designed & built from scratch',
    description:
      'A dark, motion-driven portfolio built with Next.js and Framer Motion, with a live Spotify now-playing integration and an interactive canvas grid.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'Canvas'],
    link: 'https://wesleydalton.com',
    linkLabel: 'Live',
    github: 'https://github.com/wesdalton/portfolio-site',
  },
];

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-24">
      <div className="section-shell">
        <motion.div {...fade} transition={{ duration: 0.5 }}>
          <p className="eyebrow">
            <span className="text-textSecondary">03</span> / Projects
          </p>
          <h2 className="section-heading">Things I&apos;ve built</h2>
        </motion.div>

        {/* Featured */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              {...fade}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-interactive group flex flex-col overflow-hidden"
            >
              {/* Visual */}
              <div className="relative h-44 w-full overflow-hidden border-b border-line">
                {project.imageSrc ? (
                  <Image
                    src={project.imageSrc}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.accent}`}
                  >
                    <span className="font-mono text-4xl font-bold text-textPrimary/40">
                      {project.title}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-textPrimary">{project.title}</h3>
                    <p className="font-mono text-xs text-secondary">{project.blurb}</p>
                  </div>
                  <div className="flex items-center gap-3 text-textSecondary">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub`}
                        className="transition-colors hover:text-secondary"
                      >
                        <FiGithub size={18} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} link`}
                        className="transition-colors hover:text-secondary"
                      >
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-textSecondary">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {otherProjects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link ?? project.github ?? '#'}
              target={project.link?.startsWith('http') || project.github ? '_blank' : undefined}
              rel="noopener noreferrer"
              {...fade}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-interactive group flex flex-col p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <FiFolder className="text-secondary" size={26} />
                <FiArrowUpRight
                  className="text-textSecondary transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary"
                  size={18}
                />
              </div>
              <h4 className="text-lg font-bold text-textPrimary">{project.title}</h4>
              <p className="font-mono text-xs text-secondary">{project.blurb}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-textSecondary">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
