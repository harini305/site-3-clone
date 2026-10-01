'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoClose, IoSearchOutline } from 'react-icons/io5';
import { mainNav, site } from '@/data/site';
import useDialog from '@/lib/useDialog';
import { isActive } from './Header';
import styles from './MobileMenu.module.css';

export default function MobileMenu({ open, onClose, onSearch }) {
  const pathname = usePathname();
  const ref = useDialog(open, onClose);

  return (
    <div
      ref={ref}
      className={`${styles.menu} ${open ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!open}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
        <IoClose aria-hidden="true" />
      </button>
      <nav aria-label="Mobile">
        <ul className={styles.list}>
          {mainNav.map((item, i) => (
            <li key={item.href} style={{ '--i': i }}>
              <Link
                href={item.href}
                className={isActive(pathname, item.href) ? styles.active : undefined}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                onClick={onClose}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li style={{ '--i': mainNav.length }}>
            <Link href="/wishlist" onClick={onClose}>
              Wishlist
            </Link>
          </li>
        </ul>
      </nav>
      <button type="button" className={styles.search} onClick={onSearch}>
        <IoSearchOutline aria-hidden="true" /> Search
      </button>
      <div className={styles.footer}>
        <Link href="/my-account" onClick={onClose}>
          Login / Signup
        </Link>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </div>
  );
}
