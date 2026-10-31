import styles from './SectionHead.module.scss'

// `size="small"` drops the title one step on the type scale (heading-2).
export function SectionHead({ eyebrow, title, intro, as = 'h2', size }) {
  const Heading = as
  return (
    <div className={styles.head}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Heading className={`${styles.title} ${size === 'small' ? styles.titleSmall : ''}`}>{title}</Heading>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  )
}
