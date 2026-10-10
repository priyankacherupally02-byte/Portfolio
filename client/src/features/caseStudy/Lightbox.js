import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import styles from './CaseStudy.module.scss'

export function Lightbox({ images, index, onChange, onClose }) {
  const image = images[index]
  const hasMany = images.length > 1

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
      if (!hasMany) return
      if (event.key === 'ArrowRight') onChange((index + 1) % images.length)
      if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
    }
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [index, images.length, hasMany, onChange, onClose])

  // Portalled to <body>: inside <main> (its own z-index layer) the fixed navbar would sit on top.
  return createPortal(
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Image viewer" onClick={onClose}>
      <figure className={styles.lightboxFigure} onClick={(event) => event.stopPropagation()}>
        <img src={image.src} alt={image.alt} />
        {(image.caption || hasMany) && (
          <figcaption className={styles.lightboxCaption}>
            {image.caption}
            {hasMany && (
              <span className={styles.lightboxCount}>
                {index + 1} / {images.length}
              </span>
            )}
          </figcaption>
        )}
      </figure>

      <button
        type="button"
        className={`${styles.lightboxButton} ${styles.lightboxClose}`}
        onClick={onClose}
        aria-label="Close image"
        autoFocus
      >
        <X size={18} />
      </button>
      {hasMany && (
        <>
          <button
            type="button"
            className={`${styles.lightboxButton} ${styles.lightboxPrev}`}
            onClick={(event) => {
              event.stopPropagation()
              onChange((index - 1 + images.length) % images.length)
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className={`${styles.lightboxButton} ${styles.lightboxNext}`}
            onClick={(event) => {
              event.stopPropagation()
              onChange((index + 1) % images.length)
            }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>,
    document.body
  )
}
