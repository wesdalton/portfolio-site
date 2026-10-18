export default function Navbar() {
  return (
    <header className="site-header">
      <a className="monogram" href="#home" aria-label="Wesley Dalton, home">wd.</a>
      <nav aria-label="Main navigation">
        <a href="#projects">Work</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
        <a href="/resume">Résumé <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
