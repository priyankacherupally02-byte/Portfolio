// Case-study bodies copied from the original Notion write-ups (text verbatim),
// stored as blocks: heading / paragraph / list / images / compare / video / link / divider.
import edusphere from './edusphere.json'
import productionLogging from './production-logging.json'
import seatrack from './seatrack.json'

const CASE_STUDIES = {
  edusphere,
  'production-logging': productionLogging,
  seatrack,
}

export function getCaseStudy(slug) {
  return CASE_STUDIES[slug]
}
