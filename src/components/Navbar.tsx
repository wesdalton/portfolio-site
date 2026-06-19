import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'About', href: '#about', counter: '01' },
  { name: 'Experience', href: '#experience', counter: '02' },
  { name: 'Projects', href: '#projects', counter: '03' },
  { name: 'Contact', href: '#contact', counter: '04' },
];

const RESUME_URL =
  'https://drive.google.com/file/d/1qOQ7VHSgNberDKJLCQIjW6VbksGKJ2pMvHnHG0VNkjw/preview';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b border-line/70 bg-primary/70 py-3 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <div className="section-shell flex items-center justify-between">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Link
            href="/"
            aria-label="Home"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface/60 font-mono text-sm font-bold text-secondary transition-colors hover:border-secondary/50"
          >
            <span className="transition-transform duration-300 group-hover:scale-110">WD</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ul className="flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                <Link href={link.href} className="nav-link">
                  <span className="nav-counter">{link.counter}.</span>
                  {link.name}
                </Link>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="ml-3"
            >
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="button-ghost px-5 py-2 text-xs">
                Résumé
              </a>
            </motion.li>
          </ul>
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface/60 text-textPrimary transition-colors hover:text-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-40 bg-primary/95 backdrop-blur-xl md:hidden ${
          mobileMenuOpen ? 'flex' : 'hidden'
        } items-center justify-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="text-center">
          <ul className="space-y-6">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                <Link
                  href={link.href}
                  className="text-2xl font-semibold text-textPrimary hover:text-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="mb-1 font-mono text-sm text-secondary">{link.counter}.</div>
                  {link.name}
                </Link>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="pt-4"
            >
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Résumé
              </a>
            </motion.li>
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}
