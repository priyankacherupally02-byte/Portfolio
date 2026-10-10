export const PROFILE = {
  name: 'Priyanka Cherupally',
  role: 'AI-UI/UX Designer',
  tagline: 'I design experiences that make complex workflows feel simple and intuitive.',
  location: 'India',
  site: 'https://priyankacherupally.dev',
  email: 'priyankacherupally02@gmail.com',
  // No social profiles (GitHub/LinkedIn/etc) were on the source site — add real ones here when available.
  socials: [],
}

export const RESUME = {
  // Hosted on Google Drive until a local PDF lands in public/ — see PROJECT_STRUCTURE.md §4.
  // filename stays null for an external host: the `download` attribute is ignored cross-origin anyway.
  href: 'https://drive.google.com/file/d/1AGVCCrHpDHqtNWYgHTYcLj7KEEargjyL/view?usp=sharing',
  filename: null,
}

export const ABOUT = [
  "I'm an AI-UI/UX designer who specializes in SaaS, enterprise, and AI-powered products — manufacturing-domain tools included. My approach blends research, empathy, and systems thinking to turn complex workflows into interfaces that feel simple.",
  'Outside of product work, yoga, meditation, and continuous learning shape how I approach problem-solving — staying grounded and curious informs the way I design.',
]

export const QUICK_FACTS = [
  { term: 'Role', value: PROFILE.role },
  { term: 'Experience', value: '2 years' },
  { term: 'Focus', value: 'SaaS, enterprise & AI-powered products' },
  { term: 'Tools', value: 'Figma, AI-driven workflows' },
]

export const SEO_DESCRIPTION =
  'Priyanka Cherupally — AI-UI/UX designer crafting SaaS, enterprise, and AI-powered product experiences.'
