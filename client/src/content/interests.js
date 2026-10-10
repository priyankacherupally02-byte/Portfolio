// One card per category — `images` is ordered front-to-back (the first id is
// the face of the stack). Add more ids to grow the pile without touching the
// layout; a category with a single image just renders as a plain card.
export const INTERESTS = [
  { category: 'yoga', label: 'Yoga', images: ['yoga-1', 'yoga-2'] },
  { category: 'meditation', label: 'Meditation', images: ['meditation', 'meditation-3', 'meditation-4', 'meditation-5'] },
  { category: 'drawing', label: 'Pencil art', images: ['drawing-3', 'drawing-4', 'drawing-5', 'drawing-6', 'drawing-1', 'drawing-2'] },
  { category: 'reading', label: 'Reading', images: ['reading-1', 'reading-4', 'reading-3', 'reading-2'] },
]
