import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type ThemeStyle = 'default' | 'cyber' | 'neon' | 'glass' | 'ocean';

interface ThemeContextType {
  mode: ThemeMode;
  style: ThemeStyle;
  effectiveMode: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
  setStyle: (style: ThemeStyle) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as ThemeMode) || 'dark';
  });
  
  const [style, setStyle] = useState<ThemeStyle>(() => {
    const saved = localStorage.getItem('theme-style');
    return (saved as ThemeStyle) || 'default';
  });

  const [effectiveMode, setEffectiveMode] = useState<'light' | 'dark'>('dark');

  // Handle system preference detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateEffectiveMode = () => {
      if (mode === 'system') {
        setEffectiveMode(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setEffectiveMode(mode);
      }
    };

    updateEffectiveMode();
    mediaQuery.addEventListener('change', updateEffectiveMode);
    
    return () => mediaQuery.removeEventListener('change', updateEffectiveMode);
  }, [mode]);

  // Apply theme classes to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'theme-cyber', 'theme-neon', 'theme-glass', 'theme-ocean');
    
    // Add effective mode class
    root.classList.add(effectiveMode);
    
    // Add style class if not default
    if (style !== 'default') {
      root.classList.add(`theme-${style}`);
    }
    
    // Store preferences
    localStorage.setItem('theme-mode', mode);
    localStorage.setItem('theme-style', style);
  }, [effectiveMode, style, mode]);

  return (
    <ThemeContext.Provider value={{ mode, style, effectiveMode, setMode, setStyle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
