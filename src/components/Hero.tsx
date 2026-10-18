export default function Hero() {
  return (
    <section className="intro" id="home" aria-labelledby="name">
      <p className="eyebrow">Software engineer · Philadelphia</p>
      <h1 id="name">Wesley Dalton</h1>
      <p className="intro-statement">I build products and study how AI systems behave.</p>
      <p className="intro-description">
        Computer Science &amp; History at Penn. My work spans autonomy,
        AI evaluation, and the engineering that brings products into the world.
      </p>
      <div className="intro-links" aria-label="Find me online">
        <a href="mailto:wdalton@engineering.upenn.edu">Email <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/wesdalton">GitHub <span aria-hidden="true">↗</span></a>
        <a href="https://linkedin.com/in/wesley-dalton/">LinkedIn <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
