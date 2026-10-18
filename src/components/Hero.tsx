const links = [
  { label: 'Email', href: 'mailto:wdalton@engineering.upenn.edu' },
  { label: 'GitHub', href: 'https://github.com/wesdalton' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/wesley-dalton/' },
  { label: 'Résumé', href: '/resume' },
];

export default function Intro() {
  return (
    <header className="intro" id="home">
      <h1>Wesley Dalton</h1>
      <p>
        I&apos;m a software engineer studying Computer Science and History at Penn,
        graduating in December 2026. I build products and mission-critical systems across
        autonomy, automation, and AI.
      </p>
      <p>
        Right now I&apos;m researching whether AI agents stop checking for themselves when
        their peers agree. Most recently I wrote autonomy software at Anduril. I&apos;m also an
        AI Safety Fundamentals Fellow with Safe AI @ Penn.
      </p>
      <nav className="intro-links" aria-label="Contact and profiles">
        {links.map((link) => (
          <a key={link.label} href={link.href}>{link.label}</a>
        ))}
      </nav>
    </header>
  );
}
