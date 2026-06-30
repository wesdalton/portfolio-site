import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

type ExperienceItem = {
  company: string;
  url?: string;
  title: string;
  date: string;
  location?: string;
  kind: 'Internship' | 'Fellowship' | 'Leadership';
  summary: string;
  skills: string[];
  current?: boolean;
};

const experiences: ExperienceItem[] = [
  {
    company: 'Anduril Industries',
    url: 'https://www.anduril.com/lattice/mission-autonomy',
    title: 'Software Engineering Intern',
    date: 'May 2026 — Present',
    location: 'Boston, MA',
    kind: 'Internship',
    current: true,
    summary:
      'On the Mission Autonomy — Behaviors & Integrations team, owning an end-to-end rewrite of the autonomous behaviors catalog in modern C++ — redefining how asset behaviors are defined, composed, and reused across the autonomy stack, hardened with unit, FTRT, software- and hardware-in-the-loop testing.',
    skills: ['Modern C++', 'Mission Autonomy', 'SITL / HITL', 'Lattice'],
  },
  {
    company: 'A-Life',
    url: 'https://a-life.care/en/',
    title: 'Software Engineering Intern',
    date: 'Feb 2026 — May 2026',
    location: 'Milan, Italy',
    kind: 'Internship',
    summary:
      'Built an AI diagnostics-ingestion pipeline (Next.js, Azure OpenAI GPT-5) that auto-parses 12+ medical report types and 500+ biomarkers into a normalized clinical catalog, plus a real-time collaborative report editor (Y.js CRDTs) and clinical scoring engines feeding an LLM visit-briefing generator.',
    skills: ['Next.js', 'Azure OpenAI', 'Vision LLMs', 'Y.js CRDTs'],
  },
  {
    company: 'Handshake',
    url: 'https://joinhandshake.com/ai',
    title: 'MOVE AI Fellow',
    date: 'Aug 2025 — Nov 2025',
    location: 'Remote',
    kind: 'Fellowship',
    summary:
      'Evaluated frontier LLM outputs and designed adversarial test suites surfacing critical model failures for leading AI labs.',
    skills: ['LLM Evaluation', 'AI Safety', 'Adversarial Testing'],
  },
  {
    company: 'TRAK',
    url: 'http://adastrak.com/',
    title: 'Software Engineering Intern',
    date: 'May 2025 — Sep 2025',
    location: 'New York, NY',
    kind: 'Internship',
    summary:
      'Built an end-to-end order-workflow platform and led a GCP cloud migration — processing 1,000+ daily orders across 50+ sites.',
    skills: ['Next.js', 'PostgreSQL', 'Kubernetes', 'GCP', 'Terraform'],
  },
  {
    company: 'AI Business Club @ Penn',
    url: 'https://www.linkedin.com/company/aibusinessclub/',
    title: 'Project Lead',
    date: 'Jan 2025 — Present',
    location: 'Philadelphia, PA',
    kind: 'Leadership',
    current: true,
    summary:
      'Lead a 10-engineer team building ML data products for partner companies, including a CRM lead-scoring system that won a 48-hour competition.',
    skills: ['Team Leadership', 'XGBoost', 'ETL', 'Tableau'],
  },
  {
    company: 'Civic',
    url: 'https://get-civic.com/',
    title: 'ML & Automation Engineer',
    date: 'Sep 2024 — Dec 2024',
    location: 'Philadelphia, PA',
    kind: 'Internship',
    summary:
      'Shipped a GPT fine-tuning + NLP pipeline that automated message triage and routing across 15+ Congressional offices.',
    skills: ['GPT Fine-tuning', 'NLP', 'SpaCy', 'Python'],
  },
  {
    company: 'Flora',
    url: 'https://flora.ai/',
    title: 'Software Engineering Intern',
    date: 'Jun 2024 — Aug 2024',
    location: 'New York, NY',
    kind: 'Internship',
    summary:
      'Architected an AI image-generation pipeline and secure billing APIs (Stripe, Clerk) handling 10,000+ daily requests.',
    skills: ['Next.js', 'PostgreSQL', 'Stripe', 'REST APIs'],
  },
];

const kindStyles: Record<ExperienceItem['kind'], string> = {
  Internship: 'border-secondary/30 text-secondary',
  Fellowship: 'border-accent/30 text-accent',
  Leadership: 'border-emerald-400/30 text-emerald-300',
};

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">
            <span className="text-textSecondary">02</span> / Experience
          </p>
          <h2 className="section-heading">Where I&apos;ve worked</h2>
        </motion.div>

        <div className="relative ml-2 border-l border-line pl-8 sm:ml-3 sm:pl-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.date}`}
              className="group relative pb-10 last:pb-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
            >
              {/* Timeline node */}
              <span className="absolute -left-[41px] top-1.5 flex h-3.5 w-3.5 items-center justify-center sm:-left-[49px]">
                {exp.current ? (
                  <>
                    <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-secondary/60" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-secondary ring-4 ring-primary" />
                  </>
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-line ring-4 ring-primary transition-colors duration-300 group-hover:bg-secondary" />
                )}
              </span>

              <div className="card-interactive p-6">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-bold text-textPrimary">
                    {exp.title}
                    <span className="text-secondary">
                      {' · '}
                      {exp.url ? (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-0.5 underline-offset-4 transition-colors hover:text-textPrimary hover:underline"
                        >
                          {exp.company}
                          <FiArrowUpRight className="text-sm transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </a>
                      ) : (
                        exp.company
                      )}
                    </span>
                  </h3>
                  <span
                    className={`w-fit rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${kindStyles[exp.kind]}`}
                  >
                    {exp.kind}
                  </span>
                </div>

                <p className="mt-1 font-mono text-xs text-textSecondary">
                  {exp.date}
                  {exp.location ? ` · ${exp.location}` : ''}
                </p>

                <p className="mt-4 text-[15px] leading-relaxed text-textSecondary">{exp.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="tech-tag">
                      {skill}
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
