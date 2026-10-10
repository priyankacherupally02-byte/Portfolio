// Full case-study content (problem/process/outcomes) isn't ported in yet — the
// source Notion pages render client-side and couldn't be scraped. Each project
// links out to its Notion doc via `externalUrl` until that content lands here
// and an on-site /work/:slug detail page is built.
export const PROJECTS = [
  {
    slug: 'edusphere',
    title: 'Edusphere',
    subtitle: 'Learning Management System (LMS)',
    summary: 'Solo-built internal LMS for training factory operators at scale.',
    tags: ['SaaS', 'Enterprise', 'LMS'],
    externalUrl:
      'https://app.notion.com/p/Edusphere-Learning-Management-System-LMS-3b84a08e65a280608b4ae9c302607d95?source=copy_link',
  },
  {
    slug: 'production-logging',
    title: 'Production Logging at a Glance',
    subtitle: 'Unified production event documentation',
    summary: 'A single interface for logging production events, built for shop-floor speed.',
    tags: ['Enterprise', 'Manufacturing'],
    externalUrl:
      'https://app.notion.com/p/Production-Logging-at-a-Glance-3b24a08e65a280348bb8dce7ec5b0f7a?source=copy_link',
  },
  {
    slug: 'seatrack',
    title: 'Seatrack',
    subtitle: 'Batch traceability system',
    summary: 'End-to-end batch traceability across every stage of production.',
    tags: ['Enterprise', 'Traceability'],
    externalUrl: 'https://app.notion.com/p/Seatrack-3b24a08e65a2805fad10f4ce8b0a38cc?source=copy_link',
  },
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}

export function getProjectIndex(slug) {
  return PROJECTS.findIndex((project) => project.slug === slug)
}
