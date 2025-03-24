import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
        <motion.p 
          className="text-secondary font-mono mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          04. What's Next?
        </motion.p>
        
        <motion.h2 
          className="text-4xl font-bold text-textPrimary mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get In Touch
        </motion.h2>
        
        <motion.p 
          className="text-textSecondary mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I'm currently looking for software engineering internship opportunities for Summer 2025.
          Whether you have a question, job opportunity, or just want to say hi,
          I'll do my best to get back to you!
        </motion.p>
        
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a 
            href="mailto:wdalton@seas.upenn.edu" 
            className="button-primary py-3 px-6 text-base"
          >
            Email Me
          </a>
        </motion.div>
        
        <motion.div 
          className="flex justify-center space-x-8 text-textSecondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button 
            onClick={() => {
              navigator.clipboard.writeText('wdalton@seas.upenn.edu');
              
              // Create and show toast notification
              const toast = document.createElement('div');
              toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-secondary text-white px-4 py-2 rounded-md shadow-lg';
              toast.textContent = 'Email copied to clipboard!';
              document.body.appendChild(toast);
              
              // Fade in
              toast.style.opacity = '0';
              toast.style.transition = 'opacity 0.3s ease-in-out';
              setTimeout(() => toast.style.opacity = '1', 10);
              
              // Remove after delay
              setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => document.body.removeChild(toast), 300);
              }, 2000);
            }}
            className="hover:text-secondary transition-colors cursor-pointer hover:scale-105"
            aria-label="Copy email to clipboard"
          >
            <FiMail size={24} />
          </button>
          <a 
            href="https://linkedin.com/in/wesley-dalton/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={24} />
          </a>
          <a 
            href="https://github.com/wesdalton"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}