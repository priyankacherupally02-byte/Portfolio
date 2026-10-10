import { PageSection } from '@/components/PageSection'
import { SectionHead } from '@/components/SectionHead'
import { ProjectList } from '@/features/work/ProjectList'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { PROFILE, SECTIONS } from '@/content'

export default function WorkPage() {
  useDocumentMeta({
    title: `Work — ${PROFILE.name}`,
    description: `Case studies by ${PROFILE.name}, ${PROFILE.role}.`,
  })

  return (
    <PageSection hero>
      <SectionHead {...SECTIONS.work} as="h1" />
      <ProjectList />
    </PageSection>
  )
}
