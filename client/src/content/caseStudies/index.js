// Case-study bodies copied from the original Notion write-ups (text verbatim),
// stored as blocks: heading / paragraph / list / images / compare / video / link / divider.
// Side-project studies also use timeline / phones / tools / placeholder blocks.
import divyaSilks from './divya-silks.json'
import edusphere from './edusphere.json'
import productionLogging from './production-logging.json'
import seatrack from './seatrack.json'

const CASE_STUDIES = {
  edusphere,
  'production-logging': productionLogging,
  seatrack,
  'divya-silks': divyaSilks,
}

export function getCaseStudy(slug) {
  return CASE_STUDIES[slug]
}
