import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message = 'Loading MindMesh AI...' }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      {/* Animated rings */}
      <div className="relative">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
            style={{
              width: `${100 + ring * 60}px`,
              height: `${100 + ring * 60}px`,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: ring % 2 === 0 ? 360 : -360,
            }}
            transition={{
              duration: 3 + ring,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Central brain icon */}
        <motion.div
          className="relative glass-card w-24 h-24 rounded-full flex items-center justify-center cyber-glow"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Brain className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-1/4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-2 justify-center mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-primary animation-delay-200" />
          <div className="w-2 h-2 rounded-full bg-primary animation-delay-400" />
        </motion.div>
        <p className="text-muted-foreground font-medium">{message}</p>
      </motion.div>
    </div>
  );
};
