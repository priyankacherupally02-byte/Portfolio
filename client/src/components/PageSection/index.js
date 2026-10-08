import styles from './PageSection.module.scss'

export function PageSection({ children, hero = false, className = '', ...rest }) {
  const classes = `${styles.section} ${hero ? styles.hero : ''} ${className}`.trim()

  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  )
}
