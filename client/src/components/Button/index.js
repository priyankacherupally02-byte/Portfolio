import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

export function Button({
  children,
  variant = 'solid',
  to,
  href,
  onClick,
  type = 'button',
  download,
  className = '',
  ...rest
}) {
  const classes = `${styles.btn} ${styles[variant]} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} download={download} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
