'use client';

import { useId } from 'react';
import styles from './QuantityInput.module.css';

export default function QuantityInput({ value, onChange, min = 1, max = 99, label = 'Quantity', size = 'md' }) {
  const id = useId();
  const clamp = (n) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));

  return (
    <div className={`${styles.qty} ${styles[size]}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <button
        type="button"
        className={styles.step}
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        −
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(clamp(parseInt(e.target.value, 10)))}
        className={styles.input}
      />
      <button
        type="button"
        className={styles.step}
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        +
      </button>
    </div>
  );
}
