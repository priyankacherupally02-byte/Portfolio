import { CAPABILITIES } from '@/content'
import styles from './Capabilities.module.scss'

export function Capabilities() {
  return (
    <ol className={styles.grid}>
      {CAPABILITIES.map((item, index) => (
        <li key={item.title} className={styles.card}>
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.text}>{item.text}</p>
        </li>
      ))}
    </ol>
  )
}
