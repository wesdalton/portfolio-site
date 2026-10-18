type Project = {
  name: string;
  category: string;
  description: string;
  detail: string;
  href: string;
  linkLabel: string;
};

const projects: Project[] = [
  {
    name: 'Witness',
    category: 'AI safety · Research prototype',
    description:
      'An open research lab exploring how agents share evidence and decide when to verify it. Trace sources, compare policies under matched effort budgets, and replay a run.',
    detail:
      '10,000 simulated agents under authored rules; a separate, small real-model pilot. The simulation is not calibrated to LLM behavior.',
    href: 'https://witness-evaluation-lab.beigeglade34.chatgpt.site',
    linkLabel: 'Open lab & source',
  },
  {
    name: 'Mise',
    category: 'Product · iOS',
    description:
      'A restaurant booking app I built and operate solo. Native Swift on iOS, a Python backend, and integrations with booking platforms that offer no public API.',
    detail:
      '350 users through word of mouth. Agent-written changes go through automated tests and end-to-end staging before release.',
    href: 'https://bookmise.com/archive',
    linkLabel: 'Visit Mise',
  },
  {
    name: 'KRAKEN',
    category: 'Research · IEEE OCEANS 2026',
    description:
      'A multi-agent underwater vehicle architecture for cooperative sensing and interception. Built the prototype and Monte Carlo evaluation framework to study coordination under communication constraints.',
    detail:
      'Co-authored with researchers from Cornell, MIT, and Georgia Tech. Presented in Monterey, September 2026.',
    href: '/kraken',
    linkLabel: 'Read paper',
  },
];

export default function Projects() {
  return (
    <section className="page-section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading">
        <h2 id="projects-title">Selected work</h2>
        <span>Research &amp; products</span>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project" key={project.name}>
            <div className="project-heading">
              <h3><a href={project.href}>{project.name}</a></h3>
              <p className="project-category">{project.category}</p>
            </div>
            <p className="project-description">{project.description}</p>
            <p className="project-detail">{project.detail}</p>
            <a className="project-link" href={project.href}>
              {project.linkLabel} <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
      <div className="other-work">
        <h3>Other projects</h3>
        <p>
          <a href="https://try.respire.cloud">Respire</a>, a WHOOP biometrics dashboard;
          {' '}InstaLite, a social app with ranked feeds and real-time chat; and a{' '}
          <a href="/headline-classifier">headline classification research report</a>.
        </p>
      </div>
    </section>
  );
}
