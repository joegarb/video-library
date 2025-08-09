import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { DEFAULT_THEME, ThemeContext, type Theme } from './ThemeContext';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const userChangedRef = useRef(false);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    if (userChangedRef.current) {
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        console.error('Error setting theme', e);
      }
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (nextTheme: Theme) => {
        userChangedRef.current = true;
        setThemeState(nextTheme);
      },
      toggleTheme: () => {
        userChangedRef.current = true;
        setThemeState((previous) => (previous === 'light' ? 'dark' : 'light'));
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
