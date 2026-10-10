import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Cursor } from './Cursor'

export default function MainLayout() {
  const { pathname } = useLocation()
  const closeMobileMenu = useAppStore((state) => state.closeMobileMenu)

  useEffect(() => {
    window.scrollTo(0, 0)
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Cursor />
    </>
  )
}
