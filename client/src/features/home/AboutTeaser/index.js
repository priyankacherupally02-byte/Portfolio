import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/Button'
import { ABOUT_TEASER, INTERESTS, PROFILE } from '@/content'
import portrait from '@/assets/profile/priyanka-portrait.jpg'
import yoga from '@/assets/interests/yoga-1.jpg'
import meditation from '@/assets/interests/meditation.jpg'
import drawing from '@/assets/interests/drawing-3.jpg'
import reading from '@/assets/interests/reading-1.jpg'
import styles from './AboutTeaser.module.scss'

// Front photo of each interest category (same photos as the About page gallery).
const PHOTOS = { yoga, meditation, drawing, reading }

export function AboutTeaser() {
  const { eyebrow, greeting, title, description, facts, photosHint, cta } = ABOUT_TEASER
  const photos = INTERESTS.filter((interest) => PHOTOS[interest.category])

  return (
    <div className={styles.card}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{eyebrow}</p>

        <div className={styles.hello}>
          <img className={styles.avatar} src={portrait} alt={PROFILE.name} />
          <span className={styles.greeting}>
            {greeting}
            <Sparkles className={styles.sparkle} size={16} aria-hidden="true" />
          </span>
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        <ul className={styles.facts}>
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>

        <Button to={cta.to} variant="solid" icon={<ArrowRight size={14} />} className={styles.cta}>
          {cta.label}
        </Button>
      </div>

      <div className={styles.photosColumn}>
        <Link to={cta.to} className={styles.photos} data-cursor-label="Meet me" aria-label="See more on the About page">
          {photos.map((interest, index) => (
            <figure key={interest.category} className={styles.photo} style={{ '--i': index }}>
              <img src={PHOTOS[interest.category]} alt={interest.label} loading="lazy" />
              <figcaption>{interest.label}</figcaption>
            </figure>
          ))}
        </Link>
        <p className={styles.hint}>{photosHint}</p>
      </div>
    </div>
  )
}
