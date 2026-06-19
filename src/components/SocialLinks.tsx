import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const EMAIL = 'wdalton@seas.upenn.edu';

const socialLinks = [
  { icon: <FiGithub />, url: 'https://github.com/wesdalton', label: 'GitHub' },
  { icon: <FiLinkedin />, url: 'https://linkedin.com/in/wesley-dalton/', label: 'LinkedIn' },
  { icon: <FiMail />, url: `mailto:${EMAIL}`, label: 'Email' },
];

export default function SocialLinks() {
  return (
    <>
      {/* Left rail — social icons */}
      <motion.div
        className="fixed bottom-0 left-6 z-40 hidden lg:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <ul className="flex flex-col items-center space-y-5">
          {socialLinks.map((link) => (
            <li key={link.label} className="text-textSecondary">
              <a
                href={link.url}
                target={link.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-10 w-10 items-center justify-center rounded-full text-xl transition-all duration-300 hover:-translate-y-1 hover:text-secondary"
              >
                {link.icon}
              </a>
            </li>
          ))}
          <li className="h-24 w-px bg-line" />
        </ul>
      </motion.div>

      {/* Right rail — email */}
      <motion.div
        className="fixed bottom-0 right-6 z-40 hidden lg:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="flex flex-col items-center">
          <a
            href={`mailto:${EMAIL}`}
            className="vertical-rl my-6 rounded px-2 py-1 font-mono text-xs tracking-widest text-textSecondary transition-all duration-300 hover:-translate-y-1 hover:text-secondary"
          >
            {EMAIL}
          </a>
          <div className="h-24 w-px bg-line" />
        </div>
      </motion.div>
    </>
  );
}
