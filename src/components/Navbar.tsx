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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-primary/90 backdrop-blur-sm py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-secondary font-bold text-2xl">
            WD
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ul className="flex space-x-1">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <a
                href="/Wesley_Dalton_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary ml-4"
              >
                Resume
              </a>
            </motion.li>
          </ul>
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-textPrimary hover:text-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 bg-primary/95 z-40 md:hidden ${
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
                  <div className="text-secondary font-mono text-sm mb-1">
                    {link.counter}.
                  </div>
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
                href="/Wesley_Dalton_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
              >
                Resume
              </a>
            </motion.li>
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}