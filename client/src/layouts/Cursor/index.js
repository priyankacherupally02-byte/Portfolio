import { useEffect, useRef, useState } from 'react'
import styles from './Cursor.module.scss'

const INTERACTIVE = 'a, button, [role="button"], label, summary, [data-cursor-label]'
const TEXT = 'p, h1, h2, h3, h4, dd, dt, li, blockquote'
const RING_EASE = 0.2
const GLOW_EASE = 0.07

function canUseCustomCursor() {
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Dot follows the pointer exactly; ring and glow trail behind with easing.
// Ring state comes from what's under the pointer: 'hover' over anything
// clickable, 'label' when it has data-cursor-label, 'text' over copy.
// Also feeds --spot-x/--spot-y to the nearest [data-spotlight] element.
export function Cursor() {
  const [enabled] = useState(canUseCustomCursor)
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined

    const root = rootRef.current
    const html = document.documentElement
    html.dataset.cursor = 'custom'

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { ...pointer }
    const glow = { ...pointer }
    let frame = 0

    function render() {
      ring.x += (pointer.x - ring.x) * RING_EASE
      ring.y += (pointer.y - ring.y) * RING_EASE
      glow.x += (pointer.x - glow.x) * GLOW_EASE
      glow.y += (pointer.y - glow.y) * GLOW_EASE
      dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`
      ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0)`
      frame = requestAnimationFrame(render)
    }

    function handleMove(event) {
      pointer.x = event.clientX
      pointer.y = event.clientY
      root.dataset.visible = 'true'

      const spot = event.target.closest?.('[data-spotlight]')
      if (spot) {
        const rect = spot.getBoundingClientRect()
        spot.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
        spot.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
      }
    }

    function handleOver(event) {
      const target = event.target
      const interactive = target.closest?.(INTERACTIVE)
      const label = interactive?.closest('[data-cursor-label]')?.dataset.cursorLabel

      if (label) {
        root.dataset.state = 'label'
        labelRef.current.textContent = label
      } else if (interactive) {
        root.dataset.state = 'hover'
      } else if (target.closest?.(TEXT)) {
        root.dataset.state = 'text'
      } else {
        root.dataset.state = 'idle'
      }
    }

    function handleDown() {
      root.dataset.pressed = 'true'
    }

    function handleUp() {
      root.dataset.pressed = 'false'
    }

    function handleLeaveWindow() {
      root.dataset.visible = 'false'
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerover', handleOver)
    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)
    document.documentElement.addEventListener('pointerleave', handleLeaveWindow)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerover', handleOver)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      document.documentElement.removeEventListener('pointerleave', handleLeaveWindow)
      delete html.dataset.cursor
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={rootRef} className={styles.root} data-state="idle" data-visible="false" aria-hidden="true">
      <div ref={glowRef} className={styles.glow} />
      <div ref={ringRef} className={styles.ring}>
        <div className={styles.ringShape}>
          <span ref={labelRef} className={styles.label} />
        </div>
      </div>
      <div ref={dotRef} className={styles.dot}>
        <div className={styles.dotShape} />
      </div>
    </div>
  )
}
