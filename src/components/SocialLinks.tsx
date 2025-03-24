import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function SocialLinks() {
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/wesdalton', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/wesley-dalton/', label: 'LinkedIn' },
    { icon: <FiMail />, url: 'mailto:wdalton@seas.upenn.edu', label: 'Email' },
  ];

  return (
    <>
      {/* Left Side - Social Icons */}
      <motion.div 
        className="fixed bottom-0 left-5 hidden sm:block z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <ul className="flex flex-col items-center space-y-6">
          {socialLinks.map((link, i) => (
            <li key={i} className="text-textSecondary group transition-all">
              <a 
                href={link.url} 
                target={link.url.startsWith('mailto') ? undefined : '_blank'} 
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-tertiary/50 transition-all duration-300 group-hover:text-secondary transform group-hover:-translate-y-1"
              >
                <span className="text-2xl">{link.icon}</span>
              </a>
            </li>
          ))}
          <li className="w-px h-24 bg-textSecondary"></li>
        </ul>
      </motion.div>

      {/* Right Side - Email */}
      <motion.div 
        className="fixed bottom-0 right-5 hidden sm:block z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex flex-col items-center">
          <a 
            href="mailto:wdalton@seas.upenn.edu" 
            className="text-textSecondary font-mono text-xs tracking-widest my-6 vertical-rl cursor-pointer transition-all duration-300 hover:text-secondary hover:-translate-y-1 px-2 py-1 hover:bg-tertiary/30 rounded"
          >
            wdalton@seas.upenn.edu
          </a>
          <div className="w-px h-24 bg-textSecondary"></div>
        </div>
      </motion.div>
    </>
  );
}

// CSS for vertical text
const styles = `
.vertical-rl {
  writing-mode: vertical-rl;
}
`;

// Add styles to the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}