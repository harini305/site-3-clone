import styles from './SectionHeading.module.css';

/**
 * Script eyebrow (Pacifico, orange) above a bold title — the signature heading
 * style used throughout the reference.
 */
export default function SectionHeading({
  script,
  title,
  id,
  as: Tag = 'h2',
  align = 'center',
  light = false,
  size = 'md',
  className = '',
  children,
}) {
  return (
    <div className={[styles.wrap, styles[align], light && styles.light, styles[size], className].filter(Boolean).join(' ')}>
      {script && <p className={`${styles.script} script`}>{script}</p>}
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
      {children && <div className={styles.text}>{children}</div>}
    </div>
  );
}
