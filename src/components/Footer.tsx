import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-line/60 py-8">
      <motion.div
        className="section-shell flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-xs text-textSecondary">
          Designed &amp; built by Wesley Dalton
        </p>
        <p className="font-mono text-xs text-textSecondary">
          &copy; {new Date().getFullYear()} · Next.js + Tailwind
        </p>
      </motion.div>
    </footer>
  );
}
