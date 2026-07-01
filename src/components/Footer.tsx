import { motion } from 'framer-motion';
import NowPlaying from './NowPlaying';

export default function Footer() {
  return (
    <footer className="border-t border-line/60 py-8">
      <motion.div
        className="section-shell flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <NowPlaying />

        <div className="flex w-full flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs text-textSecondary">
            Designed &amp; built by Wesley Dalton
          </p>
          <p className="font-mono text-xs text-textSecondary">
            &copy; {new Date().getFullYear()} · Next.js + Tailwind
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
