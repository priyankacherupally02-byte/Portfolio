import styles from './SectionHead.module.scss'

export function SectionHead({ number, title }) {
  return (
    <div className={styles.head}>
      {number && <span className={styles.number}>{number}</span>}
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}
