import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

const MAGNET_X = 0.16
const MAGNET_Y = 0.3

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function Button({
  children,
  variant = 'solid',
  icon,
  to,
  href,
  onClick,
  type = 'button',
  download,
  cursorLabel,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const [ripples, setRipples] = useState([])

  // Writes the pointer position as CSS vars: --x/--y drive where the hover fill
  // and press ripple start; --mx/--my drive the magnetic pull (mouse only).
  function trackPointer(event) {
    const node = ref.current
    const rect = node.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    node.style.setProperty('--x', `${x}px`)
    node.style.setProperty('--y', `${y}px`)
    if (event.pointerType === 'mouse' && !prefersReducedMotion()) {
      node.style.setProperty('--mx', `${(x - rect.width / 2) * MAGNET_X}px`)
      node.style.setProperty('--my', `${(y - rect.height / 2) * MAGNET_Y}px`)
    }
    return { x, y }
  }

  function handlePointerLeave(event) {
    trackPointer(event)
    ref.current.style.setProperty('--mx', '0px')
    ref.current.style.setProperty('--my', '0px')
  }

  function handlePointerDown(event) {
    const { x, y } = trackPointer(event)
    setRipples((current) => [...current, { id: `${event.timeStamp}-${x}`, x, y }])
  }

  const classes = `${styles.btn} ${styles[variant]} ${className}`.trim()
  const shared = {
    ref,
    className: classes,
    onPointerEnter: trackPointer,
    onPointerMove: trackPointer,
    onPointerLeave: handlePointerLeave,
    onPointerDown: handlePointerDown,
    'data-cursor-label': cursorLabel,
    ...rest,
  }

  const content = (
    <>
      <span className={styles.fill} aria-hidden="true" />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{ left: ripple.x, top: ripple.y }}
          aria-hidden="true"
          onAnimationEnd={() => setRipples((current) => current.filter((item) => item.id !== ripple.id))}
        />
      ))}
      <span className={styles.label}>
        <span className={styles.labelTrack}>
          <span className={styles.labelText}>{children}</span>
          <span className={styles.labelText} aria-hidden="true">
            {children}
          </span>
        </span>
      </span>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} {...shared}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} download={download} {...shared}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} {...shared}>
      {content}
    </button>
  )
}
