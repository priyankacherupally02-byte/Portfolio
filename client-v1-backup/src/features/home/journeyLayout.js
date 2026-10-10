// Shared layout so the hero's resting boat and the WorkStream gutter below
// it land on the exact same vertical line at every viewport width, instead
// of each component inventing its own position.
export const GUTTER_WIDTH = 72
export const BOAT_SIZE = 130

// How far the gutter should sit from the actual browser edge, measured at
// generous desktop widths. At narrower desktop widths (near the 1439px
// cutoff where WorkStream still shows) the content column has less room to
// spare, so MIN_CONTENT_GAP is the floor that guarantees no overlap with the
// Work/CTA copy even when EDGE_MARGIN can't be fully honoured.
export const EDGE_MARGIN = 90
export const MIN_CONTENT_GAP = 32

// `contentRight` and `viewportWidth` must be in the same coordinate space
// (both viewport-relative, or both relative to the same local origin).
export function computeGutterLeft({ contentRight, viewportWidth }) {
  const minLeft = contentRight + MIN_CONTENT_GAP
  const desiredLeft = viewportWidth - EDGE_MARGIN - GUTTER_WIDTH
  return Math.max(minLeft, desiredLeft)
}
