// Renders [{ text, bold, italic, code, href }] segments from content/caseStudies,
// keeping the original inline emphasis and links.
export function RichText({ segments = [] }) {
  return segments.map((segment, index) => {
    let node = segment.text
    if (segment.code) node = <code>{node}</code>
    if (segment.italic) node = <em>{node}</em>
    if (segment.bold) node = <strong>{node}</strong>
    if (segment.href) {
      node = (
        <a href={segment.href} target="_blank" rel="noreferrer">
          {node}
        </a>
      )
    }
    return <span key={index}>{node}</span>
  })
}
