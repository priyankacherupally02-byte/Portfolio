import { FactList } from '@/components/FactList'
import { ABOUT, QUICK_FACTS, PROFILE } from '@/content'
import portrait from '@/assets/profile/priyanka-portrait.jpg'
import styles from './AboutBody.module.scss'

export function AboutBody() {
  return (
    <div className={styles.layout}>
      <div className={styles.copy}>
        {ABOUT.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <div className={styles.facts}>
          <FactList facts={QUICK_FACTS} />
        </div>
      </div>
      <div className={styles.portrait}>
        <img src={portrait} alt={PROFILE.name} />
      </div>
    </div>
  )
}
