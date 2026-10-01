'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoClose, IoSearchOutline } from 'react-icons/io5';
import useDialog from '@/lib/useDialog';
import { searchSite } from '@/lib/search';
import { formatPrice } from '@/lib/format';
import styles from './SearchOverlay.module.css';

export default function SearchOverlay({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const ref = useDialog(open, onClose, { initialFocus: 'input' });
  const results = useMemo(() => searchSite(query, 6), [query]);

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?s=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div
      ref={ref}
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Search the shop"
      hidden={!open}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close search">
        <IoClose aria-hidden="true" />
      </button>
      <div className={styles.content}>
        <form role="search" onSubmit={submit} className={styles.form}>
          <label htmlFor="site-search" className="sr-only">
            Search products and posts
          </label>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cakes, donuts, recipes…"
            autoComplete="off"
            className={styles.input}
          />
          <button type="submit" className={styles.submit} aria-label="Submit search">
            <IoSearchOutline aria-hidden="true" />
          </button>
        </form>

        {query.trim().length > 1 && (
          <div className={styles.results} aria-live="polite">
            {results.length === 0 ? (
              <p className={styles.none}>No results for “{query}”.</p>
            ) : (
              <ul>
                {results.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className={styles.result} onClick={onClose}>
                      <span className={styles.thumb}>
                        <Image src={r.image} alt="" fill sizes="56px" />
                      </span>
                      <span className={styles.label}>
                        <span className={styles.type}>{r.type}</span>
                        {r.title}
                      </span>
                      {r.price != null && <span className={styles.price}>{formatPrice(r.price)}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
