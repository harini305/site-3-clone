'use client';

import { useId } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import styles from './SortSelect.module.css';

export default function SortSelect({ value, options, onChange }) {
  const id = useId();
  const current = options.find((o) => o.value === value);
  return (
    <div className={styles.sort}>
      <label htmlFor={id} className={styles.label}>
        Sort By: <strong>{current?.label}</strong>
        <IoChevronDown aria-hidden="true" />
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={styles.select}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
