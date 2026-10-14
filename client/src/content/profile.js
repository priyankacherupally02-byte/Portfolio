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
    'A UI/UX designer and problem solver with 2 years across SaaS, enterprise and AI-powered products. I dig into what a brief really needs, then design the simplest way through it — from factory-floor dashboards to learning platforms. On the side, I’m taking a saree store online from scratch.',
}

export const RESUME = {
  // Hosted on Google Drive until a local PDF lands in public/ — see PROJECT_STRUCTURE.md §4.
  // filename stays null for an external host: the `download` attribute is ignored cross-origin anyway.
  href: 'https://drive.google.com/file/d/1LilQZnpF8IRhxqjCxv4ymnGNrIJ3dPS9/view?usp=sharing',
  filename: null,
}

export const ABOUT = [
  "I'm a UI/UX designer and problem solver with 2 years of experience across SaaS, enterprise and AI-powered products — including tools built for the manufacturing floor. I start by finding the real problem behind a brief, not just what it literally asks for. Then I lean on research, empathy and systems thinking to turn complex workflows into interfaces that feel simple.",
  "Outside my day job, I run a side hustle: building the online presence of Divya Silks, a family-run saree store in Hyderabad, from zero. Brand identity, Reels and Shorts, posters and a website — I own all of it. Wearing every hat has made me a sharper designer: I now see exactly how design decisions show up in reach, enquiries and sales.",
  'Away from the screen, yoga, meditation, drawing and reading keep me grounded and curious — the same calm, curious mindset I bring to every design problem.',
]

// Link card on the About page pointing to the side-hustle case study.
export const ABOUT_SIDE_HUSTLE = {
  label: 'Side hustle',
  title: 'Divya Silks',
  summary: 'Taking a 20-year-old saree store online: brand, content, growth and a website, built solo.',
  to: '/work/divya-silks',
}

export const ABOUT_TEASER = {
  eyebrow: 'About me',
  greeting: "Hi, I'm Priyanka",
  title: 'The person behind the pixels',
  description:
    "I'm a UI/UX designer and problem solver based in India. On the side, I'm building a saree brand's online presence from scratch. Off-screen, yoga, meditation, drawing and reading keep me grounded and curious — the same mindset I bring to every design problem.",
  facts: [
    '2 years in product design',
    'Side hustle: Divya Silks',
    `Based in ${PROFILE.location}`,
    'Open to UI/UX & Product Design roles',
  ],
  photosHint: 'Hover the photos — this is what my days look like',
  cta: { label: 'Get to know me', to: '/about' },
}

export const QUICK_FACTS = [
  { term: 'Role', value: `${PROFILE.role}, 2 years` },
  { term: 'Focus', value: 'SaaS, enterprise & AI-powered products' },
  { term: 'Side hustle', value: 'Divya Silks: brand, content & growth' },
  { term: 'Tools', value: 'Figma, VS Code & AI-driven workflows' },
  { term: 'Based in', value: PROFILE.location },
  { term: 'Open to', value: 'UI/UX & Product Design roles' },
]

export const CONTACT = {
  eyebrow: 'Open to UI/UX & Product Design roles',
  title: 'Have a product that needs to feel simpler?',
  highlight: "Let's talk.",
}

export const SEO_DESCRIPTION =
  'Priyanka Cherupally — UI/UX designer and problem solver who turns complex SaaS, enterprise and AI-powered workflows into simple, intuitive screens, and builds brands from scratch on the side.'
