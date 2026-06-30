import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiCopy, FiCheck } from 'react-icons/fi';

const EMAIL = 'wdalton@engineering.upenn.edu';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <div className="section-shell">
        <motion.div
          {...fade}
          transition={{ duration: 0.5 }}
          className="card relative overflow-hidden px-6 py-16 text-center sm:px-12"
        >
          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-secondary/20 blur-[100px]"
          />

          <p className="eyebrow justify-center">
            <span className="text-textSecondary">04</span> / Contact
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-textPrimary sm:text-5xl">
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-textSecondary">
            I&apos;m always happy to talk shop — whether it&apos;s an interesting problem, a full-time
            opportunity for 2027, or just a good conversation. My inbox is open.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`mailto:${EMAIL}`} className="button-primary">
              <FiMail className="mr-2" />
              Say hello
            </a>
            <button onClick={copyEmail} className="button-ghost" aria-label="Copy email address">
              {copied ? (
                <>
                  <FiCheck className="mr-2 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <FiCopy className="mr-2" />
                  {EMAIL}
                </>
              )}
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-textSecondary">
            <a
              href="https://linkedin.com/in/wesley-dalton/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-secondary"
            >
              <FiLinkedin size={22} />
            </a>
            <a
              href="https://github.com/wesdalton"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-secondary"
            >
              <FiGithub size={22} />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="transition-colors hover:text-secondary"
            >
              <FiMail size={22} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
