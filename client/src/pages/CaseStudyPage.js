import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from 'lucide-react'
import { Button } from '@/components/Button'
import { PageSection } from '@/components/PageSection'
import { CaseStudyArticle, isShown, readingMinutes } from '@/features/caseStudy/CaseStudyArticle'
import { ReadingProgress } from '@/features/caseStudy/ReadingProgress'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { ALL_PROJECTS, PROFILE, getCaseStudy, getProjectIndex } from '@/content'
import styles from '@/features/caseStudy/CaseStudy.module.scss'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const index = getProjectIndex(slug)
  const project = ALL_PROJECTS[index]
  const study = getCaseStudy(slug)

  useDocumentMeta({
    title: project ? `${project.title} — Case study — ${PROFILE.name}` : `Work — ${PROFILE.name}`,
    description: project?.summary,
  })

  if (!project || !study) return <Navigate to="/work" replace />

  const next = ALL_PROJECTS[(index + 1) % ALL_PROJECTS.length]
  const links = study.links?.filter(isShown) ?? []

  return (
    <PageSection hero>
      <header className={styles.header}>
        <Link to="/work" className={styles.back}>
          <ArrowLeft size={15} /> All case studies
        </Link>
        <p className={styles.eyebrow}>{project.subtitle}</p>
        <h1 className={styles.title}>{project.title}</h1>
        {study.headline && <p className={styles.headline}>{study.headline}</p>}
        <p className={styles.summary}>{project.summary}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
          <span className={styles.readTime}>
            <Clock size={13} aria-hidden="true" /> {readingMinutes(study)} min read
          </span>
        </div>
        {links.length > 0 && (
          <div className={styles.actions}>
            {links.map((link, i) =>
              link.href ? (
                <Button
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  variant={i === 0 ? 'solid' : 'ghost'}
                  icon={<ArrowUpRight size={14} />}
                >
                  {link.label}
                </Button>
              ) : (
                <span key={link.label} className={styles.draftAction}>
                  {link.label}: add link
                </span>
              )
            )}
          </div>
        )}
      </header>

      {study.glance && (
        <dl className={styles.glance}>
          {study.glance.map((item) => (
            <div key={item.label} className={styles.glanceItem}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {study.tldr && (
        <div className={styles.tldr}>
          <p className={styles.tldrLabel}>In short</p>
          <p className={styles.tldrText}>{study.tldr}</p>
        </div>
      )}

      <ReadingProgress />
      <CaseStudyArticle study={{ ...study, title: project.title }} />

      {next.slug !== slug && (
        <Link to={`/work/${next.slug}`} className={styles.next} data-spotlight data-cursor-label="Next case study">
          <div>
            <p className={styles.nextLabel}>Next case study</p>
            <p className={styles.nextTitle}>{next.title}</p>
          </div>
          <span className={styles.nextArrow} aria-hidden="true">
            <ArrowRight size={22} />
          </span>
        </Link>
      )}
    </PageSection>
  )
}
