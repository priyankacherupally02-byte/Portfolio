import { Link } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { PROFILE, NAV } from '@/content'
import { useTheme } from '@/hooks/useTheme'
import { useAppStore } from '@/store/appStore'
import logoMark from '@/assets/brand/priyanka-monogram-wide.png'
import { MobileDrawer } from './MobileDrawer'
import styles from './Navbar.module.scss'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const isMobileMenuOpen = useAppStore((state) => state.isMobileMenuOpen)
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu)

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brand} aria-label={PROFILE.name}>
        <img src={logoMark} alt={PROFILE.name} className={styles.mark} />
      </Link>

      <nav className={styles.links}>
        {NAV.map((item) => (
          <Link key={item.path} to={item.path} className={styles.link}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <MobileDrawer />
    </header>
  )
}
