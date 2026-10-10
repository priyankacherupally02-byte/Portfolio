import { PageSection } from '@/components/PageSection'
import { SectionHead } from '@/components/SectionHead'
import { CtaBanner } from '@/components/CtaBanner'
import { Hero } from '@/features/home/Hero'
import { Journey } from '@/features/home/Journey'
import { ProjectList } from '@/features/work/ProjectList'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { ABOUT, PROFILE, SEO_DESCRIPTION } from '@/content'
import styles from './HomePage.module.scss'

export default function HomePage() {
  useDocumentMeta({
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: SEO_DESCRIPTION,
  })

  return (
    <div className={styles.journey}>
      <Journey />

      {/* Narrower than PageSection's default 1280px — reserves guaranteed
          room on the right for Journey's gutter, so it never has to fight
          the content column for space at common desktop widths. All three
          sections share this width so the gutter stays on one straight
          line down the page. */}
      <PageSection hero id="home-hero" style={{ maxWidth: 1100 }}>
        <Hero />
      </PageSection>

      <PageSection id="home-work" style={{ maxWidth: 1100 }}>
        <SectionHead title="Work" />
        <ProjectList />
      </PageSection>

      <PageSection id="home-cta" style={{ maxWidth: 1100 }}>
        <CtaBanner
          eyebrow="About"
          title="There's more to the story"
          description={ABOUT[0]}
          cta={{ label: 'More about me', to: '/about', id: 'home-cta-button' }}
        />
      </PageSection>
    </div>
  )
}
