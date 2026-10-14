import { PageSection } from '@/components/PageSection'
import { SectionHead } from '@/components/SectionHead'
import { ProjectList } from '@/features/work/ProjectList'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { PROFILE, SECTIONS, SIDE_PROJECTS } from '@/content'

export default function WorkPage() {
  useDocumentMeta({
    title: `Work — ${PROFILE.name}`,
    description: `Case studies by ${PROFILE.name}, ${PROFILE.role}.`,
  })

  return (
    <>
      <PageSection hero>
        <SectionHead {...SECTIONS.work} as="h1" />
        <ProjectList />
      </PageSection>

      <PageSection id="work-side">
        <SectionHead {...SECTIONS.side} />
        <ProjectList projects={SIDE_PROJECTS} />
      </PageSection>
    </>
  )
}
