// Real UI/UX work screenshots shown in the Hero section to build credibility.
// Image files live in src/assets/work-samples/ and are imported by id in
// features/home/WorkShowcase. Captions are derived from each screen's own
// on-screen branding, not invented.
//
// Array order is the showcase's playback order — mobile screens are spread
// between desktop ones so the deck alternates device shapes.
// `framed: true` marks phone screenshots that already include a device bezel
// in the image itself. `caseStudySlug` links a sample to its PROJECTS entry.
export const WORK_SAMPLES = [
  {
    id: 'patternlab-overview',
    device: 'desktop',
    project: 'Pattern Lab AI',
    title: 'Plant manager overview',
  },
  {
    id: 'seatrack-mobile',
    device: 'mobile',
    project: 'Seatrack',
    title: 'Plant dashboard, mobile',
    caseStudySlug: 'seatrack',
  },
  {
    id: 'vns-dashboard-1',
    device: 'desktop',
    project: 'VNS — Voice Navigation System',
    title: 'Analytics dashboard',
  },
  {
    id: 'idrbt-domain',
    device: 'desktop',
    project: 'IDRBT',
    title: 'Banking domain registration',
  },
  {
    id: 'vegan-bakery-home',
    device: 'mobile',
    framed: true,
    project: 'Vegan Bakery',
    title: 'App home screen',
  },
  {
    id: 'patternlab-load-mgmt',
    device: 'desktop',
    project: 'Pattern Lab AI',
    title: 'Load management dashboard',
  },
  {
    id: 'job-portal',
    device: 'desktop',
    project: 'Job Portal',
    title: 'Landing page',
  },
  {
    id: 'vegan-bakery-cart',
    device: 'mobile',
    framed: true,
    project: 'Vegan Bakery',
    title: 'App cart screen',
  },
  {
    id: 'vns-dashboard-2',
    device: 'desktop',
    project: 'VNS — Voice Navigation System',
    title: 'Analytics dashboard, alt view',
  },
  {
    id: 'ramakrishna-books',
    device: 'desktop',
    project: 'Ramakrishna Math Hyderabad Publications',
    title: 'Bookstore homepage',
  },
]
