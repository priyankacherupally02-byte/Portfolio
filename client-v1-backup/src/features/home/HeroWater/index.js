import { WaveBackground } from './WaveBackground'
import styles from './HeroWater.module.scss'

// Purely the hero's water surface now — the boat and the rest of the
// journey live in a single unified piece, see features/home/Journey.
export function HeroWater() {
  return (
    <div className={styles.strip}>
      <WaveBackground />
    </div>
  )
}
