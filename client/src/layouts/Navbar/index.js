import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react'
import { PROFILE, NAV } from '@/content'
import { Button } from '@/components/Button'
import { useTheme } from '@/hooks/useTheme'
import { useAppStore } from '@/store/appStore'
import logoMark from '@/assets/brand/priyanka-monogram-wide.png'
import { MobileDrawer } from './MobileDrawer'
import styles from './Navbar.module.scss'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const isMobileMenuOpen = useAppStore((state) => state.isMobileMenuOpen)
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand} aria-label={`${PROFILE.name} — home`} data-cursor-label="Home">
          <img src={logoMark} alt="" className={styles.mark} />
        </Link>

        <nav className={styles.links} aria-label="Main">
          {NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            <span key={theme} className={styles.themeIcon}>
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </span>
          </button>

          <Button
            href={`mailto:${PROFILE.email}`}
            variant="solid"
            className={styles.talk}
            icon={<ArrowUpRight size={14} />}
          >
            Let&apos;s talk
          </Button>

          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuToggle}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <MobileDrawer />
    </header>
  )
}
