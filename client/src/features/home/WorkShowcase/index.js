import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { WORK_SAMPLES, getProjectBySlug } from '@/content'
import styles from './WorkShowcase.module.scss'

import vnsDashboard1 from '@/assets/work-samples/vns-dashboard-1.jpg'
import vnsDashboard2 from '@/assets/work-samples/vns-dashboard-2.jpg'
import idrbtDomain from '@/assets/work-samples/idrbt-domain.jpg'
import jobPortal from '@/assets/work-samples/job-portal.jpg'
import patternlabOverview from '@/assets/work-samples/patternlab-overview.jpg'
import patternlabLoadMgmt from '@/assets/work-samples/patternlab-load-mgmt.jpg'
import ramakrishnaBooks from '@/assets/work-samples/ramakrishna-books.jpg'
import seatrackMobile from '@/assets/work-samples/seatrack-mobile.jpg'
import veganBakeryHome from '@/assets/work-samples/vegan-bakery-home.jpg'
import veganBakeryCart from '@/assets/work-samples/vegan-bakery-cart.jpg'

// Pixel sizes of the files in assets/work-samples/ — each card takes its image's
// exact aspect ratio so no screen is cropped. Update these if an image is replaced.
const IMAGES = {
  'vns-dashboard-1': { src: vnsDashboard1, width: 820, height: 512 },
  'vns-dashboard-2': { src: vnsDashboard2, width: 820, height: 512 },
  'idrbt-domain': { src: idrbtDomain, width: 820, height: 583 },
  'job-portal': { src: jobPortal, width: 820, height: 583 },
  'patternlab-overview': { src: patternlabOverview, width: 820, height: 463 },
  'patternlab-load-mgmt': { src: patternlabLoadMgmt, width: 820, height: 464 },
  'ramakrishna-books': { src: ramakrishnaBooks, width: 820, height: 385 },
  'seatrack-mobile': { src: seatrackMobile, width: 360, height: 782 },
  'vegan-bakery-home': { src: veganBakeryHome, width: 320, height: 680 },
  'vegan-bakery-cart': { src: veganBakeryCart, width: 320, height: 692 },
}

// Must match .bezelled's width/height in the stylesheet: the screenshot fills
// this fraction of the card, the rest is the dark bezel.
const BEZEL_INNER_WIDTH = 0.932
const BEZEL_INNER_HEIGHT = 0.968

function cardAspectRatio(sample) {
  const { width, height } = IMAGES[sample.id]
  if (sample.device === 'mobile' && !sample.framed) {
    return `${width / BEZEL_INNER_WIDTH} / ${height / BEZEL_INNER_HEIGHT}`
  }
  return `${width} / ${height}`
}

const TOTAL = WORK_SAMPLES.length

// Coverflow placement by distance from the front card: x = cqw (% of deck
// width) from centre, z = px of depth, ry = degrees of Y rotation.
const POSITIONS = [
  { x: 0, z: 0, ry: 0, opacity: 1, dim: 0 },
  { x: 24, z: -220, ry: 38, opacity: 1, dim: 0.35 },
  { x: 36, z: -420, ry: 46, opacity: 0, dim: 0.6 },
  { x: 42, z: -560, ry: 50, opacity: 0, dim: 0.6 },
]

function circularOffset(index, active) {
  let offset = index - active
  if (offset > TOTAL / 2) offset -= TOTAL
  if (offset < -TOTAL / 2) offset += TOTAL
  return offset
}

// Neighbour spacing (cqw) for the ±1 cards depends on both card shapes: a narrow
// phone beside a wide desktop card has to sit further out or it hides behind it.
const NEIGHBOUR_X = {
  'desktop:desktop': 24,
  'desktop:mobile': 34,
  'mobile:desktop': 24,
  'mobile:mobile': 20,
}

function cardStyle(offset, sample, front) {
  const position = POSITIONS[Math.min(Math.abs(offset), POSITIONS.length - 1)]
  const direction = Math.sign(offset)
  const x = Math.abs(offset) === 1 ? NEIGHBOUR_X[`${front.device}:${sample.device}`] : position.x
  return {
    transform: `translate(-50%, -50%) translateX(${x * direction}cqw) translateZ(${position.z}px) rotateY(${position.ry * -direction}deg)`,
    opacity: position.opacity,
    pointerEvents: position.opacity ? 'auto' : 'none',
    zIndex: 10 - Math.abs(offset),
    '--dim': position.dim,
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function WorkShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion] = useState(prefersReducedMotion)
  const stageRef = useRef(null)

  const current = WORK_SAMPLES[active]
  const caseStudy = current.caseStudySlug && getProjectBySlug(current.caseStudySlug)

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || reducedMotion) return
    const stage = stageRef.current
    const rect = stage.getBoundingClientRect()
    stage.style.setProperty('--tilt-x', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3))
    stage.style.setProperty('--tilt-y', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3))
  }

  function handlePointerLeave() {
    stageRef.current.style.setProperty('--tilt-x', '0')
    stageRef.current.style.setProperty('--tilt-y', '0')
  }

  return (
    <div
      className={`${styles.root} ${paused ? styles.paused : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={styles.stage}
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className={styles.tilt}>
          <div className={styles.float}>
            {WORK_SAMPLES.map((sample, index) => {
              const offset = circularOffset(index, active)
              const isActive = offset === 0
              const isMobile = sample.device === 'mobile'
              return (
                <button
                  key={sample.id}
                  type="button"
                  tabIndex={-1}
                  className={`${styles.card} ${isMobile ? styles.cardMobile : styles.cardDesktop} ${isActive ? styles.cardActive : ''}`}
                  style={{ ...cardStyle(offset, sample, current), aspectRatio: cardAspectRatio(sample) }}
                  aria-hidden={!isActive}
                  data-cursor-label={isActive ? undefined : 'View'}
                  onClick={() => setActive(index)}
                >
                  <img
                    className={`${styles.cardImage} ${isMobile && !sample.framed ? styles.bezelled : ''}`}
                    src={IMAGES[sample.id].src}
                    width={IMAGES[sample.id].width}
                    height={IMAGES[sample.id].height}
                    alt={isActive ? `${sample.project} — ${sample.title}` : ''}
                  />
                </button>
              )
            })}
          </div>
          <div className={styles.floor} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.caption}>
          <span className={styles.project}>{current.project}</span>
          <span className={styles.title}>
            {current.title}
            {caseStudy && (
              <>
                {' · '}
                <Link className={styles.caseLink} to={`/work/${caseStudy.slug}`}>
                  Read case study →
                </Link>
              </>
            )}
          </span>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous screen"
            onClick={() => setActive((active - 1 + TOTAL) % TOTAL)}
          >
            <ChevronLeft size={16} />
          </button>
          <span className={styles.counter}>
            {String(active + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
          </span>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next screen"
            onClick={() => setActive((active + 1) % TOTAL)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Auto-advance is driven by this bar finishing its CSS animation, so
          pausing on hover freezes the bar and the timer together. */}
      <div className={styles.track} aria-hidden="true">
        {!reducedMotion && (
          <span
            className={styles.progress}
            key={active}
            onAnimationEnd={() => setActive((active + 1) % TOTAL)}
          />
        )}
      </div>
    </div>
  )
}
