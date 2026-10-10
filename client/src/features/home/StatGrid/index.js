import { Counter } from '@/components/Counter'
import { STATS } from '@/content'
import styles from './StatGrid.module.scss'

export function StatGrid() {
  return (
    <div className={styles.grid}>
      {STATS.map((stat) => (
        <div className={styles.stat} key={stat.label} data-spotlight>
          <span className={styles.value}>
            <Counter value={stat.value} suffix={stat.suffix} />
          </span>
          <span className={styles.label}>{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
