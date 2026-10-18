type ExperienceItem = {
  company: string;
  href: string;
  role: string;
  dates: string;
  description: string;
};

const experiences: ExperienceItem[] = [
  {
    company: 'Anduril Industries',
    href: 'https://www.anduril.com/lattice/mission-autonomy',
    role: 'Software Engineer Intern',
    dates: 'May–Aug 2026',
    description:
      'Rewrote the autonomous behaviors catalog in C++ and Python. Built an on-asset database plugin and testing from unit checks through hardware-in-the-loop.',
  },
  {
    company: 'A-Life',
    href: 'https://a-life.care/en/',
    role: 'Software Engineer Intern',
    dates: 'Feb–May 2026',
    description:
      'Built a vision-model pipeline for medical reports and biomarkers, a collaborative clinical editor, and scoring engines for visit preparation.',
  },
  {
    company: 'Handshake',
    href: 'https://joinhandshake.com/ai',
    role: 'MOVE AI Fellow',
    dates: 'Aug–Nov 2025',
    description:
      'Designed adversarial prompts and evaluated frontier model outputs for reasoning, factuality, instruction following, and safety failures.',
  },
  {
    company: 'TRAK',
    href: 'https://adastrak.com/',
    role: 'Software Engineer Intern',
    dates: 'May–Sep 2025',
    description:
      'Built BERT-based models for vehicle sensor recalibration, an ETL pipeline over 44,000+ service documents, and a migration to GCP.',
  },
  {
    company: 'Flora',
    href: 'https://flora.ai/',
    role: 'Software Engineer Intern',
    dates: 'Jun–Aug 2024',
    description:
      'Built a node-based generation pipeline connecting image, video, and text models, with real-time status across 10,000+ daily generations.',
  },
];

export default function Experience() {
  return (
    <section className="page-section" id="experience" aria-labelledby="experience-title">
      <div className="section-heading">
        <h2 id="experience-title">Experience</h2>
        <a href="/resume">Full résumé <span aria-hidden="true">↗</span></a>
      </div>
      <ol className="experience-list">
        {experiences.map((experience) => (
          <li className="experience" key={experience.company}>
            <div className="experience-heading">
              <h3><a href={experience.href}>{experience.company}</a></h3>
              <span className="experience-dates">{experience.dates}</span>
            </div>
            <p className="experience-role">{experience.role}</p>
            <p className="experience-description">{experience.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
