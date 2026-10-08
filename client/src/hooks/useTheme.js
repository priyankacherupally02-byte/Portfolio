import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'

export function useTheme() {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return { theme, toggleTheme }
}
