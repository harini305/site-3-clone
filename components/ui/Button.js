import Link from 'next/link';
import styles from './Button.module.css';

/**
 * Pill button used across the site. Renders a Next link when `href` is set,
 * otherwise a native <button>.
 * variant: 'primary' (orange) | 'dark' (black) | 'outline' | 'light'
 */
export default function Button({ href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ');
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
