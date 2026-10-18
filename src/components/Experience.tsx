import { EntryList, type Entry } from '@/components/Projects';

const experience: Entry[] = [
  {
    name: 'Anduril',
    year: '2026',
    href: 'https://www.anduril.com/lattice/mission-autonomy',
    text: 'Software engineer intern. Rewrote the autonomous behaviors catalog in C++ and Python, with testing from unit checks through hardware-in-the-loop.',
  },
  {
    name: 'A-Life',
    year: '2026',
    href: 'https://a-life.care/en/',
    text: 'Software engineer intern. Built a vision-model pipeline that reads medical reports into a biomarker catalog, and a collaborative clinical editor.',
  },
  {
    name: 'Handshake',
    year: '2025',
    href: 'https://joinhandshake.com/ai',
    text: 'MOVE AI Fellow. Wrote adversarial prompts and graded frontier model outputs for reasoning, factuality, and safety failures.',
  },
  {
    name: 'TRAK',
    year: '2025',
    href: 'https://adastrak.com/',
    text: 'Software engineer intern. Built BERT-based models that predict vehicle sensor recalibration from 44,000+ service documents.',
  },
  {
    name: 'Flora',
    year: '2024',
    href: 'https://flora.ai/',
    text: 'Software engineer intern. Built the node-based pipeline that chains image, video, and text models across 10,000+ daily generations.',
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Experience</h2>
      <EntryList entries={experience} />
    </section>
  );
}
