import { FactList } from '@/components/FactList'
import { ABOUT, QUICK_FACTS, PROFILE } from '@/content'
import portrait from '@/assets/profile/priyanka-portrait.jpg'
import styles from './AboutBody.module.scss'

export function AboutBody() {
  return (
    <div className={styles.layout}>
      <div className={styles.copy}>
        {ABOUT.map((paragraph, index) => (
          <p key={paragraph.slice(0, 24)} className={index === 0 ? styles.lead : undefined}>
            {paragraph}
          </p>
        ))}
        <div className={styles.facts}>
          <FactList facts={QUICK_FACTS} />
        </div>
      </div>
      <figure className={styles.portrait}>
        <span className={styles.frameA} aria-hidden="true" />
        <span className={styles.frameB} aria-hidden="true" />
        <img src={portrait} alt={PROFILE.name} />
        <figcaption className={styles.caption}>Hi, I&apos;m Priyanka</figcaption>
      </figure>
    </div>
  )
}
