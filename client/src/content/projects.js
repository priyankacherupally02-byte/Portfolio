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

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}

export function getProjectIndex(slug) {
  return PROJECTS.findIndex((project) => project.slug === slug)
}
