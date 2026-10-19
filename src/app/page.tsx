import Intro from '@/components/Hero';
import Projects, { Research } from '@/components/Projects';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <main id="main">
        <Intro />
        <Research />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
