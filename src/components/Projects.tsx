import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import Image from 'next/image';

type Project = {
  title: string;
  blurb: string;
  date?: string;
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
    title: 'KRAKEN',
    blurb: 'IEEE OCEANS 2026 · Subsea defense',
    date: 'March 2026 — Present',
    description:
      'A multi-agent tethered-UUV architecture for real-time subsea threat interdiction in communication-denied waters. Built with a Cornell · MIT · Draper team at the Albacore 250 maritime-autonomy hackathon — a COTS prototype (Pixhawk/ArduPilot) plus a Monte Carlo framework showing coordinated scouts sharpen localization and intercept rates. Accepted as an IEEE paper at OCEANS 2026 Monterey; presenting in September.',
    technologies: ['Multi-Agent Systems', 'Pixhawk / ArduPilot', 'Sensor Fusion', 'Monte Carlo', 'Python'],
    link: '/kraken',
    linkLabel: 'Read Paper',
    imageSrc: '/images/kraken_project.png',
  },
  {
    title: 'Mise',
    blurb: 'iOS · Reservations on autopilot',
    date: 'December 2025 — Present',
    description:
      'A shipped iOS app that lands tables at the world’s hardest-to-book restaurants. A real-time engine watches Resy, OpenTable, SevenRooms, and DoorDash around the clock and books in milliseconds the instant a seat drops — backed by an encrypted credential vault and Stripe billing. Now serving 200+ customers.',
    technologies: ['iOS', 'Real-Time Systems', 'Push Notifications', 'Stripe', 'Encryption'],
    link: 'https://bookmise.com',
    linkLabel: 'Live',
    imageSrc: '/images/mise_project.png',
  },
  {
    title: 'Respire',
    blurb: 'Burnout prevention, 7 days early',
    date: 'February — August 2025',
    description:
      'A full-stack wellness app that fuses WHOOP biometrics — HRV, sleep, and strain — into a multi-signal ML model, flagging burnout risk roughly a week before clinical benchmarks. Pulls live data through the WHOOP API, surfaces trends in an interactive Plotly dashboard, and turns each forecast into concrete recovery recommendations.',
    technologies: ['Flask', 'Supabase', 'ML', 'WHOOP API', 'Plotly'],
    link: 'https://try.respire.cloud',
    linkLabel: 'Live',
    imageSrc: '/images/respire_project.png',
  },
  {
    title: 'InstaLite',
    blurb: 'A social network that scales',
    date: 'February — May 2025',
    description:
      'A production-grade social platform with PageRank feed ranking (Spark), facial recognition (TensorFlow), and real-time chat (Kafka) — scaled to 10,000+ concurrent users on AWS at sub-second latency.',
    technologies: ['Node.js', 'Spark', 'TensorFlow', 'Kafka', 'AWS', 'DynamoDB'],
    accent: 'from-secondary/30 to-accent/20',
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
                    {project.date && (
                      <p className="mt-0.5 font-mono text-[11px] text-textSecondary">{project.date}</p>
                    )}
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
                        aria-label={`${project.title} ${project.linkLabel ?? 'link'}`}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-secondary"
                      >
                        {project.linkLabel && (
                          <span className="font-mono text-xs">{project.linkLabel}</span>
                        )}
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
      </div>
    </section>
  );
}
