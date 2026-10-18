export default function Contact() {
  return (
    <section className="page-section contact" id="contact" aria-labelledby="contact-title">
      <div className="section-heading"><h2 id="contact-title">Get in touch</h2></div>
      <p>For research, collaborations, or an interesting problem.</p>
      <a className="contact-email" href="mailto:wdalton@engineering.upenn.edu">
        wdalton@engineering.upenn.edu <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
