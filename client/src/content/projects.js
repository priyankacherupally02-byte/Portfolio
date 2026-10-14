// Full case-study content lives in content/caseStudies/<slug>.json and renders
// on-site at /work/:slug. `cover` (a file in assets/case-studies/<slug>/) is the
// screenshot shown as the card's hover preview.
export const PROJECTS = [
  {
    slug: 'edusphere',
    title: 'Edusphere',
    subtitle: 'Learning Management System (LMS)',
    summary: 'Solo-built internal LMS for training factory operators at scale.',
    tags: ['SaaS', 'Enterprise', 'LMS'],
    cover: '02.jpg',
  },
  {
    slug: 'production-logging',
    title: 'Production Logging at a Glance',
    subtitle: 'Unified production event documentation',
    summary: 'A single interface for logging production events, built for shop-floor speed.',
    tags: ['Enterprise', 'Manufacturing'],
    cover: '03.jpg',
  },
  {
    slug: 'seatrack',
    title: 'Seatrack',
    subtitle: 'Batch traceability system',
    summary: 'End-to-end batch traceability across every stage of production.',
    tags: ['Enterprise', 'Traceability'],
    cover: '06.jpg',
  },
]

// Work outside client/full-time UI/UX, listed in its own "Beyond design" section.
// No `cover`: its screenshots are tall phone captures, which don't suit the
// wide hover preview.
export const SIDE_PROJECTS = [
  {
    slug: 'divya-silks',
    title: 'Divya Silks',
    subtitle: 'Side Hustle · Built from Scratch',
    summary:
      'A side hustle where I took a 20-year-old saree store online, from zero to a growing digital brand.',
    tags: [
      'Digital Marketing',
      'Brand Strategy',
      'Social Media',
      'Content Creation',
      'Video Editing',
      'Web Design',
      'Growth',
    ],
  },
]

// Case-study pages page through client work first, then side projects.
export const ALL_PROJECTS = [...PROJECTS, ...SIDE_PROJECTS]

export function getProjectBySlug(slug) {
  return ALL_PROJECTS.find((project) => project.slug === slug)
}

export function getProjectIndex(slug) {
  return ALL_PROJECTS.findIndex((project) => project.slug === slug)
}
