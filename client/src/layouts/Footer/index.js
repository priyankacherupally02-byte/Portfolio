import { PROFILE } from '@/content'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.meta}>
        © {new Date().getFullYear()} {PROFILE.name}
      </p>
      <div className={styles.socials}>
        {PROFILE.socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className={styles.social}
          >
            {social.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
