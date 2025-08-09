import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export const DEFAULT_THEME: Theme = 'dark';

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  toggleTheme: () => {},
});
