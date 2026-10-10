import { useEffect, useRef } from 'react'
import styles from './CaseStudy.module.scss'

// Thin bar along the top of the viewport showing how far through the page you are.
export function ReadingProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      barRef.current.style.transform = `scaleX(${progress})`
    }
    function handleScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className={styles.progressTrack} aria-hidden="true">
      <div ref={barRef} className={styles.progressBar} />
    </div>
  )
}
