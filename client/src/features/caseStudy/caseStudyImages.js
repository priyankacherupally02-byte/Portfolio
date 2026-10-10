// Case-study images live in src/assets/case-studies/<slug>/<file> and are
// referenced from content JSON by file name, so they're resolved here in bulk.
const MODULES = import.meta.glob('/src/assets/case-studies/*/*.{jpg,png}', {
  eager: true,
  import: 'default',
})

export function caseStudyImage(slug, file) {
  return MODULES[`/src/assets/case-studies/${slug}/${file}`]
}
