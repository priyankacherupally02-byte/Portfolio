import { useEffect } from 'react'

function setMetaTag(name, content, attr = 'name') {
  if (!content) return
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title
      setMetaTag('og:title', title, 'property')
    }
    if (description) {
      setMetaTag('description', description)
      setMetaTag('og:description', description, 'property')
    }
  }, [title, description])
}
