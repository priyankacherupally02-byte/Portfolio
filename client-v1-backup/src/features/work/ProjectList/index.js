import { PROJECTS } from '@/content'
import { useWorkJourneyStore } from '@/store/workJourneyStore'
import styles from './ProjectList.module.scss'

export function ProjectList() {
  const setHoveredProject = useWorkJourneyStore((state) => state.setHoveredProject)
  const clearHoveredProject = useWorkJourneyStore((state) => state.clearHoveredProject)

  return (
    <div className={styles.list}>
      {PROJECTS.map((project) => (
        <article
          className={styles.card}
          key={project.slug}
          onMouseEnter={(event) =>
            setHoveredProject(project.slug, event.currentTarget.getBoundingClientRect().top)
          }
          onMouseLeave={clearHoveredProject}
        >
          <div className={styles.heading}>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.subtitle}>{project.subtitle}</p>
          </div>
          <p className={styles.summary}>{project.summary}</p>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span className={styles.tag} key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <a
            className={styles.link}
            href={project.externalUrl}
            target="_blank"
            rel="noreferrer"
          >
            Read full case study ↗
          </a>
        </article>
      ))}
    </div>
  )
}
