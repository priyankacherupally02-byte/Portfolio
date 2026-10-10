export const PROFILE = {
  name: 'Priyanka Cherupally',
  role: 'UI/UX Designer',
  tagline: 'I solve real problems and turn complex workflows into simple, intuitive screens.',
  location: 'India',
  site: 'https://priyankacherupally.dev',
  email: 'priyankacherupally02@gmail.com',
  // `name` must match an icon in components/SocialIcon.
  socials: [
    { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyanka-cherupally/' },
    { name: 'behance', label: 'Behance', href: 'https://www.behance.net/priyanka02' },
  ],
}

export const HERO = {
  // Rendered as: before + <em>highlight</em> + after
  headline: { before: 'I turn complex problems into ', highlight: 'simple', after: ' screens.' },
  intro:
    'A UI/UX designer and problem solver with 2 years across SaaS, enterprise and AI-powered products. I dig into what a brief really needs, then design the simplest way through it — from factory-floor dashboards to learning platforms.',
}

export const RESUME = {
  // Hosted on Google Drive until a local PDF lands in public/ — see PROJECT_STRUCTURE.md §4.
  // filename stays null for an external host: the `download` attribute is ignored cross-origin anyway.
  href: 'https://drive.google.com/file/d/1AGVCCrHpDHqtNWYgHTYcLj7KEEargjyL/view?usp=sharing',
  filename: null,
}

export const ABOUT = [
  "I'm a UI/UX designer and problem solver with 2 years of experience across SaaS, enterprise and AI-powered products — including tools built for the manufacturing floor. I start by finding the real problem behind a brief, not just what it literally asks for. Then I lean on research, empathy and systems thinking to turn complex workflows into interfaces that feel simple.",
  'Away from the screen, yoga, meditation, drawing and reading keep me grounded and curious — the same calm, curious mindset I bring to every design problem.',
]

export const ABOUT_TEASER = {
  eyebrow: 'About me',
  greeting: "Hi, I'm Priyanka",
  title: 'The person behind the pixels',
  description:
    "I'm a UI/UX designer and problem solver based in India. Off-screen, yoga, meditation, drawing and reading keep me grounded and curious — the same mindset I bring to every design problem.",
  facts: ['2 years in product design', `Based in ${PROFILE.location}`, 'Open to UI/UX & Product Design roles'],
  photosHint: 'Hover the photos — this is what my days look like',
  cta: { label: 'Get to know me', to: '/about' },
}

export const QUICK_FACTS = [
  { term: 'Role', value: `${PROFILE.role} & problem solver` },
  { term: 'Experience', value: '2 years' },
  { term: 'Focus', value: 'SaaS, enterprise & AI-powered products' },
  { term: 'Tools', value: 'Figma, AI-driven workflows' },
  { term: 'Based in', value: PROFILE.location },
  { term: 'Open to', value: 'UI/UX & Product Design roles' },
]

export const CONTACT = {
  eyebrow: 'Open to UI/UX & Product Design roles',
  title: 'Have a product that needs to feel simpler?',
  highlight: "Let's talk.",
}

export const SEO_DESCRIPTION =
  'Priyanka Cherupally — UI/UX designer and problem solver who turns complex SaaS, enterprise and AI-powered workflows into simple, intuitive screens.'
