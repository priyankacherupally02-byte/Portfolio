import styles from './FactList.module.scss'

export function FactList({ facts }) {
  return (
    <dl className={styles.list}>
      {facts.map((fact) => (
        <div key={fact.term} className={styles.item}>
          <dt className={styles.term}>{fact.term}</dt>
          <dd className={styles.value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
