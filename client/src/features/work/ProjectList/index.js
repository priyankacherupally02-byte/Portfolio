import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS, getCaseStudy } from '@/content'
import { caseStudyImage } from '@/features/caseStudy/caseStudyImages'
import styles from './ProjectList.module.scss'

const PREVIEW_WIDTH = 400
const PREVIEW_GAP = 32

// Pixel size of a project's cover, looked up from its case-study image blocks.
function coverSize(project) {
  for (const block of getCaseStudy(project.slug)?.blocks ?? []) {
    const image = block.type === 'images' && block.items.find((item) => item.file === project.cover)
    if (image) return image
  }
  return { width: 2, height: 1 }
}

function canHoverPreview() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

// Floating screenshot that follows the pointer while a card is hovered. It sits
// to the right of the cursor (flipping left near the viewport edge) so the
// cursor's "Read case study" label stays visible. Portalled to <body> so it
// layers above <main>.
function HoverPreview({ previewRef, activeSlug }) {
  const active = PROJECTS.find((project) => project.slug === activeSlug)
  const size = active ? coverSize(active) : null
  return createPortal(
    <div
      ref={previewRef}
      className={`${styles.preview} ${activeSlug ? styles.previewVisible : ''}`}
      style={size ? { aspectRatio: `${size.width} / ${size.height}` } : undefined}
      aria-hidden="true"
    >
      {PROJECTS.filter((project) => project.cover).map((project) => (
        <img
          key={project.slug}
          className={`${styles.previewImage} ${project.slug === activeSlug ? styles.previewImageActive : ''}`}
          src={caseStudyImage(project.slug, project.cover)}
          alt=""
        />
      ))}
    </div>,
    document.body
  )
}

export function ProjectList() {
  const [enabled] = useState(canHoverPreview)
  const [activeSlug, setActiveSlug] = useState(null)
  const previewRef = useRef(null)

  function trackPointer(event) {
    const node = previewRef.current
    if (!node) return
    const flip = event.clientX + PREVIEW_GAP + PREVIEW_WIDTH > window.innerWidth - 16
    node.style.setProperty('--px', `${event.clientX}px`)
    node.style.setProperty('--py', `${event.clientY}px`)
    node.dataset.flip = flip ? 'true' : 'false'
  }

  return (
    <>
      <ol className={styles.list} onPointerMove={enabled ? trackPointer : undefined}>
        {PROJECTS.map((project, index) => (
          <li key={project.slug}>
            <Link
              className={styles.card}
              to={`/work/${project.slug}`}
              data-spotlight
              data-cursor-label="Read case study"
              aria-label={`${project.title} — read the case study`}
              onPointerEnter={enabled ? (event) => {
                trackPointer(event)
                setActiveSlug(project.slug)
              } : undefined}
              onPointerLeave={enabled ? () => setActiveSlug(null) : undefined}
            >
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>

              <div className={styles.heading}>
                <p className={styles.subtitle}>{project.subtitle}</p>
                <h3 className={styles.title}>{project.title}</h3>
              </div>

              <div className={styles.body}>
                <p className={styles.summary}>{project.summary}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span className={styles.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className={styles.arrow} aria-hidden="true">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {enabled && <HoverPreview previewRef={previewRef} activeSlug={activeSlug} />}
    </>
  )
}
