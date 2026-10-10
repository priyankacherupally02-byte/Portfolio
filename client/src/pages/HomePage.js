import { PageSection } from '@/components/PageSection'
import { SectionHead } from '@/components/SectionHead'
import { AboutTeaser } from '@/features/home/AboutTeaser'
import { Hero } from '@/features/home/Hero'
import { StatGrid } from '@/features/home/StatGrid'
import { ProjectList } from '@/features/work/ProjectList'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { PROFILE, SECTIONS, SEO_DESCRIPTION } from '@/content'
import styles from './HomePage.module.scss'

export default function HomePage() {
  useDocumentMeta({
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: SEO_DESCRIPTION,
  })

  return (
    <>
      <PageSection hero id="home-hero">
        <Hero />
      </PageSection>

      <PageSection id="home-stats" className={styles.stats}>
        <StatGrid />
      </PageSection>

      <PageSection id="home-work">
        <SectionHead {...SECTIONS.work} />
        <ProjectList />
      </PageSection>

      <PageSection id="home-about">
        <AboutTeaser />
      </PageSection>
    </>
  )
}
