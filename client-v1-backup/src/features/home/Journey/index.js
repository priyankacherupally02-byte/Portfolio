import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWorkJourneyStore } from '@/store/workJourneyStore'
import { getProjectBySlug, getProjectIndex } from '@/content'
import { computeGutterLeft, GUTTER_WIDTH } from '../journeyLayout'
import { BoatIllustration } from './BoatIllustration'
import { VerticalStream } from './VerticalStream'
import { ProjectPreview } from './ProjectPreview'
import styles from './Journey.module.scss'

gsap.registerPlugin(ScrollTrigger)

const POPUP_WIDTH = 220
const POPUP_GAP = 20
const DESKTOP_MIN_WIDTH = 1440 // matches Journey.module.scss's 1439px cutoff
const MOBILE_MAX_WIDTH = 768 // matches $bp-md
const SAFE_TOP = 110 // clears the fixed navbar
const DOCK_FRACTION = 0.3 // viewport fraction the boat docks at, near the CTA button's top

// One boat, one continuous animation, for the whole home page: rows in
// across the hero once (autoplay), rests, then — once the user scrolls past
// the hero — tracks the viewport directly (not a fixed document distance)
// so it always stays in a safe zone clear of the navbar, regardless of how
// tall Work ever gets, and docks near the CTA button at the end.
export function Journey() {
  const rootRef = useRef(null)
  const gutterRef = useRef(null)
  const boatRef = useRef(null)
  const [popupStyle, setPopupStyle] = useState(null)

  const hoveredProject = useWorkJourneyStore((state) => state.hoveredProject)

  // useLayoutEffect, not useEffect: applies GSAP's initial x/y before the
  // browser paints, so the boat never renders at its unstyled CSS default
  // (top:0, left:0 — the very top of the page) even for a single frame.
  useLayoutEffect(() => {
    const root = rootRef.current
    const gutter = gutterRef.current
    const boat = boatRef.current
    const heroEl = document.getElementById('home-hero')
    const ctaButton = document.getElementById('home-cta-button')
    if (!root || !gutter || !boat || !heroEl || !ctaButton) return

    let restXValue = 0
    let heroWaterY = 0
    let heroToWaterOffset = 0 // how far above hero's own bottom edge the boat rests
    let isDesktop = false

    // Resting position in the hero — document-space, since the hero itself
    // is still normal scrollable content at this point.
    function layoutRest() {
      const rootRect = root.getBoundingClientRect()
      const heroRect = heroEl.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      isDesktop = viewportWidth >= DESKTOP_MIN_WIDTH

      const contentRight = heroRect.right - rootRect.left
      const heroBottom = heroRect.bottom - rootRect.top
      const stripBottom = heroBottom - 32
      const centerFromStripBottom = viewportWidth <= MOBILE_MAX_WIDTH ? 35 : 55
      heroWaterY = stripBottom - centerFromStripBottom - boat.offsetHeight / 2
      // Distance from `heroEl`'s actual bottom edge (the ScrollTrigger's
      // `bottom` reference) to where the boat rests — not just from
      // stripBottom, which is itself already 32px above heroEl's real edge
      // (PageSection's padding-bottom). Missing that 32px here was why the
      // trigger still fired ~32px too late and the boat briefly went behind
      // the navbar.
      heroToWaterOffset = heroBottom - heroWaterY

      if (isDesktop) {
        const gutterLeft = computeGutterLeft({ contentRight, viewportWidth })
        restXValue = gutterLeft + GUTTER_WIDTH / 2 - boat.offsetWidth / 2
      } else {
        restXValue = viewportWidth - boat.offsetWidth - 24
      }
    }

    layoutRest()
    window.addEventListener('resize', layoutRest)

    const restX = () => restXValue

    // The gutter's fixed on-screen box once past the hero — a constant,
    // safe viewport region (clear of the navbar, well within the fold), not
    // sized to any document distance.
    function layoutFixedGutter() {
      if (!isDesktop) return
      const rootRect = root.getBoundingClientRect()
      const heroRect = heroEl.getBoundingClientRect()
      const contentRight = heroRect.right - rootRect.left
      const gutterLeft = computeGutterLeft({ contentRight, viewportWidth: window.innerWidth })
      const safeBottom = window.innerHeight * 0.85
      gsap.set(gutter, {
        position: 'fixed',
        left: gutterLeft,
        top: SAFE_TOP,
        height: Math.max(safeBottom - SAFE_TOP, 0),
      })
    }

    function activateViewportMode() {
      if (!isDesktop) return
      gsap.set(boat, { position: 'fixed' })
      layoutFixedGutter()
      gsap.set([gutter, boat], { autoAlpha: 1 })
    }

    function deactivateViewportMode() {
      if (!isDesktop) return
      gsap.set(boat, { position: 'absolute', x: restX(), y: heroWaterY, autoAlpha: 1 })
      gsap.set(gutter, { autoAlpha: 0 })
    }

    let scrollTriggerInstance = null

    function setupDescent() {
      if (!isDesktop) return

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: heroEl,
        // Fires when the boat's own resting spot — not heroEl's bottom edge
        // itself — would otherwise scroll off the top of the viewport. The
        // boat rests `heroToWaterOffset` px above heroEl's actual bottom, so
        // without this the trigger fires ~100px too late and the boat is
        // already behind the navbar by the time it switches to viewport
        // tracking. Verified by measuring the boat's live rect through a
        // slow full-page scroll (not just visually) — `top` now bottoms out
        // at 2px, never negative.
        start: () => `bottom-=${heroToWaterOffset} top`,
        endTrigger: ctaButton,
        end: `top ${Math.round(DOCK_FRACTION * 100)}%`,
        scrub: true,
        invalidateOnRefresh: true,
        onEnter: activateViewportMode,
        onEnterBack: activateViewportMode,
        onLeaveBack: deactivateViewportMode,
        onLeave: () => gsap.to([gutter, boat], { autoAlpha: 0, duration: 0.3 }),
        onUpdate: (self) => {
          if (!isDesktop) return
          const startY = SAFE_TOP + 20
          const endY = window.innerHeight * DOCK_FRACTION - boat.offsetHeight
          gsap.set(boat, { y: gsap.utils.interpolate(startY, endY, self.progress) })
        },
      })
    }

    // Phase 1: one-time, left to right across the hero. Not scroll-linked —
    // plays once on load, at every viewport width, then the boat just sits
    // there (resting in the hero, document-space) until the viewport-tracking
    // phase takes over once scrolled past.
    const entrance = gsap.fromTo(
      boat,
      { x: () => -boat.offsetWidth, y: () => heroWaterY },
      {
        x: restX,
        y: () => heroWaterY,
        duration: 6,
        ease: 'power1.inOut',
        delay: 0.3,
        onComplete: setupDescent,
      }
    )

    return () => {
      window.removeEventListener('resize', layoutRest)
      entrance.kill()
      scrollTriggerInstance?.kill()
    }
  }, [])

  useEffect(() => {
    if (!hoveredProject || !gutterRef.current) {
      setPopupStyle(null)
      return
    }
    const gutterRect = gutterRef.current.getBoundingClientRect()
    setPopupStyle({
      top: hoveredProject.top + 14,
      left: gutterRect.left - POPUP_WIDTH - POPUP_GAP,
      width: POPUP_WIDTH,
    })
  }, [hoveredProject])

  const previewProject = hoveredProject ? getProjectBySlug(hoveredProject.slug) : null

  return (
    <div ref={rootRef} className={styles.root}>
      <div ref={gutterRef} className={styles.gutter}>
        <VerticalStream />
      </div>
      <div ref={boatRef} className={styles.boat}>
        <BoatIllustration />
      </div>

      {previewProject && popupStyle && (
        <div className={`${styles.popup} ${styles.visible}`} style={popupStyle}>
          <ProjectPreview project={previewProject} index={getProjectIndex(previewProject.slug)} />
        </div>
      )}
    </div>
  )
}
