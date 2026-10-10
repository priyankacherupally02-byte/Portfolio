import styles from './VerticalStream.module.scss'

// A winding ribbon of constant width — both edges undulate together (not
// just one wavy edge against a straight one), so it reads as a meandering
// river rather than a straight column with a decorative edge.
const STREAM_PATH =
  'M40,0 C10,50 70,100 40,150 C10,200 70,250 40,300 L80,300 C110,250 50,200 80,150 C110,100 50,50 80,0 Z'

export function VerticalStream() {
  return (
    <div className={styles.channel} aria-hidden="true">
      <div className={`${styles.streamTrack} ${styles.back}`}>
        <svg viewBox="0 0 120 300" preserveAspectRatio="none" className={styles.streamSvg}>
          <path d={STREAM_PATH} fill="#7db4b8" opacity="0.4" />
        </svg>
        <svg viewBox="0 0 120 300" preserveAspectRatio="none" className={styles.streamSvg}>
          <path d={STREAM_PATH} fill="#7db4b8" opacity="0.4" />
        </svg>
      </div>
      <div className={`${styles.streamTrack} ${styles.front}`}>
        <svg viewBox="0 0 120 300" preserveAspectRatio="none" className={styles.streamSvg}>
          <path d={STREAM_PATH} fill="#5f99a0" opacity="0.55" />
        </svg>
        <svg viewBox="0 0 120 300" preserveAspectRatio="none" className={styles.streamSvg}>
          <path d={STREAM_PATH} fill="#5f99a0" opacity="0.55" />
        </svg>
      </div>
    </div>
  )
}
