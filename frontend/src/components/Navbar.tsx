import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Tooltip,
} from '@heroui/react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeContext';
import logoUrl from '../assets/logo.svg';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <HeroNavbar
      maxWidth="xl"
      className="bg-content2/80 backdrop-blur supports-[backdrop-filter]:bg-content2/60 border-b border-divider shadow-sm"
    >
      <NavbarBrand>
        <RouterLink to="/" className="flex items-center gap-2 font-semibold">
          <img src={logoUrl} alt="Logo" className="h-6 w-6" />
          Video Library
        </RouterLink>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <NavLink
            to="/videos"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-foreground-500 hover:text-foreground'
            }
          >
            Videos
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Tooltip
            content={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
          >
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              onPress={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
}
