import { PageSection } from '@/components/PageSection'
import { SectionHead } from '@/components/SectionHead'
import { AboutBody } from '@/features/about/AboutBody'
import { InterestGallery } from '@/features/about/InterestGallery'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { PROFILE, SECTIONS } from '@/content'

export default function AboutPage() {
  useDocumentMeta({
    title: `About — ${PROFILE.name}`,
    description: `About ${PROFILE.name}, ${PROFILE.role}.`,
  })

  return (
    <>
      <PageSection hero>
        <SectionHead {...SECTIONS.about} as="h1" />
        <AboutBody />
      </PageSection>

      <PageSection>
        <SectionHead {...SECTIONS.interests} />
        <InterestGallery />
      </PageSection>
    </>
  )
}
