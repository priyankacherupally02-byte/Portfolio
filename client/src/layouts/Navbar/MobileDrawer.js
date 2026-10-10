import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { NAV, PROFILE } from '@/content'
import { useAppStore } from '@/store/appStore'
import styles from './Navbar.module.scss'

export function MobileDrawer() {
  const isOpen = useAppStore((state) => state.isMobileMenuOpen)
  const closeMobileMenu = useAppStore((state) => state.closeMobileMenu)

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKey = (event) => event.key === 'Escape' && closeMobileMenu()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, closeMobileMenu])

  if (!isOpen) return null

  return (
    <nav className={styles.drawer} aria-label="Mobile">
      {NAV.map((item, index) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) => `${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ''}`}
          style={{ animationDelay: `${index * 60}ms` }}
          onClick={closeMobileMenu}
        >
          <span className={styles.drawerIndex}>0{index + 1}</span>
          {item.label}
        </NavLink>
      ))}
      <a
        className={styles.drawerMail}
        href={`mailto:${PROFILE.email}`}
        style={{ animationDelay: `${NAV.length * 60}ms` }}
      >
        Let&apos;s talk <ArrowUpRight size={16} />
      </a>
    </nav>
  )
}
