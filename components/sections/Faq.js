'use client';

import { useEffect, useState } from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { faqs } from '@/data/site';
import styles from './Faq.module.css';

/** Accessible accordion; opens the item whose id matches the URL hash. */
export default function Faq() {
  const [open, setOpen] = useState(faqs[0].id);

  useEffect(() => {
    const sync = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (faqs.some((f) => f.id === id)) setOpen(id);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return (
    <div className={styles.list}>
      {faqs.map((f) => {
        const isOpen = open === f.id;
        return (
          <div key={f.id} id={f.id} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <h3>
              <button
                type="button"
                className={styles.q}
                aria-expanded={isOpen}
                aria-controls={`${f.id}-answer`}
                onClick={() => setOpen(isOpen ? null : f.id)}
              >
                {f.q}
                {isOpen ? <IoRemove aria-hidden="true" /> : <IoAdd aria-hidden="true" />}
              </button>
            </h3>
            <div id={`${f.id}-answer`} role="region" aria-label={f.q} hidden={!isOpen} className={styles.a}>
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
