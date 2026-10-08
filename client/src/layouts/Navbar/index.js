import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { PROFILE, NAV } from '@/content'
import { useTheme } from '@/hooks/useTheme'
import styles from './Navbar.module.scss'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        {PROFILE.name}
      </Link>

      <nav className={styles.links}>
        {NAV.map((item) => (
          <Link key={item.path} to={item.path} className={styles.link}>
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    </header>
  )
}
