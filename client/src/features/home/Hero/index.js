import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/Button'
import { HERO, PROFILE, RESUME } from '@/content'
import { WorkShowcase } from '@/features/home/WorkShowcase'
import styles from './Hero.module.scss'

export function Hero() {
  return (
    <div className={styles.root}>
      <div className={styles.copy}>
        <p className={styles.name}>
          {PROFILE.name} <span className={styles.dot} aria-hidden="true">·</span> {PROFILE.role}
        </p>

        <h1 className={styles.title}>
          {HERO.headline.before}
          <em className={styles.highlight}>{HERO.headline.highlight}</em>
          {HERO.headline.after}
        </h1>

        <p className={styles.tagline}>{HERO.intro}</p>

        <div className={styles.actions}>
          <Button href={`mailto:${PROFILE.email}`} variant="solid" icon={<ArrowUpRight size={14} />}>
            Get in touch
          </Button>
          {RESUME.href &&
            (RESUME.filename ? (
              <Button href={RESUME.href} download={RESUME.filename} variant="ghost">
                Download resume
              </Button>
            ) : (
              <Button href={RESUME.href} target="_blank" rel="noreferrer" variant="ghost">
                View resume
              </Button>
            ))}
        </div>
      </div>

      <div className={styles.showcase}>
        <WorkShowcase />
      </div>
    </div>
  )
}
