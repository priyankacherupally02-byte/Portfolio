import { create } from 'zustand'

// Bridges ProjectList (features/work) and WorkStream (features/home) so
// hovering a project card can trigger a preview popup positioned next to the
// scroll-driven boat, without threading callbacks through HomePage.
export const useWorkJourneyStore = create((set) => ({
  hoveredProject: null,
  setHoveredProject: (slug, top) => set({ hoveredProject: { slug, top } }),
  clearHoveredProject: () => set({ hoveredProject: null }),
}))
