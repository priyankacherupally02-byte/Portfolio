import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Maximize2, Quote } from 'lucide-react'
import { RichText } from './RichText'
import { Lightbox } from './Lightbox'
import { caseStudyImage } from './caseStudyImages'
import styles from './CaseStudy.module.scss'

// Active = the last section heading that has scrolled above the top third of
// the viewport. Computed on scroll (rAF-throttled) so jumps via the contents
// links land on the right item too.
function useActiveHeading(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      const line = window.innerHeight * 0.33
      let current = ids[0]
      for (const id of ids) {
        const node = document.getElementById(id)
        if (node && node.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
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
  }, [ids])

  return active
}

function Contents({ headings }) {
  const ids = useMemo(() => headings.map((heading) => heading.id), [headings])
  const active = useActiveHeading(ids)

  return (
    <nav className={styles.toc} aria-label="On this page">
      <p className={styles.tocLabel}>On this page</p>
      <ol>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`${styles.tocLink} ${active === heading.id ? styles.tocLinkActive : ''}`}
              onClick={(event) => {
                event.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                window.history.replaceState(null, '', `#${heading.id}`)
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function Block({ block, openImage }) {
  switch (block.type) {
    case 'heading':
      return block.level === 2 ? (
        <h2 id={block.id} className={styles.h2}>
          {block.text}
        </h2>
      ) : (
        <h3 id={block.id} className={`${styles.h3} ${block.step ? styles.h3Step : ''}`}>
          {block.step && <span className={styles.stepNumber}>{String(block.step).padStart(2, '0')}</span>}
          {block.text}
        </h3>
      )
    case 'paragraph':
      return (
        <p className={styles.p}>
          <RichText segments={block.segments} />
        </p>
      )
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <List className={block.ordered ? styles.ol : styles.ul}>
          {block.items.map((item, index) => (
            <li key={index}>
              <RichText segments={item} />
            </li>
          ))}
        </List>
      )
    }
    case 'images':
      return (
        <div className={styles.gallery} data-count={block.items.length} data-reveal>
          {block.label && (
            <span className={`${styles.badge} ${block.label === 'After' ? styles.badgeAfter : ''}`}>{block.label}</span>
          )}
          {block.items.map((image) => (
            <figure key={image.file} className={styles.figure}>
              <button
                type="button"
                className={styles.imageButton}
                onClick={() => openImage(image.file)}
                data-cursor-label="Expand"
                aria-label={`Expand image${image.caption ? `: ${image.caption}` : ''}`}
              >
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
                <span className={styles.expandHint} aria-hidden="true">
                  <Maximize2 size={14} />
                </span>
              </button>
              {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )
    case 'compare':
      return (
        <div className={styles.compare} data-reveal>
          <p className={styles.compareTitle}>{block.title}</p>
          <div className={styles.compareColumns}>
            {block.columns.map((column) => (
              <div key={column.label} className={styles.compareColumn}>
                <p className={styles.compareLabel}>{column.label}</p>
                <p className={styles.compareBody}>
                  <RichText segments={column.segments} />
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    case 'video':
      return (
        <figure className={styles.videoFigure} data-reveal>
          <div className={styles.video}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${block.youtubeId}`}
              title={block.title}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
          {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
        </figure>
      )
    case 'link':
      return (
        <a className={styles.linkCard} href={block.href} target="_blank" rel="noreferrer">
          <span>{block.label}</span>
          <ArrowUpRight size={16} />
        </a>
      )
    case 'quote':
      return (
        <blockquote className={styles.quote} data-reveal>
          <Quote size={22} aria-hidden="true" />
          <p>{block.text}</p>
        </blockquote>
      )
    case 'flow':
      return (
        <div className={styles.flow} data-reveal>
          <p className={styles.flowTitle}>{block.title}</p>
          <ol className={styles.flowSteps}>
            {block.steps.map((step, index) => (
              <li key={step} style={{ '--i': index }}>
                <span className={styles.flowIndex}>{index + 1}</span>
                {step}
                {index < block.steps.length - 1 && <ArrowRight className={styles.flowArrow} size={16} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>
      )
    case 'stats':
      return (
        <div className={styles.stats} data-reveal>
          {block.items.map((item) => (
            <div key={item.value} className={styles.stat}>
              <span className={styles.statValue}>{item.value}</span>
              <span className={styles.statLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      )
    case 'stages':
      return (
        <nav className={styles.stages} aria-label="Stages">
          <p className={styles.stagesIntro}>{block.intro}</p>
          <ol>
            {block.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.stage}
                  onClick={(event) => {
                    event.preventDefault()
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  <span className={styles.stageStep}>{String(item.step).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )
    case 'divider':
      return <hr className={styles.hr} />
    default:
      return null
  }
}

const WORDS_PER_MINUTE = 220

function blockText(block) {
  const segText = (segments = []) => segments.map((s) => s.text).join(' ')
  switch (block.type) {
    case 'paragraph':
      return segText(block.segments)
    case 'list':
      return block.items.map(segText).join(' ')
    case 'compare':
      return [block.title, ...block.columns.map((c) => segText(c.segments))].join(' ')
    case 'heading':
    case 'quote':
      return block.text
    default:
      return ''
  }
}

export function readingMinutes(study) {
  const words = [study.tldr || '', ...study.blocks.map(blockText)].join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

// Fades blocks marked data-reveal up into place the first time they scroll in.
function useReveal(ref, deps) {
  useEffect(() => {
    const nodes = [...ref.current.querySelectorAll('[data-reveal]')]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => (node.dataset.revealed = 'true'))
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.dataset.revealed = 'true'
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px' }
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export function CaseStudyArticle({ study }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const articleRef = useRef(null)

  // Resolve image URLs once; the lightbox pages through every image in the study.
  const blocks = useMemo(
    () =>
      study.blocks.map((block) =>
        block.type === 'images'
          ? {
              ...block,
              items: block.items.map((image) => ({
                ...image,
                src: caseStudyImage(study.slug, image.file),
                alt: image.caption || `${study.title} screen`,
              })),
            }
          : block
      ),
    [study.blocks, study.slug, study.title]
  )
  useReveal(articleRef, [blocks])
  const allImages = useMemo(() => blocks.filter((b) => b.type === 'images').flatMap((b) => b.items), [blocks])
  const headings = useMemo(() => blocks.filter((b) => b.type === 'heading' && b.level === 2), [blocks])

  function openImage(file) {
    setLightboxIndex(allImages.findIndex((image) => image.file === file))
  }

  return (
    <div className={styles.layout}>
      {headings.length > 1 && <Contents headings={headings} />}

      <article className={styles.article} ref={articleRef}>
        {blocks.map((block, index) => (
          <Block key={index} block={block} openImage={openImage} />
        ))}
      </article>

      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          index={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
