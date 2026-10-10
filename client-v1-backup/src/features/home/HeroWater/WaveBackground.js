import styles from './WaveBackground.module.scss'

const WAVE_PATH =
  'M0,60 C100,20 200,100 300,60 C400,20 500,100 600,60 C700,20 800,60 800,60 L800,120 L0,120 Z'

export function WaveBackground() {
  return (
    <div className={styles.horizon} aria-hidden="true">
      <div className={`${styles.waveTrack} ${styles.back}`}>
        <svg viewBox="0 0 800 120" preserveAspectRatio="none" className={styles.waveSvg}>
          <path d={WAVE_PATH} fill="#7db4b8" opacity="0.45" />
        </svg>
        <svg viewBox="0 0 800 120" preserveAspectRatio="none" className={styles.waveSvg}>
          <path d={WAVE_PATH} fill="#7db4b8" opacity="0.45" />
        </svg>
      </div>
      <div className={`${styles.waveTrack} ${styles.front}`}>
        <svg viewBox="0 0 800 120" preserveAspectRatio="none" className={styles.waveSvg}>
          <path d={WAVE_PATH} fill="#5f99a0" opacity="0.6" />
        </svg>
        <svg viewBox="0 0 800 120" preserveAspectRatio="none" className={styles.waveSvg}>
          <path d={WAVE_PATH} fill="#5f99a0" opacity="0.6" />
        </svg>
      </div>
    </div>
  )
}
