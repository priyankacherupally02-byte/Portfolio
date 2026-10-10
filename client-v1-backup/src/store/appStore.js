import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      isMobileMenuOpen: false,
      openMobileMenu: () => set({ isMobileMenuOpen: true }),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
