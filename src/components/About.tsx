import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiMapPin, FiBookOpen } from 'react-icons/fi';

const education = {
  school: 'University of Pennsylvania',
  degree: 'B.A. Computer Science & History',
  gradDate: 'Expected May 2027',
  gpa: '3.62 / 4.00',
  coursework: [
    'Advanced Algorithms',
    'Applied Machine Learning',
    'Scalable & Cloud Computing',
    'Automata & Complexity',
    'Data Structures',
  ],
};

const skillGroups: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['Python', 'TypeScript', 'Java', 'OCaml', 'SQL'] },
  { label: 'AI / ML', items: ['PyTorch', 'Pandas', 'NumPy', 'scikit-learn', 'Solr'] },
  { label: 'Infrastructure', items: ['GCP', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'Spark'] },
  { label: 'Web', items: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind'] },
];

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <div className="section-shell">
        <motion.div {...fade} transition={{ duration: 0.5 }}>
          <p className="eyebrow">
            <span className="text-textSecondary">01</span> / About
          </p>
          <h2 className="section-heading">The short version</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Bio */}
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="card p-7 lg:col-span-2"
          >
            <div className="space-y-4 text-[15px] leading-relaxed text-textSecondary">
              <p>
                I&apos;m a software engineer who likes turning ambiguous problems into systems people
                actually rely on. My work spans{' '}
                <span className="text-textPrimary">full-stack product engineering</span>,{' '}
                <span className="text-textPrimary">applied machine learning</span>, and the{' '}
                <span className="text-textPrimary">cloud infrastructure</span> that ties them together.
              </p>
              <p>
                Right now I&apos;m a SWE intern at <span className="text-textPrimary">Anduril</span>,
                and before that <span className="text-textPrimary">A-Life</span>. Along the way
                I&apos;ve shipped products at early-stage startups, fine-tuned models for real users,
                and led engineering teams through Penn&apos;s AI Business Club.
              </p>
              <p>
                I study Computer Science &amp; History at Penn — the second half of that is on purpose.
                When I&apos;m not shipping, I&apos;m usually deep in a history book or hunting down new
                music.
              </p>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card group relative min-h-[320px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <Image
              src="/images/headshot.jpeg"
              alt="Wesley Dalton"
              width={500}
              height={600}
              className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 p-5 font-mono text-xs text-textSecondary">
              <FiMapPin className="text-secondary" />
              Philadelphia, PA
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="card p-7 lg:col-span-2"
          >
            <div className="mb-4 flex items-center gap-2">
              <FiBookOpen className="text-secondary" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
                Education
              </span>
            </div>
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <h3 className="text-xl font-bold text-textPrimary">{education.school}</h3>
              <span className="font-mono text-xs text-textSecondary">{education.gradDate}</span>
            </div>
            <p className="mt-1 text-sm text-textSecondary">
              {education.degree} &nbsp;·&nbsp; GPA {education.gpa}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span key={course} className="tech-tag">
                  {course}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-5 lg:grid-cols-1"
          >
            <div className="card flex flex-col justify-center p-6">
              <span className="text-3xl font-extrabold text-gradient">6+</span>
              <span className="mt-1 text-xs text-textSecondary">engineering roles & fellowships</span>
            </div>
            <div className="card flex flex-col justify-center p-6">
              <span className="text-3xl font-extrabold text-gradient">2027</span>
              <span className="mt-1 text-xs text-textSecondary">graduating, open to full-time</span>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="card p-7 lg:col-span-3"
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-secondary">
              Toolkit
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-3 text-sm font-semibold text-textPrimary">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="tech-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
