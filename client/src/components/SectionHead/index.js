import styles from './SectionHead.module.scss'

export function SectionHead({ eyebrow, title, intro, as = 'h2' }) {
  const Heading = as
  return (
    <div className={styles.head}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Heading className={styles.title}>{title}</Heading>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  )
}
