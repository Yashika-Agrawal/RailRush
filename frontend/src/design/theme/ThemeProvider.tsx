import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  calmMode: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setCalmMode: (calm: boolean) => void;
  toggleCalmMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'railrush_theme';
const CALM_STORAGE_KEY = 'railrush_calm_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    // Check system preference if no explicit saved choice
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    // Default is Night Service (Dark)
    return 'dark';
  });

  const [calmMode, setCalmModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem(CALM_STORAGE_KEY);
    if (saved !== null) return saved === 'true';
    // Auto-detect reduced-motion or save-data
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // @ts-expect-error - navigator.connection is non-standard but supported on Chromium
      const saveData = navigator.connection?.saveData === true;
      return prefersReduced || saveData;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (calmMode) {
      root.setAttribute('data-calm-mode', 'true');
    } else {
      root.removeAttribute('data-calm-mode');
    }
    localStorage.setItem(CALM_STORAGE_KEY, String(calmMode));
  }, [calmMode]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const setCalmMode = (calm: boolean) => setCalmModeState(calm);
  const toggleCalmMode = () => setCalmModeState((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        calmMode,
        setTheme,
        toggleTheme,
        setCalmMode,
        toggleCalmMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
