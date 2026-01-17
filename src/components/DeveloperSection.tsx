import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ExternalLink, Code, Brain, 
  Rocket, Award, Star, Heart 
} from 'lucide-react';

const skills = [
  'React', 'TypeScript', 'Node.js', 'Python', 'AI/ML', 
  'Supabase', 'PostgreSQL', 'TailwindCSS'
];

const stats = [
  { label: 'Projects', value: '50+' },
  { label: 'Years Exp', value: '5+' },
  { label: 'Happy Clients', value: '100+' },
];

export const DeveloperSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Meet the Developer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">Built with</span>{' '}
            <span className="gradient-text">Passion</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Developer Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-8 rounded-2xl">
              {/* Glowing accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-50" />
              
              <div className="relative">
                {/* Profile section */}
                <div className="flex items-start gap-6 mb-8">
                  <motion.div
                    className="relative shrink-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary p-1">
                      <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                        <Brain className="w-14 h-14 text-primary" />
                      </div>
                    </div>
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  </motion.div>
                  
                  <div>
                    <h3 className="text-2xl font-display font-bold gradient-text mb-1">
                      Neetesh Kumar
                    </h3>
                    <p className="text-primary font-medium mb-2">Full-Stack AI Developer</p>
                    <p className="text-muted-foreground text-sm">
                      Passionate about building intelligent systems that enhance human potential. 
                      Specializing in AI-driven applications and cognitive enhancement tools.
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-4 rounded-xl bg-muted/30"
                    >
                      <div className="text-2xl font-display font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/neetesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass-card hover:bg-primary/10 transition-colors group"
                  >
                    <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <a
                    href="https://linkedin.com/in/neetesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass-card hover:bg-primary/10 transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <a
                    href="mailto:neetesh@example.com"
                    className="p-3 rounded-xl glass-card hover:bg-primary/10 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <a
                    href="#portfolio"
                    className="ml-auto btn-cyber text-sm flex items-center gap-2"
                  >
                    <span className="relative z-10">View Portfolio</span>
                    <ExternalLink className="w-4 h-4 relative z-10" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-display font-semibold text-foreground">Mission</h4>
              </div>
              <p className="text-muted-foreground">
                To democratize cognitive enhancement through AI, making advanced 
                productivity and wellness tools accessible to everyone.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-display font-semibold text-foreground">Vision</h4>
              </div>
              <p className="text-muted-foreground">
                A world where AI augments human intelligence, helping individuals 
                achieve their full potential in work, learning, and life.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border-2 border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <h4 className="font-display font-semibold text-foreground">Let's Connect</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Have an idea or want to collaborate? I'm always excited to discuss 
                new projects and opportunities.
              </p>
              <a 
                href="mailto:neetesh@example.com" 
                className="btn-glass text-sm inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
