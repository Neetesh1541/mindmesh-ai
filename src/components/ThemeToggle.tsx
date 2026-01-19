import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { mode, setMode } = useTheme();

  const modes = [
    { id: 'light' as const, icon: Sun, label: 'Light' },
    { id: 'dark' as const, icon: Moon, label: 'Dark' },
    { id: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-full glass-card">
      {modes.map(({ id, icon: Icon, label }) => (
        <motion.button
          key={id}
          onClick={() => setMode(id)}
          className={`relative p-2 rounded-full transition-all duration-300 ${
            mode === id 
              ? 'text-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          {mode === id && (
            <motion.div
              layoutId="theme-indicator"
              className="absolute inset-0 bg-primary/20 rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <Icon className="w-4 h-4 relative z-10" />
        </motion.button>
      ))}
    </div>
  );
};
