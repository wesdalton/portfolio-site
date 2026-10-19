type Entry = {
  name: string;
  year: string;
  text: string;
  href?: string;
  links?: { label: string; href: string }[];
};

const research: Entry[] = [
  {
    name: 'KRAKEN',
    year: '2026',
    href: '/kraken',
    text: 'A tethered multi-UUV architecture for cooperative sensing and interception of underwater threats. I built the prototype and its 40,700-trial Monte Carlo evaluation. IEEE OCEANS 2026, with Cornell, MIT, and Georgia Tech.',
    links: [{ label: 'paper', href: '/kraken' }],
  },
  {
    name: 'Witness',
    year: '2026',
    href: 'https://wesdalton.github.io/witness/',
    text: 'Do AI agents stop checking when their peers agree? A research note and open instrument, in progress.',
    links: [
      { label: 'note', href: 'https://wesdalton.github.io/witness/' },
      { label: 'code', href: 'https://github.com/wesdalton/witness' },
    ],
  },
];

const projects: Entry[] = [
  {
    name: 'Mise',
    year: '2025–',
    href: 'https://bookmise.com/archive',
    text: 'A restaurant booking app for iOS that I build and run alone. 350 users, all through word of mouth.',
  },
  {
    name: 'Respire',
    year: '2025',
    href: 'https://try.respire.cloud',
    text: 'Reads WHOOP sleep, HRV, and strain data to flag burnout risk early.',
  },
  {
    name: 'InstaLite',
    year: '2025',
    text: 'A social app with ranked feeds and real-time chat. Course project; code private.',
  },
  {
    name: 'Headline classifier',
    year: '2025',
    href: '/headline-classifier',
    text: 'A course research report for Penn’s applied machine learning class.',
    links: [{ label: 'report', href: '/headline-classifier' }],
  },
];

export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ol className="entries">
      {entries.map((entry) => (
        <li className="entry" key={entry.name}>
          <span className="entry-year">{entry.year}</span>
          <p className="entry-body">
            {entry.href ? <a href={entry.href}>{entry.name}</a> : <span className="entry-name">{entry.name}</span>}
            <span className="entry-sep" aria-hidden="true"> · </span>
            {entry.text}
            {entry.links?.map((link) => (
              <a key={link.label} className="entry-link" href={link.href}>{link.label}</a>
            ))}
          </p>
        </li>
      ))}
    </ol>
  );
}

export type { Entry };

export function Research() {
  return (
    <section className="section" id="research" aria-labelledby="research-title">
      <h2 id="research-title">Research</h2>
      <EntryList entries={research} />
    </section>
  );
}

export default function Projects() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <h2 id="work-title">Projects</h2>
      <EntryList entries={projects} />
    </section>
  );
}
