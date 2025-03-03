import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  const skills = [
    'Python', 'React', 'Node.js', 'Java', 'OCaml',
    'PyTorch', 'SQL', 'Docker', 'Git', 'AI/ML'
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-textSecondary mb-4">
              Hello! I'm Wesley, a Computer Science and History double major at the University of Pennsylvania. 
              My academic journey combines technical expertise with critical thinking from the humanities, 
              giving me a unique perspective on technology's role in society.
            </p>
            
            <p className="text-textSecondary mb-4">
              As someone passionate about building innovative solutions, I've had the opportunity to work on diverse projects 
              from AI-driven analytics at the <span className="text-secondary">AI Business Club</span> to software engineering at <span className="text-secondary">FLORA</span>.
            </p>
            
            <p className="text-textSecondary mb-4">
              Beyond coding, I'm a former varsity athlete (football captain), current rugby player, and an entrepreneur at heart. 
              I founded <span className="text-secondary">Gamma Technologies</span>, developing CLI software for monitoring limited releases, 
              and even produced a documentary film that premiered on Discovery+.
            </p>
            
            <p className="text-textSecondary mb-6">
              I'm currently focused on exploring the intersection of AI, business, and software engineering, 
              with a particular interest in creating technologies that deliver real-world impact.
            </p>
            
            <p className="text-textSecondary mb-4">
              Here are a few technologies I've been working with recently:
            </p>
            
            <ul className="grid grid-cols-2 gap-2 mb-6">
              {skills.map((skill) => (
                <li key={skill} className="flex items-center text-textSecondary">
                  <span className="text-secondary mr-2">›</span> {skill}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="md:col-span-2 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
              {/* Glow effect container - positioned relative to center point */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] rounded-lg bg-secondary/20 opacity-75 blur-md group-hover:opacity-100 transition duration-300"></div>
              
              {/* Image container */}
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-lg">
                <Image 
                  src="/images/headshot.jpeg" 
                  alt="Wesley Dalton headshot" 
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}