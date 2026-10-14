import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FactList } from '@/components/FactList'
import { ABOUT, ABOUT_SIDE_HUSTLE, QUICK_FACTS, PROFILE } from '@/content'
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
        <Link
          to={ABOUT_SIDE_HUSTLE.to}
          className={styles.side}
          data-spotlight
          data-cursor-label="Read case study"
        >
          <span>
            <span className={styles.sideLabel}>{ABOUT_SIDE_HUSTLE.label}</span>
            <span className={styles.sideTitle}>{ABOUT_SIDE_HUSTLE.title}</span>
            <span className={styles.sideSummary}>{ABOUT_SIDE_HUSTLE.summary}</span>
          </span>
          <span className={styles.sideArrow} aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </Link>
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
