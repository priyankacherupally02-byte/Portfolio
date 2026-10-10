import { Link } from 'react-router-dom'
import { NAV } from '@/content'
import { useAppStore } from '@/store/appStore'
import styles from './Navbar.module.scss'

export function MobileDrawer() {
  const isOpen = useAppStore((state) => state.isMobileMenuOpen)
  const closeMobileMenu = useAppStore((state) => state.closeMobileMenu)

  if (!isOpen) return null

  return (
    <nav className={styles.drawer}>
      {NAV.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={styles.drawerLink}
          onClick={closeMobileMenu}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
