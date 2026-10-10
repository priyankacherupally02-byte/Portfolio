import { Button } from '@/components/Button'
import styles from './CtaBanner.module.scss'

export function CtaBanner({ eyebrow, title, description, cta }) {
  return (
    <div className={styles.banner}>
      <div className={styles.copy}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {cta && (
        <Button id={cta.id} to={cta.to} href={cta.href} variant="solid" className={styles.action}>
          {cta.label}
        </Button>
      )}
    </div>
  )
}
