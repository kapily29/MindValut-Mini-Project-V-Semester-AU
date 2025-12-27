import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (isDark) {
      root.classList.add('dark');
      console.log('Dark mode enabled - class added');
    } else {
      root.classList.remove('dark');
      console.log('Light mode enabled - class removed');
    }
    
    console.log('Current classes:', root.className);
    console.log('isDark state:', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggle theme called, current isDark:', isDark);
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
