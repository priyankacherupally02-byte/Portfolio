import { PageSection } from '@/components/PageSection'
import { SectionHead } from '@/components/SectionHead'
import { AboutBody } from '@/features/about/AboutBody'
import { InterestGallery } from '@/features/about/InterestGallery'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { PROFILE } from '@/content'

export default function AboutPage() {
  useDocumentMeta({
    title: `About — ${PROFILE.name}`,
    description: `About ${PROFILE.name}, ${PROFILE.role}.`,
  })

  return (
    <>
      <PageSection>
        <SectionHead number="01" title="About" />
        <AboutBody />
      </PageSection>

      <PageSection>
        <SectionHead title="Outside of work" />
        <InterestGallery />
      </PageSection>
    </>
  )
}
