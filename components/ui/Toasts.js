'use client';

import Link from 'next/link';
import { IoCheckmarkCircle, IoClose } from 'react-icons/io5';
import { useStore } from '@/context/StoreContext';
import styles from './Toasts.module.css';

export default function Toasts() {
  const { toasts, dismissToast } = useStore();

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={styles.toast}>
          <IoCheckmarkCircle className={styles.icon} aria-hidden="true" />
          <p className={styles.message}>{t.message}</p>
          {t.action && (
            <Link href={t.action.href} className={styles.action} onClick={() => dismissToast(t.id)}>
              {t.action.label}
            </Link>
          )}
          <button type="button" className={styles.close} onClick={() => dismissToast(t.id)} aria-label="Dismiss notification">
            <IoClose aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
