import Image from 'next/image';

const links = [
  { label: 'Email', href: 'mailto:wdalton@engineering.upenn.edu' },
  { label: 'GitHub', href: 'https://github.com/wesdalton' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/wesley-dalton/' },
  { label: 'Résumé', href: '/resume' },
];

export default function Intro() {
  return (
    <header className="intro" id="home">
      <div className="name-row">
        <Image
          className="portrait"
          src="/images/wesley.jpg"
          alt="Wesley Dalton"
          width={64}
          height={64}
          priority
        />
        <h1>Wesley Dalton</h1>
      </div>
      <p>
        I&apos;m a software engineer studying Computer Science and History at Penn,
        graduating in December 2026. I build products and mission-critical systems across
        autonomy, automation, and AI. I&apos;m also an AI Safety Fundamentals Fellow with
        Safe AI @ Penn.
      </p>
      <p className="now">
        <span className="now-label">Now</span>
        <span>
          Running the next <a href="https://wesdalton.github.io/witness/">Witness</a>{' '}
          experiment: do AI agents stop checking for themselves when their peers agree?
        </span>
      </p>
      <nav className="intro-links" aria-label="Contact and profiles">
        {links.map((link) => (
          <a key={link.label} href={link.href}>{link.label}</a>
        ))}
      </nav>
    </header>
  );
}
