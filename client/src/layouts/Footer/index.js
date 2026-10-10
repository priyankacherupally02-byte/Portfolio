import { useEffect, useRef, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { Button } from '@/components/Button'
import { SocialIcon } from '@/components/SocialIcon'
import { CONTACT, NAV, PROFILE, RESUME } from '@/content'
import styles from './Footer.module.scss'

const COPY_RESET_MS = 2000

function CopyEmailButton() {
  const [status, setStatus] = useState('idle')
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('idle'), COPY_RESET_MS)
  }

  const labels = { idle: 'Copy email', copied: 'Copied!', failed: 'Copy failed' }

  return (
    <Button
      variant="ghost"
      onClick={copy}
      icon={status === 'copied' ? <Check size={14} /> : <Copy size={14} />}
      aria-live="polite"
    >
      {labels[status]}
    </Button>
  )
}

export function Footer() {
  // Case-study pages end with their own "Next case study" card; the big contact card is left off there.
  const showContactCard = !useMatch('/work/:slug')

  return (
    <footer className={styles.footer}>
      {showContactCard && (
        <div className={styles.card} data-spotlight>
          <p className={styles.eyebrow}>
            <span className={styles.pulse} aria-hidden="true" />
            {CONTACT.eyebrow}
          </p>
          <h2 className={styles.title}>
            {CONTACT.title} <em>{CONTACT.highlight}</em>
          </h2>

          <a className={styles.email} href={`mailto:${PROFILE.email}`} data-cursor-label="Say hi">
            {PROFILE.email}
          </a>

          <div className={styles.actions}>
            <Button href={`mailto:${PROFILE.email}`} variant="solid" icon={<ArrowUpRight size={14} />}>
              Email me
            </Button>
            <CopyEmailButton />
            {RESUME.href && (
              <Button href={RESUME.href} target="_blank" rel="noreferrer" variant="soft">
                View resume
              </Button>
            )}
          </div>

          {PROFILE.socials.length > 0 && (
            <div className={styles.socials}>
              <span className={styles.socialsLabel}>Find me on</span>
              {PROFILE.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialButton}
                  aria-label={`${social.label} profile (opens in a new tab)`}
                  data-cursor-label={social.label}
                >
                  <SocialIcon name={social.name} size={18} />
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.bottom}>
        <p className={styles.meta}>
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <nav className={styles.links} aria-label="Footer">
          {NAV.map((item) => (
            <Link key={item.path} to={item.path} className={styles.link}>
              {item.label}
            </Link>
          ))}
          {PROFILE.socials.map((social) => (
            <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className={styles.link}>
              <SocialIcon name={social.name} size={13} />
              {social.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className={styles.top}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  )
}
