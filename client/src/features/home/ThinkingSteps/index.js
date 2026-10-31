import { ArrowRight } from 'lucide-react'
import { PRODUCT_THINKING } from '@/content'
import styles from './ThinkingSteps.module.scss'

export function ThinkingSteps() {
  return (
    <ol className={styles.steps}>
      {PRODUCT_THINKING.map((item, index) => (
        <li key={item.step} className={styles.step} data-spotlight>
          <span className={styles.index}>
            {String(index + 1).padStart(2, '0')}
            {index < PRODUCT_THINKING.length - 1 && <ArrowRight size={14} aria-hidden="true" />}
          </span>
          <h3 className={styles.title}>{item.step}</h3>
          <p className={styles.text}>{item.text}</p>
        </li>
      ))}
    </ol>
  )
}
