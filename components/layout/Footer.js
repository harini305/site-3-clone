import Link from 'next/link';
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { footerColumns, socialLinks } from '@/data/site';
import Logo from './Logo';
import SubscribeBanner from './SubscribeBanner';
import styles from './Footer.module.css';

const icons = { instagram: FaInstagram, linkedin: FaLinkedinIn, facebook: FaFacebookF, twitter: FaTwitter };

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <SubscribeBanner />
      <div className={`container ${styles.main}`}>
        <div className={styles.brand}>
          <Logo />
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} className={styles.col} aria-label={col.title}>
            <h2 className={styles.heading}>{col.title}</h2>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container">
        <div className={styles.bottom}>
          <p>Copyright © {new Date().getFullYear()} Phlox Candy. All Rights Reserved.</p>
          <ul className={styles.social}>
            {socialLinks.map(({ label, href, icon }) => {
              const Icon = icons[icon];
              return (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
