import { Button } from '@/components/Button'
import { PROFILE, RESUME } from '@/content'
import styles from './Hero.module.scss'

export function Hero() {
  return (
    <div className={styles.hero}>
      <p className={styles.eyebrow}>{PROFILE.role}</p>
      <h1 className={styles.title}>{PROFILE.name}</h1>
      <p className={styles.tagline}>{PROFILE.tagline}</p>
      <div className={styles.actions}>
        <Button href={`mailto:${PROFILE.email}`} variant="solid">
          Get in touch
        </Button>
        {RESUME.href && (
          <Button href={RESUME.href} download={RESUME.filename} variant="ghost">
            Download resume
          </Button>
        )}
      </div>
    </div>
  )
}
