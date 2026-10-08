import { PageSection } from '@/components/PageSection'
import { Hero } from '@/features/home/Hero'
import { StatGrid } from '@/features/home/StatGrid'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { PROFILE, SEO_DESCRIPTION } from '@/content'

export default function HomePage() {
  useDocumentMeta({
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: SEO_DESCRIPTION,
  })

  return (
    <PageSection hero>
      <Hero />
      <StatGrid />
    </PageSection>
  )
}
