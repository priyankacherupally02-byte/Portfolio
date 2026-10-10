import { Button } from '@/components/Button'
import { PROFILE, RESUME } from '@/content'
import { HeroWater } from '@/features/home/HeroWater'
import { StatGrid } from '@/features/home/StatGrid'
import styles from './Hero.module.scss'

export function Hero() {
  return (
    <div className={styles.root}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{PROFILE.role}</p>
        <h1 className={styles.title}>{PROFILE.name}</h1>
        <p className={styles.tagline}>{PROFILE.tagline}</p>
        <div className={styles.actions}>
          <Button href={`mailto:${PROFILE.email}`} variant="solid">
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

        <StatGrid />
      </div>

      <HeroWater />
    </div>
  )
}
