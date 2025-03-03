import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-8 text-center">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-textSecondary text-sm font-mono">
          Designed & Built by Wesley Dalton
        </p>
        <p className="text-textSecondary text-xs mt-2">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
      </motion.div>
    </footer>
  );
}