type Entry = {
  name: string;
  year: string;
  text: string;
  href?: string;
};

const work: Entry[] = [
  {
    name: 'Witness',
    year: '2026',
    href: 'https://witness-evaluation-lab.beigeglade34.chatgpt.site',
    text: 'Do AI agents stop checking when their peers agree? A grounded test case, a toy model, and a first real-model pilot.',
  },
  {
    name: 'KRAKEN',
    year: '2026',
    href: '/kraken',
    text: 'Cooperating underwater vehicles under limited communication. I built the prototype and its Monte Carlo evaluation. IEEE OCEANS 2026, with Cornell, MIT, and Georgia Tech.',
  },
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
    text: 'A social app with ranked feeds and real-time chat.',
  },
  {
    name: 'Headline classifier',
    year: '2025',
    href: '/headline-classifier',
    text: 'A research report for Penn’s applied machine learning course.',
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
          </p>
        </li>
      ))}
    </ol>
  );
}

export type { Entry };

export default function Projects() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <h2 id="work-title">Work</h2>
      <EntryList entries={work} />
    </section>
  );
}
