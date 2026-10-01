import Link from 'next/link';
import { IoPhonePortraitOutline, IoMailOutline } from 'react-icons/io5';
import { site } from '@/data/site';
import styles from './TopBar.module.css';

export default function TopBar() {
  return (
    <div className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <ul className={styles.account}>
          <li>
            <Link href="/my-account">Login</Link>
          </li>
          <li>
            <Link href="/my-account#register">Signup</Link>
          </li>
        </ul>
        <ul className={styles.contact}>
          <li>
            <a href={site.phoneHref}>
              <IoPhonePortraitOutline aria-hidden="true" />
              {site.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`}>
              <IoMailOutline aria-hidden="true" />
              {site.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
