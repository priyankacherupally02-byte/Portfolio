import styles from './ProjectPreview.module.scss'

// Placeholder "screenshot" — an abstract mock of a UI window, not a real
// screenshot. Swap for actual project imagery the moment it's available;
// until then this is deliberately obviously-a-placeholder, not a fake photo.
const PALETTE = ['#b5603d', '#5f99a0', '#8a6fb0']

export function ProjectPreview({ project, index = 0 }) {
  const color = PALETTE[index % PALETTE.length]

  return (
    <div className={styles.card}>
      <svg viewBox="0 0 220 150" className={styles.mock} aria-hidden="true">
        <rect x="1" y="1" width="218" height="148" rx="10" fill="#fdfcfa" stroke="#e4e1d8" />
        <rect x="1" y="1" width="218" height="22" rx="10" fill="#efece3" />
        <circle cx="14" cy="12" r="3" fill="#d8d4c8" />
        <circle cx="24" cy="12" r="3" fill="#d8d4c8" />
        <circle cx="34" cy="12" r="3" fill="#d8d4c8" />

        <rect x="14" y="36" width="60" height="98" rx="6" fill={color} opacity="0.16" />
        <rect x="14" y="36" width="60" height="14" rx="4" fill={color} opacity="0.4" />
        <rect x="14" y="56" width="60" height="8" rx="3" fill={color} opacity="0.3" />
        <rect x="14" y="70" width="60" height="8" rx="3" fill={color} opacity="0.3" />

        <rect x="84" y="36" width="122" height="30" rx="6" fill={color} opacity="0.22" />
        <rect x="84" y="74" width="58" height="60" rx="6" fill={color} opacity="0.14" />
        <rect x="148" y="74" width="58" height="60" rx="6" fill={color} opacity="0.14" />
      </svg>
      <p className={styles.label}>{project.title}</p>
    </div>
  )
}
