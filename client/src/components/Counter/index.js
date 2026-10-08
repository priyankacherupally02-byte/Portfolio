import { useEffect, useRef, useState } from 'react'
import styles from './Counter.module.scss'

export function Counter({ value, duration = 1200, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const start = performance.now()

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            setCount(Math.round(progress * value))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className={styles.counter}>
      {count}
      {suffix}
    </span>
  )
}
