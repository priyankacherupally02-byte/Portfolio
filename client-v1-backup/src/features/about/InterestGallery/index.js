import { useState } from 'react'
import { INTERESTS } from '@/content'
import yoga1 from '@/assets/interests/yoga-1.jpg'
import yoga2 from '@/assets/interests/yoga-2.jpg'
import meditation from '@/assets/interests/meditation.jpg'
import drawing1 from '@/assets/interests/drawing-1.jpg'
import drawing2 from '@/assets/interests/drawing-2.jpg'
import reading1 from '@/assets/interests/reading-1.jpg'
import reading2 from '@/assets/interests/reading-2.jpg'
import styles from './InterestGallery.module.scss'

const IMAGES = {
  'yoga-1': yoga1,
  'yoga-2': yoga2,
  meditation,
  'drawing-1': drawing1,
  'drawing-2': drawing2,
  'reading-1': reading1,
  'reading-2': reading2,
}

// One tilt per category card — a flat grid would make the low-resolution
// source photos read as a spec sheet; this keeps them feeling like snapshots.
const TILTS = [-5, 4, -4, 5]

// Depth offset for the photos stacked behind the front one — deterministic,
// alternating sides, so the pile shape stays stable as more photos are added.
function backLayerStyle(depth) {
  const side = depth % 2 === 0 ? 1 : -1
  return {
    '--dx': `${depth * 8 * side}px`,
    '--dy': `${-depth * 7}px`,
    '--drot': `${depth * 7 * side}deg`,
  }
}

function InterestCard({ group, tilt }) {
  const [frontIndex, setFrontIndex] = useState(0)
  const hasMultiple = group.images.length > 1

  // Rotate the stack so `frontIndex` is always rendered at depth 0. Keying by
  // image id (not depth) lets React just move the existing layer rather than
  // remount it, so the depth transition that's already on .layerBack/.layerFront
  // animates the shuffle for free.
  const order = hasMultiple
    ? [...group.images.slice(frontIndex), ...group.images.slice(0, frontIndex)]
    : group.images

  const Tag = hasMultiple ? 'button' : 'div'
  const interactiveProps = hasMultiple
    ? {
        type: 'button',
        onClick: () => setFrontIndex((i) => (i + 1) % group.images.length),
        'aria-label': `${group.label} — photo ${frontIndex + 1} of ${group.images.length}, tap for the next one`,
      }
    : {}

  return (
    <div className={styles.card}>
      <Tag
        className={styles.stack}
        style={{ '--tilt': `${tilt}deg` }}
        {...interactiveProps}
      >
        {order
          .map((id, depth) => (
            <div
              key={id}
              className={depth === 0 ? styles.layerFront : styles.layerBack}
              style={depth === 0 ? undefined : backLayerStyle(depth)}
            >
              <img
                src={IMAGES[id]}
                alt={hasMultiple ? '' : group.label}
                className={styles.photo}
              />
            </div>
          ))
          .reverse()}
      </Tag>

      <p className={styles.caption}>{group.label}</p>

      {hasMultiple && (
        <div className={styles.dots} aria-hidden="true">
          {group.images.map((id, i) => (
            <span key={id} className={i === frontIndex ? styles.dotActive : styles.dot} />
          ))}
        </div>
      )}
    </div>
  )
}

export function InterestGallery() {
  return (
    <div className={styles.gallery}>
      {INTERESTS.map((group, index) => (
        <InterestCard key={group.category} group={group} tilt={TILTS[index % TILTS.length]} />
      ))}
    </div>
  )
}
