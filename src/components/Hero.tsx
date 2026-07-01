import { motion } from 'framer-motion';
import TacticalGrid from './TacticalGrid';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24">
      <TacticalGrid />

      <div className="section-shell relative z-10">
        <div className="max-w-3xl">
          {/* Live status pill */}
          <motion.a
            href="#experience"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs text-textSecondary backdrop-blur-sm transition-colors hover:border-secondary/40 hover:text-textPrimary"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono">SWE Intern @ Anduril</span>
          </motion.a>

          <motion.p
            className="mb-4 font-mono text-sm text-secondary"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            className="mb-4 text-5xl font-extrabold tracking-tight text-textPrimary sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-gradient">Wesley Dalton</span>
          </motion.h1>

          <motion.h2
            className="mb-7 max-w-2xl text-2xl font-bold text-textSecondary sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            I build <span className="text-textPrimary">mission-critical systems</span>, AI-driven
            products, and the tools people rely on<span className="text-secondary">.</span>
          </motion.h2>

          <motion.p
            className="mb-10 max-w-xl text-base leading-relaxed text-textSecondary sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Software engineer and CS &amp; History student at the University of Pennsylvania. I work
            across full-stack, machine learning, and cloud infrastructure — most recently at{' '}
            <span className="text-textPrimary">Anduril</span> and{' '}
            <span className="text-textPrimary">A-Life</span>.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <a href="#projects" className="button-primary group">
              View my work
              <FiArrowRight className="ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="button-ghost">
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center text-textSecondary transition-colors hover:text-secondary"
          aria-label="Scroll to about section"
        >
          <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <FiArrowDown />
        </a>
      </motion.div>
    </section>
  );
}
